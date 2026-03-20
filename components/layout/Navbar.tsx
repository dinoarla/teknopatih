'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { AitLogo } from '@/components/ui/AitLogo';
import { NAV_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const close = () => setIsMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-navy-patih/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" aria-label="AIT Group – Home" onClick={close}>
            <AitLogo size="sm" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-heading font-500 tracking-wide transition-colors duration-200 rounded-lg hover:text-white group',
                      isActive ? 'text-white' : 'text-white/60'
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300',
                      'bg-gradient-to-r from-tech-blue to-teal-intelligence',
                      isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    )}/>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading tracking-wider uppercase rounded-lg text-white transition-all hover:-translate-y-px"
              style={{ fontWeight: 600, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}
            >
              Get in Touch
            </Link>

            <button
              className="lg:hidden relative z-[110] p-2 rounded-lg transition-colors text-white"
              onClick={() => setIsMobileOpen(v => !v)}
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Animated hamburger / X */}
              <span className="relative block w-5 h-5">
                <span className={cn(
                  'absolute left-0 w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center',
                  isMobileOpen ? 'top-[9px] rotate-45' : 'top-[4px]'
                )}/>
                <span className={cn(
                  'absolute left-0 top-[9px] w-5 h-[2px] bg-white rounded-full transition-all duration-300',
                  isMobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                )}/>
                <span className={cn(
                  'absolute left-0 w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center',
                  isMobileOpen ? 'top-[9px] -rotate-45' : 'top-[14px]'
                )}/>
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Fullscreen Mobile Menu Overlay ── */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[100] lg:hidden transition-all duration-500',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(2,8,18,0.92)', backdropFilter: 'blur(20px)' }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        className={cn(
          'fixed inset-0 z-[105] lg:hidden flex flex-col justify-center items-center',
          'transition-all duration-500',
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Decorative background mark — subtle */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Large kawung circle watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[480px] max-h-[480px] opacity-[0.035]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/ait-mark.svg" alt="" className="w-full h-full"/>
          </div>
          {/* Teal accent line left */}
          <div className="absolute left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #0EA5A0, transparent)' }}/>
          {/* Gold accent line right */}
          <div className="absolute right-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #D4A843, transparent)' }}/>
        </div>

        {/* Logo at top */}
        <div
          className={cn(
            'absolute top-6 left-6 transition-all duration-500 delay-100',
            isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          )}
        >
          <Link href="/" onClick={close}>
            <AitLogo size="sm" />
          </Link>
        </div>

        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
          onClick={close}
          aria-label="Close menu"
        >
          <X size={22}/>
        </button>

        {/* Nav links — staggered entrance */}
        <nav className="flex flex-col items-center gap-1 w-full px-8">
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={cn(
                  'group relative w-full max-w-xs text-center py-4 px-6 rounded-2xl',
                  'font-heading text-3xl tracking-tight transition-all duration-300',
                  'hover:scale-105',
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                )}
                style={{
                  fontWeight: 700,
                  transitionDelay: isMobileOpen ? `${i * 60 + 100}ms` : '0ms',
                  opacity: isMobileOpen ? 1 : 0,
                  transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-teal-intelligence"/>
                )}
                {/* Hover background */}
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)' }}/>
                <span className="relative">{item.label}</span>
                {/* Underline on active */}
                {isActive && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-12 rounded-full"
                    style={{ background: 'linear-gradient(90deg,#1E5AA8,#0EA5A0)' }}/>
                )}
              </Link>
            );
          })}

          {/* CTA */}
          <div
            className="mt-8 w-full max-w-xs"
            style={{
              transitionDelay: isMobileOpen ? `${NAV_ITEMS.length * 60 + 100}ms` : '0ms',
              opacity: isMobileOpen ? 1 : 0,
              transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s ease',
            }}
          >
            <Link
              href="/contact"
              onClick={close}
              className="flex items-center justify-center w-full py-4 rounded-2xl text-white text-sm font-heading tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontWeight: 700, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        {/* Bottom signature */}
        <div
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
          style={{
            opacity: isMobileOpen ? 0.4 : 0,
            transition: 'opacity 0.5s ease',
            transitionDelay: '400ms',
          }}
        >
          <div className="flex gap-1.5">
            {(['#1E5AA8','#0EA5A0','#D4A843'] as const).map(c => (
              <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }}/>
            ))}
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
            AI Driven Data Decision Company
          </span>
        </div>
      </div>
    </>
  );
}
