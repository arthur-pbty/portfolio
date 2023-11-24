import { LucidModel, LucidRow, BelongsToRelationContract } from '@ioc:Adonis/Lucid/Orm';
import { RelationCallback, FactoryModelContract, FactoryRelationContract, FactoryBuilderQueryContract } from '@ioc:Adonis/Lucid/Factory';
import { BaseRelation } from './Base';
/**
 * A belongs to factory relation
 */
export declare class BelongsTo extends BaseRelation implements FactoryRelationContract {
    relation: BelongsToRelationContract<LucidModel, LucidModel>;
    constructor(relation: BelongsToRelationContract<LucidModel, LucidModel>, factory: () => FactoryBuilderQueryContract<FactoryModelContract<LucidModel>>);
    /**
     * Make relationship and set it on the parent model instance
     */
    make(parent: LucidRow, callback?: RelationCallback): Promise<void>;
    /**
     * Persist relationship and set it on the parent model instance
     */
    create(parent: LucidRow, callback?: RelationCallback): Promise<void>;
}
