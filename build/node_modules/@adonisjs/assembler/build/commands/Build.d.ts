import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Compile typescript project Javascript
 */
export default class Build extends BaseCommand {
    static commandName: string;
    static description: string;
    /**
     * Build for production
     */
    production: boolean;
    /**
     * Bundle frontend assets. Defaults to true
     */
    assets: boolean;
    /**
     * Ignore ts errors and complete the build process. Defaults to false
     */
    ignoreTsErrors: boolean;
    /**
     * Path to the TypeScript project configuration file. Defaults to "tsconfig.json"
     */
    tsconfig: string;
    /**
     * Arguments to pass to the `encore` binary
     */
    encoreArgs: string[];
    /**
     * Select the client for deciding the lock file to copy to the
     * build folder
     */
    client: string;
    /**
     * Invoked automatically by ace
     */
    run(): Promise<void>;
}
