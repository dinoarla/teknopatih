import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ColorVariant } from '@/types';

// ============================================================
// Class name utility
// ============================================================

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================
// Color variant mapping
// ============================================================

export const colorVariantMap: Readonly<Record<ColorVariant, string>> = {
  blue: 'text-tech-blue border-tech-blue/40 bg-tech-blue/10',
  teal: 'text-teal-intelligence border-teal-intelligence/40 bg-teal-intelligence/10',
  gold: 'text-gold-patih border-gold-patih/40 bg-gold-patih/10',
  navy: 'text-white border-white/20 bg-white/10',
} as const;

export const glowMap: Readonly<Record<ColorVariant, string>> = {
  blue: 'shadow-glow-blue',
  teal: 'shadow-glow-teal',
  gold: 'shadow-glow-gold',
  navy: '',
} as const;

// ============================================================
// Format utilities
// ============================================================

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function getDivisionColorVariant(hex: string): ColorVariant {
  const colorMap: Readonly<Record<string, ColorVariant>> = {
    '#1E5AA8': 'blue',
    '#0EA5A0': 'teal',
    '#D4A843': 'gold',
  };
  return colorMap[hex] ?? 'navy';
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}
