"use strict";
/*
 * @adonisjs/assembler
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
const path_1 = require("path");
const chokidar_ts_1 = require("@poppinss/chokidar-ts");
const helpers_1 = require("@poppinss/utils/build/helpers");
const paths_1 = require("../../config/paths");
/**
 * Exposes the API to work with the Typescript compiler API
 */
class Ts {
    constructor(appRoot, logger, tsconfig = paths_1.TSCONFIG_FILE_NAME) {
        this.appRoot = appRoot;
        this.logger = logger;
        this.tsconfig = tsconfig;
        /**
         * Reference to the typescript compiler
         */
        this.tsCompiler = new chokidar_ts_1.TypescriptCompiler(this.appRoot, this.tsconfig, require((0, helpers_1.resolveFrom)(this.appRoot, 'typescript/lib/typescript')));
    }
    /**
     * Render ts diagnostics
     */
    renderDiagnostics(diagnostics, host) {
        console.error(this.tsCompiler.ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
    }
    /**
     * Parses the tsconfig file
     */
    parseConfig() {
        const { error, config } = this.tsCompiler.configParser().parse();
        if (error) {
            this.logger.error(`unable to parse ${this.tsconfig}`);
            this.renderDiagnostics([error], this.tsCompiler.ts.createCompilerHost({}));
            return;
        }
        if (config && config.errors.length) {
            this.logger.error(`unable to parse ${this.tsconfig}`);
            this.renderDiagnostics(config.errors, this.tsCompiler.ts.createCompilerHost(config.options));
            return;
        }
        config.options.rootDir = config.options.rootDir || this.appRoot;
        config.options.outDir = config.options.outDir || (0, path_1.join)(this.appRoot, paths_1.DEFAULT_BUILD_DIR);
        return config;
    }
}
exports.Ts = Ts;
