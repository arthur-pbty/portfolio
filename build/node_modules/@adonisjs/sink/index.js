"use strict";
/*
 * @adonisjs/sink
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.tasks = exports.files = exports.getPrompt = exports.sinkVersion = exports.tasksUi = exports.testingRenderer = exports.supportsColors = exports.isInteractive = exports.instructions = exports.sticker = exports.logger = exports.table = void 0;
var cliui_1 = require("@poppinss/cliui");
Object.defineProperty(exports, "table", { enumerable: true, get: function () { return cliui_1.table; } });
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return cliui_1.logger; } });
Object.defineProperty(exports, "sticker", { enumerable: true, get: function () { return cliui_1.sticker; } });
Object.defineProperty(exports, "instructions", { enumerable: true, get: function () { return cliui_1.instructions; } });
Object.defineProperty(exports, "isInteractive", { enumerable: true, get: function () { return cliui_1.isInteractive; } });
Object.defineProperty(exports, "supportsColors", { enumerable: true, get: function () { return cliui_1.supportsColors; } });
Object.defineProperty(exports, "testingRenderer", { enumerable: true, get: function () { return cliui_1.testingRenderer; } });
Object.defineProperty(exports, "tasksUi", { enumerable: true, get: function () { return cliui_1.tasks; } });
require("./src/disableLogger");
const pkg = __importStar(require("./package.json"));
/**
 * Returns a new instance of prompt. Also we lazy load the prompts
 */
function getPrompt() {
    const { Prompt, FakePrompt } = require('@poppinss/prompts');
    return process.env.CLI_UI_IS_TESTING ? new FakePrompt() : new Prompt();
}
exports.getPrompt = getPrompt;
/**
 * Sharing the sink version, since sink is mainly passed as a reference by
 * the cli
 */
exports.sinkVersion = pkg.version;
exports.files = __importStar(require("./src/Files"));
exports.tasks = __importStar(require("./src/Tasks"));
exports.utils = __importStar(require("./src/Utils"));
