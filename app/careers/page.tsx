'use client';

import React from 'react';
import { motion } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Sparkles, Briefcase, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const { user, openLogin } = useAuth();
  const router = useRouter();

  const handleCreateProfileClick = () => {
    if (user) {
      router.push('/create-profile');
    } else {
      openLogin('/create-profile');
    }
  };

  const whyWorkWithUs = [
    {
      title: "Build meaningful products",
      desc: "Work on a system connecting talent, businesses, and vendors. See your design and logic directly impact lives.",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      title: "Work on real-world technology",
      desc: "Employ highly performant architectures, Next.js App Router, modern Tailwind configurations, and cloud-hosted data engines.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Learn and grow",
      desc: "Surround yourself with creative, disciplined craftsmen. We fund books, courses, and engineering certifications.",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "Collaborate across disciplines",
      desc: "Our engineers design, our designers prototype, and our marketers write documentation. We operate with high ownership.",
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      title: "Make an impact",
      desc: "As an early-stage team member, every decision you make shapes the operational vision and engineering culture of Business Glider.",
      color: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.06)_0%,transparent_40%)]" />
      </div>

      <LightNav />

      <main className="flex-1 flex flex-col relative z-10 pt-12 md:pt-16 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center px-6 mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-4 block">
              Work With Us
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6 leading-tight">
              Build the Future with <span className="font-semibold text-indigo-600">Business Glider</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              Join a team working to make opportunities, hiring, and business connections simpler through technology. We prize intellectual rigor, visual aesthetics, and solid execution.
            </p>
          </motion.div>
        </section>

        {/* Why Work With Us Section */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-3 block">
              Culture & Values
            </span>
            <h2 className="text-2xl font-light tracking-tight text-slate-900">
              Why Work <span className="font-medium">With Us</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyWorkWithUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200/60 rounded-3xl p-7 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <div className={`p-2.5 rounded-xl border w-fit mb-5 ${item.color}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions Listing */}
        <section className="max-w-4xl mx-auto px-6 mb-24 w-full">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
              Join the Team
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900">
              Internal <span className="font-semibold text-indigo-600">Openings</span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No active internal openings right now</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
              We are not actively recruiting for internal roles at this moment, but new openings are posted regularly. You can submit your candidate profile to join our priority talent pool, or explore partner listings on the Business Glider Job Board.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCreateProfileClick}
                className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
              >
                Join Candidate Talent Pool
              </button>
              <button
                onClick={() => router.push('/jobs')}
                className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Browse Job Board &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* Custom Talent Network Header */}
        <section className="max-w-4xl mx-auto px-6 w-full">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.15)_0%,transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl space-y-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                Don&apos;t see a suitable opening?
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                Create a profile on Business Glider and stay connected with future opportunities. We routinely source active profiles before publishing vacancies publicly.
              </p>
              
              <button
                onClick={handleCreateProfileClick}
                className="inline-flex items-center gap-2 bg-white text-indigo-950 px-6 py-3.5 rounded-full text-xs font-bold hover:bg-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer mt-2"
              >
                <span>Create Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      <LightFooter />
    </div>
  );
}
