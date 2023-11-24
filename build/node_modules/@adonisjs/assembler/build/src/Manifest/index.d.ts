import { logger as uiLogger } from '@poppinss/cliui';
/**
 * Exposes the API to execute generate manifest file
 */
export declare class Manifest {
    private appRoot;
    private logger;
    /**
     * The maximum number of times we should attempt to generate
     * the manifest file before giving up.
     *
     * This number may sound too big, but in real world scanerio, we
     * have seen encountered malformed JSON between 10-12 times.
     *
     * The JSON gets malformed, when a parallel process (node ace serve --watch)
     * is trying to update it.
     */
    private maxAttempts;
    private attempts;
    constructor(appRoot: string, logger: typeof uiLogger);
    /**
     * Returns a boolean telling if the error message is pointing
     * towards invalid or empty JSON file read attempt.
     */
    private isMalformedJSONError;
    /**
     * Generates the manifest file. We ignore `generate:manifest` errors for
     * now, since it's a secondary task for us and one should run it
     * in seperate process to find the actual errors.
     */
    generate(): Promise<boolean>;
}
