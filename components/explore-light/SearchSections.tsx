'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  Search, MapPin, Briefcase, Store, ArrowRight, 
  Code, TrendingUp, DollarSign, Users, GraduationCap, 
  HeartPulse, Utensils, HardHat, Wrench, Truck, 
  ShoppingBag, Film, Palette, ShieldCheck, Landmark, 
  Globe, Clock 
} from 'lucide-react';
import Link from 'next/link';
import { POPULAR_JOB_CATEGORIES } from '@/lib/data/categories';

const ICON_MAP: Record<string, any> = {
  Code, TrendingUp, DollarSign, Users, GraduationCap,
  HeartPulse, Utensils, HardHat, Wrench, Truck,
  ShoppingBag, Film, Palette, ShieldCheck, Landmark,
  Globe, Clock, Briefcase
};

export default function SearchSections() {
  const router = useRouter();

  // Job Search State
  const [jobQuery, setJobQuery] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobCategory, setJobCategory] = useState('');

  // Vendor Search State
  const [vendorQuery, setVendorQuery] = useState('');
  const [vendorLocation, setVendorLocation] = useState('');
  const [vendorCategory, setVendorCategory] = useState('');

  const handleJobSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (jobQuery && jobQuery.trim()) params.set('q', jobQuery.trim());
    if (jobLocation && jobLocation.trim()) params.set('location', jobLocation.trim());
    if (jobCategory && jobCategory.trim()) params.set('category', jobCategory.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleVendorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (vendorQuery && vendorQuery.trim()) params.set('q', vendorQuery.trim());
    if (vendorLocation && vendorLocation.trim()) params.set('location', vendorLocation.trim());
    if (vendorCategory && vendorCategory.trim()) params.set('category', vendorCategory.trim());
    router.push(`/vendors${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 relative z-10 space-y-32">
      {/* 1. JOBS SEARCH SECTION */}
      <section>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#0f172a]/40 mb-3 uppercase">Find Your Next Opportunity</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight">Search Jobs That Move You Forward.</h2>
        </motion.div>
        
        <motion.form 
          onSubmit={handleJobSearch}
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex flex-col md:flex-row items-center gap-3"
        >
          <div className="flex-1 flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <Search className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              placeholder="Search jobs, skills or companies" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <div className="flex-1 flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <MapPin className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              placeholder="City or location" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <div className="flex-1 flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <Briefcase className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              placeholder="Job category (e.g. IT, Sales)" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#0f172a] text-white px-8 py-3.5 rounded-xl text-[13px] font-medium hover:bg-[#1e293b] hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
          >
            Search Jobs &rarr;
          </button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
          <p className="text-[11px] text-[#0f172a]/40 mb-4 font-semibold tracking-widest uppercase">Popular Job Searches</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              { label: 'Software Developer', href: '/jobs?q=Software+Developer' },
              { label: 'React Engineer', href: '/jobs?q=React' },
              { label: 'Sales Executive', href: '/jobs?q=Sales+Executive' },
              { label: 'Accountant', href: '/jobs?q=Accountant' },
              { label: 'Delhi Jobs', href: '/jobs?location=Delhi' },
              { label: 'Remote Roles', href: '/jobs?workMode=Remote' },
              { label: 'Civil Engineer', href: '/jobs?q=Civil+Engineer' },
              { label: 'Product Designer', href: '/jobs?q=Product+Designer' },
            ].map(tag => (
              <Link 
                href={tag.href} 
                key={tag.label} 
                className="text-[11px] font-medium text-[#0f172a]/70 bg-white/50 border border-white/70 px-4 py-2 rounded-full hover:bg-white/90 hover:text-[#0f172a] hover:shadow-sm transition-all"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. POPULAR JOB CATEGORIES GRID (18 Clickable Cards) */}
      <section className="scroll-mt-24" id="categories">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#0f172a]/40 mb-3 uppercase">Explore By Specialization</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight">Popular Job Categories</h2>
          <p className="text-xs md:text-sm text-[#0f172a]/60 mt-2 max-w-md mx-auto">
            Browse verified career opportunities curated across leading business sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {POPULAR_JOB_CATEGORIES.map((cat, i) => {
            const IconComponent = ICON_MAP[cat.iconName] || Briefcase;
            let targetHref = '/jobs';
            if (cat.paramType === 'category') {
              targetHref = `/jobs?category=${encodeURIComponent(cat.queryParam)}`;
            } else if (cat.paramType === 'workMode') {
              targetHref = `/jobs?workMode=${encodeURIComponent(cat.queryParam)}`;
            } else if (cat.paramType === 'jobType') {
              targetHref = `/jobs?jobType=${encodeURIComponent(cat.queryParam)}`;
            }

            return (
              <Link 
                href={targetHref} 
                key={cat.id} 
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  className="h-full p-5 rounded-2xl bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:bg-white/80 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-white/80 border border-white/60 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#0f172a] group-hover:text-indigo-600 transition-colors truncate">
                        {cat.name}
                      </h3>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                    </div>
                    <p className="text-[11px] text-[#0f172a]/55 mt-1 line-clamp-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. VENDORS SEARCH SECTION */}
      <section>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#0f172a]/40 mb-3 uppercase">Business Services</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#0f172a] tracking-tight">Find the Right Vendor for Your Business.</h2>
        </motion.div>
        
        <motion.form 
          onSubmit={handleVendorSearch}
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex flex-col md:flex-row items-center gap-3"
        >
          <div className="flex-[1.2] flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <Search className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={vendorQuery}
              onChange={(e) => setVendorQuery(e.target.value)}
              placeholder="What service do you need? (e.g. Web Development, Printing)" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <div className="flex-1 flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <MapPin className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={vendorLocation}
              onChange={(e) => setVendorLocation(e.target.value)}
              placeholder="Location (e.g. Delhi, Noida)" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <div className="flex-[0.8] flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3.5 w-full border border-white/50 focus-within:border-indigo-400">
            <Store className="w-4 h-4 text-[#0f172a]/40" />
            <input 
              type="text" 
              value={vendorCategory}
              onChange={(e) => setVendorCategory(e.target.value)}
              placeholder="Category" 
              className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-[#0f172a]/40 text-[#0f172a]" 
            />
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#0f172a] text-white px-8 py-3.5 rounded-xl text-[13px] font-medium hover:bg-[#1e293b] hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
          >
            Search Vendors &rarr;
          </button>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
          <p className="text-[11px] text-[#0f172a]/40 mb-4 font-semibold tracking-widest uppercase">Popular Vendor Categories</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {['Web Development', 'Digital Marketing', 'Printing', 'Event Management', 'Photography', 'Construction', 'Security', 'Consultants', 'Suppliers'].map(tag => (
              <Link 
                href={`/vendors?category=${encodeURIComponent(tag)}`} 
                key={tag} 
                className="text-[11px] font-medium text-[#0f172a]/70 bg-white/50 border border-white/70 px-4 py-2 rounded-full hover:bg-white/90 hover:text-[#0f172a] transition-colors shadow-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
