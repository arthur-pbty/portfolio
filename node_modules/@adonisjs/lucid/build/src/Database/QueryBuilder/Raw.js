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
exports.RawQueryBuilder = void 0;
const QueryRunner_1 = require("../../QueryRunner");
/**
 * Exposes the API to execute raw queries
 */
class RawQueryBuilder {
    constructor(knexQuery, client) {
        Object.defineProperty(this, "knexQuery", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: knexQuery
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        /**
         * Custom data someone want to send to the profiler and the
         * query event
         */
        Object.defineProperty(this, "customReporterData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Control whether to debug the query or not. The initial
         * value is inherited from the query client
         */
        Object.defineProperty(this, "debugQueries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.client.debug
        });
    }
    /**
     * Returns the log data
     */
    getQueryData() {
        return {
            connection: this.client.connectionName,
            inTransaction: this.client.isTransaction,
            ...this.customReporterData,
        };
    }
    /**
     * Define custom reporter data. It will be merged with
     * the existing data
     */
    reporterData(data) {
        this.customReporterData = data;
        return this;
    }
    /**
     * Wrap the query with before/after strings.
     */
    wrap(before, after) {
        this.knexQuery.wrap(before, after);
        return this;
    }
    /**
     * Turn on/off debugging for this query
     */
    debug(debug) {
        this.debugQueries = debug;
        return this;
    }
    /**
     * Define query timeout
     */
    timeout(time, options) {
        this.knexQuery['timeout'](time, options);
        return this;
    }
    /**
     * Returns SQL query as a string
     */
    toQuery() {
        return this.knexQuery.toQuery();
    }
    /**
     * Run query inside the given transaction
     */
    useTransaction(transaction) {
        this.knexQuery.transacting(transaction.knexClient);
        return this;
    }
    /**
     * Executes the query
     */
    async exec() {
        return new QueryRunner_1.QueryRunner(this.client, this.debugQueries, this.getQueryData()).run(this.knexQuery);
    }
    /**
     * Get sql representation of the query
     */
    toSQL() {
        return this.knexQuery.toSQL();
    }
    /**
     * Implementation of `then` for the promise API
     */
    then(resolve, reject) {
        return this.exec().then(resolve, reject);
    }
    /**
     * Implementation of `catch` for the promise API
     */
    catch(reject) {
        return this.exec().catch(reject);
    }
    /**
     * Implementation of `finally` for the promise API
     */
    finally(fullfilled) {
        return this.exec().finally(fullfilled);
    }
    /**
     * Required when Promises are extended
     */
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
exports.RawQueryBuilder = RawQueryBuilder;
