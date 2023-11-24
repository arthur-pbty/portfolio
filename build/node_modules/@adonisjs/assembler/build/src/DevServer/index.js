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
exports.DevServer = void 0;
const get_port_1 = __importDefault(require("get-port"));
const require_ts_1 = require("@adonisjs/require-ts");
const cliui_1 = require("@poppinss/cliui");
const Ts_1 = require("../Ts");
const RcFile_1 = require("../RcFile");
const Manifest_1 = require("../Manifest");
const EnvParser_1 = require("../EnvParser");
const HttpServer_1 = require("../HttpServer");
const paths_1 = require("../../config/paths");
const AssetsBundler_1 = require("../AssetsBundler");
/**
 * Exposes the API to watch project for compilition changes.
 */
class DevServer {
    constructor(appRoot, nodeArgs = [], encoreArgs, buildAssets, logger = cliui_1.logger) {
        this.appRoot = appRoot;
        this.nodeArgs = nodeArgs;
        this.encoreArgs = encoreArgs;
        this.buildAssets = buildAssets;
        this.logger = logger;
        /**
         * A boolean to know if we are watching for filesystem
         */
        this.watchingFileSystem = false;
        /**
         * Watcher state
         */
        this.watcherState = 'pending';
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
    }
    /**
     * Kill current process
     */
    kill() {
        this.logger.info('shutting down');
        process.exit();
    }
    /**
     * Create the http server
     */
    async createHttpServer() {
        if (this.httpServer) {
            return;
        }
        const envParser = new EnvParser_1.EnvParser();
        await envParser.parse(this.appRoot);
        const envOptions = envParser.asEnvObject(['PORT', 'TZ', 'HOST']);
        const HOST = process.env.HOST || envOptions.HOST || '0.0.0.0';
        let PORT = process.env.PORT || envOptions.PORT || '3333';
        /**
         * Obtains a random port by giving preference to the one defined inside
         * the `.env` file. This eases the process of running the application
         * without manually changing ports inside the `.env` file when
         * original port is in use.
         */
        if (!isNaN(Number(PORT))) {
            PORT = String(await (0, get_port_1.default)({
                port: [Number(PORT)],
                host: HOST,
            }));
        }
        this.httpServer = new HttpServer_1.HttpServer(paths_1.SERVER_ENTRY_FILE, this.appRoot, this.nodeArgs, this.logger, {
            PORT,
            HOST,
            TZ: envOptions.TZ,
        });
    }
    /**
     * Renders box to notify about the server state
     */
    renderServerIsReady() {
        if (!this.serverHost || !this.serverPort) {
            return;
        }
        if (this.watchingFileSystem && this.watcherState === 'pending') {
            return;
        }
        const stickerInstance = (0, cliui_1.sticker)();
        stickerInstance
            .add(`Server address: ${this.logger.colors.cyan(`http://${this.serverHost === '0.0.0.0' ? '127.0.0.1' : this.serverHost}:${this.serverPort}`)}`)
            .add(`Watching filesystem for changes: ${this.logger.colors.cyan(this.watchingFileSystem ? 'YES' : 'NO')}`);
        /**
         * Running the encore dev server
         */
        if (this.encoreDevServerResponse.state === 'running') {
            stickerInstance.add(`Encore server address: ${this.logger.colors.cyan(`http://${this.encoreDevServerResponse.host}:${this.encoreDevServerResponse.port}`)}`);
        }
        stickerInstance.render();
    }
    /**
     * Start the dev server. Use [[watch]] to also watch for file
     * changes
     */
    async start() {
        /**
         * Log getting ready
         */
        this.logger.info('building project...');
        /**
         * Start the HTTP server right away
         */
        await this.createHttpServer();
        this.httpServer.start();
        /**
         * Notify that the http server has died
         */
        this.httpServer.on('exit', ({ code }) => {
            this.logger.warning(`Underlying HTTP server died with "${code} code"`);
        });
        /**
         * Notify that the http server is running
         */
        this.httpServer.on('ready', ({ port, host }) => {
            this.serverPort = port;
            this.serverHost = host;
            this.renderServerIsReady();
        });
        const encore = new AssetsBundler_1.AssetsBundler(this.appRoot, this.encoreArgs, this.buildAssets, this.logger);
        encore.on('exit', ({ code }) => {
            this.logger.warning(`Underlying encore dev server died with "${code} code"`);
        });
        this.encoreDevServerResponse = await encore.startDevServer();
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
         * Start HTTP server
         */
        await this.start();
        /**
         * Parse config to find the files excluded inside
         * tsconfig file
         */
        const config = this.ts.parseConfig();
        if (!config) {
            this.logger.warning('Cannot start watcher because of errors in the config file');
            this.watcherState = 'error';
            this.renderServerIsReady();
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
            this.watcherState = 'ready';
            this.renderServerIsReady();
        });
        /**
         * Source file removed
         */
        watcher.on('source:unlink', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            this.logger.action('delete').succeeded(relativePath);
            /**
             * Generate manifest when filePath is a commands path
             */
            if (this.rcFile.isCommandsPath(relativePath)) {
                this.manifest.generate();
            }
            this.httpServer.restart();
        });
        /**
         * Source file added
         */
        watcher.on('source:add', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            this.logger.action('add').succeeded(relativePath);
            /**
             * Generate manifest when filePath if file is in commands path
             */
            if (this.rcFile.isCommandsPath(relativePath)) {
                this.manifest.generate();
            }
            this.httpServer.restart();
        });
        /**
         * Source file changed
         */
        watcher.on('source:change', async ({ absPath, relativePath }) => {
            this.watchHelpers.clear(absPath);
            this.logger.action('update').succeeded(relativePath);
            /**
             * Generate manifest when filePath is a commands path
             */
            if (this.rcFile.isCommandsPath(relativePath)) {
                this.manifest.generate();
            }
            this.httpServer.restart();
        });
        /**
         * New file added
         */
        watcher.on('add', async ({ relativePath }) => {
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('create').succeeded(relativePath);
                this.httpServer.restart();
                return;
            }
            const metaData = this.rcFile.getMetaData(relativePath);
            if (!metaData.metaFile) {
                return;
            }
            this.logger.action('create').succeeded(relativePath);
            if (metaData.reload) {
                this.httpServer.restart();
            }
        });
        /**
         * File changed
         */
        watcher.on('change', async ({ relativePath }) => {
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('update').succeeded(relativePath);
                this.httpServer.restart();
                return;
            }
            const metaData = this.rcFile.getMetaData(relativePath);
            if (!metaData.metaFile) {
                return;
            }
            this.logger.action('update').succeeded(relativePath);
            if (metaData.reload || metaData.rcFile) {
                this.httpServer.restart();
            }
        });
        /**
         * File removed
         */
        watcher.on('unlink', async ({ relativePath }) => {
            if (paths_1.ENV_FILES.includes(relativePath)) {
                this.logger.action('delete').succeeded(relativePath);
                this.httpServer.restart();
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
            if (metaData.reload) {
                this.httpServer.restart();
            }
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
exports.DevServer = DevServer;
