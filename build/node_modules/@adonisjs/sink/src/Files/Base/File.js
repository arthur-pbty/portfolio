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
exports.File = void 0;
/**
 * Base file exposes the API to add action and `cd` in/out from
 * the application base directory.
 */
class File {
    constructor(basePath) {
        this.basePath = basePath;
    }
    /**
     * Add a new action to the actions stack. The action workings
     * are independent on the user adding the action
     */
    addAction(action, body) {
        this.actions.push({ action, body });
    }
    /**
     * Returns an array of actions to commit
     */
    getCommitActions() {
        return this.actions;
    }
    /**
     * Returns an array of actions for performing revert. Since
     * reverts are done in reverse, this method will reverse
     * the actions array.
     */
    getRevertActions() {
        return this.actions.slice().reverse();
    }
    /**
     * `cd` to the application base path
     */
    cdIn() {
        this.currentDir = process.cwd();
        process.chdir(this.basePath);
    }
    /**
     * `cd` out from the application base path
     */
    cdOut() {
        process.chdir(this.currentDir);
    }
}
exports.File = File;
