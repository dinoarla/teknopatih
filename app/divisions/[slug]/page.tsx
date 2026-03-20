import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Package, Target, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DIVISIONS } from '@/lib/data';
import { divisionSlugSchema } from '@/lib/schemas';
import { getDivisionColorVariant } from '@/lib/utils';
import { getCsrfTokenAction } from '@/app/actions';
import type { PageProps } from '@/types';

// ============================================================
// Division Detail Page – Dynamic route [slug]
// ============================================================

export async function generateStaticParams() {
  return DIVISIONS.map((div) => ({ slug: div.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = DIVISIONS.find((d) => d.slug === slug);
  if (!division) return { title: 'Division Not Found' };
  return {
    title: division.name,
    description: division.description,
  };
}

const STATUS_LABELS = {
  'active': { label: 'Active', cls: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10' },
  'beta': { label: 'Beta', cls: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10' },
  'coming-soon': { label: 'Coming Soon', cls: 'text-white/40 border-white/15 bg-white/5' },
} as const;

export default async function DivisionDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Validate slug with Zod
  const parsed = divisionSlugSchema.safeParse(slug);
  if (!parsed.success) notFound();

  const division = DIVISIONS.find((d) => d.slug === parsed.data);
  if (!division) notFound();

  const csrfToken = await getCsrfTokenAction();
  const variant = getDivisionColorVariant(division.colorAccent);

  const accentClass = {
    blue: 'text-tech-blue',
    teal: 'text-teal-intelligence',
    gold: 'text-gold-patih',
    navy: 'text-white',
  }[variant];

  const TIER_LABELS = { 1: 'Core Business', 2: 'Growth', 3: 'Ventures' } as const;

  return (
    <>
      <Navbar />
      <main className="bg-navy-patih">
        {/* Header */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${division.colorAccent} 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Link
              href="/divisions"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              All Divisions
            </Link>
            <div className="flex items-start gap-4 mb-4">
              <span className="tier-badge" style={{ color: division.colorAccent, borderColor: division.colorAccent + '40', backgroundColor: division.colorAccent + '15' }}>
                Tier {division.tier} · {TIER_LABELS[division.tier]}
              </span>
            </div>
            <h1 className={`font-heading font-800 text-5xl md:text-6xl leading-tight mb-4 ${accentClass}`}>
              {division.name}
            </h1>
            <p className="text-white/50 text-xl italic font-mono mb-6">{division.tagline}</p>
            <p className="text-white/65 text-lg max-w-2xl leading-relaxed">{division.description}</p>
          </div>
        </section>

        {/* Info grid */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: TrendingUp, label: 'Revenue Model', value: division.revenueModel },
                { icon: Target, label: 'Target Market', value: division.targetMarket },
                { icon: Package, label: 'Products', value: `${division.products.length} active product${division.products.length !== 1 ? 's' : ''}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={16} style={{ color: division.colorAccent }} />
                    <span className="text-xs font-mono tracking-widest uppercase text-white/35">{label}</span>
                  </div>
                  <p className="text-sm text-white/75 font-body">{value}</p>
                </div>
              ))}
            </div>

            {/* Products */}
            <div>
              <h2 className="font-heading font-700 text-2xl text-white mb-8">
                Products & Services
              </h2>

              {/* SIMBA featured showcase — only for industrial-iot */}
              {division.slug === 'industrial-iot' && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-white/10"
                  style={{ background: 'linear-gradient(135deg,#0e2a5a,#061428)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="p-7">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
                        style={{ background: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.3)' }}>
                        <span className="text-[10px] font-mono text-gold-patih">🏆 JUARA 2 LOMBA KARYA INOVASI PLN WKB 2017</span>
                      </div>
                      <h3 className="font-heading text-xl text-white mb-1" style={{ fontWeight: 800 }}>SIMBA</h3>
                      <p className="text-sm font-mono mb-3" style={{ color: '#5B9AF5' }}>Sistem Informasi Bahan Bakar · PLN Kapuas</p>
                      <p className="text-sm text-white/55 leading-relaxed mb-5">
                        Platform monitoring BBM real-time untuk 9 pembangkit PLN Sektor Kapuas —
                        memantau HSD & MFO dengan diagram tangki interaktif dan laporan otomatis.
                        Diimplementasikan September 2015, versi aktif 1.9.7.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {['9 Plants','1.131+ Records','HSD & MFO','Live Since 2015','v1.9.7'].map(t => (
                          <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/40">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 p-4 justify-center">
                      <img src="/products/simba-dashboard.png" alt="SIMBA Dashboard BBM"
                        className="rounded-xl border border-white/10 w-full object-cover hover:scale-[1.02] transition-transform duration-500"
                        style={{ height: '130px', objectPosition: 'top' }}/>
                      <img src="/products/simba-plant.png" alt="SIMBA Plant Diagram"
                        className="rounded-xl border border-white/10 w-full object-cover hover:scale-[1.02] transition-transform duration-500"
                        style={{ height: '100px', objectPosition: 'top' }}/>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {division.products.map((product) => {
                  const status = STATUS_LABELS[product.status];
                  return (
                    <div key={product.id} className="glass-card p-7">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-heading font-700 text-white text-lg">{product.name}</h3>
                        <span className={`tier-badge text-[10px] shrink-0 ml-3 ${status.cls}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed mb-4">{product.description}</p>
                      <span className="text-xs font-mono text-white/25 capitalize">
                        Type: {product.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-heading font-700 text-3xl text-white mb-4">
              Interested in {division.shortName}?
            </h2>
            <p className="text-white/50 mb-8">Hubungi tim kami untuk diskusi lebih lanjut.</p>
            <Link href="/contact" className="btn-primary text-white inline-flex">
              <span>Contact Us</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
