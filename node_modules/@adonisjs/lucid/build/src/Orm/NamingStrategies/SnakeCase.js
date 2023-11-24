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
exports.SnakeCaseNamingStrategy = void 0;
const helpers_1 = require("@poppinss/utils/build/helpers");
/**
 * Uses snake case as the naming strategy for different model properties
 */
class SnakeCaseNamingStrategy {
    /**
     * The default table name for the given model
     */
    tableName(model) {
        return helpers_1.string.pluralize(helpers_1.string.snakeCase(model.name));
    }
    /**
     * The database column name for a given model attribute
     */
    columnName(_, attributeName) {
        return helpers_1.string.snakeCase(attributeName);
    }
    /**
     * The post serialization name for a given model attribute
     */
    serializedName(_, attributeName) {
        return helpers_1.string.snakeCase(attributeName);
    }
    /**
     * The local key for a given model relationship
     */
    relationLocalKey(relation, model, relatedModel) {
        if (relation === 'belongsTo') {
            return relatedModel.primaryKey;
        }
        return model.primaryKey;
    }
    /**
     * The foreign key for a given model relationship
     */
    relationForeignKey(relation, model, relatedModel) {
        if (relation === 'belongsTo') {
            return helpers_1.string.camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`);
        }
        return helpers_1.string.camelCase(`${model.name}_${model.primaryKey}`);
    }
    /**
     * Pivot table name for many to many relationship
     */
    relationPivotTable(_, model, relatedModel) {
        return helpers_1.string.snakeCase([relatedModel.name, model.name].sort().join('_'));
    }
    /**
     * Pivot foreign key for many to many relationship
     */
    relationPivotForeignKey(_, model) {
        return helpers_1.string.snakeCase(`${model.name}_${model.primaryKey}`);
    }
    /**
     * Keys for the pagination meta
     */
    paginationMetaKeys() {
        return {
            total: 'total',
            perPage: 'per_page',
            currentPage: 'current_page',
            lastPage: 'last_page',
            firstPage: 'first_page',
            firstPageUrl: 'first_page_url',
            lastPageUrl: 'last_page_url',
            nextPageUrl: 'next_page_url',
            previousPageUrl: 'previous_page_url',
        };
    }
}
exports.SnakeCaseNamingStrategy = SnakeCaseNamingStrategy;
