import { ArrowDown, Terminal, Sailboat } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="w-full h-full hero-grid" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-[80px] sm:blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-[80px] sm:blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16 sm:pt-0">
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card/80 text-xs sm:text-sm text-muted">
            <Terminal size={14} className="text-blue-400" />
            Développeur
            <span className="w-1 h-1 rounded-full bg-subtle" />
            <Sailboat size={14} className="text-cyan-400" />
            Navigateur
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
          Salut, je suis{" "}
          <span className="gradient-text">Arthur</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-3 sm:mb-4 animate-fade-in-up animate-delay-200">
          18 ans · Développeur passionné par l&apos;auto-hébergement et
          l&apos;infrastructure · Sportif de haut niveau en voile
        </p>

        <p className="text-sm sm:text-base text-dim max-w-xl mx-auto mb-8 sm:mb-10 animate-fade-in-up animate-delay-300">
          Je conçois mes propres outils, héberge mes services et repousse
          mes limites — sur l&apos;eau comme dans le code.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animate-delay-400">
          <a
            href="#projets"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-sm sm:text-base"
          >
            Voir mes projets
          </a>
          <a
            href="#voile"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-border hover:border-subtle-hover text-muted hover:text-emphasis font-medium transition-colors text-sm sm:text-base"
          >
            Mon parcours voile
          </a>
        </div>

        <a
          href="#a-propos"
          className="inline-block mt-10 sm:mt-16 text-subtle-hover hover:text-muted transition-colors animate-bounce"
          aria-label="Défiler vers le bas"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
