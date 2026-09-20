'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  FileText, Upload, CheckCircle2, ArrowRight, ArrowLeft, 
  Sparkles, Plus, X, Trash2 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { PlatformStore } from '@/lib/services/platform-store';
import { UserProfile } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export default function CreateProfilePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState(() => PlatformStore.getUserProfile()?.fullName || user?.fullName || '');
  const [email, setEmail] = useState(() => PlatformStore.getUserProfile()?.email || user?.email || '');
  const [phone, setPhone] = useState(() => PlatformStore.getUserProfile()?.phone || user?.phone || '');
  const [location, setLocation] = useState(() => PlatformStore.getUserProfile()?.location || '');

  // Step 2
  const [headline, setHeadline] = useState(() => PlatformStore.getUserProfile()?.headline || '');
  const [experienceYears, setExperienceYears] = useState(() => PlatformStore.getUserProfile()?.experienceYears || '');
  const [skills, setSkills] = useState<string[]>(() => PlatformStore.getUserProfile()?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [preferredRole, setPreferredRole] = useState(() => PlatformStore.getUserProfile()?.desiredRole || '');
  const [expectedSalary, setExpectedSalary] = useState(() => PlatformStore.getUserProfile()?.expectedSalary || '');

  // Step 3
  const [degree, setDegree] = useState(() => {
    const existing = PlatformStore.getUserProfile();
    return existing?.degree || existing?.education?.[0]?.degree || '';
  });
  const [college, setCollege] = useState(() => {
    const existing = PlatformStore.getUserProfile();
    return existing?.college || existing?.education?.[0]?.college || '';
  });
  const [gradYear, setGradYear] = useState(() => {
    const existing = PlatformStore.getUserProfile();
    return existing?.gradYear || existing?.education?.[0]?.passingYear || '';
  });
  const [prevCompany, setPrevCompany] = useState(() => {
    const existing = PlatformStore.getUserProfile();
    return existing?.experience?.[0]?.company || '';
  });
  const [prevRole, setPrevRole] = useState(() => {
    const existing = PlatformStore.getUserProfile();
    return existing?.experience?.[0]?.role || '';
  });

  // Step 4: Resume
  const [resumeName, setResumeName] = useState(() => PlatformStore.getUserProfile()?.resumeName || '');
  const [resumeSize, setResumeSize] = useState(() => PlatformStore.getUserProfile()?.resumeSize || '');
  const [isUploading, setIsUploading] = useState(false);

  // Success state
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setResumeName(file.name);
        setResumeSize(`${(file.size / 1024).toFixed(0)} KB`);
        setIsUploading(false);
      }, 500);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    PlatformStore.saveUserProfile({
      fullName,
      email,
      phone,
      location,
      headline,
      experienceYears,
      skills,
      desiredRole: preferredRole,
      expectedSalary,
      resumeName,
      degree,
      college,
      gradYear,
      experience: prevCompany ? [{
        id: 'exp-1',
        company: prevCompany,
        role: prevRole,
        duration: experienceYears || '1+ Year',
        description: `${prevRole} at ${prevCompany}`,
      }] : [],
    });
    setSavedSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/job-seeker');
    }, 1200);
  };

  // Completion calculation
  const completionPercent = [
    fullName, email, phone, location, headline, 
    skills.length > 0, degree, resumeName
  ].filter(Boolean).length * 12.5;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <ProtectedRoute
        title="Candidate Profile Creation"
        description="Please sign in with a verified account to create or edit your candidate profile."
        redirectPath="/create-profile"
      >
        <main className="max-w-4xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            Candidate Onboarding
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-950 mt-1">
            Build Your Verified Job Seeker Profile
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Top companies hire directly from Business Glider. Verified profiles receive 4x more interview invitations.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-900">
              Step {step} of 4: {
                step === 1 ? 'Personal Information' : 
                step === 2 ? 'Professional Expertise' : 
                step === 3 ? 'Education & Experience' : 
                'Resume & Submission'
              }
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {Math.min(100, Math.round(completionPercent))}% Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            {['Personal', 'Skills', 'Background', 'Resume'].map((label, idx) => (
              <button
                key={label}
                onClick={() => setStep(idx + 1)}
                className={`text-[11px] font-medium transition-colors ${
                  step === idx + 1 ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Step Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
          {savedSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Profile Saved Successfully!</h2>
              <p className="text-xs text-slate-500 mt-2 mb-6">
                Redirecting to your Candidate Dashboard...
              </p>
              <Link
                href="/dashboard/job-seeker"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                    <p className="text-xs text-slate-500">How employers and recruiters will reach you.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                      <User className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Abhay Sharma"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address *</label>
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="abhay@example.com"
                          className="w-full bg-transparent text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Phone Number *</label>
                      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 89793 93003"
                          className="w-full bg-transparent text-xs text-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Current City / Location *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. New Delhi, NCR, India"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span>Continue to Professional Info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Professional Details */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Professional Expertise</h3>
                    <p className="text-xs text-slate-500">Your role, skills, and target compensation.</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Professional Headline *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="e.g. Senior Full-Stack Engineer | React & Node.js"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Total Experience</label>
                      <select
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none cursor-pointer"
                      >
                        <option value="Fresher / Entry Level">Fresher / Entry Level (0-1 yr)</option>
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="3 Years">3 - 4 Years</option>
                        <option value="5-7 Years">5 - 7 Years</option>
                        <option value="8+ Years">8+ Years (Lead / Senior)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Expected Salary</label>
                      <input
                        type="text"
                        value={expectedSalary}
                        onChange={(e) => setExpectedSalary(e.target.value)}
                        placeholder="e.g. ₹15 - ₹20 LPA"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  {/* Skills Tags Manager */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Key Skills & Competencies</label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Type skill (e.g. Python, AWS, Docker) and press Enter"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                      >
                        Add Skill
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 shadow-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3 px-5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="py-3 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span>Continue to Background</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Education & Experience */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Education & Background</h3>
                    <p className="text-xs text-slate-500">Your academic qualifications and recent experience.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Highest Degree</label>
                      <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="e.g. B.Tech / MBA / B.Com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Graduation Year</label>
                      <input
                        type="text"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        placeholder="e.g. 2022"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">College / University</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. Delhi Technological University"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Previous Company (Optional)</label>
                      <input
                        type="text"
                        value={prevCompany}
                        onChange={(e) => setPrevCompany(e.target.value)}
                        placeholder="e.g. TCS, Infosys, Startup"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Previous Role (Optional)</label>
                      <input
                        type="text"
                        value={prevRole}
                        onChange={(e) => setPrevRole(e.target.value)}
                        placeholder="e.g. Associate Software Engineer"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3 px-5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="py-3 px-6 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span>Continue to Resume Upload</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Resume / CV Upload & Submit */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Upload Resume / CV</h3>
                    <p className="text-xs text-slate-500">Employers review your resume when assessing applications.</p>
                  </div>

                  {/* Drag-and-drop box */}
                  <label className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/70 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors block text-center">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                      {isUploading ? 'Uploading file...' : 'Click or drag resume file here'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Supports PDF, DOC, DOCX up to 5 MB
                    </p>
                  </label>

                  {/* Attached file badge */}
                  {resumeName && (
                    <div className="flex items-center justify-between p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-600 text-white">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{resumeName}</p>
                          <p className="text-[10px] text-slate-500">{resumeSize} • Ready for 1-Click Applications</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setResumeName('')}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                        title="Remove resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Review Summary */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs space-y-2">
                    <p className="font-bold text-slate-900">Profile Snapshot</p>
                    <p className="text-slate-600"><span className="font-semibold">Candidate:</span> {fullName || 'Not provided'} ({email})</p>
                    <p className="text-slate-600"><span className="font-semibold">Headline:</span> {headline || 'Professional'}</p>
                    <p className="text-slate-600"><span className="font-semibold">Experience:</span> {experienceYears}</p>
                    <p className="text-slate-600"><span className="font-semibold">Skills:</span> {skills.join(', ')}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="py-3 px-5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <button
                      type="submit"
                      className="py-3.5 px-8 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-slate-900/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>SAVE VERIFIED PROFILE</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </main>
      </ProtectedRoute>

      <WhatsAppFloat />
    </div>
  );
}
