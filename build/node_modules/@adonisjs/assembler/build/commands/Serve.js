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
 * Compile typescript project to Javascript and start
 * the HTTP server
 */
class Serve extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        /**
         * Bundle frontend assets. Defaults to true
         */
        this.assets = true;
        /**
         * Arguments to pass to the `node` binary
         */
        this.nodeArgs = [];
        /**
         * Arguments to pass to the `encore` binary
         */
        this.encoreArgs = [];
    }
    async run() {
        const { DevServer } = await Promise.resolve().then(() => __importStar(require('../src/DevServer')));
        try {
            if (this.watch) {
                await new DevServer(this.application.appRoot, this.nodeArgs, this.encoreArgs, this.assets, this.logger).watch(this.poll);
            }
            else {
                await new DevServer(this.application.appRoot, this.nodeArgs, this.encoreArgs, this.assets, this.logger).start();
            }
        }
        catch (error) {
            this.logger.fatal(error);
        }
    }
}
Serve.commandName = 'serve';
Serve.description = 'Start the AdonisJS HTTP server, along with the file watcher. Also starts the webpack dev server when webpack encore is installed';
Serve.settings = {
    stayAlive: true,
};
__decorate([
    standalone_1.flags.boolean({
        description: 'Start webpack dev server when encore is installed. Use "--no-assets" to disable',
    }),
    __metadata("design:type", Boolean)
], Serve.prototype, "assets", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Watch for file changes and re-start the HTTP server on change',
        alias: 'w',
    }),
    __metadata("design:type", Boolean)
], Serve.prototype, "watch", void 0);
__decorate([
    standalone_1.flags.boolean({
        description: 'Detect file changes by polling files instead of listening to filesystem events',
        alias: 'p',
    }),
    __metadata("design:type", Boolean)
], Serve.prototype, "poll", void 0);
__decorate([
    standalone_1.flags.array({ description: 'CLI options to pass to the node command line' }),
    __metadata("design:type", Array)
], Serve.prototype, "nodeArgs", void 0);
__decorate([
    standalone_1.flags.array({ description: 'CLI options to pass to the encore command line' }),
    __metadata("design:type", Array)
], Serve.prototype, "encoreArgs", void 0);
exports.default = Serve;
