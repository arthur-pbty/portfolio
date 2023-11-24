/**
 * Parses the env file inside the project root.
 */
export declare class EnvParser {
    private envContents;
    constructor();
    /**
     * Parse .env file contents
     */
    parse(rootDir: string): Promise<void>;
    /**
     * Returns value for a key inside the `.env` file
     */
    get(key: string): string | undefined;
    /**
     * Returns an env object for the keys that has defined values
     */
    asEnvObject(keys: string[]): {
        [key: string]: string;
    };
}
