import { Knex } from 'knex';
import { LucidRow } from '@ioc:Adonis/Lucid/Orm';
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database';
import { BelongsTo } from './index';
import { BaseQueryBuilder } from '../Base/QueryBuilder';
/**
 * Extends the model query builder for executing queries in scope
 * to the current relationship
 */
export declare class BelongsToQueryBuilder extends BaseQueryBuilder {
    private parent;
    private relation;
    protected appliedConstraints: boolean;
    constructor(builder: Knex.QueryBuilder, client: QueryClientContract, parent: LucidRow | LucidRow[], relation: BelongsTo);
    /**
     * Raises exception that FK value is null
     */
    private raiseMissingForeignKey;
    /**
     * The profiler data for belongsTo relatioship
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
     * Applies constraint to limit rows to the current relationship
     * only.
     */
    protected applyConstraints(): void;
    /**
     * Clones the current query
     */
    clone(): BelongsToQueryBuilder;
    /**
     * Dis-allow belongsTo pagination
     */
    paginate(): Promise<any>;
    /**
     * Dis-allow belongsTo group query limit
     */
    getGroupLimitQuery(): never;
}
