import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/** Lightbox for certificates / proof images. Arrow keys switch, Escape closes. */
export default function ProofViewer({ title, items, onClose }) {
  const [i, setI] = useState(0);
  const closeRef = useRef(null);
  const many = items.length > 1;
  const go = (d) => setI((n) => (n + d + items.length) % items.length);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (many && e.key === 'ArrowRight') go(1);
      if (many && e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, many]);

  const item = items[i];
  return createPortal(
    <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" onClick={onClose} />
      <motion.figure
        role="dialog"
        aria-modal="true"
        aria-label={`${title} proof`}
        className="relative flex max-h-full w-full max-w-3xl flex-col items-center"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <div className="mb-3 flex w-full items-center justify-between gap-4">
          <p className="font-display text-lg font-semibold text-white">{title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close proof"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-ink-900 text-slate-200 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative w-full">
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-h-[72vh] w-auto rounded-2xl border border-white/10 object-contain shadow-2xl"
          />
          {many && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous proof" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/80 text-white ring-1 ring-white/10">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next proof" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink-950/80 text-white ring-1 ring-white/10">
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <figcaption className="mt-3 text-center text-sm text-slate-400">
          {item.caption}
          {many && <span className="ml-2 font-mono text-xs text-slate-500">{i + 1}/{items.length}</span>}
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body
  );
}
