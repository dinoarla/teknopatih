'use client';

import Link from 'next/link';
import { ArrowUpRight, Cpu, BarChart2, Video, Utensils, GraduationCap, Heart, MapPin } from 'lucide-react';
import { DIVISIONS } from '@/lib/data';
import { cn, getDivisionColorVariant } from '@/lib/utils';
import type { Division } from '@/types';

const ICON_MAP: Readonly<Record<string, React.ComponentType<{ size?: number; className?: string }>>> = {
  'cpu': Cpu, 'bar-chart-2': BarChart2, 'video': Video,
  'utensils': Utensils, 'graduation-cap': GraduationCap,
  'heart': Heart, 'map-pin': MapPin,
} as const;

// Each division gets a unique gradient like the Meepo screenshot cards
const CARD_GRADIENTS: Readonly<Record<string, string>> = {
  'industrial-iot':    'linear-gradient(135deg,#1a4080 0%,#0e285a 100%)',
  'data-intelligence': 'linear-gradient(135deg,#0a5a58 0%,#063d3b 100%)',
  'creative-media':    'linear-gradient(135deg,#7a4b10 0%,#4a2c08 100%)',
  'fb-ventures':       'linear-gradient(135deg,#7a3a10 0%,#4a1f05 100%)',
  'edutech':           'linear-gradient(135deg,#0a4a6e 0%,#062f47 100%)',
  'social-impact':     'linear-gradient(135deg,#1a3a7a 0%,#0e2252 100%)',
  'spiritual-travel':  'linear-gradient(135deg,#6a4010 0%,#3e2506 100%)',
} as const;

const CARD_GLOW: Readonly<Record<string, string>> = {
  'industrial-iot':    'rgba(30,90,168,0.5)',
  'data-intelligence': 'rgba(14,165,160,0.5)',
  'creative-media':    'rgba(212,168,67,0.4)',
  'fb-ventures':       'rgba(212,100,30,0.4)',
  'edutech':           'rgba(14,120,180,0.4)',
  'social-impact':     'rgba(30,90,168,0.5)',
  'spiritual-travel':  'rgba(180,120,30,0.4)',
} as const;

// ============================================================
// Individual Division Card — Meepo-inspired icon card
// ============================================================
interface DivisionCardProps {
  readonly division: Division;
  readonly large?: boolean;
}

function DivisionCard({ division, large = false }: DivisionCardProps) {
  const Icon = ICON_MAP[division.icon];
  const gradient = CARD_GRADIENTS[division.slug] ?? 'linear-gradient(135deg,#1a2a4a,#0a1628)';
  const glow     = CARD_GLOW[division.slug]     ?? 'rgba(30,90,168,0.4)';

  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group flex flex-col gap-4"
      aria-label={division.name}
    >
      {/* Icon box */}
      <div
        className={cn(
          'relative w-full overflow-hidden transition-all duration-500',
          large ? 'h-44 md:h-52 rounded-2xl' : 'h-36 rounded-2xl'
        )}
        style={{ background: gradient }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ boxShadow: `inset 0 0 40px ${glow}` }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Top-right shine */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.07]"
          style={{ background: 'radial-gradient(circle at top right, white, transparent 70%)' }} />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.1)', boxShadow: `0 8px 32px ${glow}` }}
          >
            {Icon && <Icon size={large ? 30 : 26} className="text-white" />}
          </div>
        </div>

        {/* Tier badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.3)' }}
          >
            T{division.tier}
          </span>
        </div>

        {/* Arrow on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowUpRight size={16} className="text-white/70" />
        </div>
      </div>

      {/* Label */}
      <div>
        <h3
          className={cn(
            'font-heading text-white leading-tight mb-1 group-hover:text-teal-intelligence transition-colors duration-300',
            large ? 'text-base' : 'text-sm'
          )}
          style={{ fontWeight: 700 }}
        >
          {division.name}
        </h3>
        <p className="text-xs text-white/40 leading-relaxed line-clamp-2 font-body">
          {division.tagline}
        </p>
      </div>
    </Link>
  );
}

// ============================================================
// Section
// ============================================================
export function DivisionsSection() {
  const tier1    = DIVISIONS.filter(d => d.tier === 1);
  const tier2and3 = DIVISIONS.filter(d => d.tier !== 1);

  return (
    <section className="relative py-28 bg-navy-patih" aria-label="Our Divisions">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* Subtle space bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.025]"
          style={{ background: 'radial-gradient(circle, #1E5AA8 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-tag mb-5">Seven Pillars</div>
          <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-5" style={{ fontWeight: 800 }}>
            Less Silos.{' '}
            <span className="text-gradient-blue">More Synergy.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Tujuh divisi yang saling terhubung dalam satu ekosistem data —
            setiap keputusan bisnis diperkuat oleh AI dan analytics.
          </p>
        </div>

        {/* Tier 1 — 2 large cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {tier1.map(d => <DivisionCard key={d.id} division={d} large />)}
        </div>

        {/* Tier 2 & 3 — 5 smaller cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {tier2and3.map(d => <DivisionCard key={d.id} division={d} />)}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 text-sm font-heading text-teal-intelligence hover:text-white transition-colors group"
            style={{ fontWeight: 600 }}
          >
            View all divisions in detail
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
