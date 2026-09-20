export type UserRole = 'job_seeker' | 'employer' | 'vendor';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatarUrl?: string;
  role: UserRole;
  location?: string;
  headline?: string;
  category?: string;
  desiredRole?: string;
  experienceYears?: string;
  skills: string[];
  expectedSalary?: string;
  preferredLocation?: string;
  jobType?: string;
  availability?: string;
  degree?: string;
  college?: string;
  gradYear?: string;
  education?: {
    degree: string;
    college: string;
    passingYear: string;
    grade?: string;
  }[];
  experience?: {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  resumeName?: string;
  resumeSize?: string;
  resumeUrl?: string;
  profileComplete: boolean;
  createdAt: string;
}

export interface JobOpening {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  verified: boolean;
  category: string;
  department?: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryDisplay: string;
  salary?: string;
  experience: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  postedDate: string;
  openings?: number;
  education?: string;
  deadline?: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  aboutCompany: string;
  companyOverview?: string;
  employerId?: string;
  status?: string;
}

export type ApplicationStatus =
  | 'Application Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Selected'
  | 'Hired'
  | 'Rejected';

export interface Application {
  id: string;
  ticketId: string; // Format: BG-JOB-YYYYMMDD-XXXXXX
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
  status: ApplicationStatus;
  statusHistory: {
    status: ApplicationStatus;
    timestamp: string;
    note?: string;
  }[];
  appliedAt: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewLink?: string;
  interviewNotes?: string;
}

export interface InterviewSchedule {
  id: string;
  applicationId: string;
  ticketId: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
  mode: 'Online' | 'Offline';
  meetingLink?: string;
  location?: string;
  notes?: string;
  scheduledAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  logo?: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  reviewCount?: number;
  location: string;
  city: string;
  state: string;
  services: string[];
  about: string;
  description?: string;
  startingPrice?: string;
  phone: string;
  email: string;
  website?: string;
  portfolio: {
    title: string;
    description: string;
    image?: string;
  }[];
  reviews: {
    author: string;
    company: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  businessPanGst?: string;
  createdAt: string;
}

export interface VendorQuoteRequest {
  id: string;
  vendorId: string;
  vendorName: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  requesterCompany: string;
  requirement: string;
  quantityOrScope: string;
  budget: string;
  deadline: string;
  additionalDetails?: string;
  createdAt: string;
  status: 'Pending' | 'Responded' | 'Closed';
}
