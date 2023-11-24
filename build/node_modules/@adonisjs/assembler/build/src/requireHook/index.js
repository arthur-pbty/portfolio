"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const require_ts_1 = require("@adonisjs/require-ts");
/**
 * Exports the function to be used for registering require hook
 * for AdonisJS applications
 */
function registerForAdonis(appRoot) {
    return (0, require_ts_1.register)(appRoot, {
        cache: true,
        transformers: {
            after: [
                {
                    transform: '@adonisjs/assembler/build/src/requireHook/ioc-transformer',
                },
            ],
        },
    });
}
exports.default = registerForAdonis;
