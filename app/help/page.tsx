'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Briefcase, 
  Building2, 
  Store, 
  UserCheck, 
  FileText, 
  Settings, 
  CreditCard, 
  LifeBuoy,
  MessageSquare
} from 'lucide-react';

interface FAQ {
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQ[] = [
  {
    category: 'seeker',
    question: 'How do I create a job seeker profile?',
    answer: 'To create a job seeker profile, log in to your account, click on "Create Profile" in the navigation bar, select "Job Seeker" as your active role, and fill in your education, work experience, skill tags, and resume links. Make sure your email is verified first.'
  },
  {
    category: 'seeker',
    question: 'How do I search for jobs?',
    answer: 'Navigate to the "Find Jobs" tab in the main navigation. You can filter open listings by role titles, departments, work modes (Remote, Hybrid, On-site), and experience levels. You can also search directly using keywords in the explore panel.'
  },
  {
    category: 'seeker',
    question: 'How do I apply for a job?',
    answer: 'Once you find a job of interest, click to view the detailed job page. Ensure your profile is fully complete and verified, and click the "Apply Now" or "1-Click Apply" button. You can monitor all active application tickets directly from your candidate dashboard.'
  },
  {
    category: 'employer',
    question: 'How do I post a job?',
    answer: 'Log in and navigate to the Employer Portal via "Hire Employees". Click "Post a Job", enter details like job title, department, work mode, description, and applicant criteria, and save. The post goes live instantly for candidate discovery.'
  },
  {
    category: 'vendor',
    question: 'How do I find vendors?',
    answer: 'Click on "Find Vendors" in the footer or menu bar. This takes you to our comprehensive, searchable B2B Vendor Directory. Here, you can search and filter suppliers by product lines, specialized services, and industry ratings.'
  },
  {
    category: 'vendor',
    question: 'How do I register as a vendor?',
    answer: 'Select "Register as Vendor" in the navigation. Build a high-impact storefront profile outlining your key products, service offerings, business location, pricing ranges, and case studies to attract direct corporate quotation inquiries.'
  },
  {
    category: 'account',
    question: 'How do I update my profile?',
    answer: 'Access your profile from the Account Dropdown menu at the top-right corner or go to "Create Profile". Edit fields under Personal Information, Experience, or Business Offerings and click "Save" to keep your public listing up to date.'
  },
  {
    category: 'account',
    question: 'How do I reset my password?',
    answer: 'From the Sign In screen on the login modal, click on the "Reset Password" button. Enter your registered email address, and we will dispatch a secure Firebase password reset link directly to your inbox.'
  },
  {
    category: 'account',
    question: 'How does email verification work?',
    answer: 'For your security, we require email verification on all accounts. Upon signup or logging in with an unverified email, the system automatically sends a verification link to your email. Click that link to activate your account.'
  },
  {
    category: 'tech',
    question: "Why can't I access my account?",
    answer: "This is usually caused by having an unverified email address. When you sign up, check your inbox (including Spam/Promotions folders) for the verification link. If you still have trouble, use the Contact Support form to reach us."
  }
];

const helpCategories = [
  { id: 'all', title: 'All Help Topics', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'seeker', title: 'Job Seekers', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'employer', title: 'Employers', icon: <Building2 className="w-4 h-4" /> },
  { id: 'vendor', title: 'Vendors', icon: <Store className="w-4 h-4" /> },
  { id: 'account', title: 'Account & Login', icon: <UserCheck className="w-4 h-4" /> },
  { id: 'tech', title: 'Technical Support', icon: <LifeBuoy className="w-4 h-4" /> }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.05)_0%,transparent_40%)]" />
      </div>

      <LightNav />

      <main className="flex-1 flex flex-col relative z-10 pt-12 md:pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          
          {/* Header & Search */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
              Knowledge Base
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6">
              How can we <span className="font-semibold text-indigo-600">help?</span>
            </h1>
            
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, answers, and queries..."
                className="w-full bg-transparent text-sm outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Quick Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {helpCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-md'
                    : 'bg-white border-slate-200/60 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordions */}
          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 md:p-8 space-y-4 mb-16">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredFaqs.map((faq, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between text-left gap-4 py-1 group cursor-pointer"
                      >
                        <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {faq.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                          isExpanded ? 'rotate-180 text-indigo-600' : ''
                        }`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-slate-600 leading-relaxed font-light mt-3 pl-1">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-slate-500 font-light">
                  No matches found for &ldquo;{searchQuery}&rdquo;. Try another term or browse help topics above.
                </p>
              </div>
            )}
          </div>

          {/* Still Need Help CTA */}
          <div className="bg-indigo-50 border border-indigo-100/50 rounded-[32px] p-8 text-center space-y-4">
            <div className="inline-flex p-3 bg-white text-indigo-600 rounded-2xl shadow-sm">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-indigo-950">Still need help?</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-light">
              Can&apos;t find the answer you are looking for? Our support team is available during standard business hours to assist you.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Contact Support</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <LightFooter />
    </div>
  );
}
