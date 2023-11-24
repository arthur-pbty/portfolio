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
exports.BelongsTo = void 0;
const KeysExtractor_1 = require("../KeysExtractor");
const QueryClient_1 = require("./QueryClient");
const utils_1 = require("../../../utils");
/**
 * Manages loading and persisting belongs to relationship
 */
class BelongsTo {
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
        /**
         * Relationship name
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'belongsTo'
        });
        /**
         * Whether or not the relationship instance has been booted
         */
        Object.defineProperty(this, "booted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /**
         * The key name for serializing the relationship
         */
        Object.defineProperty(this, "serializeAs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.options.serializeAs === undefined ? this.relationName : this.options.serializeAs
        });
        /**
         * Local key is reference to the primary key in the related table
         * @note: Available after boot is invoked
         */
        Object.defineProperty(this, "localKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localKeyColumName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Foreign key is reference to the foreign key in the self table
         * @note: Available after boot is invoked
         */
        Object.defineProperty(this, "foreignKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "foreignKeyColumName", {
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
        return new BelongsTo(this.relationName, this.relatedModel, { ...this.options }, parent);
    }
    /**
     * Returns a boolean telling if the related row belongs to the parent
     * row or not.
     */
    isRelatedRow(parent, related) {
        return (related[this.localKey] !== undefined && parent[this.foreignKey] === related[this.localKey]);
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
        const { localKey, foreignKey } = new KeysExtractor_1.KeysExtractor(this.model, this.relationName, {
            localKey: {
                model: relatedModel,
                key: this.options.localKey ||
                    this.model.namingStrategy.relationLocalKey(this.type, this.model, relatedModel, this.relationName),
            },
            foreignKey: {
                model: this.model,
                key: this.options.foreignKey ||
                    this.model.namingStrategy.relationForeignKey(this.type, this.model, relatedModel, this.relationName),
            },
        }).extract();
        /**
         * Keys on the related model
         */
        this.localKey = localKey.attributeName;
        this.localKeyColumName = localKey.columnName;
        /**
         * Keys on the parent model
         */
        this.foreignKey = foreignKey.attributeName;
        this.foreignKeyColumName = foreignKey.columnName;
        /**
         * Booted successfully
         */
        this.booted = true;
    }
    /**
     * Set related model instance
     */
    setRelated(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        if (related === undefined) {
            return;
        }
        parent.$setRelated(this.relationName, related);
    }
    /**
     * Push related model instance
     */
    pushRelated(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        if (related === undefined) {
            return;
        }
        parent.$setRelated(this.relationName, related);
    }
    /**
     * Finds and set the related model instance next to the parent
     * models.
     */
    setRelatedForMany(parent, related) {
        (0, utils_1.ensureRelationIsBooted)(this);
        parent.forEach((parentRow) => {
            const match = related.find((relatedRow) => this.isRelatedRow(parentRow, relatedRow));
            this.setRelated(parentRow, match || null);
        });
    }
    /**
     * Returns an instance of query client for the given relationship
     */
    client(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return new QueryClient_1.BelongsToQueryClient(this, parent, client);
    }
    /**
     * Returns instance of the eager query for the relationship
     */
    eagerQuery(parent, client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.BelongsToQueryClient.eagerQuery(client, this, parent);
    }
    /**
     * Returns instance of query builder
     */
    subQuery(client) {
        (0, utils_1.ensureRelationIsBooted)(this);
        return QueryClient_1.BelongsToQueryClient.subQuery(client, this);
    }
    /**
     * Hydrates values object for persistance.
     */
    hydrateForPersistance(parent, related) {
        parent[this.foreignKey] = (0, utils_1.getValue)(related, this.localKey, this, 'associate');
    }
}
exports.BelongsTo = BelongsTo;
