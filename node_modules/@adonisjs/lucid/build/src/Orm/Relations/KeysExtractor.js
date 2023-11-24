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
exports.KeysExtractor = void 0;
const utils_1 = require("@poppinss/utils");
/**
 * Utility to consistently extract relationship keys from the model
 * and the relation model.
 */
class KeysExtractor {
    constructor(model, relationName, keys) {
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: model
        });
        Object.defineProperty(this, "relationName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relationName
        });
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keys
        });
    }
    /**
     * Extract the defined keys from the models
     */
    extract() {
        const relationRef = `${this.model.name}.${this.relationName}`;
        return Object.keys(this.keys).reduce((result, extractKey) => {
            const { key, model } = this.keys[extractKey];
            const attribute = model.$getColumn(key);
            if (!attribute) {
                throw new utils_1.Exception(`"${relationRef}" expects "${key}" to exist on "${model.name}" model, but is missing`, 500, 'E_MISSING_MODEL_ATTRIBUTE');
            }
            result[extractKey] = {
                attributeName: key,
                columnName: attribute.columnName,
            };
            return result;
        }, {});
    }
}
exports.KeysExtractor = KeysExtractor;
