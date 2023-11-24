/// <reference path="../../../../adonis-typings/model.d.ts" />
/// <reference path="../../../../adonis-typings/orm.d.ts" />
/// <reference path="../../../../adonis-typings/relations.d.ts" />
import { QueryClientContract } from '@ioc:Adonis/Lucid/Database';
import { LucidRow, LucidModel, ManyToManyRelationOptions, ManyToManyRelationContract, ManyToMany as ModelManyToMany } from '@ioc:Adonis/Lucid/Orm';
/**
 * Manages loading and persisting many to many relationship
 */
export declare class ManyToMany implements ManyToManyRelationContract<LucidModel, LucidModel> {
    relationName: string;
    relatedModel: () => LucidModel;
    private options;
    model: LucidModel;
    type: "manyToMany";
    booted: boolean;
    serializeAs: string | null;
    /**
     * Available after boot is invoked
     */
    localKey: string;
    localKeyColumnName: string;
    relatedKey: string;
    relatedKeyColumnName: string;
    pivotForeignKey: string;
    pivotRelatedForeignKey: string;
    pivotTable: string;
    pivotColumns: string[];
    pivotCreatedAtTimestamp: string | undefined;
    pivotUpdatedAtTimestamp: string | undefined;
    /**
     * Timestamp columns for the pivot table
     */
    get pivotTimestamps(): string[];
    /**
     * Reference to the onQuery hook defined by the user
     */
    onQueryHook: ((query: import("@ioc:Adonis/Lucid/Orm").ManyToManyQueryBuilderContract<LucidModel, any> | import("@ioc:Adonis/Lucid/Orm").ManyToManySubQueryBuilderContract<LucidModel>) => void) | undefined;
    /**
     * Computes the created at timestamps column name
     * for the pivot table
     */
    private computedCreatedAtTimestamp;
    /**
     * Computes the updated at timestamps column name
     * for the pivot table
     */
    private computedUpdatedAtTimestamp;
    constructor(relationName: string, relatedModel: () => LucidModel, options: ManyToManyRelationOptions<ModelManyToMany<LucidModel>>, model: LucidModel);
    /**
     * Returns the alias for the pivot key
     */
    pivotAlias(key: string): string;
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
     * Returns an instance of eager query builder
     */
    eagerQuery(parent: LucidRow[], client: QueryClientContract): import("./QueryBuilder").ManyToManyQueryBuilder;
    /**
     * Returns instance of query builder
     */
    subQuery(client: QueryClientContract): import("./SubQueryBuilder").ManyToManySubQueryBuilder;
    /**
     * Returns key-value pair for the pivot table in relation to the parent model
     */
    getPivotPair(parent: LucidRow): [string, number | string];
    /**
     * Returns key-value pair for the pivot table in relation to the related model
     */
    getPivotRelatedPair(related: LucidRow): [string, number | string];
}
