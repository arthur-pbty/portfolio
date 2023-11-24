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
exports.AssetsBundler = void 0;
const execa_1 = __importDefault(require("execa"));
const get_port_1 = __importDefault(require("get-port"));
const emittery_1 = __importDefault(require("emittery"));
const helpers_1 = require("@poppinss/utils/build/helpers");
/**
 * Assets bundler uses webpack encore to build frontend dependencies
 */
class AssetsBundler extends emittery_1.default {
    constructor(projectRoot, encoreArgs = [], buildAssets = true, logger, env = {}) {
        super();
        this.projectRoot = projectRoot;
        this.buildAssets = buildAssets;
        this.logger = logger;
        this.env = env;
        /**
         * Binary to execute
         */
        this.binaryName = 'encore';
        this.encoreArgs = [];
        /**
         * Options passed to spawn a child process
         */
        this.execaOptions = {
            preferLocal: true,
            buffer: false,
            stdio: 'pipe',
            localDir: this.projectRoot,
            cwd: this.projectRoot,
            windowsHide: false,
            env: {
                FORCE_COLOR: 'true',
                ...this.env,
            },
        };
        this.encoreArgs = encoreArgs.reduce((result, arg) => {
            result = result.concat(arg.split(' '));
            return result;
        }, []);
    }
    /**
     * Find if encore is installed
     */
    isEncoreInstalled() {
        try {
            (0, helpers_1.resolveDir)(this.projectRoot, '@symfony/webpack-encore');
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Notify user that we are about use encore
     */
    notifyAboutEncore() {
        this.logger.info(`detected { ${this.logger.colors.dim().yellow('@symfony/webpack-encore')} }`);
        this.logger.info(`building frontend assets. Use { ${this.logger.colors
            .dim()
            .yellow('--no-assets')} } to disable`);
    }
    /**
     * Logs the line to stdout
     */
    log(line) {
        line = line.toString().trim();
        if (!line.length) {
            return;
        }
        console.log(`[ ${this.logger.colors.cyan('encore')} ] ${line}`);
    }
    /**
     * Logs the line to stderr
     */
    logError(line) {
        line = line.toString().trim();
        if (!line.length) {
            return;
        }
        console.error(`[ ${this.logger.colors.cyan('encore')} ] ${line}`);
    }
    /**
     * Returns the custom port defined using the `--port` flag in encore
     * flags
     */
    findCustomPort() {
        let portIndex = this.encoreArgs.findIndex((arg) => arg === '--port');
        if (portIndex > -1) {
            return this.encoreArgs[portIndex + 1];
        }
        portIndex = this.encoreArgs.findIndex((arg) => arg.includes('--port'));
        if (portIndex > -1) {
            const tokens = this.encoreArgs[portIndex].split('=');
            return tokens[1] && tokens[1].trim();
        }
    }
    /**
     * Returns the custom host defined using the `--host` flag in encore
     * flags
     */
    findCustomHost() {
        let hostIndex = this.encoreArgs.findIndex((arg) => arg === '--host');
        if (hostIndex > -1) {
            return this.encoreArgs[hostIndex + 1];
        }
        hostIndex = this.encoreArgs.findIndex((arg) => arg.includes('--host'));
        if (hostIndex > -1) {
            const tokens = this.encoreArgs[hostIndex].split('=');
            return tokens[1] && tokens[1].trim();
        }
    }
    /**
     * Execute command
     */
    exec(args) {
        return new Promise((resolve, reject) => {
            const childProcess = (0, execa_1.default)(this.binaryName, args, this.execaOptions);
            childProcess.stdout?.on('data', (line) => this.log(line));
            childProcess.stderr?.on('data', (line) => this.logError(line));
            childProcess.on('error', (error) => reject(error));
            childProcess.on('close', (code) => {
                if (code && code !== 0) {
                    reject(`Process exited with code ${code}`);
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     * Build assets using encore
     */
    async build() {
        if (!this.buildAssets) {
            return { hasErrors: false };
        }
        if (!this.isEncoreInstalled()) {
            return { hasErrors: false };
        }
        this.notifyAboutEncore();
        try {
            await this.exec(['dev'].concat(this.encoreArgs));
            return { hasErrors: false };
        }
        catch (error) {
            return { hasErrors: true };
        }
    }
    /**
     * Build assets for production
     */
    async buildForProduction() {
        if (!this.buildAssets) {
            return { hasErrors: false };
        }
        if (!this.isEncoreInstalled()) {
            return { hasErrors: false };
        }
        this.notifyAboutEncore();
        try {
            await this.exec(['production'].concat(this.encoreArgs));
            return { hasErrors: false };
        }
        catch (error) {
            return { hasErrors: true };
        }
    }
    /**
     * Start the webpack dev server
     */
    async startDevServer() {
        if (!this.isEncoreInstalled()) {
            return { state: 'not-installed' };
        }
        if (!this.buildAssets) {
            return { state: 'no-assets' };
        }
        const customHost = this.findCustomHost() || 'localhost';
        /**
         * Define a random port when the "--port" flag is not passed.
         *
         * Encore anyways doesn't allow defining port inside the webpack.config.js
         * file for generating the manifest and entrypoints file.
         *
         * @see
         * https://github.com/symfony/webpack-encore/issues/941#issuecomment-787568811
         */
        let customPort = this.findCustomPort();
        if (!customPort) {
            const randomPort = await (0, get_port_1.default)({ port: 8080, host: 'localhost' });
            customPort = String(randomPort);
            this.encoreArgs.push('--port', customPort);
        }
        const childProcess = (0, execa_1.default)(this.binaryName, ['dev-server'].concat(this.encoreArgs), this.execaOptions);
        childProcess.stdout?.on('data', (line) => this.log(line));
        childProcess.stderr?.on('data', (line) => this.logError(line));
        childProcess.on('close', (code, signal) => this.emit('close', { code, signal }));
        childProcess.on('exit', (code, signal) => this.emit('exit', { code, signal }));
        return { state: 'running', port: customPort, host: customHost };
    }
}
exports.AssetsBundler = AssetsBundler;
