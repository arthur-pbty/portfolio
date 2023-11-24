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
exports.EnvFile = void 0;
const NewLine_1 = require("../Formats/NewLine");
/**
 * Exposes the API to run mutations on `.env` file. The same variables
 * will be added to `.env.example` with empty contents.
 */
class EnvFile {
    constructor(basePath) {
        this.basePath = basePath;
        this.envContents = new NewLine_1.NewLineFile(this.basePath, '.env');
        this.exampleEnvContents = new NewLine_1.NewLineFile(this.basePath, '.env.example');
    }
    /**
     * Set key/value pair inside the `.env` file
     */
    set(key, value) {
        const matchingLine = this.envContents.get().find((line) => line.startsWith(`${key}=`));
        const newText = `${key}=${value}`;
        if (matchingLine && newText !== matchingLine) {
            this.envContents.update(matchingLine, newText);
            return this;
        }
        this.envContents.add(newText);
        this.exampleEnvContents.add(newText);
        return this;
    }
    /**
     * Returns a key/value pair of the file contents.
     */
    get() {
        return this.envContents.get().reduce((result, line) => {
            const [key, value] = line.split('=');
            result[key.trim()] = value.trim();
            return result;
        }, {});
    }
    /**
     * Returns a boolean telling if the file exists.
     */
    exists() {
        return this.envContents.exists();
    }
    /**
     * Unset a key/value pair from the `.env` and `.env.example` file
     */
    unset(key) {
        const matchingLine = this.envContents.get().find((line) => line.startsWith(`${key}=`));
        if (matchingLine) {
            this.envContents.remove(matchingLine);
        }
        const exampleFileMatchingLine = this.exampleEnvContents.get().find((line) => {
            return line.startsWith(`${key}=`);
        });
        if (exampleFileMatchingLine) {
            this.exampleEnvContents.remove(exampleFileMatchingLine);
        }
        return this;
    }
    /**
     * Commit mutations
     */
    commit() {
        this.envContents.commit();
        this.exampleEnvContents.commit();
    }
    /**
     * Rollback mutations
     */
    rollback() {
        this.envContents.rollback();
        this.exampleEnvContents.rollback();
    }
}
exports.EnvFile = EnvFile;
