import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {

   async index ({ view }: HttpContextContract) {
      return view.render('auth')
   }

   async login ({request, auth, response, session}: HttpContextContract) {
      const email = request.input('loginemail')
      const password = request.input('loginpassword')

      try {
         await auth.use('web').attempt(email, password)
         response.redirect().toRoute('home')
      } catch {
         session.flash({error: "Identifiant ou mot de passe incorrect"})
         response.redirect().back()
      }
   }

   async signup({ request, response }: HttpContextContract) {
      const playload = await request.validate(CreateUserValidator)
      await User.create(playload)
      return response.redirect().toRoute('home')
   }

   async logout({ auth, response }:HttpContextContract) {
      await auth.logout()
      return response.redirect().back()
   }
}
