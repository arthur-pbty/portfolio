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
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const paths_1 = require("../config/paths");
/**
 * TypeCheck project without writing the compiled output to the disk
 */
class TypeCheck extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * Path to the TypeScript project configuration file. Defaults to "tsconfig.json"
         */
        this.tsconfig = paths_1.TSCONFIG_FILE_NAME;
    }
    /**
     * Invoked automatically by ace
     */
    async run() {
        const { Compiler } = await Promise.resolve().then(() => __importStar(require('../src/Compiler')));
        try {
            const compiler = new Compiler(this.application.appRoot, [], false, this.logger, this.tsconfig);
            const success = await compiler.typeCheck();
            /**
             * Set exitCode based upon the typecheck status
             */
            if (!success) {
                this.exitCode = 1;
            }
        }
        catch (error) {
            this.logger.fatal(error);
            this.exitCode = 1;
        }
    }
}
TypeCheck.commandName = 'type-check';
TypeCheck.description = 'Type check TypeScript source without writing the compiled output on disk';
__decorate([
    standalone_1.flags.string({
        description: 'Path to the TypeScript project configuration file',
    }),
    __metadata("design:type", String)
], TypeCheck.prototype, "tsconfig", void 0);
exports.default = TypeCheck;
