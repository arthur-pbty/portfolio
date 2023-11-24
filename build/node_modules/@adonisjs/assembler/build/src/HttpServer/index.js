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
exports.HttpServer = void 0;
const execa_1 = __importDefault(require("execa"));
const emittery_1 = __importDefault(require("emittery"));
/**
 * Exposes the API to start Node.js HTTP server as a child process. The
 * child process is full managed and cleans up when parent process
 * dies.
 */
class HttpServer extends emittery_1.default {
    constructor(sourceFile, projectRoot, nodeArgs = [], logger, env = {}) {
        super();
        this.sourceFile = sourceFile;
        this.projectRoot = projectRoot;
        this.logger = logger;
        this.env = env;
        this.nodeArgs = [];
        this.nodeArgs = nodeArgs.reduce((result, arg) => {
            result = result.concat(arg.split(' '));
            return result;
        }, []);
    }
    /**
     * Whether or not the underlying process is connected
     */
    get isConnected() {
        return this.childProcess && this.childProcess.connected && !this.childProcess.killed;
    }
    /**
     * Start the HTTP server as a child process.
     */
    start() {
        if (this.isConnected) {
            throw new Error('Http server is already connected. Call restart instead');
        }
        this.logger.info(this.childProcess ? 're-starting http server...' : 'starting http server...');
        this.childProcess = execa_1.default.node(this.sourceFile, [], {
            buffer: false,
            stdio: 'inherit',
            cwd: this.projectRoot,
            env: {
                FORCE_COLOR: 'true',
                ...this.env,
            },
            nodeOptions: ['-r', '@adonisjs/assembler/build/register'].concat(this.nodeArgs),
        });
        /**
         * Notify about server events
         */
        this.childProcess.on('message', (message) => {
            if (message && message['isAdonisJS'] && message['environment'] === 'web') {
                this.emit('ready', message);
            }
        });
        this.childProcess.on('close', (code, signal) => this.emit('close', { code, signal }));
        this.childProcess.on('exit', (code, signal) => this.emit('exit', { code, signal }));
    }
    /**
     * Stop the underlying process
     */
    stop() {
        if (this.childProcess) {
            this.childProcess.removeAllListeners();
            this.childProcess.kill('SIGKILL');
        }
    }
    /**
     * Restart the server by killing the old one
     */
    restart() {
        this.stop();
        this.start();
    }
}
exports.HttpServer = HttpServer;
