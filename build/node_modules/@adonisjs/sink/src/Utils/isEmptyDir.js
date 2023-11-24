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
exports.isEmptyDir = void 0;
const fs_1 = require("fs");
/**
 * Returns a boolean telling if a directory is empty or
 * not.
 */
function isEmptyDir(location) {
    try {
        const files = (0, fs_1.readdirSync)(location);
        return files.length === 0;
    }
    catch (error) {
        return error.code === 'ENOENT';
    }
}
exports.isEmptyDir = isEmptyDir;
