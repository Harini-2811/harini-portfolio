import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import ProofViewer from '../components/ProofViewer.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CountUp from '../components/CountUp.jsx';
import { Icon, accentClasses } from '../components/Icons.jsx';
import achievements from '../data/achievements.json';

function AchievementCard({ a, index, onProof }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const c = accentClasses[a.accent] ?? accentClasses.primary;

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
      style={{ perspective: 900 }}
    >
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: srx, rotateY: sry, '--glow': c.glow }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:border-accent-primary/40 hover:shadow-[0_20px_50px_-24px_var(--glow)]"
      >
        <div className="flex items-start justify-between gap-4">
          <span className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ${c.bg} ${c.ring} ${c.text}`}>
            <Icon name={a.icon} className="h-6 w-6" />
          </span>
          <span className={`font-display text-3xl font-bold ${c.text}`}>
            <CountUp value={a.stat.value} prefix={a.stat.prefix} suffix={a.stat.suffix} />
          </span>
        </div>
        <h3 className="mt-5 text-lg font-semibold">{a.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{a.text}</p>
        {a.proof?.length > 0 && (
          <div className="mt-5">
            {a.proof[0].type === 'link' ? (
              <a href={a.proof[0].url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.text} hover:underline`}>
                View proof <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <button type="button" onClick={() => onProof(a)} className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.text} hover:underline`}>
                <ImageIcon className="h-3.5 w-3.5" /> View proof{a.proof.length > 1 ? ` (${a.proof.length})` : ''}
              </button>
            )}
          </div>
        )}
      </motion.article>
    </motion.li>
  );
}

export default function Achievements() {
  const [viewing, setViewing] = useState(null);
  const close = useCallback(() => setViewing(null), []);
  return (
    <section id="achievements" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Achievements" subtitle="Rankings, hackathons and competitions that mark the journey so far." />
        <ul className="flex flex-wrap justify-center gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} a={a} index={i} onProof={setViewing} />
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {viewing && <ProofViewer title={viewing.title} items={viewing.proof} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
