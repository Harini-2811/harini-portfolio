import { useEffect, useId, useRef, useState } from 'react';

/*
  Hand-built anime-style avatar with soft 3D shading, modelled on Harini's photo:
  shoulder-length black hair with a centre part, dark turtleneck, blue college
  lanyard and pearl earrings. Pure SVG + CSS, so it is sharp at any size and light.

  Props
  - mood: 'idle' | 'happy'   (happy = smiling closed eyes + head tilt)
  - waving: boolean          (raises the arm and waves)
  - portal: boolean          (draws the glowing circle she "pops out" of)
  - viewBox: string          (crop, e.g. a head-only view for the mini companion)
*/

function useLook(svgRef) {
  const [look, setLook] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = svgRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.42);
        const dist = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, dist / 320);
        setLook({ x: (dx / dist) * 4.5 * k, y: (dy / dist) * 3.5 * k });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [svgRef]);
  return look;
}

function Eye({ cx, flip = false, look, happy, uid }) {
  const s = flip ? -1 : 1;
  const px = (v) => cx + s * v;
  const cy = 204;

  if (happy) {
    return (
      <g>
        <path
          d={`M ${px(-16)},${cy + 4} Q ${cx},${cy - 14} ${px(16)},${cy + 4}`}
          stroke="#1b1311"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path d={`M ${px(-17)},${cy + 1} L ${px(-25)},${cy - 4}`} stroke="#1b1311" strokeWidth="3.2" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g className={`av-eye ${flip ? 'r' : ''}`}>
      <ellipse cx={cx} cy={cy} rx="19" ry="23" fill="#FFFFFF" />
      <g clipPath={`url(#${uid}-eye-${flip ? 'r' : 'l'})`}>
        <g className="av-iris" style={{ transform: `translate(${look.x}px, ${look.y}px)` }}>
          <ellipse cx={cx} cy={cy + 3} rx="14.5" ry="18" fill={`url(#${uid}-iris)`} />
          <ellipse cx={cx} cy={cy + 5} rx="6" ry="7.5" fill="#120905" />
          <circle cx={cx - 5} cy={cy - 5} r="4.8" fill="#FFFFFF" />
          <circle cx={cx + 5.5} cy={cy + 10} r="2.2" fill="#FFFFFF" opacity="0.85" />
        </g>
        {/* lid shadow for depth */}
        <ellipse cx={cx} cy={cy - 23} rx="23" ry="9" fill="#8a4f35" opacity="0.18" />
      </g>
      <path
        d={`M ${px(-21)},${cy - 8} C ${px(-16)},${cy - 25} ${px(16)},${cy - 28} ${px(22)},${cy - 11}`}
        stroke="#1b1311"
        strokeWidth="4.6"
        strokeLinecap="round"
        fill="none"
      />
      <path d={`M ${px(-19)},${cy - 12} L ${px(-28)},${cy - 18}`} stroke="#1b1311" strokeWidth="3.4" strokeLinecap="round" />
      <path
        d={`M ${px(-13)},${cy + 20} C ${px(-6)},${cy + 25} ${px(7)},${cy + 25} ${px(14)},${cy + 19}`}
        stroke="#7a4630"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </g>
  );
}

export default function Avatar({ mood = 'idle', waving = false, portal = false, viewBox = '0 0 400 460', className = '', title = 'Illustrated avatar of Harini' }) {
  const svgRef = useRef(null);
  const look = useLook(svgRef);
  const uid = `av${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const happy = mood === 'happy';
  const ref = (name) => `url(#${uid}-${name})`;

  return (
    <svg ref={svgRef} viewBox={viewBox} className={className} role="img" aria-label={title}>
      <defs>
        <radialGradient id={`${uid}-skin`} cx="42%" cy="36%" r="72%">
          <stop offset="0" stopColor="#E7AE86" />
          <stop offset="0.55" stopColor="#CB8A62" />
          <stop offset="1" stopColor="#A06443" />
        </radialGradient>
        <linearGradient id={`${uid}-skinDark`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8F5537" />
          <stop offset="1" stopColor="#B87650" />
        </linearGradient>
        <linearGradient id={`${uid}-hair`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E2840" />
          <stop offset="0.6" stopColor="#17141F" />
          <stop offset="1" stopColor="#0E0C14" />
        </linearGradient>
        <radialGradient id={`${uid}-sweater`} cx="50%" cy="10%" r="90%">
          <stop offset="0" stopColor="#2A2238" />
          <stop offset="1" stopColor="#0D0A15" />
        </radialGradient>
        <radialGradient id={`${uid}-iris`} cx="50%" cy="72%" r="70%">
          <stop offset="0" stopColor="#B07040" />
          <stop offset="0.55" stopColor="#5A321B" />
          <stop offset="1" stopColor="#1E110A" />
        </radialGradient>
        <radialGradient id={`${uid}-pearl`} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#DCE0EA" />
          <stop offset="1" stopColor="#9AA3B8" />
        </radialGradient>
        <radialGradient id={`${uid}-blush`}>
          <stop offset="0" stopColor="#FF7F9A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF7F9A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-portal`} cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#4A2F7A" />
          <stop offset="0.7" stopColor="#24164A" />
          <stop offset="1" stopColor="#120B22" />
        </radialGradient>
        <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A855F7" />
          <stop offset="1" stopColor="#C084FC" />
        </linearGradient>
        <clipPath id={`${uid}-eye-l`}>
          <ellipse cx="168" cy="204" rx="19" ry="23" />
        </clipPath>
        <clipPath id={`${uid}-eye-r`}>
          <ellipse cx="232" cy="204" rx="19" ry="23" />
        </clipPath>
        {/* circle at the bottom, open at the top: she pops out of the portal */}
        <clipPath id={`${uid}-pop`}>
          <circle cx="200" cy="268" r="182" />
          <rect x="0" y="-60" width="400" height="328" />
        </clipPath>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.45" />
        </filter>
        {/* side lock: falls behind the ear and in front of the shoulder */}
        <g id={`${uid}-side`}>
          <path
            d="M148,124 C128,148 118,190 116,234 C114,278 106,318 84,346 C110,354 132,338 142,312 C150,290 156,250 156,220 L156,124 Z"
            fill={ref('hair')}
          />
          <path d="M126,250 C124,280 116,306 102,326" stroke="#C084FC" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
        {/* fringe: sweeps from the centre part over the temple */}
        <g id={`${uid}-fringe`}>
          <path
            d="M200,88 C170,88 144,102 132,128 C123,150 121,174 125,196 C130,176 137,160 147,146 C160,128 182,116 200,114 Z"
            fill={ref('hair')}
          />
          <path d="M156,112 C146,128 142,150 145,176 C151,156 160,140 174,128 Z" fill={ref('hair')} />
          <path d="M180,100 C164,108 152,122 145,142" stroke="#C084FC" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      </defs>

      {portal && (
        <g>
          <circle cx="200" cy="268" r="182" fill={ref('portal')} />
          <circle cx="200" cy="268" r="182" fill="none" stroke={ref('ring')} strokeWidth="3" opacity="0.9" />
        </g>
      )}

      <g clipPath={portal ? ref('pop') : undefined} filter={ref('soft')}>
        {/* ---------- back hair ---------- */}
        <g className={`av-head ${happy ? 'tilt' : ''}`}>
          <path
            d="M200,56 C116,56 78,116 80,190 C82,250 92,300 74,346 C98,356 120,344 132,326 L268,326 C280,344 302,356 326,346 C308,300 318,250 320,190 C322,116 284,56 200,56 Z"
            fill={ref('hair')}
          />
          <path
            d="M80,190 C82,250 92,300 74,346"
            stroke="#A855F7"
            strokeOpacity="0.28"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M320,190 C318,250 308,300 326,346"
            stroke="#C084FC"
            strokeOpacity="0.32"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* ---------- body ---------- */}
        <path d="M178,258 L178,306 C190,316 210,316 222,306 L222,258 Z" fill={ref('skinDark')} />
        <ellipse cx="200" cy="282" rx="26" ry="11" fill="#6E3B24" opacity="0.45" />
        <path
          d="M56,470 C56,394 88,352 140,338 C160,332 172,320 178,306 C190,320 210,320 222,306 C228,320 240,332 260,338 C312,352 344,394 344,470 Z"
          fill={ref('sweater')}
        />
        {/* turtleneck collar */}
        <path d="M171,296 C171,284 229,284 229,296 L231,318 C214,330 186,330 169,318 Z" fill="#1C1628" />
        <path d="M182,292 L181,322 M193,290 L193,326 M207,290 L207,326 M218,292 L219,322" stroke="#2E2442" strokeWidth="1.5" />
        {/* lanyard */}
        <path d="M180,324 L160,470" stroke="#2F5BD3" strokeWidth="12" strokeLinecap="round" />
        <path d="M220,324 L240,470" stroke="#2F5BD3" strokeWidth="12" strokeLinecap="round" />
        <path d="M180,330 L161,470 M220,330 L239,470" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="1.6" strokeDasharray="5 4" />
        <circle cx="170" cy="392" r="4" fill="#F5C542" opacity="0.9" />
        <circle cx="230" cy="392" r="4" fill="#F5C542" opacity="0.9" />
        {/* shoulder rim light */}
        <path d="M66,420 C76,374 104,352 146,340" stroke="#A855F7" strokeOpacity="0.4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M334,420 C324,374 296,352 254,340" stroke="#C084FC" strokeOpacity="0.45" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* ---------- head ---------- */}
        <g className={`av-head ${happy ? 'tilt' : ''}`}>
          <use href={`#${uid}-side`} />
          <use href={`#${uid}-side`} transform="translate(400 0) scale(-1 1)" />
          {/* ears with hair tucked behind, pearl earrings */}
          <ellipse cx="129" cy="212" rx="10" ry="14" fill="#C9875F" />
          <path d="M126,205 C122,210 123,218 128,221" stroke="#9A5C3E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="271" cy="212" rx="10" ry="14" fill="#BC7A52" />
          <path d="M274,205 C278,210 277,218 272,221" stroke="#8F5537" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="127" cy="230" r="4.6" fill={ref('pearl')} />
          <circle cx="273" cy="230" r="4.6" fill={ref('pearl')} />
          <path
            d="M126,182 C126,120 162,96 200,96 C238,96 274,120 274,182 C274,232 246,268 200,276 C154,268 126,232 126,182 Z"
            fill={ref('skin')}
            stroke="#8A5236"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          {/* rim light on the cheek */}
          <path d="M266,166 C272,196 266,232 246,260" stroke="#C084FC" strokeOpacity="0.35" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* eyebrows */}
          <path d="M150,168 C158,161 173,160 183,164" stroke="#1B1311" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M250,168 C242,161 227,160 217,164" stroke="#1B1311" strokeWidth="3.4" strokeLinecap="round" fill="none" />

          <Eye cx={168} look={look} happy={happy} uid={uid} />
          <Eye cx={232} flip look={look} happy={happy} uid={uid} />

          {/* blush, nose, mouth */}
          <ellipse cx="150" cy="240" rx="17" ry="9" fill={ref('blush')} />
          <ellipse cx="250" cy="240" rx="17" ry="9" fill={ref('blush')} />
          <path d="M200,232 Q204,238 198,241" stroke="#8F5536" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" fill="none" />
          {happy ? (
            <g>
              <path d="M186,250 Q200,270 214,250 Q200,256 186,250 Z" fill="#6E1F2E" />
              <path d="M193,260 Q200,266 207,260 Q200,257 193,260 Z" fill="#EF7F8F" />
            </g>
          ) : (
            <path d="M190,254 Q200,261 210,254" stroke="#8B3A3F" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* fringe over the temples, centre part */}
          <use href={`#${uid}-fringe`} />
          <use href={`#${uid}-fringe`} transform="translate(400 0) scale(-1 1)" />
          <path d="M200,58 L200,112" stroke="#3E3654" strokeWidth="1.6" />
          {/* glossy "angel ring" highlight */}
          <path d="M156,84 C176,72 224,72 244,84" stroke="#C4B5FD" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M170,78 C186,72 214,72 230,78" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* ---------- waving arm ---------- */}
        <g className={`av-arm ${waving ? 'up' : ''}`}>
          <path d="M298,374 L344,332" stroke="#221A33" strokeWidth="36" strokeLinecap="round" />
          <g className="av-forearm">
            <path d="M344,332 L352,270" stroke="#251C38" strokeWidth="30" strokeLinecap="round" />
            <path d="M338,268 L366,272" stroke="#1A1D2E" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="337" cy="246" rx="5.5" ry="11" transform="rotate(-35 337 246)" fill="#C98660" />
            <ellipse cx="354" cy="244" rx="16" ry="19" fill="#D3936B" />
            <ellipse cx="342" cy="222" rx="5" ry="11" fill="#D89A72" />
            <ellipse cx="352" cy="218" rx="5" ry="12" fill="#DA9C74" />
            <ellipse cx="362" cy="220" rx="5" ry="11.5" fill="#D89A72" />
            <ellipse cx="370" cy="228" rx="4.6" ry="10" fill="#D3936B" />
          </g>
        </g>
      </g>
    </svg>
  );
}
