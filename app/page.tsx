import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { DivisionsSection } from '@/components/sections/DivisionsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'AIT Group — AI Driven Data Decision Company',
  description:
    'Arla Industri Teknopatih holding company teknologi dari Pontianak dengan 7 divisi aktif: Industrial IoT, Data Intelligence, Creative Media, dan lebih.',
};

// ============================================================
// Homepage – Server Component (CSRF generated server-side)
// ============================================================

export default async function HomePage() {
  const csrfToken = await getCsrfTokenAction();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsSection />
        <DivisionsSection />
        <TimelineSection />
        <ContactSection csrfToken={csrfToken} />
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
