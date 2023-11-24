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
exports.TestProcess = void 0;
const execa_1 = __importDefault(require("execa"));
/**
 * Exposes the API to run tests as a child process.
 */
class TestProcess {
    constructor(sourceFile, projectRoot, filters, nodeArgs = [], logger, env = {}) {
        this.sourceFile = sourceFile;
        this.projectRoot = projectRoot;
        this.filters = filters;
        this.logger = logger;
        this.env = env;
        this.nodeArgs = nodeArgs.reduce((result, arg) => {
            result = result.concat(arg.split(' '));
            return result;
        }, []);
    }
    /**
     * Start the HTTP server as a child process.
     */
    async run() {
        this.logger.info('running tests...');
        const filters = Object.keys(this.filters).reduce((result, filter) => {
            const value = this.filters[filter];
            if (filter === '_') {
                result.push(...value);
                return result;
            }
            result.push(filter);
            if (Array.isArray(value)) {
                result.push(value.join(','));
            }
            else {
                result.push(value);
            }
            return result;
        }, []);
        try {
            await execa_1.default.node(this.sourceFile, filters, {
                stdio: 'inherit',
                cwd: this.projectRoot,
                env: {
                    FORCE_COLOR: 'true',
                    ...this.env,
                },
                nodeOptions: ['-r', '@adonisjs/assembler/build/register'].concat(this.nodeArgs),
            });
            return { hasErrors: false };
        }
        catch {
            return { hasErrors: true };
        }
    }
}
exports.TestProcess = TestProcess;
