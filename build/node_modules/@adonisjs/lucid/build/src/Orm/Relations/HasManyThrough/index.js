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
exports.HasManyThrough = void 0;
const KeysExtractor_1 = require("../KeysExtractor");
const QueryClient_1 = require("./QueryClient");
const utils_1 = require("../../../utils");
/**
 * Manages loading and persisting has many through relationship
 */
class HasManyThrough {
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
            value: 'hasManyThrough'
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
        Object.defineProperty(this, "throughModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.options.throughModel
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
        /**
         * This exists on the through model
         */
        Object.defineProperty(this, "foreignKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "foreignKeyColumnName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * This exists on the through model
         */
        Object.defineProperty(this, "throughLocalKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "throughLocalKeyColumnName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * This exists on the related model
         */
        Object.defineProperty(this, "throughForeignKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "throughForeignKeyColumnName", {
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
     * Clone relationship instance
     */
    clone(parent) {
        return new HasManyThrough(this.relationName, this.relatedModel, { ...this.options }, parent);
    }
    /**
     * Returns the alias for the through key
     */
    throughAlias(key) {
        return `through_${key}`;
    }
    /**
     * Boot the relationship and ensure that all keys are in
     * place for queries to do their job.
     */
    boot() {
        if (this.booted) {
            return;
        }
        /**
         * Extracting keys from the model and the relation model. The keys
         * extractor ensures all the required columns are defined on
         * the models for the relationship to work
         */
        const { localKey, foreignKey, throughLocalKey, throughForeignKey } = new KeysExtractor_1.KeysExtractor(this.model, this.relationName, {
            localKey: {
                model: this.model,
                key: this.options.localKey ||
                    this.model.namingStrategy.relationLocalKey(this.type, this.model, this.relatedModel(), this.relationName),
            },
            foreignKey: {
                model: this.throughModel(),
                key: this.options.foreignKey ||
                    this.model.namingStrategy.relationForeignKey(this.type, this.model, this.throughModel(), this.relationName),
            },
            throughLocalKey: {
                model: this.throughModel(),
                key: this.options.throughLocalKey ||
                    this.model.namingStrategy.relationLocalKey(this.type, this.throughModel(), this.relatedModel(), this.relationName),
            },
            throughForeignKey: {
                model: this.relatedModel(),
                key: this.options.throughForeignKey ||
                    this.model.namingStrategy.relationForeignKey(this.type, this.throughModel(), this.relatedModel(), this.relationName),
            },
        }).extract();
        /**
         * Keys on the parent model
         */
        this.localKey = localKey.attributeName;
        this.localKeyColumnName = localKey.columnName;
        /**
         * Keys on the through model
         */
        this.foreignKey = foreignKey.attributeName;
        this.foreignKeyColumnName = foreignKey.columnName;
        this.throughLocalKey = throughLocalKey.attributeName;
        this.throughLocalKeyColumnName = throughLocalKey.columnName;
        this.throughForeignKey = throughForeignKey.attributeName;
        this.throughForeignKeyColumnName = throughForeignKey.columnName;
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
        const $foreignCastAsKeyAlias = this.throughAlias(this.foreignKeyColumnName);
        parent.forEach((parentModel) => {
            this.setRelated(parentModel, related.filter((relatedModel) => {
                const value = parentModel[this.localKey];
                return value !== undefined && relatedModel.$extras[$foreignCastAsKeyAlias] === value;
            }));
        });
    }
    /**
     * Returns an instance of query client for invoking queries
     */
    client(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return new QueryClient_1.HasManyThroughClient(this, parent, client);
    }
    /**
     * Returns instance of the eager query
     */
    eagerQuery(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.HasManyThroughClient.eagerQuery(client, this, parent);
    }
    /**
     * Returns instance of query builder
     */
    subQuery(client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.HasManyThroughClient.subQuery(client, this);
    }
}
exports.HasManyThrough = HasManyThrough;
