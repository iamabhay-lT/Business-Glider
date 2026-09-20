'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Store, ArrowLeft, ShieldCheck, CheckCircle2, MessageCircle, Building2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useVendors } from '@/lib/services/platform-store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function VendorDashboard() {
  const { user } = useAuth();
  const vendors = useVendors();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0f172a] flex flex-col justify-between relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/explore" className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore</span>
          </Link>

          <Link href="/" className="flex flex-col text-center">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none">
              BUSINESS
            </span>
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none mt-1">
              GLIDER<span className="text-[9px] font-normal align-top ml-0.5">™</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <ProtectedRoute
        title="Vendor Dashboard"
        description="Please sign in with a verified account to access the vendor dashboard."
        redirectPath="/dashboard/vendor"
      >
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 relative z-10 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-semibold text-2xl shadow-md shadow-sky-200 shrink-0">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-medium text-slate-900">
                  Verified Vendor Network
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                  B2B Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Explore enterprise suppliers and verified commercial contractors across industrial and technology sectors.
              </p>
            </div>
          </div>

          <Link
            href="/register-vendor"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Register Your Vendor Profile</span>
          </Link>
        </div>

        {/* Vendor Grid */}
        {vendors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 max-w-xl mx-auto my-8 shadow-sm">
            <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No vendors available yet</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
              New verified business services and contractors will be listed here when approved.
            </p>
            <Link
              href="/register-vendor"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <span>Register as a Vendor</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-semibold">
                      {v.category}
                    </span>
                    {v.verified && (
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {v.name}
                  </h3>
                  <div className="text-xs text-slate-500 mb-3">
                    {v.location}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {v.description || (v as any).about}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rating: ★ {v.rating || 5.0}</span>
                  <a
                    href={`https://wa.me/${(v.phone || '').replace(/[^0-9]/g, '') || '918979393003'}?text=${encodeURIComponent(
                      `Hello Business Glider, I would like to connect with vendor: ${v.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Contact Vendor ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      </ProtectedRoute>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white/50 relative z-10">
        © {new Date().getFullYear()} Business Glider™ Platform. All rights reserved.
      </footer>
    </div>
  );
}
