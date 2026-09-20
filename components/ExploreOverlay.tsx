'use client';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Users, Store, TrendingUp, ArrowRight, X } from 'lucide-react';

interface ExploreOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const zones = [
  { num: "01", title: "Find Jobs", desc: "Discover opportunities that match your skills.", icon: Briefcase, cta: "Explore Jobs", href: "#jobs" },
  { num: "02", title: "Hire Talent", desc: "Find skilled people for your business.", icon: Users, cta: "Start Hiring", href: "#hire" },
  { num: "03", title: "Find Vendors", desc: "Connect with trusted business service providers.", icon: Store, cta: "Explore Vendors", href: "#vendors" },
  { num: "04", title: "Grow Your Business", desc: "Connect with opportunities, customers and services.", icon: TrendingUp, cta: "Explore Business", href: "#business" }
];

export default function ExploreOverlay({ isOpen, onClose }: ExploreOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-0 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-[95vw] md:w-[90vw] lg:w-[85vw] max-w-[1200px] z-50 flex flex-col"
          initial={{ y: 80, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full max-h-[85vh] md:h-[240px] overflow-y-auto md:overflow-visible bg-[rgba(255,255,255,0.03)] backdrop-blur-[35px] border border-[rgba(255,255,255,0.12)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(14,165,233,0.12)] rounded-t-[32px] md:rounded-[36px] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 border-b border-[rgba(255,255,255,0.08)] shrink-0">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <h2 className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase">Explore Business Glider</h2>
                <span className="hidden md:inline text-white/20">•</span>
                <p className="text-[11px] md:text-xs text-white/40 tracking-wide">Where opportunity meets business.</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105" 
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Zones */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.08)] h-full">
              {zones.map((zone, idx) => (
                <motion.a
                  key={zone.num}
                  href={zone.href}
                  className="group flex flex-col p-6 relative overflow-hidden h-[180px] md:h-auto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-[rgba(14,165,233,0)] group-hover:bg-[rgba(14,165,233,0.04)] transition-colors duration-400" />
                  <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-[rgba(14,165,233,0.2)] opacity-0 group-hover:opacity-100 shadow-[inset_0_0_30px_rgba(14,165,233,0.15)] transition-all duration-400" />
                  
                  {/* Top Row: Icon + Number */}
                  <div className="relative z-10 flex justify-between items-start mb-4 md:mb-6">
                    <zone.icon className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-sky-400 transition-colors duration-400" strokeWidth={1.5} />
                    <span className="text-[9px] md:text-[10px] tracking-widest text-white/20 font-medium group-hover:text-white/40 transition-colors duration-400">{zone.num}</span>
                  </div>
                  
                  {/* Bottom Row: Title + Desc + CTA */}
                  <div className="relative z-10 mt-auto flex flex-col">
                    <h3 className="text-base md:text-[17px] text-white/90 font-medium tracking-wide mb-1.5 group-hover:-translate-y-1 transition-transform duration-400">{zone.title}</h3>
                    <p className="text-[11px] md:text-xs text-white/40 leading-relaxed mb-4 line-clamp-2 md:line-clamp-none">{zone.desc}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-white/50 group-hover:text-sky-400 uppercase transition-colors duration-400 mt-auto">
                      {zone.cta}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-400" strokeWidth={2} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
