import { logger as uiLogger } from '@poppinss/cliui';
/**
 * Exposes the API to watch project for compilition changes.
 */
export declare class DevServer {
    private appRoot;
    private nodeArgs;
    private encoreArgs;
    private buildAssets;
    private logger;
    private httpServer;
    /**
     * HTTP server port
     */
    private serverPort?;
    /**
     * HTTP server host
     */
    private serverHost?;
    /**
     * Encore dev server host
     */
    private encoreDevServerResponse;
    /**
     * A boolean to know if we are watching for filesystem
     */
    private watchingFileSystem;
    /**
     * Watcher state
     */
    private watcherState;
    /**
     * Reference to the typescript compiler
     */
    private ts;
    /**
     * Reference to the RCFile
     */
    private rcFile;
    /**
     * Manifest instance to generate ace manifest file
     */
    private manifest;
    /**
     * Require-ts watch helpers
     */
    private watchHelpers;
    constructor(appRoot: string, nodeArgs: string[], encoreArgs: string[], buildAssets: boolean, logger?: typeof uiLogger);
    /**
     * Kill current process
     */
    private kill;
    /**
     * Create the http server
     */
    private createHttpServer;
    /**
     * Renders box to notify about the server state
     */
    private renderServerIsReady;
    /**
     * Start the dev server. Use [[watch]] to also watch for file
     * changes
     */
    start(): Promise<void>;
    /**
     * Build and watch for file changes
     */
    watch(poll?: boolean): Promise<void>;
}
