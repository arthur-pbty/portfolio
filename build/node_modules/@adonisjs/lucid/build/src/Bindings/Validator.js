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
exports.extendValidator = void 0;
const luxon_1 = require("luxon");
const utils_1 = require("@poppinss/utils");
/**
 * Checks for database rows for `exists` and `unique` rule.
 */
class DbRowCheck {
    constructor(ruleName, database, helpers) {
        Object.defineProperty(this, "ruleName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ruleName
        });
        Object.defineProperty(this, "database", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: database
        });
        Object.defineProperty(this, "helpers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: helpers
        });
    }
    /**
     * Applies user defined where constraints on the query builder
     */
    applyWhere(query, constraints, refs) {
        if (!constraints.length) {
            return;
        }
        constraints.forEach(({ key, operator, value, ref }) => {
            const val = ref ? refs[ref].value : value;
            if (operator === 'in') {
                query.whereIn(key, val);
            }
            else {
                query.where(key, val);
            }
        });
    }
    /**
     * Applies user defined where not constraints on the query builder
     */
    applyWhereNot(query, constraints, refs) {
        if (!constraints.length) {
            return;
        }
        constraints.forEach(({ key, operator, value, ref }) => {
            const val = ref ? refs[ref].value : value;
            if (operator === 'in') {
                query.whereNotIn(key, val);
            }
            else {
                query.whereNot(key, val);
            }
        });
    }
    /**
     * Normalizes constraints
     */
    normalizeConstraints(constraints) {
        const normalized = [];
        if (!constraints) {
            return normalized;
        }
        /**
         * Normalize object into an array of objects
         */
        return Object.keys(constraints).reduce((result, key) => {
            const value = constraints[key];
            if (this.helpers.isRef(value)) {
                result.push({ key, ref: value.key, operator: Array.isArray(value.value) ? 'in' : 'eq' });
            }
            else {
                result.push({ key, value, operator: Array.isArray(value) ? 'in' : 'eq' });
            }
            return result;
        }, normalized);
    }
    /**
     * Compile validation options
     */
    compile(options) {
        /**
         * Ensure options are defined with table and column name
         */
        if (!options || !options.table || !options.column) {
            throw new utils_1.Exception(`"${this.ruleName}" rule expects a "table" and a "column" name`);
        }
        /**
         * Emit warning
         */
        if (options.constraints) {
            process.emitWarning('DeprecationWarning', '"options.constraints" have been depreciated. Use "options.where" instead.');
        }
        return {
            table: options.table,
            column: options.column,
            caseInsensitive: !!options.caseInsensitive,
            connection: options.connection,
            dateFormat: options.dateFormat,
            where: this.normalizeConstraints(options.where || options.constraints),
            whereNot: this.normalizeConstraints(options.whereNot),
        };
    }
    /**
     * Validate value
     */
    async validate(value, { table, column, where, whereNot, connection, caseInsensitive, dateFormat }, { pointer, errorReporter, arrayExpressionPointer, refs }) {
        const client = this.database.connection(connection);
        const query = client.from(table).select(1);
        /**
         * Convert datetime to a string
         */
        if (luxon_1.DateTime.isDateTime(value)) {
            const format = dateFormat || client.dialect.dateTimeFormat;
            value = value.toFormat(format);
        }
        /**
         * https://www.sqlite.org/lang_corefunc.html#lower
         * https://docs.aws.amazon.com/redshift/latest/dg/r_LOWER.html
         * https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_lower
         * https://www.postgresql.org/docs/9.1/functions-string.html
         * https://docs.microsoft.com/en-us/sql/t-sql/functions/lower-transact-sql?view=sql-server-ver15
         * https://coderwall.com/p/6yhsuq/improve-case-insensitive-queries-in-postgres-using-smarter-indexes
         */
        if (caseInsensitive) {
            query.whereRaw(`lower(${column}) = ?`, [this.database.raw(`lower(?)`, [value])]);
        }
        else {
            query.where(column, value);
        }
        this.applyWhere(query, where, refs);
        this.applyWhereNot(query, whereNot, refs);
        const row = await query.first();
        if (this.ruleName === 'exists') {
            if (!row) {
                errorReporter.report(pointer, this.ruleName, `${this.ruleName} validation failure`, arrayExpressionPointer);
            }
            return;
        }
        if (this.ruleName === 'unique') {
            if (row) {
                errorReporter.report(pointer, this.ruleName, `${this.ruleName} validation failure`, arrayExpressionPointer);
            }
            return;
        }
    }
}
/**
 * Extends the validator by adding `unique` and `exists`
 */
function extendValidator(validator, database, logger) {
    /**
     * Exists rule to ensure the value exists in the database
     */
    const existsChecker = new DbRowCheck('exists', database, validator.helpers);
    validator.rule('exists', async (value, compiledOptions, options) => {
        try {
            await existsChecker.validate(value, compiledOptions, options);
        }
        catch (error) {
            logger.fatal({ err: error }, '"exists" validation rule failed');
            options.errorReporter.report(options.pointer, 'exists', 'exists validation failure', options.arrayExpressionPointer);
        }
    }, (options) => {
        return {
            compiledOptions: existsChecker.compile(options[0]),
            async: true,
        };
    });
    /**
     * Unique rule to check if value is unique or not
     */
    const uniqueChecker = new DbRowCheck('unique', database, validator.helpers);
    validator.rule('unique', async (value, compiledOptions, options) => {
        try {
            await uniqueChecker.validate(value, compiledOptions, options);
        }
        catch (error) {
            logger.fatal({ err: error }, '"unique" validation rule failed');
            options.errorReporter.report(options.pointer, 'unique', 'unique validation failure', options.arrayExpressionPointer);
        }
    }, (options) => {
        return {
            compiledOptions: uniqueChecker.compile(options[0]),
            async: true,
        };
    });
}
exports.extendValidator = extendValidator;
