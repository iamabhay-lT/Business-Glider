'use client';

import React from 'react';
import { motion } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import Link from 'next/link';
import { ShieldCheck, Info, FileText, ArrowLeft } from 'lucide-react';

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "1",
      title: "1. Introduction",
      content: "These Terms & Conditions ('Terms') govern your access to and use of Business Glider ('we', 'us', or 'our'), including our websites, dashboard systems, and networking features. By creating an account, applying for jobs, registering store services, or browsing our platform, you agree to be fully bound by these Terms. If you do not agree, you are prohibited from accessing our services."
    },
    {
      id: "2",
      title: "2. Eligibility",
      content: "You must be at least 18 years of age or the legal age of majority in your jurisdiction to create an account or participate in activities on Business Glider. By creating an account, you represent and warrant that you hold full legal authority, capacity, and right to enter into these Terms and comply with all listed stipulations."
    },
    {
      id: "3",
      title: "3. Account Registration",
      content: "To access specific features, you must register for an account using a valid email address and password. You are solely responsible for maintaining the strict confidentiality of your login credentials and for all activities that occur under your account. You must provide complete, accurate, and truthful registration metadata."
    },
    {
      id: "4",
      title: "4. Job Seekers",
      content: "Job Seekers may create professional profiles, upload career details, search vacancies, and submit digital job applications. You acknowledge that building a profile or applying for positions does not guarantee employment, responses from hiring companies, interview shortlists, or contract opportunities. You are responsible for verifying employer legitimacy."
    },
    {
      id: "5",
      title: "5. Employers",
      content: "Employers may list legitimate vacancies, review digital applicant profiles, and manage interview pipelines. Employers agree to use candidate information strictly for employment recruitment evaluations. Employers represent that all job descriptions and company information provided are accurate, active, and compliant with local labor laws."
    },
    {
      id: "6",
      title: "6. Vendors",
      content: "B2B Vendors may register store directories and showcase corporate products or services. Vendors represent and warrant that they possess all required professional licenses, certifications, and capabilities to execute the services they advertise. Business Glider is not responsible for auditing vendor qualifications."
    },
    {
      id: "7",
      title: "7. Job Listings",
      content: "We do not review or pre-screen every single job listing published on our platform. Employers are solely responsible for the content of their job listings. We reserve the absolute right to deactivate, edit, or remove any listing that we identify violates our content guidelines or harbors deceptive, fraudulent, or unlawful schemes."
    },
    {
      id: "8",
      title: "8. Applications",
      content: "Hiring decisions, interviewing, salary arrangements, and formal employment contracts are handled exclusively between Job Seekers and Employers. Business Glider does not act as an employment agency, headhunter, or party to any hiring contract, and we hold zero liability regarding employment relationships or disputes."
    },
    {
      id: "9",
      title: "9. Vendor Services",
      content: "Business Glider serves strictly as a digital connection marketplace for B2B Vendors and prospective commercial clients. Any service agreements, pricing quotations, contracts, or service deliveries are formulated solely between the vendor and the customer. We do not guarantee vendor quality, execution, or commercial outcomes."
    },
    {
      id: "10",
      title: "10. User Content",
      content: "You retain ownership of all text, documents, resumes, or store details you upload to Business Glider ('User Content'). By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free license to display, host, and distribute that content to facilitate connection features (such as displaying profiles in searches)."
    },
    {
      id: "11",
      title: "11. Prohibited Activities",
      content: "You are strictly prohibited from: uploading fraudulent, deceptive, or malicious content; impersonating other people or brands; sending spam, unauthorized bulk advertisements, or phishing links; scrapping profile datasets using automated crawlers; attempting to circumvent security; or using our services for unlawful enterprises."
    },
    {
      id: "12",
      title: "12. Intellectual Property",
      content: "The Business Glider name, visual logos, custom brand identity, codebase structure, interface designs, vector layouts, and text content are the exclusive property of Business Glider and its licensors. You are strictly forbidden from copying, reproducing, or distributing platform property without our explicit written consent."
    },
    {
      id: "13",
      title: "13. Third-Party Links and Services",
      content: "Our platform incorporates secure third-party components (such as Firebase auth, hosting, or map groundings) and link outs. We do not endorse, audit, or assume liability for any third-party websites, applications, services, or materials. Your interactions with third-party systems are governed entirely by their terms."
    },
    {
      id: "14",
      title: "14. Platform Availability",
      content: "We strive to maintain continuous platform availability, but we do not guarantee uninterrupted, error-free, or server-faultless operations. We may suspend, restrict, or modify portal features for technical maintenance, software upgrades, or security patches at any time without prior notification."
    },
    {
      id: "15",
      title: "15. Limitation of Liability",
      content: "To the maximum extent permitted by law, Business Glider, its directors, employees, or tech partners shall not be held liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, employment opportunities, contract revenues, or business reputations arising from your use of the platform."
    },
    {
      id: "16",
      title: "16. Account Suspension/Termination",
      content: "We reserve the right to suspend or terminate your platform access, disable your account, or remove your listings at our absolute discretion, without prior notice, if we identify that you have breached these Terms, engaged in fraudulent activities, or created liability risks for the platform."
    },
    {
      id: "17",
      title: "17. Changes to Terms",
      content: "We reserve the right to revise or update these Terms & Conditions at any time. Any changes will be published on this page with an updated 'Last Updated' date. Continued use of Business Glider following such modifications constitutes your full agreement to the updated Terms."
    },
    {
      id: "18",
      title: "18. Contact",
      content: "For any inquiries or clarifications regarding these Terms & Conditions, please contact us by submitting a formal query via our Contact Page, or consult our Help Center for general support guidelines."
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
              <ShieldCheck className="w-6 h-6 shrink-0" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Platform Guidelines</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Terms & Conditions
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Last Updated: September 2026</span>
              <span>&bull;</span>
              <span>User Agreement</span>
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

            {/* Right Col: Terms text sections with disclaimer header */}
            <div className="md:col-span-8 lg:col-span-9 space-y-10">
              
              {/* Important Disclaimer Header Card */}
              <div className="bg-amber-50 border border-amber-100/80 rounded-2xl p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-950">Important Platform Disclaimer</h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                    Business Glider is strictly an interactive networking platform. We do not act as employers, hiring agents, or contract guarantors. We do not guarantee job offers, hiring approvals, commercial trade volumes, or vendor performance outcomes.
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
