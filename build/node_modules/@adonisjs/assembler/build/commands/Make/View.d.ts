import { BaseGenerator } from './Base';
/**
 * Command to make a new view
 */
export default class MakeView extends BaseGenerator {
    /**
     * Required by BaseGenerator
     */
    protected suffix: string;
    protected extname: string;
    protected pattern: "snakecase";
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
     * Path to the providers directory
     */
    protected getDestinationPath(): string;
    run(): Promise<void>;
}
