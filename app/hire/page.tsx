'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, Briefcase, MapPin, DollarSign, Clock, 
  Sparkles, CheckCircle2, ArrowRight, ArrowUpRight, 
  Send, Users, ShieldCheck, MessageCircle 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { PlatformStore } from '@/lib/services/platform-store';
import { POPULAR_JOB_CATEGORIES } from '@/lib/data/categories';

export default function HirePage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('IT & Technology');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState<'Remote' | 'On-site' | 'Hybrid'>('Hybrid');
  const [jobType, setJobType] = useState<'Full-time' | 'Part-time' | 'Internship' | 'Freelance'>('Full-time');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [description, setDescription] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = (skillsInput || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newJob = PlatformStore.addJob({
      title,
      company,
      category,
      location,
      workMode,
      jobType,
      salary,
      experience,
      skills: skillsArray.length > 0 ? skillsArray : ['Communication', 'Teamwork'],
      description,
      responsibilities: [
        'Deliver reliable, scalable software architectures.',
        'Collaborate across product and business teams to hit milestones.',
        'Participate in design critiques and code reviews.',
      ],
      requirements: [
        `Demonstrated experience in ${category}.`,
        `Proficiency with ${skillsArray.slice(0, 2).join(' and ') || 'modern tools'}.`,
        'Strong problem-solving and communication aptitude.',
      ],
    });

    setPostedSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/employer');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <ProtectedRoute
        title="Employer Job Posting"
        description="Please sign in with a verified account to publish job openings on Business Glider."
        redirectPath="/hire"
      >
        <main className="max-w-4xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            Employer Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-950 mt-1">
            Post an Opening & Hire Top Talent
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Connect with verified job seekers across India. Get real applications with ticket tracking in your dashboard.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
          {postedSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Job Posted Successfully!</h2>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                Your opening is now live on Business Glider. Redirecting to your Employer Dashboard...
              </p>
              <Link
                href="/dashboard/employer"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <span>View In Employer Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Position Overview</h3>
                <p className="text-xs text-slate-500">Provide accurate details to attract the most qualified candidates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Job Title *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full bg-transparent text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Company Name *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Glider Tech Labs"
                      className="w-full bg-transparent text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none cursor-pointer"
                  >
                    {POPULAR_JOB_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Location *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Delhi NCR / Bengaluru"
                      className="w-full bg-transparent text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Salary Range *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. ₹15,00,000 - ₹22,00,000"
                      className="w-full bg-transparent text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Required Experience *</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 2-4 Years"
                      className="w-full bg-transparent text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Required Skills (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Next.js, Node.js, SQL"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Job Description & Overview *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the mission, day-to-day impact, and team expectations..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/dashboard/employer"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Go to Employer Dashboard &rarr;
                </Link>

                <button
                  type="submit"
                  className="py-3.5 px-8 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-slate-900/10"
                >
                  <Send className="w-4 h-4" />
                  <span>PUBLISH JOB OPENING</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      </ProtectedRoute>

      <WhatsAppFloat />
    </div>
  );
}
