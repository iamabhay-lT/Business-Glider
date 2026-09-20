'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Building2, MapPin, DollarSign, Clock, 
  Briefcase, Bookmark, BookmarkCheck, Share2, CheckCircle2, 
  Send, ArrowUpRight, Sparkles, ChevronRight 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ApplyModal from '@/components/jobs/ApplyModal';
import { useJobs, useSavedJobs, useApplications, PlatformStore } from '@/lib/services/platform-store';

export default function JobDetailsClient() {
  const params = useParams();
  const jobId = params?.jobId as string;

  const allJobs = useJobs();
  const savedIds = useSavedJobs();
  const allApplications = useApplications();

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

  const applicantsCount = React.useMemo(() => {
    if (!jobId) return 0;
    return allApplications.filter(a => a.jobId === jobId).length;
  }, [allApplications, jobId]);

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
            Back to Job Directory
          </Link>
        </div>
        <WhatsAppFloat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-500/20">
      <LightNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/jobs" className="hover:text-slate-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            All Jobs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
          <span className="text-slate-400 capitalize">{job.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
          <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-sm">{job.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-50/60 to-purple-50/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-white flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0">
                {job.company ? job.company.charAt(0).toUpperCase() : 'B'}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                    {job.title}
                  </h1>
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <Sparkles className="w-3 h-3" />
                      Verified Employer
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {job.location} ({job.workMode})
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    {job.salaryDisplay || job.salary}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Posted {job.postedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Share Job"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleToggleSave}
                className={`p-3 rounded-2xl border transition-colors ${
                  isSaved 
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-600' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
                title={isSaved ? 'Saved' : 'Save Job'}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                Apply Now
              </button>
            </div>
          </div>

          {copiedLink && (
            <div className="mt-4 p-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl text-center border border-emerald-200/60">
              Job link copied to clipboard!
            </div>
          )}
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
                {job.description}
              </div>

              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Key Requirements & Experience</h3>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.skills && job.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Required Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Similar Opportunities */}
            {similarJobs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Similar Job Openings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarJobs.map(sj => (
                    <Link
                      key={sj.id}
                      href={`/jobs/${sj.id}`}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-slate-500">{sj.company}</p>
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors mt-0.5">
                            {sj.title}
                          </h4>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-4">
                        <span>{sj.location}</span>
                        <span>&bull;</span>
                        <span className="text-emerald-600 font-medium">{sj.salaryDisplay || sj.salary}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">
                Job Overview
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Employment Type</span>
                  <span className="font-semibold text-slate-800 capitalize">{job.jobType}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Work Setup</span>
                  <span className="font-semibold text-slate-800 capitalize">{job.workMode}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-800 capitalize">{job.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Compensation</span>
                  <span className="font-semibold text-emerald-600">{job.salaryDisplay || job.salary}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500">Direct Applications</span>
                  <span className="font-semibold text-slate-800">{applicantsCount} received</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Submit Resume for this Role
                </button>
              </div>
            </div>

            {/* Fast Candidate Support */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/30 border border-indigo-100 rounded-3xl p-6 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Need help applying?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our talent advisors on WhatsApp for fast candidate assistance or role status inquiries.
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
