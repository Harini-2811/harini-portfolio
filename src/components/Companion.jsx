import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SECTIONS, useSite } from '../context/SiteContext.jsx';
import profile from '../data/profile.json';

const label = (id) => id.charAt(0).toUpperCase() + id.slice(1);

/** Mini portrait that follows the visitor after the hero and speaks per section / guides the tour. */
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
            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink-900 ring-2 ring-accent-primary/60 ring-offset-2 ring-offset-ink-950 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] transition hover:scale-105 sm:h-16 sm:w-16"
            aria-label={open || touring ? 'Hide Harini’s message' : 'Show Harini’s message'}
          >
            <img src="/images/harini.webp" alt="" width="128" height="128" decoding="async" className="h-full w-full scale-[1.35] object-cover object-[50%_42%]" />
          </button>

          <AnimatePresence>
            {(open || touring) && (
              <motion.div
                className="relative mb-3 w-[min(290px,calc(100vw-110px))] rounded-2xl rounded-bl-sm border border-ink-600 bg-ink-800 p-3.5 text-sm leading-relaxed text-slate-100 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)]"
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
                      {label(SECTIONS[tour])}, {tour} of {SECTIONS.length - 1}
                    </span>
                    <div className="flex gap-1.5">
                      <button type="button" onClick={endTour} className="rounded-lg px-2 py-1 text-xs text-slate-300 hover:text-white">
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
                    className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-ink-600 bg-ink-900 text-slate-300 hover:text-white"
                    aria-label="Hide the mini guide"
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
