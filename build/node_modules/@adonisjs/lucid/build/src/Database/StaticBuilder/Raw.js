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
exports.RawBuilder = void 0;
/**
 * Exposes the API to construct raw queries. If you want to execute
 * raw queries, you can use the RawQueryBuilder
 */
class RawBuilder {
    constructor(sql, bindings) {
        Object.defineProperty(this, "sql", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: sql
        });
        Object.defineProperty(this, "bindings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bindings
        });
        Object.defineProperty(this, "wrapBefore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wrapAfter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Wrap the query with before/after strings.
     */
    wrap(before, after) {
        this.wrapAfter = after;
        this.wrapBefore = before;
        return this;
    }
    /**
     * Converts the raw query to knex raw query instance
     */
    toKnex(client) {
        const rawQuery = client.raw(this.sql, this.bindings);
        if (this.wrapBefore && this.wrapAfter) {
            rawQuery.wrap(this.wrapBefore, this.wrapAfter);
        }
        return rawQuery;
    }
}
exports.RawBuilder = RawBuilder;
