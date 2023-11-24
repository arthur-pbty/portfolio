"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFile = void 0;
const mrm_core_1 = require("mrm-core");
const KeyValuePair_1 = require("../Base/KeyValuePair");
/**
 * Exposes the API to work with JSON files.
 *
 * ```ts
 * const json = new JsonFile(__dirname, 'tsconfig.json')
 * json.set('compilerOptions.lib', ['es2017'])
 *
 * json.commit()
 * ```
 */
class JsonFile extends KeyValuePair_1.KeyValuePair {
    constructor(basePath, filename) {
        super(basePath);
        this.cdIn();
        this.filePointer = (0, mrm_core_1.json)(filename);
        this.cdOut();
    }
}
exports.JsonFile = JsonFile;
