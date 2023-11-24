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
exports.ModelKeys = void 0;
/**
 * Exposes the API to collect, get and resolve model keys
 */
class ModelKeys {
    constructor(keys = {}) {
        Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keys
        });
    }
    /**
     * Add a new key
     */
    add(key, value) {
        this.keys[key] = value;
    }
    get(key, defaultValue) {
        return this.keys[key] || defaultValue;
    }
    /**
     * Resolve key, if unable to resolve, the key will be
     * returned as it is.
     */
    resolve(key) {
        return this.get(key, key);
    }
    /**
     * Return all keys
     */
    all() {
        return this.keys;
    }
}
exports.ModelKeys = ModelKeys;
