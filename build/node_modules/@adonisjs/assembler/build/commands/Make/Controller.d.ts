import { BaseGenerator } from './Base';
/**
 * Command to make a new HTTP Controller
 */
export default class MakeController extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected suffix: string;
    protected form: "plural";
    protected pattern: "pascalcase";
    protected resourceName: string;
    protected createExact: boolean;
    /**
     * Do not pluralize following controller names
     */
    protected formIgnoreList: string[];
    /**
     * Command meta data
     */
    static commandName: string;
    static description: string;
    name: string;
    resource: boolean;
    exact: boolean;
    /**
     * Returns the template stub based upon the `--resource`
     * flag value
     */
    protected getStub(): string;
    /**
     * Pull path from the `httpControllers` directory declaration from
     * the `.adonisrc.json` file or fallback to `app/Controllers/Http`
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
