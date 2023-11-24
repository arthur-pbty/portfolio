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
exports.SimplePaginator = void 0;
const qs_1 = require("qs");
const SnakeCase_1 = require("../../Orm/NamingStrategies/SnakeCase");
/**
 * Simple paginator works with the data set provided by the standard
 * `offset` and `limit` based pagination.
 */
class SimplePaginator extends Array {
    constructor(totalNumber, perPage, currentPage, ...rows) {
        super(...rows);
        Object.defineProperty(this, "totalNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: totalNumber
        });
        Object.defineProperty(this, "perPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: perPage
        });
        Object.defineProperty(this, "currentPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: currentPage
        });
        Object.defineProperty(this, "qs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '/'
        });
        Object.defineProperty(this, "rows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Can be defined at per instance level as well
         */
        Object.defineProperty(this, "namingStrategy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: SimplePaginator.namingStrategy
        });
        /**
         * The first page is always 1
         */
        Object.defineProperty(this, "firstPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        /**
         * Find if results set is empty or not
         */
        Object.defineProperty(this, "isEmpty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Casting `total` to a number. Later, we can think of situations
         * to cast it to a bigint
         */
        Object.defineProperty(this, "total", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Number(this.totalNumber)
        });
        /**
         * Find if there are total records or not. This is not same as
         * `isEmpty`.
         *
         * The `isEmpty` reports about the current set of results. However `hasTotal`
         * reports about the total number of records, regardless of the current.
         */
        Object.defineProperty(this, "hasTotal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.total > 0
        });
        /**
         * The Last page number
         */
        Object.defineProperty(this, "lastPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Math.max(Math.ceil(this.total / this.perPage), 1)
        });
        /**
         * Find if there are more pages to come
         */
        Object.defineProperty(this, "hasMorePages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.lastPage > this.currentPage
        });
        /**
         * Find if there are enough results to be paginated or not
         */
        Object.defineProperty(this, "hasPages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.lastPage !== 1
        });
        this.rows = rows;
        this.isEmpty = this.rows.length === 0;
    }
    /**
     * A reference to the result rows
     */
    all() {
        return this.rows;
    }
    /**
     * Returns JSON meta data
     */
    getMeta() {
        const metaKeys = this.namingStrategy.paginationMetaKeys();
        return {
            [metaKeys.total]: this.total,
            [metaKeys.perPage]: this.perPage,
            [metaKeys.currentPage]: this.currentPage,
            [metaKeys.lastPage]: this.lastPage,
            [metaKeys.firstPage]: this.firstPage,
            [metaKeys.firstPageUrl]: this.getUrl(1),
            [metaKeys.lastPageUrl]: this.getUrl(this.lastPage),
            [metaKeys.nextPageUrl]: this.getNextPageUrl(),
            [metaKeys.previousPageUrl]: this.getPreviousPageUrl(),
        };
    }
    /**
     * Returns JSON representation of the paginated
     * data
     */
    toJSON() {
        return {
            meta: this.getMeta(),
            data: this.all(),
        };
    }
    /**
     * Define query string to be appended to the pagination links
     */
    queryString(values) {
        this.qs = values;
        return this;
    }
    /**
     * Define base url for making the pagination links
     */
    baseUrl(url) {
        this.url = url;
        return this;
    }
    /**
     * Returns url for a given page. Doesn't validates the integrity of the
     * page
     */
    getUrl(page) {
        const qs = (0, qs_1.stringify)(Object.assign({}, this.qs, { page: page < 1 ? 1 : page }));
        return `${this.url}?${qs}`;
    }
    /**
     * Returns url for the next page
     */
    getNextPageUrl() {
        if (this.hasMorePages) {
            return this.getUrl(this.currentPage + 1);
        }
        return null;
    }
    /**
     * Returns URL for the previous page
     */
    getPreviousPageUrl() {
        if (this.currentPage > 1) {
            return this.getUrl(this.currentPage - 1);
        }
        return null;
    }
    /**
     * Returns an array of urls under a given range
     */
    getUrlsForRange(start, end) {
        let urls = [];
        for (let i = start; i <= end; i++) {
            urls.push({ url: this.getUrl(i), page: i, isActive: i === this.currentPage });
        }
        return urls;
    }
}
exports.SimplePaginator = SimplePaginator;
/**
 * Naming strategy for the pagination meta keys
 */
Object.defineProperty(SimplePaginator, "namingStrategy", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new SnakeCase_1.SnakeCaseNamingStrategy()
});
