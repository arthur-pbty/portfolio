/// <reference path="../../../adonis-typings/index.d.ts" />
import { ModelPaginatorContract, CherryPick } from '@ioc:Adonis/Lucid/Orm';
import { SimplePaginator } from '../../Database/Paginator/SimplePaginator';
/**
 * Model paginator extends the simple paginator and adds support for
 * serializing models as well
 */
export declare class ModelPaginator extends SimplePaginator implements ModelPaginatorContract<any> {
    /**
     * Serialize models
     */
    serialize(cherryPick?: CherryPick): {
        meta: any;
        data: any[];
    };
}
