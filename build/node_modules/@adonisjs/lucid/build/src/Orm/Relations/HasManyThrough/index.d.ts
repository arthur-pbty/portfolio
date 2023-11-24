/// <reference path="../../../../adonis-typings/model.d.ts" />
/// <reference path="../../../../adonis-typings/orm.d.ts" />
/// <reference path="../../../../adonis-typings/relations.d.ts" />
import { QueryClientContract, OneOrMany } from '@ioc:Adonis/Lucid/Database';
import { LucidRow, LucidModel, ThroughRelationOptions, HasManyThroughRelationContract, HasManyThrough as ModelHasManyThrough } from '@ioc:Adonis/Lucid/Orm';
/**
 * Manages loading and persisting has many through relationship
 */
export declare class HasManyThrough implements HasManyThroughRelationContract<LucidModel, LucidModel> {
    relationName: string;
    relatedModel: () => LucidModel;
    private options;
    model: LucidModel;
    type: "hasManyThrough";
    booted: boolean;
    serializeAs: string | null;
    throughModel: (() => LucidModel) & (() => LucidModel);
    /**
     * Available after boot is invoked
     */
    localKey: string;
    localKeyColumnName: string;
    /**
     * This exists on the through model
     */
    foreignKey: string;
    foreignKeyColumnName: string;
    /**
     * This exists on the through model
     */
    throughLocalKey: string;
    throughLocalKeyColumnName: string;
    /**
     * This exists on the related model
     */
    throughForeignKey: string;
    throughForeignKeyColumnName: string;
    /**
     * Reference to the onQuery hook defined by the user
     */
    onQueryHook: ((query: import("@ioc:Adonis/Lucid/Orm").RelationSubQueryBuilderContract<LucidModel> | import("@ioc:Adonis/Lucid/Orm").HasManyThroughQueryBuilderContract<LucidModel, any>) => void) | undefined;
    constructor(relationName: string, relatedModel: () => LucidModel, options: ThroughRelationOptions<ModelHasManyThrough<LucidModel>> & {
        throughModel: () => LucidModel;
    }, model: LucidModel);
    /**
     * Clone relationship instance
     */
    clone(parent: LucidModel): any;
    /**
     * Returns the alias for the through key
     */
    throughAlias(key: string): string;
    /**
     * Boot the relationship and ensure that all keys are in
     * place for queries to do their job.
     */
    boot(): void;
    /**
     * Set related model instances
     */
    setRelated(parent: LucidRow, related: LucidRow[]): void;
    /**
     * Push related model instance(s)
     */
    pushRelated(parent: LucidRow, related: LucidRow | LucidRow[]): void;
    /**
     * Finds and set the related model instances next to the parent
     * models.
     */
    setRelatedForMany(parent: LucidRow[], related: LucidRow[]): void;
    /**
     * Returns an instance of query client for invoking queries
     */
    client(parent: LucidRow, client: QueryClientContract): any;
    /**
     * Returns instance of the eager query
     */
    eagerQuery(parent: OneOrMany<LucidRow>, client: QueryClientContract): import("./QueryBuilder").HasManyThroughQueryBuilder;
    /**
     * Returns instance of query builder
     */
    subQuery(client: QueryClientContract): import("./SubQueryBuilder").HasManyThroughSubQueryBuilder;
}
