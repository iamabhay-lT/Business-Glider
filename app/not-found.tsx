import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0f172a] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
