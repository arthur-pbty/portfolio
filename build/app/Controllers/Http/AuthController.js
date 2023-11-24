"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateUserValidator"));
class AuthController {
    async index({ view }) {
        return view.render('auth');
    }
    async login({ request, auth, response, session }) {
        const email = request.input('loginemail');
        const password = request.input('loginpassword');
        try {
            await auth.use('web').attempt(email, password);
            response.redirect().toRoute('home');
        }
        catch {
            session.flash({ error: "Identifiant ou mot de passe incorrect" });
            response.redirect().back();
        }
    }
    async signup({ request, response }) {
        const playload = await request.validate(CreateUserValidator_1.default);
        await User_1.default.create(playload);
        return response.redirect().toRoute('home');
    }
    async logout({ auth, response }) {
        await auth.logout();
        return response.redirect().back();
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map