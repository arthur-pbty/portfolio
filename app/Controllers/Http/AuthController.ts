import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';


export default class AuthController {

  async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  async doLogin({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      response.redirect().toRoute('home')
    } catch {
      session.flash({error: 'Identifiants incorrects'})
      response.redirect().toRoute('login')
    }
  }
  

  async signup({ view }: HttpContextContract) {
    return view.render('auth/signup')
  }

  async doSignup({ request, response, auth }: HttpContextContract) {
    const playload = await request.validate(CreateUserValidator)
    await User.create(playload)
    try {
      await auth.use('web').attempt(playload.email, playload.password)
      response.redirect().toRoute('home')
    } catch {
      response.redirect().toRoute('login')
    }
  }


  async logout({ auth, response }:HttpContextContract) {
    await auth.logout()
    return response.redirect().back()
 }
}
