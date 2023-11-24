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
exports.HasManyThroughClient = void 0;
const QueryBuilder_1 = require("./QueryBuilder");
const SubQueryBuilder_1 = require("./SubQueryBuilder");
/**
 * Query client for executing queries in scope to the defined
 * relationship
 */
class HasManyThroughClient {
    constructor(relation, parent, client) {
        Object.defineProperty(this, "relation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relation
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: parent
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
    }
    /**
     * Generate a related query builder
     */
    static query(client, relation, rows) {
        const query = new QueryBuilder_1.HasManyThroughQueryBuilder(client.knexQuery(), client, rows, relation);
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Generate a related eager query builder
     */
    static eagerQuery(client, relation, rows) {
        const query = new QueryBuilder_1.HasManyThroughQueryBuilder(client.knexQuery(), client, rows, relation);
        query.isRelatedPreloadQuery = true;
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Returns an instance of the sub query
     */
    static subQuery(client, relation) {
        const query = new SubQueryBuilder_1.HasManyThroughSubQueryBuilder(client.knexQuery(), client, relation);
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Returns an instance of has many through query builder
     */
    query() {
        return HasManyThroughClient.query(this.client, this.relation, this.parent);
    }
}
exports.HasManyThroughClient = HasManyThroughClient;
