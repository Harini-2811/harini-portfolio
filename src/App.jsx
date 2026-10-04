import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { SECTIONS, SiteProvider } from './context/SiteContext.jsx';
import useScrollSpy from './hooks/useScrollSpy.js';
import Loader from './components/Loader.jsx';
import CodeBackground from './components/CodeBackground.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Companion from './components/Companion.jsx';
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import Achievements from './sections/Achievements.jsx';
import Experience from './sections/Experience.jsx';
import Clubs from './sections/Clubs.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Certificates from './sections/Certificates.jsx';
import Languages from './sections/Languages.jsx';
import Links from './sections/Links.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  const active = useScrollSpy(SECTIONS);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setReady(true), reduce ? 200 : 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SiteProvider active={active} ready={ready}>
        <AnimatePresence>{!ready && <Loader key="loader" />}</AnimatePresence>

        <a href="#main" className="sr-only z-[70] rounded-lg bg-accent-primary px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>

        <CodeBackground />
        <CursorGlow />
        <Navbar />

        <main id="main" className="relative z-10">
          <Home />
          <About />
          <Achievements />
          <Experience />
          <Clubs />
          <Skills />
          <Projects />
          <Certificates />
          <Languages />
          <Links />
          <Contact />
        </main>

        <Footer />
        <Companion />
      </SiteProvider>
    </MotionConfig>
  );
}
