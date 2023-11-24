import { BaseGenerator } from './Base';
/**
 * Command to make a new command
 */
export default class MakeCommand extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
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
     * Returns the template stub based upon the `--resource`
     * flag value
     */
    protected getStub(): string;
    /**
     * Path to the commands directory
     */
    protected getDestinationPath(): string;
    /**
     * Passed down to the template.
     */
    protected templateData(): {
        toCommandName: () => (filename: string, render: any) => string;
    };
    run(): Promise<void>;
}
