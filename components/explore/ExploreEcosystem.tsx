'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { num: '01', title: 'FIND JOBS', eyebrow: 'Discover your next opportunity.', desc: 'Search jobs across industries, locations and experience levels.', cta: 'Explore Jobs', href: '/jobs' },
  { num: '02', title: 'HIRE TALENT', eyebrow: 'Find people who move your business forward.', desc: 'Post jobs, discover candidates and manage your hiring process.', cta: 'Hire Talent', href: '/hire' },
  { num: '03', title: 'FIND VENDORS', eyebrow: 'Find trusted businesses and services.', desc: 'Discover vendors, agencies, suppliers and professional services.', cta: 'Explore Vendors', href: '/vendors' },
  { num: '04', title: 'GROW YOUR BUSINESS', eyebrow: 'Connect with opportunities that move business forward.', desc: 'Build your business network, find customers and discover new opportunities.', cta: 'Grow Business', href: '/business' },
];

export default function ExploreEcosystem() {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-24 mb-32 px-4 z-10">
      
      {/* Central Connection Visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] z-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-300/20 shadow-[0_0_40px_rgba(56,189,248,0.5)] border border-white/20 backdrop-blur-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
        {cards.map((card, idx) => (
          <Link href={card.href} key={card.num}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between p-8 md:p-12 h-[280px] md:h-[320px] rounded-[24px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.15)] transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-12">
                <h3 className="text-sm md:text-base font-bold tracking-widest text-white/90 group-hover:-translate-y-0.5 transition-transform duration-500">{card.title}</h3>
                <span className="text-xs font-semibold tracking-widest text-white/20 group-hover:text-sky-400 transition-colors duration-500">{card.num}</span>
              </div>
              
              <div className="relative z-10">
                <p className="text-[13px] md:text-sm text-white/70 mb-2 font-medium">{card.eyebrow}</p>
                <p className="text-xs text-white/40 leading-relaxed mb-6 max-w-sm">{card.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/30 group-hover:text-sky-400 transition-colors duration-500">
                  {card.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
