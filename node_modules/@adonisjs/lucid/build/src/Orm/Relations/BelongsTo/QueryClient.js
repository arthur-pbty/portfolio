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
exports.BelongsToQueryClient = void 0;
const utils_1 = require("../../../utils");
const QueryBuilder_1 = require("./QueryBuilder");
const SubQueryBuilder_1 = require("./SubQueryBuilder");
/**
 * Query client for executing queries in scope to the belongsTo relationship.
 */
class BelongsToQueryClient {
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
     * Generate a query builder instance
     */
    static query(client, relation, rows) {
        const query = new QueryBuilder_1.BelongsToQueryBuilder(client.knexQuery(), client, rows, relation);
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Generate a eager query
     */
    static eagerQuery(client, relation, rows) {
        const query = new QueryBuilder_1.BelongsToQueryBuilder(client.knexQuery(), client, rows, relation);
        query.isRelatedPreloadQuery = true;
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Returns an instance of the subquery
     */
    static subQuery(client, relation) {
        const query = new SubQueryBuilder_1.BelongsToSubQueryBuilder(client.knexQuery(), client, relation);
        typeof relation.onQueryHook === 'function' && relation.onQueryHook(query);
        return query;
    }
    /**
     * Returns instance of query builder
     */
    query() {
        return BelongsToQueryClient.query(this.client, this.relation, this.parent);
    }
    /**
     * Associate the related model with the parent model
     */
    async associate(related) {
        await (0, utils_1.managedTransaction)(this.parent.$trx || this.client, async (trx) => {
            related.$trx = trx;
            await related.save();
            this.relation.hydrateForPersistance(this.parent, related);
            this.parent.$trx = trx;
            await this.parent.save();
        });
    }
    /**
     * Drop association
     */
    async dissociate() {
        this.parent[this.relation.foreignKey] = null;
        await this.parent.save();
    }
}
exports.BelongsToQueryClient = BelongsToQueryClient;
