import { ExternalLink, Timer, FileQuestion, Grid3X3, Video, QrCode, BookOpen, Link2, FileText, Bot, LinkIcon, Clock } from "lucide-react";

const projects = [
  {
    name: "arthurp.fr",
    url: "https://arthurp.fr",
    desc: "Site principal qui centralise mon écosystème de projets et services.",
    icon: <LinkIcon size={20} className="text-blue-400" />,
    tags: ["Site vitrine", "Hub"],
  },
  {
    name: "pomodoro.arthurp.fr",
    url: "https://pomodoro.arthurp.fr",
    desc: "Application de gestion du temps basée sur la méthode Pomodoro.",
    icon: <Timer size={20} className="text-red-400" />,
    tags: ["Productivité", "Web App"],
  },
  {
    name: "qcu.arthurp.fr",
    url: "https://qcu.arthurp.fr",
    desc: "Site de QCU pour réviser la physique.",
    icon: <FileQuestion size={20} className="text-yellow-400" />,
    tags: ["Éducation", "Physique"],
  },
  {
    name: "sudoku.arthurp.fr",
    url: "https://sudoku.arthurp.fr",
    desc: "Générateur et jeu de Sudoku en ligne.",
    icon: <Grid3X3 size={20} className="text-green-400" />,
    tags: ["Jeu", "Logique"],
  },
  {
    name: "visio.arthurp.fr",
    url: "https://visio.arthurp.fr",
    desc: "Solution de visioconférence auto-hébergée.",
    icon: <Video size={20} className="text-purple-400" />,
    tags: ["Communication", "Auto-hébergé"],
  },
  {
    name: "qrcode.arthurp.fr",
    url: "https://qrcode.arthurp.fr",
    desc: "Générateur de QR codes personnalisés.",
    icon: <QrCode size={20} className="text-cyan-400" />,
    tags: ["Outil", "Utilitaire"],
  },
  {
    name: "learn.arthurp.fr",
    url: "https://learn.arthurp.fr",
    desc: "Plateforme d'apprentissage et de documentation personnelle.",
    icon: <BookOpen size={20} className="text-orange-400" />,
    tags: ["Apprentissage", "Documentation"],
  },
  {
    name: "links.arthurp.fr",
    url: "https://links.arthurp.fr",
    desc: "Page de centralisation de liens.",
    icon: <Link2 size={20} className="text-pink-400" />,
    tags: ["Liens", "Hub"],
  },
  {
    name: "form.arthurp.fr",
    url: "https://form.arthurp.fr",
    desc: "Système de formulaires auto-hébergé.",
    icon: <FileText size={20} className="text-teal-400" />,
    tags: ["Formulaires", "Auto-hébergé"],
  },
  {
    name: "lazybot.arthurp.fr",
    url: "https://lazybot.arthurp.fr",
    desc: "Bot Discord contrôlé via un dashboard web, développé et hébergé par moi.",
    icon: <Bot size={20} className="text-indigo-400" />,
    tags: ["Discord", "Bot", "Dashboard"],
  },
  {
    name: "reducelink.arthurp.fr",
    url: "https://reducelink.arthurp.fr",
    desc: "Service de réduction de liens.",
    icon: <LinkIcon size={20} className="text-amber-400" />,
    tags: ["Outil", "Raccourcisseur"],
  },
  {
    name: "clock.arthurp.fr",
    url: "https://clock.arthurp.fr",
    desc: "Application d'affichage et de gestion du temps.",
    icon: <Clock size={20} className="text-sky-400" />,
    tags: ["Temps", "Utilitaire"],
  },
];

export default function Projects() {
  return (
    <section id="projets" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 id="projects-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Mes <span className="gradient-text">projets</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Tous hébergés sur mon infrastructure personnelle — chaque
            sous-domaine est un projet conçu, développé et maintenu par moi.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-6 rounded-2xl border border-border bg-card glow-hover block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-card-hover border border-border">
                  {project.icon}
                </div>
                <ExternalLink
                  size={16}
                  className="text-subtle-hover group-hover:text-blue-400 transition-colors mt-1"
                />
              </div>

              <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>

              <p className="text-xs text-muted leading-relaxed mb-4">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-card-hover border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
