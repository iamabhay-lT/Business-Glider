'use client';

import React from 'react';
import { motion } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import { 
  Compass, 
  Target, 
  Eye, 
  Briefcase, 
  Building2, 
  Store, 
  Network, 
  FileText, 
  CheckCircle2,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const founders = [
    {
      name: 'Priyanka Chaturvedi',
      role: 'Co-Founder',
      initials: 'PC',
      paragraphs: [
        "Priyanka Chaturvedi is a Co-Founder of Business Glider and has been part of the company's journey since its inception in 2022. With a focus on building a platform around real-world business and professional needs, she contributes to the vision, direction, and development of Business Glider.",
        "Her approach centers on creating a more accessible and connected ecosystem where individuals can discover career opportunities while businesses can find talent, services, and new opportunities through a single platform."
      ]
    },
    {
      name: 'Roshan Singh',
      role: 'Co-Founder',
      initials: 'RS',
      paragraphs: [
        "Roshan Singh is a Co-Founder of Business Glider and has been involved in shaping the company since its establishment in 2022. He contributes to the company's broader vision of bringing job seekers, employers, vendors, and businesses together through technology.",
        "As part of the founding team, Roshan focuses on helping develop Business Glider into a practical digital platform designed to simplify professional connections, hiring, and business discovery."
      ]
    }
  ];

  const timelineEvents = [
    {
      period: '2022',
      tag: 'The Beginning',
      description: 'Business Glider was started in 2022 with a simple idea: make professional opportunities and business connections easier to discover and access.'
    },
    {
      period: 'Today',
      tag: 'Connected Ecosystem',
      description: 'Business Glider is being developed as a platform where users can find jobs, hire talent, discover vendors, build professional profiles, and create new business connections—all in one place.'
    }
  ];

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.06)_0%,transparent_40%)]" />
      </div>

      <LightNav />

      <main className="flex-1 flex flex-col relative z-10 pt-12 md:pt-20">
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center px-6 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-4 block">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-slate-900 mb-6 leading-tight">
              About <span className="font-semibold text-indigo-600">Business Glider</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
              Business Glider is a unified digital platform designed to connect people, businesses, talent, and professional services in one connected ecosystem.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20 md:mb-24 grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4 text-slate-900">Our Mission</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                Our mission is to make finding opportunities, hiring talent, and discovering reliable business services simpler, faster, and more accessible through technology.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs font-semibold text-indigo-600 tracking-wider uppercase">
              Technology &bull; Connection &bull; Access
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl w-fit mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4 text-slate-900">Our Vision</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                To build a connected digital ecosystem where people can discover meaningful opportunities, businesses can find the right talent, and organizations can connect with trusted service providers.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs font-semibold text-violet-600 tracking-wider uppercase">
              Growth &bull; Discovery &bull; Trust
            </div>
          </motion.div>
        </section>

        {/* Meet the Founders Section */}
        <section id="founders" className="max-w-6xl mx-auto px-6 mb-24 w-full">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
              Leadership &amp; Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              Meet the <span className="font-semibold text-indigo-600">Founders</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed max-w-3xl mx-auto mt-4">
              Business Glider was founded in 2022 with a vision to create a connected digital ecosystem where people, businesses, talent, and service providers can discover opportunities and build meaningful professional connections.
            </p>
          </div>

          {/* Founder Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)] hover:border-indigo-200/80 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Portrait Area / Placeholder */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-slate-100 border border-indigo-100/70 flex items-center justify-center shrink-0 shadow-inner group-hover:border-indigo-300 transition-colors overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
                      {/* Neutral portrait monogram placeholder */}
                      <span className="text-2xl md:text-3xl font-semibold tracking-wider text-indigo-900/80 select-none">
                        {founder.initials}
                      </span>
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-100/60 uppercase mb-2">
                        {founder.role}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                        {founder.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-light mt-0.5">
                        Business Glider &bull; Est. 2022
                      </p>
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="space-y-3.5 text-slate-600 text-sm font-light leading-relaxed">
                    {founder.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-light">Founding Team</span>
                  <span className="font-medium text-indigo-600">Since 2022</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Section */}
          <div className="bg-gradient-to-br from-white via-indigo-50/20 to-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-2 block">
                Company Journey
              </span>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
                The <span className="font-semibold text-indigo-600">Evolution</span> of Business Glider
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
              {timelineEvents.map((event, idx) => (
                <div 
                  key={event.period}
                  className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-slate-900 tracking-tight">
                      {event.period}
                    </span>
                    <span className="text-slate-300 font-light">&mdash;</span>
                    <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase bg-indigo-50 px-2.5 py-1 rounded-md">
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do section */}
        <section className="bg-slate-50 border-y border-slate-200/50 py-20 px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase mb-3 block">
                Platform Overview
              </span>
              <h2 className="text-3xl font-light tracking-tight text-slate-900">
                What We <span className="font-medium">Do</span>
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Business Glider brings multiple business needs together on one premium, integrated platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Job discovery for job seekers",
                "Talent hiring for employers",
                "Vendor discovery for businesses",
                "Business service connections",
                "Professional profiles",
                "Job applications and hiring workflows",
                "Business inquiries and vendor connections"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200/40 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience breakdown: Seekers, Employers, Vendors */}
        <section className="max-w-6xl mx-auto px-6 mb-28">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
              Our Ecosystem
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-900">
              Designed For <span className="font-medium">Everyone</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Job Seekers */}
            <div className="flex flex-col p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">For Job Seekers</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                Discover your next career move, build a comprehensive, polished professional profile, showcase your skills, upload resumes, save opportunities, apply for roles, and track applications in real-time.
              </p>
              <div className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 pt-4 border-t border-slate-100">
                <span>Explore Jobs</span> &rarr;
              </div>
            </div>

            {/* For Employers */}
            <div className="flex flex-col p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-6">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">For Employers</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                Source premier talent, create listings, receive detailed digital applications, review matching applicant profiles, shortlist candidates, manage interview stages, and track hiring pipelines with ease.
              </p>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 pt-4 border-t border-slate-100">
                <span>Hire Employees</span> &rarr;
              </div>
            </div>

            {/* For Vendors */}
            <div className="flex flex-col p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit mb-6">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">For Vendors</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                Create a high-impact vendor profile, showcase your professional products, list specialized services, receive direct business inquiries, respond to request-for-quotations (RFQs), and win contracts.
              </p>
              <div className="text-xs font-bold text-purple-600 flex items-center gap-1.5 pt-4 border-t border-slate-100">
                <span>Register Store</span> &rarr;
              </div>
            </div>
          </div>
        </section>

        {/* Why Business Glider: 6 feature cards */}
        <section className="bg-slate-950 text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12)_0%,transparent_50%)] pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-400 uppercase mb-3 block">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                Our Core <span className="font-semibold text-indigo-400">Advantages</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "One Connected Platform",
                  desc: "Connect your career, business hiring, and vendor networks together under a single clean system.",
                  icon: <Network className="w-5 h-5 text-indigo-400" />
                },
                {
                  title: "Opportunity Discovery",
                  desc: "Utilize smart matching tools and categorized directories to discover options built exactly for your needs.",
                  icon: <Compass className="w-5 h-5 text-indigo-400" />
                },
                {
                  title: "Business Networking",
                  desc: "Form long-lasting relationships, request quotes, and connect with reputable commercial service providers.",
                  icon: <Building2 className="w-5 h-5 text-indigo-400" />
                },
                {
                  title: "Professional Profiles",
                  desc: "Expose clean, verified resumes, portfolio projects, or corporate capabilities cards clearly.",
                  icon: <FileText className="w-5 h-5 text-indigo-400" />
                },
                {
                  title: "Simplified Hiring",
                  desc: "Manage end-to-end recruitment pipelines with clean candidate screens, notes, and progress cards.",
                  icon: <Briefcase className="w-5 h-5 text-indigo-400" />
                },
                {
                  title: "Vendor Discovery",
                  desc: "Search, filter, and discover vetted vendors and professional business suppliers across industries.",
                  icon: <Store className="w-5 h-5 text-indigo-400" />
                }
              ].map((card, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="text-base font-bold mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <LightFooter />
    </div>
  );
}
