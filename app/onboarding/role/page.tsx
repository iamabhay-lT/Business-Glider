'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Briefcase, Building2, Store, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { useEffect } from 'react';

export default function RoleSelectionPage() {
  const router = useRouter();
  const { updateRole, user, profile } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  const handleSelectRole = async (role: UserRole) => {
    await updateRole(role);
    if (role === 'job_seeker') {
      router.push('/onboarding/job-seeker');
    } else if (role === 'employer') {
      router.push('/dashboard/employer');
    } else {
      router.push('/vendors');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#0f172a] flex flex-col justify-center items-center p-6">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
          <p className="text-sm text-slate-500 mb-6">
            You must be logged in to configure your role.
          </p>
          <Link
            href="/auth"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold inline-block"
          >
            Sign In / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0f172a] flex flex-col justify-between relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08)_0%,transparent_40%)]" />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none">
            BUSINESS
          </span>
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none mt-1">
            GLIDER<span className="text-[9px] font-normal align-top ml-0.5">™</span>
          </span>
        </Link>
        {user && (
          <div className="text-xs text-slate-500 font-medium">
            Signed in as <span className="text-slate-800 font-semibold">{profile?.full_name || user.email || 'User'}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mb-12">
          <div className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 mb-3 bg-indigo-50 px-3.5 py-1 rounded-full">
            Role Selection
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-4">
            What are you here to do?
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            Personalize your Business Glider experience. You can seamlessly switch or expand your capabilities at any time.
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Find a Job */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelectRole('job_seeker')}
            className="cursor-pointer group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                Find a Job
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Discover verified openings, build your profile, upload your resume, and track applications with real-time ticket timelines.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
              <span>Continue as Job Seeker</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 2: Hire Employees */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelectRole('employer')}
            className="cursor-pointer group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                Hire Employees
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Publish positions, screen candidates by application ticket, inspect resumes, schedule interviews, and manage hiring pipelines.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
              <span>Continue as Employer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Card 3: Find Vendors */}
          <motion.div
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelectRole('vendor')}
            className="cursor-pointer group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-200/80 shadow-[0_15px_35px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_45px_rgba(56,189,248,0.12)] hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                <Store className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                Find Vendors
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Connect with verified B2B suppliers, industrial contractors, enterprise service partners, and procurement opportunities.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-sky-600 group-hover:text-sky-700">
              <span>Continue to Vendors</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 relative z-10">
        Need assistance? Call or WhatsApp our team at <a href="https://wa.me/918979393003" className="text-slate-600 font-medium hover:underline">+91 89793 93003</a>
      </footer>
    </div>
  );
}
