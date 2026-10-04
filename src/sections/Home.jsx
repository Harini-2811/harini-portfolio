import { motion } from 'framer-motion';
import { Download, Send, Sparkles } from 'lucide-react';
import { BrandIcon } from '../components/Icons.jsx';
import useTyping from '../hooks/useTyping.js';
import { scrollToSection, useSite } from '../context/SiteContext.jsx';
import profile from '../data/profile.json';
import links from '../data/links.json';

const ease = [0.16, 1, 0.3, 1];
const item = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

function Portrait() {
  const { startTour } = useSite();
  return (
    <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[380px]">
      <div className="relative aspect-square">
        {/* slow dashed orbit: the one moving element around the photo */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-4 animate-ring rounded-full border border-dashed border-accent-primary/45 sm:-inset-5" />
        <div aria-hidden="true" className="pointer-events-none absolute -inset-[3px] rounded-full border border-ink-600" />
        <img
          src="/images/harini.webp"
          alt="Portrait of Harini V wearing her Easwari Engineering College lanyard"
          width="640"
          height="640"
          fetchpriority="high"
          decoding="async"
          className="relative h-full w-full rounded-full bg-ink-900 object-cover"
        />
      </div>

      {/* guided tour prompt */}
      <motion.div {...item(1.1)} className="mt-9 flex justify-center">
        <button
          type="button"
          onClick={startTour}
          className="chip gap-2 px-4 py-2 text-sm text-slate-200 transition hover:border-accent-primary/50 hover:text-white"
        >
          <Sparkles className="h-4 w-4 text-accent-primary" />
          Show me around
        </button>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const { ready, setHover } = useSite();
  const typed = useTyping(profile.roles);
  const hoverProps = (key) => ({
    onMouseEnter: () => setHover(key),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(key),
    onBlur: () => setHover(null),
  });

  if (!ready) return <section id="home" className="min-h-[100svh]" />;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center pb-20 pt-28 lg:pt-24">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* text column */}
          <div className="order-2 lg:order-1">
            <motion.h1 {...item(0.15)} className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Hi, I'm {profile.name}
            </motion.h1>
            <motion.p
              {...item(0.35)}
              className="mt-5 min-h-[2rem] font-mono text-base text-slate-200 sm:text-xl"
              aria-label={profile.roles.join(', ')}
            >
              <span aria-hidden="true">
                {typed}
                <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-caret bg-accent-primary" />
              </span>
            </motion.p>
            <motion.p {...item(0.45)} className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {profile.subtext}
            </motion.p>

            <motion.figure
              {...item(0.6)}
              className="mt-8 max-w-xl rounded-r-2xl border-l-2 border-accent-primary bg-ink-900/80 px-5 py-4"
            >
              <blockquote className="font-display text-base leading-relaxed text-slate-200 sm:text-lg">
                “{profile.quote}”
              </blockquote>
            </motion.figure>

            <motion.div {...item(0.75)} className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('projects')} {...hoverProps('projects')}>
                View Projects
              </button>
              <a href={links.resume} download="Harini_V_Resume.pdf" className="btn btn-ghost" {...hoverProps('resume')}>
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('contact')} {...hoverProps('contact')}>
                <Send className="h-4 w-4" /> Contact Me
              </button>
            </motion.div>

            <motion.ul {...item(0.9)} className="mt-7 flex gap-3">
              {links.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target={s.id === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-ink-600 bg-ink-900 text-slate-300 transition hover:-translate-y-0.5 hover:border-accent-primary/60 hover:text-accent-primary"
                    {...hoverProps(s.id)}
                  >
                    <BrandIcon id={s.id} />
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* photo column: above the text on mobile */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <Portrait />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
