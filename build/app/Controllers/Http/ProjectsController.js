"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectsController {
    async nups({ view }) {
        return view.render('projects/nups/project-nups');
    }
    async nupsWeb({ view }) {
        return view.render('projects/nups/nups');
    }
    async myNetwork({ view }) {
        return view.render('projects/myNetwork/index');
    }
    async journal({ view }) {
        return view.render('projects/journal/index');
    }
}
exports.default = ProjectsController;
//# sourceMappingURL=ProjectsController.js.map