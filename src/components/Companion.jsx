import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Avatar from './Avatar.jsx';
import { SECTIONS, useSite } from '../context/SiteContext.jsx';
import profile from '../data/profile.json';

const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

/** Mini avatar that follows the visitor after the hero and speaks per section / guides the tour. */
export default function Companion() {
  const { active, tour, nextStop, endTour } = useSite();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const touring = tour !== null;
  const visible = !dismissed && (active !== 'home' || touring);

  useEffect(() => {
    if (active === 'home' || touring) return;
    setOpen(true);
    const t = setTimeout(() => setOpen(false), 4200);
    return () => clearTimeout(t);
  }, [active, touring]);

  const message = profile.avatar.sections[touring ? SECTIONS[tour] : active];
  const isLast = touring && tour === SECTIONS.length - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 z-40 flex items-end gap-2 sm:bottom-6 sm:left-6"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-[#4A2F7A] to-ink-800 ring-2 ring-accent-primary/50 shadow-[0_8px_30px_-6px_rgba(168,85,247,0.55)] transition hover:scale-105"
            aria-label={open || touring ? 'Hide Harini’s message' : 'Show Harini’s message'}
          >
            <Avatar viewBox="78 52 244 250" mood={touring ? 'happy' : 'idle'} className="h-full w-full" title="" />
          </button>

          <AnimatePresence>
            {(open || touring) && (
              <motion.div
                className="glass relative mb-3 w-[min(290px,calc(100vw-110px))] rounded-2xl rounded-bl-sm p-3.5 text-sm text-slate-100 shadow-xl"
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.p key={message} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                    {message}
                  </motion.p>
                </AnimatePresence>

                {touring && (
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-slate-400">
                      {label(SECTIONS[tour])} · {tour}/{SECTIONS.length - 1}
                    </span>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={endTour} className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:text-white">
                        End tour
                      </button>
                      <button
                        type="button"
                        onClick={isLast ? endTour : nextStop}
                        className="rounded-lg bg-accent-primary px-2.5 py-1 text-xs font-semibold text-ink-950"
                      >
                        {isLast ? 'Finish' : 'Next stop'}
                      </button>
                    </div>
                  </div>
                )}

                {!touring && (
                  <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-ink-800 text-slate-400 hover:text-white"
                    aria-label="Hide the mini avatar"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
