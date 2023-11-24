import { BaseGenerator } from './Base';
/**
 * Command to make a new provider
 */
export default class MakeProvider extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected suffix: string;
    protected form: "singular";
    protected pattern: "pascalcase";
    protected resourceName: string;
    protected createExact: boolean;
    /**
     * Command meta data
     */
    static commandName: string;
    static description: string;
    name: string;
    ace: boolean;
    exact: boolean;
    /**
     * Returns the template stub path
     */
    protected getStub(): string;
    /**
     * Path to the providers directory
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
