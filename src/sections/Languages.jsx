import { motion } from 'framer-motion';
import { Languages as LanguagesIcon } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import languages from '../data/languages.json';

const LEVELS = 5; // LinkedIn-style scale: elementary → native

export default function Languages() {
  return (
    <section id="languages" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Languages Known" />

        <ul className="grid max-w-4xl gap-6 sm:grid-cols-2">
          {languages.map((lang, i) => (
            <motion.li
              key={lang.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="glass card-hover rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-ink-600 bg-ink-800 text-accent-primary">
                  <LanguagesIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{lang.name}</h3>
                  <p className="text-sm text-slate-300">{lang.level}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-1.5" role="img" aria-label={`${lang.level}: ${lang.score} of ${LEVELS}`}>
                {Array.from({ length: LEVELS }, (_, n) => (
                  <motion.span
                    key={n}
                    className={`h-1.5 flex-1 origin-left rounded-full ${
                      n < lang.score ? 'bg-accent-primary' : 'bg-ink-600'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + n * 0.08 }}
                  />
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
