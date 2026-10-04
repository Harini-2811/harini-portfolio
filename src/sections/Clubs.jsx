import { motion } from 'framer-motion';
import { Code2, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import clubs from '../data/clubs.json';

export default function Clubs() {
  return (
    <section id="clubs" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Clubs" subtitle="Community and teamwork beyond the classroom." />

        <ul className="mx-auto grid max-w-3xl gap-6">
          {clubs.map((club) => (
            <motion.li
              key={club.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <article className="glass card-hover relative overflow-hidden rounded-3xl p-7 sm:p-9">

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-5">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-ink-600 bg-ink-800 text-accent-primary">
                      <Users className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-mono text-2xl font-semibold tracking-wider sm:text-3xl">{club.name}</h3>
                      <p className="mt-1 text-slate-400">{club.status}</p>
                    </div>
                  </div>

                  {club.active && (
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-sm font-medium text-emerald-300 sm:self-center">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-emerald-400" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </span>
                      Currently Active
                    </span>
                  )}
                </div>

                <div className="relative mt-7 flex flex-wrap items-center gap-3 border-t border-ink-700 pt-6">
                  <span className="chip text-accent-secondary">
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {club.team}
                  </span>
                  <p className="text-sm text-slate-300">{club.description}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
