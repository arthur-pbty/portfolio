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
exports.ManyToMany = void 0;
const KeysExtractor_1 = require("../KeysExtractor");
const QueryClient_1 = require("./QueryClient");
const utils_1 = require("../../../utils");
/**
 * Manages loading and persisting many to many relationship
 */
class ManyToMany {
    constructor(relationName, relatedModel, options, model) {
        Object.defineProperty(this, "relationName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relationName
        });
        Object.defineProperty(this, "relatedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: relatedModel
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: model
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'manyToMany'
        });
        Object.defineProperty(this, "booted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "serializeAs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.options.serializeAs === undefined ? this.relationName : this.options.serializeAs
        });
        /**
         * Available after boot is invoked
         */
        Object.defineProperty(this, "localKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localKeyColumnName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relatedKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "relatedKeyColumnName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pivotForeignKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pivotRelatedForeignKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pivotTable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pivotColumns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.options.pivotColumns || []
        });
        Object.defineProperty(this, "pivotCreatedAtTimestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pivotUpdatedAtTimestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Reference to the onQuery hook defined by the user
         */
        Object.defineProperty(this, "onQueryHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.options.onQuery
        });
    }
    /**
     * Timestamp columns for the pivot table
     */
    get pivotTimestamps() {
        const timestamps = [];
        this.pivotCreatedAtTimestamp && timestamps.push(this.pivotCreatedAtTimestamp);
        this.pivotUpdatedAtTimestamp && timestamps.push(this.pivotUpdatedAtTimestamp);
        return timestamps;
    }
    /**
     * Computes the created at timestamps column name
     * for the pivot table
     */
    computedCreatedAtTimestamp() {
        if (!this.options.pivotTimestamps) {
            return;
        }
        if (this.options.pivotTimestamps === true) {
            this.pivotCreatedAtTimestamp = 'created_at';
            return;
        }
        if (typeof this.options.pivotTimestamps.createdAt === 'string') {
            this.pivotCreatedAtTimestamp = this.options.pivotTimestamps.createdAt;
        }
        else if (this.options.pivotTimestamps.createdAt === true) {
            this.pivotCreatedAtTimestamp = 'created_at';
        }
    }
    /**
     * Computes the updated at timestamps column name
     * for the pivot table
     */
    computedUpdatedAtTimestamp() {
        if (!this.options.pivotTimestamps) {
            return;
        }
        if (this.options.pivotTimestamps === true) {
            this.pivotUpdatedAtTimestamp = 'updated_at';
            return;
        }
        if (typeof this.options.pivotTimestamps.updatedAt === 'string') {
            this.pivotUpdatedAtTimestamp = this.options.pivotTimestamps.updatedAt;
        }
        else if (this.options.pivotTimestamps.updatedAt === true) {
            this.pivotUpdatedAtTimestamp = 'updated_at';
        }
    }
    /**
     * Returns the alias for the pivot key
     */
    pivotAlias(key) {
        return `pivot_${key}`;
    }
    /**
     * Clone relationship instance
     */
    clone(parent) {
        return new ManyToMany(this.relationName, this.relatedModel, { ...this.options }, parent);
    }
    /**
     * Boot the relationship and ensure that all keys are in
     * place for queries to do their job.
     */
    boot() {
        if (this.booted) {
            return;
        }
        const relatedModel = this.relatedModel();
        /**
         * Extracting keys from the model and the relation model. The keys
         * extractor ensures all the required columns are defined on
         * the models for the relationship to work
         */
        const { localKey, relatedKey } = new KeysExtractor_1.KeysExtractor(this.model, this.relationName, {
            localKey: {
                model: this.model,
                key: this.options.localKey ||
                    this.model.namingStrategy.relationLocalKey(this.type, this.model, relatedModel, this.relationName),
            },
            relatedKey: {
                model: relatedModel,
                key: this.options.relatedKey ||
                    this.model.namingStrategy.relationLocalKey(this.type, this.model, relatedModel, this.relationName),
            },
        }).extract();
        this.pivotTable =
            this.options.pivotTable ||
                this.model.namingStrategy.relationPivotTable(this.type, this.model, relatedModel, this.relationName);
        /**
         * Keys on the parent model
         */
        this.localKey = localKey.attributeName;
        this.localKeyColumnName = localKey.columnName;
        /**
         * Keys on the related model
         */
        this.relatedKey = relatedKey.attributeName;
        this.relatedKeyColumnName = relatedKey.columnName;
        /**
         * Parent model foreign key in the pivot table
         */
        this.pivotForeignKey =
            this.options.pivotForeignKey ||
                this.model.namingStrategy.relationPivotForeignKey(this.type, this.model, relatedModel, this.relationName);
        /**
         * Related model foreign key in the pivot table
         */
        this.pivotRelatedForeignKey =
            this.options.pivotRelatedForeignKey ||
                this.model.namingStrategy.relationPivotForeignKey(this.type, relatedModel, this.model, this.relationName);
        /**
         * Configure pivot timestamps to use. This is a temporary
         * setup. We will have to soon introduce pivot models
         */
        this.computedCreatedAtTimestamp();
        this.computedUpdatedAtTimestamp();
        /**
         * Booted successfully
         */
        this.booted = true;
    }
    /**
     * Set related model instances
     */
    setRelated(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        parent.$setRelated(this.relationName, related);
    }
    /**
     * Push related model instance(s)
     */
    pushRelated(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        parent.$pushRelated(this.relationName, related);
    }
    /**
     * Finds and set the related model instances next to the parent
     * models.
     */
    setRelatedForMany(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        const pivotForeignKeyAlias = this.pivotAlias(this.pivotForeignKey);
        parent.forEach((parentModel) => {
            this.setRelated(parentModel, related.filter((relatedModel) => {
                const value = parentModel[this.localKey];
                return value !== undefined && relatedModel.$extras[pivotForeignKeyAlias] === value;
            }));
        });
    }
    /**
     * Returns an instance of query client for invoking queries
     */
    client(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return new QueryClient_1.ManyToManyQueryClient(this, parent, client);
    }
    /**
     * Returns an instance of eager query builder
     */
    eagerQuery(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.ManyToManyQueryClient.eagerQuery(client, this, parent);
    }
    /**
     * Returns instance of query builder
     */
    subQuery(client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.ManyToManyQueryClient.subQuery(client, this);
    }
    /**
     * Returns key-value pair for the pivot table in relation to the parent model
     */
    getPivotPair(parent) {
        return [this.pivotForeignKey, (0, utils_1.getValue)(parent, this.localKey, this, 'persist')];
    }
    /**
     * Returns key-value pair for the pivot table in relation to the related model
     */
    getPivotRelatedPair(related) {
        return [this.pivotRelatedForeignKey, (0, utils_1.getValue)(related, this.relatedKey, this, 'persist')];
    }
}
exports.ManyToMany = ManyToMany;
