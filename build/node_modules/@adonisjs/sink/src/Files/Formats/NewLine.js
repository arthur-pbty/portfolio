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
exports.NewLineFile = void 0;
const mrm_core_1 = require("mrm-core");
const File_1 = require("../Base/File");
/**
 * Base class to work with raw text new line files. For example `.env`
 * file or `.gitignore`
 */
class NewLineFile extends File_1.File {
    constructor(basePath, filename) {
        super(basePath);
        this.actions = [];
        this.cdIn();
        this.filePointer = (0, mrm_core_1.lines)(filename);
        this.cdOut();
    }
    /**
     * Add one or more new lines
     */
    add(line) {
        this.addAction('add', { line });
        return this;
    }
    /**
     * Update existing text with new text
     */
    update(oldText, newText) {
        this.addAction('update', { oldText, newText });
        return this;
    }
    /**
     * Remove lines matching the give text
     */
    remove(line) {
        this.addAction('remove', { line });
        return this;
    }
    /**
     * Delete file
     */
    delete() {
        this.addAction('delete');
        return this;
    }
    /**
     * Get contents for the file
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
     * Commit mutations
     */
    commit() {
        this.cdIn();
        const actions = this.getCommitActions();
        const deleteFile = actions.find(({ action }) => action === 'delete');
        /**
         * In case of `delete` action. There is no point running
         * other actions and we can simply delete the file
         */
        if (deleteFile) {
            this.filePointer.delete();
            this.cdOut();
            return;
        }
        actions.forEach(({ action, body }) => {
            if (typeof this[`on${action}`] === 'function') {
                const handled = this[`on${action}`]('commit', body);
                /**
                 * Return early when action is handled by the hook
                 */
                if (handled) {
                    return;
                }
            }
            if (action === 'add') {
                this.filePointer.add(body.line);
                return;
            }
            /**
             * On update we remove the old line and add the new one
             */
            if (action === 'update') {
                this.filePointer.remove(body.oldText);
                this.filePointer.add(body.newText);
                return;
            }
            if (action === 'remove') {
                this.filePointer.remove(body.line);
            }
        });
        this.filePointer.save();
        this.cdOut();
    }
    /**
     * Rollback mutations
     */
    rollback() {
        this.cdIn();
        const actions = this.getRevertActions();
        actions.forEach(({ action, body }) => {
            if (typeof this[`on${action}`] === 'function') {
                const handled = this[`on${action}`]('rollback', body);
                /**
                 * Return early when action is handled by the hook
                 */
                if (handled) {
                    return;
                }
            }
            if (action === 'add') {
                this.filePointer.remove(body.line);
                return;
            }
            if (action === 'update') {
                this.filePointer.remove(body.newText);
                this.filePointer.add(body.oldText);
                return;
            }
            if (action === 'remove') {
                this.filePointer.add(body.line);
            }
        });
        this.filePointer.save();
        this.cdOut();
    }
}
exports.NewLineFile = NewLineFile;
