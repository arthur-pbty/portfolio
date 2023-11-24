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
exports.copyFiles = void 0;
const path_1 = require("path");
const cp_file_1 = __importDefault(require("cp-file"));
const fs_1 = require("fs");
/**
 * Utility method to copy files
 */
function copyFiles(sourceBaseDir, destinationBaseDir, files, options) {
    const overwrite = options ? options.overwrite : false;
    return files.map((file) => {
        const absPath = (0, path_1.join)(sourceBaseDir, file);
        if (!(0, fs_1.existsSync)(absPath)) {
            throw new Error(`Missing source file "${absPath}"`);
        }
        const targetAbsPath = (0, path_1.join)(destinationBaseDir, file);
        const hasTarget = (0, fs_1.existsSync)(targetAbsPath);
        if (hasTarget && !overwrite) {
            return { filePath: file, state: 'skipped' };
        }
        cp_file_1.default.sync(absPath, targetAbsPath, { overwrite: true });
        return { filePath: file, state: 'copied' };
    });
}
exports.copyFiles = copyFiles;
