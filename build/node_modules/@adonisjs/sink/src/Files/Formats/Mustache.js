"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustacheFile = void 0;
const mustache_1 = __importDefault(require("mustache"));
const mrm_core_1 = require("mrm-core");
const fs_1 = require("fs");
const File_1 = require("../Base/File");
/**
 * Exposes the API to generate source files from template files.
 */
class MustacheFile extends File_1.File {
    constructor(basePath, filename, templatePath) {
        super(basePath);
        this.templatePath = templatePath;
        this.partialsPaths = {};
        this.templateData = {};
        this.actions = [];
        this.removeOnRollback = true;
        this.overwrite = false;
        this.cdIn();
        this.filePointer = (0, mrm_core_1.file)(filename);
        this.cdOut();
    }
    /**
     * Returns a key-value pair of partial names and their contents
     */
    getPartials() {
        return Object.keys(this.partialsPaths).reduce((result, name) => {
            result[name] = this.readTemplate(this.partialsPaths[name]);
            return result;
        }, {});
    }
    /**
     * Returns the contents of the template file
     */
    readTemplate(templatePath) {
        try {
            return (0, fs_1.readFileSync)(templatePath, 'utf8');
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                throw Error(`Template file not found: ${templatePath}`);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Returns existing contents for a template file
     */
    get() {
        return this.filePointer.get();
    }
    /**
     * A boolean telling if the file already exists
     */
    exists() {
        return this.filePointer.exists();
    }
    /**
     * Define one or more partials by defining key-value
     * pair of partial name and path to the file.
     */
    partials(partials) {
        this.partialsPaths = partials;
        return this;
    }
    /**
     * Apply contents to the template to evaluate it's output
     */
    apply(contents) {
        this.templateData = contents || {};
        return this;
    }
    /**
     * Commit changes
     */
    commit() {
        this.cdIn();
        /**
         * Do not overwrite contents when file already exists and
         * `overwrite = false`
         */
        if (this.filePointer.exists() && !this.overwrite) {
            this.cdOut();
            return;
        }
        try {
            this.filePointer.save(mustache_1.default.render(this.readTemplate(this.templatePath), this.templateData, this.getPartials()));
            this.cdOut();
        }
        catch (error) {
            this.cdOut();
            throw error;
        }
    }
    /**
     * Rollback changes
     */
    rollback() {
        this.cdIn();
        /**
         * Remove the file on rollback (only when instructed) or this method results
         * is a noop
         */
        if (this.filePointer.exists() && this.removeOnRollback) {
            this.filePointer.delete();
        }
        this.cdOut();
    }
}
exports.MustacheFile = MustacheFile;
