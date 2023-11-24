"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateLiteralFile = void 0;
const mrm_core_1 = require("mrm-core");
const File_1 = require("../Base/File");
/**
 * Exposes the API to generate source files from template files.
 */
class TemplateLiteralFile extends File_1.File {
    constructor(basePath, filename, templatePath) {
        super(basePath);
        this.actions = [];
        this.removeOnRollback = true;
        this.overwrite = false;
        this.cdIn();
        this.filePointer = (0, mrm_core_1.template)(filename, templatePath);
        this.cdOut();
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
     * Apply contents to the template to evaluate it's output
     */
    apply(contents) {
        this.filePointer.apply(contents);
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
        this.filePointer.save();
        this.cdOut();
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
exports.TemplateLiteralFile = TemplateLiteralFile;
