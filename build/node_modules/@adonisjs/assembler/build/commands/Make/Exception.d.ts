import { BaseGenerator } from './Base';
/**
 * Command to make a new event exceptions class
 */
export default class MakeException extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected form: "singular";
    protected pattern: "pascalcase";
    protected resourceName: string;
    protected suffix: string;
    protected createExact: boolean;
    /**
     * Command meta data
     */
    static commandName: string;
    static description: string;
    name: string;
    selfHandle: boolean;
    exact: boolean;
    /**
     * Returns the template stub
     */
    protected getStub(): string;
    /**
     * Pull path from the `exceptions` namespace declaration from
     * the `.adonisrc.json` file or fallback to `app/Exceptions`
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
