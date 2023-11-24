"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_parent_1 = __importDefault(require("glob-parent"));
const helpers_1 = require("@poppinss/utils/build/helpers");
const standalone_1 = require("@adonisjs/core/build/standalone");
const Base_1 = require("./Base");
/**
 * Command to make a new test
 */
class MakeTest extends Base_1.BaseGenerator {
    constructor() {
        super(...arguments);
        /**
         * Required by BaseGenerator
         */
        this.extname = '.spec.ts';
        this.form = 'singular';
        this.pattern = 'snakecase';
    }
    /**
     * Returns the template stub path
     */
    getStub() {
        return (0, path_1.join)(__dirname, '..', '..', 'templates', 'test.txt');
    }
    /**
     * The file is created inside the parent directory of the first
     * glob pattern
     */
    getDestinationPath() {
        const testSuites = this.application.rcFile.tests.suites;
        const mentionedSuite = testSuites.find(({ name }) => this.suite === name);
        const suiteGlob = Array.isArray(mentionedSuite.files)
            ? mentionedSuite.files[0]
            : mentionedSuite.files;
        return (0, glob_parent_1.default)(suiteGlob);
    }
    templateData() {
        return {
            name: helpers_1.string.sentenceCase(this.name),
        };
    }
    async run() {
        const testSuites = this.application.rcFile.tests.suites;
        const mentionedSuite = testSuites.find(({ name }) => this.suite === name);
        if (!mentionedSuite) {
            this.logger.error(`Invalid suite "${this.suite}". Make sure the suite is registered inside the .adonisrc.json file`);
            return;
        }
        this.resourceName = this.name;
        this.createExact = this.exact;
        await super.generate();
    }
}
/**
 * Command meta data
 */
MakeTest.commandName = 'make:test';
MakeTest.description = 'Make a new test';
__decorate([
    standalone_1.args.string({ description: 'Name of the test suite' }),
    __metadata("design:type", String)
], MakeTest.prototype, "suite", void 0);
__decorate([
    standalone_1.args.string({ description: 'Name of the test file' }),
    __metadata("design:type", String)
], MakeTest.prototype, "name", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Create the test file with the exact name as provided',
        alias: 'e',
    }),
    __metadata("design:type", Boolean)
], MakeTest.prototype, "exact", void 0);
exports.default = MakeTest;
