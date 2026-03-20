import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Cpu, BarChart2, Video, Utensils, GraduationCap, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DIVISIONS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getCsrfTokenAction } from '@/app/actions';
import type { Division } from '@/types';

export const metadata: Metadata = {
  title: 'Divisions',
  description: 'Tujuh divisi AIT Group — dari Industrial IoT hingga Social Impact & Philanthropy.',
};

const ICON_MAP = {
  'cpu': Cpu, 'bar-chart-2': BarChart2, 'video': Video,
  'utensils': Utensils, 'graduation-cap': GraduationCap,
  'heart': Heart, 'map-pin': MapPin,
} as const;

// Visual gradient per division
const DIV_VISUALS: Record<string, { gradient: string; pattern: string; emoji: string }> = {
  'industrial-iot':    { gradient: 'from-[#0e2a5a] to-[#061428]', pattern: '⚡', emoji: '🏭' },
  'data-intelligence': { gradient: 'from-[#063d3b] to-[#031e1d]', pattern: '📊', emoji: '🧠' },
  'creative-media':    { gradient: 'from-[#3d2200] to-[#1e1000]', pattern: '🎬', emoji: '🎨' },
  'fb-ventures':       { gradient: 'from-[#3d1800] to-[#1e0a00]', pattern: '🍜', emoji: '🍽️' },
  'edutech':           { gradient: 'from-[#062040] to-[#030e1f]', pattern: '📚', emoji: '🎓' },
  'social-impact':     { gradient: 'from-[#0a1e44] to-[#050e22]', pattern: '❤️', emoji: '🕌' },
  'spiritual-travel':  { gradient: 'from-[#2a1800] to-[#120a00]', pattern: '✈️', emoji: '🕋' },
};

const TIER_LABELS = { 1: 'Core Business', 2: 'Growth', 3: 'Ventures' } as const;
const TIER_COLORS = {
  1: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10',
  2: 'text-tech-blue border-tech-blue/30 bg-tech-blue/10',
  3: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10',
} as const;

function DivisionCard({ division }: { readonly division: Division }) {
  const Icon = ICON_MAP[division.icon as keyof typeof ICON_MAP];
  const visual = DIV_VISUALS[division.slug] ?? { gradient: 'from-navy-mid to-navy-patih', pattern: '🔷', emoji: '✨' };

  return (
    <Link
      href={`/divisions/${division.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-400 hover:-translate-y-1"
    >
      {/* Visual header */}
      <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', visual.gradient)}>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }}/>
        {/* Emoji watermark */}
        <div className="absolute right-6 top-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none">
          {visual.emoji}
        </div>
        {/* Glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: `linear-gradient(to top, ${division.colorAccent}25, transparent)` }}/>
        {/* Icon + tier */}
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{ background: division.colorAccent + '20', borderColor: division.colorAccent + '40' }}>
            {Icon && <Icon size={18} style={{ color: division.colorAccent }}/>}
          </div>
          <span className={cn('text-[10px] font-mono px-2.5 py-1 rounded-full border', TIER_COLORS[division.tier])}>
            T{division.tier} · {TIER_LABELS[division.tier]}
          </span>
        </div>
        {/* Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowUpRight size={18} className="text-white/60"/>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5" style={{ background: 'rgba(7,17,31,0.95)' }}>
        <h3 className="font-heading text-white text-base leading-tight mb-1.5 group-hover:text-white transition-colors" style={{ fontWeight: 700 }}>
          {division.name}
        </h3>
        <p className="text-xs font-mono italic mb-3" style={{ color: division.colorAccent + 'aa' }}>
          {division.tagline}
        </p>
        <p className="text-sm text-white/50 leading-relaxed flex-1 line-clamp-2">
          {division.description}
        </p>
        {/* Products count */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs font-mono text-white/25">
            {division.products.length} product{division.products.length !== 1 ? 's' : ''}
          </span>
          <span className="text-xs font-mono" style={{ color: division.colorAccent + 'bb' }}>
            {division.targetMarket.split('—')[0]?.trim()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function DivisionsPage() {
  const csrfToken = await getCsrfTokenAction();
  const tier1 = DIVISIONS.filter(d => d.tier === 1);
  const tier2 = DIVISIONS.filter(d => d.tier === 2);
  const tier3 = DIVISIONS.filter(d => d.tier === 3);

  return (
    <>
      <Navbar />
      <main style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 50%,#020810 100%)' }}>
        {/* Hero */}
        <section className="pt-36 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="section-tag mb-5">Our Divisions</div>
          <h1 className="font-heading text-5xl md:text-6xl text-white leading-tight mb-5" style={{ fontWeight: 800 }}>
            Seven Pillars of <span className="text-gradient-blue">Innovation</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Tujuh divisi yang saling terhubung dalam satu ekosistem data AIT —
            setiap keputusan bisnis diperkuat oleh AI dan analytics.
          </p>
        </section>

        {/* Tier 1 */}
        <section className="pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-teal-intelligence"/>
            <span className="text-xs font-mono tracking-widest text-teal-intelligence uppercase">Tier 1 — Core Business · Revenue Engine</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tier1.map(d => <DivisionCard key={d.id} division={d}/>)}
          </div>
        </section>

        {/* Tier 2 */}
        <section className="pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-tech-blue"/>
            <span className="text-xs font-mono tracking-widest text-tech-blue uppercase">Tier 2 — Growth Business</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tier2.map(d => <DivisionCard key={d.id} division={d}/>)}
          </div>
        </section>

        {/* Tier 3 */}
        <section className="pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-gold-patih"/>
            <span className="text-xs font-mono tracking-widest text-gold-patih uppercase">Tier 3 — Ventures & Impact</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tier3.map(d => <DivisionCard key={d.id} division={d}/>)}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{ background: 'linear-gradient(135deg,#0a1e44 0%,#061830 50%,#071020 100%)', border: '1px solid rgba(14,165,160,0.2)' }}>
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px' }}/>
            <div className="relative z-10">
              <div className="section-tag justify-center mb-4">Partner With Us</div>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 800 }}>
                Which Division Fits <span className="text-gradient-blue">Your Needs?</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
                Dari monitoring industri, platform data AI, hingga layanan kreatif — kami siap mendiskusikan solusi terbaik untuk bisnis Anda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-heading tracking-wider uppercase transition-all hover:-translate-y-px"
                  style={{ fontWeight: 600, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}>
                  Diskusi Kebutuhan Anda
                  <ArrowRight size={16}/>
                </Link>
                <Link href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-gold-patih text-sm font-heading tracking-wider uppercase border border-gold-patih/40 transition-all hover:bg-gold-patih/10"
                  style={{ fontWeight: 600 }}>
                  Lihat Semua Produk
                  <ArrowUpRight size={16}/>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer csrfToken={csrfToken}/>
    </>
  );
}
