import { Knex } from 'knex';
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database';
import { LucidModel, RelationSubQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import { HasOne } from './index';
import { BaseSubQueryBuilder } from '../Base/SubQueryBuilder';
export declare class HasOneSubQueryBuilder extends BaseSubQueryBuilder implements RelationSubQueryBuilderContract<LucidModel> {
    private relation;
    protected appliedConstraints: boolean;
    constructor(builder: Knex.QueryBuilder, client: QueryClientContract, relation: HasOne);
    /**
     * The keys for constructing the join query
     */
    protected getRelationKeys(): string[];
    /**
     * Clones the current query
     */
    clone(): HasOneSubQueryBuilder;
    /**
     * Applies constraint to limit rows to the current relationship
     * only.
     */
    protected applyConstraints(): void;
}
