import { GraduationCap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import profile from '../data/profile.json';

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="About Me" />

        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[340px]">
            <div className="relative aspect-square">
              <div aria-hidden="true" className="absolute -inset-[3px] animate-ring rounded-full bg-[conic-gradient(from_0deg,#A855F7,#C084FC,#E879F9,#A855F7)] opacity-80" />
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-accent-secondary/10 blur-3xl" />
              <img
                src="/images/harini.webp"
                alt="Portrait of Harini V wearing her Easwari Engineering College lanyard"
                width="640"
                height="640"
                loading="lazy"
                decoding="async"
                className="relative h-full w-full rounded-full border-4 border-ink-950 object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[68ch] text-base leading-[1.8] text-slate-300 sm:text-lg">
                <strong className="font-display font-semibold text-white">{profile.about.lead}</strong>{' '}
                {profile.about.body}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex items-start gap-4 rounded-2xl border border-accent-primary/20 bg-accent-primary/[0.06] p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-primary/15 text-accent-secondary">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-white">{profile.education.college}</p>
                  <p className="text-sm text-slate-300">{profile.education.degree}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{profile.education.period}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {profile.about.tags.map((t) => (
                  <li key={t} className="chip border-accent-primary/20 text-accent-primary">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {profile.aboutStats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i} className="glass card-hover rounded-2xl p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-white">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                  <dd aria-hidden="true" className="mt-1 text-sm text-slate-400">
                    {s.label}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
