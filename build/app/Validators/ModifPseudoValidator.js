"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ModifPseudoValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            pseudo: Validator_1.schema.string({}, [Validator_1.rules.minLength(3)])
        });
        this.messages = {
            required: 'The {{ field }} is required to modifie pseudo',
            'pseudo.minLength': 'The pseudo must be at least 3 characters long'
        };
    }
}
exports.default = ModifPseudoValidator;
//# sourceMappingURL=ModifPseudoValidator.js.map