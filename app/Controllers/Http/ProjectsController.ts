import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectsController {

  async nups({ view }: HttpContextContract) {
    return view.render('projects/nups/project-nups')
  }

  async nupsWeb({ view }: HttpContextContract) {
    return view.render('projects/nups/nups')
  }

}
