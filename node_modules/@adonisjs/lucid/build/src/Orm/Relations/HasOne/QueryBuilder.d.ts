import { Knex } from 'knex';
import { LucidRow } from '@ioc:Adonis/Lucid/Orm';
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database';
import { HasOne } from './index';
import { BaseQueryBuilder } from '../Base/QueryBuilder';
/**
 * Extends the model query builder for executing queries in scope
 * to the current relationship
 */
export declare class HasOneQueryBuilder extends BaseQueryBuilder {
    private parent;
    private relation;
    protected appliedConstraints: boolean;
    constructor(builder: Knex.QueryBuilder, client: QueryClientContract, parent: LucidRow | LucidRow[], relation: HasOne);
    /**
     * Profiler data for HasOne relationship
     */
    protected profilerData(): {
        type: string;
        model: string;
        relatedModel: string;
    };
    /**
     * The keys for constructing the join query
     */
    protected getRelationKeys(): string[];
    /**
     * Clones the current query
     */
    clone(): HasOneQueryBuilder;
    /**
     * Applies constraint to limit rows to the current relationship
     * only.
     */
    protected applyConstraints(): void;
    /**
     * Dis-allow hasOne pagination
     */
    paginate(): Promise<any>;
    /**
     * Dis-allow hasOne group query limit
     */
    getGroupLimitQuery(): never;
}
