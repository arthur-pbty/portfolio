import { LucidModel, LucidRow, HasManyRelationContract } from '@ioc:Adonis/Lucid/Orm';
import { RelationCallback, FactoryModelContract, FactoryRelationContract, FactoryBuilderQueryContract } from '@ioc:Adonis/Lucid/Factory';
import { BaseRelation } from './Base';
/**
 * Has many to factory relation
 */
export declare class HasMany extends BaseRelation implements FactoryRelationContract {
    relation: HasManyRelationContract<LucidModel, LucidModel>;
    constructor(relation: HasManyRelationContract<LucidModel, LucidModel>, factory: () => FactoryBuilderQueryContract<FactoryModelContract<LucidModel>>);
    /**
     * Make relationship and set it on the parent model instance
     */
    make(parent: LucidRow, callback?: RelationCallback, count?: number): Promise<void>;
    /**
     * Persist relationship and set it on the parent model instance
     */
    create(parent: LucidRow, callback?: RelationCallback, count?: number): Promise<void>;
}
