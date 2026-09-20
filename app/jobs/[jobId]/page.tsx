'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Building2, MapPin, DollarSign, Clock, 
  Briefcase, Bookmark, BookmarkCheck, Share2, CheckCircle2, 
  MessageCircle, Send, ArrowUpRight, Sparkles, ChevronRight 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ApplyModal from '@/components/jobs/ApplyModal';
import { useJobs, useSavedJobs, PlatformStore } from '@/lib/services/platform-store';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;

  const allJobs = useJobs();
  const savedIds = useSavedJobs();

  const job = React.useMemo(() => {
    if (!jobId) return null;
    return allJobs.find(j => j.id === jobId) || null;
  }, [allJobs, jobId]);

  const isSaved = React.useMemo(() => {
    return Boolean(jobId && savedIds.includes(jobId));
  }, [savedIds, jobId]);

  const similarJobs = React.useMemo(() => {
    if (!job) return [];
    return allJobs.filter(j => j.id !== jobId && (j.category === job.category || j.workMode === job.workMode)).slice(0, 3);
  }, [allJobs, job, jobId]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleToggleSave = () => {
    if (!job) return;
    PlatformStore.toggleSaveJob(job.id);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <LightNav />
        <div className="max-w-md mx-auto px-6 py-24 text-center my-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
            The job listing you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Jobs</span>
          </Link>
        </div>
        <WhatsAppFloat />
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/918979393003?text=${encodeURIComponent(
    `Hello Business Glider Team, I would like to inquire about the position "${job.title}" at ${job.company} (Job ID: ${job.id}).`
  )}`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/jobs" className="hover:text-slate-700 transition-colors">Jobs</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/jobs?category=${encodeURIComponent(job.category)}`} className="hover:text-slate-700 transition-colors">{job.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-700 font-medium truncate max-w-xs">{job.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Job Header Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  {job.category}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {job.jobType}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  job.workMode === 'Remote'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {job.workMode}
                </span>
                {job.status && (
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1 ml-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Actively Hiring
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-slate-950 tracking-tight leading-snug">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mt-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>{job.company}</span>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Salary</span>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    {job.salary}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Experience</span>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.experience}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</span>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Posted</span>
                  <p className="text-xs font-bold text-slate-700">
                    {job.postedDate}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Mobile/Tablet */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-100 lg:hidden">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="flex-1 py-3 px-5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> Apply Now
                </button>
                <button
                  onClick={handleToggleSave}
                  className="p-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <section>
                <h3 className="text-base font-bold text-slate-900 mb-3">About the Opportunity</h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <section className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3">Candidate Requirements</h3>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Skills Required */}
              <section className="pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-3">Required Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Company Overview */}
              {(job.companyOverview || job.aboutCompany) && (
                <section className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-2">About {job.company}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {job.companyOverview || job.aboutCompany}
                  </p>
                </section>
              )}
            </div>

            {/* Similar Jobs Section */}
            {similarJobs.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Similar Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarJobs.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/jobs/${sim.id}`}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sim.company}</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">{sim.title}</h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span>{sim.salary}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (Desktop Sticky CTA) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-950/5 space-y-5">
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                Apply Directly
              </span>
              <div>
                <p className="text-xs text-slate-500">Compensation Package</p>
                <p className="text-xl font-bold text-slate-950 mt-0.5">{job.salary}</p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-900/10"
                >
                  <Send className="w-4 h-4" />
                  <span>APPLY FOR THIS JOB</span>
                </button>

                <button
                  onClick={handleToggleSave}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      <span>Saved to My Bookmarks</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-slate-500" />
                      <span>Save Job</span>
                    </>
                  )}
                </button>

                {/* Direct WhatsApp Job Inquiry */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp (+91 89793 93003)</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Direct Employer Link</span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedLink ? 'Link Copied!' : 'Share Opening'}
                </button>
              </div>
            </div>

            {/* Support / Help Card */}
            <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Need Help with Your Application?</h4>
              <p className="text-slate-500 leading-relaxed">
                Our talent placement team is available on WhatsApp to answer questions regarding recruitment timelines, technical rounds, and interview scheduling.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/918979393003?text=Hello%20Business%20Glider,%20I%20have%20a%20question%20regarding%20job%20applications."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Chat with Career Advisor &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppFloat />

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
      />
    </div>
  );
}
