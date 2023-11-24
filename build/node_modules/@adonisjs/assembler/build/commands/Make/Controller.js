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
 * Command to make a new HTTP Controller
 */
class MakeController extends Base_1.BaseGenerator {
    constructor() {
        super(...arguments);
        /**
         * Required by BaseGenerator
         */
        this.suffix = 'Controller';
        this.form = 'plural';
        this.pattern = 'pascalcase';
        /**
         * Do not pluralize following controller names
         */
        this.formIgnoreList = [
            'Home',
            'Auth',
            'Login',
            'Authentication',
            'Adonis',
            'Dashboard',
            'Signup',
            'Api',
        ];
    }
    /**
     * Returns the template stub based upon the `--resource`
     * flag value
     */
    getStub() {
        return (0, path_1.join)(__dirname, '..', '..', 'templates', this.resource ? 'resource-controller.txt' : 'controller.txt');
    }
    /**
     * Pull path from the `httpControllers` directory declaration from
     * the `.adonisrc.json` file or fallback to `app/Controllers/Http`
     */
    getDestinationPath() {
        return this.getPathForNamespace('httpControllers') || 'app/Controllers/Http';
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
MakeController.commandName = 'make:controller';
MakeController.description = 'Make a new HTTP controller';
__decorate([
    standalone_1.args.string({ description: 'Name of the controller class' }),
    __metadata("design:type", String)
], MakeController.prototype, "name", void 0);
__decorate([
    standalone_1.flags.boolean({ description: 'Add resourceful methods to the controller class', alias: 'r' }),
    __metadata("design:type", Boolean)
], MakeController.prototype, "resource", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Create the controller with the exact name as provided',
        alias: 'e',
    }),
    __metadata("design:type", Boolean)
], MakeController.prototype, "exact", void 0);
exports.default = MakeController;
