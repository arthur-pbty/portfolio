import {
  Server,
  HardDrive,
  Container,
  Network,
  Shield,
  Image,
  Tv,
  Monitor,
} from "lucide-react";

const infra = [
  {
    icon: <Server size={20} className="text-blue-400" />,
    title: "Proxmox VE",
    desc: "Hyperviseur principal pour la virtualisation de toutes mes machines et conteneurs.",
  },
  {
    icon: <Container size={20} className="text-cyan-400" />,
    title: "Docker",
    desc: "Déploiement conteneurisé de l'ensemble de mes applications et services.",
  },
  {
    icon: <HardDrive size={20} className="text-purple-400" />,
    title: "Machines virtuelles",
    desc: "Isolation des environnements : production, test, développement.",
  },
  {
    icon: <Network size={20} className="text-green-400" />,
    title: "Réseau avancé",
    desc: "VLAN, bridges, DNS personnalisé, reverse proxy Nginx.",
  },
  {
    icon: <Shield size={20} className="text-red-400" />,
    title: "Sécurité",
    desc: "Firewall, certificats SSL, accès sécurisés et segmentation réseau.",
  },
  {
    icon: <Monitor size={20} className="text-amber-400" />,
    title: "Déploiement automatisé",
    desc: "CI/CD, scripts de déploiement, gestion via Git.",
  },
];

const personalServices = [
  {
    icon: <Image size={20} className="text-pink-400" />,
    name: "Immich",
    url: "immich.arthurp.fr",
    desc: "Gestionnaire de photos auto-hébergé — alternative à Google Photos.",
  },
  {
    icon: <Tv size={20} className="text-indigo-400" />,
    name: "Jellyfin",
    url: "jellyfin.arthurp.fr",
    desc: "Serveur multimédia auto-hébergé — films, séries, musique.",
  },
];

export default function Homelab() {
  return (
    <section id="homelab" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="homelab-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 id="homelab-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Mon <span className="gradient-text">Homelab</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Une infrastructure personnelle qui tourne 24/7 — mon terrain de
            jeu pour l&apos;auto-hébergement, la virtualisation et le réseau.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="mb-10 sm:mb-16 p-4 sm:p-6 md:p-8 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-mono">
              Infrastructure en ligne
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {infra.map((item) => (
              <div
                key={item.title}
                className="p-4 sm:p-5 rounded-xl border border-border bg-deep hover:border-subtle transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal services */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">
            Exemples de services personnels hébergés
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto">
            {personalServices.map((svc) => (
              <div
                key={svc.name}
                className="p-4 sm:p-6 rounded-2xl border border-border bg-card glow-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  {svc.icon}
                  <div>
                    <h4 className="font-semibold text-sm">{svc.name}</h4>
                    <span className="text-[10px] text-dim font-mono">
                      {svc.url}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-dim mt-6">
            Ces services tournent sur mon infrastructure Proxmox avec
            virtualisation et conteneurs Docker — et bien d&apos;autres encore.
          </p>
        </div>
      </div>
    </section>
  );
}
