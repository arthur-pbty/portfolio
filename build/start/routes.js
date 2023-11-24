"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', 'HomeController.index').as('home');
Route_1.default.get('/auth', 'AuthController.index').as('auth');
Route_1.default.post('/login', 'AuthController.login').as('login');
Route_1.default.post('/signup', 'AuthController.signup').as('signup');
Route_1.default.get('/logout', 'AuthController.logout').as('logout');
Route_1.default.get('/compte', 'ComptesController.index').as('compte');
Route_1.default.post('/modifpseudo', 'ComptesController.modifpseudo').as('modifpseudo');
Route_1.default.post('/modifemail', 'ComptesController.modifemail').as('modifemail');
Route_1.default.get('/projects/nups', 'ProjectsController.nups').as('nups');
Route_1.default.get('/projects/nups/web', 'ProjectsController.nupsWeb').as('nups-web');
Route_1.default.get('/projects/my-networks', 'ProjectsController.myNetwork').as('myNetwork');
Route_1.default.get('/projects/journal', 'ProjectsController.journal').as('journal');
Route_1.default.get('/terms', 'TermsController.index').as('terms');
//# sourceMappingURL=routes.js.map