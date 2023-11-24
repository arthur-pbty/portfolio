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
exports.FactoryManager = void 0;
const FactoryModel_1 = require("./FactoryModel");
/**
 * Factory manager exposes the API to register factories.
 */
class FactoryManager {
    constructor() {
        Object.defineProperty(this, "stubCounter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "stubIdCallback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (counter) => counter
        });
    }
    /**
     * Returns the next id
     */
    getNextId(model) {
        return this.stubIdCallback(this.stubCounter++, model);
    }
    /**
     * Define a factory model
     */
    define(model, callback) {
        return new FactoryModel_1.FactoryModel(model, callback, this);
    }
    /**
     * Define custom callback to generate stub ids
     */
    stubId(callback) {
        this.stubIdCallback = callback;
    }
}
exports.FactoryManager = FactoryManager;
