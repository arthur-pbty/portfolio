"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateUserValidator"));
class AuthController {
    async login({ view }) {
        return view.render('auth/login');
    }
    async doLogin({ request, auth, response, session }) {
        const email = request.input('email');
        const password = request.input('password');
        try {
            await auth.use('web').attempt(email, password);
            response.redirect().toRoute('home');
        }
        catch {
            session.flash({ error: 'Identifiants incorrects' });
            response.redirect().toRoute('login');
        }
    }
    async signup({ view }) {
        return view.render('auth/signup');
    }
    async doSignup({ request, response, auth }) {
        const playload = await request.validate(CreateUserValidator_1.default);
        await User_1.default.create(playload);
        try {
            await auth.use('web').attempt(playload.email, playload.password);
            response.redirect().toRoute('home');
        }
        catch {
            response.redirect().toRoute('login');
        }
    }
    async logout({ auth, response }) {
        await auth.logout();
        return response.redirect().back();
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map