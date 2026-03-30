import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Arthur P. — Développeur & Navigateur",
    template: "%s | Arthur P.",
  },
  description:
    "Portfolio d'Arthur P. — développeur passionné par l'auto-hébergement, l'infrastructure Proxmox, Docker et la voile de haut niveau. Découvrez mes projets et mon homelab.",
  keywords: [
    "portfolio",
    "développeur",
    "homelab",
    "auto-hébergement",
    "voile",
    "Next.js",
    "Proxmox",
    "Docker",
    "infrastructure",
    "sportif de haut niveau",
    "Arthur P",
    "arthurp.fr",
  ],
  authors: [{ name: "Arthur P.", url: "https://arthurp.fr" }],
  creator: "Arthur P.",
  publisher: "Arthur P.",
  metadataBase: new URL("https://arthurp.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://arthurp.fr",
    siteName: "Arthur P. — Portfolio",
    title: "Arthur P. — Développeur & Navigateur",
    description:
      "Développeur passionné par l'auto-hébergement, l'infrastructure et la voile de haut niveau. Découvrez mes projets auto-hébergés et mon homelab Proxmox.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arthur P. — Développeur & Navigateur",
    description:
      "Développeur passionné par l'auto-hébergement, l'infrastructure et la voile de haut niveau.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
  })();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arthur P.",
  url: "https://arthurp.fr",
  email: "contact@arthurp.fr",
  jobTitle: "Développeur",
  description:
    "Développeur passionné par l'auto-hébergement, l'infrastructure et la voile de haut niveau.",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Docker",
    "Proxmox",
    "Auto-hébergement",
    "Infrastructure réseau",
  ],
  sameAs: ["https://github.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:outline-none"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
