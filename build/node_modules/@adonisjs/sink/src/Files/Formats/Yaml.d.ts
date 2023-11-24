import { yaml } from 'mrm-core';
import { KeyValuePair } from '../Base/KeyValuePair';
/**
 * Exposes the API to work with Yaml files.
 *
 * ```ts
 * const yaml = new YamlFile(__dirname, '.travis.yml')
 * yaml.set('language', 'node_js')
 * yaml.set('language', [4, 6])
 *
 * yaml.commit()
 * ```
 */
export declare class YamlFile extends KeyValuePair {
    filePointer: ReturnType<typeof yaml>;
    constructor(basePath: string, filename: string);
}
