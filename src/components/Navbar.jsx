import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SECTIONS, useSite } from '../context/SiteContext.jsx';

const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

export default function Navbar() {
  const { active } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-accent-primary"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Main"
        className={`transition-all duration-300 ${scrolled ? 'border-b border-ink-700 bg-ink-950/85 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <a href="#home" className="font-mono text-lg font-semibold text-white" aria-label="Harini V, back to top">
            
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative rounded-lg px-2.5 py-2 text-sm transition-colors ${
                    active === id ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-ink-800 ring-1 ring-accent-primary/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {label(id)}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink-600 text-slate-200 xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col border-l border-ink-600 bg-ink-900 p-6 xl:hidden"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1.5rem)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              aria-label="Mobile menu"
            >
              <button
                type="button"
                className="mb-6 grid h-10 w-10 place-items-center self-end rounded-lg border border-ink-600 text-slate-200"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
              <ul className="space-y-1">
                {SECTIONS.map((id, i) => (
                  <motion.li key={id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-3 text-base ${
                        active === id ? 'bg-ink-800 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="mr-3 font-mono text-xs text-accent-primary/70">{String(i + 1).padStart(2, '0')}</span>
                      {label(id)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
