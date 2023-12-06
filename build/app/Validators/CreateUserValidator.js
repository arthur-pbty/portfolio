"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            pseudo: Validator_1.schema.string(),
            email: Validator_1.schema.string({}, [Validator_1.rules.email(), Validator_1.rules.unique({ table: 'users', column: 'email' })]),
            password: Validator_1.schema.string({}, [Validator_1.rules.minLength(4), Validator_1.rules.confirmed()])
        });
        this.messages = {
            required: 'The {{ field }} is required to create a new account',
            'email.email': 'Vous devez saisir un email dans le champ email',
            'email.unique': 'Email is already in use',
            'password.minLength': 'The password must be at least 4 characters long'
        };
    }
}
exports.default = CreateUserValidator;
//# sourceMappingURL=CreateUserValidator.js.map