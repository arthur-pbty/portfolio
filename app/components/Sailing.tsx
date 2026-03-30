import { Trophy, Medal, Anchor, Wind, Award } from "lucide-react";

const palmares = [
  {
    year: "2025",
    results: [
      { rank: "1er", event: "Spi Ouest France", boat: "Open 5.70" },
      { rank: "1er", event: "GPEN", boat: "Open 5.70" },
      { rank: "3e", event: "18h d'Arcachon", boat: "Open 5.70" },
      { rank: "2e", event: "Championnat de France Espoirs", boat: "" },
    ],
  },
  {
    year: "2024",
    results: [
      { rank: "1er Espoir", event: "National 5.90", boat: "5.90" },
      { rank: "2e", event: "Coupe de France", boat: "Open 5.70" },
    ],
  },
  {
    year: "2023",
    results: [
      { rank: "9e", event: "Championnat du monde", boat: "Open Skiff" },
    ],
  },
  {
    year: "2022",
    results: [
      { rank: "1er", event: "Open Tour", boat: "Open Skiff" },
      { rank: "2e", event: "Championnat de France", boat: "Birdyfish" },
      { rank: "9e", event: "Championnat du monde", boat: "Open Skiff" },
    ],
  },
];

const qualities = [
  { icon: <Award size={18} />, label: "Rigueur" },
  { icon: <Wind size={18} />, label: "Persévérance" },
  { icon: <Anchor size={18} />, label: "Discipline" },
  { icon: <Trophy size={18} />, label: "Gestion du stress" },
];

function getRankColor(rank: string) {
  if (rank.startsWith("1er")) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
  if (rank.startsWith("2e")) return "text-gray-300 bg-gray-300/10 border-gray-300/20";
  if (rank.startsWith("3e")) return "text-amber-600 bg-amber-600/10 border-amber-600/20";
  return "text-blue-400 bg-blue-400/10 border-blue-400/20";
}

export default function Sailing() {
  return (
    <section id="voile" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-labelledby="sailing-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 id="sailing-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Parcours <span className="gradient-text">voile</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Sportif de haut niveau — la voile fait partie intégrante de mon
            identité depuis l&apos;âge de 7 ans.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Story */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Anchor size={18} className="text-cyan-400" />
                Mon histoire
              </h3>
              <div className="space-y-4 text-sm text-secondary leading-relaxed">
                <p>
                  J&apos;ai commencé la voile à <strong className="text-emphasis">7 ans</strong> pendant
                  des stages d&apos;été, influencé par ma mère qui pratiquait
                  déjà ce sport.
                </p>
                <p>
                  Lors de mon premier entraînement sur un nouveau bateau, il
                  y avait beaucoup de vent. J&apos;ai chaviré plus de{" "}
                  <strong className="text-emphasis">vingt fois</strong>. Malgré
                  cela, j&apos;ai adoré — j&apos;avais enfin l&apos;impression
                  de vraiment apprendre.
                </p>
                <p>
                  Depuis, j&apos;ai remporté plusieurs compétitions nationales,
                  participé à{" "}
                  <strong className="text-emphasis">
                    deux championnats du monde
                  </strong>{" "}
                  en Open Skiff et obtenu le statut de{" "}
                  <strong className="text-emphasis">sportif de haut niveau</strong>.
                </p>
              </div>
            </div>

            {/* Qualities */}
            <div className="p-4 sm:p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold mb-3 sm:mb-4">
                Ce que la voile m&apos;a appris
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {qualities.map((q) => (
                  <div
                    key={q.label}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="text-cyan-400">{q.icon}</span>
                    {q.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 sm:p-4 rounded-xl border border-border bg-card text-center">
                <div className="text-2xl font-bold text-emphasis">2</div>
                <div className="text-[10px] text-muted mt-1">
                  Championnats du monde
                </div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl border border-border bg-card text-center">
                <div className="text-2xl font-bold text-emphasis">9e</div>
                <div className="text-[10px] text-muted mt-1">
                  Mondial (×2)
                </div>
              </div>
              <div className="p-3 sm:p-4 rounded-xl border border-border bg-card text-center">
                <div className="text-2xl font-bold text-emphasis">SHN</div>
                <div className="text-[10px] text-muted mt-1">
                  Sportif de haut niveau
                </div>
              </div>
            </div>
          </div>

          {/* Palmarès */}
          <div className="lg:col-span-3">
            <div className="p-4 sm:p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-400" />
                Palmarès
              </h3>

              <div className="space-y-8">
                {palmares.map((year) => (
                  <div key={year.year}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold gradient-text">
                        {year.year}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-3">
                      {year.results.map((result, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl hover:bg-card-hover transition-colors"
                        >
                          <span
                            className={`inline-flex items-center justify-center min-w-15 sm:min-w-18 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[10px] sm:text-xs font-bold shrink-0 ${getRankColor(result.rank)}`}
                          >
                            <Medal size={12} className="mr-1 sm:mr-1.5" />
                            {result.rank}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs sm:text-sm font-medium">
                              {result.event}
                            </span>
                            {result.boat && (
                              <span className="text-[10px] sm:text-xs text-dim ml-1 sm:ml-2">
                                — {result.boat}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
