import { logger as uiLogger } from '@poppinss/cliui';
/**
 * Exposes the API to build the AdonisJs project for development or
 * production. The production build has it's own set of node_modules
 */
export declare class Compiler {
    appRoot: string;
    private encoreArgs;
    private buildAssets;
    private logger;
    /**
     * Reference to typescript compiler
     */
    private ts;
    /**
     * Reference to rc File
     */
    private rcFile;
    constructor(appRoot: string, encoreArgs: string[], buildAssets: boolean, logger?: typeof uiLogger, tsconfig?: string);
    /**
     * Returns relative unix path from the project root. Used for
     * display only
     */
    private getRelativeUnixPath;
    /**
     * Cleans up the build directory
     */
    private cleanupBuildDirectory;
    /**
     * Copies .adonisrc.json file to the destination
     */
    private copyAdonisRcFile;
    /**
     * Copy all meta files to the build directory
     */
    private copyMetaFiles;
    /**
     * Copy files to destination directory
     */
    private copyFiles;
    /**
     * Build typescript source files
     */
    private buildTypescriptSource;
    /**
     * Log the message that ts build and failed
     */
    private logTsBuildFailed;
    /**
     * Typecheck the project without emit
     */
    typeCheck(): Promise<boolean>;
    /**
     * Compile project. See [[Compiler.compileForProduction]] for
     * production build
     */
    compile(stopOnError?: boolean, extraFiles?: string[]): Promise<boolean>;
    /**
     * Compile project. See [[Compiler.compile]] for development build
     */
    compileForProduction(stopOnError: boolean | undefined, client: 'npm' | 'yarn'): Promise<boolean>;
}
