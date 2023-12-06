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
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'


Route.get('/', async ({ view }) => {
  return view.render('home')
}).as('home')

Route.get('/terms', async ({ view }) => {
  return view.render('terms')
}).as('terms')

Route.get('/auth/login', 'AuthController.login').as('login')
Route.post('/auth/login', 'AuthController.doLogin')
Route.get('/auth/signup', 'AuthController.signup').as('signup')
Route.post('/auth/signup', 'AuthController.doSignup')

Route.get('/compte', 'CompteController.index').as('compte').middleware(['auth'])
Route.post('/modifpseudo', 'CompteController.modifpseudo')
Route.post('/modifemail', 'CompteController.modifemail')

Route.get('/auth/logout', 'AuthController.logout').as('logout')
Route.get('/compte/delete', 'CompteController.delete').as('delete')

Route.post('/compte',async ({ auth, request, response }) => {
  const avatar = request.file('avatar')!

  auth.user!.avatar = await ResponsiveAttachment.fromFile(avatar)
  await auth.user!.save()

  return response.redirect().back()
})