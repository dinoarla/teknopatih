'use client';

import { useRef, useEffect, useState } from 'react';
import { TIMELINE, BRAND } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================================
// Timeline Section — Company History 2013–now
// ============================================================

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TIMELINE.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      aria-label="Company Timeline"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-mid via-navy-patih to-navy-mid" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="section-tag justify-center mb-5">
            Our Journey
          </div>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-white leading-tight">
            13 Years of Building{' '}
            <span className="text-gradient-gold">from Pontianak</span>
          </h2>
        </div>

        {/* Timeline track */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-[22px] left-0 right-0 h-px bg-white/[0.08]" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-tech-blue to-teal-intelligence transition-all duration-700"
              style={{ width: `${((activeIndex + 1) / TIMELINE.length) * 100}%` }}
            />
          </div>

          {/* Year markers */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-4">
            {TIMELINE.map((item, index) => (
              <button
                key={item.year}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative flex flex-col items-center text-center group cursor-pointer',
                  'transition-all duration-300'
                )}
                aria-label={`${item.year}: ${item.title}`}
              >
                {/* Node */}
                <div
                  className={cn(
                    'relative z-10 w-10 h-10 lg:w-11 lg:h-11 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-500',
                    index === activeIndex
                      ? 'border-teal-intelligence bg-teal-intelligence/20 scale-125 shadow-glow-teal'
                      : index < activeIndex
                      ? 'border-tech-blue/60 bg-tech-blue/10'
                      : 'border-white/15 bg-white/5'
                  )}
                >
                  {item.milestone && (
                    <div
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all duration-300',
                        index === activeIndex ? 'bg-teal-intelligence' : index < activeIndex ? 'bg-tech-blue/60' : 'bg-white/20'
                      )}
                    />
                  )}
                </div>

                {/* Year */}
                <span
                  className={cn(
                    'text-sm font-mono font-600 mb-1.5 transition-colors duration-300',
                    index === activeIndex ? 'text-teal-intelligence' : index < activeIndex ? 'text-white/60' : 'text-white/25'
                  )}
                >
                  {item.year}
                </span>

                {/* Title + description (visible on mobile always, on desktop only when active) */}
                <div className={cn(
                  'lg:absolute lg:top-16 lg:w-36 transition-all duration-300',
                  index === activeIndex ? 'opacity-100' : 'opacity-0 lg:opacity-40'
                )}>
                  <p className={cn(
                    'text-xs font-heading font-600 mb-1 transition-colors',
                    index === activeIndex ? 'text-white' : 'text-white/40'
                  )}>
                    {item.title}
                  </p>
                  <p className={cn(
                    'text-xs leading-relaxed transition-colors hidden lg:block',
                    index === activeIndex ? 'text-white/55' : 'text-transparent'
                  )}>
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active item detail card — mobile & expanded */}
          <div className="mt-12 lg:mt-28">
            {TIMELINE.map((item, index) => (
              <div
                key={item.year}
                className={cn(
                  'transition-all duration-500',
                  index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'
                )}
                aria-live="polite"
              >
                {index === activeIndex && (
                  <div className="glass-card p-8 max-w-2xl mx-auto text-center">
                    <div className="section-tag justify-center mb-3">{item.year}</div>
                    <h3 className="font-heading font-700 text-xl text-white mb-3">{item.title}</h3>
                    <p className="text-white/55 text-base leading-relaxed">{item.description}</p>
                    {item.milestone && (
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-patih/10 border border-gold-patih/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-patih animate-pulse-slow" />
                        <span className="text-xs font-mono text-gold-patih">Major Milestone</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
