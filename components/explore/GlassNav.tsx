'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function GlassNav() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-6xl z-50 flex items-center justify-between px-6 py-4 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      <Link href="/" className="text-white font-semibold tracking-[0.15em] text-[10px] md:text-xs hover:opacity-80 transition-opacity">
        BUSINESS GLIDER
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-wide text-white/50">
        <Link href="/jobs" className="hover:text-white transition-colors">Jobs</Link>
        <Link href="/hire" className="hover:text-white transition-colors">Hire Talent</Link>
        <Link href="/vendors" className="hover:text-white transition-colors">Vendors</Link>
        <Link href="/business" className="hover:text-white transition-colors">Business</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
      </div>
      
      <div className="flex items-center gap-5">
        <Link href="/login" className="text-[11px] font-medium tracking-wide text-white/50 hover:text-white transition-colors hidden sm:block">
          Login
        </Link>
        <Link href="/start" className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide hover:bg-white/90 hover:scale-105 transition-all duration-300">
          Get Started <ArrowUpRight className="w-3 h-3 opacity-70" strokeWidth={2.5} />
        </Link>
      </div>
    </motion.nav>
  );
}
