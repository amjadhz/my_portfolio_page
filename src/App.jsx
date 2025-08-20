// src/App.jsx
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DataScience from "./components/DataScience";
import ImagePalette from "./components/ImagePalette";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  // reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <Header />
      <main className="container">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <DataScience />
        <ImagePalette />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
