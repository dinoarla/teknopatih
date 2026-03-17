import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi AIT Group — tim kami siap mendiskusikan kebutuhan IoT, data, atau kolaborasi bisnis Anda.',
};

export default async function ContactPage() {
  const csrfToken = await getCsrfTokenAction();
  return (
    <>
      <Navbar />
      <main className="bg-navy-patih pt-24">
        <ContactSection csrfToken={csrfToken} />
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
