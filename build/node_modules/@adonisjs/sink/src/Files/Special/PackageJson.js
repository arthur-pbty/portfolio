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
exports.PackageJsonFile = void 0;
const mrm_core_1 = require("mrm-core");
const child_process_1 = require("child_process");
const File_1 = require("../Base/File");
/**
 * Exposes the API to work with `package.json` file. The file is
 * same as a standard JSON file, but with some special methods
 * related to package file itself.
 */
class PackageJsonFile extends File_1.File {
    constructor(basePath, installerOutput = 'pipe') {
        super(basePath);
        this.installerOutput = installerOutput;
        /**
         * Collection of actions to be executed on package file
         */
        this.actions = [];
        /**
         * A copy of install instructions
         */
        this.packages = {
            install: [],
            uninstall: [],
        };
        this.cdIn();
        this.filePointer = (0, mrm_core_1.packageJson)();
        this.cdOut();
    }
    /**
     * Run hooks for action or uninstall action
     */
    runHooks(action, list, dev) {
        if (action === 'install' && typeof this.beforeInstallHooks === 'function') {
            this.beforeInstallHooks(list, dev);
        }
        else if (action === 'uninstall' && typeof this.beforeUninstallHooks === 'function') {
            this.beforeUninstallHooks(list, dev);
        }
    }
    /**
     * Sets installation client
     */
    setClient(options) {
        if (this.packageManager === 'yarn') {
            options.yarn = true;
        }
        else if (this.packageManager === 'pnpm') {
            options.pnpm = true;
        }
    }
    /**
     * Executes the installer `install` or `uninstall` action. Use
     * `this.installerFnAsync` for async version
     */
    installerFn(action, list, options) {
        if (!list.length) {
            return;
        }
        this.setClient(options);
        this.runHooks(action, list, options.dev);
        const fn = action === 'install' ? mrm_core_1.install : mrm_core_1.uninstall;
        return fn(list, options, (command, args) => {
            return (0, child_process_1.spawnSync)(command, args, { stdio: this.installerOutput });
        });
    }
    /**
     * Executes the installer `install` or `uninstall` action. Use
     * `this.installerFn` for sync version
     */
    installerFnAsync(action, list, options) {
        return new Promise((resolve) => {
            if (!list.length) {
                resolve(undefined);
                return;
            }
            this.setClient(options);
            this.runHooks(action, list, options.dev);
            let response;
            const fn = action === 'install' ? mrm_core_1.install : mrm_core_1.uninstall;
            let callbackInvoked = false;
            fn(list, options, (command, args) => {
                callbackInvoked = true;
                const runner = (0, child_process_1.spawn)(command, args, { stdio: 'pipe' });
                response = {
                    pid: runner.pid,
                    output: [],
                    stdout: Buffer.from(''),
                    stderr: Buffer.from(''),
                    status: null,
                    signal: null,
                };
                runner.stdout.on('data', (chunk) => {
                    response.stdout = Buffer.concat([response.stdout, chunk]);
                });
                runner.stderr.on('data', (chunk) => {
                    response.stderr = Buffer.concat([response.stderr, chunk]);
                });
                runner.on('close', (code, signal) => {
                    response.status = code;
                    response.signal = signal;
                    resolve(response);
                });
            });
            if (!callbackInvoked) {
                resolve(undefined);
            }
        });
    }
    /**
     * Install and uninstall packages defined via `this.install`
     * and `this.uninstall`
     */
    commitDependencies(installs, uninstalls) {
        let response;
        for (let { list, versions, dev } of installs) {
            response = this.installerFn('install', list, { versions, dev });
            if (response && response.status === 1) {
                return response;
            }
        }
        for (let { list, dev } of uninstalls) {
            response = this.installerFn('uninstall', list, { dev });
            if (response && response.status === 1) {
                return response;
            }
        }
    }
    /**
     * Performing uninstalling as a rollback step. Which means, this method
     * will remove packages marked for installation.
     */
    rollbackDependencies(installs) {
        let response;
        for (let { list, dev } of installs) {
            response = this.installerFn('uninstall', list, { dev });
            if (response && response.status === 1) {
                return response;
            }
        }
    }
    /**
     * Same as `commitInstalls` but async
     */
    async commitDependenciesAsync(installs, uninstalls) {
        let response;
        for (let { list, versions, dev } of installs) {
            response = await this.installerFnAsync('install', list, { versions, dev });
            if (response && response.status === 1) {
                return response;
            }
        }
        for (let { list, dev } of uninstalls) {
            response = await this.installerFnAsync('uninstall', list, { dev });
            if (response && response.status === 1) {
                return response;
            }
        }
    }
    /**
     * Same as `rollbackInstalls` but async.
     */
    async rollbackDependenciesAsync(installs) {
        let response;
        for (let { list, dev } of installs) {
            response = await this.installerFnAsync('uninstall', list, { dev });
            if (response && response.status === 1) {
                return response;
            }
        }
    }
    /**
     * Commits actions defined on the given file
     */
    commitActions() {
        const actions = this.getCommitActions();
        const deleteFile = actions.find(({ action }) => action === 'delete');
        /**
         * In case of `delete` action. There is no point running
         * other actions and we can simply delete the file
         */
        if (deleteFile) {
            this.filePointer.delete();
            this.cdOut();
            return false;
        }
        /**
         * Executing all actions
         */
        actions.forEach(({ action, body }) => {
            if (['set', 'unset'].indexOf(action) > -1) {
                this.filePointer[action](body.key, body.value);
                return;
            }
            if (['prependScript', 'appendScript', 'setScript', 'removeScript'].indexOf(action) > -1) {
                this.filePointer[action](body.name, body.script);
                return;
            }
        });
        /**
         * Save the file to the disk before starting install process.
         */
        this.filePointer.save();
        return true;
    }
    /**
     * Rollsback actions defined on the package file
     */
    rollbackActions() {
        const actions = this.getCommitActions();
        /**
         * Executing actions in reverse.
         */
        actions.forEach(({ action, body }) => {
            if (action === 'set') {
                this.filePointer.unset(body.key);
                return;
            }
            if (action === 'setScript') {
                this.filePointer.removeScript(body.name);
                return;
            }
            if (['prependScript', 'appendScript'].indexOf(action) > -1) {
                this.filePointer.removeScript(body.name, new RegExp(body.script));
                return;
            }
        });
        /**
         * Write file to the disk
         */
        this.filePointer.save();
        return true;
    }
    /**
     * Set key/value pair in the package.json file
     */
    set(key, value) {
        this.addAction('set', { key, value });
        return this;
    }
    /**
     * Set a specific client to be used
     */
    useClient(client) {
        this.packageManager = client;
        return this;
    }
    /**
     * Enable/disable use of yarn
     * @deprecated The "yarn" method is deprecated. Please use "useClient('yarn')" instead.
     */
    yarn(_useYarn) {
        this.packageManager = 'yarn';
        return this;
    }
    /**
     * Unset key/value pair from the package.json file
     */
    unset(key) {
        this.addAction('unset', { key });
        return this;
    }
    /**
     * Set package.json script
     */
    setScript(name, script) {
        this.addAction('setScript', { name, script });
        return this;
    }
    /**
     * Append to existing package.json script
     */
    appendScript(name, script) {
        this.addAction('appendScript', { name, script });
        return this;
    }
    /**
     * Prepend to existing package.json script
     */
    prependScript(name, script) {
        this.addAction('prependScript', { name, script });
        return this;
    }
    /**
     * Remove existing script or remove a given action from an
     * existing script
     */
    removeScript(name, script) {
        this.addAction('removeScript', { name, script });
        return this;
    }
    /**
     * Install dependencies
     */
    install(dependency, version = 'latest', dev = true) {
        this.packages.install.push({ dependency, version, dev });
        return this;
    }
    /**
     * Uninstall dependencies
     */
    uninstall(dependency, dev = true) {
        this.packages.uninstall.push({ dependency, dev });
        return this;
    }
    /**
     * Remove file
     */
    delete() {
        this.addAction('delete');
        return this;
    }
    get(address, defaultValue) {
        return address ? this.filePointer.get(address, defaultValue) : this.filePointer.get();
    }
    /**
     * A boolean telling if the file already exists
     */
    exists() {
        return this.filePointer.exists();
    }
    /**
     * Returns a list of dependencies along with specific versions (if any)
     */
    getInstalls(dev = true) {
        const dependencies = { versions: {}, list: [], dev };
        return this.packages.install.reduce((result, dependency) => {
            if (dependency.dev && dev) {
                result.list.push(dependency.dependency);
                if (dependency.version !== 'latest') {
                    result.versions[dependency.dependency] = dependency.version;
                }
            }
            else if (!dependency.dev && !dev) {
                result.list.push(dependency.dependency);
                if (dependency.version !== 'latest') {
                    result.versions[dependency.dependency] = dependency.version;
                }
            }
            return result;
        }, dependencies);
    }
    /**
     * Returns uninstalls list for prod or development
     * dependencies.
     */
    getUninstalls(dev) {
        const dependencies = { list: [], dev };
        return this.packages.uninstall.reduce((result, dependency) => {
            if (dependency.dev && dev) {
                result.list.push(dependency.dependency);
            }
            else if (!dependency.dev && !dev) {
                result.list.push(dependency.dependency);
            }
            return result;
        }, dependencies);
    }
    /**
     * Define a function to be called before installing dependencies
     */
    beforeInstall(callback) {
        this.beforeInstallHooks = callback;
        return this;
    }
    /**
     * Define a function to be called before uninstalling dependencies
     */
    beforeUninstall(callback) {
        this.beforeUninstallHooks = callback;
        return this;
    }
    /**
     * Commit mutations
     */
    commit() {
        this.cdIn();
        const success = this.commitActions();
        if (!success) {
            return;
        }
        /**
         * Install/uninstall dependencies
         */
        const response = this.commitDependencies([this.getInstalls(true), this.getInstalls(false)], [this.getUninstalls(true), this.getUninstalls(false)]);
        this.cdOut();
        return response;
    }
    /**
     * Commits async. The files are still written using synchronous
     * API. However, the install and uninstall becomes async.
     */
    async commitAsync() {
        this.cdIn();
        const success = this.commitActions();
        if (!success) {
            return;
        }
        /**
         * Install/uninstall dependencies
         */
        const response = await this.commitDependenciesAsync([this.getInstalls(true), this.getInstalls(false)], [this.getUninstalls(true), this.getUninstalls(false)]);
        this.cdOut();
        return response;
    }
    /**
     * Rollback mutations
     */
    rollback() {
        this.cdIn();
        const success = this.rollbackActions();
        if (!success) {
            return;
        }
        /**
         * Uninstalling installed packages
         */
        const response = this.rollbackDependencies([this.getInstalls(true), this.getInstalls(false)]);
        this.cdOut();
        return response;
    }
    /**
     * Rollsback async. The files are still written using synchronous
     * API. However, the uninstall becomes async.
     */
    async rollbackAsync() {
        this.cdIn();
        const success = this.rollbackActions();
        if (!success) {
            return;
        }
        /**
         * Uninstalling installed packages
         */
        const response = await this.rollbackDependenciesAsync([
            this.getInstalls(true),
            this.getInstalls(false),
        ]);
        this.cdOut();
        return response;
    }
}
exports.PackageJsonFile = PackageJsonFile;
