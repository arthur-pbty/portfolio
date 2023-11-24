"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvParser = void 0;
const env_1 = require("@adonisjs/env");
/**
 * Parses the env file inside the project root.
 */
class EnvParser {
    constructor() {
        this.envContents = {};
    }
    /**
     * Parse .env file contents
     */
    async parse(rootDir) {
        const { envContents, testEnvContent } = (0, env_1.envLoader)(rootDir);
        const envVars = new env_1.EnvParser(true).parse(envContents);
        const testEnvVars = new env_1.EnvParser(true).parse(testEnvContent);
        this.envContents = { ...envVars, ...testEnvVars };
    }
    /**
     * Returns value for a key inside the `.env` file
     */
    get(key) {
        return this.envContents[key];
    }
    /**
     * Returns an env object for the keys that has defined values
     */
    asEnvObject(keys) {
        return keys.reduce((result, key) => {
            const value = this.get(key);
            if (value !== undefined) {
                result[key] = value;
            }
            return result;
        }, {});
    }
}
exports.EnvParser = EnvParser;
