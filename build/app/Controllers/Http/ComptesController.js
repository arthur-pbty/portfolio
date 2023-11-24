"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModifPseudoValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ModifPseudoValidator"));
const ModifEmailValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ModifEmailValidator"));
class ComptesController {
    async index({ view }) {
        return view.render('compte');
    }
    async modifpseudo({ request, auth, session, response }) {
        const user = auth.user;
        await request.validate(ModifPseudoValidator_1.default);
        user.pseudo = request.input('pseudo');
        await user.save();
        session.flash({ success: "Username updated successfully" });
        response.redirect().back();
    }
    async modifemail({ request, auth, session, response }) {
        const user = auth.user;
        await request.validate(ModifEmailValidator_1.default);
        user.email = request.input('email');
        await user.save();
        session.flash({ success: "Email updated successfully" });
        response.redirect().back();
    }
}
exports.default = ComptesController;
//# sourceMappingURL=ComptesController.js.map