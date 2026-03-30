"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#a-propos", label: "À propos" },
  { href: "#projets", label: "Projets" },
  { href: "#homelab", label: "Homelab" },
  { href: "#voile", label: "Voile" },
  { href: "/photos", label: "Galerie" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <a
          href="#accueil"
          className="text-lg sm:text-xl font-bold gradient-text tracking-tight"
        >
          arthurp.fr
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-emphasis transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-emphasis transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-card hover:bg-card-hover text-muted hover:text-emphasis transition-all duration-200"
            aria-label={
              theme === "dark"
                ? "Passer en mode clair"
                : "Passer en mode sombre"
            }
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border bg-card text-muted hover:text-emphasis transition-colors"
            aria-label={
              theme === "dark"
                ? "Passer en mode clair"
                : "Passer en mode sombre"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted hover:text-emphasis"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 sm:px-6 pb-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-muted hover:text-emphasis transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm text-muted hover:text-emphasis transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
