"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slash_1 = __importDefault(require("slash"));
const path_1 = require("path");
const standalone_1 = require("@adonisjs/core/build/standalone");
const Base_1 = require("./Base");
const ALLOWED_ENVIRONMENTS = ['console', 'web', 'repl', 'test'];
/**
 * Command to make a new preloaded file
 */
class MakePreloadFile extends Base_1.BaseGenerator {
    constructor() {
        super(...arguments);
        this.createExact = true;
    }
    /**
     * Check if the mentioned environments are valid
     */
    isValidEnviroment(environment) {
        return !environment.find((one) => !ALLOWED_ENVIRONMENTS.includes(one));
    }
    /**
     * Returns the template stub path
     */
    getStub() {
        return (0, path_1.join)(__dirname, '..', '..', 'templates', 'preload-file.txt');
    }
    /**
     * Path to the start directory
     */
    getDestinationPath() {
        return this.application.rcFile.directories.start || 'start';
    }
    /**
     * Run command
     */
    async run() {
        /**
         * Ensure the environments are valid when provided via flag
         */
        if (this.environment && this.environment.length && !this.isValidEnviroment(this.environment)) {
            this.logger.error(`Invalid environment(s) "${this.environment}". Only "${ALLOWED_ENVIRONMENTS}" are allowed`);
            return;
        }
        let environments = this.environment;
        /**
         * Prompt user to select one or more environments
         */
        if (!environments) {
            environments = await this.prompt.multiple('Select the environment(s) in which you want to load this file', [
                {
                    name: 'all',
                    message: 'Load file in all environments',
                },
                {
                    name: 'console',
                    message: 'Environment for ace commands',
                },
                {
                    name: 'repl',
                    message: 'Environment for the REPL session',
                },
                {
                    name: 'web',
                    message: 'Environment for HTTP requests',
                },
                {
                    name: 'test',
                    message: 'Environment for the test process',
                },
            ]);
        }
        /**
         * Generate resource file
         */
        this.resourceName = this.name;
        const file = await super.generate();
        if (!file) {
            return;
        }
        /**
         * Update preload file
         */
        const { files } = await Promise.resolve().then(() => __importStar(require('@adonisjs/sink')));
        const relativePath = file.toJSON().relativepath;
        const rcFile = new files.AdonisRcFile(this.application.appRoot);
        if (!environments || !environments.length || environments.includes('all')) {
            rcFile.setPreload(`./${(0, slash_1.default)(relativePath).replace((0, path_1.extname)(relativePath), '')}`);
        }
        else {
            rcFile.setPreload(`./${(0, slash_1.default)(relativePath).replace((0, path_1.extname)(relativePath), '')}`, environments);
        }
        rcFile.commit();
    }
}
/**
 * Command name
 */
MakePreloadFile.commandName = 'make:prldfile';
/**
 * Command description
 */
MakePreloadFile.description = 'Make a new preload file';
__decorate([
    standalone_1.args.string({ description: 'Name of the file' }),
    __metadata("design:type", String)
], MakePreloadFile.prototype, "name", void 0);
__decorate([
    standalone_1.flags.array({
        description: `Define the preload file environment. Accepted values "${ALLOWED_ENVIRONMENTS}"`,
    }),
    __metadata("design:type", Array)
], MakePreloadFile.prototype, "environment", void 0);
exports.default = MakePreloadFile;
