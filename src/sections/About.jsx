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

        {/* Two columns on desktop: the headline statement + education on the left,
            the story + focus areas on the right. Stats run full width underneath. */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="max-w-[22ch] font-display text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-[2.1rem] lg:leading-[1.25]">
                {profile.about.lead}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-start gap-4 glass rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-600 bg-ink-800 text-accent-primary">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-white">{profile.education.college}</p>
                  <p className="mt-0.5 text-sm text-slate-300">{profile.education.degree}</p>
                  <p className="mt-1 text-sm text-slate-400">{profile.education.period}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1}>
              <p className="max-w-[65ch] text-base leading-[1.85] text-slate-300 sm:text-[1.0625rem]">
                {profile.about.body}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Focus areas">
                {profile.about.tags.map((t) => (
                  <li key={t} className="chip text-accent-secondary">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profile.aboutStats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i} className="glass card-hover rounded-2xl p-5 sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dd aria-hidden="true" className="mt-1.5 text-sm text-slate-400">
                {s.label}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
