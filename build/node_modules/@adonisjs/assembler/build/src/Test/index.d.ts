import { logger as uiLogger } from '@poppinss/cliui';
import { JapaFlags } from '../Contracts';
/**
 * Exposes the API to watch project for compilition changes and
 * run/re-run tests
 */
export declare class TestsServer {
    private appRoot;
    private filters;
    private nodeArgs;
    private logger;
    /**
     * A boolean to know if we are watching for filesystem
     */
    private watchingFileSystem;
    /**
     * Boolean to hold the current state of tests. This is avoid
     * re-running the tests when one run is in progress
     */
    private busy;
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
    /**
     * A method to know if the file is part of the selected suites
     * or not
     */
    private isTestSuiteFile;
    /**
     * Find if the test file part of the applied file filters
     */
    private isTestFile;
    constructor(appRoot: string, filters: JapaFlags, nodeArgs?: string[], logger?: typeof uiLogger);
    /**
     * Clear terminal screen
     */
    private clearScreen;
    /**
     * Returns the glob paths for test suites. Returns all if no
     * filter is applied. Otherwise only the filtered suites
     * are picked.
     */
    private getFilesForSelectedSuites;
    /**
     * Kill current process
     */
    private kill;
    /**
     * Returns the HOST and the PORT environment variables
     * for the HTTP server
     */
    private getEnvironmentVariables;
    /**
     * Run tests. Use [[watch]] to also watch for file
     * changes
     */
    run(filePath?: string): Promise<void>;
    /**
     * Build and watch for file changes
     */
    watch(poll?: boolean): Promise<void>;
}
