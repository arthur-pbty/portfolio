import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Create a new test suite
 */
export default class CreateSuite extends BaseCommand {
    static commandName: string;
    static description: string;
    /**
     * Name of the test suite to be created
     */
    suite: string;
    /**
     * Glob pattern for the test suite, or only location to the test suite
     */
    location: string;
    /**
     * Should add a sample test file
     */
    withExampleTest: boolean;
    /**
     * Get the destination path for the sample test file
     */
    private getExampleTestDestinationPath;
    /**
     * Generate suite glob pattern based on `location` argument
     */
    private generateSuiteGlobPattern;
    /**
     * Check if the suite name is already defined in RcFile
     */
    private checkIfSuiteExists;
    /**
     * Add the new test suite to the AdonisRC File and save it
     */
    private addSuiteToRcFile;
    /**
     * Add a sample test file to the new suite folder
     */
    private createSampleTestFile;
    run(): Promise<void>;
}
