'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Briefcase, Users, Store, Building2, UserCircle2, ArrowRight } from 'lucide-react';

const options = [
  { id: '01', title: 'FIND JOBS', desc: 'Discover opportunities across industries, locations and experience levels.', cta: 'Explore Jobs', icon: Briefcase, href: '/jobs', cols: 'col-span-1 md:col-span-1' },
  { id: '02', title: 'HIRE EMPLOYEES', desc: 'Find skilled candidates and build the right team for your business.', cta: 'Start Hiring', icon: Users, href: '/hire', cols: 'col-span-1 md:col-span-1' },
  { id: '03', title: 'FIND VENDORS', desc: 'Discover trusted suppliers, agencies and professional service providers.', cta: 'Explore Vendors', icon: Store, href: '/vendors', cols: 'col-span-1 md:col-span-2' },
  { id: '04', title: 'REGISTER AS VENDOR', desc: 'Showcase your business and connect with new customers and opportunities.', cta: 'Register Your Business', icon: Building2, href: '/register-vendor', cols: 'col-span-1 md:col-span-1' },
  { id: '05', title: 'CREATE JOB SEEKER PROFILE', desc: 'Build your professional profile and let the right opportunities find you.', cta: 'Create Profile', icon: UserCircle2, href: '/create-profile', cols: 'col-span-1 md:col-span-1' },
];

export default function PlatformOptions() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <p className="text-[10px] font-bold tracking-[0.2em] text-[#0f172a]/40 mb-3 uppercase">Explore Business Glider</p>
        <h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight">Choose What You&apos;re Looking For.</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((opt, i) => (
          <Link href={opt.href} key={opt.id} className={`${opt.cols} group block h-full`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full flex flex-col p-8 md:p-10 rounded-[32px] bg-white/45 backdrop-blur-[25px] border border-white/65 shadow-[0_8px_40px_rgba(0,0,0,0.03)] hover:bg-white/60 hover:shadow-[0_15px_50px_rgba(139,92,246,0.08)] hover:border-white/80 transition-all duration-400 relative overflow-hidden"
            >
              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-12">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-semibold tracking-widest text-[#0f172a]/30">{opt.id}</span>
                  <h3 className="text-lg md:text-xl font-bold tracking-wide text-[#0f172a] group-hover:-translate-y-0.5 transition-transform duration-400">{opt.title}</h3>
                </div>
                <opt.icon className="w-6 h-6 text-[#0f172a]/20 group-hover:text-indigo-500 transition-colors duration-400" strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10 mt-auto flex flex-col items-start">
                <p className="text-[13px] md:text-sm text-[#0f172a]/60 leading-relaxed max-w-sm mb-6 group-hover:-translate-y-0.5 transition-transform duration-400">{opt.desc}</p>
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#0f172a]/40 group-hover:text-indigo-600 uppercase transition-colors duration-400 mt-auto">
                  {opt.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-400" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
