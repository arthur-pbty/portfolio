import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Compile typescript project to Javascript and start
 * the HTTP server
 */
export default class Serve extends BaseCommand {
    static commandName: string;
    static description: string;
    static settings: {
        stayAlive: boolean;
    };
    /**
     * Bundle frontend assets. Defaults to true
     */
    assets: boolean;
    /**
     * Allows watching for file changes
     */
    watch: boolean;
    /**
     * Detect changes by polling files
     */
    poll: boolean;
    /**
     * Arguments to pass to the `node` binary
     */
    nodeArgs: string[];
    /**
     * Arguments to pass to the `encore` binary
     */
    encoreArgs: string[];
    run(): Promise<void>;
}
