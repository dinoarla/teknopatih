'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[AIT Website Error]', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-navy-patih flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="font-mono text-red-400 text-sm tracking-widest uppercase mb-4">
          Something went wrong
        </p>
        <h1 className="font-heading font-800 text-4xl text-white mb-4">
          Unexpected Error
        </h1>
        <p className="text-white/45 mb-8 text-sm font-mono">
          {error.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary text-white">
            <span>Try Again</span>
          </button>
          <Link href="/" className="btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
