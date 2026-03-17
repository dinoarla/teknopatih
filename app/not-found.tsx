import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { AitLogo } from '@/components/ui/AitLogo';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy-patih flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="mb-8 flex justify-center opacity-30">
            <AitLogo size="xl" variant="mark-only" />
          </div>
          <p className="font-mono text-teal-intelligence text-sm tracking-widest uppercase mb-4">
            404 — Not Found
          </p>
          <h1 className="font-heading font-800 text-5xl text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-white/45 mb-10 leading-relaxed">
            Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
          </p>
          <Link href="/" className="btn-primary text-white inline-flex">
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </>
  );
}
