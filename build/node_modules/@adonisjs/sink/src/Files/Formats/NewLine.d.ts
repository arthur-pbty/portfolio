import { lines } from 'mrm-core';
import { File } from '../Base/File';
/**
 * Base class to work with raw text new line files. For example `.env`
 * file or `.gitignore`
 */
export declare class NewLineFile extends File {
    filePointer: ReturnType<typeof lines>;
    protected actions: never[];
    constructor(basePath: string, filename: string);
    /**
     * Add one or more new lines
     */
    add(line: string | string[]): this;
    /**
     * Update existing text with new text
     */
    update(oldText: string, newText: string): this;
    /**
     * Remove lines matching the give text
     */
    remove(line: string | string[]): this;
    /**
     * Delete file
     */
    delete(): this;
    /**
     * Get contents for the file
     */
    get(): string[];
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
