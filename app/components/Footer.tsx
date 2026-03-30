import { Github, Mail, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-10 sm:py-16 px-4 sm:px-6 border-t border-border" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-3">
              arthurp.fr
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Développeur passionné par l&apos;auto-hébergement et navigateur
              de haut niveau.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Navigation</h4>
            <div className="space-y-2.5">
              {[
                { href: "#accueil", label: "Accueil" },
                { href: "#projets", label: "Projets" },
                { href: "#homelab", label: "Homelab" },
                { href: "#voile", label: "Voile" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted hover:text-emphasis transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="https://arthurp.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-emphasis transition-colors"
              >
                <Globe size={16} />
                arthurp.fr
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-emphasis transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="mailto:arthur.puechberty@outlook.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-emphasis transition-colors"
              >
                <Mail size={16} />
                arthur.puechberty@outlook.com
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dim">
            © {new Date().getFullYear()} Arthur P. Tous droits réservés.
          </p>
          <p className="text-xs text-dim flex items-center gap-1">
            Fait avec <Heart size={12} className="text-red-400" /> et
            auto-hébergé sur Proxmox
          </p>
        </div>
      </div>
    </footer>
  );
}
