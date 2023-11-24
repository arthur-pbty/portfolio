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
exports.afterPaginate = exports.beforePaginate = exports.afterFetch = exports.beforeFetch = exports.afterFind = exports.beforeFind = exports.afterDelete = exports.beforeDelete = exports.afterUpdate = exports.beforeUpdate = exports.afterCreate = exports.beforeCreate = exports.afterSave = exports.beforeSave = exports.hasManyThrough = exports.manyToMany = exports.hasMany = exports.hasOne = exports.belongsTo = exports.computed = exports.column = void 0;
/// <reference path="../../../adonis-typings/index.ts" />
require("reflect-metadata");
const date_1 = require("./date");
const datetime_1 = require("./datetime");
/**
 * Define property on a model as a column. The decorator needs a
 * proper model class inheriting the base model
 */
const column = (options) => {
    return function decorateAsColumn(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addColumn(property, options || {});
    };
};
exports.column = column;
exports.column.date = date_1.dateColumn;
exports.column.dateTime = datetime_1.dateTimeColumn;
/**
 * Define computed property on a model. The decorator needs a
 * proper model class inheriting the base model
 */
const computed = (options) => {
    return function decorateAsComputed(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addComputed(property, options || {});
    };
};
exports.computed = computed;
/**
 * Define belongsTo relationship
 */
const belongsTo = (relatedModel, relation) => {
    return function decorateAsRelation(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addRelation(property, 'belongsTo', relatedModel, Object.assign({ relatedModel }, relation));
    };
};
exports.belongsTo = belongsTo;
/**
 * Define hasOne relationship
 */
const hasOne = (relatedModel, relation) => {
    return function decorateAsRelation(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addRelation(property, 'hasOne', relatedModel, Object.assign({ relatedModel }, relation));
    };
};
exports.hasOne = hasOne;
/**
 * Define hasMany relationship
 */
const hasMany = (relatedModel, relation) => {
    return function decorateAsRelation(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addRelation(property, 'hasMany', relatedModel, Object.assign({ relatedModel }, relation));
    };
};
exports.hasMany = hasMany;
/**
 * Define manyToMany relationship
 */
const manyToMany = (relatedModel, relation) => {
    return function decorateAsRelation(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addRelation(property, 'manyToMany', relatedModel, Object.assign({ relatedModel }, relation));
    };
};
exports.manyToMany = manyToMany;
/**
 * Define hasManyThrough relationship
 */
const hasManyThrough = ([relatedModel, throughModel], relation) => {
    return function decorateAsRelation(target, property) {
        const Model = target.constructor;
        Model.boot();
        Model.$addRelation(property, 'hasManyThrough', relatedModel, Object.assign({ relatedModel, throughModel }, relation));
    };
};
exports.hasManyThrough = hasManyThrough;
/**
 * Before/After save hook
 */
const beforeSave = () => {
    return function decorateAsHook(target, property) {
        target.boot();
        target.before('save', target[property].bind(target));
    };
};
exports.beforeSave = beforeSave;
const afterSave = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('save', target[property].bind(target));
    };
};
exports.afterSave = afterSave;
/**
 * Before/After create hook
 */
const beforeCreate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('create', target[property].bind(target));
    };
};
exports.beforeCreate = beforeCreate;
const afterCreate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('create', target[property].bind(target));
    };
};
exports.afterCreate = afterCreate;
/**
 * Before/After update hook
 */
const beforeUpdate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('update', target[property].bind(target));
    };
};
exports.beforeUpdate = beforeUpdate;
const afterUpdate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('update', target[property].bind(target));
    };
};
exports.afterUpdate = afterUpdate;
/**
 * Before/After delete hook
 */
const beforeDelete = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('delete', target[property].bind(target));
    };
};
exports.beforeDelete = beforeDelete;
const afterDelete = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('delete', target[property].bind(target));
    };
};
exports.afterDelete = afterDelete;
/**
 * Before/After find hook
 */
const beforeFind = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('find', target[property].bind(target));
    };
};
exports.beforeFind = beforeFind;
const afterFind = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('find', target[property].bind(target));
    };
};
exports.afterFind = afterFind;
/**
 * Before/After fetchs hook
 */
const beforeFetch = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('fetch', target[property].bind(target));
    };
};
exports.beforeFetch = beforeFetch;
const afterFetch = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('fetch', target[property].bind(target));
    };
};
exports.afterFetch = afterFetch;
/**
 * Before/After paginate hook
 */
const beforePaginate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.before('paginate', target[property].bind(target));
    };
};
exports.beforePaginate = beforePaginate;
const afterPaginate = () => {
    return function decorateAsColumn(target, property) {
        target.boot();
        target.after('paginate', target[property].bind(target));
    };
};
exports.afterPaginate = afterPaginate;
