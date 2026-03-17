import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Cpu, BarChart2, Video, Utensils, GraduationCap, Heart, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DIVISIONS } from '@/lib/data';
import { cn, getDivisionColorVariant } from '@/lib/utils';
import { getCsrfTokenAction } from '@/app/actions';
import type { Division } from '@/types';

export const metadata: Metadata = {
  title: 'Divisions',
  description: 'Eksplorasi 7 divisi AIT Group — dari Industrial IoT hingga Social Impact.',
};

const ICON_MAP = {
  'cpu': Cpu, 'bar-chart-2': BarChart2, 'video': Video,
  'utensils': Utensils, 'graduation-cap': GraduationCap,
  'heart': Heart, 'map-pin': MapPin,
} as const;

type IconKey = keyof typeof ICON_MAP;

function DivisionRow({ division }: { readonly division: Division }) {
  const Icon = ICON_MAP[division.icon as IconKey];
  const variant = getDivisionColorVariant(division.colorAccent);

  const colorStyle = {
    blue: { bg: 'bg-tech-blue/10', border: 'border-tech-blue/25', text: 'text-tech-blue' },
    teal: { bg: 'bg-teal-intelligence/10', border: 'border-teal-intelligence/25', text: 'text-teal-intelligence' },
    gold: { bg: 'bg-gold-patih/10', border: 'border-gold-patih/25', text: 'text-gold-patih' },
    navy: { bg: 'bg-white/5', border: 'border-white/10', text: 'text-white' },
  }[variant];

  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group flex items-start gap-6 p-6 rounded-2xl border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-all group-hover:scale-110', colorStyle.bg, colorStyle.border)}>
        {Icon && <Icon size={20} className={colorStyle.text} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-heading font-700 text-white group-hover:text-white text-lg">{division.name}</h3>
          <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/70 shrink-0 mt-1 transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <p className="text-sm italic text-white/40 mb-2 font-mono">{division.tagline}</p>
        <p className="text-sm text-white/55 leading-relaxed mb-4">{division.description}</p>
        <div className="flex flex-wrap gap-3 text-xs font-mono">
          <span className="text-white/30">Revenue: <span className="text-white/50">{division.revenueModel}</span></span>
          <span className="text-white/20">·</span>
          <span className="text-white/30">Market: <span className="text-white/50">{division.targetMarket.split('—')[0]?.trim()}</span></span>
        </div>
      </div>
    </Link>
  );
}

export default async function DivisionsPage() {
  const csrfToken = await getCsrfTokenAction();
  const tier1 = DIVISIONS.filter((d) => d.tier === 1);
  const tier2 = DIVISIONS.filter((d) => d.tier === 2);
  const tier3 = DIVISIONS.filter((d) => d.tier === 3);

  return (
    <>
      <Navbar />
      <main className="bg-navy-patih pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="section-tag mb-5">All Divisions</div>
            <h1 className="font-heading font-800 text-5xl md:text-6xl text-white leading-tight mb-5">
              Seven Pillars of <span className="text-gradient-blue">AIT Group</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Setiap divisi beroperasi secara mandiri dengan identitas unik,
              namun terhubung satu sama lain dalam ekosistem data AIT.
            </p>
          </div>

          {/* Tier 1 */}
          <div className="mb-12">
            <h2 className="text-xs font-mono tracking-widest uppercase text-teal-intelligence mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-teal-intelligence" />
              Tier 1 — Core Business (Revenue Engine)
            </h2>
            <div className="space-y-4">
              {tier1.map((d) => <DivisionRow key={d.id} division={d} />)}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-12">
            <h2 className="text-xs font-mono tracking-widest uppercase text-tech-blue mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-tech-blue" />
              Tier 2 — Growth Business
            </h2>
            <div className="space-y-4">
              {tier2.map((d) => <DivisionRow key={d.id} division={d} />)}
            </div>
          </div>

          {/* Tier 3 */}
          <div>
            <h2 className="text-xs font-mono tracking-widest uppercase text-gold-patih mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-gold-patih" />
              Tier 3 — Ventures & Impact
            </h2>
            <div className="space-y-4">
              {tier3.map((d) => <DivisionRow key={d.id} division={d} />)}
            </div>
          </div>
        </div>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
