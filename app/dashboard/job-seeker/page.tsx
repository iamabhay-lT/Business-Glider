'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Bookmark, Calendar, CheckCircle2, Clock, 
  ExternalLink, FileText, MapPin, MessageCircle, Search, 
  TrendingUp, User, ArrowUpRight, ChevronRight, AlertCircle, Building2 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import TrackTicketModal from '@/components/jobs/TrackTicketModal';
import ApplyModal from '@/components/jobs/ApplyModal';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Application, JobOpening } from '@/lib/types';
import { useApplications, useSavedJobs, useJobs, useUserProfile, PlatformStore } from '@/lib/services/platform-store';
import { useAuth } from '@/context/AuthContext';

export default function JobSeekerDashboard() {
  const { user } = useAuth();

  const applications = useApplications();
  const savedIds = useSavedJobs();
  const allJobs = useJobs();
  const savedJobs = React.useMemo(() => allJobs.filter((j) => savedIds.includes(j.id)), [allJobs, savedIds]);
  const profile = useUserProfile();

  // Selected app for tracking
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  // Apply modal for saved jobs
  const [jobToApply, setJobToApply] = useState<JobOpening | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const interviews = applications.filter(a => a.status === 'Interview Scheduled' && a.interviewDate);
  const shortlisted = applications.filter(a => a.status === 'Shortlisted');

  const profileFields = [
    profile?.fullName,
    profile?.email,
    profile?.phone,
    profile?.location,
    profile?.headline,
    profile?.experienceYears,
    profile?.skills && profile.skills.length > 0,
    profile?.resumeName,
  ];
  const filledCount = profileFields.filter(Boolean).length;
  const healthPercent = Math.round((filledCount / profileFields.length) * 100);

  const handleTrackClick = (app: Application) => {
    setSelectedApp(app);
    setShowTrackModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Shortlisted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Selected':
      case 'Hired':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <ProtectedRoute
        title="Candidate Portal"
        description="Please sign in with a verified account to access your applications, saved jobs, and interview schedule."
        redirectPath="/dashboard/job-seeker"
      >
        <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Candidate Portal</span>
              <span>•</span>
              <span className="text-slate-400 font-medium font-mono">{profile?.id ? `ID: ${profile.id.slice(0, 10)}` : 'Candidate'}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-950">
              Welcome Back, {profile?.fullName || user?.fullName || 'Candidate'}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Track your active job applications, interview timelines, and saved positions in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse New Jobs</span>
            </Link>
            <Link
              href="/create-profile"
              className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Applied</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{applications.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Submitted applications</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shortlisted</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">{shortlisted.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Passed initial review</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Interviews</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-purple-600">{interviews.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Confirmed scheduled rounds</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saved Roles</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{savedJobs.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Bookmarked opportunities</p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Applications Table & Tracking */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Applications Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">My Job Applications</h2>
                  <p className="text-xs text-slate-500">Every application generates an official tracking ticket.</p>
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {applications.length} Submissions
                </span>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
                  <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">No applications submitted yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Browse verified roles and apply in 1 click.</p>
                  <Link
                    href="/jobs"
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold inline-block"
                  >
                    Find Jobs
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            {app.ticketId}
                          </span>
                          <span className="text-[11px] text-slate-400">• Applied on {app.appliedAt}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {app.jobTitle}
                        </h3>

                        <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {app.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>

                        <button
                          onClick={() => handleTrackClick(app)}
                          className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Track Status</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Jobs */}
            {savedJobs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Saved Opportunities</h2>
                  <span className="text-xs font-semibold text-slate-500">{savedJobs.length} Bookmarked</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-indigo-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{job.company}</span>
                        <h4 className="text-xs font-bold text-slate-900 mt-0.5">{job.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{job.salary} • {job.location}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setJobToApply(job);
                            setShowApplyModal(true);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800"
                        >
                          Apply Now
                        </button>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="py-1.5 px-3 rounded-lg border border-slate-200 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Upcoming Interviews & Profile Snapshot */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Upcoming Interviews Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                    Next Interview
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {interviews.length > 0 ? (
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {interviews[0].jobTitle}
                    </h3>
                    <p className="text-xs text-indigo-200 mb-4">{interviews[0].company}</p>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-indigo-100">
                        <Calendar className="w-4 h-4 text-indigo-300" />
                        <span className="font-semibold">{interviews[0].interviewDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-100">
                        <Clock className="w-4 h-4 text-indigo-300" />
                        <span>{interviews[0].interviewTime || '11:00 AM IST'}</span>
                      </div>
                      {interviews[0].interviewLink && (
                        <div className="pt-2 border-t border-white/10">
                          <a
                            href={interviews[0].interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1"
                          >
                            <span>Open Video Room</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-8 h-8 text-indigo-400/50 mx-auto mb-2" />
                    <p className="text-xs font-bold text-white">No interviews scheduled yet</p>
                    <p className="text-[11px] text-indigo-200/70 mt-1">
                      Employers will schedule rounds once your profile is shortlisted.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Health Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Profile Health</h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  healthPercent >= 80 
                    ? 'text-emerald-600 bg-emerald-50' 
                    : healthPercent >= 40 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-rose-600 bg-rose-50'
                }`}>
                  {healthPercent}% Ready
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Candidate</span>
                  <span className="font-bold text-slate-900 truncate max-w-[150px]">{profile?.fullName || user?.fullName || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Experience</span>
                  <span className="font-medium text-slate-800">{profile?.experienceYears || 'Not specified'}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Active Resume</span>
                  <span className="font-medium text-slate-800 truncate max-w-[150px]">{profile?.resumeName || 'Not uploaded'}</span>
                </div>
              </div>

              <Link
                href="/create-profile"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-100 transition-colors text-center block"
              >
                Update Experience & Resume
              </Link>
            </div>

            {/* Direct WhatsApp Help */}
            <div className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Need Application Assistance?</span>
              </div>
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                Connect with our dedicated career advisor on WhatsApp (+91 89793 93003) for interview preparation or application follow-ups.
              </p>
              <a
                href="https://wa.me/918979393003?text=Hello%20Business%20Glider,%20I%20need%20help%20with%20my%20candidate%20profile%20and%20job%20applications."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline block pt-1"
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppFloat />

      {/* Ticket Tracking Modal */}
      <TrackTicketModal
        application={selectedApp}
        isOpen={showTrackModal}
        onClose={() => {
          setShowTrackModal(false);
          setSelectedApp(null);
        }}
      />

      {/* Apply Modal */}
      {jobToApply && (
        <ApplyModal
          job={jobToApply}
          isOpen={showApplyModal}
          onClose={() => {
            setShowApplyModal(false);
            setJobToApply(null);
          }}
        />
      )}
      </ProtectedRoute>
    </div>
  );
}
