/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index').as('home')

Route.get('/auth', 'AuthController.index').as('auth')
Route.post('/login', 'AuthController.login').as('login')
Route.post('/signup', 'AuthController.signup').as('signup')
Route.get('/logout', 'AuthController.logout').as('logout')

Route.get('/compte', 'ComptesController.index').as('compte')
Route.post('/modifpseudo', 'ComptesController.modifpseudo').as('modifpseudo')
Route.post('/modifemail', 'ComptesController.modifemail').as('modifemail')

Route.get('/projects/nups', 'ProjectsController.nups').as('nups')
Route.get('/projects/nups/web', 'ProjectsController.nupsWeb').as('nups-web')

Route.get('/terms', 'TermsController.index').as('terms')