import type { Division, NavItem, StatCounter, TimelineItem } from '@/types';

// ============================================================
// AIT Brand Constants
// ============================================================

export const BRAND = {
  name: 'Arla Industri Teknopatih',
  shortName: 'AIT Group',
  tagline: 'AI Driven Data Decision Company',
  vision: 'Menjadi holding company teknologi terdepan di Asia Tenggara yang mengubah data menjadi keputusan cerdas untuk setiap industri.',
  foundedYear: 2013,
  location: 'Pontianak, Kalimantan Barat',
  values: ['Data-Driven', 'Adaptive', 'Trustworthy', 'Ambitious'],
  colors: {
    navyPatih: '#0A1628',
    techBlue: '#1E5AA8',
    tealIntelligence: '#0EA5A0',
    goldPatih: '#D4A843',
  },
} as const;

// ============================================================
// Navigation
// ============================================================

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: 'About', href: '/about' },
  { label: 'Divisions', href: '/divisions' },
  { label: 'Products', href: '/products' },
  { label: 'Impact', href: '/impact' },
  { label: 'Contact', href: '/contact' },
] as const;

// ============================================================
// Divisions Data
// ============================================================

export const DIVISIONS: ReadonlyArray<Division> = [
  {
    id: 'div-001',
    slug: 'industrial-iot',
    name: 'Industrial IoT Solutions',
    shortName: 'IoT Solutions',
    tagline: 'Real-time industrial intelligence at scale',
    description:
      'Solusi monitoring industri berbasis IoT untuk pembangkit listrik, pabrik, dan infrastruktur pemerintah. Produk unggulan AQORTA dan Fuel Monitor System.',
    icon: 'cpu',
    colorAccent: '#1E5AA8',
    tier: 1,
    revenueModel: 'Hardware-as-a-Service + SaaS Subscription',
    targetMarket: 'B2B — Pembangkit Listrik, Kawasan Industri, Pemerintah',
    products: [
      {
        id: 'prod-001',
        name: 'AQORTA',
        description: 'Air Quality Real-Time Monitoring Station — solusi pemantauan kualitas udara terjangkau untuk Indonesia.',
        divisionId: 'div-001',
        type: 'hardware',
        status: 'active',
      },
      {
        id: 'prod-002',
        name: 'Fuel Monitor System',
        description: 'Sistem monitoring konsumsi bahan bakar berbasis IoT untuk pembangkit dan alat berat.',
        divisionId: 'div-001',
        type: 'hardware',
        status: 'active',
      },
    ],
  },
  {
    id: 'div-002',
    slug: 'data-intelligence',
    name: 'Data Intelligence Platform',
    shortName: 'Data Intelligence',
    tagline: 'From raw data to market-moving insights',
    description:
      'Platform analitik berbasis AI untuk keputusan finansial dan bisnis. CoinSentiment.id menjadi produk unggulan dengan AI-powered sentiment scoring.',
    icon: 'bar-chart-2',
    colorAccent: '#0EA5A0',
    tier: 1,
    revenueModel: 'Freemium + Premium API Access',
    targetMarket: 'B2C/B2B — Trader, Investor, Institutional',
    products: [
      {
        id: 'prod-003',
        name: 'CoinSentiment.id',
        description: 'Platform analitik sentimen pasar kripto berbasis AI untuk investor dan trader Indonesia.',
        divisionId: 'div-002',
        type: 'platform',
        status: 'active',
      },
    ],
  },
  {
    id: 'div-003',
    slug: 'creative-media',
    name: 'Creative & Digital Media',
    shortName: 'Creative Media',
    tagline: 'Stories that build brands and move markets',
    description:
      'Divisi kreatif yang menghasilkan konten digital, video profil perusahaan, dan produksi media untuk klien B2B dan B2C.',
    icon: 'video',
    colorAccent: '#D4A843',
    tier: 2,
    revenueModel: 'Project-based + Retainer',
    targetMarket: 'B2B/B2C — Brand, Event, Film',
    products: [
      {
        id: 'prod-004',
        name: 'HUD Production',
        description: 'Studio produksi kreatif full-service untuk korporat, event, dan konten digital.',
        divisionId: 'div-003',
        type: 'service',
        status: 'active',
      },
    ],
  },
  {
    id: 'div-004',
    slug: 'fb-ventures',
    name: 'F&B Ventures',
    shortName: 'F&B Ventures',
    tagline: 'Data-driven food business innovation',
    description:
      'Bisnis kuliner yang dikelola dengan pendekatan data untuk inventory management dan franchise development.',
    icon: 'utensils',
    colorAccent: '#D4A843',
    tier: 3,
    revenueModel: 'Product Sales + Franchise',
    targetMarket: 'B2C — Konsumen Massal',
    products: [
      {
        id: 'prod-005',
        name: 'MumaBila',
        description: 'Brand kuliner lokal Pontianak dengan pendekatan data-driven untuk skala franchise.',
        divisionId: 'div-004',
        type: 'service',
        status: 'active',
      },
    ],
  },
  {
    id: 'div-005',
    slug: 'edutech',
    name: 'EduTech Solutions',
    shortName: 'EduTech',
    tagline: 'AI-powered learning for the digital era',
    description:
      'Platform edukasi berbasis teknologi dengan AI-powered personalized learning untuk bahasa Arab dan konten pendidikan lainnya.',
    icon: 'graduation-cap',
    colorAccent: '#0EA5A0',
    tier: 2,
    revenueModel: 'Subscription + In-App Purchase',
    targetMarket: 'B2C — Pelajar, Komunitas, Lembaga',
    products: [
      {
        id: 'prod-006',
        name: 'Arabiya',
        description: 'Platform belajar bahasa Arab berbasis AI dengan gamifikasi untuk pemula hingga mahir.',
        divisionId: 'div-005',
        type: 'platform',
        status: 'beta',
      },
    ],
  },
  {
    id: 'div-006',
    slug: 'social-impact',
    name: 'Social Impact & Philanthropy',
    shortName: 'Social Impact',
    tagline: 'Technology as a force for good',
    description:
      'Inisiatif sosial transparan berbasis teknologi, termasuk Rumah Tahfidz Modern Pontianak dengan dashboard donasi real-time.',
    icon: 'heart',
    colorAccent: '#1E5AA8',
    tier: 3,
    revenueModel: 'Donation + Endowment',
    targetMarket: 'Donatur, Komunitas, Yayasan',
    products: [
      {
        id: 'prod-007',
        name: 'Rumah Tahfidz Modern Pontianak',
        description: 'Program tahfidz modern dengan kurikulum terstruktur dan dashboard transparansi donasi.',
        divisionId: 'div-006',
        type: 'service',
        status: 'active',
      },
    ],
  },
  {
    id: 'div-007',
    slug: 'spiritual-travel',
    name: 'Spiritual Travel & Hajj Services',
    shortName: 'Hajj Services',
    tagline: 'Tech-enabled journey to the holy land',
    description:
      'Layanan perjalanan haji dan umroh yang ditingkatkan dengan teknologi: app tracking, digital manasik, dan pengalaman premium.',
    icon: 'map-pin',
    colorAccent: '#D4A843',
    tier: 3,
    revenueModel: 'Package Sales + Premium Tier',
    targetMarket: 'B2C — Jamaah Haji & Umroh',
    products: [
      {
        id: 'prod-008',
        name: 'Haji & Umroh Digital',
        description: 'Paket perjalanan ibadah dengan layanan app tracking, digital manasik, dan dukungan AI.',
        divisionId: 'div-007',
        type: 'service',
        status: 'coming-soon',
      },
    ],
  },
] as const;

// ============================================================
// Stats
// ============================================================

export const STATS: ReadonlyArray<StatCounter> = [
  { label: 'Years Operating', value: 13, suffix: '+' },
  { label: 'Business Divisions', value: 7, suffix: '' },
  { label: 'Active Products', value: 8, suffix: '+' },
  { label: 'Cities Reached', value: 12, suffix: '+' },
] as const;

// ============================================================
// Timeline
// ============================================================

export const TIMELINE: ReadonlyArray<TimelineItem> = [
  { year: 2013, title: 'AIT Founded', description: 'Arla Industri Teknopatih berdiri di Pontianak, Kalimantan Barat.', milestone: true },
  { year: 2015, title: 'IoT Division Launch', description: 'Industrial IoT Solutions mulai beroperasi dengan klien pembangkit listrik pertama.', milestone: false },
  { year: 2017, title: 'Creative Media', description: 'HUD Production hadir sebagai divisi kreatif untuk mendukung ekosistem AIT.', milestone: false },
  { year: 2019, title: 'Data Intelligence', description: 'CoinSentiment.id diluncurkan sebagai platform analitik kripto berbasis AI.', milestone: true },
  { year: 2021, title: 'AQORTA Launch', description: 'Produk Air Quality Monitoring Station untuk pasar pemerintah dan industri.', milestone: true },
  { year: 2023, title: 'EduTech & Social', description: 'Ekspansi ke EduTech Solutions dan Social Impact & Philanthropy.', milestone: false },
  { year: 2026, title: 'AI Transformation', description: 'Transformasi penuh menjadi AI Driven Data Decision Company dengan 7 divisi aktif.', milestone: true },
] as const;
