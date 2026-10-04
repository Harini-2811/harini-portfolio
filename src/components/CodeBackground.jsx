import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const SNIPPETS = [
  "const build = () => ship();",
  'SELECT * FROM dreams;',
  'model.fit(X, y)',
  'while (true) learn();',
  'useEffect(() => {}, []);',
  'npm run dev',
  "app.get('/api', handler);",
  "import React from 'react';",
  'def make_it_count():',
  "git commit -m 'ship'",
  '> portfolio.init()',
  '{ }',
  '</>',
];
const COLORS = ['127,166,240', '96,128,190', '148,163,184']; // steel blue, navy blue, slate

/** Falling code snippets on a canvas, kept at 8-15% opacity so text stays readable. */
export default function CodeBackground() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let drops = [];
    let frame;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999 };

    const makeDrop = (randomY) => ({
      text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20 - Math.random() * 200,
      speed: 10 + Math.random() * 22, // px per second
      size: 11 + Math.floor(Math.random() * 3),
      alpha: 0.08 + Math.random() * 0.20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 640 ? 12 : width < 1024 ? 20 : 30; // lighter on mobile
      drops = Array.from({ length: count }, () => makeDrop(true));
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (const d of drops) {
        if (!reduce) d.y += d.speed * dt;
        if (d.y > height + 20) Object.assign(d, makeDrop(false));
        const dist = Math.hypot(d.x + 60 - pointer.x, d.y - pointer.y);
        const boost = dist < 160 ? (1 - dist / 160) * 0.12 : 0;
        ctx.font = `${d.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${d.color},${d.alpha + boost})`;
        ctx.fillText(d.text, d.x, d.y);
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduce) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* black-to-navy backdrop with two soft navy pools of light */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(1100px 650px at 85% -10%, rgba(29, 55, 112, 0.30), transparent 62%)',
            'radial-gradient(900px 600px at -10% 105%, rgba(20, 38, 82, 0.32), transparent 60%)',
            'linear-gradient(180deg, #03050A 0%, #060B18 55%, #0A1328 100%)',
          ].join(', '),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
