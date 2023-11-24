import { BaseGenerator } from './Base';
/**
 * Command to make a new middleware
 */
export default class MakeMiddleware extends BaseGenerator {
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
    exact: boolean;
    /**
     * Returns the template stub path
     */
    protected getStub(): string;
    /**
     * Middleware are always created inside `app/Middleware` directory.
     * We can look into configuring it later.
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
