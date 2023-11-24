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
exports.getPackageManager = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
/**
 * Returns the package manager in use by checking for the lock files
 * on the disk or by inspecting the "npm_config_user_agent".
 *
 * Defaults to npm when unable to detect the package manager.
 */
function getPackageManager(appRoot) {
    if ((0, fs_extra_1.pathExistsSync)((0, path_1.resolve)(appRoot, 'yarn.lock'))) {
        return 'yarn';
    }
    if ((0, fs_extra_1.pathExistsSync)((0, path_1.resolve)(appRoot, 'pnpm-lock.yaml'))) {
        return 'pnpm';
    }
    if (process.env.npm_config_user_agent) {
        if (process.env.npm_config_user_agent.includes('yarn')) {
            return 'yarn';
        }
        if (process.env.npm_config_user_agent.includes('pnpm')) {
            return 'pnpm';
        }
    }
    return 'npm';
}
exports.getPackageManager = getPackageManager;
