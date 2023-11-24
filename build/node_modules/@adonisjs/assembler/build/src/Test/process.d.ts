import { logger as uiLogger } from '@poppinss/cliui';
import { JapaFlags } from '../Contracts';
/**
 * Exposes the API to run tests as a child process.
 */
export declare class TestProcess {
    private sourceFile;
    private projectRoot;
    private filters;
    private logger;
    private env;
    private nodeArgs;
    constructor(sourceFile: string, projectRoot: string, filters: JapaFlags, nodeArgs: string[] | undefined, logger: typeof uiLogger, env?: {
        [key: string]: string;
    });
    /**
     * Start the HTTP server as a child process.
     */
    run(): Promise<{
        hasErrors: boolean;
    }>;
}
