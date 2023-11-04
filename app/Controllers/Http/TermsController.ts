import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TermsController {

  async index({ view }: HttpContextContract) {
    return view.render('terms')
  }

}
