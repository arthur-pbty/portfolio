import { QueryClientContract, TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
/**
 * Used for reporting queries using the profiler and the event
 * emitter
 */
export declare class QueryReporter {
    private client;
    private debug;
    private data;
    private eventName;
    private startTime;
    private profilerAction;
    private isReady;
    constructor(client: QueryClientContract | TransactionClientContract, debug: boolean, data: any);
    /**
     * Initiate the hrtime when there are one or more query listeners
     */
    private initStartTime;
    /**
     * Init the profiler action when client has profiler attached
     * to it
     */
    private initProfilerAction;
    /**
     * Commit the profiler action with optional error
     */
    private commitProfilerAction;
    /**
     * Emit the query with duration
     */
    private emitQueryEvent;
    /**
     * Begin query reporting. Data passed to this method will
     * overwrite the existing data object
     */
    begin(data?: any): this;
    /**
     * End query reporting
     */
    end(error?: Error): void;
}
