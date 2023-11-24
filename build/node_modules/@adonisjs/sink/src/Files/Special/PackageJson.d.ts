/// <reference types="node" />
/// <reference types="node" />
import { packageJson } from 'mrm-core';
import { SpawnSyncReturns, StdioOptions } from 'child_process';
import { File } from '../Base/File';
type InstallerNotifier = (list: string[], dev: boolean) => void;
type Dependencies = {
    list: string[];
    versions?: any;
    dev: boolean;
};
type SupportedPackageManager = 'yarn' | 'pnpm' | 'npm';
/**
 * Exposes the API to work with `package.json` file. The file is
 * same as a standard JSON file, but with some special methods
 * related to package file itself.
 */
export declare class PackageJsonFile extends File {
    private installerOutput;
    filePointer: ReturnType<typeof packageJson>;
    /**
     * Collection of actions to be executed on package file
     */
    protected actions: never[];
    /**
     * A copy of install instructions
     */
    protected packages: {
        install: {
            dependency: string;
            version: string;
            dev: boolean;
        }[];
        uninstall: {
            dependency: string;
            dev: boolean;
        }[];
    };
    /**
     * Explicitly force to use another client instead of npm
     */
    private packageManager;
    /**
     * Method invoked before installing dependencies
     */
    private beforeInstallHooks?;
    /**
     * Method invoked before uninstalling dependencies
     */
    private beforeUninstallHooks?;
    constructor(basePath: string, installerOutput?: StdioOptions);
    /**
     * Run hooks for action or uninstall action
     */
    private runHooks;
    /**
     * Sets installation client
     */
    private setClient;
    /**
     * Executes the installer `install` or `uninstall` action. Use
     * `this.installerFnAsync` for async version
     */
    private installerFn;
    /**
     * Executes the installer `install` or `uninstall` action. Use
     * `this.installerFn` for sync version
     */
    private installerFnAsync;
    /**
     * Install and uninstall packages defined via `this.install`
     * and `this.uninstall`
     */
    private commitDependencies;
    /**
     * Performing uninstalling as a rollback step. Which means, this method
     * will remove packages marked for installation.
     */
    private rollbackDependencies;
    /**
     * Same as `commitInstalls` but async
     */
    private commitDependenciesAsync;
    /**
     * Same as `rollbackInstalls` but async.
     */
    private rollbackDependenciesAsync;
    /**
     * Commits actions defined on the given file
     */
    private commitActions;
    /**
     * Rollsback actions defined on the package file
     */
    private rollbackActions;
    /**
     * Set key/value pair in the package.json file
     */
    set(key: string, value: any): this;
    /**
     * Set a specific client to be used
     */
    useClient(client: SupportedPackageManager): this;
    /**
     * Enable/disable use of yarn
     * @deprecated The "yarn" method is deprecated. Please use "useClient('yarn')" instead.
     */
    yarn(_useYarn: boolean): this;
    /**
     * Unset key/value pair from the package.json file
     */
    unset(key: string): this;
    /**
     * Set package.json script
     */
    setScript(name: string, script: string): this;
    /**
     * Append to existing package.json script
     */
    appendScript(name: string, script: string): this;
    /**
     * Prepend to existing package.json script
     */
    prependScript(name: string, script: string): this;
    /**
     * Remove existing script or remove a given action from an
     * existing script
     */
    removeScript(name: string, script?: string | RegExp): this;
    /**
     * Install dependencies
     */
    install(dependency: string, version?: string, dev?: boolean): this;
    /**
     * Uninstall dependencies
     */
    uninstall(dependency: string, dev?: boolean): this;
    /**
     * Remove file
     */
    delete(): this;
    /**
     * Returns value for a given key from the file
     */
    get(): any;
    get(address: string | string[], defaultValue?: any): any;
    /**
     * A boolean telling if the file already exists
     */
    exists(): boolean;
    /**
     * Returns a list of dependencies along with specific versions (if any)
     */
    getInstalls(dev?: boolean): Dependencies;
    /**
     * Returns uninstalls list for prod or development
     * dependencies.
     */
    getUninstalls(dev: boolean): Dependencies;
    /**
     * Define a function to be called before installing dependencies
     */
    beforeInstall(callback: InstallerNotifier): this;
    /**
     * Define a function to be called before uninstalling dependencies
     */
    beforeUninstall(callback: InstallerNotifier): this;
    /**
     * Commit mutations
     */
    commit(): SpawnSyncReturns<Buffer> | undefined;
    /**
     * Commits async. The files are still written using synchronous
     * API. However, the install and uninstall becomes async.
     */
    commitAsync(): Promise<SpawnSyncReturns<Buffer> | undefined>;
    /**
     * Rollback mutations
     */
    rollback(): SpawnSyncReturns<Buffer> | undefined;
    /**
     * Rollsback async. The files are still written using synchronous
     * API. However, the uninstall becomes async.
     */
    rollbackAsync(): Promise<SpawnSyncReturns<Buffer> | undefined>;
}
export {};
