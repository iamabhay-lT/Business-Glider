'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobOpening, Application } from '@/lib/types';
import { useUserProfile, PlatformStore } from '@/lib/services/platform-store';
import { useAuth } from '@/context/AuthContext';
import { 
  X, CheckCircle2, AlertCircle, FileText, ArrowRight, 
  Send, ExternalLink, MessageCircle, Briefcase, GraduationCap, 
  Clock, MapPin, User, Mail, Phone 
} from 'lucide-react';
import Link from 'next/link';

interface ApplyModalProps {
  job: JobOpening;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (app: Application) => void;
}

export default function ApplyModal({ job, isOpen, onClose, onSuccess }: ApplyModalProps) {
  const router = useRouter();
  const { user, openLogin } = useAuth();

  const profile = useUserProfile();
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [stepOverride, setStepOverride] = useState<'check' | 'review' | 'success' | null>(null);

  const isProfileComplete = Boolean(
    profile?.fullName &&
    profile?.email &&
    profile?.phone &&
    profile?.resumeName
  );

  const activeStep = stepOverride || (submittedApp ? 'success' : isProfileComplete ? 'review' : 'check');

  if (!isOpen) return null;

  const missingFields: string[] = [];
  if (!profile?.fullName) missingFields.push('Full Name');
  if (!profile?.email) missingFields.push('Email Address');
  if (!profile?.phone) missingFields.push('Phone Number');
  if (!profile?.resumeName) missingFields.push('Resume / CV');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSubmitting(true);

    setTimeout(() => {
      const jobSkills = Array.isArray(job?.skills) ? job.skills : [];
      const newApp = PlatformStore.createApplication({
        jobId: job?.id || 'job-unknown',
        jobTitle: job?.title || 'Job Opening',
        company: job?.company || 'Company Partner',
        candidateId: profile.id,
        candidateName: profile.fullName || 'Applicant',
        candidateEmail: profile.email || '',
        candidatePhone: profile.phone || '',
        candidateLocation: profile.location || '',
        candidateHeadline: profile.headline,
        candidateExperience: profile.experienceYears || '',
        candidateSkills: Array.isArray(profile.skills) && profile.skills.length > 0
          ? profile.skills
          : jobSkills,
        resumeName: profile.resumeName || 'Resume.pdf',
        resumeUrl: profile.resumeUrl,
        coverNote: coverNote ? coverNote.trim() || undefined : undefined,
      });

      setSubmitting(false);
      setSubmittedApp(newApp);
      setStepOverride('success');
      if (onSuccess) onSuccess(newApp);
    }, 600);
  };

  const whatsappInquiryUrl = submittedApp
    ? `https://wa.me/918979393003?text=${encodeURIComponent(
        `Hello, I would like to inquire about my job application for "${submittedApp.jobTitle}" at ${submittedApp.company}. My Application Ticket is ${submittedApp.ticketId}.`
      )}`
    : `https://wa.me/918979393003?text=${encodeURIComponent(
        `Hello, I'd like to inquire about the "${job.title}" role at ${job.company}.`
      )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 relative text-slate-900 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: INCOMPLETE PROFILE WARNING */}
        {activeStep === 'check' && (
          <div>
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900">Profile Incomplete</h3>
            </div>
            
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Employers require a verified candidate profile before receiving job applications. 
              The following required fields are missing:
            </p>

            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 mb-6 space-y-2">
              {missingFields.map((field) => (
                <div key={field} className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{field}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Complete your profile once to unlock 1-click applications across all verified opportunities.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/create-profile"
                onClick={onClose}
                className="w-full py-3 px-5 rounded-xl bg-slate-900 text-white text-xs font-semibold text-center hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <span>Complete Profile Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* STEP 2: REVIEW APPLICATION */}
        {activeStep === 'review' && profile && (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                Direct Job Application
              </span>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
                Review Your Application
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Applying for <span className="font-semibold text-slate-800">{job.title}</span> at <span className="font-semibold text-slate-800">{job.company}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Candidate Info Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> Candidate</span>
                  <span className="font-semibold text-slate-900">{profile.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> Email</span>
                  <span className="font-semibold text-slate-900">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> Phone</span>
                  <span className="font-semibold text-slate-900">{profile.phone}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Location</span>
                  <span className="font-semibold text-slate-900">{profile.location || 'Delhi NCR'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                  <span className="text-slate-500 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-slate-400" /> Experience</span>
                  <span className="font-semibold text-slate-900">{profile.experienceYears || '3+ Years'}</span>
                </div>

                {/* Resume Badge */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400" /> Attached Resume</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-800">
                    <FileText className="w-3 h-3 text-indigo-600" />
                    <span>{profile.resumeName || 'Candidate_CV.pdf'}</span>
                  </div>
                </div>
              </div>

              {/* Skills Display */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                  Relevant Skills Included
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(profile.skills && profile.skills.length > 0 ? profile.skills : job.skills).map((skill) => (
                    <span key={skill} className="text-[11px] font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Note to Employer (Optional)
                </label>
                <textarea
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Introduce yourself or highlight why you're a great fit for this opening..."
                  rows={3}
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold tracking-wide hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-slate-900/10"
                >
                  {submitting ? (
                    'Generating Ticket...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> SUBMIT APPLICATION
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: APPLICATION SUBMITTED SUCCESSFULLY + TICKET GENERATED */}
        {activeStep === 'success' && submittedApp && (
          <div className="text-center py-2">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase">
              Confirmed & Logged
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1 mb-2">
              Application Submitted Successfully
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              Your profile and credentials have been delivered directly to the hiring team at {submittedApp.company}.
            </p>

            {/* Official Ticket Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Application Ticket</span>
                <span className="font-mono text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {submittedApp.ticketId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Position</span>
                <span className="font-semibold text-slate-900">{submittedApp.jobTitle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Company</span>
                <span className="font-semibold text-slate-900">{submittedApp.company}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-700">{submittedApp.appliedAt}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">Current Status</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {submittedApp.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <Link
                href="/dashboard/job-seeker"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-semibold text-center hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <span>Track in My Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Direct WhatsApp Query with Ticket */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold text-center hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire About Ticket on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Close & Browse More Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
