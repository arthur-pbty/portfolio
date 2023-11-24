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
exports.PivotHelpers = void 0;
const SubQueryBuilder_1 = require("./SubQueryBuilder");
class PivotHelpers {
    constructor(query, aliasSelectColumns) {
        Object.defineProperty(this, "query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: query
        });
        Object.defineProperty(this, "aliasSelectColumns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: aliasSelectColumns
        });
    }
    /**
     * Prefixes the pivot table name to a column
     */
    prefixPivotTable(column) {
        if (column.includes('.')) {
            return column;
        }
        if (this.query instanceof SubQueryBuilder_1.ManyToManySubQueryBuilder) {
            return `${this.query.relation.pivotTable}.${column}`;
        }
        return this.query.isPivotOnlyQuery ? column : `${this.query.relation.pivotTable}.${column}`;
    }
    /**
     * Adds a where pivot condition to the query
     */
    wherePivot(varition, key, operator, value) {
        let method = 'where';
        switch (varition) {
            case 'or':
                method = 'orWhere';
                break;
            case 'not':
                method = 'whereNot';
                break;
            case 'orNot':
                method = 'orWhereNot';
        }
        if (value !== undefined) {
            return this.query[method](this.prefixPivotTable(key), operator, value);
        }
        else if (operator !== undefined) {
            return this.query[method](this.prefixPivotTable(key), operator);
        }
        else {
            return this.query[method](key);
        }
    }
    /**
     * Adds a where pivot condition to the query
     */
    whereNullPivot(varition, key) {
        let method = 'whereNull';
        switch (varition) {
            case 'or':
                method = 'orWhereNull';
                break;
            case 'not':
                method = 'whereNotNull';
                break;
            case 'orNot':
                method = 'orWhereNotNull';
        }
        return this.query[method](this.prefixPivotTable(key));
    }
    /**
     * Adds a where pivot condition to the query
     */
    whereInPivot(varition, key, value) {
        let method = 'whereIn';
        switch (varition) {
            case 'or':
                method = 'orWhereIn';
                break;
            case 'not':
                method = 'whereNotIn';
                break;
            case 'orNot':
                method = 'orWhereNotIn';
        }
        key = Array.isArray(key)
            ? key.map((one) => this.prefixPivotTable(one))
            : this.prefixPivotTable(key);
        if (value !== undefined) {
            return this.query[method](key, value);
        }
        else {
            return this.query[method](key);
        }
    }
    /**
     * Select pivot columns
     */
    pivotColumns(columns) {
        this.query.knexQuery.select(columns.map((column) => {
            if (this.aliasSelectColumns) {
                return `${this.prefixPivotTable(column)} as ${this.query.relation.pivotAlias(column)}`;
            }
            return this.prefixPivotTable(column);
        }));
        return this;
    }
}
exports.PivotHelpers = PivotHelpers;
