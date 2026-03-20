import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCsrfTokenAction } from '@/app/actions';
import { ProductsPageClient } from '@/components/sections/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Produk-produk unggulan AIT Group — AQORTA, CoinSentiment, HUD Production, SIMBA, dan lebih.',
};

export default async function ProductsPage() {
  const csrfToken = await getCsrfTokenAction();
  return (
    <>
      <Navbar />
      <main style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 50%,#020810 100%)' }}>
        <ProductsPageClient />
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
