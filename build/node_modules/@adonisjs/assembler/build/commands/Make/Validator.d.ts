import { BaseGenerator } from './Base';
/**
 * Command to make a new validator
 */
export default class MakeValidator extends BaseGenerator {
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
     * Pull path for the `validators` directory declaration from
     * the `.adonisrc.json` file or fallback to `app/Validators`
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
