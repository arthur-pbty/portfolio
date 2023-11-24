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
/**
 * Command to make a new provider
 */
class MakeProvider extends Base_1.BaseGenerator {
    constructor() {
        super(...arguments);
        /**
         * Required by BaseGenerator
         */
        this.suffix = 'Provider';
        this.form = 'singular';
        this.pattern = 'pascalcase';
    }
    /**
     * Returns the template stub path
     */
    getStub() {
        return (0, path_1.join)(__dirname, '..', '..', 'templates', 'provider.txt');
    }
    /**
     * Path to the providers directory
     */
    getDestinationPath() {
        return this.application.rcFile.directories.providers || 'providers';
    }
    async run() {
        this.resourceName = this.name;
        this.createExact = this.exact;
        const file = await super.generate();
        if (!file) {
            return;
        }
        const { files } = await Promise.resolve().then(() => __importStar(require('@adonisjs/sink')));
        const relativePath = file.toJSON().relativepath;
        const rcFile = new files.AdonisRcFile(this.application.appRoot);
        if (this.ace) {
            rcFile.addAceProvider(`./${(0, slash_1.default)(relativePath).replace((0, path_1.extname)(relativePath), '')}`);
        }
        else {
            rcFile.addProvider(`./${(0, slash_1.default)(relativePath).replace((0, path_1.extname)(relativePath), '')}`);
        }
        rcFile.commit();
    }
}
/**
 * Command meta data
 */
MakeProvider.commandName = 'make:provider';
MakeProvider.description = 'Make a new provider class';
__decorate([
    standalone_1.args.string({ description: 'Name of the provider class' }),
    __metadata("design:type", String)
], MakeProvider.prototype, "name", void 0);
__decorate([
    standalone_1.flags.boolean({ description: 'Register provider under the ace providers array' }),
    __metadata("design:type", Boolean)
], MakeProvider.prototype, "ace", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Create the provider with the exact name as provided',
        alias: 'e',
    }),
    __metadata("design:type", Boolean)
], MakeProvider.prototype, "exact", void 0);
exports.default = MakeProvider;
