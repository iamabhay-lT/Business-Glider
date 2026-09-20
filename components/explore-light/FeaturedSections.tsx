'use client';
import { useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useJobs, useVendors } from '@/lib/services/platform-store';

const emptySubscribe = () => () => {};

export default function FeaturedSections() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const allJobs = useJobs();
  const allVendors = useVendors();
  const jobs = isMounted ? allJobs.slice(0, 4) : [];
  const vendors = isMounted ? allVendors.slice(0, 3) : [];

  const headingAnimation = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
  };

  const fadeUpAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 space-y-32">
      
      {/* Featured Jobs */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <motion.h2 {...headingAnimation} className="text-2xl md:text-3xl font-medium text-[#0f172a] tracking-tight">
            Featured Jobs
          </motion.h2>
          <Link href="/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors hidden sm:block">View all jobs &rarr;</Link>
        </div>
        
        {jobs.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">No jobs available yet</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-2 mb-6">
              Verified employer openings will appear here as soon as they are posted on Business Glider.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/hire"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                className="px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
              >
                Browse Job Board
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job, i) => (
              <motion.div key={job.id ? `job-${job.id}` : `job-${job.title}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col bg-white/50 backdrop-blur-md border border-white/70 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white/70 hover:shadow-[0_15px_40px_rgba(139,92,246,0.06)] hover:-translate-y-1 transition-all duration-400">
                <h3 className="text-base font-bold text-[#0f172a] mb-1 line-clamp-1">{job.title}</h3>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#0f172a]/60 mb-4">
                  <span className="truncate">{job.company}</span> <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> <span className="sr-only">Verified Employer</span>
                </div>
                <div className="flex flex-col gap-2 mb-8">
                  <span className="text-[11px] font-medium px-2.5 py-1.5 bg-[#0f172a]/5 text-[#0f172a]/70 rounded-md w-fit truncate max-w-full">{job.location}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1.5 bg-[#0f172a]/5 text-[#0f172a]/70 rounded-md w-fit">{job.salary}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1.5 bg-[#0f172a]/5 text-[#0f172a]/70 rounded-md w-fit">{job.jobType} • {job.experience}</span>
                </div>
                <Link href={`/jobs/${job.id}`} className="mt-auto flex items-center justify-between text-xs font-bold tracking-widest text-[#0f172a] hover:text-indigo-600 uppercase transition-colors group">
                  View Job <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Verified Vendors */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <motion.h2 {...headingAnimation} className="text-2xl md:text-3xl font-medium text-[#0f172a] tracking-tight">
            Verified Vendors
          </motion.h2>
          <Link href="/vendors" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors hidden sm:block">View all vendors &rarr;</Link>
        </div>
        
        {vendors.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">No vendors available yet</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-2 mb-6">
              Verified service providers and B2B agencies will appear here once registered.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/register-vendor"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Register as Vendor
              </Link>
              <Link
                href="/vendors"
                className="px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendors.map((vendor, i) => (
              <motion.div key={vendor.id ? `vendor-${vendor.id}` : `vendor-${vendor.name}-${i}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col bg-white/50 backdrop-blur-md border border-white/70 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white/70 hover:shadow-[0_15px_40px_rgba(139,92,246,0.06)] hover:-translate-y-1 transition-all duration-400">
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">{vendor.name}</h3>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#0f172a]/60 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" /> {vendor.verified ? 'Verified Business' : 'Partner Listing'}
                </div>
                <p className="text-[11px] font-medium text-[#0f172a]/50 mb-6">{vendor.category} • {vendor.location} • ★ {typeof vendor.rating === 'number' ? vendor.rating.toFixed(1) : '5.0'}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {(vendor.services || []).slice(0, 3).map((s, sIdx) => (
                    <span key={`${vendor.id || vendor.name}-srv-${sIdx}-${s}`} className="text-[10px] font-medium px-2.5 py-1.5 bg-white border border-[#0f172a]/10 text-[#0f172a]/60 rounded-md">{s}</span>
                  ))}
                </div>
                <Link href="/vendors" className="mt-auto flex items-center justify-between text-xs font-bold tracking-widest text-[#0f172a] hover:text-indigo-600 uppercase transition-colors group">
                  View Vendor <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-12">
        <motion.div {...fadeUpAnimation} className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#0f172a]/40 mb-3 uppercase">How Business Glider Works</p>
            <h2 className="text-3xl font-medium text-[#0f172a] tracking-tight mb-4 max-w-sm mx-auto md:mx-0">One platform connecting people, businesses and opportunities.</h2>
          </div>
          <div className="flex-[1.5] flex flex-col sm:flex-row items-center gap-8 md:gap-12 w-full justify-center md:justify-end">
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-sm font-bold text-indigo-500 tracking-widest">01</span>
              <h4 className="text-[13px] font-bold tracking-widest text-[#0f172a] uppercase">Discover</h4>
              <p className="text-xs font-medium text-[#0f172a]/50 max-w-[140px]">Find jobs, talent and business services.</p>
            </div>
            <div className="hidden sm:block w-8 h-[1px] bg-[#0f172a]/10" />
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-sm font-bold text-indigo-500 tracking-widest">02</span>
              <h4 className="text-[13px] font-bold tracking-widest text-[#0f172a] uppercase">Connect</h4>
              <p className="text-xs font-medium text-[#0f172a]/50 max-w-[140px]">Connect with candidates, employers and vendors.</p>
            </div>
            <div className="hidden sm:block w-8 h-[1px] bg-[#0f172a]/10" />
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-sm font-bold text-indigo-500 tracking-widest">03</span>
              <h4 className="text-[13px] font-bold tracking-widest text-[#0f172a] uppercase">Grow</h4>
              <p className="text-xs font-medium text-[#0f172a]/50 max-w-[140px]">Turn connections into opportunities.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="pt-12">
        <motion.h2 {...fadeUpAnimation} className="text-center text-3xl font-medium text-[#0f172a] tracking-tight mb-16">
          Built Around Opportunity.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { q: "Business Glider made it easier to discover the right opportunity.", a: "Job Seeker" },
            { q: "Finding candidates became much simpler.", a: "Employer" },
            { q: "We can showcase our services and reach businesses.", a: "Vendor" }
          ].map((t, i) => (
            <motion.div key={`testimonial-${i}`} {...fadeUpAnimation} transition={{ delay: i * 0.1 }} className="p-10 rounded-[28px] bg-white/40 backdrop-blur-md border border-white/60 text-center flex flex-col justify-center shadow-sm">
              <p className="text-[13px] md:text-sm text-[#0f172a]/80 font-medium leading-relaxed mb-8 italic">&ldquo;{t.q}&rdquo;</p>
              <p className="text-xs font-bold tracking-widest text-[#0f172a]/40 uppercase">— {t.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
