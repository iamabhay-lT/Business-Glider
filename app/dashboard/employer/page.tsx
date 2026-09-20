'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, Briefcase, Users, CheckCircle2, Clock, 
  Calendar, Search, Filter, Plus, FileText, ChevronDown, 
  ChevronRight, ArrowUpRight, X, Phone, Mail, MapPin, 
  ExternalLink, Check, AlertCircle 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Application, JobOpening, ApplicationStatus } from '@/lib/types';
import { useJobs, useApplications, PlatformStore } from '@/lib/services/platform-store';
import { useAuth } from '@/context/AuthContext';

export default function EmployerDashboard() {
  const { user } = useAuth();

  const jobs = useJobs();
  const applications = useApplications();
  const [activeTab, setActiveTab] = useState<'applicants' | 'jobs'>('applicants');

  // Search & Filter
  const [applicantFilter, setApplicantFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Schedule Interview Modal State
  const [interviewApp, setInterviewApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewLink, setInterviewLink] = useState('');
  const [interviewNotes, setInterviewNotes] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleUpdateStatus = (appId: string, newStatus: ApplicationStatus) => {
    PlatformStore.updateApplicationStatus(appId, newStatus);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewApp) return;

    PlatformStore.scheduleInterview(interviewApp.id, {
      interviewDate,
      interviewTime,
      interviewLink,
      interviewNotes,
    });

    setShowScheduleModal(false);
    setInterviewApp(null);
  };

  const filteredApps = applications.filter((app) => {
    if (!app) return false;
    if (applicantFilter && applicantFilter.trim()) {
      const q = applicantFilter.toLowerCase().trim();
      const matchName = (app.candidateName || '').toLowerCase().includes(q);
      const matchJob = (app.jobTitle || '').toLowerCase().includes(q);
      const matchTicket = (app.ticketId || '').toLowerCase().includes(q);
      if (!matchName && !matchJob && !matchTicket) return false;
    }
    if (statusFilter && app.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted').length;
  const interviewsCount = applications.filter(a => a.status === 'Interview Scheduled').length;
  const hiredCount = applications.filter(a => a.status === 'Selected' || a.status === 'Hired').length;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <ProtectedRoute
        title="Recruiter Portal"
        description="Please sign in with a verified employer account to manage your jobs, review candidate applications, and schedule interviews."
        redirectPath="/dashboard/employer"
      >
        <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Recruiter Portal</span>
              <span>•</span>
              <span className="text-slate-400 font-medium">Business Glider Verified</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-950">
              Employer Hiring Command Center
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Review verified candidate applications, schedule interview rounds, and manage your live job postings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hire"
              className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </Link>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Jobs</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{jobs.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Live vacancies receiving talent</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Applicants</span>
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{applications.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Direct submissions with tickets</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shortlisted</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">{shortlistedCount}</p>
            <p className="text-[11px] text-slate-500 mt-1">Approved for scheduling</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Interviews Set</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-purple-600">{interviewsCount}</p>
            <p className="text-[11px] text-slate-500 mt-1">Scheduled video/on-site rounds</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`pb-3 px-2 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'applicants'
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Candidate Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 px-2 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'jobs'
                ? 'border-slate-900 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Manage Job Postings ({jobs.length})
          </button>
        </div>

        {/* TAB 1: APPLICANTS */}
        {activeTab === 'applicants' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3.5 py-2.5 w-full border border-slate-200/60">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={applicantFilter}
                  onChange={(e) => setApplicantFilter(e.target.value)}
                  placeholder="Search by candidate name, ticket ID, or position"
                  className="w-full bg-transparent text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 outline-none cursor-pointer w-full sm:w-auto"
                >
                  <option value="">All Statuses</option>
                  <option value="Application Submitted">Application Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {filteredApps.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">No candidate applications found</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Try adjusting your filters or share your live job links to receive new applicants.
                  </p>
                </div>
              ) : (
                filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:border-indigo-200 transition-all space-y-4"
                  >
                    {/* Top row: Ticket & Position */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                          {app.ticketId}
                        </span>
                        <span className="text-xs text-slate-400">Applied on {app.appliedAt}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">Target Role:</span>
                        <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {app.jobTitle}
                        </span>
                      </div>
                    </div>

                    {/* Middle row: Candidate Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{app.candidateName}</p>
                        <p className="text-slate-500 mt-0.5">{app.candidateHeadline || 'Candidate'}</p>
                        <div className="flex items-center gap-3 text-slate-500 mt-2">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {app.candidateEmail}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {app.candidatePhone}</span>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-slate-600">Experience & Location</p>
                        <p className="text-slate-900 mt-0.5">{app.candidateExperience || '3 Years'} • {app.candidateLocation || 'Delhi NCR'}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {app.candidateSkills?.slice(0, 3).map(skill => (
                            <span key={skill} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-700">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-slate-600">Attached Resume</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
                            <FileText className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="truncate max-w-[130px]">{app.resumeName || 'Resume.pdf'}</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md">Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Interview scheduled badge (if any) */}
                    {app.status === 'Interview Scheduled' && app.interviewDate && (
                      <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl text-xs text-purple-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span>
                            <strong>Interview:</strong> {app.interviewDate} at {app.interviewTime}
                          </span>
                        </div>
                        {app.interviewLink && (
                          <a
                            href={app.interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-purple-700 hover:underline flex items-center gap-1"
                          >
                            <span>Open Video Meeting</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Bottom Action Bar: Update Status & Schedule */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Current Status:</span>
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                          {app.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Under Review')}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Reviewing
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Shortlisted')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => {
                            setInterviewApp(app);
                            setShowScheduleModal(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule Round</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Selected')}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                        >
                          Select / Hire
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500">All live vacancies published on Business Glider.</p>
              <Link
                href="/hire"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Post Another Job
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((j) => (
                <div
                  key={j.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full uppercase">
                        {j.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Live & Open
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{j.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{j.company} • {j.location}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Salary</span>
                        <span className="font-semibold">{j.salaryDisplay || j.salary || 'Competitive'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Work Mode</span>
                        <span className="font-semibold">{j.workMode} ({j.jobType})</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      {applications.filter(a => a.jobId === j.id).length} Applicants
                    </span>
                    <Link
                      href={`/jobs/${j.id}`}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      <span>Preview Live Posting</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* SCHEDULE INTERVIEW MODAL */}
      {showScheduleModal && interviewApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 relative text-slate-900">
            <button
              onClick={() => {
                setShowScheduleModal(false);
                setInterviewApp(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold tracking-[0.2em] text-purple-600 uppercase">
              Recruitment Calendar
            </span>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 mt-1 mb-1">
              Schedule Candidate Interview
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Scheduling updates the candidate&apos;s tracking ticket ({interviewApp.ticketId}) and sends live details to their dashboard.
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Candidate</label>
                <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900">
                  {interviewApp.candidateName} ({interviewApp.candidateEmail})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 03:00 PM IST"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Meeting URL / Location</label>
                <input
                  type="url"
                  required
                  value={interviewLink}
                  onChange={(e) => setInterviewLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Interview Instructions / Agenda</label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder="Notes for the candidate..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-900 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>CONFIRM & NOTIFY CANDIDATE</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </ProtectedRoute>

      <WhatsAppFloat />
    </div>
  );
}
