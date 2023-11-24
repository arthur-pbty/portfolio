import { json } from 'mrm-core';
import { KeyValuePair } from '../Base/KeyValuePair';
/**
 * Exposes the API to work with JSON files.
 *
 * ```ts
 * const json = new JsonFile(__dirname, 'tsconfig.json')
 * json.set('compilerOptions.lib', ['es2017'])
 *
 * json.commit()
 * ```
 */
export declare class JsonFile extends KeyValuePair {
    filePointer: ReturnType<typeof json>;
    constructor(basePath: string, filename: string);
}
