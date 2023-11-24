"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ModifEmailValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [Validator_1.rules.email(), Validator_1.rules.unique({ table: 'users', column: 'email' })])
        });
        this.messages = {
            required: 'The {{ field }} is required to modifie email',
            'email.email': 'You must enter an email in the email field',
            'email.unique': 'Email is already in use'
        };
    }
}
exports.default = ModifEmailValidator;
//# sourceMappingURL=ModifEmailValidator.js.map