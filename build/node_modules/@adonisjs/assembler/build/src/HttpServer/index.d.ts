import Emittery from 'emittery';
import { logger as uiLogger } from '@poppinss/cliui';
/**
 * Exposes the API to start Node.js HTTP server as a child process. The
 * child process is full managed and cleans up when parent process
 * dies.
 */
export declare class HttpServer extends Emittery {
    private sourceFile;
    private projectRoot;
    private logger;
    private env;
    private childProcess?;
    private nodeArgs;
    constructor(sourceFile: string, projectRoot: string, nodeArgs: string[] | undefined, logger: typeof uiLogger, env?: {
        [key: string]: string;
    });
    /**
     * Whether or not the underlying process is connected
     */
    get isConnected(): boolean | undefined;
    /**
     * Start the HTTP server as a child process.
     */
    start(): void;
    /**
     * Stop the underlying process
     */
    stop(): void;
    /**
     * Restart the server by killing the old one
     */
    restart(): void;
}
