'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white flex min-h-screen items-center justify-center p-4">
        <div className="text-center max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-3 text-white">Something went wrong</h2>
          <p className="text-zinc-400 mb-6 text-xs leading-relaxed">
            {error?.message || 'An unexpected application error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black rounded-xl text-xs font-semibold hover:bg-zinc-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
