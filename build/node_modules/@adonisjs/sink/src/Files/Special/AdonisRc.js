"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdonisRcFile = void 0;
const Json_1 = require("../Formats/Json");
/**
 * Exposes API to mutate the contents of `.adonisrc.json` file.
 */
class AdonisRcFile extends Json_1.JsonFile {
    constructor(basePath) {
        super(basePath, '.adonisrc.json');
        /**
         * Storing a local copy of preloads for concatenating
         * new entries.
         */
        this.preloads = [];
        /**
         * Storing a local copy of metaFiles for concatenating
         * new entries.
         */
        this.metaFiles = [];
        /**
         * Storing a local copy of commands for concatenating
         * new entries.
         */
        this.commands = [];
        /**
         * Storing a local copy of providers for concatenating
         * new entries.
         */
        this.providers = [];
        /**
         * Storing a local copy of aceProviders for concatenating
         * new entries.
         */
        this.aceProviders = [];
        /**
         * Storing a local copy of testProviders for concatenating
         * new entries.
         */
        this.testProviders = [];
        this.preloads = this.get('preloads', []);
        this.metaFiles = this.get('metaFiles', []);
        this.commands = this.get('commands', []);
        this.providers = this.get('providers', []);
        this.aceProviders = this.get('aceProviders', []);
        this.testProviders = this.get('testProviders', []);
    }
    /**
     * Handle `preloads` in a custom way on rollback, since the `mrm-core` uses
     * `lodash.unset` which replaces the array index value with `null` and
     * we instead want to remove the index value completely.
     */
    onset(lifecycle, body) {
        if (lifecycle === 'rollback') {
            let key = null;
            if (body.key.startsWith('preloads')) {
                key = 'preloads';
            }
            if (body.key.startsWith('metaFiles')) {
                key = 'metaFiles';
            }
            if (body.key.startsWith('commands')) {
                key = 'commands';
            }
            if (body.key.startsWith('providers')) {
                key = 'providers';
            }
            if (body.key.startsWith('aceProviders')) {
                key = 'aceProviders';
            }
            if (body.key.startsWith('testProviders')) {
                key = 'testProviders';
            }
            if (!key) {
                return;
            }
            const index = body.key.split('[')[1].replace(/\]/g, '');
            this.get(key, []).splice(index, 1);
            return true;
        }
    }
    /**
     * Set the exception handler namespace.
     */
    setExceptionHandler(namespace) {
        this.set('exceptionHandlerNamespace', namespace);
        return this;
    }
    /**
     * Set the preload file to the `.adonisrc.json` file.
     */
    setPreload(filePath, environment, optional) {
        let preloadIndex = this.preloads.findIndex((preload) => {
            if (preload.file) {
                return preload.file === filePath;
            }
            return preload === filePath;
        });
        preloadIndex = preloadIndex === -1 ? this.preloads.length : preloadIndex;
        let preloadEntry = {
            file: filePath,
        };
        /**
         * Set the environment when it exists
         */
        if (environment && environment.length) {
            preloadEntry.environment = environment;
        }
        /**
         * Set the optional property when it exists
         */
        if (optional !== undefined) {
            preloadEntry.optional = optional;
        }
        /**
         * Set preload entry as string, when it doesn't have explicit environment
         * and optional fields.
         */
        if (preloadEntry.optional === undefined && preloadEntry.environment === undefined) {
            preloadEntry = preloadEntry.file;
        }
        this.preloads[preloadIndex] = preloadEntry;
        this.set(`preloads[${preloadIndex}]`, preloadEntry);
        return this;
    }
    /**
     * Set IoC container aliases
     */
    setAlias(namespace, autoloadPath) {
        this.set(`aliases.${namespace}`, autoloadPath);
        return this;
    }
    /**
     * Set custom directory
     */
    setDirectory(key, value) {
        this.set(`directories.${key}`, value);
        return this;
    }
    /**
     * Add custom file to `metaFiles` array.
     */
    addMetaFile(filePath, reloadServer) {
        let entryIndex = this.metaFiles.findIndex((file) => {
            if (file.pattern) {
                return file.pattern === filePath;
            }
            return file === filePath;
        });
        entryIndex = entryIndex === -1 ? this.metaFiles.length : entryIndex;
        const entry = reloadServer === false
            ? {
                pattern: filePath,
                reloadServer: false,
            }
            : filePath;
        this.metaFiles[entryIndex] = entry;
        this.set(`metaFiles[${entryIndex}]`, entry);
    }
    /**
     * Add new commands to the commands array
     */
    addCommand(commandPath) {
        let entryIndex = this.commands.findIndex((command) => {
            return command === commandPath;
        });
        entryIndex = entryIndex === -1 ? this.commands.length : entryIndex;
        this.commands[entryIndex] = commandPath;
        this.set(`commands[${entryIndex}]`, commandPath);
    }
    /**
     * Add new providers to the providers array
     */
    addProvider(provider) {
        let entryIndex = this.providers.findIndex((command) => {
            return command === provider;
        });
        entryIndex = entryIndex === -1 ? this.providers.length : entryIndex;
        this.providers[entryIndex] = provider;
        this.set(`providers[${entryIndex}]`, provider);
    }
    /**
     * Add new providers to the ace providers array
     */
    addAceProvider(provider) {
        let entryIndex = this.aceProviders.findIndex((command) => {
            return command === provider;
        });
        entryIndex = entryIndex === -1 ? this.aceProviders.length : entryIndex;
        this.aceProviders[entryIndex] = provider;
        this.set(`aceProviders[${entryIndex}]`, provider);
    }
    /**
     * Add new providers to the test providers array
     */
    addTestProvider(provider) {
        let entryIndex = this.testProviders.findIndex((command) => {
            return command === provider;
        });
        entryIndex = entryIndex === -1 ? this.testProviders.length : entryIndex;
        this.testProviders[entryIndex] = provider;
        this.set(`testProviders[${entryIndex}]`, provider);
    }
}
exports.AdonisRcFile = AdonisRcFile;
