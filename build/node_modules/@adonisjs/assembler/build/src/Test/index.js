"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsServer = void 0;
const path_1 = require("path");
const picomatch_1 = __importDefault(require("picomatch"));
const cliui_1 = require("@poppinss/cliui");
const require_ts_1 = require("@adonisjs/require-ts");
const Ts_1 = require("../Ts");
const RcFile_1 = require("../RcFile");
const Manifest_1 = require("../Manifest");
const process_1 = require("./process");
const paths_1 = require("../../config/paths");
const EnvParser_1 = require("../EnvParser");
const get_port_1 = __importDefault(require("get-port"));
/**
 * Exposes the API to watch project for compilition changes and
 * run/re-run tests
 */
class TestsServer {
    constructor(appRoot, filters, nodeArgs = [], logger = cliui_1.logger) {
        this.appRoot = appRoot;
        this.filters = filters;
        this.nodeArgs = nodeArgs;
        this.logger = logger;
        /**
         * A boolean to know if we are watching for filesystem
         */
        this.watchingFileSystem = false;
        /**
         * Boolean to hold the current state of tests. This is avoid
         * re-running the tests when one run is in progress
         */
        this.busy = false;
        /**
         * Reference to the typescript compiler
         */
        this.ts = new Ts_1.Ts(this.appRoot, this.logger);
        /**
         * Reference to the RCFile
         */
        this.rcFile = new RcFile_1.RcFile(this.appRoot);
        /**
         * Manifest instance to generate ace manifest file
         */
        this.manifest = new Manifest_1.Manifest(this.appRoot, this.logger);
        /**
         * Require-ts watch helpers
         */
        this.watchHelpers = (0, require_ts_1.getWatcherHelpers)(this.appRoot);
        /**
         * A method to know if the file is part of the selected suites
         * or not
         */
        this.isTestSuiteFile = (0, picomatch_1.default)(this.getFilesForSelectedSuites());
        /**
         * Find if the test file part of the applied file filters
         */
        this.isTestFile = (filePath) => {
            if (!this.filters['--files']) {
                return true;
            }
            const fileName = filePath.replace((0, path_1.extname)(filePath), '');
            return !!this.filters['--files'].find((filter) => {
                if (filePath.endsWith(filter)) {
                    return true;
                }
                return fileName.endsWith(filter) || fileName.endsWith(`${filter}.spec`);
            });
        };
    }
    /**
     * Clear terminal screen
     */
    clearScreen() {
        process.stdout.write('\u001Bc');
    }
    /**
     * Returns the glob paths for test suites. Returns all if no
     * filter is applied. Otherwise only the filtered suites
     * are picked.
     */
    getFilesForSelectedSuites() {
        return this.rcFile.application.rcFile.tests.suites.reduce((result, suite) => {
            if (!suite.files) {
                return result;
            }
            if (!this.filters['--suites'] || this.filters['--suites'].includes(suite.name)) {
                result = result.concat(suite.files);
            }
            return result;
        }, []);
    }
    /**
     * Kill current process
     */
    kill() {
        process.exit();
    }
    /**
     * Returns the HOST and the PORT environment variables
     * for the HTTP server
     */
    async getEnvironmentVariables() {
        const envParser = new EnvParser_1.EnvParser();
        await envParser.parse(this.appRoot);
        const envOptions = envParser.asEnvObject(['PORT', 'TZ', 'HOST']);
        const HOST = process.env.HOST || envOptions.HOST || '0.0.0.0';
        let PORT = Number(process.env.PORT || envOptions.PORT);
        /**
         * Use the port defined inside ".env.test" file or use
         * a random port
         */
        PORT = await (0, get_port_1.default)({
            port: !isNaN(PORT) ? [PORT] : [],
            host: HOST,
        });
        return { HOST, PORT: String(PORT) };
    }
    /**
     * Run tests. Use [[watch]] to also watch for file
     * changes
     */
    async run(filePath) {
        if (this.busy) {
            return;
        }
        this.clearScreen();
        const filters = { ...this.filters };
        /**
         * Overwrite files filter when a specific file path
         * is mentioned
         */
        if (filePath) {
            filters['--files'] = [filePath.replace(/\\/g, '/')];
        }
        this.busy = true;
        const { hasErrors } = await new process_1.TestProcess(paths_1.TESTS_ENTRY_FILE, this.appRoot, filters, this.nodeArgs, this.logger, await this.getEnvironmentVariables()).run();
        this.busy = false;
        if (!this.watchingFileSystem) {
            if (hasErrors) {
                process.exitCode = 1;
            }
            this.kill();
        }
    }
    /**
     * Build and watch for file changes
     */
    async watch(poll = false) {
        this.watchingFileSystem = true;
        /**
         * Clear require-ts cache
         */
        this.watchHelpers.clear();
        /**
         * Run tests
         */
        await this.run();
        /**
         * Parse config to find the files excluded inside
         * tsconfig file
         */
        const config = this.ts.parseConfig();
        if (!config) {
            this.logger.warning('Cannot start watcher because of errors in the tsconfig file');
            return;
        }
        /**
         * Stick file watcher
         */
        const watcher = this.ts.tsCompiler.watcher(config, 'raw');
        /**
         * Watcher is ready after first compile
         */
        watcher.on('watcher:ready', () => {
            this.logger.info('watching file system for changes');
        });
        /**
         * Source file removed
         */
        watcher.on('source:unlink', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            if (this.busy) {
                return;
            }
            this.logger.action('delete').succeeded(relativePath);
            /**
             * Generate manifest when filePath is a commands path
             */
            if (this.rcFile.isCommandsPath(relativePath)) {
                this.manifest.generate();
            }
            /**
             * Run all tests when any of the source, except the
             * test file changes
             */
            if (!this.rcFile.isTestsFile(relativePath)) {
                await this.run();
            }
        });
        /**
         * Source file added
         */
        watcher.on('source:add', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            if (this.busy) {
                return;
            }
            this.logger.action('add').succeeded(relativePath);
            /**
             * Run all tests when any of the source, except the
             * test file changes
             */
            if (!this.rcFile.isTestsFile(relativePath)) {
                await this.run();
                return;
            }
            /**
             * Run only the changed file if it part of the test
             * suites (respecting filters)
             */
            if (this.isTestSuiteFile(relativePath) && this.isTestFile(relativePath)) {
                await this.run(relativePath);
            }
        });
        /**
         * Source file changed
         */
        watcher.on('source:change', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            if (this.busy) {
                return;
            }
            this.logger.action('update').succeeded(relativePath);
            /**
             * Generate manifest when filePath is a commands path
             */
            if (this.rcFile.isCommandsPath(relativePath)) {
                this.manifest.generate();
            }
            /**
             * Run all tests when any of the source, except the
             * test file changes
             */
            if (!this.rcFile.isTestsFile(relativePath)) {
                await this.run();
                return;
            }
            /**
             * Run only the changed file if it part of the test
             * suites (respecting filters)
             */
            if (this.isTestSuiteFile(relativePath) && this.isTestFile(relativePath)) {
                await this.run(relativePath);
            }
        });
        /**
         * New file added
         */
        watcher.on('add', async ({ relativePath }) => {
            if (this.busy) {
                return;
            }
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('create').succeeded(relativePath);
                await this.run();
                return;
            }
            const metaData = this.rcFile.getMetaData(relativePath);
            if (!metaData.metaFile) {
                return;
            }
            this.logger.action('create').succeeded(relativePath);
            await this.run();
        });
        /**
         * File changed
         */
        watcher.on('change', async ({ relativePath }) => {
            if (this.busy) {
                return;
            }
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('update').succeeded(relativePath);
                await this.run();
                return;
            }
            const metaData = this.rcFile.getMetaData(relativePath);
            if (!metaData.metaFile) {
                return;
            }
            this.logger.action('update').succeeded(relativePath);
            await this.run();
        });
        /**
         * File removed
         */
        watcher.on('unlink', async ({ relativePath }) => {
            if (this.busy) {
                return;
            }
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('delete').succeeded(relativePath);
                await this.run();
                return;
            }
            const metaData = this.rcFile.getMetaData(relativePath);
            if (!metaData.metaFile) {
                return;
            }
            if (metaData.rcFile) {
                this.logger.info('cannot continue after deletion of .adonisrc.json file');
                watcher.chokidar.close();
                this.kill();
                return;
            }
            this.logger.action('delete').succeeded(relativePath);
            await this.run();
        });
        /**
         * Start the watcher
         */
        watcher.watch(['.'], {
            usePolling: poll,
        });
        /**
         * Kill when watcher recieves an error
         */
        watcher.chokidar.on('error', (error) => {
            this.logger.fatal(error);
            this.kill();
        });
    }
}
exports.TestsServer = TestsServer;
