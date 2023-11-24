import Emittery from 'emittery';
import { logger as uiLogger } from '@poppinss/cliui';
export type DevServerResponse = {
    state: 'not-installed' | 'no-assets';
} | {
    state: 'running';
    port: string;
    host: string;
};
/**
 * Assets bundler uses webpack encore to build frontend dependencies
 */
export declare class AssetsBundler extends Emittery {
    private projectRoot;
    private buildAssets;
    private logger;
    private env;
    /**
     * Binary to execute
     */
    private binaryName;
    private encoreArgs;
    /**
     * Options passed to spawn a child process
     */
    private execaOptions;
    constructor(projectRoot: string, encoreArgs: string[] | undefined, buildAssets: boolean, logger: typeof uiLogger, env?: {
        [key: string]: string;
    });
    /**
     * Find if encore is installed
     */
    private isEncoreInstalled;
    /**
     * Notify user that we are about use encore
     */
    private notifyAboutEncore;
    /**
     * Logs the line to stdout
     */
    private log;
    /**
     * Logs the line to stderr
     */
    private logError;
    /**
     * Returns the custom port defined using the `--port` flag in encore
     * flags
     */
    private findCustomPort;
    /**
     * Returns the custom host defined using the `--host` flag in encore
     * flags
     */
    private findCustomHost;
    /**
     * Execute command
     */
    private exec;
    /**
     * Build assets using encore
     */
    build(): Promise<{
        hasErrors: boolean;
    }>;
    /**
     * Build assets for production
     */
    buildForProduction(): Promise<{
        hasErrors: boolean;
    }>;
    /**
     * Start the webpack dev server
     */
    startDevServer(): Promise<DevServerResponse>;
}
