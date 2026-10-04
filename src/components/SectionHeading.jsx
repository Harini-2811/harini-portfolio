import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';

export default function SectionHeading({ title, subtitle, align = 'left' }) {
  const centered = align === 'center';
  return (
    <Reveal className={`mb-12 max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <h2 className="inline-block text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
        <motion.span
          aria-hidden="true"
          className="mt-3 block h-1 w-full origin-left rounded-full bg-gradient-to-r from-accent-primary to-accent-tertiary"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </h2>
      {subtitle && <p className="mt-4 leading-relaxed text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}
