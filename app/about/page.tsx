import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/data';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'About',
  description: 'Kisah AIT Group — holding company teknologi dari Pontianak yang berdiri sejak 2013.',
};

// ============================================================
// About Page
// ============================================================

const DATA_VALUES = [
  {
    letter: 'D',
    title: 'Data-Driven',
    desc: 'Setiap keputusan didasarkan pada data dan analisis, bukan asumsi.',
    color: '#1E5AA8',
  },
  {
    letter: 'A',
    title: 'Adaptive',
    desc: 'Gesit beradaptasi dengan perubahan pasar dan teknologi.',
    color: '#0EA5A0',
  },
  {
    letter: 'T',
    title: 'Trustworthy',
    desc: 'Membangun kepercayaan melalui transparansi dan kualitas konsisten.',
    color: '#D4A843',
  },
  {
    letter: 'A',
    title: 'Ambitious',
    desc: 'Bermimpi besar, eksekusi presisi — dari Pontianak untuk dunia.',
    color: '#5B9AF5',
  },
] as const;

export default async function AboutPage() {
  const csrfToken = await getCsrfTokenAction();

  return (
    <>
      <Navbar />
      <main className="bg-navy-patih">
        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-tech-blue/6 blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="section-tag mb-6">Our Story</div>
            <h1 className="font-heading font-800 text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8 max-w-4xl">
              Building the Future{' '}
              <span className="text-gradient-blue">from Pontianak</span>
            </h1>
            <p className="text-white/55 text-xl max-w-2xl leading-relaxed">
              Sejak 2013, kami percaya bahwa teknologi terbaik lahir bukan hanya di
              Silicon Valley — tapi juga di Kalimantan Barat.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card p-10">
                <div className="section-tag mb-5">Vision</div>
                <p className="font-heading font-600 text-2xl text-white leading-relaxed">
                  {BRAND.vision}
                </p>
              </div>
              <div className="space-y-5">
                <div className="section-tag mb-5">Mission</div>
                {[
                  'Mengembangkan solusi IoT dan AI yang applicable untuk industri nyata',
                  'Membangun ekosistem bisnis yang saling memperkuat melalui data',
                  'Memberikan dampak sosial positif melalui teknologi, edukasi, dan filantropi',
                  'Membangun tim dan budaya perusahaan kelas dunia dari Kalimantan Barat',
                ].map((mission, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-lg bg-teal-intelligence/10 border border-teal-intelligence/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-mono text-teal-intelligence font-600">{i + 1}</span>
                    </div>
                    <p className="text-white/65 text-base leading-relaxed">{mission}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* D.A.T.A. Values */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="section-tag justify-center mb-4">Core Values</div>
              <h2 className="font-heading font-800 text-4xl text-white">
                The <span className="text-gradient-gold">D.A.T.A.</span> Framework
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DATA_VALUES.map((val) => (
                <div key={val.title} className="glass-card p-8 text-center group">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: val.color + '15',
                      borderColor: val.color + '30',
                    }}
                  >
                    <span
                      className="font-heading font-800 text-3xl"
                      style={{ color: val.color }}
                    >
                      {val.letter}
                    </span>
                  </div>
                  <h3 className="font-heading font-700 text-white text-lg mb-3">{val.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founded fact */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-white/30 font-mono text-sm mb-4">Est. {BRAND.foundedYear}</p>
            <h2 className="font-display text-5xl md:text-7xl text-white/15 tracking-tight">
              Arla Industri<br />Teknopatih
            </h2>
            <p className="mt-6 text-white/40 font-mono text-sm tracking-widest uppercase">
              {BRAND.tagline}
            </p>
          </div>
        </section>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
