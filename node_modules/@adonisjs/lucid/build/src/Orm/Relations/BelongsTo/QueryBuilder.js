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
exports.BelongsToQueryBuilder = void 0;
const utils_1 = require("@poppinss/utils");
const utils_2 = require("../../../utils");
const QueryBuilder_1 = require("../Base/QueryBuilder");
/**
 * Extends the model query builder for executing queries in scope
 * to the current relationship
 */
class BelongsToQueryBuilder extends QueryBuilder_1.BaseQueryBuilder {
    constructor(builder, client, parent, relation) {
        super(builder, client, relation, (userFn) => {
            return ($builder) => {
                const subQuery = new BelongsToQueryBuilder($builder, this.client, this.parent, this.relation);
                subQuery.isRelatedPreloadQuery = this.isRelatedPreloadQuery;
                subQuery.isChildQuery = true;
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
     * Raises exception that FK value is null
     */
    raiseMissingForeignKey() {
        const { relationName, foreignKey } = this.relation;
        const modelName = this.relation.model.name;
        throw new utils_1.Exception([
            `Cannot preload "${relationName}", value of "${modelName}.${foreignKey}" is undefined.`,
            'Make sure to set "null" as the default value for foreign keys',
        ].join(' '), 500);
    }
    /**
     * The profiler data for belongsTo relatioship
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
        return [this.relation.localKey];
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
            const foreignKeyValues = this.parent
                .map((model) => model[this.relation.foreignKey])
                .filter((foreignKeyValue) => {
                if (foreignKeyValue === undefined) {
                    this.raiseMissingForeignKey();
                }
                return foreignKeyValue !== null;
            });
            this.wrapExisting().whereIn(this.relation.localKey, (0, utils_2.unique)(foreignKeyValues));
            return;
        }
        /**
         * Query constraints
         */
        if (this.parent[this.relation.foreignKey] === undefined) {
            this.raiseMissingForeignKey();
        }
        this.wrapExisting().where(this.relation.localKey, this.parent[this.relation.foreignKey]);
        /**
         * Do not add limit when updating or deleting
         */
        if (!['update', 'delete'].includes(queryAction)) {
            this.limit(1);
        }
        return;
    }
    /**
     * Clones the current query
     */
    clone() {
        const clonedQuery = new BelongsToQueryBuilder(this.knexQuery.clone(), this.client, this.parent, this.relation);
        this.applyQueryFlags(clonedQuery);
        clonedQuery.appliedConstraints = this.appliedConstraints;
        clonedQuery.isRelatedPreloadQuery = this.isRelatedPreloadQuery;
        clonedQuery.debug(this.debugQueries);
        clonedQuery.reporterData(this.customReporterData);
        return clonedQuery;
    }
    /**
     * Dis-allow belongsTo pagination
     */
    paginate() {
        throw new Error(`Cannot paginate a belongsTo relationship "(${this.relation.relationName})"`);
    }
    /**
     * Dis-allow belongsTo group query limit
     */
    getGroupLimitQuery() {
        throw new Error(`Cannot apply groupLimit or groupOrderBy on a belongsTo relationship "(${this.relation.relationName})"`);
    }
}
exports.BelongsToQueryBuilder = BelongsToQueryBuilder;
