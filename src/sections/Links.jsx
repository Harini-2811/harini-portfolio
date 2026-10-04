import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { BrandIcon } from '../components/Icons.jsx';
import { useSite } from '../context/SiteContext.jsx';
import links from '../data/links.json';

export default function Links() {
  const { setHover } = useSite();
  return (
    <section id="links" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Links" subtitle="Where to find my code and my coding profile." />

        <ul className="grid max-w-4xl gap-6 sm:grid-cols-2">
          {links.linksSection.map((l, i) => (
            <motion.li
              key={l.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHover(l.id)}
                onMouseLeave={() => setHover(null)}
                className="glass card-hover group flex h-full items-start gap-5 rounded-2xl p-6"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-primary/25 to-accent-tertiary/20 text-white ring-1 ring-accent-primary/30 transition group-hover:scale-110">
                  <BrandIcon id={l.id} className="h-7 w-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl font-semibold text-white">{l.label}</span>
                    <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-secondary" />
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-sm text-accent-secondary">{l.handle}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-slate-400">{l.description}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
