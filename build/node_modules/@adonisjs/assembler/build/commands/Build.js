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
const has_yarn_1 = __importDefault(require("has-yarn"));
const standalone_1 = require("@adonisjs/core/build/standalone");
const paths_1 = require("../config/paths");
/**
 * Compile typescript project Javascript
 */
class Build extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * Bundle frontend assets. Defaults to true
         */
        this.assets = true;
        /**
         * Path to the TypeScript project configuration file. Defaults to "tsconfig.json"
         */
        this.tsconfig = paths_1.TSCONFIG_FILE_NAME;
        /**
         * Arguments to pass to the `encore` binary
         */
        this.encoreArgs = [];
    }
    /**
     * Invoked automatically by ace
     */
    async run() {
        const { Compiler } = await Promise.resolve().then(() => __importStar(require('../src/Compiler')));
        /**
         * Deciding the client to use for installing dependencies
         */
        this.client = this.client || (0, has_yarn_1.default)(this.application.appRoot) ? 'yarn' : 'npm';
        if (this.client !== 'npm' && this.client !== 'yarn') {
            this.logger.warning('--client must be set to "npm" or "yarn"');
            this.exitCode = 1;
            return;
        }
        /**
         * Stop on error when "ignoreTsErrors" is not set
         */
        const stopOnError = !this.ignoreTsErrors;
        try {
            const compiler = new Compiler(this.application.appRoot, this.encoreArgs, this.assets, this.logger, this.tsconfig);
            const compiled = this.production
                ? await compiler.compileForProduction(stopOnError, this.client)
                : await compiler.compile(stopOnError);
            /**
             * Set exitCode based upon the compiled status
             */
            if (!compiled) {
                this.exitCode = 1;
            }
        }
        catch (error) {
            this.logger.fatal(error);
            this.exitCode = 1;
        }
    }
}
Build.commandName = 'build';
Build.description = 'Compile project from Typescript to Javascript. Also compiles the frontend assets if using webpack encore';
__decorate([
    standalone_1.flags.boolean({ description: 'Build for production', alias: 'prod' }),
    __metadata("design:type", Boolean)
], Build.prototype, "production", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Build frontend assets when webpack encore is installed. Use --no-assets to disable',
    }),
    __metadata("design:type", Boolean)
], Build.prototype, "assets", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Ignore typescript errors and complete the build process',
    }),
    __metadata("design:type", Boolean)
], Build.prototype, "ignoreTsErrors", void 0);
__decorate([
    standalone_1.flags.string({
        description: 'Path to the TypeScript project configuration file',
    }),
    __metadata("design:type", String)
], Build.prototype, "tsconfig", void 0);
__decorate([
    standalone_1.flags.array({ description: 'CLI options to pass to the encore command line' }),
    __metadata("design:type", Array)
], Build.prototype, "encoreArgs", void 0);
__decorate([
    standalone_1.flags.string({
        description: 'Select the package manager to decide which lock file to copy to the build folder',
    }),
    __metadata("design:type", String)
], Build.prototype, "client", void 0);
exports.default = Build;
