import { LucidModel, LucidRow, HasOneRelationContract } from '@ioc:Adonis/Lucid/Orm';
import { RelationCallback, FactoryModelContract, FactoryRelationContract, FactoryBuilderQueryContract } from '@ioc:Adonis/Lucid/Factory';
import { BaseRelation } from './Base';
/**
 * Has one to factory relation
 */
export declare class HasOne extends BaseRelation implements FactoryRelationContract {
    relation: HasOneRelationContract<LucidModel, LucidModel>;
    constructor(relation: HasOneRelationContract<LucidModel, LucidModel>, factory: () => FactoryBuilderQueryContract<FactoryModelContract<LucidModel>>);
    /**
     * Make relationship and set it on the parent model instance
     */
    make(parent: LucidRow, callback?: RelationCallback): Promise<void>;
    /**
     * Persist relationship and set it on the parent model instance
     */
    create(parent: LucidRow, callback?: RelationCallback): Promise<void>;
}
