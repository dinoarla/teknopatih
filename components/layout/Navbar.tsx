'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AitLogo } from '@/components/ui/AitLogo';
import { NAV_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============================================================
// Navbar – Single Responsibility: navigation only
// ============================================================

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Trap focus / close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
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
        <Link href="/" aria-label="AIT Group – Home">
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
                    'relative px-4 py-2 text-sm font-heading font-500 tracking-wide transition-colors duration-200',
                    'rounded-lg hover:text-white group',
                    isActive ? 'text-white' : 'text-white/60'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300',
                      'bg-gradient-to-r from-tech-blue to-teal-intelligence',
                      isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden lg:inline-flex btn-primary text-white">
            <span>Get in Touch</span>
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          isMobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isMobileOpen}
      >
        <div className="bg-navy-patih/98 backdrop-blur-md border-t border-white/[0.06] px-6 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center py-3 px-4 rounded-lg text-sm font-heading font-500 transition-colors',
                  isActive
                    ? 'text-teal-intelligence bg-teal-intelligence/10'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link href="/contact" className="btn-primary w-full justify-center text-white">
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
