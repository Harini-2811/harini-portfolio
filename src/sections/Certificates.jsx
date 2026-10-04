import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Calendar, Maximize2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProofViewer from '../components/ProofViewer.jsx';
import certificates from '../data/certificates.json';

export default function Certificates() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="certificates" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Certificates" subtitle="Courses I've completed to deepen my fundamentals." />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpen(c)}
                  className="relative aspect-[16/10] overflow-hidden bg-ink-800"
                  aria-label={`View ${c.title} certificate`}
                >
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink-950/70 text-white opacity-0 ring-1 ring-ink-600 transition group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-accent-primary px-2.5 py-1 text-xs font-semibold text-ink-950">
                    {c.highlight}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-sm font-medium text-accent-secondary">
                    <Award className="h-4 w-4" aria-hidden="true" /> {c.issuer}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{c.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> {c.date}
                    </span>
                    <button type="button" onClick={() => setOpen(c)} className="text-sm font-medium text-accent-secondary hover:underline">
                      View certificate
                    </button>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <ProofViewer
            title={open.title}
            items={[{ type: 'image', src: open.image, caption: `${open.issuer}, ${open.date}` }]}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
