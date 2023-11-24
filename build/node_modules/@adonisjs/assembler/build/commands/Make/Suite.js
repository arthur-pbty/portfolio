"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) AdonisJS
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
const standalone_1 = require("@adonisjs/core/build/standalone");
const sink_1 = require("@adonisjs/sink");
const glob_parent_1 = __importDefault(require("glob-parent"));
const path_1 = require("path");
/**
 * Create a new test suite
 */
class CreateSuite extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * Glob pattern for the test suite, or only location to the test suite
         */
        this.location = '';
        /**
         * Should add a sample test file
         */
        this.withExampleTest = true;
    }
    /**
     * Get the destination path for the sample test file
     */
    getExampleTestDestinationPath() {
        return (0, glob_parent_1.default)(this.location) + '/test.spec.ts';
    }
    /**
     * Generate suite glob pattern based on `location` argument
     */
    generateSuiteGlobPattern() {
        if (!this.location) {
            this.location = `tests/${this.suite}`;
        }
        if (!['*', '.js', '.ts'].find((keyword) => this.location.includes(keyword))) {
            this.location = `${this.location}/**/*.spec(.ts|.js)`;
        }
    }
    /**
     * Check if the suite name is already defined in RcFile
     */
    checkIfSuiteExists(rcFile) {
        const existingSuites = rcFile.get('tests.suites') || [];
        const existingSuitesNames = existingSuites.map((suite) => suite.name);
        return existingSuitesNames.includes(this.suite);
    }
    /**
     * Add the new test suite to the AdonisRC File and save it
     */
    async addSuiteToRcFile() {
        const rcFile = new sink_1.files.AdonisRcFile(this.application.appRoot);
        const existingSuites = rcFile.get('tests.suites') || [];
        if (this.checkIfSuiteExists(rcFile)) {
            return sink_1.logger.action('update').skipped(`Suite ${this.suite} already exists`);
        }
        rcFile.set('tests.suites', [
            ...existingSuites,
            {
                name: this.suite,
                files: [this.location],
                timeout: 60 * 1000,
            },
        ]);
        rcFile.commit();
        sink_1.logger.action('update').succeeded('.adonisrc.json');
    }
    /**
     * Add a sample test file to the new suite folder
     */
    createSampleTestFile() {
        const path = this.getExampleTestDestinationPath();
        const testFile = new sink_1.files.MustacheFile(this.application.appRoot, path, (0, path_1.join)(__dirname, '../..', 'templates/test.txt'));
        if (!testFile.exists()) {
            testFile.apply({}).commit();
            sink_1.logger.action('create').succeeded(path);
        }
    }
    async run() {
        this.generateSuiteGlobPattern();
        await this.addSuiteToRcFile();
        if (this.withExampleTest) {
            this.createSampleTestFile();
        }
    }
}
CreateSuite.commandName = 'make:suite';
CreateSuite.description = 'Create a new test suite';
__decorate([
    standalone_1.args.string({ description: 'Name of the test suite' }),
    __metadata("design:type", String)
], CreateSuite.prototype, "suite", void 0);
__decorate([
    standalone_1.args.string({ description: 'Path to the test suite directory', required: false }),
    __metadata("design:type", String)
], CreateSuite.prototype, "location", void 0);
__decorate([
    standalone_1.flags.boolean({ description: 'Add a sample test file' }),
    __metadata("design:type", Boolean)
], CreateSuite.prototype, "withExampleTest", void 0);
exports.default = CreateSuite;
