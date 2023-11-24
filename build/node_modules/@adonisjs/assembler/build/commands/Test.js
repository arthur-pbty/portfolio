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
/**
 * Run tests
 */
class Test extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * Arguments to pass to the `node` binary
         */
        this.nodeArgs = [];
    }
    /**
     * Convert command flags to test filters
     */
    getTestFilters() {
        const filters = {};
        if (this.forceExit) {
            filters['--force-exit'] = true;
        }
        if (this.files) {
            filters['--files'] = this.files;
        }
        if (this.timeout !== undefined) {
            filters['--timeout'] = this.timeout;
        }
        if (this.tags) {
            filters['--tags'] = this.tags;
        }
        if (this.suites) {
            filters._ = this.suites;
        }
        if (this.ignoreTags) {
            filters['--ignore-tags'] = this.ignoreTags;
        }
        if (this.tests) {
            filters['--tests'] = this.tests;
        }
        if (this.groups) {
            filters['--groups'] = this.groups;
        }
        return filters;
    }
    async run() {
        const { TestsServer } = await Promise.resolve().then(() => __importStar(require('../src/Test')));
        try {
            if (this.watch) {
                await new TestsServer(this.application.appRoot, this.getTestFilters(), this.nodeArgs, this.logger).watch();
            }
            else {
                await new TestsServer(this.application.appRoot, this.getTestFilters(), this.nodeArgs, this.logger).run();
            }
        }
        catch (error) {
            this.exitCode = 1;
            this.logger.fatal(error);
        }
    }
}
Test.commandName = 'test';
Test.description = 'Run AdonisJS tests';
Test.settings = {
    stayAlive: true,
};
__decorate([
    standalone_1.args.spread({ description: 'Run tests for only the specified suites', required: false }),
    __metadata("design:type", Array)
], Test.prototype, "suites", void 0);
__decorate([
    standalone_1.flags.array({
        description: 'Run tests for the mentioned files only',
    }),
    __metadata("design:type", Array)
], Test.prototype, "files", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Watch for file changes and re-run tests on file change',
        alias: 'w',
    }),
    __metadata("design:type", Boolean)
], Test.prototype, "watch", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Detect file changes by polling files instead of listening to filesystem events',
        alias: 'p',
    }),
    __metadata("design:type", Boolean)
], Test.prototype, "poll", void 0);
__decorate([
    standalone_1.flags.array({ description: 'CLI options to pass to the node command line' }),
    __metadata("design:type", Array)
], Test.prototype, "nodeArgs", void 0);
__decorate([
    standalone_1.flags.array({ description: 'Filter tests by tags' }),
    __metadata("design:type", Array)
], Test.prototype, "tags", void 0);
__decorate([
    standalone_1.flags.array({ description: 'Filter tests by ignoring tags' }),
    __metadata("design:type", Array)
], Test.prototype, "ignoreTags", void 0);
__decorate([
    standalone_1.flags.array({ description: 'Filter tests by title' }),
    __metadata("design:type", Array)
], Test.prototype, "tests", void 0);
__decorate([
    standalone_1.flags.array({ description: 'Filter tests by group title' }),
    __metadata("design:type", Array)
], Test.prototype, "groups", void 0);
__decorate([
    standalone_1.flags.number({ description: 'Customize tests timeout' }),
    __metadata("design:type", Number)
], Test.prototype, "timeout", void 0);
__decorate([
    standalone_1.flags.boolean({ description: 'Force exit the tests runner process' }),
    __metadata("design:type", Boolean)
], Test.prototype, "forceExit", void 0);
exports.default = Test;
