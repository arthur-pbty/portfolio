"use strict";
/*
 * @adonisjs/lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelPaginator = void 0;
const SimplePaginator_1 = require("../../Database/Paginator/SimplePaginator");
/**
 * Model paginator extends the simple paginator and adds support for
 * serializing models as well
 */
class ModelPaginator extends SimplePaginator_1.SimplePaginator {
    /**
     * Serialize models
     */
    serialize(cherryPick) {
        return {
            meta: this.getMeta(),
            data: this.all().map((row) => row.serialize(cherryPick)),
        };
    }
}
exports.ModelPaginator = ModelPaginator;
