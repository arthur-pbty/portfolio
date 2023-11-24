import { AppEnvironments } from '@ioc:Adonis/Core/Application';
import { JsonFile } from '../Formats/Json';
/**
 * Exposes API to mutate the contents of `.adonisrc.json` file.
 */
export declare class AdonisRcFile extends JsonFile {
    /**
     * Storing a local copy of preloads for concatenating
     * new entries.
     */
    private preloads;
    /**
     * Storing a local copy of metaFiles for concatenating
     * new entries.
     */
    private metaFiles;
    /**
     * Storing a local copy of commands for concatenating
     * new entries.
     */
    private commands;
    /**
     * Storing a local copy of providers for concatenating
     * new entries.
     */
    private providers;
    /**
     * Storing a local copy of aceProviders for concatenating
     * new entries.
     */
    private aceProviders;
    /**
     * Storing a local copy of testProviders for concatenating
     * new entries.
     */
    private testProviders;
    constructor(basePath: string);
    /**
     * Handle `preloads` in a custom way on rollback, since the `mrm-core` uses
     * `lodash.unset` which replaces the array index value with `null` and
     * we instead want to remove the index value completely.
     */
    onset(lifecycle: string, body: any): true | undefined;
    /**
     * Set the exception handler namespace.
     */
    setExceptionHandler(namespace: string): this;
    /**
     * Set the preload file to the `.adonisrc.json` file.
     */
    setPreload(filePath: string, environment?: AppEnvironments[], optional?: boolean): this;
    /**
     * Set IoC container aliases
     */
    setAlias(namespace: string, autoloadPath: string): this;
    /**
     * Set custom directory
     */
    setDirectory(key: string, value: string): this;
    /**
     * Add custom file to `metaFiles` array.
     */
    addMetaFile(filePath: string, reloadServer?: boolean): void;
    /**
     * Add new commands to the commands array
     */
    addCommand(commandPath: string): void;
    /**
     * Add new providers to the providers array
     */
    addProvider(provider: string): void;
    /**
     * Add new providers to the ace providers array
     */
    addAceProvider(provider: string): void;
    /**
     * Add new providers to the test providers array
     */
    addTestProvider(provider: string): void;
}
