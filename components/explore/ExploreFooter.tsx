'use client';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ExploreFooter() {
  return (
    <footer className="w-full relative z-20 border-t border-white/[0.05] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="text-center md:text-left">
          <Link href="/" className="text-white/80 font-bold tracking-[0.2em] text-xs hover:text-white transition-colors">
            BUSINESS GLIDER
          </Link>
          <p className="text-[10px] text-white/30 mt-4 tracking-wider">
            © 2026 BUSINESS GLIDER
          </p>
        </div>
        
        <div className="flex gap-12 md:gap-24 text-center md:text-left">
          <div className="flex flex-col gap-3 text-[11px] font-medium tracking-wide text-white/40">
            <Link href="/jobs" className="hover:text-white transition-colors">Find Jobs</Link>
            <Link href="/hire" className="hover:text-white transition-colors">Hire Talent</Link>
            <Link href="/vendors" className="hover:text-white transition-colors">Vendors</Link>
            <Link href="/business" className="hover:text-white transition-colors">Business</Link>
          </div>
          <div className="flex flex-col gap-3 text-[11px] font-medium tracking-wide text-white/40">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
