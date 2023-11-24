"use strict";
/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryRunner = void 0;
const utils_1 = require("@poppinss/utils");
const QueryReporter_1 = require("../QueryReporter");
/**
 * Query runner exposes the API for executing knex query builder by using the
 * read/write replicas supported only by Lucid.
 *
 * Also it will emit the query data and profile the queries as well.
 */
class QueryRunner {
    constructor(client, debug, logData) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        Object.defineProperty(this, "debug", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: debug
        });
        Object.defineProperty(this, "logData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logData
        });
        Object.defineProperty(this, "reporter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new QueryReporter_1.QueryReporter(this.client, this.debug, this.logData)
        });
    }
    /**
     * Is query dialect using sqlite database or not
     */
    isUsingSqlite() {
        return this.client.dialect.name === 'sqlite3';
    }
    /**
     * Find if query has a transaction attached to it, by using
     * `useTransaction` method
     */
    isInTransaction(query) {
        return query['client'].transacting;
    }
    /**
     * Find if query is a write query or not.
     */
    isWriteQuery(query) {
        return ['update', 'del', 'delete', 'insert'].includes(query['_method']);
    }
    /**
     * Returns read or write client by inspecting the query
     */
    getQueryClient(query) {
        return this.isWriteQuery(query) ? this.client.getWriteClient() : this.client.getReadClient();
    }
    /**
     * Executes the query by handling exceptions and returns it back
     * gracefully.
     */
    async executeQuery(query) {
        try {
            const result = await query;
            return [undefined, result];
        }
        catch (error) {
            return [error, undefined];
        }
    }
    /**
     * Executes the knex builder directly
     */
    async executeDirectly(query) {
        /**
         * We listen for query event on the knex query builder to avoid calling
         * toSQL too many times and also get the actual time it took to
         * execute the query
         */
        query['once']('query', (sql) => this.reporter.begin({ ...this.logData, ...sql }));
        const [error, result] = await this.executeQuery(query);
        this.reporter.end(error);
        if (error) {
            throw error;
        }
        return result;
    }
    /**
     * Executes query by using a proper read or write connection.
     */
    async executeUsingManagedConnection(query) {
        const queryClient = this.getQueryClient(query);
        /**
         * Acquire connection from the knex connection pool. This is will
         * use the rounding robin mechanism and force set it on
         * the query.
         */
        const connection = await queryClient.client.acquireConnection();
        query.connection(connection);
        /**
         * We listen for query event on the knex query builder to avoid calling
         * toSQL too many times and also get the actual time it took to
         * execute the query
         */
        query['once']('query', (sql) => this.reporter.begin({ ...this.logData, ...sql }));
        /**
         * Execute query and report event and profiler data
         */
        const [error, result] = await this.executeQuery(query);
        this.reporter.end(error);
        /**
         * Make sure to always release the connection
         */
        queryClient.client.releaseConnection(connection);
        /**
         * If there was an error, raise it or return the result
         */
        if (error) {
            throw error;
        }
        return result;
    }
    /**
     * Run query by managing its life-cycle
     */
    async run(query) {
        /**
         * We execute the queries using transaction or using sqlite database
         * directly.
         *
         * - The transaction already has a pre-acquired connection.
         * - There is no concept of read/write replicas in sqlite.
         */
        if (this.isUsingSqlite() || this.isInTransaction(query)) {
            return this.executeDirectly(query);
        }
        /**
         * Cannot execute write queries with client in read mode
         */
        if (this.isWriteQuery(query) && this.client.mode === 'read') {
            throw new utils_1.Exception('Updates and deletes cannot be performed in read mode');
        }
        return this.executeUsingManagedConnection(query);
    }
}
exports.QueryRunner = QueryRunner;
