/// <reference path="../../../adonis-typings/index.d.ts" />
import { Knex } from 'knex';
import { QueryClientContract, RawQueryBuilderContract, TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
/**
 * Exposes the API to execute raw queries
 */
export declare class RawQueryBuilder implements RawQueryBuilderContract {
    knexQuery: Knex.Raw;
    client: QueryClientContract;
    /**
     * Custom data someone want to send to the profiler and the
     * query event
     */
    private customReporterData;
    /**
     * Control whether to debug the query or not. The initial
     * value is inherited from the query client
     */
    private debugQueries;
    constructor(knexQuery: Knex.Raw, client: QueryClientContract);
    /**
     * Returns the log data
     */
    private getQueryData;
    /**
     * Define custom reporter data. It will be merged with
     * the existing data
     */
    reporterData(data: any): this;
    /**
     * Wrap the query with before/after strings.
     */
    wrap(before: string, after: string): this;
    /**
     * Turn on/off debugging for this query
     */
    debug(debug: boolean): this;
    /**
     * Define query timeout
     */
    timeout(time: number, options?: {
        cancel: boolean;
    }): this;
    /**
     * Returns SQL query as a string
     */
    toQuery(): string;
    /**
     * Run query inside the given transaction
     */
    useTransaction(transaction: TransactionClientContract): this;
    /**
     * Executes the query
     */
    exec(): Promise<any>;
    /**
     * Get sql representation of the query
     */
    toSQL(): Knex.Sql;
    /**
     * Implementation of `then` for the promise API
     */
    then(resolve: any, reject?: any): any;
    /**
     * Implementation of `catch` for the promise API
     */
    catch(reject: any): any;
    /**
     * Implementation of `finally` for the promise API
     */
    finally(fullfilled: any): Promise<any>;
    /**
     * Required when Promises are extended
     */
    get [Symbol.toStringTag](): string;
}
