'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AitLogo } from '@/components/ui/AitLogo';
import { BRAND, DIVISIONS } from '@/lib/data';
import { subscribeNewsletter } from '@/app/actions';
import { cn } from '@/lib/utils';
import { ArrowRight, MapPin, Mail } from 'lucide-react';

// ============================================================
// Footer – ISP: separated into sub-components
// ============================================================

function FooterDivisionLinks() {
  return (
    <div>
      <h3 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-4">
        Divisions
      </h3>
      <ul className="space-y-2.5">
        {DIVISIONS.map((div) => (
          <li key={div.id}>
            <Link
              href={`/divisions/${div.slug}`}
              className="text-sm text-white/55 hover:text-teal-intelligence transition-colors group flex items-center gap-1.5"
            >
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3.5 group-hover:ml-0 transition-all duration-200" />
              {div.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLinks() {
  const links = [
    { label: 'About AIT', href: '/about' },
    { label: 'All Products', href: '/products' },
    { label: 'Social Impact', href: '/impact' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ];

  return (
    <div>
      <h3 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-4">
        Company
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/55 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterForm({ csrfToken }: { readonly csrfToken: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await subscribeNewsletter({ email, csrfToken });
    setStatus(res.success ? 'success' : 'error');
    if (res.success) setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2 mt-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Anda"
          className="form-input flex-1 text-sm py-2.5"
          required
          aria-label="Email untuk newsletter"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            'px-4 py-2.5 rounded-lg text-sm font-heading font-600 transition-all',
            status === 'success'
              ? 'bg-teal-intelligence/20 text-teal-intelligence border border-teal-intelligence/30'
              : 'bg-tech-blue hover:bg-teal-intelligence text-white'
          )}
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && (
        <p className="text-xs text-teal-intelligence mt-2">Terima kasih telah berlangganan!</p>
      )}
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-2">Terjadi kesalahan. Coba lagi.</p>
      )}
    </form>
  );
}

interface FooterProps {
  readonly csrfToken: string;
}

export function Footer({ csrfToken }: FooterProps) {
  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-patih">
      {/* Subtle gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-intelligence/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <AitLogo size="md" className="mb-5" />
            <p className="text-sm text-white/45 leading-relaxed mb-6">
              {BRAND.tagline}. Dari Pontianak untuk Indonesia dan Asia Tenggara.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm text-white/45">
                <MapPin size={14} className="mt-0.5 shrink-0 text-teal-intelligence/60" />
                <span>{BRAND.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/45">
                <Mail size={14} className="shrink-0 text-teal-intelligence/60" />
                <span>hello@ait.co.id</span>
              </div>
            </div>
          </div>

          {/* Divisions */}
          <FooterDivisionLinks />

          {/* Links */}
          <FooterLinks />

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Update terbaru dari ekosistem AIT Group — produk, insight, dan milestone.
            </p>
            <NewsletterForm csrfToken={csrfToken} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-mono">
            © {new Date().getFullYear()} Arla Industri Teknopatih. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {BRAND.values.map((val, i) => (
              <span key={val} className="flex items-center gap-2">
                <span className="text-xs text-white/25 font-mono">{val}</span>
                {i < BRAND.values.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
