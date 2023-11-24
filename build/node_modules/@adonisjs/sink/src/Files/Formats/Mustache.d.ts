import { file } from 'mrm-core';
import { File } from '../Base/File';
/**
 * Exposes the API to generate source files from template files.
 */
export declare class MustacheFile extends File {
    private templatePath;
    private partialsPaths;
    private templateData;
    protected actions: never[];
    filePointer: ReturnType<typeof file>;
    removeOnRollback: boolean;
    overwrite: boolean;
    constructor(basePath: string, filename: string, templatePath: string);
    /**
     * Returns a key-value pair of partial names and their contents
     */
    private getPartials;
    /**
     * Returns the contents of the template file
     */
    private readTemplate;
    /**
     * Returns existing contents for a template file
     */
    get(): string;
    /**
     * A boolean telling if the file already exists
     */
    exists(): boolean;
    /**
     * Define one or more partials by defining key-value
     * pair of partial name and path to the file.
     */
    partials(partials: {
        [key: string]: string;
    }): this;
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
