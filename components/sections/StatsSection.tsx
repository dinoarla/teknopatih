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
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [start, target, duration]);

  return count;
}

// ============================================================
// Individual stat card
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
    <div
      className="text-center group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative inline-block mb-2">
        <span className="text-5xl md:text-6xl font-heading font-800 text-white">
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-patih via-navy-mid to-navy-patih" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[2px] bg-gradient-to-r from-transparent via-teal-intelligence/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tag */}
        <div className="text-center mb-14">
          <span className="section-tag justify-center">
            By The Numbers
          </span>
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

        {/* Divider line */}
        <div className="mt-16 gold-line" />

        {/* Core values */}
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {BRAND.values.map((val) => {
            const [letter, ...rest] = val.split(' — ');
            const shortLabel = letter ?? val;
            return (
              <div key={val} className="flex items-center gap-2.5 group">
                <div className="w-7 h-7 rounded-lg bg-teal-intelligence/10 border border-teal-intelligence/20 flex items-center justify-center transition-all group-hover:bg-teal-intelligence/20">
                  <span className="text-xs font-mono font-600 text-teal-intelligence">
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
