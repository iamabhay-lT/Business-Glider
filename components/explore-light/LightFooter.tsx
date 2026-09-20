'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LightFooter() {
  return (
    <div className="w-full relative z-20">
      {/* Final CTA */}
      <section className="relative w-full max-w-5xl mx-auto px-6 py-24 md:py-32 mb-20">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_20px_60px_rgba(139,92,246,0.05)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 flex flex-col items-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-medium text-[#0f172a] tracking-tight mb-6">Ready to Move Forward?</h2>
          <p className="text-sm md:text-base text-[#0f172a]/60 mb-10 max-w-md leading-relaxed">Join Business Glider and become part of a growing ecosystem of people and businesses.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register-vendor" className="flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1e293b] hover:shadow-xl hover:shadow-indigo-900/15 transition-all duration-300 hover:-translate-y-0.5">
              Join Business Glider <ArrowUpRight className="w-4 h-4 opacity-70" />
            </Link>
            <Link href="/jobs" className="flex items-center gap-2 bg-transparent border border-[#0f172a]/20 text-[#0f172a] px-8 py-4 rounded-full text-sm font-medium hover:bg-white/50 transition-all duration-300">
              Explore Jobs &rarr;
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[#0f172a]/5 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <Link href="/" className="text-[#0f172a] font-bold tracking-[0.2em] text-xs hover:opacity-70 transition-opacity block">
                BUSINESS GLIDER™
              </Link>
              <p className="text-[13px] text-[#0f172a]/50 max-w-xs leading-relaxed font-medium">
                Find opportunities. Hire talent. Connect with businesses.
              </p>
              
              {/* Disabled/placeholder social media links */}
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 h-8 rounded-full border border-[#0f172a]/10 flex items-center justify-center text-[#0f172a]/40 cursor-not-allowed select-none transition-colors" title="Socials coming soon">
                  <span className="text-[10px] font-bold">X</span>
                </span>
                <span className="w-8 h-8 rounded-full border border-[#0f172a]/10 flex items-center justify-center text-[#0f172a]/40 cursor-not-allowed select-none transition-colors" title="Socials coming soon">
                  <span className="text-[10px] font-bold">IN</span>
                </span>
                <span className="w-8 h-8 rounded-full border border-[#0f172a]/10 flex items-center justify-center text-[#0f172a]/40 cursor-not-allowed select-none transition-colors" title="Socials coming soon">
                  <span className="text-[10px] font-bold">FB</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0f172a]/30 uppercase mb-1">Business Glider™</span>
              <Link href="/jobs" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Find Jobs</Link>
              <Link href="/hire" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Hire Employees</Link>
              <Link href="/vendors" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Find Vendors</Link>
              <Link href="/register-vendor" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Register as Vendor</Link>
              <Link href="/create-profile" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Create Profile</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0f172a]/30 uppercase mb-1">Company</span>
              <Link href="/about" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">About</Link>
              <Link href="/contact" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Contact</Link>
              <Link href="/careers" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Careers</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0f172a]/30 uppercase mb-1">Legal & Support</span>
              <Link href="/help" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Help Center</Link>
              <Link href="/privacy" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs font-medium text-[#0f172a]/60 hover:text-[#0f172a] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-[#0f172a]/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-semibold text-[#0f172a]/40 tracking-wide uppercase">
              © 2026 BUSINESS GLIDER. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
