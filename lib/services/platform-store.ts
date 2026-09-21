'use client';

import { useSyncExternalStore } from 'react';
import { JobOpening, Application, ApplicationStatus, InterviewSchedule, Vendor, VendorQuoteRequest, UserProfile } from '../types';
import { INITIAL_JOBS, INITIAL_VENDORS, INITIAL_APPLICATIONS } from '../data/initial-data';

const JOBS_KEY = 'bg_jobs_v1';
const APPS_KEY = 'bg_applications_v1';
const INTERVIEWS_KEY = 'bg_interviews_v1';
const VENDORS_KEY = 'bg_vendors_v1';
const SAVED_JOBS_KEY = 'bg_saved_jobs_v1';
const QUOTES_KEY = 'bg_vendor_quotes_v1';
const PROFILE_KEY = 'bg_user_profile_v1';

// Snapshot Cache for useSyncExternalStore
let cachedJobs: JobOpening[] | null = null;
let cachedVendors: Vendor[] | null = null;
let cachedApplications: Application[] | null = null;
let cachedSavedJobs: string[] | null = null;
let cachedUserProfile: UserProfile | null = null;

export function invalidatePlatformStoreCache(): void {
  cachedJobs = null;
  cachedVendors = null;
  cachedApplications = null;
  cachedSavedJobs = null;
  cachedUserProfile = null;
}

function subscribeToStore(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const handler = () => {
    invalidatePlatformStoreCache();
    callback();
  };
  window.addEventListener('bg_data_updated', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('bg_data_updated', handler);
    window.removeEventListener('storage', handler);
  };
}

const EMPTY_JOBS: JobOpening[] = [];
const EMPTY_VENDORS: Vendor[] = [];
const EMPTY_APPLICATIONS: Application[] = [];
const EMPTY_STRINGS: string[] = [];
const EMPTY_PROFILE: UserProfile = {
  id: '',
  email: '',
  fullName: '',
  phone: '',
  role: 'job_seeker',
  location: '',
  headline: '',
  category: '',
  desiredRole: '',
  experienceYears: '',
  skills: [],
  expectedSalary: '',
  preferredLocation: '',
  jobType: 'Full-time',
  availability: '',
  education: [],
  experience: [],
  resumeName: '',
  resumeSize: '',
  profileComplete: false,
  createdAt: '',
};

export function useJobs(): JobOpening[] {
  return useSyncExternalStore(
    subscribeToStore,
    () => {
      if (!cachedJobs) cachedJobs = PlatformStore.getJobs();
      return cachedJobs;
    },
    () => EMPTY_JOBS
  );
}

export function useVendors(): Vendor[] {
  return useSyncExternalStore(
    subscribeToStore,
    () => {
      if (!cachedVendors) cachedVendors = PlatformStore.getVendors();
      return cachedVendors;
    },
    () => EMPTY_VENDORS
  );
}

export function useApplications(): Application[] {
  return useSyncExternalStore(
    subscribeToStore,
    () => {
      if (!cachedApplications) cachedApplications = PlatformStore.getApplications();
      return cachedApplications;
    },
    () => EMPTY_APPLICATIONS
  );
}

export function useSavedJobs(): string[] {
  return useSyncExternalStore(
    subscribeToStore,
    () => {
      if (!cachedSavedJobs) cachedSavedJobs = PlatformStore.getSavedJobs();
      return cachedSavedJobs;
    },
    () => EMPTY_STRINGS
  );
}

export function useUserProfile(): UserProfile {
  return useSyncExternalStore(
    subscribeToStore,
    () => {
      if (!cachedUserProfile) cachedUserProfile = PlatformStore.getUserProfile();
      return cachedUserProfile;
    },
    () => EMPTY_PROFILE
  );
}

const DEMO_JOB_IDS = new Set([
  'job-101', 'job-102', 'job-103', 'job-104', 'job-105', 
  'job-106', 'job-107', 'job-108', 'job-109', 'job-110'
]);

const DEMO_COMPANIES = new Set([
  'Apex Cloud Innovations',
  'Vanguard Digital Labs',
  'Kavach Global Networks',
  'Zenith Capital Advisory',
  'Lumina Digital Experience',
  'Bluecrest Global Solutions',
  'BuildCon Infrastructure Ltd',
  'Pulsewave Media',
  'The Grand Imperial Palace',
  'TechScript Editorial',
  'TechCorp Studio',
  'Global Trade Co.',
  'Financial Partners',
  'Creative Digital'
]);

// Generate authentic ticket ID format: BG-JOB-YYYYMMDD-XXXXXX
export function generateTicketId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `BG-JOB-${datePart}-${randomSuffix}`;
}

function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    invalidatePlatformStoreCache();
    window.dispatchEvent(new CustomEvent('bg_data_updated', { detail: { key } }));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage`, e);
  }
}

export const PlatformStore = {
  // JOBS
  getJobs(): JobOpening[] {
    const stored = safeGetItem<JobOpening[]>(JOBS_KEY, []);
    if (!stored || !Array.isArray(stored)) {
      safeSetItem(JOBS_KEY, []);
      return [];
    }
    // Filter out any legacy demo job records from localStorage
    const realJobs = stored.filter(
      (j) => j && j.id && !DEMO_JOB_IDS.has(j.id) && !DEMO_COMPANIES.has(j.company)
    );
    if (stored.length !== realJobs.length) {
      safeSetItem(JOBS_KEY, realJobs);
    }
    return realJobs;
  },

  getJobById(id: string): JobOpening | undefined {
    if (!id || DEMO_JOB_IDS.has(id)) return undefined;
    const jobs = this.getJobs();
    return jobs.find((j) => j.id === id);
  },

  publishJob(data: Omit<JobOpening, 'id' | 'postedDate' | 'salaryDisplay'>): JobOpening {
    const jobs = this.getJobs();
    const newJob: JobOpening = {
      ...data,
      id: `job-${Date.now()}`,
      postedDate: 'Just now',
      salaryDisplay: `₹${data.salaryMin},00,000 - ₹${data.salaryMax},00,000 LPA`,
    };
    const updated = [newJob, ...jobs];
    safeSetItem(JOBS_KEY, updated);

    return newJob;
  },

  addJob(data: any): JobOpening {
    const jobs = this.getJobs();
    const salaryDisplay = data.salary || data.salaryDisplay || '₹15,00,000 - ₹25,00,000 / yr';
    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: data.title || 'Untitled Opening',
      company: data.company || 'Business Glider Partner',
      category: data.category || 'IT & Technology',
      location: data.location || 'Delhi NCR, India',
      workMode: data.workMode || 'Remote',
      jobType: data.jobType || 'Full-time',
      salaryMin: typeof data.salaryMin === 'number' ? data.salaryMin : 15,
      salaryMax: typeof data.salaryMax === 'number' ? data.salaryMax : 25,
      salaryDisplay,
      experience: data.experience || '1-3 Years',
      skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : ['Professional Skills'],
      description: data.description || 'Join our high-performing team.',
      responsibilities: Array.isArray(data.responsibilities) && data.responsibilities.length > 0
        ? data.responsibilities
        : ['Deliver quality work and collaborate with cross-functional teams.'],
      requirements: Array.isArray(data.requirements) && data.requirements.length > 0
        ? data.requirements
        : ['Demonstrated relevant industry experience.'],
      benefits: Array.isArray(data.benefits) ? data.benefits : ['Competitive Compensation', 'Flexible Work Options'],
      aboutCompany: data.aboutCompany || 'A high-growth business operating within the Business Glider Network.',
      verified: true,
      postedDate: 'Just now',
    };

    const updated = [newJob, ...jobs];
    safeSetItem(JOBS_KEY, updated);

    return newJob;
  },

  // APPLICATIONS
  getApplications(): Application[] {
    const stored = safeGetItem<Application[]>(APPS_KEY, []);
    if (!stored || !Array.isArray(stored)) {
      safeSetItem(APPS_KEY, []);
      return [];
    }
    // Filter out any demo applications linked to demo jobs/companies
    const realApps = stored.filter(
      (a) =>
        a &&
        a.id &&
        a.id !== 'app-001' &&
        !DEMO_JOB_IDS.has(a.jobId) &&
        !DEMO_COMPANIES.has(a.company)
    );
    if (stored.length !== realApps.length) {
      safeSetItem(APPS_KEY, realApps);
    }
    return realApps;
  },

  getApplicationById(id: string): Application | undefined {
    return this.getApplications().find((a) => a.id === id || a.ticketId === id);
  },

  createApplication(data: {
    jobId: string;
    jobTitle: string;
    company: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    candidateLocation: string;
    candidateHeadline?: string;
    candidateExperience?: string;
    candidateSkills: string[];
    resumeName: string;
    resumeUrl?: string;
    coverNote?: string;
  }): Application {
    const ticketId = generateTicketId();
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const newApp: Application = {
      id: `app-${Date.now()}`,
      ticketId,
      ...data,
      status: 'Application Submitted',
      statusHistory: [
        {
          status: 'Application Submitted',
          timestamp: nowStr,
          note: 'Application successfully received and official tracking ticket generated.',
        },
      ],
      appliedAt: nowStr,
    };

    const apps = this.getApplications();
    const updated = [newApp, ...apps];
    safeSetItem(APPS_KEY, updated);

    return newApp;
  },

  updateApplicationStatus(
    applicationId: string,
    newStatus: ApplicationStatus,
    note?: string
  ): Application | null {
    const apps = this.getApplications();
    const nowStr = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    let updatedTarget: Application | null = null;
    const updated = apps.map((app) => {
      if (app.id === applicationId || app.ticketId === applicationId) {
        updatedTarget = {
          ...app,
          status: newStatus,
          statusHistory: [
            ...(app.statusHistory || []),
            {
              status: newStatus,
              timestamp: nowStr,
              note: note || `Status updated to ${newStatus}.`,
            },
          ],
        };
        return updatedTarget;
      }
      return app;
    });

    if (updatedTarget) {
      safeSetItem(APPS_KEY, updated);
    }

    return updatedTarget;
  },

  // INTERVIEWS
  getInterviews(): InterviewSchedule[] {
    return safeGetItem<InterviewSchedule[]>(INTERVIEWS_KEY, []);
  },

  scheduleInterview(
    appIdOrData: string | Omit<InterviewSchedule, 'id' | 'scheduledAt'>,
    maybeDetails?: {
      interviewDate?: string;
      interviewTime?: string;
      interviewLink?: string;
      interviewNotes?: string;
      date?: string;
      time?: string;
      mode?: 'Online' | 'Offline';
      meetingLink?: string;
      location?: string;
    }
  ): InterviewSchedule | null {
    if (typeof appIdOrData === 'string') {
      const appId = appIdOrData;
      const app = this.getApplicationById(appId);
      const date = maybeDetails?.interviewDate || maybeDetails?.date || 'Upcoming';
      const time = maybeDetails?.interviewTime || maybeDetails?.time || '11:00 AM';
      const mode: 'Online' | 'Offline' = (maybeDetails?.mode as 'Online' | 'Offline') || 'Online';
      const link = maybeDetails?.interviewLink || maybeDetails?.meetingLink || '';
      const notes = maybeDetails?.interviewNotes || 'Candidate scheduled for interview.';

      const newInterview: InterviewSchedule = {
        id: `int-${Date.now()}`,
        applicationId: appId,
        ticketId: app?.ticketId || `BG-JOB-INT-${Date.now()}`,
        jobId: app?.jobId || 'job-default',
        jobTitle: app?.jobTitle || 'Role Interview',
        company: app?.company || 'Business Glider Partner',
        candidateName: app?.candidateName || 'Applicant',
        candidateEmail: app?.candidateEmail || 'applicant@businessglider.com',
        date,
        time,
        mode,
        meetingLink: link,
        notes,
        scheduledAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      };

      const interviews = this.getInterviews();
      safeSetItem(INTERVIEWS_KEY, [newInterview, ...interviews]);

      // Update the application status and interview fields
      const apps = this.getApplications();
      const updated = apps.map((a) => {
        if (a.id === appId || a.ticketId === appId) {
          return {
            ...a,
            status: 'Interview Scheduled' as ApplicationStatus,
            interviewDate: date,
            interviewTime: time,
            interviewLink: link,
            interviewNotes: notes,
            statusHistory: [
              ...(a.statusHistory || []),
              {
                status: 'Interview Scheduled' as ApplicationStatus,
                timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
                note: `Interview scheduled for ${date} at ${time}. ${notes}`,
              },
            ],
          };
        }
        return a;
      });
      safeSetItem(APPS_KEY, updated);

      return newInterview;
    } else {
      const data = appIdOrData;
      const newInterview: InterviewSchedule = {
        id: `int-${Date.now()}`,
        ...data,
        scheduledAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      };

      const interviews = this.getInterviews();
      safeSetItem(INTERVIEWS_KEY, [newInterview, ...interviews]);

      // Update the application status to 'Interview Scheduled'
      this.updateApplicationStatus(
        data.applicationId,
        'Interview Scheduled',
        `Interview scheduled for ${data.date} at ${data.time} (${data.mode}). Link/Location: ${data.meetingLink || data.location || 'TBA'}`
      );

      return newInterview;
    }
  },

  // VENDORS
  getVendors(): Vendor[] {
    const stored = safeGetItem<Vendor[]>(VENDORS_KEY, []);
    if (!stored || stored.length === 0) {
      safeSetItem(VENDORS_KEY, INITIAL_VENDORS);
      return INITIAL_VENDORS;
    }
    return stored;
  },

  getVendorById(id: string): Vendor | undefined {
    return this.getVendors().find((v) => v.id === id);
  },

  addVendor(data: any): Vendor {
    const locationParts = (data.location || 'New Delhi, India').split(',');
    const city = locationParts[0]?.trim() || 'New Delhi';
    const state = locationParts[1]?.trim() || 'NCR';

    const newVendor: Vendor = {
      id: `ven-${Date.now()}`,
      name: data.name || data.businessName || 'Enterprise Vendor',
      category: data.category || 'IT & Technology',
      verified: typeof data.verified === 'boolean' ? data.verified : false,
      rating: typeof data.rating === 'number' ? data.rating : 5.0,
      reviewsCount: typeof data.reviewCount === 'number' ? data.reviewCount : (typeof data.reviewsCount === 'number' ? data.reviewsCount : 1),
      location: data.location || 'New Delhi, India',
      city,
      state,
      services: Array.isArray(data.services) && data.services.length > 0 ? data.services : ['Professional Services'],
      about: data.description || data.about || 'Specialized B2B technology consulting providing high-performance modern web platforms.',
      phone: data.phone || '+91 89793 93003',
      email: data.email || 'partner@businessglider.com',
      website: data.website || undefined,
      portfolio: [
        { title: 'Flagship Delivery', description: 'Comprehensive enterprise services delivery.' }
      ],
      reviews: [
        {
          author: 'Business Glider Network',
          company: 'Verification Team',
          rating: 5,
          comment: 'Verified vendor registration completed.',
          date: new Date().toISOString().split('T')[0],
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };

    const vendors = this.getVendors();
    safeSetItem(VENDORS_KEY, [newVendor, ...vendors]);
    return newVendor;
  },

  registerVendor(data: Omit<Vendor, 'id' | 'rating' | 'reviewsCount' | 'verified' | 'portfolio' | 'reviews' | 'createdAt'>): Vendor {
    return this.addVendor(data);
  },

  // VENDOR QUOTES
  getVendorQuotes(): VendorQuoteRequest[] {
    return safeGetItem<VendorQuoteRequest[]>(QUOTES_KEY, []);
  },

  requestQuote(data: Omit<VendorQuoteRequest, 'id' | 'createdAt' | 'status'>): VendorQuoteRequest {
    const newQuote: VendorQuoteRequest = {
      id: `quote-${Date.now()}`,
      ...data,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Pending',
    };

    const quotes = this.getVendorQuotes();
    safeSetItem(QUOTES_KEY, [newQuote, ...quotes]);
    return newQuote;
  },

  // SAVED JOBS
  getSavedJobIds(): string[] {
    const stored = safeGetItem<string[]>(SAVED_JOBS_KEY, []);
    if (!stored || !Array.isArray(stored)) {
      safeSetItem(SAVED_JOBS_KEY, []);
      return [];
    }
    const validJobIds = new Set(this.getJobs().map((j) => j.id));
    const realSaved = stored.filter((id) => validJobIds.has(id) && !DEMO_JOB_IDS.has(id));
    if (stored.length !== realSaved.length) {
      safeSetItem(SAVED_JOBS_KEY, realSaved);
    }
    return realSaved;
  },

  getSavedJobs(): string[] {
    return this.getSavedJobIds();
  },

  toggleSaveJob(jobId: string): string[] {
    const saved = this.getSavedJobIds();
    let updated: string[];

    if (saved.includes(jobId)) {
      updated = saved.filter((id) => id !== jobId);
    } else {
      updated = [...saved, jobId];
    }

    safeSetItem(SAVED_JOBS_KEY, updated);
    return updated;
  },

  isJobSaved(jobId: string): boolean {
    return this.getSavedJobIds().includes(jobId);
  },

  // PROFILE
  getUserProfile(): UserProfile {
    const emptyProfile: UserProfile = {
      id: '',
      email: '',
      fullName: '',
      phone: '',
      role: 'job_seeker',
      location: '',
      headline: '',
      category: '',
      desiredRole: '',
      experienceYears: '',
      skills: [],
      expectedSalary: '',
      preferredLocation: '',
      jobType: 'Full-time',
      availability: '',
      education: [],
      experience: [],
      resumeName: '',
      resumeSize: '',
      profileComplete: false,
      createdAt: '',
    };

    const stored = safeGetItem<UserProfile>(PROFILE_KEY, emptyProfile);
    if (!stored || stored.id === 'usr-default') {
      return emptyProfile;
    }
    return stored;
  },

  saveUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated: UserProfile = {
      ...current,
      ...profile,
      profileComplete: Boolean(
        (profile.fullName || current.fullName) &&
        (profile.email || current.email) &&
        (profile.phone || current.phone) &&
        (profile.resumeName || current.resumeName)
      ),
    };
    safeSetItem(PROFILE_KEY, updated);
    return updated;
  },
};
