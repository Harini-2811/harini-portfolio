import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { BrandIcon } from '../components/Icons.jsx';
import profile from '../data/profile.json';
import links from '../data/links.json';

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID;
const EMPTY = { name: '', email: '', subject: '', message: '', _gotcha: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.';
  if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.';
  return e;
}

function Field({ id, label, error, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        className={`field ${textarea ? 'min-h-[140px] resize-y' : ''} ${error ? 'border-rose-400/60' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (!FORM_ID) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-page">
        <SectionHeading title="Let's connect" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-slate-300">{profile.contactStatement}</p>
            <ul className="mt-8 space-y-3">
              {links.socials.filter((s) => links.contactSection.includes(s.id)).map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target={s.id === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="glass group flex items-center gap-4 rounded-2xl p-4 transition hover:border-accent-primary/30"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-primary/10 text-accent-primary transition group-hover:scale-110">
                      <BrandIcon id={s.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate-400">{s.label}</span>
                      <span className="block truncate font-medium text-white">{s.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span
                    className="grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/40"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  >
                    <Check className="h-10 w-10" />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-bold">Message sent</h3>
                  <p className="mt-2 max-w-xs text-slate-400">Thank you for reaching out. I'll reply to your email soon.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost mt-6">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" value={values.name} onChange={update} error={errors.name} autoComplete="name" />
                    <Field id="email" label="Email" type="email" value={values.email} onChange={update} error={errors.email} autoComplete="email" />
                  </div>
                  <Field id="subject" label="Subject" value={values.subject} onChange={update} error={errors.subject} />
                  <Field id="message" label="Message" textarea value={values.message} onChange={update} error={errors.message} />
                  {/* honeypot field: hidden from people, catches spam bots */}
                  <input type="text" name="_gotcha" value={values._gotcha} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  {status === 'error' && (
                    <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200" role="alert">
                      {FORM_ID ? 'Your message could not be sent. Check your connection and try again, or email ' : 'The contact form is not connected yet. Please email '}
                      <a href={`mailto:${links.email}`} className="font-semibold underline">{links.email}</a>.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full sm:w-auto">
                    {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
