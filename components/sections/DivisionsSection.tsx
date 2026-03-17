'use client';

import Link from 'next/link';
import { ArrowUpRight, Cpu, BarChart2, Video, Utensils, GraduationCap, Heart, MapPin } from 'lucide-react';
import { DIVISIONS } from '@/lib/data';
import { cn, getDivisionColorVariant } from '@/lib/utils';
import type { Division } from '@/types';

// ============================================================
// Icon map – Open/Closed principle (extend without modifying)
// ============================================================

const ICON_MAP: Readonly<Record<string, React.ComponentType<{ size?: number; className?: string }>>> = {
  'cpu': Cpu,
  'bar-chart-2': BarChart2,
  'video': Video,
  'utensils': Utensils,
  'graduation-cap': GraduationCap,
  'heart': Heart,
  'map-pin': MapPin,
} as const;

const TIER_LABELS: Readonly<Record<1 | 2 | 3, string>> = {
  1: 'Core Business',
  2: 'Growth',
  3: 'Ventures',
} as const;

const TIER_COLORS: Readonly<Record<1 | 2 | 3, string>> = {
  1: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10',
  2: 'text-tech-blue border-tech-blue/30 bg-tech-blue/10',
  3: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10',
} as const;

// ============================================================
// Division Card
// ============================================================

interface DivisionCardProps {
  readonly division: Division;
  readonly featured?: boolean;
}

function DivisionCard({ division, featured = false }: DivisionCardProps) {
  const IconComponent = ICON_MAP[division.icon];
  const colorVariant = getDivisionColorVariant(division.colorAccent);

  return (
    <Link
      href={`/divisions/${division.slug}`}
      className={cn(
        'glass-card group relative flex flex-col overflow-hidden',
        'p-6 h-full cursor-pointer',
        featured ? 'md:p-8' : ''
      )}
      aria-label={`${division.name} — ${division.tagline}`}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${division.colorAccent}12 0%, transparent 60%)`,
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300',
            'group-hover:scale-110',
            colorVariant === 'blue' && 'bg-tech-blue/10 border-tech-blue/25',
            colorVariant === 'teal' && 'bg-teal-intelligence/10 border-teal-intelligence/25',
            colorVariant === 'gold' && 'bg-gold-patih/10 border-gold-patih/25',
          )}
        >
          {IconComponent && (
            <IconComponent
              size={18}
              className={cn(
                colorVariant === 'blue' && 'text-tech-blue',
                colorVariant === 'teal' && 'text-teal-intelligence',
                colorVariant === 'gold' && 'text-gold-patih',
              )}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={cn('tier-badge text-[10px]', TIER_COLORS[division.tier])}>
            Tier {division.tier} · {TIER_LABELS[division.tier]}
          </span>
          <ArrowUpRight
            size={16}
            className="text-white/20 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3
          className={cn(
            'font-heading font-700 text-white mb-2 group-hover:text-white transition-colors',
            featured ? 'text-xl' : 'text-base'
          )}
        >
          {division.name}
        </h3>
        <p className="text-xs font-mono text-white/40 mb-3 italic">{division.tagline}</p>
        <p className="text-sm text-white/55 leading-relaxed flex-1">
          {division.description.length > 100
            ? division.description.slice(0, 100) + '…'
            : division.description}
        </p>

        {/* Products count */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-mono text-white/30">
            {division.products.length} product{division.products.length !== 1 ? 's' : ''}
          </span>
          <span
            className="text-xs font-mono"
            style={{ color: division.colorAccent + 'cc' }}
          >
            {division.targetMarket.split('—')[0]?.trim()}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// Divisions Section
// ============================================================

export function DivisionsSection() {
  const tier1 = DIVISIONS.filter((d) => d.tier === 1);
  const tier2and3 = DIVISIONS.filter((d) => d.tier !== 1);

  return (
    <section className="relative py-28 bg-navy-patih" aria-label="Our Divisions">
      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="section-tag mb-5">Our Divisions</div>
          <h2 className="font-heading font-800 text-4xl md:text-5xl text-white leading-tight mb-5">
            Seven Pillars of{' '}
            <span className="text-gradient-blue">Innovation</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Dari Industrial IoT hingga Social Impact — ekosistem bisnis AIT Group
            saling terhubung dan diperkuat oleh data.
          </p>
        </div>

        {/* Tier 1 — Featured larger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {tier1.map((division) => (
            <DivisionCard key={division.id} division={division} featured />
          ))}
        </div>

        {/* Tier 2 & 3 — Standard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {tier2and3.map((division) => (
            <div key={division.id} className={cn(division.tier === 2 ? 'lg:col-span-2' : 'lg:col-span-1')}>
              <DivisionCard division={division} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 text-sm font-heading font-600 text-teal-intelligence hover:text-white transition-colors group"
          >
            View all divisions in detail
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
