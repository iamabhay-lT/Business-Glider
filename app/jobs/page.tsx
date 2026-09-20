'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, MapPin, Briefcase, Filter, ArrowUpRight, Bookmark, 
  BookmarkCheck, DollarSign, Clock, Building2, Check, X, Sparkles 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ApplyModal from '@/components/jobs/ApplyModal';
import { JobOpening } from '@/lib/types';
import { useJobs, useSavedJobs, PlatformStore } from '@/lib/services/platform-store';
import { POPULAR_JOB_CATEGORIES } from '@/lib/data/categories';

function JobsContent() {
  const searchParams = useSearchParams();

  // URL search query defaults
  const paramCategory = searchParams ? (searchParams.get('category') || '') : '';
  const paramQ = searchParams ? (searchParams.get('q') || '') : '';
  const paramLocation = searchParams ? (searchParams.get('location') || '') : '';
  const paramWorkMode = searchParams ? (searchParams.get('workMode') || '') : '';
  const paramJobType = searchParams ? (searchParams.get('jobType') || '') : '';

  const jobs = useJobs();
  const savedJobIds = useSavedJobs();

  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [userWorkMode, setUserWorkMode] = useState<string | null>(null);
  const [userJobType, setUserJobType] = useState<string | null>(null);
  const [experienceFilter, setExperienceFilter] = useState('');

  const searchQuery = userQuery !== null ? userQuery : paramQ;
  const locationFilter = userLocation !== null ? userLocation : paramLocation;
  const categoryFilter = userCategory !== null ? userCategory : paramCategory;
  const workModeFilter = userWorkMode !== null ? userWorkMode : paramWorkMode;
  const jobTypeFilter = userJobType !== null ? userJobType : paramJobType;

  const setSearchQuery = (val: string) => setUserQuery(val);
  const setLocationFilter = (val: string) => setUserLocation(val);
  const setCategoryFilter = (val: string) => setUserCategory(val);
  const setWorkModeFilter = (val: string) => setUserWorkMode(val);
  const setJobTypeFilter = (val: string) => setUserJobType(val);

  // Apply Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpening | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const toggleSaveJob = (jobId: string) => {
    PlatformStore.toggleSaveJob(jobId);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!job) return false;

      // Keyword matching (title, company, skills, description)
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const title = (job.title || '').toLowerCase();
        const company = (job.company || '').toLowerCase();
        const desc = (job.description || '').toLowerCase();
        const skills = Array.isArray(job.skills) ? job.skills : [];
        const matchesTitle = title.includes(q);
        const matchesCompany = company.includes(q);
        const matchesSkill = skills.some(s => typeof s === 'string' && s.toLowerCase().includes(q));
        const matchesDesc = desc.includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkill && !matchesDesc) return false;
      }

      // Location matching
      if (locationFilter && locationFilter.trim()) {
        const loc = locationFilter.toLowerCase().trim();
        const jobLoc = (job.location || '').toLowerCase();
        if (!jobLoc.includes(loc)) return false;
      }

      // Category matching
      if (categoryFilter && categoryFilter.trim()) {
        const cat = categoryFilter.toLowerCase().trim();
        const jobCat = (job.category || '').toLowerCase();
        const jobTitle = (job.title || '').toLowerCase();
        if (!jobCat.includes(cat) && !jobTitle.includes(cat)) return false;
      }

      // Work Mode matching
      if (workModeFilter && job.workMode !== workModeFilter) {
        return false;
      }

      // Job Type matching
      if (jobTypeFilter && job.jobType !== jobTypeFilter) {
        return false;
      }

      // Experience matching
      if (experienceFilter) {
        const exp = (job.experience || '').toLowerCase();
        if (experienceFilter === 'Fresher' && !exp.includes('0') && !exp.includes('fresher')) {
          return false;
        }
        if (experienceFilter === '1-3 yrs' && !exp.includes('1') && !exp.includes('2') && !exp.includes('3')) {
          return false;
        }
        if (experienceFilter === '3-5 yrs' && !exp.includes('3') && !exp.includes('4') && !exp.includes('5')) {
          return false;
        }
        if (experienceFilter === '5+ yrs' && !exp.includes('5') && !exp.includes('6') && !exp.includes('7') && !exp.includes('8')) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, searchQuery, locationFilter, categoryFilter, workModeFilter, jobTypeFilter, experienceFilter]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setCategoryFilter('');
    setWorkModeFilter('');
    setJobTypeFilter('');
    setExperienceFilter('');
  };

  const hasActiveFilters = Boolean(
    searchQuery || locationFilter || categoryFilter || workModeFilter || jobTypeFilter || experienceFilter
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career Opportunities</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950">
              Verified Job Openings
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl">
              Connect directly with high-growth organizations hiring verified professionals across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/create-profile"
              className="px-5 py-3 rounded-2xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
            >
              Build Profile &rarr;
            </Link>
            <Link
              href="/hire"
              className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Post a Job
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 bg-white rounded-3xl p-5 shadow-sm border border-slate-200/70 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Keyword Input */}
            <div className="md:col-span-4 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, skills, or company"
                className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Input */}
            <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="City or location (e.g. Delhi, Remote)"
                className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 outline-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {POPULAR_JOB_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.queryParam}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters button */}
            <div className="md:col-span-2 flex items-center">
              {hasActiveFilters ? (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Reset Filters
                </button>
              ) : (
                <div className="w-full text-center py-3 text-xs text-slate-400 font-medium">
                  {filteredJobs.length} Jobs Found
                </div>
              )}
            </div>
          </div>

          {/* Quick Filter Pills (Work Mode, Job Type, Experience) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] mr-1">Work Mode:</span>
            {['All', 'Remote', 'On-site', 'Hybrid'].map((mode) => {
              const active = (mode === 'All' && !workModeFilter) || workModeFilter === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setWorkModeFilter(mode === 'All' ? '' : mode)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mode}
                </button>
              );
            })}

            <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] ml-4 mr-1">Type:</span>
            {['All', 'Full-time', 'Part-time', 'Internship', 'Freelance'].map((type) => {
              const active = (type === 'All' && !jobTypeFilter) || jobTypeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => setJobTypeFilter(type === 'All' ? '' : type)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              );
            })}

            <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] ml-4 mr-1">Experience:</span>
            {['All', 'Fresher', '1-3 yrs', '3-5 yrs', '5+ yrs'].map((exp) => {
              const active = (exp === 'All' && !experienceFilter) || experienceFilter === exp;
              return (
                <button
                  key={exp}
                  onClick={() => setExperienceFilter(exp === 'All' ? '' : exp)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {exp}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Available Positions ({filteredJobs.length})
            </h2>
            {categoryFilter && (
              <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                Filtering Category: {categoryFilter}
              </span>
            )}
          </div>

          {filteredJobs.length === 0 ? (
            jobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 max-w-xl mx-auto my-12 shadow-sm">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No jobs available yet</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                  New opportunities will appear here when employers publish jobs on Business Glider.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/hire"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Post a Job
                  </Link>
                  <Link
                    href="/create-profile"
                    className="px-6 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Build Candidate Profile
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 max-w-xl mx-auto my-12">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No jobs found</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Try loosening your filters, changing search keywords, or resetting your category selections.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges & Save */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                            {job.jobType}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              job.workMode === 'Remote'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {job.workMode}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                          title={isSaved ? 'Remove from saved' : 'Save job'}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Job Title & Company */}
                      <Link href={`/jobs/${job.id}`}>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {job.title}
                        </h3>
                      </Link>
                      
                      <p className="text-xs font-semibold text-slate-600 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {job.company}
                      </p>

                      {/* Meta Info */}
                      <div className="mt-4 space-y-2 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-slate-800">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Exp: {job.experience}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-100"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-[11px] font-medium text-slate-400 px-1.5 py-1">
                            +{job.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          setSelectedJobForApply(job);
                          setShowApplyModal(true);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all text-center shadow-sm cursor-pointer"
                      >
                        Apply Now
                      </button>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppFloat />

      {/* Apply Modal */}
      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          isOpen={showApplyModal}
          onClose={() => {
            setShowApplyModal(false);
            setSelectedJobForApply(null);
          }}
        />
      )}
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-400 text-xs">Loading verified opportunities...</div>}>
      <JobsContent />
    </Suspense>
  );
}
