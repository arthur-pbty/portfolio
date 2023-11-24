import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Configure a package
 */
export default class Configure extends BaseCommand {
    static commandName: string;
    static description: string;
    static aliases: string[];
    private appType;
    /**
     * Use yarn when building for production to install dependencies
     */
    packages: string[];
    /**
     * Returns package manager for installing dependencies
     */
    private getPackageManager;
    /**
     * Configure encore
     */
    private configureEncore;
    /**
     * Configure tests
     */
    private configureTests;
    /**
     * Configure a give package
     */
    private configurePackage;
    /**
     * Invoked automatically by ace
     */
    run(): Promise<void>;
}
