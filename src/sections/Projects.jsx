import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, ExternalLink, FileText, Globe, Layers, Sparkles, X } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { BrandIcon } from '../components/Icons.jsx';
import projects from '../data/projects.json';

const FILTERS = ['All', 'AI/ML', 'Full Stack', 'Web', 'Other'];
const SNIPPET = {
  'AI/ML': 'model.fit(X, y)\npredict(demand)\n> recommend()',
  Web: 'JSON.parse(input)\nformat(json, 2)\n> anonymise()',
  'Full Stack': "app.get('/api')\nfetch(url)\n> ship()",
  Other: 'while (true) learn();',
};
const CATEGORY_ICON = { 'AI/ML': BrainCircuit, 'Full Stack': Layers, Web: Globe, Other: Sparkles };

function Thumbnail({ project, className = '' }) {
  if (project.thumbnail) {
    return <img src={project.thumbnail} alt={`Screenshot of ${project.title}`} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />;
  }
  const C = CATEGORY_ICON[project.category] ?? Sparkles;
  return (
    <div className={`relative grid h-full w-full place-items-center overflow-hidden bg-ink-800 ${className}`}>
      <pre aria-hidden="true" className="absolute inset-0 p-4 font-mono text-[10px] leading-4 text-accent-primary/25">
        {SNIPPET[project.category] ?? SNIPPET.Other}
      </pre>
      <C className="relative h-12 w-12 text-white/80" aria-hidden="true" />
    </div>
  );
}

function CaseStudy({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const cs = project.caseStudy ?? {};
  return createPortal(
    <motion.div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-ink-600 bg-ink-900 sm:rounded-3xl"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="aspect-[16/7]">
          <Thumbnail project={project} />
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink-950/80 text-slate-200 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          <span className="chip border-accent-secondary/30 text-accent-secondary">{project.category}</span>
          <h3 id="case-title" className="mt-3 text-2xl font-bold">{project.title}</h3>

          <dl className="mt-6 space-y-5 text-sm leading-relaxed sm:text-base">
            {cs.problem && (
              <div>
                <dt className="font-semibold text-white">Problem</dt>
                <dd className="mt-1 text-slate-400">{cs.problem}</dd>
              </div>
            )}
            {cs.role && (
              <div>
                <dt className="font-semibold text-white">My role</dt>
                <dd className="mt-1 text-slate-400">{cs.role}</dd>
              </div>
            )}
            <div>
              <dt className="font-semibold text-white">Tech used</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </dd>
            </div>
            {cs.approach?.length > 0 && (
              <div>
                <dt className="font-semibold text-white">Approach</dt>
                <dd className="mt-1">
                  <ul className="list-disc space-y-1 pl-5 text-slate-400 marker:text-accent-primary">
                    {cs.approach.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </dd>
              </div>
            )}
            {cs.outcome && (
              <div>
                <dt className="font-semibold text-white">Outcome</dt>
                <dd className="mt-1 text-slate-400">{cs.outcome}</dd>
              </div>
            )}
          </dl>

          {cs.screenshots?.length > 0 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {cs.screenshots.map((src, i) => (
                <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" className="rounded-xl border border-ink-600" />
              ))}
            </div>
          )}

          <ProjectLinks project={project} className="mt-8" />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ProjectLinks({ project, className = '' }) {
  if (!project.github && !project.live) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {project.github && (
        <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost px-4 py-2">
          <BrandIcon id="github" className="h-4 w-4" /> GitHub
        </a>
      )}
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary px-4 py-2">
          <ExternalLink className="h-4 w-4" /> Live Demo
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const closeCase = useCallback(() => setOpen(null), []);
  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Projects" subtitle="What I've built, and how I built it." />

        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f ? 'text-ink-950' : 'text-slate-300 hover:text-white'
              }`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-accent-primary" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              {f}
            </button>
          ))}
        </div>

        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
              >
                <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="aspect-video overflow-hidden">
                    <Thumbnail project={p} className="transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-medium text-accent-secondary">{p.category}</span>
                    <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <li key={t} className="rounded-md border border-ink-700 bg-ink-800 px-2 py-0.5 font-mono text-[11px] text-slate-300">{t}</li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <button type="button" onClick={() => setOpen(p)} className="btn btn-ghost px-3.5 py-2 text-xs">
                        <FileText className="h-3.5 w-3.5" /> Case Study
                      </button>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost px-3.5 py-2 text-xs" aria-label={`${p.title} on GitHub`}>
                          <BrandIcon id="github" className="h-3.5 w-3.5" /> GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary px-3.5 py-2 text-xs" aria-label={`${p.title} live demo`}>
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-ink-600 p-10 text-center text-slate-400">
            No {filter} projects yet. Try another filter.
          </p>
        )}
      </div>

      <AnimatePresence>{open && <CaseStudy project={open} onClose={closeCase} />}</AnimatePresence>
    </section>
  );
}
