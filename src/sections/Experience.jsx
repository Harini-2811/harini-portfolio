import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import experience from '../data/experience.json';

function DateChip({ item, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-accent-primary sm:text-sm ${className}`}>
      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
      <time>{item.start}</time> – <time>{item.end}</time>
    </span>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Experience" subtitle="Real work, shipped with real teams." />

        <div ref={listRef} className="relative mx-auto max-w-4xl">
          {/* track + self-drawing line: left on mobile, centre on desktop */}
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-white/[0.06] md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-0 w-[2px] origin-top bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-tertiary md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: line }}
          />

          <ol className="space-y-12">
            {experience.map((item, i) => (
              <li key={item.id} className="relative grid grid-cols-[24px_1fr] gap-5 md:grid-cols-[1fr_48px_1fr] md:gap-0">
                {/* card (left column on desktop) */}
                <motion.article
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glass card-hover col-start-2 row-start-1 rounded-2xl p-6 md:col-start-1 md:mr-6"
                >
                  {/* on mobile the date sits on the right of the card header */}
                  <div className="mb-3 flex justify-end md:hidden">
                    <DateChip item={item} />
                  </div>
                  <h3 className="text-lg font-semibold sm:text-xl">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-accent-secondary">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{item.description}</p>
                </motion.article>

                {/* dot on the line */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px 0px' }}
                  className="col-start-1 row-start-1 flex justify-center pt-7 md:col-start-2"
                >
                  <motion.span
                    variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.05 * i }}
                    className="relative grid h-6 w-6 place-items-center rounded-full border-2 border-accent-primary bg-ink-950"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent-primary" />
                  </motion.span>
                </motion.div>

                {/* date on the RIGHT side of the line (desktop) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden pt-7 md:col-start-3 md:row-start-1 md:ml-6 md:block"
                >
                  <DateChip item={item} className="rounded-full border border-accent-primary/20 bg-accent-primary/[0.06] px-3 py-1.5" />
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
