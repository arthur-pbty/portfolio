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
exports.BaseQueryBuilder = void 0;
const QueryBuilder_1 = require("../../QueryBuilder");
/**
 * Base query builder for ORM Relationships
 */
class BaseQueryBuilder extends QueryBuilder_1.ModelQueryBuilder {
    constructor(builder, client, relation, dbCallback) {
        super(builder, relation.relatedModel(), client, dbCallback);
        /**
         * Eager constraints
         */
        Object.defineProperty(this, "groupConstraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        /**
         * Is query a relationship query obtained using one of the preload methods.
         */
        Object.defineProperty(this, "isRelatedPreloadQuery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    /**
     * Is query a relationship query obtained using `related('relation').query()`
     */
    get isRelatedQuery() {
        return true;
    }
    /**
     * Is query a relationship query obtained using `related('relation').subQuery()`
     */
    get isRelatedSubQuery() {
        return false;
    }
    /**
     * Returns the selected columns
     */
    getSelectedColumns() {
        return this.knexQuery['_statements'].find(({ grouping }) => grouping === 'columns');
    }
    /**
     * Returns the profiler action. Protected, since the class is extended
     * by relationships
     */
    getQueryData() {
        return Object.assign(this.knexQuery.toSQL(), {
            connection: this.client.connectionName,
            inTransaction: this.client.isTransaction,
            model: this.model.name,
            eagerLoading: this.isRelatedPreloadQuery,
            relation: this.profilerData(),
        });
    }
    /**
     * Returns the name of the query action. Used mainly for
     * raising descriptive errors
     */
    queryAction() {
        let action = this.knexQuery['_method'];
        if (action === 'del') {
            action = 'delete';
        }
        if (action === 'select' && this.isRelatedPreloadQuery) {
            action = 'preload';
        }
        return action;
    }
    /**
     * Selects the relation keys. Invoked by the preloader
     */
    selectRelationKeys() {
        const columns = this.getSelectedColumns();
        /**
         * No columns have been defined, we will let knex do it's job by
         * adding `select *`
         */
        if (!columns) {
            return this;
        }
        /**
         * Finally push relation columns to existing selected columns
         */
        this.getRelationKeys().forEach((key) => {
            key = this.resolveKey(key);
            if (!columns.value.includes(key)) {
                columns.value.push(key);
            }
        });
        return this;
    }
    /**
     * Define the group limit
     */
    groupLimit(limit) {
        this.groupConstraints.limit = limit;
        return this;
    }
    /**
     * Define the group limit
     */
    groupOrderBy(column, direction) {
        this.groupConstraints.orderBy = { column, direction };
        return this;
    }
    /**
     * Get query sql
     */
    toSQL() {
        this.applyConstraints();
        if (this.isRelatedPreloadQuery) {
            return this.groupConstraints.limit ? this.getGroupLimitQuery().toSQL() : super.toSQL();
        }
        /**
         * Apply orderBy and limit on the standard query when not
         * an eagerloading query
         */
        if (this.groupConstraints.limit) {
            this.limit(this.groupConstraints.limit);
        }
        if (this.groupConstraints.orderBy) {
            this.orderBy(this.groupConstraints.orderBy.column, this.groupConstraints.orderBy.direction);
        }
        return super.toSQL();
    }
    /**
     * Apply constraints before fetching the first
     * row
     */
    first() {
        this.applyConstraints();
        return super.first();
    }
    /**
     * Execute query
     */
    exec() {
        this.applyConstraints();
        if (this.isRelatedPreloadQuery) {
            return this.groupConstraints.limit ? this.getGroupLimitQuery().exec() : super.exec();
        }
        /**
         * Apply orderBy and limit on the standard query when not
         * an eagerloading query
         */
        if (this.groupConstraints.limit) {
            this.limit(this.groupConstraints.limit);
        }
        if (this.groupConstraints.orderBy) {
            this.orderBy(this.groupConstraints.orderBy.column, this.groupConstraints.orderBy.direction);
        }
        return super.exec();
    }
}
exports.BaseQueryBuilder = BaseQueryBuilder;
