import { QueryClientContract, OneOrMany } from '@ioc:Adonis/Lucid/Database';
import { LucidModel, LucidRow, HasManyThroughClientContract } from '@ioc:Adonis/Lucid/Orm';
import { HasManyThrough } from './index';
import { HasManyThroughQueryBuilder } from './QueryBuilder';
import { HasManyThroughSubQueryBuilder } from './SubQueryBuilder';
/**
 * Query client for executing queries in scope to the defined
 * relationship
 */
export declare class HasManyThroughClient implements HasManyThroughClientContract<HasManyThrough, LucidModel> {
    relation: HasManyThrough;
    private parent;
    private client;
    constructor(relation: HasManyThrough, parent: LucidRow, client: QueryClientContract);
    /**
     * Generate a related query builder
     */
    static query(client: QueryClientContract, relation: HasManyThrough, rows: OneOrMany<LucidRow>): HasManyThroughQueryBuilder;
    /**
     * Generate a related eager query builder
     */
    static eagerQuery(client: QueryClientContract, relation: HasManyThrough, rows: OneOrMany<LucidRow>): HasManyThroughQueryBuilder;
    /**
     * Returns an instance of the sub query
     */
    static subQuery(client: QueryClientContract, relation: HasManyThrough): HasManyThroughSubQueryBuilder;
    /**
     * Returns an instance of has many through query builder
     */
    query(): any;
}
