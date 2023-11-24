import { json, yaml, ini } from 'mrm-core';
import { File } from './File';
/**
 * Exposes the API to work with key/value pair files like `ini`, `yaml`
 * and `json`.
 */
export declare abstract class KeyValuePair extends File {
    protected actions: never[];
    /**
     * Only these key-value pair files are supported
     */
    abstract filePointer: ReturnType<typeof json> | ReturnType<typeof yaml> | ReturnType<typeof ini>;
    constructor(basePath: string);
    /**
     * Set key/value pair
     */
    set(key: string, value: any): this;
    /**
     * Unset key/value pair
     */
    unset(key: string): this;
    /**
     * Remove file
     */
    delete(): this;
    /**
     * Returns value for a given key from the file
     */
    get(): any;
    get(address: string | string[], defaultValue?: any): any;
    /**
     * A boolean telling if the file already exists
     */
    exists(): boolean;
    /**
     * Commit mutations
     */
    commit(): void;
    /**
     * Rollback mutations
     */
    rollback(): void;
}
