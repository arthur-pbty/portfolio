import { template } from 'mrm-core';
import { File } from '../Base/File';
/**
 * Exposes the API to generate source files from template files.
 */
export declare class TemplateLiteralFile extends File {
    protected actions: never[];
    filePointer: ReturnType<typeof template>;
    removeOnRollback: boolean;
    overwrite: boolean;
    constructor(basePath: string, filename: string, templatePath: string);
    /**
     * Returns existing contents for a template file
     */
    get(): string;
    /**
     * A boolean telling if the file already exists
     */
    exists(): boolean;
    /**
     * Apply contents to the template to evaluate it's output
     */
    apply(contents?: any): this;
    /**
     * Commit changes
     */
    commit(): void;
    /**
     * Rollback changes
     */
    rollback(): void;
}
