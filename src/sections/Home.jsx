import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Download, Send, Sparkles } from 'lucide-react';
import Avatar from '../components/Avatar.jsx';
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

function AvatarStage() {
  const { message, hover, setHover, waveKey, wave, ready, startTour, tour } = useSite();
  const reduce = useReducedMotion();
  const [waving, setWaving] = useState(false);
  const [petted, setPetted] = useState(false);
  const stageRef = useRef(null);

  // 3D tilt following the pointer
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  useEffect(() => {
    if (!ready) return;
    setWaving(true);
    const t = setTimeout(() => setWaving(false), 3300);
    return () => clearTimeout(t);
  }, [ready, waveKey]);

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = stageRef.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  const pet = () => {
    wave();
    setPetted(true);
    setHover('avatar');
    setTimeout(() => {
      setPetted(false);
      setHover(null);
    }, 2200);
  };

  const happy = petted || Boolean(hover);

  return (
    <div className="relative mx-auto w-full max-w-[290px] sm:max-w-[380px] lg:max-w-[400px]" style={{ perspective: 1000 }}>
      {/* speech bubble */}
      <div className="absolute -top-2 left-0 z-20 sm:-left-4">
        <AnimatePresence mode="wait">
          {ready && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              className="glass relative max-w-[230px] rounded-2xl rounded-bl-sm px-4 py-3 text-sm leading-snug text-slate-100 shadow-[0_10px_40px_-12px_rgba(168,85,247,0.45)]"
            >
              {message}
              <span className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b border-r border-white/[0.07] bg-ink-900/70" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* glowing rotating ring */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] bottom-[2%] top-[17%] rounded-full">
        <div className="absolute inset-0 animate-ring rounded-full border-2 border-dashed border-accent-primary/25" />
        <div className="absolute -inset-6 rounded-full bg-accent-primary/10 blur-3xl" />
      </div>

      <motion.button
        ref={stageRef}
        type="button"
        onClick={pet}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onMouseEnter={() => setHover('avatar')}
        onMouseLeave={() => !petted && setHover(null)}
        aria-label="Say hi to Harini's avatar"
        className="relative block w-full cursor-pointer rounded-full"
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Avatar portal waving={waving} mood={happy ? 'happy' : 'idle'} className="h-auto w-full" />
      </motion.button>

      {/* guided tour prompt */}
      <motion.div {...item(1.1)} className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={startTour}
          className="chip gap-2 px-4 py-2 text-sm text-slate-200 transition hover:border-accent-primary/40 hover:text-white"
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
              Hi, I'm <span className="gradient-text">{profile.name}</span>
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
            <motion.p {...item(0.45)} className="mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {profile.subtext}
            </motion.p>

            <motion.figure
              {...item(0.6)}
              className="mt-8 max-w-xl rounded-2xl border-l-2 border-accent-secondary/70 bg-white/[0.03] px-5 py-4"
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
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:-translate-y-0.5 hover:border-accent-primary/40 hover:text-accent-primary"
                    {...hoverProps(s.id)}
                  >
                    <BrandIcon id={s.id} />
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* avatar column: above the text on mobile */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <AvatarStage />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
