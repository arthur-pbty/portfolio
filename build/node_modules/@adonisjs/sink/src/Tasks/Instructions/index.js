"use strict";
/*
 * @adonisjs/sink
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructions = void 0;
const path_1 = require("path");
const utils_1 = require("@poppinss/utils");
const helpers_1 = require("@poppinss/utils/build/helpers");
const sink = __importStar(require("../../../index"));
const TemplatesManager_1 = require("../TemplatesManager");
/**
 * Exposes the API to execute the instructions of a package, defined inside
 * the `package.json` file.
 */
class Instructions {
    constructor(packageName, projectRoot, application, verbose = false) {
        this.packageName = packageName;
        this.projectRoot = projectRoot;
        this.application = application;
        this.verbose = verbose;
        /**
         * Path to the package package.json file
         */
        this.packagePath = this.getPackagePath();
        this.markdownDisplay = undefined;
        this.logger = sink.logger;
    }
    /**
     * Formats object to string
     */
    formatObject(values) {
        return Object.keys(values)
            .map((key) => {
            return `"${key} = ${values[key]}"`;
        })
            .join(',');
    }
    /**
     * Formats array to string
     */
    formatArray(values) {
        return values.map((v) => `"${v}"`).join(',');
    }
    /**
     * Returns the suffix for the logger statements
     */
    getSuffix(value, key) {
        if (!this.verbose) {
            return '';
        }
        if (key) {
            return this.logger.colors.yellow().dim(`{ ${key} += ${value} }`);
        }
        return this.logger.colors.yellow().dim(`{ ${value} }`);
    }
    /**
     * Returns the absolute path to the package
     */
    getPackagePath() {
        try {
            return (0, helpers_1.resolveFrom)(this.projectRoot, `${this.packageName}/package.json`);
        }
        catch (error) {
            if (['MODULE_NOT_FOUND', 'ENOENT'].includes(error.code)) {
                throw new Error(`Cannot invoke instructions. Missing package "${this.packageName}"`);
            }
            throw error;
        }
    }
    /**
     * Load package json file from the package root directory
     */
    loadPackageJsonFile() {
        return require(this.packagePath);
    }
    /**
     * Copies templates to the user project
     */
    copyTemplates(instructions) {
        if (!instructions.templates) {
            return;
        }
        const templatesSourceDir = instructions.templates.basePath || './build/templates';
        const templatesManager = new TemplatesManager_1.TemplatesManager(this.projectRoot, (0, path_1.join)((0, path_1.dirname)(this.packagePath), templatesSourceDir), this.application);
        templatesManager.useLogger(this.logger).copy(instructions.templates);
    }
    /**
     * Set environment variables
     */
    setEnvVariables(instructions) {
        if (!instructions.env) {
            return;
        }
        const envFile = new sink.files.EnvFile(this.projectRoot);
        Object.keys(instructions.env).forEach((envKey) => envFile.set(envKey, instructions.env[envKey]));
        envFile.commit();
        const suffix = this.getSuffix(this.formatObject(instructions.env));
        this.logger.action('update').succeeded(`.env ${suffix}`);
    }
    /**
     * Adds the types to the tsconfig.json file
     */
    setTypes(instructions) {
        if (!instructions.types) {
            return;
        }
        const fileName = 'tsconfig.json';
        const tsConfig = new sink.files.JsonFile(this.projectRoot, fileName);
        const existingTypes = tsConfig.get('compilerOptions.types') || [];
        /**
         * Push type when doesn't exists already
         */
        if (!existingTypes.find((type) => type.includes(instructions.types))) {
            existingTypes.push(instructions.types);
            tsConfig.set('compilerOptions.types', existingTypes);
            tsConfig.commit();
            const suffix = this.getSuffix(this.formatArray([instructions.types]), 'types');
            this.logger.action('update').succeeded(`${fileName} ${suffix}`);
        }
    }
    /**
     * Adds the meta files to `.adonisrc.json` file
     */
    setMetaFiles(instructions) {
        if (!instructions.metaFiles) {
            return;
        }
        const adonisRcFile = new sink.files.AdonisRcFile(this.projectRoot);
        instructions.metaFiles.forEach((metaFile) => {
            if (typeof metaFile === 'string') {
                adonisRcFile.addMetaFile(metaFile);
            }
            else {
                adonisRcFile.addMetaFile(metaFile.pattern, metaFile.reloadServer);
            }
        });
        adonisRcFile.commit();
        const suffix = this.getSuffix(this.formatArray(instructions.metaFiles.map((metaFile) => {
            return typeof metaFile === 'string' ? metaFile : metaFile.pattern;
        })), 'metaFiles');
        this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
    }
    /**
     * Adds the preloads to `.adonisrc.json` file
     */
    setPreloads(instructions) {
        if (!instructions.preloads) {
            return;
        }
        const adonisRcFile = new sink.files.AdonisRcFile(this.projectRoot);
        instructions.preloads.forEach((preloadFile) => {
            if (typeof preloadFile === 'string') {
                adonisRcFile.setPreload(preloadFile);
            }
            else {
                adonisRcFile.setPreload(preloadFile.file, preloadFile.environment, preloadFile.optional);
            }
        });
        adonisRcFile.commit();
        const suffix = this.getSuffix(this.formatArray(instructions.preloads.map((preloadFile) => {
            return typeof preloadFile === 'string' ? preloadFile : preloadFile.file;
        })), 'preloads');
        this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
    }
    /**
     * Set commands inside the adonisrc.json file
     */
    setCommands(instructions) {
        if (!instructions.commands) {
            return;
        }
        const adonisRcFile = new sink.files.AdonisRcFile(this.projectRoot);
        instructions.commands.forEach((command) => adonisRcFile.addCommand(command));
        adonisRcFile.commit();
        const suffix = this.getSuffix(this.formatArray(instructions.commands), 'commands');
        this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
    }
    /**
     * Set aliases inside the adonisrc.json file
     */
    setAliases(instructions) {
        if (!instructions.aliases) {
            return;
        }
        const adonisRcFile = new sink.files.AdonisRcFile(this.projectRoot);
        const tsConfig = new sink.files.JsonFile(this.projectRoot, 'tsconfig.json');
        const existingPaths = tsConfig.get('compilerOptions.paths') || {};
        Object.keys(instructions.aliases).forEach((alias) => {
            adonisRcFile.setAlias(alias, instructions.aliases[alias]);
            existingPaths[`${alias}/*`] = [`${instructions.aliases[alias]}/*`];
        });
        const suffix = this.getSuffix(this.formatObject(instructions.aliases), 'aliases');
        adonisRcFile.commit();
        this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
        tsConfig.set('compilerOptions.paths', existingPaths);
        tsConfig.commit();
        this.logger.action('update').succeeded(`tsconfig.json ${suffix}`);
    }
    /**
     * Sets providers or ace providers inside the `.adonisrc.json` file
     */
    setProviders(instructions) {
        /**
         * Return early when not providers are mentioned
         */
        if (!instructions.providers && !instructions.aceProviders && !instructions.testProviders) {
            return;
        }
        const adonisRcFile = new sink.files.AdonisRcFile(this.projectRoot);
        if (instructions.providers) {
            instructions.providers.forEach((provider) => adonisRcFile.addProvider(provider));
        }
        if (instructions.aceProviders) {
            instructions.aceProviders.forEach((provider) => adonisRcFile.addAceProvider(provider));
        }
        if (instructions.testProviders) {
            instructions.testProviders.forEach((provider) => adonisRcFile.addTestProvider(provider));
        }
        adonisRcFile.commit();
        if (instructions.providers) {
            const suffix = this.getSuffix(this.formatArray(instructions.providers), 'providers');
            this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
        }
        if (instructions.aceProviders) {
            const suffix = this.getSuffix(this.formatArray(instructions.aceProviders), 'aceProviders');
            this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
        }
        if (instructions.testProviders) {
            const suffix = this.getSuffix(this.formatArray(instructions.testProviders), 'testProviders');
            this.logger.action('update').succeeded(`.adonisrc.json ${suffix}`);
        }
    }
    /**
     * Executes the instructions fn exposed by the package inside package.json file.
     */
    async runInstructions(instructions) {
        if (!instructions.instructions) {
            return;
        }
        /**
         * Path to the instructions file is resolved from the package root.
         */
        const instructionsPath = (0, helpers_1.resolveFrom)((0, path_1.dirname)(this.packagePath), instructions.instructions);
        /**
         * Requiring and executing instructions file
         */
        const instructionsFn = (0, utils_1.esmRequire)(instructionsPath);
        await instructionsFn(this.projectRoot, this.application, {
            ...sink,
            logger: this.logger,
        });
    }
    /**
     * Renders the markdown file if defined inside the package.json file.
     */
    async renderMarkdownFile(instructions) {
        if (!instructions.instructionsMd || !this.verbose) {
            return;
        }
        if (!this.markdownDisplay) {
            this.logger.info('The package wants to display readable instructions for the setup');
            this.markdownDisplay = await sink.getPrompt().choice('Select where to display instructions', [
                {
                    name: 'browser',
                    message: 'In the browser',
                },
                {
                    name: 'terminal',
                    message: 'In the terminal',
                },
            ]);
        }
        /**
         * Render markdown file when `instructionsMd` property is defined in
         * package.json file
         */
        const renderer = new sink.tasks.MarkdownRenderer((0, path_1.join)((0, path_1.dirname)(this.packagePath), instructions.instructionsMd), this.packageName);
        if (this.markdownDisplay === 'browser') {
            renderer.renderInBrowser();
        }
        else {
            console.log('');
            renderer.renderInTerminal();
        }
    }
    /**
     * Preset markdown display for avoiding prompt
     */
    setDisplay(display) {
        this.markdownDisplay = display;
        return this;
    }
    /**
     * Define a custom logger to use
     */
    useLogger(logger) {
        this.logger = logger;
        return this;
    }
    /**
     * Execute the instructions file
     */
    async execute() {
        const pkg = this.loadPackageJsonFile();
        if (!pkg.adonisjs) {
            return true;
        }
        await this.runInstructions(pkg.adonisjs);
        this.copyTemplates(pkg.adonisjs);
        this.setEnvVariables(pkg.adonisjs);
        this.setTypes(pkg.adonisjs);
        this.setCommands(pkg.adonisjs);
        this.setAliases(pkg.adonisjs);
        this.setProviders(pkg.adonisjs);
        this.setMetaFiles(pkg.adonisjs);
        this.setPreloads(pkg.adonisjs);
        await this.renderMarkdownFile(pkg.adonisjs);
        return true;
    }
}
exports.Instructions = Instructions;
