'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS, BRAND } from '@/lib/data';

// ============================================================
// Animated Counter Hook
// ============================================================
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [start, target, duration]);
  return count;
}

// ============================================================
// Earth Horizon SVG — curved glow horizon from orbit view
// ============================================================
function EarthHorizon() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">

      {/* Deep space background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #020810 0%, #030e1f 35%, #040d1c 65%, #020810 100%)',
        }}
      />

      {/* Star field — top half */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '55px 55px',
          backgroundPosition: '0 0',
          maskImage: 'linear-gradient(to bottom, white 0%, white 40%, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 40%, transparent 75%)',
        }}
      />

      {/* Extra bright stars scattered */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)',
          backgroundSize: '130px 120px',
          backgroundPosition: '40px 20px',
          maskImage: 'linear-gradient(to bottom, white 0%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 55%)',
        }}
      />

      {/* Earth body — large ellipse bottom-center, simulating orbital view */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: '160%', maxWidth: '2200px' }}
        viewBox="0 0 2200 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {/* Earth surface gradient — blue ocean dominant */}
          <radialGradient id="earthGrad" cx="50%" cy="100%" r="80%" fx="50%" fy="120%">
            <stop offset="0%"   stopColor="#0a3a6e" />
            <stop offset="25%"  stopColor="#0d4a8a" />
            <stop offset="50%"  stopColor="#0e5a9a" />
            <stop offset="75%"  stopColor="#083060" />
            <stop offset="100%" stopColor="#040e20" />
          </radialGradient>

          {/* Atmosphere glow — thin teal-blue layer */}
          <radialGradient id="atmosGrad" cx="50%" cy="100%" r="82%" fx="50%" fy="115%">
            <stop offset="0%"   stopColor="#0EA5A0" stopOpacity="0" />
            <stop offset="72%"  stopColor="#0EA5A0" stopOpacity="0" />
            <stop offset="84%"  stopColor="#1E8FD5" stopOpacity="0.35" />
            <stop offset="90%"  stopColor="#0EA5A0" stopOpacity="0.55" />
            <stop offset="95%"  stopColor="#7ee8e5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </radialGradient>

          {/* Terminator shadow — left-side darkness */}
          <linearGradient id="terminatorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#010508" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#010508" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#010508" stopOpacity="0" />
          </linearGradient>

          {/* Horizon top glow — bright rim light */}
          <filter id="horizonGlow">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <filter id="atmosBlur">
            <feGaussianBlur stdDeviation="12"/>
          </filter>

          <clipPath id="earthClip">
            <ellipse cx="1100" cy="900" rx="1050" ry="860" />
          </clipPath>
        </defs>

        {/* ── Earth disc ── */}
        <ellipse cx="1100" cy="900" rx="1050" ry="860" fill="url(#earthGrad)" />

        {/* Cloud wisps — subtle white streaks across surface */}
        <g clipPath="url(#earthClip)" opacity="0.07">
          <ellipse cx="700"  cy="410" rx="280" ry="18" fill="white" transform="rotate(-8 700 410)" />
          <ellipse cx="1400" cy="380" rx="220" ry="14" fill="white" transform="rotate(5 1400 380)" />
          <ellipse cx="1100" cy="440" rx="180" ry="12" fill="white" transform="rotate(-3 1100 440)" />
          <ellipse cx="400"  cy="460" rx="150" ry="10" fill="white" transform="rotate(10 400 460)" />
          <ellipse cx="1800" cy="430" rx="160" ry="11" fill="white" transform="rotate(-6 1800 430)" />
        </g>

        {/* Terminator (day/night boundary) */}
        <ellipse cx="1100" cy="900" rx="1050" ry="860" fill="url(#terminatorGrad)" />

        {/* Atmosphere halo — applied over the disc edge */}
        <ellipse cx="1100" cy="900" rx="1050" ry="860" fill="url(#atmosGrad)" />

        {/* Atmosphere blur glow outside disc */}
        <ellipse
          cx="1100" cy="900" rx="1058" ry="868"
          fill="none"
          stroke="#1fbfba"
          strokeWidth="14"
          opacity="0.18"
          filter="url(#atmosBlur)"
        />

        {/* Bright horizon rim line */}
        <ellipse
          cx="1100" cy="900" rx="1050" ry="860"
          fill="none"
          stroke="url(#rimGrad)"
          strokeWidth="2.5"
          filter="url(#horizonGlow)"
        />

        {/* City lights on dark side — tiny golden dots */}
        <g clipPath="url(#earthClip)" opacity="0.55">
          {[
            [320, 420], [360, 450], [290, 400], [305, 435],
            [380, 410], [340, 460], [270, 415], [350, 430],
            [250, 445], [310, 470], [395, 395], [275, 460],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2 : 1.2} fill="#D4A843" opacity={0.6 + (i % 4) * 0.1} />
          ))}
        </g>

        <defs>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0EA5A0" stopOpacity="0.1" />
            <stop offset="30%"  stopColor="#7ee8e5" stopOpacity="0.6" />
            <stop offset="50%"  stopColor="#aff5f3" stopOpacity="0.9" />
            <stop offset="70%"  stopColor="#7ee8e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0EA5A0" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Soft fade at very top of section to blend into previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, #020810, transparent)' }}
      />

      {/* Soft fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to top, #020810, transparent)' }}
      />
    </div>
  );
}

// ============================================================
// Stat Card
// ============================================================
interface StatCardProps {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly prefix?: string;
  readonly shouldStart: boolean;
  readonly delay: number;
}

function StatCard({ label, value, suffix, prefix, shouldStart, delay }: StatCardProps) {
  const count = useCountUp(value, 2000 + delay, shouldStart);
  return (
    <div className="text-center group">
      <div className="relative inline-block mb-2">
        <span className="text-5xl md:text-6xl font-heading text-white" style={{ fontWeight: 800 }}>
          {prefix && <span className="text-gold-patih">{prefix}</span>}
          {count}
          <span className="text-teal-intelligence">{suffix}</span>
        </span>
      </div>
      <p className="text-sm font-body text-white/45 tracking-wide">{label}</p>
    </div>
  );
}

// ============================================================
// Stats Section
// ============================================================
export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Earth horizon background */}
      <EarthHorizon />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Tag */}
        <div className="text-center mb-14">
          <span className="section-tag justify-center">By The Numbers</span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              shouldStart={isVisible}
              delay={i * 150}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 gold-line" />

        {/* Core values */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {BRAND.values.map((val) => {
            const shortLabel = val.split(' — ')[0] ?? val;
            return (
              <div key={val} className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-lg bg-teal-intelligence/10 border border-teal-intelligence/20 flex items-center justify-center transition-all group-hover:bg-teal-intelligence/20">
                  <span className="text-xs font-mono text-teal-intelligence" style={{ fontWeight: 600 }}>
                    {shortLabel.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-body text-white/50 group-hover:text-white/75 transition-colors">
                  {shortLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
