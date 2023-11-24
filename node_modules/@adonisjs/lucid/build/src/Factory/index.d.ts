import { LucidModel, LucidRow } from '@ioc:Adonis/Lucid/Orm';
import { FactoryManagerContract, DefineCallback, StubIdCallback } from '@ioc:Adonis/Lucid/Factory';
import { FactoryModel } from './FactoryModel';
/**
 * Factory manager exposes the API to register factories.
 */
export declare class FactoryManager implements FactoryManagerContract {
    private stubCounter;
    private stubIdCallback;
    /**
     * Returns the next id
     */
    getNextId(model: LucidRow): any;
    /**
     * Define a factory model
     */
    define<Model extends LucidModel>(model: Model, callback: DefineCallback<Model>): FactoryModel<Model>;
    /**
     * Define custom callback to generate stub ids
     */
    stubId(callback: StubIdCallback): void;
}
