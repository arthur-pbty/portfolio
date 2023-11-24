import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import * as sink from '../../../index';
/**
 * Exposes the API to execute the instructions of a package, defined inside
 * the `package.json` file.
 */
export declare class Instructions {
    private packageName;
    private projectRoot;
    private application;
    private verbose;
    /**
     * Path to the package package.json file
     */
    private packagePath;
    private markdownDisplay;
    private logger;
    constructor(packageName: string, projectRoot: string, application: ApplicationContract, verbose?: boolean);
    /**
     * Formats object to string
     */
    private formatObject;
    /**
     * Formats array to string
     */
    private formatArray;
    /**
     * Returns the suffix for the logger statements
     */
    private getSuffix;
    /**
     * Returns the absolute path to the package
     */
    private getPackagePath;
    /**
     * Load package json file from the package root directory
     */
    private loadPackageJsonFile;
    /**
     * Copies templates to the user project
     */
    private copyTemplates;
    /**
     * Set environment variables
     */
    private setEnvVariables;
    /**
     * Adds the types to the tsconfig.json file
     */
    private setTypes;
    /**
     * Adds the meta files to `.adonisrc.json` file
     */
    private setMetaFiles;
    /**
     * Adds the preloads to `.adonisrc.json` file
     */
    private setPreloads;
    /**
     * Set commands inside the adonisrc.json file
     */
    private setCommands;
    /**
     * Set aliases inside the adonisrc.json file
     */
    private setAliases;
    /**
     * Sets providers or ace providers inside the `.adonisrc.json` file
     */
    private setProviders;
    /**
     * Executes the instructions fn exposed by the package inside package.json file.
     */
    private runInstructions;
    /**
     * Renders the markdown file if defined inside the package.json file.
     */
    private renderMarkdownFile;
    /**
     * Preset markdown display for avoiding prompt
     */
    setDisplay(display: 'browser' | 'terminal'): this;
    /**
     * Define a custom logger to use
     */
    useLogger(logger: typeof sink.logger): this;
    /**
     * Execute the instructions file
     */
    execute(): Promise<boolean>;
}
