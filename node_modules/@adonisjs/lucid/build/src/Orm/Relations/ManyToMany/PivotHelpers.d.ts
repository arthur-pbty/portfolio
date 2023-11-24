import { ManyToManyQueryBuilder } from './QueryBuilder';
import { ManyToManySubQueryBuilder } from './SubQueryBuilder';
export declare class PivotHelpers {
    private query;
    private aliasSelectColumns;
    constructor(query: ManyToManyQueryBuilder | ManyToManySubQueryBuilder, aliasSelectColumns: boolean);
    /**
     * Prefixes the pivot table name to a column
     */
    prefixPivotTable(column: string): string;
    /**
     * Adds a where pivot condition to the query
     */
    wherePivot(varition: 'or' | 'and' | 'not' | 'orNot', key: any, operator?: any, value?: any): any;
    /**
     * Adds a where pivot condition to the query
     */
    whereNullPivot(varition: 'or' | 'and' | 'not' | 'orNot', key: string): any;
    /**
     * Adds a where pivot condition to the query
     */
    whereInPivot(varition: 'or' | 'and' | 'not' | 'orNot', key: any, value?: any): any;
    /**
     * Select pivot columns
     */
    pivotColumns(columns: string[]): this;
}
