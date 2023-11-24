import { ini } from 'mrm-core';
import { KeyValuePair } from '../Base/KeyValuePair';
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
export declare class IniFile extends KeyValuePair {
    filePointer: ReturnType<typeof ini>;
    constructor(basePath: string, filename: string);
    /**
     * Handling the onmerge action. This method is called by
     * the `commit` method.
     */
    onmerge(lifecycle: string, body: any): true | undefined;
    /**
     * Merge to the section values of an ini file.
     *
     * @example
     * ```ts
     * ini.merge('root', { indent_style: space })
     * ```
     */
    merge(section: string, values: any): this;
}
