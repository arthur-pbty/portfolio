import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Galerie Photos",
  description:
    "Galerie photo d'Arthur P. — moments de vie, voile et aventures.",
};

const photos = Array.from({ length: 68 }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return { src: `/pictures/photo_${num}.webp`, alt: `Photo ${i + 1}` };
});

export default function PhotosPage() {
  return (
    <>
      {/* Back navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted hover:text-emphasis transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Retour</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-bold gradient-text tracking-tight">
            Galerie
          </h1>
        </div>
      </header>

      <main className="pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Mosaic grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 sm:gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className="mb-3 sm:mb-4 break-inside-avoid group"
            >
              <div className="relative overflow-hidden rounded-xl border border-border bg-card glow-hover">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  loading={index < 10 ? "eager" : "lazy"}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-card-hover text-sm text-muted hover:text-emphasis transition-all duration-200 glow-hover"
          >
            <ArrowLeft size={16} />
            Retour au portfolio
          </Link>
        </div>
      </main>
    </>
  );
}
