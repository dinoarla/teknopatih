'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { TIMELINE } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================================
// Solar System Timeline
// Central "sun" = AIT founding. Each milestone = a planet
// orbiting at increasing radius. Click a planet to reveal info.
// ============================================================

const PLANET_CONFIG = [
  { size: 14, orbitR: 90,  color: '#1E5AA8', speed: 0.0006, label: '2013' },
  { size: 11, orbitR: 140, color: '#0EA5A0', speed: 0.0004, label: '2015' },
  { size: 10, orbitR: 188, color: '#5B9AF5', speed: 0.0003, label: '2017' },
  { size: 13, orbitR: 240, color: '#0EA5A0', speed: 0.00022,label: '2019' },
  { size: 16, orbitR: 296, color: '#D4A843', speed: 0.00016,label: '2021' },
  { size: 10, orbitR: 350, color: '#1E5AA8', speed: 0.00012,label: '2023' },
  { size: 12, orbitR: 404, color: '#0EA5A0', speed: 0.00009,label: '2026' },
] as const;

type PlanetIndex = 0|1|2|3|4|5|6;

function SolarCanvas({
  active,
  onSelect,
}: {
  active: PlanetIndex;
  onSelect: (i: PlanetIndex) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const anglesRef = useRef<number[]>(PLANET_CONFIG.map((_, i) => (i * Math.PI * 2) / PLANET_CONFIG.length));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SIZE = Math.min(window.innerWidth * 0.95, 860);
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2, cy = SIZE / 2;
    const scale = SIZE / 860;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      /* --- Orbit rings --- */
      PLANET_CONFIG.forEach((p, i) => {
        const r = p.orbitR * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = i === active
          ? 'rgba(14,165,160,0.25)'
          : 'rgba(255,255,255,0.05)';
        ctx.lineWidth = i === active ? 1.2 : 0.7;
        ctx.setLineDash(i === active ? [] : [3, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* --- Sun --- */
      const sunR = 28 * scale;
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3);
      sunGlow.addColorStop(0,   'rgba(212,168,67,0.35)');
      sunGlow.addColorStop(0.4, 'rgba(212,168,67,0.12)');
      sunGlow.addColorStop(1,   'rgba(212,168,67,0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath(); ctx.arc(cx, cy, sunR * 3, 0, Math.PI * 2); ctx.fill();

      const sunGrad = ctx.createRadialGradient(cx - sunR*0.3, cy - sunR*0.3, 0, cx, cy, sunR);
      sunGrad.addColorStop(0,   '#fde68a');
      sunGrad.addColorStop(0.5, '#D4A843');
      sunGrad.addColorStop(1,   '#92400e');
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad; ctx.fill();

      // Sun label
      ctx.fillStyle  = 'rgba(255,255,255,0.5)';
      ctx.font       = `bold ${10 * scale}px monospace`;
      ctx.textAlign  = 'center';
      ctx.fillText('AIT', cx, cy + 3 * scale);

      /* --- Planets --- */
      PLANET_CONFIG.forEach((p, i) => {
        anglesRef.current[i] += p.speed;
        const a  = anglesRef.current[i];
        const r  = p.orbitR * scale;
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        const ps = p.size * scale * (i === active ? 1.4 : 1);

        /* Glow halo on active */
        if (i === active) {
          const halo = ctx.createRadialGradient(px, py, 0, px, py, ps * 3);
          halo.addColorStop(0,   p.color + '60');
          halo.addColorStop(1,   p.color + '00');
          ctx.fillStyle = halo;
          ctx.beginPath(); ctx.arc(px, py, ps * 3, 0, Math.PI * 2); ctx.fill();
        }

        /* Planet body */
        const pGrad = ctx.createRadialGradient(px - ps*0.3, py - ps*0.3, 0, px, py, ps);
        pGrad.addColorStop(0, p.color + 'ff');
        pGrad.addColorStop(1, p.color + '88');
        ctx.beginPath(); ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = pGrad; ctx.fill();

        /* Year label */
        ctx.fillStyle  = i === active ? 'white' : 'rgba(255,255,255,0.45)';
        ctx.font       = `${i === active ? 'bold ' : ''}${9 * scale}px monospace`;
        ctx.textAlign  = 'center';
        ctx.fillText(p.label, px, py - ps - 5 * scale);

        /* Click target stored as dataset */
        (canvas as any)[`planet_${i}`] = { px, py, ps: ps + 12 };
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const handleClick = (e: MouseEvent) => {
      const rect  = canvas.getBoundingClientRect();
      const mx    = e.clientX - rect.left;
      const my    = e.clientY - rect.top;
      for (let i = 0; i < PLANET_CONFIG.length; i++) {
        const p = (canvas as any)[`planet_${i}`];
        if (!p) continue;
        const dx = mx - p.px, dy = my - p.py;
        if (Math.sqrt(dx*dx + dy*dy) < p.ps) { onSelect(i as PlanetIndex); break; }
      }
    };
    canvas.addEventListener('click', handleClick);
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener('click', handleClick); };
  }, [active, onSelect]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto cursor-pointer max-w-full"
      style={{ touchAction: 'none' }}
      aria-label="Solar system timeline — click a planet to see milestone"
    />
  );
}

export function TimelineSection() {
  const [active, setActive] = useState<PlanetIndex>(0);
  const item = TIMELINE[active];

  const handleSelect = useCallback((i: PlanetIndex) => setActive(i), []);

  return (
    <section className="relative py-28 overflow-hidden" aria-label="Timeline">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#030e1f 0%,#020810 100%)' }} />

      {/* Star dust */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="section-tag justify-center mb-5">Our Journey</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight" style={{ fontWeight: 800 }}>
            13 Years of Building{' '}
            <span className="text-gradient-gold">from Pontianak</span>
          </h2>
          <p className="text-white/35 text-sm font-mono mt-3 tracking-wide">
            Klik planet untuk melihat milestone
          </p>
        </div>

        {/* Solar system canvas */}
        <div className="relative">
          <SolarCanvas active={active} onSelect={handleSelect} />
        </div>

        {/* Active milestone detail */}
        <div className="max-w-xl mx-auto -mt-8 relative z-20">
          <div
            className="rounded-2xl border p-8 text-center transition-all duration-500"
            style={{
              background: 'rgba(10,22,40,0.85)',
              backdropFilter: 'blur(16px)',
              borderColor: PLANET_CONFIG[active].color + '40',
              boxShadow: `0 0 40px ${PLANET_CONFIG[active].color}22`,
            }}
          >
            <div className="section-tag justify-center mb-3">{item?.year}</div>
            <h3 className="font-heading text-xl text-white mb-3" style={{ fontWeight: 700 }}>
              {item?.title}
            </h3>
            <p className="text-white/55 text-base leading-relaxed">{item?.description}</p>
            {item?.milestone && (
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{ background: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.25)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-gold-patih" style={{ animation: 'pulse 2s infinite' }} />
                <span className="text-xs font-mono text-gold-patih">Major Milestone</span>
              </div>
            )}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-center gap-3 mt-6">
            {TIMELINE.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i as PlanetIndex)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === active ? PLANET_CONFIG[i].color : 'rgba(255,255,255,0.15)',
                  transform: i === active ? 'scale(1.5)' : 'scale(1)',
                }}
                aria-label={`Jump to ${TIMELINE[i]?.year}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
