/**
 * Base file exposes the API to add action and `cd` in/out from
 * the application base directory.
 */
export declare abstract class File {
    private basePath;
    protected abstract actions: {
        action: string;
        body?: any;
    }[];
    /**
     * The user current working directory reference. This is maintained, since
     * we virtually cd into the `basePath`.
     */
    private currentDir;
    constructor(basePath: string);
    /**
     * Add a new action to the actions stack. The action workings
     * are independent on the user adding the action
     */
    protected addAction(action: string, body?: any): void;
    /**
     * Returns an array of actions to commit
     */
    protected getCommitActions(): {
        action: string;
        body?: any;
    }[];
    /**
     * Returns an array of actions for performing revert. Since
     * reverts are done in reverse, this method will reverse
     * the actions array.
     */
    protected getRevertActions(): {
        action: string;
        body?: any;
    }[];
    /**
     * `cd` to the application base path
     */
    protected cdIn(): void;
    /**
     * `cd` out from the application base path
     */
    protected cdOut(): void;
}
