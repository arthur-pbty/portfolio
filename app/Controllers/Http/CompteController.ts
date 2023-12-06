import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ModifPseudoValidator from 'App/Validators/ModifPseudoValidator'
import ModifEmailValidator from 'App/Validators/ModifEmailValidator'

export default class CompteController {

  async index({ view }: HttpContextContract) {
    return view.render('compte')
  }

  async modifpseudo({ request, auth, session, response }: HttpContextContract) {
    const user = auth.user

    await request.validate(ModifPseudoValidator)

    user!.pseudo = request.input('pseudo')
    await user!.save()
    session.flash({success: "Username updated successfully"})
    response.redirect().back()
  }

  async modifemail({ request, auth, session, response }: HttpContextContract) {
    const user = auth.user

    await request.validate(ModifEmailValidator)

    user!.email = request.input('email')
    await user!.save()
    session.flash({success: "Email updated successfully"})
    response.redirect().back()
  }

}
