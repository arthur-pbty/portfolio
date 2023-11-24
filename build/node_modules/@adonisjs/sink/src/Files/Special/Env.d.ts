/**
 * Exposes the API to run mutations on `.env` file. The same variables
 * will be added to `.env.example` with empty contents.
 */
export declare class EnvFile {
    private basePath;
    private envContents;
    private exampleEnvContents;
    constructor(basePath: string);
    /**
     * Set key/value pair inside the `.env` file
     */
    set(key: string, value: any): this;
    /**
     * Returns a key/value pair of the file contents.
     */
    get(): {
        [key: string]: string;
    };
    /**
     * Returns a boolean telling if the file exists.
     */
    exists(): boolean;
    /**
     * Unset a key/value pair from the `.env` and `.env.example` file
     */
    unset(key: string): this;
    /**
     * Commit mutations
     */
    commit(): void;
    /**
     * Rollback mutations
     */
    rollback(): void;
}
