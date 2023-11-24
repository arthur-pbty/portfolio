import tsStatic from 'typescript';
import { logger as uiLogger } from '@poppinss/cliui';
import { TypescriptCompiler } from '@poppinss/chokidar-ts';
/**
 * Exposes the API to work with the Typescript compiler API
 */
export declare class Ts {
    private appRoot;
    private logger;
    private tsconfig;
    /**
     * Reference to the typescript compiler
     */
    tsCompiler: TypescriptCompiler;
    constructor(appRoot: string, logger: typeof uiLogger, tsconfig?: string);
    /**
     * Render ts diagnostics
     */
    renderDiagnostics(diagnostics: tsStatic.Diagnostic[], host: tsStatic.CompilerHost): void;
    /**
     * Parses the tsconfig file
     */
    parseConfig(): undefined | tsStatic.ParsedCommandLine;
}
