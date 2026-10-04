import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import profile from '../data/profile.json';

export const SECTIONS = ['home', 'about', 'achievements', 'experience', 'clubs', 'skills', 'projects', 'certificates', 'languages', 'links', 'contact'];

const SiteContext = createContext(null);

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SiteProvider({ active, ready, children }) {
  const [hover, setHover] = useState(null); // key from profile.avatar.hovers
  const [waveKey, setWaveKey] = useState(0); // bump to make the avatar wave
  const [tour, setTour] = useState(null); // index into SECTIONS while touring

  const wave = useCallback(() => setWaveKey((k) => k + 1), []);

  // Scroll after React has committed the tour state, so nothing interrupts the smooth scroll.
  const goTo = (index) => setTimeout(() => scrollToSection(SECTIONS[index]), 80);

  const startTour = useCallback(() => {
    setTour(1);
    goTo(1);
  }, []);
  const nextStop = useCallback(() => {
    const next = (tour ?? 0) + 1;
    if (next >= SECTIONS.length) {
      setTour(null);
      return;
    }
    setTour(next);
    goTo(next);
  }, [tour]);
  const endTour = useCallback(() => setTour(null), []);

  const message = hover ? profile.avatar.hovers[hover] : profile.avatar.sections[active];

  const value = useMemo(
    () => ({ active, ready, hover, setHover, message, waveKey, wave, tour, startTour, nextStop, endTour }),
    [active, ready, hover, message, waveKey, wave, tour, startTour, nextStop, endTour]
  );
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
