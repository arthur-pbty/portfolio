import { BaseGenerator } from './Base';
/**
 * Command to make a new event listener class
 */
export default class MakeListener extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
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
     * Returns the template stub
     */
    protected getStub(): string;
    /**
     * Pull path from the `listeners` directory declaration from
     * the `.adonisrc.json` file or fallback to `app/Listeners`
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
