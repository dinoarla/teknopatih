import type { Metadata, Viewport } from 'next';
import { DM_Serif_Display, Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: 'AIT Group — AI Driven Data Decision Company',
    template: '%s | AIT Group',
  },
  description:
    'Arla Industri Teknopatih (AIT Group) — Holding company teknologi terdepan dari Pontianak yang mengubah data menjadi keputusan cerdas untuk 7 industri.',
  keywords: [
    'AIT Group', 'Arla Industri Teknopatih', 'AI Driven',
    'IoT', 'Data Intelligence', 'Pontianak', 'Kalimantan Barat', 'Teknologi Indonesia',
  ],
  authors: [{ name: 'AIT Group', url: 'https://ait.co.id' }],
  creator: 'AIT Group',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logos/ait-mark.svg', type: 'image/svg+xml' },
    ],
    apple: '/logos/ait-mark.svg',
    shortcut: '/logos/ait-mark.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://ait.co.id',
    title: 'AIT Group — AI Driven Data Decision Company',
    description: 'Holding company teknologi dari Pontianak dengan 7 divisi aktif.',
    siteName: 'AIT Group',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${dmSerifDisplay.variable} ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-navy-patih text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}
