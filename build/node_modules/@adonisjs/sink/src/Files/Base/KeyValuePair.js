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
exports.KeyValuePair = void 0;
const File_1 = require("./File");
/**
 * Exposes the API to work with key/value pair files like `ini`, `yaml`
 * and `json`.
 */
class KeyValuePair extends File_1.File {
    constructor(basePath) {
        super(basePath);
        this.actions = [];
    }
    /**
     * Set key/value pair
     */
    set(key, value) {
        this.addAction('set', { key, value });
        return this;
    }
    /**
     * Unset key/value pair
     */
    unset(key) {
        this.addAction('unset', { key });
        return this;
    }
    /**
     * Remove file
     */
    delete() {
        this.addAction('delete');
        return this;
    }
    get(address, defaultValue) {
        return address ? this.filePointer.get(address, defaultValue) : this.filePointer.get();
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
            if (action === 'set') {
                this.filePointer.set(body.key, body.value);
                return;
            }
            if (action === 'unset') {
                this.filePointer.unset(body.key);
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
            if (action === 'set') {
                this.filePointer.unset(body.key);
                return;
            }
        });
        this.filePointer.save();
        this.cdOut();
    }
}
exports.KeyValuePair = KeyValuePair;
