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
exports.Preloader = void 0;
const utils_1 = require("@poppinss/utils");
/**
 * Exposes the API to define and preload relationships in reference to
 * a model
 */
class Preloader {
    constructor(model) {
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: model
        });
        Object.defineProperty(this, "preloads", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        /**
         * When invoked via query builder. The preloader will get the sideloaded
         * object, that should be transferred to relationship model instances.
         */
        Object.defineProperty(this, "sideloaded", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "debugQueries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    /**
     * Processes a relationship for a single parent
     */
    async processRelation(name, parent, client) {
        const { relation, callback } = this.preloads[name];
        const query = relation
            .eagerQuery(parent, client)
            .debug(this.debugQueries)
            .sideload(this.sideloaded);
        /**
         * Pass query to end user for adding more constraints
         */
        if (typeof callback === 'function') {
            callback(query);
        }
        const result = await query.selectRelationKeys().exec();
        /**
         * hasOne and belongsTo will always return an array of a single row (if done right)
         */
        if (relation.type === 'hasOne' || relation.type === 'belongsTo') {
            relation.setRelated(parent, result[0] || null);
            return;
        }
        /**
         * Set array of related instances
         */
        relation.setRelated(parent, result);
    }
    /**
     * Process a given relationship for many parent instances. This happens
     * during eagerloading
     */
    async processRelationForMany(name, parent, client) {
        const { relation, callback } = this.preloads[name];
        const query = relation
            .eagerQuery(parent, client)
            .debug(this.debugQueries)
            .sideload(this.sideloaded);
        /**
         * Pass query to end user for adding more constraints
         */
        if (typeof callback === 'function') {
            callback(query);
        }
        const result = await query.selectRelationKeys().exec();
        /**
         * Set array of related instances
         */
        relation.setRelatedForMany(parent, result);
    }
    /**
     * Define a relationship to preload
     */
    load(name, callback) {
        const relation = this.model.$getRelation(name);
        if (!relation) {
            throw new utils_1.Exception(`"${name}" is not defined as a relationship on "${this.model.name}" model`, 500, 'E_UNDEFINED_RELATIONSHIP');
        }
        relation.boot();
        this.preloads[name] = {
            relation: relation,
            callback: callback,
        };
        return this;
    }
    /**
     * Alias for "this.load"
     */
    preload(name, callback) {
        return this.load(name, callback);
    }
    /**
     * Toggle query debugging
     */
    debug(debug) {
        this.debugQueries = debug;
        return this;
    }
    /**
     * Define attributes to be passed to all the model instance as
     * sideloaded attributes
     */
    sideload(values) {
        this.sideloaded = values;
        return this;
    }
    /**
     * Process of all the preloaded relationships for a single parent
     */
    async processAllForOne(parent, client) {
        await Promise.all(Object.keys(this.preloads).map((relationName) => {
            return this.processRelation(relationName, parent, client);
        }));
    }
    /**
     * Process of all the preloaded relationships for many parents
     */
    async processAllForMany(parent, client) {
        if (!parent.length) {
            return;
        }
        await Promise.all(Object.keys(this.preloads).map((relationName) => {
            return this.processRelationForMany(relationName, parent, client);
        }));
    }
}
exports.Preloader = Preloader;
