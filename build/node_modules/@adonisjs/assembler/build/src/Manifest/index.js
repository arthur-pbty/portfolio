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
exports.Manifest = void 0;
const execa_1 = __importDefault(require("execa"));
const WARN_MESSAGE = [
    'Unable to generate manifest file.',
    'Check the following error for more info',
].join(' ');
/**
 * Exposes the API to execute generate manifest file
 */
class Manifest {
    constructor(appRoot, logger) {
        this.appRoot = appRoot;
        this.logger = logger;
        /**
         * The maximum number of times we should attempt to generate
         * the manifest file before giving up.
         *
         * This number may sound too big, but in real world scanerio, we
         * have seen encountered malformed JSON between 10-12 times.
         *
         * The JSON gets malformed, when a parallel process (node ace serve --watch)
         * is trying to update it.
         */
        this.maxAttempts = 15;
        this.attempts = 0;
    }
    /**
     * Returns a boolean telling if the error message is pointing
     * towards invalid or empty JSON file read attempt.
     */
    isMalformedJSONError(error) {
        return error.includes('Unexpected end of JSON input');
    }
    /**
     * Generates the manifest file. We ignore `generate:manifest` errors for
     * now, since it's a secondary task for us and one should run it
     * in seperate process to find the actual errors.
     */
    async generate() {
        try {
            const response = await (0, execa_1.default)(process.execPath, ['ace', 'generate:manifest'], {
                buffer: true,
                cwd: this.appRoot,
                env: {
                    FORCE_COLOR: 'true',
                },
            });
            /**
             * Log success
             */
            if (response.stdout) {
                this.logger.log(response.stdout);
            }
            return true;
        }
        catch (error) {
            if (this.isMalformedJSONError(error.stderr) && this.attempts < this.maxAttempts) {
                this.attempts++;
                return this.generate();
            }
            /**
             * Print warning on error
             */
            this.logger.warning(WARN_MESSAGE);
            if (error.stderr) {
                this.logger.logError(error.stderr);
            }
            if (error.stdout) {
                this.logger.logError(error.stdout);
            }
            return false;
        }
    }
}
exports.Manifest = Manifest;
