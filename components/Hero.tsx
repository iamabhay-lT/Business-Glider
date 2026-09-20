'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SparklesCore } from './ui/sparkles';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  // Proactively prefetch the route as soon as Page 1 loads
  useEffect(() => {
    router.prefetch('/explore');
  }, [router]);

  return (
    <AnimatePresence>
      <motion.div 
        className="flex flex-col items-center justify-center w-full relative z-20"
      >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tight text-white mb-2 text-center z-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            BUSINESS GLIDER
          </motion.h1>
          
          <div className="w-[100vw] md:w-[800px] h-[120px] md:h-[200px] relative flex flex-col items-center -mt-6 md:-mt-8">
            {/* Glow Line */}
            <motion.div 
              className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 w-[60%] md:w-[70%] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-[2px] z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 w-[30%] md:w-[40%] h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            {/* Radial Gradient Mask on Sparkles */}
            <div className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(350px_100px_at_top,white,transparent)] md:[mask-image:radial-gradient(450px_150px_at_top,white,transparent)] pointer-events-none">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.2}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
          </div>

          <div className="h-16 flex items-center justify-center z-20 mt-4 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            >
              <Link 
                href="/explore"
                prefetch={true}
                className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium text-[13px] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-400 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Business Glider</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={2} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}

