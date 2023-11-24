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
exports.YamlFile = void 0;
const mrm_core_1 = require("mrm-core");
const KeyValuePair_1 = require("../Base/KeyValuePair");
/**
 * Exposes the API to work with Yaml files.
 *
 * ```ts
 * const yaml = new YamlFile(__dirname, '.travis.yml')
 * yaml.set('language', 'node_js')
 * yaml.set('language', [4, 6])
 *
 * yaml.commit()
 * ```
 */
class YamlFile extends KeyValuePair_1.KeyValuePair {
    constructor(basePath, filename) {
        super(basePath);
        this.cdIn();
        this.filePointer = (0, mrm_core_1.yaml)(filename);
        this.cdOut();
    }
}
exports.YamlFile = YamlFile;
