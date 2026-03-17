import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DIVISIONS } from '@/lib/data';
import { cn, getDivisionColorVariant } from '@/lib/utils';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Katalog produk AIT Group — AQORTA, CoinSentiment, Arabiya, dan lebih.',
};

const TYPE_COLORS = {
  hardware: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10',
  software: 'text-tech-blue border-tech-blue/30 bg-tech-blue/10',
  service: 'text-white/50 border-white/15 bg-white/5',
  platform: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10',
} as const;

const STATUS_DOTS = {
  active: 'bg-teal-intelligence',
  beta: 'bg-gold-patih',
  'coming-soon': 'bg-white/20',
} as const;

export default async function ProductsPage() {
  const csrfToken = await getCsrfTokenAction();

  // Flatten all products with their parent division
  const allProducts = DIVISIONS.flatMap((div) =>
    div.products.map((p) => ({ ...p, division: div }))
  );

  return (
    <>
      <Navbar />
      <main className="bg-navy-patih pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <div className="section-tag mb-5">Product Catalog</div>
            <h1 className="font-heading font-800 text-5xl md:text-6xl text-white leading-tight mb-5">
              Our <span className="text-gradient-blue">Products</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Dari hardware IoT hingga platform data berbasis AI — setiap produk AIT
              dirancang untuk menyelesaikan masalah nyata dengan teknologi.
            </p>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allProducts.map((product) => {
              const variant = getDivisionColorVariant(product.division.colorAccent);
              return (
                <div key={product.id} className="glass-card p-7 flex flex-col group">
                  {/* Top badges */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={cn('tier-badge text-[10px]', TYPE_COLORS[product.type])}>
                      {product.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className={cn('w-1.5 h-1.5 rounded-full animate-pulse-slow', STATUS_DOTS[product.status])} />
                      <span className="text-xs font-mono text-white/35 capitalize">
                        {product.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Product name */}
                  <h2 className="font-heading font-700 text-white text-xl mb-2 group-hover:text-white">
                    {product.name}
                  </h2>

                  {/* Division link */}
                  <Link
                    href={`/divisions/${product.division.slug}`}
                    className={cn(
                      'text-xs font-mono mb-4 hover:underline transition-colors',
                      variant === 'blue' && 'text-tech-blue/70',
                      variant === 'teal' && 'text-teal-intelligence/70',
                      variant === 'gold' && 'text-gold-patih/70',
                      variant === 'navy' && 'text-white/40',
                    )}
                  >
                    {product.division.shortName} ↗
                  </Link>

                  <p className="text-sm text-white/55 leading-relaxed flex-1">{product.description}</p>

                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <Link
                      href={`/divisions/${product.division.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/35 hover:text-white/70 transition-colors group/link"
                    >
                      Learn more
                      <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
