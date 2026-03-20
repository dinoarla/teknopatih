import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 60%,#020810 100%)' }}
    >
      {/* Subtle star dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Inline mini logo mark — no component import needed */}
        <div className="flex justify-center mb-8 opacity-25">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="32" cy="32" r="30" stroke="url(#r404)" strokeWidth="1.5" opacity="0.6" />
            <path d="M32 12 L50 50 L14 50 Z" fill="none" stroke="url(#a404)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <line x1="21" y1="39" x2="43" y2="39" stroke="url(#a404)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="32" y1="35" x2="32" y2="50" stroke="#0EA5A0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="12" r="3.5" fill="#D4A843" />
            <circle cx="14" cy="50" r="2.5" fill="#1E5AA8" />
            <circle cx="50" cy="50" r="2.5" fill="#1E5AA8" />
            <defs>
              <linearGradient id="a404" x1="14" y1="12" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5B9AF5" /><stop offset="100%" stopColor="#0EA5A0" />
              </linearGradient>
              <linearGradient id="r404" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E5AA8" /><stop offset="100%" stopColor="#D4A843" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: '#0EA5A0' }}>
          404 — Not Found
        </p>
        <h1 className="font-heading text-5xl text-white mb-4" style={{ fontWeight: 800 }}>
          Page Not Found
        </h1>
        <p className="text-white/45 mb-10 leading-relaxed font-body">
          Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-heading tracking-wider uppercase transition-all hover:-translate-y-px"
          style={{ fontWeight: 600, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
