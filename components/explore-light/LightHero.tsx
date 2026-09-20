'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import CompanyOrbit3D from './CompanyOrbit3D';

export default function LightHero() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-32 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
      <motion.div
        initial={{ opacity: 0.85, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-start text-left"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-light tracking-[-0.02em] text-[#0f172a] mb-6">
          Everything<br />
          You Need.<br />
          One Place.
        </h1>
        <p className="text-sm md:text-base text-[#0f172a]/60 max-w-md leading-relaxed mb-10">
          Find opportunities, hire skilled talent, and connect with trusted businesses and services.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/jobs" className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#0f172a] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[#1e293b] hover:shadow-lg hover:shadow-indigo-900/10 transition-all duration-300">
            Find Jobs <ArrowUpRight className="w-4 h-4 opacity-70" />
          </Link>
          <Link href="/hire" className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white/40 border border-white/60 backdrop-blur-md text-[#0f172a] px-6 py-3.5 rounded-full text-sm font-medium hover:bg-white/60 hover:shadow-lg hover:shadow-indigo-900/5 transition-all duration-300">
            Hire Employees <ArrowUpRight className="w-4 h-4 opacity-70" />
          </Link>
        </div>
      </motion.div>

      {/* Right-Side 3D Rotating Company-Logo Ecosystem */}
      <motion.div
        initial={{ opacity: 0.9, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative w-full flex items-center justify-center min-h-[360px] md:min-h-[480px]"
      >
        <CompanyOrbit3D />
      </motion.div>
    </div>
  );
}
