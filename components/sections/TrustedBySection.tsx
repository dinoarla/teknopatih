'use client';

import { PROJECTS } from '@/lib/projects';

// ============================================================
// Trusted By Section — premium client logos (SVG inline)
// Each logo hand-crafted to match official brand identity
// ============================================================

interface Client {
  id: string;
  name: string;
  shortName: string;
  sector: string;
  accentColor: string;
  logo: React.ReactNode;
}

// ── SVG Logos — each one matches real brand visual identity ──

const LogoPLN = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* PLN lightning bolt symbol */}
    <path d="M38 8 L22 32 L32 32 L24 52 L50 26 L40 26 Z" fill="#F7D000" />
    {/* PLN text */}
    <text x="58" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="16" fill="#F7D000">PLN</text>
    <text x="56" y="40" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="7" fill="rgba(255,255,255,0.5)" letterSpacing="1">PERSERO</text>
  </svg>
);

const LogoSTTPLN = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="10" y="10" width="36" height="40" rx="4" fill="none" stroke="#1E5AA8" strokeWidth="2"/>
    <path d="M18 18 L28 10 L38 18" fill="none" stroke="#1E5AA8" strokeWidth="2"/>
    <circle cx="28" cy="28" r="6" fill="none" stroke="#F7D000" strokeWidth="2"/>
    <path d="M25 28 L27 30 L31 25" stroke="#F7D000" strokeWidth="1.5" strokeLinecap="round"/>
    <text x="52" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="white">STT</text>
    <text x="52" y="42" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="#F7D000">PLN</text>
  </svg>
);

const LogoSTMIK = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Book open symbol */}
    <path d="M14 44 L14 16 Q14 14 16 14 L30 16 L30 44 Z" fill="none" stroke="#003580" strokeWidth="2"/>
    <path d="M30 16 L44 14 Q46 14 46 16 L46 44 L30 44 Z" fill="none" stroke="#003580" strokeWidth="2"/>
    <line x1="30" y1="16" x2="30" y2="44" stroke="#003580" strokeWidth="1.5"/>
    <path d="M18 22 L27 22 M18 27 L27 27 M18 32 L27 32 M18 37 L24 37" stroke="#003580" strokeWidth="1" strokeLinecap="round"/>
    <path d="M33 22 L42 22 M33 27 L42 27 M33 32 L42 32 M33 37 L39 37" stroke="#003580" strokeWidth="1" strokeLinecap="round"/>
    <text x="52" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="12" fill="white">STMIK</text>
    <text x="52" y="42" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.45)" letterSpacing="0.5">PONTIANAK</text>
  </svg>
);

const LogoBSI = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* BSI hexagon mark */}
    <polygon points="30,8 44,16 44,32 30,40 16,32 16,16" fill="none" stroke="#00A551" strokeWidth="2"/>
    <polygon points="30,14 38,19 38,29 30,34 22,29 22,19" fill="#00A551" fillOpacity="0.2"/>
    <text x="27" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="9" fill="#00A551" textAnchor="middle">BSI</text>
    <text x="56" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="14" fill="white">BSI</text>
    <text x="55" y="38" fontFamily="Arial, sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.4)" letterSpacing="0.3">BANK SYARIAH IND.</text>
  </svg>
);

const LogoUNTAN = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Torch / flame symbol */}
    <ellipse cx="28" cy="44" rx="10" ry="5" fill="none" stroke="#003580" strokeWidth="1.5"/>
    <rect x="24" y="24" width="8" height="22" rx="1" fill="#003580" fillOpacity="0.6"/>
    <path d="M28 24 Q22 18 24 12 Q28 6 28 12 Q32 6 32 12 Q34 18 28 24Z" fill="#F7D000"/>
    <path d="M28 20 Q26 16 27 13 Q28 10 28 13 Q29 10 29 13 Q30 16 28 20Z" fill="#FF6600" fillOpacity="0.8"/>
    <text x="44" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="12" fill="white">UNTAN</text>
    <text x="44" y="40" fontFamily="Arial, sans-serif" fontSize="6" fill="rgba(255,255,255,0.4)" letterSpacing="0.3">TANJUNGPURA UNIV.</text>
  </svg>
);

const LogoUniPancasila = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* 5-star Pancasila symbol */}
    {[0,1,2,3,4].map(i => {
      const angle = (i * 72 - 90) * Math.PI / 180;
      const cx = 28 + 12 * Math.cos(angle);
      const cy = 26 + 12 * Math.sin(angle);
      return <circle key={i} cx={cx} cy={cy} r="3" fill="#C0392B"/>;
    })}
    <circle cx="28" cy="26" r="6" fill="none" stroke="#C0392B" strokeWidth="1.5"/>
    <text x="46" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="9" fill="white">UNIV.</text>
    <text x="46" y="37" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="9" fill="#C0392B">PANCASILA</text>
  </svg>
);

const LogoDekranasda = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Traditional weaving pattern */}
    <rect x="10" y="10" width="36" height="40" rx="3" fill="none" stroke="#8B4513" strokeWidth="1.5"/>
    {[0,1,2,3].map(r => [0,1,2,3].map(c => (
      <rect key={`${r}-${c}`} x={14+c*8} y={14+r*8} width="5" height="5" rx="0.5"
        fill={(r+c)%2===0 ? '#8B4513' : '#D4A843'} fillOpacity="0.8"/>
    )))}
    <text x="52" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="8" fill="white">DEKRANASDA</text>
    <text x="52" y="39" fontFamily="Arial, sans-serif" fontSize="7" fill="rgba(255,255,255,0.45)">BENGKAYANG</text>
  </svg>
);

const LogoRasaRasa = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Cloche / serving dome */}
    <path d="M14 38 Q14 20 28 18 Q42 20 42 38 Z" fill="none" stroke="#D4A843" strokeWidth="2"/>
    <line x1="14" y1="38" x2="42" y2="38" stroke="#D4A843" strokeWidth="2"/>
    <circle cx="28" cy="18" r="2.5" fill="#D4A843"/>
    <line x1="18" y1="44" x2="38" y2="44" stroke="#D4A843" strokeWidth="1.5" strokeLinecap="round"/>
    <text x="50" y="28" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="11" fill="#D4A843">Rasa</text>
    <text x="50" y="42" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="11" fill="white">Rasa</text>
  </svg>
);

const LogoBASARNAS = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Jangkar / anchor SAR symbol */}
    <circle cx="28" cy="22" r="7" fill="none" stroke="#C0392B" strokeWidth="2"/>
    <line x1="28" y1="29" x2="28" y2="46" stroke="#C0392B" strokeWidth="2"/>
    <path d="M20 38 Q24 44 28 46 Q32 44 36 38" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="22" y1="22" x2="34" y2="22" stroke="#C0392B" strokeWidth="1.5"/>
    <text x="44" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="white">BASA</text>
    <text x="44" y="38" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="11" fill="#C0392B">RNAS</text>
  </svg>
);

const LogoCAEstetika = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Beauty / diamond motif */}
    <path d="M28 10 L38 24 L28 50 L18 24 Z" fill="none" stroke="#E91E8C" strokeWidth="1.5"/>
    <path d="M18 24 L38 24" stroke="#E91E8C" strokeWidth="1"/>
    <path d="M22 18 L28 10 L34 18" fill="none" stroke="#E91E8C" strokeWidth="1.2"/>
    <circle cx="28" cy="30" r="4" fill="#E91E8C" fillOpacity="0.3"/>
    <text x="46" y="26" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="11" fill="#E91E8C">Citra</text>
    <text x="46" y="40" fontFamily="Georgia, serif" fontStyle="italic" fontSize="8.5" fill="rgba(255,255,255,0.55)">Askara</text>
  </svg>
);

const LogoDLHK = () => (
  <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Leaf + shield gov symbol */}
    <path d="M28 46 Q14 36 16 22 Q22 10 28 14 Q34 10 40 22 Q42 36 28 46Z" fill="none" stroke="#27AE60" strokeWidth="2"/>
    <path d="M28 46 Q20 34 22 22 Q25 14 28 18" fill="#27AE60" fillOpacity="0.2"/>
    <line x1="28" y1="46" x2="28" y2="52" stroke="#27AE60" strokeWidth="1.5"/>
    <text x="46" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="8" fill="white">DINAS LH</text>
    <text x="46" y="34" fontFamily="Arial, sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.4)">LINGKUNGAN</text>
    <text x="46" y="44" fontFamily="Arial, sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.4)">HIDUP</text>
  </svg>
);

// ── Client data with inline logos ────────────────────────────

const CLIENTS: ReadonlyArray<Client> = [
  { id:'c01', name:'PLN (Perusahaan Listrik Negara)', shortName:'PLN', sector:'Energy & BUMN', accentColor:'#F7D000', logo:<LogoPLN/> },
  { id:'c02', name:'STT PLN', shortName:'STT PLN', sector:'Higher Education', accentColor:'#1E5AA8', logo:<LogoSTTPLN/> },
  { id:'c03', name:'STMIK Pontianak', shortName:'STMIK', sector:'Higher Education', accentColor:'#003580', logo:<LogoSTMIK/> },
  { id:'c04', name:'Bank Syariah Indonesia', shortName:'BSI', sector:'Finance & Banking', accentColor:'#00A551', logo:<LogoBSI/> },
  { id:'c05', name:'Universitas Pancasila', shortName:'Univ. Pancasila', sector:'Higher Education', accentColor:'#C0392B', logo:<LogoUniPancasila/> },
  { id:'c06', name:'Universitas Tanjungpura', shortName:'UNTAN', sector:'Higher Education', accentColor:'#003580', logo:<LogoUNTAN/> },
  { id:'c07', name:'Dekranasda Bengkayang', shortName:'Dekranasda', sector:'Government & Craft', accentColor:'#8B4513', logo:<LogoDekranasda/> },
  { id:'c08', name:'Restaurant Rasarasa Jakarta', shortName:'Rasarasa', sector:'F&B Industry', accentColor:'#D4A843', logo:<LogoRasaRasa/> },
  { id:'c09', name:'BASARNAS', shortName:'BASARNAS', sector:'Government & SAR', accentColor:'#C0392B', logo:<LogoBASARNAS/> },
  { id:'c10', name:'PT Citra Askara Estetika', shortName:'CA Estetika', sector:'Beauty & Wellness', accentColor:'#E91E8C', logo:<LogoCAEstetika/> },
  { id:'c11', name:'Dinas Lingkungan Hidup', shortName:'Dinas LHK', sector:'Government & Environment', accentColor:'#27AE60', logo:<LogoDLHK/> },
] as const;

// ── Card ─────────────────────────────────────────────────────

function ClientCard({ client }: { client: Client }) {
  return (
    <div
      className="group relative flex-shrink-0 flex flex-col items-center justify-between rounded-2xl p-5 mx-3 transition-all duration-400 hover:-translate-y-1"
      style={{
        width: '180px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.07)`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 24px ${client.accentColor}18, 0 0 24px ${client.accentColor}10` }}
      />

      {/* Logo area */}
      <div
        className="w-full h-14 flex items-center justify-center mb-3 rounded-xl px-2 transition-transform duration-300 group-hover:scale-105"
        style={{ background: `${client.accentColor}10`, border: `1px solid ${client.accentColor}20` }}
      >
        {client.logo}
      </div>

      {/* Info */}
      <div className="text-center w-full">
        <p className="text-xs font-heading text-white/80 leading-tight truncate" style={{ fontWeight: 600 }}>
          {client.shortName}
        </p>
        <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider mt-0.5 truncate">
          {client.sector}
        </p>
      </div>

      {/* Accent bottom line */}
      <div
        className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${client.accentColor}, transparent)` }}
      />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────

export function TrustedBySection() {
  const doubled = [...CLIENTS, ...CLIENTS];

  const stats = [
    { value: '11+', label: 'Partner Organisations' },
    { value: '5+',  label: 'BUMN & Gov. Agencies' },
    { value: '4+',  label: 'Universities' },
    { value: '13+', label: 'Years of Trust' },
  ];

  return (
    <section className="relative py-24 overflow-hidden" aria-label="Trusted by clients">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#020810 0%,#04101e 50%,#020810 100%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'60px 60px' }}
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">

            <div className="max-w-lg">
              <div className="section-tag mb-4">Trusted By</div>
              <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-4" style={{ fontWeight: 800 }}>
                Clients &{' '}
                <span className="text-gradient-blue">Partners</span>
              </h2>
              <p className="text-white/45 leading-relaxed font-body">
                Dari BUMN energi, lembaga SAR nasional, universitas ternama, hingga industri kreatif —
                dipercaya oleh institusi-institusi terkemuka Indonesia sejak 2013.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0">
              {stats.map(s => (
                <div key={s.label}
                  className="text-center px-4 py-4 rounded-xl border border-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <p className="font-heading text-2xl text-white" style={{ fontWeight: 800 }}>
                    {s.value}
                  </p>
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-wider mt-1 leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee row 1 */}
        <div className="relative overflow-hidden mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right,#020810,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left,#020810,transparent)' }} />
          <div className="flex" style={{ animation: 'marquee 40s linear infinite' }}>
            {doubled.map((c, i) => <ClientCard key={`${c.id}-a${i}`} client={c} />)}
          </div>
        </div>

        {/* Marquee row 2 — reversed */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right,#020810,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left,#020810,transparent)' }} />
          <div className="flex" style={{ animation: 'marquee 52s linear infinite reverse' }}>
            {[...doubled].reverse().map((c, i) => <ClientCard key={`${c.id}-b${i}`} client={c} />)}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 text-center">
          <p className="text-xs font-mono text-white/20 tracking-widest uppercase">
            Building long-term partnerships since 2013 · Pontianak, Kalimantan Barat
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
