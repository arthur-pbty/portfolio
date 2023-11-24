import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Run tests
 */
export default class Test extends BaseCommand {
    static commandName: string;
    static description: string;
    static settings: {
        stayAlive: boolean;
    };
    suites: string[];
    /**
     * Allows watching for file changes
     */
    files: string[];
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
     * Filter by tags
     */
    tags: string[];
    /**
     * Filter by tags
     */
    ignoreTags: string[];
    /**
     * Filter by test title
     */
    tests: string[];
    /**
     * Filter by group title
     */
    groups: string[];
    /**
     * Customize tests timeout
     */
    timeout: number;
    /**
     * Force exit the tests runner
     */
    forceExit: boolean;
    /**
     * Convert command flags to test filters
     */
    private getTestFilters;
    run(): Promise<void>;
}
