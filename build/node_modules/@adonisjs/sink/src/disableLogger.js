"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("mrm-core/src/util/log"));
/**
 * Overwriting mrm logger to have support for custom log messages
 */
function noop() { }
log_1.default.info = noop;
log_1.default.removed = noop;
log_1.default.added = noop;
