import { BaseCommand } from '@adonisjs/core/build/standalone';
/**
 * Base class to generate framework entities
 */
export declare abstract class BaseGenerator extends BaseCommand {
    protected abstract resourceName: string;
    protected abstract createExact: boolean;
    protected abstract getStub(): string;
    protected abstract getDestinationPath(): string;
    protected suffix?: string;
    protected extname: string;
    protected form?: 'singular' | 'plural';
    protected pattern?: 'camelcase' | 'snakecase' | 'pascalcase';
    protected formIgnoreList?: string[];
    protected templateData(): any;
    /**
     * Returns path for a given namespace by replacing the base namespace
     * with the defined directories map inside the `.adonisrc.json`
     * file
     */
    protected getPathForNamespace(namespaceFor: string): string | null;
    /**
     * Returns contents of the rcFile
     */
    protected hasRcFile(cwd: string): Promise<boolean>;
    /**
     * Handle command
     */
    generate(): Promise<import("@adonisjs/ace/build/src/Contracts").GeneratorFileContract | undefined>;
}
