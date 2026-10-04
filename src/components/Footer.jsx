import { ArrowUp } from 'lucide-react';
import profile from '../data/profile.json';
import links from '../data/links.json';
import { BrandIcon } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-ink-700 bg-ink-950/70 backdrop-blur-sm">
      <div className="container-page py-12 text-center">
        <blockquote className="mx-auto max-w-2xl font-display text-lg leading-relaxed text-slate-200 sm:text-xl">
          “{profile.quote}”
        </blockquote>
        <p className="mt-3 font-mono text-sm text-accent-primary/80">— {profile.name}</p>

        <ul className="mt-8 flex justify-center gap-3">
          {links.socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target={s.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-ink-600 text-slate-400 transition hover:-translate-y-0.5 hover:border-accent-primary/40 hover:text-accent-primary"
              >
                <BrandIcon id={s.id} className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-700 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <a href="#home" className="inline-flex items-center gap-2 text-slate-400 transition hover:text-accent-primary">
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
