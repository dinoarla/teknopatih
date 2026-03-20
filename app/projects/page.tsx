import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectsClient } from '@/components/sections/ProjectsClient';
import { PROJECTS } from '@/lib/projects';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Portofolio ${PROJECTS.length}+ proyek AIT Group sejak 2013 — dari IoT industri, aplikasi pemerintah, e-commerce, hingga platform data AI.`,
};

export default async function ProjectsPage() {
  const csrfToken = await getCsrfTokenAction();
  return (
    <>
      <Navbar />
      <main className="bg-navy-patih pt-32 pb-24" style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 50%,#020810 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14 max-w-2xl">
            <div className="section-tag mb-5">Our Work</div>
            <h1 className="font-heading text-5xl md:text-6xl text-white leading-tight mb-5" style={{ fontWeight: 800 }}>
              {PROJECTS.length}+ Projects{' '}
              <span className="text-gradient-blue">Since 2013</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Dari IoT industri pembangkit listrik hingga platform data AI, aplikasi pemerintah,
              e-commerce, hingga sistem informasi kampus — ini adalah jejak nyata AIT selama 13 tahun.
            </p>
          </div>

          <ProjectsClient />
        </div>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
