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
exports.HasManyThroughSubQueryBuilder = void 0;
const SubQueryBuilder_1 = require("../Base/SubQueryBuilder");
/**
 * Extends the model query builder for executing queries in scope
 * to the current relationship
 */
class HasManyThroughSubQueryBuilder extends SubQueryBuilder_1.BaseSubQueryBuilder {
    constructor(builder, client, relation) {
        super(builder, client, relation, (userFn) => {
            return ($builder) => {
                const subQuery = new HasManyThroughSubQueryBuilder($builder, this.client, this.relation);
                subQuery.isChildQuery = true;
                userFn(subQuery);
                subQuery.applyWhere();
            };
        });
        Object.defineProperty(this, "relation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relation
        });
        /**
         * A boolean to track if query constraints for the relationship
         * has been applied or not
         */
        Object.defineProperty(this, "appliedConstraints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**
         * Reference to the related table
         */
        Object.defineProperty(this, "relatedTable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.relation.relatedModel().table
        });
        /**
         * Reference to the through table
         */
        Object.defineProperty(this, "throughTable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.relation.throughModel().table
        });
        Object.defineProperty(this, "hasSelfRelation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.relatedTable === this.relation.model.table
        });
    }
    /**
     * Prefixes the through table name to a column
     */
    prefixThroughTable(column) {
        return column.includes('.') ? column : `${this.throughTable}.${column}`;
    }
    /**
     * Prefixes the related table name to a column
     */
    prefixRelatedTable(column) {
        if (column.includes('.')) {
            return column;
        }
        if (this.hasSelfRelation) {
            return `${this.selfJoinAlias}.${column}`;
        }
        return `${this.relatedTable}.${column}`;
    }
    /**
     * Transforms the selected column names by prefixing the
     * table name
     */
    transformRelatedTableColumns(columns) {
        return columns.map((column) => {
            if (typeof column === 'string') {
                return this.prefixRelatedTable(this.resolveKey(column));
            }
            return this.transformValue(column);
        });
    }
    /**
     * The keys for constructing the join query
     */
    getRelationKeys() {
        return [this.relation.throughForeignKeyColumnName];
    }
    /**
     * Select keys from the related table
     */
    select(...args) {
        let columns = args;
        if (Array.isArray(args[0])) {
            columns = args[0];
        }
        this.knexQuery.select(this.transformRelatedTableColumns(columns));
        return this;
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
        /**
         * In case of self joins, we must alias the table selection
         */
        if (this.relation.relatedModel() === this.relation.model) {
            this.knexQuery.from(`${this.relatedTable} as ${this.selfJoinAlias}`);
        }
        this.innerJoin(this.throughTable, this.prefixThroughTable(this.relation.throughLocalKeyColumnName), this.prefixRelatedTable(this.relation.throughForeignKeyColumnName));
        this.where(`${this.relation.model.table}.${this.relation.localKeyColumnName}`, this.client.ref(this.prefixThroughTable(this.relation.foreignKeyColumnName)));
    }
    /**
     * Clones the current query
     */
    clone() {
        const clonedQuery = new HasManyThroughSubQueryBuilder(this.knexQuery.clone(), this.client, this.relation);
        this.applyQueryFlags(clonedQuery);
        clonedQuery.appliedConstraints = this.appliedConstraints;
        clonedQuery.debug(this.debugQueries);
        clonedQuery.reporterData(this.customReporterData);
        return clonedQuery;
    }
}
exports.HasManyThroughSubQueryBuilder = HasManyThroughSubQueryBuilder;
