"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const ResponsiveAttachment_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/ResponsiveAttachment");
Route_1.default.get('/', async ({ view }) => {
    return view.render('home');
}).as('home');
Route_1.default.get('/terms', async ({ view }) => {
    return view.render('terms');
}).as('terms');
Route_1.default.get('/auth/login', 'AuthController.login').as('login');
Route_1.default.post('/auth/login', 'AuthController.doLogin');
Route_1.default.get('/auth/signup', 'AuthController.signup').as('signup');
Route_1.default.post('/auth/signup', 'AuthController.doSignup');
Route_1.default.get('/compte', 'CompteController.index').as('compte').middleware(['auth']);
Route_1.default.post('/modifpseudo', 'CompteController.modifpseudo');
Route_1.default.post('/modifemail', 'CompteController.modifemail');
Route_1.default.get('/auth/logout', 'AuthController.logout').as('logout');
Route_1.default.get('/compte/delete', 'CompteController.delete').as('delete');
Route_1.default.post('/compte', async ({ auth, request, response }) => {
    const avatar = request.file('avatar');
    auth.user.avatar = await ResponsiveAttachment_1.ResponsiveAttachment.fromFile(avatar);
    await auth.user.save();
    return response.redirect().back();
});
//# sourceMappingURL=routes.js.map