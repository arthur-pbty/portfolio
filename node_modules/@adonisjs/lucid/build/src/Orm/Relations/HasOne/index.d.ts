/// <reference path="../../../../adonis-typings/model.d.ts" />
/// <reference path="../../../../adonis-typings/orm.d.ts" />
/// <reference path="../../../../adonis-typings/relations.d.ts" />
import { QueryClientContract, OneOrMany } from '@ioc:Adonis/Lucid/Database';
import { LucidRow, LucidModel, ModelObject, RelationOptions, HasOne as ModelHasOne, HasOneRelationContract } from '@ioc:Adonis/Lucid/Orm';
/**
 * Manages loading and persisting has one relationship
 */
export declare class HasOne implements HasOneRelationContract<LucidModel, LucidModel> {
    relationName: string;
    relatedModel: () => LucidModel;
    private options;
    model: LucidModel;
    readonly type = "hasOne";
    booted: boolean;
    serializeAs: string | null;
    /**
     * Local key is reference to the primary key in the self table
     * @note: Available after boot is invoked
     */
    localKey: string;
    localKeyColumName: string;
    /**
     * Foreign key is reference to the foreign key in the related table
     * @note: Available after boot is invoked
     */
    foreignKey: string;
    foreignKeyColumName: string;
    /**
     * Reference to the onQuery hook defined by the user
     */
    onQueryHook: ((query: import("@ioc:Adonis/Lucid/Orm").RelationQueryBuilderContract<LucidModel, any> | import("@ioc:Adonis/Lucid/Orm").RelationSubQueryBuilderContract<LucidModel>) => void) | undefined;
    constructor(relationName: string, relatedModel: () => LucidModel, options: RelationOptions<ModelHasOne<LucidModel>>, model: LucidModel);
    /**
     * Clone relationship instance
     */
    clone(parent: LucidModel): any;
    /**
     * Boot the relationship and ensure that all keys are in
     * place for queries to do their job.
     */
    boot(): void;
    /**
     * Set related model instance
     */
    setRelated(parent: LucidRow, related: LucidRow | null): void;
    /**
     * Push related model instance
     */
    pushRelated(parent: LucidRow, related: LucidRow | null): void;
    /**
     * Finds and set the related model instance next to the parent
     * models.
     */
    setRelatedForMany(parent: LucidRow[], related: LucidRow[]): void;
    /**
     * Returns an instance of query client for invoking queries
     */
    client(parent: LucidRow, client: QueryClientContract): any;
    /**
     * Returns eager query instance
     */
    eagerQuery(parent: OneOrMany<LucidRow>, client: QueryClientContract): any;
    /**
     * Returns instance of query builder
     */
    subQuery(client: QueryClientContract): import("./SubQueryBuilder").HasOneSubQueryBuilder;
    /**
     * Hydrates values object for persistance.
     */
    hydrateForPersistance(parent: LucidRow, values: ModelObject | LucidRow): void;
}
