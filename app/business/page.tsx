import React from 'react';
import Link from 'next/link';
import { Building2, Store, Users, ShieldCheck, ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';

export const metadata = {
  title: 'Business Solutions — Business Glider',
  description: 'Enterprise hiring, verified B2B vendor partnerships, and corporate solutions.',
};

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            Enterprise & B2B Solutions
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-950 mt-2 mb-4">
            Grow Your Business With Verified Talent & Partners
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Business Glider connects modern enterprises, startups, and service agencies across India with top talent and high-performance B2B service providers.
          </p>
        </div>

        {/* 2 Main Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Enterprise Talent & Hiring */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Hire Verified Talent
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6">
                Post full-time, part-time, or remote roles to our verified professional candidate network. Screen candidates, manage applications with ticket tracking, and interview directly.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Verified applicants with authentic resumes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Live ticket tracking and direct contact details</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Dedicated Employer Dashboard with interview stages</span>
                </li>
              </ul>
            </div>
            <Link
              href="/hire"
              className="py-3.5 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>Post a Job Opening</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: B2B Vendor Marketplace */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Store className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Verified Vendor Directory
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-6">
                Showcase your specialized agency, software consultancy, printing, or enterprise services to thousands of verified businesses seeking reliable B2B partners.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Business Glider Verification Badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct client leads delivered via WhatsApp and email</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Categorized directory listing with portfolio & client reviews</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register-vendor"
              className="py-3.5 px-6 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Register as a Vendor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Support & Contact Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">
              Dedicated Corporate Support
            </span>
            <h3 className="text-xl md:text-2xl font-bold mt-1 mb-2">
              Need custom enterprise onboarding or bulk recruitment?
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-lg">
              Our business development team is available on phone and WhatsApp to assist with custom vendor onboarding, recruitment partnerships, and enterprise contracts.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/918979393003?text=Hello%20Business%20Glider,%20I'm%20inquiring%20about%20enterprise%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <WhatsAppFloat />
    </div>
  );
}
