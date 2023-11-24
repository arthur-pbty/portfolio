import { BaseGenerator } from './Base';
/**
 * Command to make a new test
 */
export default class MakeTest extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected extname: string;
    protected form: "singular";
    protected pattern: "snakecase";
    protected resourceName: string;
    protected createExact: boolean;
    /**
     * Command meta data
     */
    static commandName: string;
    static description: string;
    suite: string;
    name: string;
    exact: boolean;
    /**
     * Returns the template stub path
     */
    protected getStub(): string;
    /**
     * The file is created inside the parent directory of the first
     * glob pattern
     */
    protected getDestinationPath(): string;
    protected templateData(): {
        name: string;
    };
    run(): Promise<void>;
}
