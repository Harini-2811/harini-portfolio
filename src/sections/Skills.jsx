import { motion } from 'framer-motion';
import { MessageCircle, Presentation, Puzzle, Users } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { BrandIcon, Icon } from '../components/Icons.jsx';
import skills from '../data/skills.json';

// Small coloured glyphs for each technology (kept local: no extra icon downloads)
const TECH = {
  Java: { glyph: 'J', color: '#F89820' },
  Python: { glyph: 'Py', color: '#FFD43B' },
  JavaScript: { glyph: 'JS', color: '#F7DF1E' },
  'C++': { glyph: 'C++', color: '#659AD2' },
  C: { glyph: 'C', color: '#A8B9CC' },
  HTML: { glyph: '</>', color: '#E34F26' },
  CSS: { glyph: '{}', color: '#2965F1' },
  React: { glyph: '⚛', color: '#61DAFB' },
  'Node.js': { glyph: 'N', color: '#5FA04E' },
  MySQL: { glyph: 'SQL', color: '#4479A1' },
  Git: { glyph: 'git', color: '#F05032' },
};
const SOFT = { Teamwork: Users, Communication: MessageCircle, 'Problem-Solving': Puzzle, Presentation };

function SkillGlyph({ name }) {
  const base = 'grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] font-mono text-[11px] font-bold';
  if (name === 'GitHub') {
    return (
      <span className={`${base} text-white`}>
        <BrandIcon id="github" className="h-4 w-4" />
      </span>
    );
  }
  if (SOFT[name]) {
    const C = SOFT[name];
    return (
      <span className={`${base} text-accent-tertiary`}>
        <C className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }
  const t = TECH[name] ?? { glyph: name[0], color: '#A855F7' };
  return (
    <span className={base} style={{ color: t.color }} aria-hidden="true">
      {t.glyph}
    </span>
  );
}

const ORBIT = ['Java', 'Python', 'JavaScript', 'C++', 'C'];

function Orbit() {
  return (
    <div aria-hidden="true" className="relative mx-auto mb-12 mr-6 hidden h-48 w-48 lg:block">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-8 rounded-full border border-white/[0.05]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent-primary/25 to-accent-secondary/25 font-mono text-lg font-bold text-white ring-1 ring-white/10">
          {'{ }'}
        </span>
      </div>
      <div className="absolute inset-0 animate-orbit">
        {ORBIT.map((name, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2;
          return (
            <div
              key={name}
              className="absolute"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%`, transform: 'translate(-50%,-50%)' }}
            >
              <div className="animate-orbit-rev rounded-lg bg-ink-900 ring-1 ring-white/10">
                <SkillGlyph name={name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading title="Skills" subtitle="The languages, tools and habits I build with." />
          <Orbit />
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <motion.li
              key={group.category}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass card-hover rounded-2xl p-6"
            >
              <h3 className="flex items-center gap-3 text-base font-semibold">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-primary/10 text-accent-primary">
                  <Icon name={group.icon} className="h-[18px] w-[18px]" />
                </span>
                {group.category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {group.skills.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-ink-950/50 py-1 pl-1 pr-3 text-sm text-slate-200 transition hover:border-accent-primary/40 hover:shadow-[0_0_18px_-4px_rgba(168,85,247,0.5)]"
                  >
                    <SkillGlyph name={name} />
                    {name}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
