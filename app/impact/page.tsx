import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Users, BookOpen, Building2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Social Impact',
  description: 'Program sosial AIT Group — Rumah Tahfidz Modern Pontianak dan inisiatif sosial berbasis teknologi.',
};

const IMPACT_STATS = [
  { icon: Users, value: '120+', label: 'Santri Aktif', color: '#0EA5A0' },
  { icon: BookOpen, value: '30+', label: 'Juz Dihafal', color: '#1E5AA8' },
  { icon: Building2, value: '1', label: 'Lokasi Aktif', color: '#D4A843' },
  { icon: Heart, value: '100%', label: 'Transparansi Donasi', color: '#5B9AF5' },
] as const;

export default async function ImpactPage() {
  const csrfToken = await getCsrfTokenAction();

  return (
    <>
      <Navbar />
      <main className="bg-navy-patih">
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-tech-blue/5 blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="section-tag mb-6">Social Impact</div>
            <h1 className="font-heading font-800 text-5xl md:text-6xl text-white leading-tight mb-6 max-w-3xl">
              Technology as a{' '}
              <span className="text-gradient-gold">Force for Good</span>
            </h1>
            <p className="text-white/55 text-xl max-w-2xl leading-relaxed">
              AIT percaya bahwa perusahaan teknologi memiliki tanggung jawab sosial
              yang nyata. Kami membuktikannya dengan transparansi data penuh.
            </p>
          </div>
        </section>

        {/* Impact stats */}
        <section className="py-16 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {IMPACT_STATS.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="glass-card p-6 text-center group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border transition-all group-hover:scale-110"
                    style={{ backgroundColor: color + '15', borderColor: color + '30' }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <p className="font-heading font-800 text-3xl text-white mb-1">{value}</p>
                  <p className="text-sm text-white/45 font-body">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rumah Tahfidz */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="section-tag mb-5">Featured Program</div>
                <h2 className="font-heading font-800 text-4xl text-white leading-tight mb-6">
                  Rumah Tahfidz Modern Pontianak
                </h2>
                <p className="text-white/55 text-lg leading-relaxed mb-8">
                  Program pendidikan tahfidz Al-Quran modern yang menggabungkan
                  kurikulum terstruktur dengan teknologi untuk memastikan setiap
                  donasi digunakan secara transparan dan optimal.
                </p>
                <div className="space-y-4 mb-10">
                  {[
                    'Kurikulum tahfidz terstruktur 30 juz',
                    'Dashboard donasi real-time powered by AIT tech stack',
                    'Laporan penggunaan dana 100% transparan',
                    'Program beasiswa untuk santri tidak mampu',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold-patih/20 border border-gold-patih/30 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-patih" />
                      </div>
                      <p className="text-sm text-white/65">{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary text-white inline-flex">
                  <span>Dukung Program Ini</span>
                  <Heart size={16} />
                </Link>
              </div>

              {/* Donation transparency card */}
              <div className="glass-card p-8">
                <h3 className="font-heading font-600 text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-intelligence animate-pulse-slow" />
                  Live Donation Dashboard
                </h3>
                <div className="space-y-5">
                  {[
                    { label: 'Total Donasi Terkumpul', value: 'Rp 284.5 Jt', bar: 71 },
                    { label: 'Dana Operasional', value: 'Rp 142.2 Jt', bar: 50 },
                    { label: 'Dana Beasiswa', value: 'Rp 85.4 Jt', bar: 30 },
                    { label: 'Dana Pembangunan', value: 'Rp 56.9 Jt', bar: 20 },
                  ].map(({ label, value, bar }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs text-white/45 font-mono">{label}</span>
                        <span className="text-xs font-mono font-600 text-white/70">{value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-tech-blue to-teal-intelligence transition-all duration-1000"
                          style={{ width: `${bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-white/25 mt-6">
                  * Data diperbarui real-time. Powered by AIT Data Infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection csrfToken={csrfToken} />
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
