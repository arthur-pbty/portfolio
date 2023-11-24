"use strict";
/*
 * @adonisjs/lucid
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
class MakeSeeder extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * The name of the seeder file.
         */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Execute command
     */
    async run() {
        const stub = (0, path_1.join)(__dirname, '..', 'templates', 'seeder.txt');
        const path = this.application.rcFile.directories.seeds;
        this.generator
            .addFile(this.name, { pattern: 'pascalcase', form: 'singular' })
            .stub(stub)
            .destinationDir(path || 'database/Seeders')
            .useMustache()
            .appRoot(this.application.cliCwd || this.application.appRoot);
        await this.generator.run();
    }
}
Object.defineProperty(MakeSeeder, "commandName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'make:seeder'
});
Object.defineProperty(MakeSeeder, "description", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'Make a new Seeder file'
});
__decorate([
    standalone_1.args.string({ description: 'Name of the seeder class' }),
    __metadata("design:type", String)
], MakeSeeder.prototype, "name", void 0);
exports.default = MakeSeeder;
