/// <reference path="../../../adonis-typings/index.d.ts" />
/// <reference path="../../../adonis-typings/querybuilder.d.ts" />
/// <reference path="../../../adonis-typings/database.d.ts" />
import { DatabaseContract } from '@ioc:Adonis/Lucid/Database';
import { LucidRow, LucidModel, AdapterContract, ModelAdapterOptions } from '@ioc:Adonis/Lucid/Orm';
/**
 * Adapter exposes the API to make database queries and constructor
 * model instances from it.
 */
export declare class Adapter implements AdapterContract {
    private db;
    constructor(db: DatabaseContract);
    private getPrimaryKeyColumnName;
    /**
     * Returns the query client based upon the model instance
     */
    modelConstructorClient(modelConstructor: LucidModel, options?: ModelAdapterOptions): import("@ioc:Adonis/Lucid/Database").QueryClientContract;
    /**
     * Returns the model query builder instance for a given model
     */
    query(modelConstructor: LucidModel, options?: ModelAdapterOptions): any;
    /**
     * Returns query client for a model instance by inspecting it's options
     */
    modelClient(instance: LucidRow): any;
    /**
     * Perform insert query on a given model instance
     */
    insert(instance: LucidRow, attributes: any): Promise<void>;
    /**
     * Perform update query on a given model instance
     */
    update(instance: LucidRow, dirty: any): Promise<void>;
    /**
     * Perform delete query on a given model instance
     */
    delete(instance: LucidRow): Promise<void>;
    /**
     * Refresh the model instance attributes
     */
    refresh(instance: LucidRow): Promise<void>;
}
