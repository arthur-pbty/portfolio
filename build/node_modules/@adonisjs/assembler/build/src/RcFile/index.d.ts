import { Application } from '@adonisjs/application';
/**
 * Exposes the API to pull meta files from the `.adonisrc.json` file and
 * also match relative file paths against the defined globs.
 */
export declare class RcFile {
    private appRoot;
    rcFilePath: string;
    /**
     * Raw rcfile contents
     */
    raw: any;
    /**
     * Reference to application
     */
    application: Application;
    /**
     * A matcher to know if a file is part of the meta files globs
     */
    isMetaFile: (filePath: string) => boolean;
    /**
     * A matcher to know if file is a test file or not
     */
    isTestsFile: (filePath: string) => boolean;
    /**
     * A matcher to know if a file is part of the restart server files globs
     */
    isRestartServerFile: (filePath: string) => boolean;
    /**
     * Commands match to know, if file path is part of the commands paths defined
     * inside `.adonisrc.json` file
     */
    isCommandsPath: (filePath: string) => boolean;
    constructor(appRoot: string);
    /**
     * Returns an array of globs for the meta files that has `reloadServer`
     * set to true
     */
    private getRestartServerFilesGlob;
    /**
     * Returns the commands glob for registered commands. We convert the
     * command paths to glob pattern
     */
    private commandsGlob;
    /**
     * Returns true when file is `.adonisrc.json` itself
     */
    private isRcFile;
    /**
     * Returns an array of globs for the meta files
     * to be copied
     */
    getMetaFilesGlob(): string[];
    /**
     * Returns an array of globs for the test files
     */
    getTestsFileGlob(): string[];
    /**
     * Reloads the rcfile.json
     */
    getDiskContents(): any;
    /**
     * Returns metadata for a given file path. The metadata can
     * be used to execute certain actions during file watch.
     */
    getMetaData(filePath: string): {
        reload: boolean;
        rcFile: boolean;
        metaFile: boolean;
        testFile: boolean;
    };
}
