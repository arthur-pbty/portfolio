import { BaseGenerator } from './Base';
import type { AppEnvironments } from '@ioc:Adonis/Core/Application';
/**
 * Command to make a new preloaded file
 */
export default class MakePreloadFile extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected resourceName: string;
    protected createExact: boolean;
    /**
     * Command name
     */
    static commandName: string;
    /**
     * Command description
     */
    static description: string;
    name: string;
    environment: AppEnvironments[];
    /**
     * Check if the mentioned environments are valid
     */
    private isValidEnviroment;
    /**
     * Returns the template stub path
     */
    protected getStub(): string;
    /**
     * Path to the start directory
     */
    protected getDestinationPath(): string;
    /**
     * Run command
     */
    run(): Promise<void>;
}
