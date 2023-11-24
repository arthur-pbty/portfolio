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
const path_1 = require("path");
const application_1 = require("@adonisjs/application");
const ioc_transformer_1 = require("@adonisjs/ioc-transformer");
/**
 * Transformer to transform AdonisJS IoC container import
 * statements
 */
function default_1(ts, appRoot) {
    return (0, ioc_transformer_1.iocTransformer)(ts, application_1.rcParser.parse(require((0, path_1.join)(appRoot, '.adonisrc.json'))));
}
exports.default = default_1;
