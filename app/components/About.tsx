import { Code2, Server, Network, Container } from "lucide-react";

const skills = [
  {
    icon: <Code2 size={20} className="text-blue-400" />,
    title: "Développement",
    desc: "Next.js, React, TypeScript, Python, Node.js",
  },
  {
    icon: <Server size={20} className="text-purple-400" />,
    title: "Virtualisation",
    desc: "Proxmox, machines virtuelles, gestion de ressources",
  },
  {
    icon: <Container size={20} className="text-cyan-400" />,
    title: "Conteneurisation",
    desc: "Docker, déploiement automatisé, orchestration",
  },
  {
    icon: <Network size={20} className="text-green-400" />,
    title: "Réseau",
    desc: "VLAN, firewall, bridges, DNS, reverse proxy",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            À propos de <span className="gradient-text">moi</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Passionné par la programmation, l&apos;infrastructure réseau, la
            virtualisation et l&apos;auto-hébergement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text */}
          <div className="space-y-5">
            <p className="text-secondary leading-relaxed">
              J&apos;aime concevoir des projets concrets, comprendre en
              profondeur le fonctionnement des systèmes et créer mes propres
              outils. Mon homelab basé sur <strong className="text-emphasis">Proxmox</strong> fonctionne
              en continu et me sert d&apos;environnement principal pour
              héberger mes sites, gérer des machines virtuelles, déployer des
              conteneurs Docker et expérimenter avec le réseau.
            </p>
            <p className="text-secondary leading-relaxed">
              Mon objectif à long terme est de créer des systèmes complets,
              des plateformes et des projets ambitieux qui combinent{" "}
              <strong className="text-emphasis">développement logiciel</strong> et{" "}
              <strong className="text-emphasis">infrastructure</strong>.
            </p>
            <p className="text-secondary leading-relaxed">
              En parallèle, je suis{" "}
              <strong className="text-emphasis">sportif de haut niveau en voile</strong>,
              ce qui m&apos;a appris la rigueur, la discipline et la
              persévérance — des valeurs que j&apos;applique aussi dans mes
              projets techniques.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="p-4 sm:p-5 rounded-2xl border border-border bg-card glow-hover"
              >
                <div className="mb-3">{skill.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{skill.title}</h3>
                <p className="text-xs text-muted leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
