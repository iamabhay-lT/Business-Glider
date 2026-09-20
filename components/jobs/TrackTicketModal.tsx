'use client';

import React from 'react';
import { Application, ApplicationStatus } from '@/lib/types';
import { X, CheckCircle2, Clock, Calendar, MessageCircle, ExternalLink, Building2, MapPin } from 'lucide-react';

interface TrackTicketModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

const STAGES: ApplicationStatus[] = [
  'Application Submitted',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Selected',
];

export default function TrackTicketModal({ application, isOpen, onClose }: TrackTicketModalProps) {
  if (!isOpen || !application) return null;

  const getStageIndex = (status: ApplicationStatus) => {
    if (status === 'Rejected') return 1; // show under review then rejected
    if (status === 'Hired' || status === 'Selected') return 4;
    const idx = STAGES.indexOf(status);
    return idx !== -1 ? idx : 0;
  };

  const currentIdx = getStageIndex(application.status);
  const isRejected = application.status === 'Rejected';

  const whatsappInquiryUrl = `https://wa.me/918979393003?text=${encodeURIComponent(
    `Hello Business Glider Team, I would like to check on the progress of my Application Ticket: ${application.ticketId} for the "${application.jobTitle}" position at ${application.company}.`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 relative text-slate-900 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            Application Status Tracking
          </span>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
            {application.jobTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> {application.company}
          </p>
        </div>

        {/* Ticket Header Box */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Ticket ID</p>
            <p className="font-mono text-xs md:text-sm font-bold text-slate-900">{application.ticketId}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Applied On</p>
            <p className="text-xs font-semibold text-slate-700">{application.appliedAt}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="mb-8">
          <p className="text-xs font-bold text-slate-900 mb-4 tracking-wide uppercase">
            Hiring Milestone Timeline
          </p>

          <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {STAGES.map((stage, idx) => {
              const isPast = idx < currentIdx;
              const isCurrent = idx === currentIdx;
              const isFuture = idx > currentIdx;

              return (
                <div key={stage} className="relative flex items-start gap-3">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                      isCurrent
                        ? isRejected
                          ? 'bg-rose-500 text-white'
                          : 'bg-indigo-600 text-white animate-pulse'
                        : isPast
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPast ? '✓' : idx + 1}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isCurrent
                          ? isRejected
                            ? 'text-rose-600'
                            : 'text-indigo-600'
                          : isPast
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {isCurrent
                        ? isRejected
                          ? 'Application review concluded.'
                          : 'Currently under active review by employer.'
                        : isPast
                        ? 'Completed'
                        : 'Upcoming milestone'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Interview Details (If applicable) */}
        {application.interviewDate && (
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold text-indigo-950 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Interview Scheduled
            </h4>
            <div className="text-xs text-indigo-900 space-y-1">
              <p>
                <span className="font-semibold">Date & Time:</span> {application.interviewDate} at {application.interviewTime}
              </p>
              {application.interviewLink && (
                <p>
                  <span className="font-semibold">Meeting Link:</span>{' '}
                  <a
                    href={application.interviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline font-medium"
                  >
                    Join Video Conference &rarr;
                  </a>
                </p>
              )}
              {application.interviewNotes && (
                <p className="text-[11px] text-indigo-700/80 mt-1 italic">
                  Note: {application.interviewNotes}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold text-center hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Inquire About Ticket on WhatsApp (+91 89793 93003)</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            Close Tracking View
          </button>
        </div>
      </div>
    </div>
  );
}
