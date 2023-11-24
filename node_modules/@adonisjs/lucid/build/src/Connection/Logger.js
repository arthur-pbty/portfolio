"use strict";
/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
/**
 * Custom knex logger that uses adonisjs logger under the
 * hood.
 */
class Logger {
    constructor(name, adonisLogger) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "adonisLogger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: adonisLogger
        });
        Object.defineProperty(this, "warn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (message) {
                this.adonisLogger.warn(message);
            }.bind(this)
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (message) {
                this.adonisLogger.error(message);
            }.bind(this)
        });
        Object.defineProperty(this, "deprecate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (message) {
                this.adonisLogger.info(message);
            }.bind(this)
        });
        Object.defineProperty(this, "debug", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (message) {
                this.warn('"debug" property inside config is depreciated. We recommend using "db:query" event for enrich logging');
                this.adonisLogger.debug(message);
            }.bind(this)
        });
    }
}
exports.Logger = Logger;
