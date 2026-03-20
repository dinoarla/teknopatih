'use client';

import { useRef, useEffect, useState } from 'react';

// ============================================================
// Founders Section
// "All of this, built by the hands and hearts of people
//  just like you and me."
// ============================================================

interface Founder {
  readonly name: string;
  readonly role: string;
  readonly title: string;
  readonly photo: string | null;
  readonly photoPosition: string;
  readonly initials: string;
  readonly color: string;
  readonly quote: string;
}

const FOUNDERS: ReadonlyArray<Founder> = [
  {
    name: 'Dino Arla',
    role: 'Founder',
    title: 'CEO',
    photo: '/founders/dino.jpg',
    photoPosition: 'center 10%',
    initials: 'DA',
    color: '#1E5AA8',
    quote: 'Data bukan sekadar angka — ia adalah cerita yang menunggu untuk didengar.',
  },
  {
    name: 'Doni Anggara',
    role: 'Co-Founder',
    title: 'CTO',
    photo: '/founders/doni.png',
    photoPosition: 'center 5%',
    initials: 'DO',
    color: '#0EA5A0',
    quote: 'Teknologi terbaik adalah yang tidak terlihat — ia hanya bekerja.',
  },
  {
    name: 'Ramzi Syabb Habibi',
    role: 'Co-Founder',
    title: 'CMO',
    photo: '/founders/ramzi.jpg',
    photoPosition: 'center 8%',
    initials: 'RS',
    color: '#D4A843',
    quote: 'Brand yang kuat lahir dari kepercayaan, bukan sekadar tampilan.',
  },
  {
    name: 'Muhamad Fatih Khairan',
    role: 'Co-Founder',
    title: 'CFO',
    photo: '/founders/fatih.jpg',
    photoPosition: 'center 12%',
    initials: 'MF',
    color: '#5B9AF5',
    quote: 'Pertumbuhan berkelanjutan dimulai dari fondasi keuangan yang kokoh.',
  },
] as const;

// ============================================================
// Founder Card
// ============================================================
interface FounderCardProps {
  readonly founder: Founder;
  readonly index: number;
  readonly isVisible: boolean;
}

function FounderCard({ founder, index, isVisible }: FounderCardProps) {
  return (
    <div
      className="group relative flex flex-col"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Photo container */}
      <div className="relative overflow-hidden rounded-2xl mb-5" style={{ aspectRatio: '3/4' }}>

        {founder.photo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder.photo}
              alt={`${founder.name} — ${founder.title}, ${founder.role}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: founder.photoPosition }}
            />
            {/* Gradient overlay bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,12,28,0.85) 0%, rgba(5,12,28,0.3) 40%, transparent 70%)',
              }}
            />
          </>
        ) : (
          /* Placeholder for CFO — cosmic avatar */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${founder.color}22 0%, #0a1628 60%, #020810 100%)`,
            }}
          >
            {/* Star field */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <ellipse cx="100" cy="100" rx="80" ry="30" stroke={founder.color} strokeWidth="0.8" fill="none" strokeDasharray="4 6" transform="rotate(-20 100 100)" />
                <ellipse cx="100" cy="100" rx="55" ry="20" stroke={founder.color} strokeWidth="0.6" fill="none" transform="rotate(-20 100 100)" />
              </svg>
            </div>
            {/* Initials avatar */}
            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-2 mb-4"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${founder.color}40, ${founder.color}15)`,
                borderColor: founder.color + '50',
                boxShadow: `0 0 30px ${founder.color}30`,
              }}
            >
              <span className="font-heading text-2xl text-white" style={{ fontWeight: 800, color: founder.color }}>
                {founder.initials}
              </span>
            </div>
            <p className="relative z-10 text-xs font-mono text-white/30 tracking-widest uppercase">
              Photo Coming Soon
            </p>
            {/* Bottom gradient to match other cards */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,12,28,0.85) 0%, transparent 60%)',
              }}
            />
          </div>
        )}

        {/* Title badge — bottom left over image */}
        <div className="absolute bottom-4 left-4 z-10">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border backdrop-blur-sm"
            style={{
              background: founder.color + '25',
              borderColor: founder.color + '50',
              color: founder.color,
            }}
          >
            <span style={{ fontWeight: 700 }}>{founder.title}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/60">{founder.role}</span>
          </div>
        </div>

        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${founder.color}50` }}
        />
      </div>

      {/* Info */}
      <h3
        className="font-heading text-white text-lg leading-tight mb-2"
        style={{ fontWeight: 700 }}
      >
        {founder.name}
      </h3>
      <p className="text-sm text-white/40 leading-relaxed italic font-body">
        "{founder.quote}"
      </p>
    </div>
  );
}

// ============================================================
// Section
// ============================================================
export function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      aria-label="Founders"
    >
      {/* Space background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#020810 0%,#030e1f 50%,#020810 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      {/* Nebula glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(30,90,168,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="section-tag justify-center mb-5">The Founders</div>
          <h2
            className="font-heading text-4xl md:text-5xl text-white leading-tight mb-5"
            style={{ fontWeight: 800 }}
          >
            Built by Hands and{' '}
            <span className="text-gradient-gold">Hearts Like Yours</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed font-body">
            All of this was built by the hands and hearts of people just like you and me —
            dreaming big from Pontianak, executing with precision for the world.
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUNDERS.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-teal-intelligence/50" />
            <p className="text-xs font-mono text-white/25 tracking-widest uppercase">
              Est. 2013 · Pontianak, Kalimantan Barat
            </p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-teal-intelligence/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
