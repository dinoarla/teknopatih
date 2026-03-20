'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// Products Page Client — Carousels + Featured + Grid
// ============================================================

// ── FEATURED PRODUCTS (Top 5) ────────────────────────────────
interface FeaturedProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  brandColor: string;
  brandBg: string;
  logoText: string;
  logoEmoji: string;
  description: string;
  award?: string;
  stats: ReadonlyArray<{ value: string; label: string; sub: string }>;
  tags: ReadonlyArray<string>;
  images: ReadonlyArray<{ src: string; caption: string }>;
  status: 'active' | 'beta' | 'coming-soon';
  liveUrl?: string;
  divisionSlug: string;
}

const FEATURED: ReadonlyArray<FeaturedProduct> = [
  {
    id: 'feat-simba',
    name: 'Ind-FIS',
    subtitle: 'Industrial Fuel Intelligence System',
    tagline: 'Real-time fuel monitoring across multiple industrial sites',
    brandColor: '#1E5AA8',
    brandBg: 'linear-gradient(135deg,#0e2a5a 0%,#061428 100%)',
    logoText: 'FIS',
    logoEmoji: '⚡',
    description: 'Platform monitoring bahan bakar berbasis IoT untuk fasilitas industri skala besar. Memantau konsumsi, distribusi, dan stok bahan bakar secara real-time dengan dashboard interaktif, diagram alur tangki, dan laporan otomatis — dapat dikustomisasi untuk berbagai jenis industri.',
    stats: [
      { value: 'Multi-Site', label: 'Monitoring', sub: 'Terpusat' },
      { value: 'Real-Time', label: 'Data Feed', sub: '24/7' },
      { value: 'Custom', label: 'Deployment', sub: 'Any Industry' },
    ],
    tags: ['IoT Monitoring','Real-Time Dashboard','Fuel Management','Multi-Site','Industrial'],
    images: [
      { src: '/products/ind-fis/ind-fis-01-dashboard-main.png',    caption: 'Main Control Dashboard — Multi-Site Overview' },
      { src: '/products/ind-fis/ind-fis-02-plant-flow.png',        caption: 'Plant View — Real-Time Tank Flow Diagram' },
      { src: '/products/ind-fis/ind-fis-09-operations-monitor.png',caption: 'Operations Monitor — Live Capacity & Deviasi' },
      { src: '/products/ind-fis/ind-fis-04-tank-list.png',         caption: 'Tank Registry — 25 Storage Units Tracked' },
      { src: '/products/ind-fis/ind-fis-03-tank-info.png',         caption: 'Tank Detail — Capacity & Calibration Data' },
      { src: '/products/ind-fis/ind-fis-10-graph-visualization.png',caption: 'Graph Visualization — Fuel Receipt & Usage Trend' },
      { src: '/products/ind-fis/ind-fis-11-data-table.png',        caption: 'Data Export — Full Operational Records' },
      { src: '/products/ind-fis/ind-fis-05-quality-report.png',    caption: 'Quality Report — Fuel Density & Water Content' },
      { src: '/products/ind-fis/ind-fis-06-data-input.png',        caption: 'Data Input — Scheduled Fuel Dispatch Entry' },
      { src: '/products/ind-fis/ind-fis-07-depot-data.png',        caption: 'Depot Tracking — Tanker Vehicle Status' },
      { src: '/products/ind-fis/ind-fis-08-route-map.png',         caption: 'Route Map — Delivery Direction & ETA' },
      { src: '/products/ind-fis/ind-fis-12-mobile-app.png',        caption: 'Mobile App — iOS & Android Support' },
    ],
    status: 'active',
    divisionSlug: 'industrial-iot',
  },
  {
    id: 'feat-ems',
    name: 'PREMASIG',
    subtitle: 'Predictive Maintenance & Asset Intelligence',
    tagline: 'Detect anomalies before they become failures',
    brandColor: '#0EA5A0',
    brandBg: 'linear-gradient(135deg,#063d3b 0%,#031e1d 100%)',
    logoText: 'PMS',
    logoEmoji: '⚙️',
    description: 'Platform monitoring kesehatan mesin dan aset industri berbasis IoT. Memantau 20+ parameter kritis — suhu, RPM, tekanan, getaran, dan konsumsi energi — secara real-time dengan AI anomaly detection untuk mencegah kerusakan sebelum terjadi.',
    stats: [
      { value: '20+', label: 'Parameters', sub: 'Monitored' },
      { value: '<1ms', label: 'Alert', sub: 'Response Time' },
      { value: 'AI', label: 'Anomaly', sub: 'Detection' },
    ],
    tags: ['Predictive Maintenance','IoT Sensor','Asset Management','SCADA','Industrial AI'],
    images: [
      { src: '/products/premasig-01-dashboard.png', caption: 'Engine Status Dashboard — Real-Time Operational Overview' },
    ],
    status: 'active',
    divisionSlug: 'industrial-iot',
  },
  {
    id: 'feat-aqorta',
    name: 'AQORTA',
    subtitle: 'Air Quality Real-Time Monitoring Station',
    tagline: "Indonesia's Most Affordable Real-Time AQMS",
    brandColor: '#0EA5A0',
    brandBg: 'linear-gradient(135deg,#054540 0%,#021e1d 100%)',
    logoText: 'AQ',
    logoEmoji: '🌬️',
    description: 'Stasiun pemantauan kualitas udara real-time dengan harga terjangkau untuk kawasan industri, pemerintah daerah, dan ESG compliance. Mengukur PM2.5, PM10, CO, NO2, SO2, dan lebih — data tersedia via dashboard web dan API.',
    stats: [
      { value: 'PM2.5', label: 'Partikel', sub: '& PM10' },
      { value: 'API', label: 'Data Access', sub: 'Real-time' },
      { value: 'ESG', label: 'Compliance', sub: 'Ready' },
    ],
    tags: ['Air Quality','IoT Hardware','Government','ESG','Industrial'],
    images: [
      { src: '/products/aqorta-01-dashboard.png', caption: 'AQORTA Panel — Real-Time Air Quality Data Acquisition' },
    ],
    status: 'active',
    divisionSlug: 'industrial-iot',
  },
  {
    id: 'feat-coinsentiment',
    name: 'CoinSentiment.id',
    subtitle: 'Data Intelligence Platform',
    tagline: 'Real-Time Crypto Narrative & Sentiment Intelligence',
    brandColor: '#00C896',
    brandBg: 'linear-gradient(135deg,#003d28 0%,#001a10 100%)',
    logoText: 'CS',
    logoEmoji: '📊',
    description: 'Platform analitik sentimen pasar kripto berbasis AI untuk trader dan investor Indonesia. Melacak narasi, social signals, dan on-chain data secara real-time — membantu keputusan trading dengan data, bukan rumor.',
    stats: [
      { value: 'Live', label: 'Sentiment', sub: 'Real-time' },
      { value: 'AI', label: 'Powered', sub: 'Analysis' },
      { value: 'API', label: 'Access', sub: 'Premium' },
    ],
    tags: ['Crypto','AI Sentiment','Trading','Data Intelligence','Freemium'],
    images: [
      { src: '/products/coinsentiment-01-narratives-dashboard.png', caption: 'Narratives Dashboard — 8 Narasi Aktif dengan AI Live Score' },
      { src: '/products/coinsentiment-02-narrative-overview.png',   caption: 'Narrative Overview — AI Coins Deep Dive' },
      { src: '/products/coinsentiment-03-overview-charts.png',      caption: 'Sentiment Score & Social Volume — 13 Hari Terakhir' },
      { src: '/products/coinsentiment-04-top-tokens.png',           caption: 'Top Tokens in Narrative — Live News Feed' },
      { src: '/products/coinsentiment-05-ai-analysis.png',          caption: 'AI Analysis Summary — Powered by Claude AI' },
      { src: '/products/coinsentiment-06-weekly-forecast.png',      caption: 'Weekly Forecast — Catalyst & Key Risks' },
      { src: '/products/coinsentiment-07-sentiment-explorer.png',   caption: 'Token Sentiment Explorer — 50+ Token Dipantau' },
      { src: '/products/coinsentiment-08-token-detail.png',         caption: 'Token Detail — Harga, Sentiment & AI Analysis' },
      { src: '/products/coinsentiment-09-tools.png',                caption: 'Intelligence Tools — AI Narrative Scanner' },
      { src: '/products/coinsentiment-10-ai-scanner.png',           caption: 'AI Scanner — Narrative Compatibility & Profile Radar' },
    ],
    status: 'active',
    liveUrl: 'https://coinsentiment.id',
    divisionSlug: 'data-intelligence',
  },
  {
    id: 'feat-hud',
    name: 'HUD Production',
    subtitle: 'Creative & Digital Media Studio',
    tagline: 'Happiness Until Destination — Brand Film & Digital Content',
    brandColor: '#D4A843',
    brandBg: 'linear-gradient(135deg,#2a1500 0%,#0f0800 100%)',
    logoText: 'HUD',
    logoEmoji: '🎬',
    description: 'Studio produksi kreatif full-service untuk korporat, event, dan konten digital. Spesialisasi di brand film, web series, dokumenter, animasi, dan cinematic podcast — sudah menggarap puluhan proyek untuk klien B2B dan B2C.',
    stats: [
      { value: 'Brand', label: 'Film', sub: '& Series' },
      { value: 'Anim', label: 'Animasi', sub: '& Podcast' },
      { value: 'Full', label: 'Service', sub: 'Studio' },
    ],
    tags: ['Brand Film','Digital Content','Animasi','Dokumenter','Podcast'],
    images: [
      { src: '/products/hud-01-hero.png',      caption: 'Setelah Hujan — Short Film Perdana HUD Production' },
      { src: '/products/hud-02-portfolio.png', caption: 'Karya Terbaru — Film & Series, Dokumenter, Cinematic Podcast' },
      { src: '/products/hud-03-services.png',  caption: 'Punya Cerita yang Ingin Diceritakan? — hudproduction.com' },
    ],
    status: 'active',
    liveUrl: 'https://hudproduction.com',
    divisionSlug: 'creative-media',
  },
] as const;

// ── OTHER PRODUCTS ────────────────────────────────────────────
interface OtherProduct {
  id: string;
  name: string;
  brandColor: string;
  brandBg: string;
  logoText: string;
  logoEmoji: string;
  tagline: string;
  description: string;
  type: string;
  status: 'active' | 'beta' | 'coming-soon';
  divisionSlug: string;
  liveUrl?: string;
}

const OTHER_PRODUCTS: ReadonlyArray<OtherProduct> = [
  {
    id: 'other-kalimi',
    name: 'KALIMI',
    brandColor: '#5B9AF5',
    brandBg: 'linear-gradient(135deg,#062040,#030e1f)',
    logoText: 'KLM',
    logoEmoji: '📖',
    tagline: 'Platform Belajar Bahasa Arab Untuk Anak',
    description: 'Platform belajar bahasa Arab untuk anak-anak dengan metode gamifikasi — menyenangkan, interaktif, dan berbasis AI adaptive learning.',
    type: 'Platform',
    status: 'beta',
    divisionSlug: 'edutech',
  },
  {
    id: 'other-mumabila',
    name: 'MumaBila',
    brandColor: '#F97316',
    brandBg: 'linear-gradient(135deg,#3d1500,#1e0800)',
    logoText: 'MB',
    logoEmoji: '🍜',
    tagline: 'Kuliner Lokal Pontianak · Data-Driven F&B',
    description: 'Brand kuliner lokal Pontianak dengan pendekatan data untuk inventory management dan franchise development.',
    type: 'Brand',
    status: 'active',
    divisionSlug: 'fb-ventures',
  },
  {
    id: 'other-tahfidz',
    name: 'Rumah Tahfidz Modern',
    brandColor: '#D4A843',
    brandBg: 'linear-gradient(135deg,#1a0e00,#0a0600)',
    logoText: 'RT',
    logoEmoji: '🕌',
    tagline: 'Program Tahfidz · Transparansi Penuh',
    description: 'Program pendidikan tahfidz Al-Quran modern dengan kurikulum terstruktur dan dashboard donasi real-time berbasis teknologi AIT.',
    type: 'Service',
    status: 'coming-soon',
    divisionSlug: 'social-impact',
  },
  {
    id: 'other-hajj',
    name: 'Hajj Digital',
    brandColor: '#D4A843',
    brandBg: 'linear-gradient(135deg,#1a1000,#0a0800)',
    logoText: 'HJ',
    logoEmoji: '🕋',
    tagline: 'Tech-Enabled Spiritual Journey',
    description: 'Paket perjalanan ibadah haji & umroh dengan app tracking, digital manasik, dan dukungan AI untuk pengalaman ibadah yang lebih terencana.',
    type: 'Service',
    status: 'coming-soon',
    divisionSlug: 'spiritual-travel',
  },
] as const;

const STATUS_STYLES = {
  'active':      { dot: 'bg-teal-intelligence animate-pulse-slow', label: 'Active',      pill: 'text-teal-intelligence border-teal-intelligence/30 bg-teal-intelligence/10' },
  'beta':        { dot: 'bg-gold-patih',                           label: 'Beta',        pill: 'text-gold-patih border-gold-patih/30 bg-gold-patih/10' },
  'coming-soon': { dot: 'bg-white/25',                             label: 'Coming Soon', pill: 'text-white/40 border-white/15 bg-white/5' },
} as const;

// ── Image Carousel ────────────────────────────────────────────
function ImageCarousel({ images, color }: {
  images: ReadonlyArray<{ src: string; caption: string }>;
  color: string;
}) {
  const [current, setCurrent] = useState(0);
  const useThumbs = images.length > 4;

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  if (images.length === 0) {
    return (
      <div className="h-full flex items-center justify-center rounded-2xl border border-white/10"
        style={{ background: 'rgba(255,255,255,0.02)', minHeight: '260px' }}>
        <div className="text-center">
          <p className="text-4xl mb-3 opacity-20">📸</p>
          <p className="text-xs font-mono text-white/20">Screenshots coming soon</p>
        </div>
      </div>
    );
  }

  const img = images[current]!;
  return (
    <div className="flex flex-col gap-2">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 group/carousel"
        style={{ minHeight: '260px' }}>
        <img src={img.src} alt={img.caption}
          className="w-full object-cover object-top transition-all duration-500"
          style={{ maxHeight: '340px', minHeight: '260px' }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"/>

        {/* Caption + counter */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-1 rounded backdrop-blur-sm truncate">
            {img.caption}
          </span>
          <span className="text-[10px] font-mono text-white/50 bg-black/50 px-1.5 py-0.5 rounded shrink-0">
            {current + 1}/{images.length}
          </span>
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.7)', border: `1px solid ${color}60` }}>
              <ChevronLeft size={16} style={{ color }}/>
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.7)', border: `1px solid ${color}60` }}>
              <ChevronRight size={16} style={{ color }}/>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip — shown when >4 images */}
      {useThumbs && (
        <div className="grid grid-cols-6 gap-1.5">
          {images.map((thumb, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="relative rounded-lg overflow-hidden transition-all duration-200 hover:scale-105"
              style={{
                outline: i === current ? `2px solid ${color}` : '2px solid transparent',
                outlineOffset: '1px',
                opacity: i === current ? 1 : 0.5,
              }}>
              <img src={thumb.src} alt={`Screenshot ${i + 1}`}
                className="w-full object-cover object-top"
                style={{ height: '44px' }}/>
              {i === current && (
                <div className="absolute inset-0 rounded-lg" style={{ background: `${color}25` }}/>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Dots — only when <=4 images */}
      {!useThumbs && images.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-1">
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                backgroundColor: i === current ? color : 'rgba(255,255,255,0.3)',
              }}/>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Featured Product Card ─────────────────────────────────────
function FeaturedCard({ product }: { product: FeaturedProduct }) {
  const status = STATUS_STYLES[product.status];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] h-full"
      style={{ background: 'linear-gradient(135deg,#0a1e44 0%,#061830 60%,#030a18 100%)' }}>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>
      {/* Color glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${product.brandColor}25 0%,transparent 70%)`, filter: 'blur(40px)' }}/>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
        {/* Left: info */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          {product.award && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5 w-fit"
              style={{ background: 'rgba(212,168,67,0.1)', borderColor: 'rgba(212,168,67,0.3)' }}>
              <span className="text-[10px] font-mono text-gold-patih tracking-wider">{product.award}</span>
            </div>
          )}

          <div className="section-tag mb-4">Featured Product</div>
          <h2 className="font-heading leading-tight mb-1" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>
            {product.name}
            <span style={{ color: product.brandColor }}>.</span>
          </h2>
          <p className="font-body text-white/50 mb-4" style={{ fontSize: '1rem' }}>{product.subtitle}</p>
          <p className="text-white/60 leading-relaxed mb-6 text-sm">{product.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {product.stats.map(s => (
              <div key={s.label} className="text-center p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="font-heading text-base text-white" style={{ fontWeight: 800 }}>{s.value}</p>
                <p className="text-[10px] font-mono" style={{ color: product.brandColor }}>{s.label}</p>
                <p className="text-[9px] font-mono text-white/30">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-full border text-white/45 border-white/10">
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className={cn('w-1.5 h-1.5 rounded-full', status.dot)}/>
              <span className="text-[10px] font-mono" style={{ color: product.brandColor }}>{status.label}</span>
            </div>
            {product.liveUrl && (
              <a href={product.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-heading tracking-wide transition-all hover:opacity-80"
                style={{ fontWeight: 600, background: product.brandColor + '20', color: product.brandColor, border: `1px solid ${product.brandColor}40` }}>
                Visit Live <ExternalLink size={12}/>
              </a>
            )}
            <Link href={`/divisions/${product.divisionSlug}`}
              className="inline-flex items-center gap-1 text-xs font-mono text-white/40 hover:text-white/70 transition-colors">
              View Division <ArrowUpRight size={12}/>
            </Link>
          </div>
        </div>

        {/* Right: image carousel */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <ImageCarousel images={product.images} color={product.brandColor}/>
        </div>
      </div>
    </div>
  );
}

// ── Featured Carousel (5 products) ───────────────────────────
function FeaturedCarousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + FEATURED.length) % FEATURED.length);
  const next = () => setActive(i => (i + 1) % FEATURED.length);

  const product = FEATURED[active]!;

  return (
    <section className="pb-8 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Tab bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
        {FEATURED.map((p, i) => (
          <button key={p.id} onClick={() => setActive(i)}
            className={cn(
              'flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading transition-all border',
              i === active
                ? 'text-white border-transparent'
                : 'text-white/40 border-white/[0.07] hover:text-white/70 hover:border-white/15'
            )}
            style={{
              fontWeight: 600,
              background: i === active ? `linear-gradient(135deg,${p.brandColor}30,${p.brandColor}15)` : 'transparent',
              borderColor: i === active ? p.brandColor + '50' : undefined,
            }}>
            <span>{p.logoEmoji}</span>
            <span>{p.name}</span>
          </button>
        ))}
        {/* Prev/Next arrows */}
        <div className="flex gap-2 ml-auto shrink-0">
          <button onClick={prev}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all">
            <ChevronLeft size={16}/>
          </button>
          <button onClick={next}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all">
            <ChevronRight size={16}/>
          </button>
        </div>
      </div>

      {/* Card */}
      <div style={{ minHeight: '380px' }}>
        <FeaturedCard key={product.id} product={product}/>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-5">
        {FEATURED.map((p, i) => (
          <button key={p.id} onClick={() => setActive(i)}
            className="transition-all rounded-full"
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              background: i === active ? p.brandColor : 'rgba(255,255,255,0.15)',
            }}/>
        ))}
      </div>
    </section>
  );
}

// ── Other Products Grid ───────────────────────────────────────
function OtherProductCard({ product }: { product: OtherProduct }) {
  const status = STATUS_STYLES[product.status];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] hover:border-white/20 transition-all duration-400 hover:-translate-y-1">
      {/* Header */}
      <div className="relative h-28 overflow-hidden" style={{ background: product.brandBg }}>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }}/>
        <div className="absolute right-4 top-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity select-none">
          {product.logoEmoji}
        </div>
        <div className="absolute left-4 top-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-heading"
            style={{ background: product.brandColor + '25', border: `1px solid ${product.brandColor}50`, color: product.brandColor, fontWeight: 800 }}>
            {product.logoText}
          </div>
        </div>
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={cn('w-1.5 h-1.5 rounded-full', status.dot)}/>
            <span className="text-[9px] font-mono text-white/50">{status.label}</span>
          </div>
          <span className="text-[9px] font-mono text-white/30 border border-white/10 px-1.5 py-0.5 rounded">{product.type}</span>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-4" style={{ background: 'rgba(7,17,31,0.96)' }}>
        <h3 className="font-heading text-white text-sm mb-1 leading-tight" style={{ fontWeight: 700 }}>{product.name}</h3>
        <p className="text-[10px] font-mono mb-2" style={{ color: product.brandColor + 'aa' }}>{product.tagline}</p>
        <p className="text-xs text-white/45 leading-relaxed flex-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <Link href={`/divisions/${product.divisionSlug}`}
            className="text-[10px] font-mono flex items-center gap-1 transition-colors hover:text-white/70"
            style={{ color: product.brandColor + 'aa' }}>
            View Division <ArrowUpRight size={10}/>
          </Link>
          {product.liveUrl && (
            <a href={product.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-mono flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors">
              Live <ExternalLink size={10}/>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────
export function ProductsPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-10 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="section-tag mb-5">Our Products</div>
        <h1 className="font-heading text-5xl md:text-6xl text-white leading-tight mb-5" style={{ fontWeight: 800 }}>
          Products Built to <span className="text-gradient-gold">Solve Real Problems</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
          Dari hardware IoT untuk pembangkit listrik hingga platform data AI dan studio kreatif —
          setiap produk AIT lahir dari kebutuhan nyata industri Indonesia.
        </p>
      </section>

      {/* Featured carousel */}
      <FeaturedCarousel />

      {/* Other Products */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <div className="section-tag mb-1">More Products</div>
            <h2 className="font-heading text-2xl text-white" style={{ fontWeight: 700 }}>Other Products</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OTHER_PRODUCTS.map(p => <OtherProductCard key={p.id} product={p}/>)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
          style={{ background: 'linear-gradient(135deg,#0a1e44 0%,#061830 50%,#071020 100%)', border: '1px solid rgba(212,168,67,0.18)' }}>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}/>
          <div className="relative z-10">
            <div className="section-tag justify-center mb-4">Interested?</div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 800 }}>
              Butuh Demo atau <span className="text-gradient-gold">Custom Solution?</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
              Setiap produk kami dapat dikustomisasi sesuai kebutuhan industri spesifik Anda.
              Hubungi tim kami untuk konsultasi gratis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white text-sm font-heading tracking-wider uppercase transition-all hover:-translate-y-px"
                style={{ fontWeight: 600, background: 'linear-gradient(135deg,#1E5AA8,#0EA5A0)' }}>
                Request a Demo <ArrowRight size={16}/>
              </Link>
              <Link href="/divisions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-gold-patih text-sm font-heading tracking-wider uppercase border border-gold-patih/40 transition-all hover:bg-gold-patih/10"
                style={{ fontWeight: 600 }}>
                Browse Divisions <ArrowUpRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
