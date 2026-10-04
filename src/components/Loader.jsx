import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      role="status"
      aria-live="polite"
    >
      <div className="font-mono text-sm text-slate-300 sm:text-base">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <span className="text-accent-primary">&gt;</span> initialising portfolio...
        </motion.p>
        <motion.div
          className="mt-4 h-[2px] w-56 origin-left rounded bg-gradient-to-r from-accent-primary to-accent-secondary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.p
          className="mt-3 text-emerald-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ✓ ready
        </motion.p>
      </div>
    </motion.div>
  );
}
