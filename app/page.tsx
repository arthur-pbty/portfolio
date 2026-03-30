import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Homelab from "./components/Homelab";
import Sailing from "./components/Sailing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenu-principal">
        <Hero />
        <div className="section-divider max-w-6xl mx-auto px-4 sm:px-6" role="separator" aria-hidden="true" />
        <About />
        <div className="section-divider max-w-6xl mx-auto px-4 sm:px-6" role="separator" aria-hidden="true" />
        <Projects />
        <div className="section-divider max-w-6xl mx-auto px-4 sm:px-6" role="separator" aria-hidden="true" />
        <Homelab />
        <div className="section-divider max-w-6xl mx-auto px-4 sm:px-6" role="separator" aria-hidden="true" />
        <Sailing />
      </main>
      <Footer />
    </>
  );
}
