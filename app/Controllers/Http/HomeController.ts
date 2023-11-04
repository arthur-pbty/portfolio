import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

   async index ({ view }: HttpContextContract) {
      return view.render('index')
   }
}