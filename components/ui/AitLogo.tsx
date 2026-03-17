import type { FC } from 'react';
import { cn } from '@/lib/utils';

// ============================================================
// AIT Logo – Geometric monogram with data nodes
// Inspired by brand brief: "A" triangle + connected nodes
// ============================================================

interface AitLogoProps {
  readonly variant?: 'full' | 'mark-only' | 'text-only';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly className?: string;
  readonly animate?: boolean;
}

const sizeConfig = {
  sm: { mark: 28, textClass: 'text-lg' },
  md: { mark: 36, textClass: 'text-xl' },
  lg: { mark: 48, textClass: 'text-2xl' },
  xl: { mark: 64, textClass: 'text-4xl' },
} as const;

export const AitLogo: FC<AitLogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
  animate = false,
}) => {
  const { mark, textClass } = sizeConfig[size];

  const LogoMark = () => (
    <svg
      width={mark}
      height={mark}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="url(#ringGrad)"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* "A" triangle — primary letterform */}
      <path
        d="M32 10 L52 52 L12 52 Z"
        fill="none"
        stroke="url(#aGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* "A" crossbar */}
      <line
        x1="20"
        y1="40"
        x2="44"
        y2="40"
        stroke="url(#aGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* "I" vertical — central element */}
      <line
        x1="32"
        y1="36"
        x2="32"
        y2="52"
        stroke="#0EA5A0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Data node: apex */}
      <circle cx="32" cy="10" r="3" fill="#D4A843" className={animate ? 'animate-pulse-slow' : ''} />

      {/* Data node: bottom-left */}
      <circle cx="12" cy="52" r="2.5" fill="#1E5AA8" />

      {/* Data node: bottom-right */}
      <circle cx="52" cy="52" r="2.5" fill="#1E5AA8" />

      {/* Data node: crossbar intersections */}
      <circle cx="22" cy="40" r="2" fill="#0EA5A0" opacity="0.8" />
      <circle cx="42" cy="40" r="2" fill="#0EA5A0" opacity="0.8" />

      {/* Connection lines to outer ring */}
      <line x1="32" y1="10" x2="32" y2="3" stroke="#D4A843" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <line x1="12" y1="52" x2="5" y2="57" stroke="#1E5AA8" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="52" y1="52" x2="59" y2="57" stroke="#1E5AA8" strokeWidth="1" opacity="0.4" strokeLinecap="round" />

      {/* Gradients */}
      <defs>
        <linearGradient id="aGrad" x1="12" y1="10" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5B9AF5" />
          <stop offset="100%" stopColor="#0EA5A0" />
        </linearGradient>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E5AA8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0EA5A0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4A843" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LogoText = () => (
    <div className="flex flex-col leading-none">
      <span
        className={cn(
          'font-heading font-800 tracking-[0.05em] text-white',
          textClass
        )}
      >
        AIT
        <span className="text-teal-intelligence">.</span>
      </span>
      {size !== 'sm' && (
        <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase mt-0.5">
          Group
        </span>
      )}
    </div>
  );

  if (variant === 'mark-only') {
    return (
      <div className={cn('flex items-center', className)} role="img" aria-label="AIT Group logo">
        <LogoMark />
      </div>
    );
  }

  if (variant === 'text-only') {
    return (
      <div className={cn('flex items-center', className)}>
        <LogoText />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)} role="img" aria-label="AIT Group logo">
      <LogoMark />
      <LogoText />
    </div>
  );
};
