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
exports.IniFile = void 0;
const mrm_core_1 = require("mrm-core");
const KeyValuePair_1 = require("../Base/KeyValuePair");
/**
 * Ini file to work with files like `.editorconfig`.
 *
 * ```ts
 * const ini = new Ini(__dirname, '.editorconfig')
 * ini.set('_global', { root: true })
 * ini.set('**.js', { insert_final_newline: true })
 *
 * ini.commit()
 * ```
 */
class IniFile extends KeyValuePair_1.KeyValuePair {
    constructor(basePath, filename) {
        super(basePath);
        /**
         * The `ini` function from `mrm-core` relies on the current
         * working directory, that's why we have to cd in to the
         * base path before creating a new instance of it.
         */
        this.cdIn();
        this.filePointer = (0, mrm_core_1.ini)(filename);
        this.cdOut();
    }
    /**
     * Handling the onmerge action. This method is called by
     * the `commit` method.
     */
    onmerge(lifecycle, body) {
        if (lifecycle === 'commit') {
            this.filePointer.set(body.section, Object.assign({}, this.get(body.section), body.values));
            return true;
        }
        if (lifecycle === 'rollback') {
            const resetObject = Object.keys(body.values).reduce((result, key) => {
                result[key] = undefined;
                return result;
            }, {});
            this.filePointer.set(body.section, Object.assign({}, this.get(body.section), resetObject));
            return true;
        }
    }
    /**
     * Merge to the section values of an ini file.
     *
     * @example
     * ```ts
     * ini.merge('root', { indent_style: space })
     * ```
     */
    merge(section, values) {
        if (typeof values !== 'object' || values === null) {
            return this;
        }
        this.addAction('merge', { section, values });
        return this;
    }
}
exports.IniFile = IniFile;
