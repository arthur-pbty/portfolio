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
exports.ReferenceBuilder = void 0;
/**
 * Reference builder to create SQL reference values
 */
class ReferenceBuilder {
    constructor(ref, client) {
        Object.defineProperty(this, "ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ref
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "alias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Define schema
     */
    withSchema(schema) {
        this.schema = schema;
        return this;
    }
    /**
     * Define alias
     */
    as(alias) {
        this.alias = alias;
        return this;
    }
    /**
     * Converts reference to knex
     */
    toKnex(client) {
        const ref = (client || this.client).ref(this.ref);
        this.schema && ref.withSchema(this.schema);
        this.alias && ref.as(this.alias);
        return ref;
    }
}
exports.ReferenceBuilder = ReferenceBuilder;
