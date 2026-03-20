import type { FC } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// AIT Logo — Kawung Core
// Mark: /public/logos/ait-mark.png (circle, white bg)
// Uses <img> tag directly — avoids next/image config issues
// ============================================================

interface AitLogoProps {
  readonly variant?: 'full' | 'mark-only' | 'text-only';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly className?: string;
}

const sizeConfig = {
  sm: { mark: 30,  gap: 'gap-2',   nameSize: 'text-[13px]' },
  md: { mark: 42,  gap: 'gap-3',   nameSize: 'text-[15px]' },
  lg: { mark: 54,  gap: 'gap-4',   nameSize: 'text-[19px]' },
  xl: { mark: 80,  gap: 'gap-5',   nameSize: 'text-[26px]' },
} as const;

const LogoMark: FC<{ size: number }> = ({ size: S }) => (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img
    src="/logos/ait-mark.svg"
    alt="AIT Group"
    width={S}
    height={S}
    style={{ width: S, height: S, objectFit: 'contain', display: 'block' }}
  />
);

const LogoText: FC<{ nameSize: string }> = ({ nameSize }) => (
  <div className="flex flex-col leading-none">
    <div
      className={cn('font-heading whitespace-nowrap leading-none', nameSize)}
      style={{ fontWeight: 800, color: 'white' }}
    >
      <span style={{ color: '#00C8E8' }}>Arla </span>
      <span>Industri Teknopatih</span>
    </div>
  </div>
);

export const AitLogo: FC<AitLogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
}) => {
  const { mark, gap, nameSize } = sizeConfig[size];

  if (variant === 'mark-only') return (
    <div className={cn('inline-flex', className)} role="img" aria-label="AIT Group">
      <LogoMark size={mark} />
    </div>
  );

  if (variant === 'text-only') return (
    <div className={cn('inline-flex', className)}>
      <LogoText nameSize={nameSize} />
    </div>
  );

  return (
    <div
      className={cn('inline-flex items-center', gap, className)}
      role="img"
      aria-label="Arla Industri Teknopatih"
    >
      <LogoMark size={mark} />
      <LogoText nameSize={nameSize} />
    </div>
  );
};
