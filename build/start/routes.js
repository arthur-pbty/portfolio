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
//# sourceMappingURL=routes.js.map