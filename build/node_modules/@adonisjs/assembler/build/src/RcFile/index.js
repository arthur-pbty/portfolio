"use strict";
/*
 * @adonisjs/assembler
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
exports.RcFile = void 0;
const slash_1 = __importDefault(require("slash"));
const picomatch_1 = __importDefault(require("picomatch"));
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const application_1 = require("@adonisjs/application");
const helpers_1 = require("@poppinss/utils/build/helpers");
const paths_1 = require("../../config/paths");
/**
 * Exposes the API to pull meta files from the `.adonisrc.json` file and
 * also match relative file paths against the defined globs.
 */
class RcFile {
    constructor(appRoot) {
        this.appRoot = appRoot;
        this.rcFilePath = (0, helpers_1.resolveFrom)(this.appRoot, `./${paths_1.RCFILE_NAME}`);
        /**
         * Raw rcfile contents
         */
        this.raw = this.getDiskContents();
        /**
         * Reference to application
         */
        this.application = new application_1.Application(this.appRoot, 'console', this.raw);
        /**
         * A matcher to know if a file is part of the meta files globs
         */
        this.isMetaFile = (0, picomatch_1.default)(this.getMetaFilesGlob());
        /**
         * A matcher to know if file is a test file or not
         */
        this.isTestsFile = (0, picomatch_1.default)(this.getTestsFileGlob());
        /**
         * A matcher to know if a file is part of the restart server files globs
         */
        this.isRestartServerFile = (0, picomatch_1.default)(this.getRestartServerFilesGlob());
        /**
         * Commands match to know, if file path is part of the commands paths defined
         * inside `.adonisrc.json` file
         */
        this.isCommandsPath = (0, picomatch_1.default)(this.commandsGlob());
    }
    /**
     * Returns an array of globs for the meta files that has `reloadServer`
     * set to true
     */
    getRestartServerFilesGlob() {
        return this.application.rcFile.metaFiles
            .filter(({ reloadServer, pattern }) => {
            return reloadServer === true && ![paths_1.RCFILE_NAME, paths_1.ACE_FILE_NAME].includes(pattern);
        })
            .map(({ pattern }) => pattern);
    }
    /**
     * Returns the commands glob for registered commands. We convert the
     * command paths to glob pattern
     */
    commandsGlob() {
        const commands = this.application.rcFile.commands.reduce((result, commandPath) => {
            if (/^(.){1,2}\//.test(commandPath)) {
                commandPath = (0, slash_1.default)((0, path_1.relative)(this.appRoot, (0, path_1.join)(this.appRoot, commandPath)));
                result = result.concat([`${commandPath}.*`, `${commandPath}/**/*`]);
            }
            return result;
        }, []);
        return commands;
    }
    /**
     * Returns true when file is `.adonisrc.json` itself
     */
    isRcFile(filePath) {
        return filePath === paths_1.RCFILE_NAME;
    }
    /**
     * Returns an array of globs for the meta files
     * to be copied
     */
    getMetaFilesGlob() {
        return this.application.rcFile.metaFiles
            .filter(({ pattern }) => ![paths_1.RCFILE_NAME, paths_1.ACE_FILE_NAME].includes(pattern))
            .map(({ pattern }) => pattern)
            .concat([paths_1.ACE_FILE_NAME]);
    }
    /**
     * Returns an array of globs for the test files
     */
    getTestsFileGlob() {
        return this.application.rcFile.tests.suites.reduce((result, suite) => {
            if (suite.files) {
                result = result.concat(suite.files);
            }
            return result;
        }, []);
    }
    /**
     * Reloads the rcfile.json
     */
    getDiskContents() {
        return (0, fs_extra_1.readJSONSync)(this.rcFilePath);
    }
    /**
     * Returns metadata for a given file path. The metadata can
     * be used to execute certain actions during file watch.
     */
    getMetaData(filePath) {
        /**
         * File path === '.adonisrc.json'
         */
        if (this.isRcFile(filePath)) {
            return {
                reload: true,
                rcFile: true,
                metaFile: true,
                testFile: false,
            };
        }
        /**
         * File is part of `reloadServer` metadata file globs
         */
        if (this.isRestartServerFile(filePath)) {
            return {
                reload: true,
                rcFile: false,
                metaFile: true,
                testFile: false,
            };
        }
        /**
         * File is part of metadata file globs, but reload = false
         */
        if (this.isMetaFile(filePath)) {
            return {
                reload: false,
                rcFile: false,
                metaFile: true,
                testFile: false,
            };
        }
        /**
         * File is part of one of the tests suite
         */
        if (this.isTestsFile(filePath)) {
            return {
                reload: false,
                rcFile: false,
                metaFile: false,
                testFile: true,
            };
        }
        /**
         * Out of scope
         */
        return {
            reload: false,
            rcFile: false,
            metaFile: false,
            testFile: false,
        };
    }
}
exports.RcFile = RcFile;
