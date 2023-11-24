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
exports.HasOneQueryBuilder = void 0;
const utils_1 = require("../../../utils");
const QueryBuilder_1 = require("../Base/QueryBuilder");
/**
 * Extends the model query builder for executing queries in scope
 * to the current relationship
 */
class HasOneQueryBuilder extends QueryBuilder_1.BaseQueryBuilder {
    constructor(builder, client, parent, relation) {
        super(builder, client, relation, (userFn) => {
            return ($builder) => {
                const subQuery = new HasOneQueryBuilder($builder, this.client, this.parent, this.relation);
                subQuery.isChildQuery = true;
                subQuery.isRelatedPreloadQuery = this.isRelatedPreloadQuery;
                userFn(subQuery);
                subQuery.applyWhere();
            };
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: parent
        });
        Object.defineProperty(this, "relation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relation
        });
        Object.defineProperty(this, "appliedConstraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    /**
     * Profiler data for HasOne relationship
     */
    profilerData() {
        return {
            type: this.relation.type,
            model: this.relation.model.name,
            relatedModel: this.relation.relatedModel().name,
        };
    }
    /**
     * The keys for constructing the join query
     */
    getRelationKeys() {
        return [this.relation.foreignKey];
    }
    /**
     * Clones the current query
     */
    clone() {
        const clonedQuery = new HasOneQueryBuilder(this.knexQuery.clone(), this.client, this.parent, this.relation);
        this.applyQueryFlags(clonedQuery);
        clonedQuery.appliedConstraints = this.appliedConstraints;
        clonedQuery.isRelatedPreloadQuery = this.isRelatedPreloadQuery;
        clonedQuery.debug(this.debugQueries);
        clonedQuery.reporterData(this.customReporterData);
        return clonedQuery;
    }
    /**
     * Applies constraint to limit rows to the current relationship
     * only.
     */
    applyConstraints() {
        if (this.appliedConstraints) {
            return;
        }
        this.appliedConstraints = true;
        const queryAction = this.queryAction();
        /**
         * Eager query contraints
         */
        if (Array.isArray(this.parent)) {
            this.wrapExisting().whereIn(this.relation.foreignKey, (0, utils_1.unique)(this.parent.map((model) => {
                return (0, utils_1.getValue)(model, this.relation.localKey, this.relation, queryAction);
            })));
            return;
        }
        /**
         * Query constraints
         */
        const value = (0, utils_1.getValue)(this.parent, this.relation.localKey, this.relation, queryAction);
        this.wrapExisting().where(this.relation.foreignKey, value);
        /**
         * Do not add limit when updating or deleting
         */
        if (!['update', 'delete'].includes(queryAction)) {
            this.limit(1);
        }
    }
    /**
     * Dis-allow hasOne pagination
     */
    paginate() {
        throw new Error(`Cannot paginate a hasOne relationship "(${this.relation.relationName})"`);
    }
    /**
     * Dis-allow hasOne group query limit
     */
    getGroupLimitQuery() {
        throw new Error(`Cannot apply groupLimit or groupOrderBy on hasOne relationship "(${this.relation.relationName})"`);
    }
}
exports.HasOneQueryBuilder = HasOneQueryBuilder;
