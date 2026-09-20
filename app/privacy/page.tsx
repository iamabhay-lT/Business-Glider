'use client';

import React from 'react';
import { motion } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import Link from 'next/link';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "1",
      title: "1. Introduction",
      content: "Welcome to Business Glider. We value your trust and are fully committed to protecting your personal data. This Privacy Policy describes how Business Glider ('we', 'us', or 'our') collects, uses, processes, and shares personal information when you use our website, dashboard systems, and services. By accessing or using our platform, you acknowledge and agree to the terms described in this policy."
    },
    {
      id: "2",
      title: "2. Information We Collect",
      content: "We collect information that you voluntarily provide to us when registering, creating a profile, submitting job listings, posting products, or contacting support. This includes personal identifiers (such as full name, email address, phone number, and account passwords), professional information (resumes, work history, skills, and portfolio links), and business metadata (company details, corporate offerings, and supplier products)."
    },
    {
      id: "3",
      title: "3. How We Use Information",
      content: "We process your information for legitimate commercial interests, to provide and improve platform operations, to facilitate authentic connections between candidates, employers, and B2B vendors, and to maintain security. Specific uses include authenticating your login credentials, displaying matching job recommendations, routing B2B inquiries, preventing fraud, and delivering support communications."
    },
    {
      id: "4",
      title: "4. Account Information",
      content: "When registering on Business Glider, your authentication metadata (email addresses, names, and verification statuses) is securely managed and stored via Firebase Authentication. We enforce mandatory email verification to safeguard user identity, reduce artificial accounts, and protect platform networking integrity."
    },
    {
      id: "5",
      title: "5. Job Applications",
      content: "When job seekers apply for listed vacancies, their professional details, resume links, skill sets, and profile descriptions are explicitly transmitted to the relevant hiring employer. By submitting an application, you grant us permission to share your profile with that employer. Employers are independently bound to use your data strictly for recruitment evaluations."
    },
    {
      id: "6",
      title: "6. Employer Information",
      content: "Employers who list opportunities on Business Glider provide details such as company name, business description, location, and recruiter email addresses. This information is publically displayed within job details pages to assist job seekers. Recruiter emails are processed securely to route candidates applications."
    },
    {
      id: "7",
      title: "7. Vendor Information",
      content: "Registered B2B vendors display their professional trade names, service locations, contact details, price structures, and service listings. This metadata is shared openly within the public Vendor Directory to allow commercial clients to send requests-for-quotation (RFQs) and business inquiries directly."
    },
    {
      id: "8",
      title: "8. Cookies and Similar Technologies",
      content: "We use standard browser cookies and local storage (such as localStorage) to preserve your authentication sessions, persist system preferences, and evaluate website performance. You can control or disable cookie tracking through your browser settings, though doing so may restrict access to several interactive portal workflows."
    },
    {
      id: "9",
      title: "9. Data Security",
      content: "We employ industry-standard logical and administrative safety measures to protect your personal information from unauthorized access, loss, or disclosure. However, please remember that no transmission mechanism over the internet or cloud storage database is 100% secure. We encourage you to use robust, unique credentials and verify account sessions."
    },
    {
      id: "10",
      title: "10. Data Retention",
      content: "We retain your personal and professional profile data for as long as your account remains active on Business Glider. If you request account closure, we will deactivate your public storefront, remove listed job vacancies, and delete personal identifying information from active registries, subject to any legal storage requirements."
    },
    {
      id: "11",
      title: "11. Third-Party Services",
      content: "Our platform incorporates secure third-party modules such as Google Firebase Firestore and Firebase Authentication. These services have independent privacy policies governing their storage processing. We do not sell or trade your personal candidate data or business inquiries to external commercial advertisers."
    },
    {
      id: "12",
      title: "12. User Rights",
      content: "You hold the right to access, edit, update, or delete your personal profile data at any time. You can accomplish this directly by logging into your account and editing your profile fields. If you require assistance regarding account deletion or specific data processing queries, you can contact our help desk."
    },
    {
      id: "13",
      title: "13. Children's Privacy",
      content: "Business Glider is designed strictly for adults and professional business operators. We do not knowingly solicit or collect personal information from individuals under the age of 18. If we identify that a minor has created an account, we will act promptly to deactivate and delete their records."
    },
    {
      id: "14",
      title: "14. Changes to This Policy",
      content: "We may update this Privacy Policy periodically to reflect technological progress, operational modifications, or regulatory changes. Any modifications will be posted directly on this page with an updated 'Last Updated' date. We encourage you to review this policy periodically to stay informed."
    },
    {
      id: "15",
      title: "15. Contact Us",
      content: "If you have questions, feedback, or data privacy complaints regarding this Privacy Policy, please submit an enquiry through our Contact Page, or reach us directly at the contact details provided in our Help Center."
    }
  ];

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.05)_0%,transparent_40%)]" />
      </div>

      <LightNav />

      <main className="flex-1 flex flex-col relative z-10 pt-12 md:pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 w-full">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link 
              href="/explore"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </Link>
          </div>

          {/* Document Header */}
          <div className="border-b border-slate-200 pb-10 mb-10">
            <div className="flex items-center gap-3 text-indigo-600 mb-4">
              <Shield className="w-6 h-6 shrink-0" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Legal Documents</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Last Updated: September 2026</span>
              <span>&bull;</span>
              <span>Platform Version 1.0</span>
            </div>
          </div>

          {/* Document Body */}
          <div className="grid md:grid-cols-12 gap-10">
            
            {/* Left Col: Navigation index */}
            <div className="hidden md:block md:col-span-4 lg:col-span-3">
              <div className="sticky top-28 bg-white border border-slate-200/60 rounded-2xl p-5 space-y-2 max-h-[80vh] overflow-y-auto shadow-sm">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-3 pl-1">
                  Table of Contents
                </span>
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#section-${sec.id}`}
                    className="block text-[11px] font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-1 truncate"
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Col: Interactive text sections */}
            <div className="md:col-span-8 lg:col-span-9 space-y-10">
              
              {/* Privacy Warning Header */}
              <div className="bg-amber-50 border border-amber-100/80 rounded-2xl p-5 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-950">Secure Data Operations</h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                    We host database configurations inside Firebase environments using verified Cloud Firestore Rules. No personal user contact directories are shared outside candidate applications.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {sections.map((sec) => (
                  <div 
                    key={sec.id} 
                    id={`section-${sec.id}`}
                    className="scroll-mt-28 space-y-3"
                  >
                    <h3 className="text-base font-bold text-slate-900">
                      {sec.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-light">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </main>

      <LightFooter />
    </div>
  );
}
