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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const standalone_1 = require("@adonisjs/core/build/standalone");
const Base_1 = require("./Base");
/**
 * Command to make a new validator
 */
class MakeValidator extends Base_1.BaseGenerator {
    constructor() {
        super(...arguments);
        /**
         * Required by BaseGenerator
         */
        this.suffix = 'Validator';
        this.form = 'singular';
        this.pattern = 'pascalcase';
    }
    /**
     * Returns the template stub path
     */
    getStub() {
        return (0, path_1.join)(__dirname, '..', '..', 'templates', 'validator.txt');
    }
    /**
     * Pull path for the `validators` directory declaration from
     * the `.adonisrc.json` file or fallback to `app/Validators`
     */
    getDestinationPath() {
        return this.getPathForNamespace('validators') || 'app/Validators';
    }
    async run() {
        this.resourceName = this.name;
        this.createExact = this.exact;
        await super.generate();
    }
}
/**
 * Command meta data
 */
MakeValidator.commandName = 'make:validator';
MakeValidator.description = 'Make a new validator';
__decorate([
    standalone_1.args.string({ description: 'Name of the validator class' }),
    __metadata("design:type", String)
], MakeValidator.prototype, "name", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Create the validator with the exact name as provided',
        alias: 'e',
    }),
    __metadata("design:type", Boolean)
], MakeValidator.prototype, "exact", void 0);
exports.default = MakeValidator;
