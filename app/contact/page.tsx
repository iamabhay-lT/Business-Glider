'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  HelpCircle, 
  FileText, 
  ArrowLeft,
  Briefcase,
  Building2,
  Store,
  Users
} from 'lucide-react';

type Category = 'general' | 'partnership' | 'employer' | 'seeker' | 'vendor';

export default function ContactPage() {
  const [category, setCategory] = useState<Category>('general');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSuccess(true);
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: 'general', title: 'General Enquiries', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'partnership', title: 'Business & Partnerships', icon: <Users className="w-4 h-4" /> },
    { id: 'employer', title: 'Employer Support', icon: <Building2 className="w-4 h-4" /> },
    { id: 'seeker', title: 'Job Seeker Support', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'vendor', title: 'Vendor Support', icon: <Store className="w-4 h-4" /> },
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
        <div className="max-w-6xl mx-auto px-6 w-full">
          
          {/* Header text */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6">
              Let&apos;s <span className="font-semibold text-indigo-600">Connect</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-light leading-relaxed">
              Have a question, partnership idea, hiring requirement, or business inquiry? Our team is here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Contact Categories and Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-7 md:p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(15,23,42,0.02)]">
                <h2 className="text-lg font-bold text-slate-900 mb-2">How can we help?</h2>
                <p className="text-xs text-slate-500 mb-6">Select a category to route your message to the correct team member.</p>
                
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id as Category)}
                      className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl border text-left text-xs font-semibold tracking-wide transition-all ${
                        category === cat.id
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                          : 'bg-slate-50 border-slate-200/60 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        category === cat.id ? 'bg-white/20 text-white' : 'bg-white text-slate-500'
                      }`}>
                        {cat.icon}
                      </div>
                      <span>{cat.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Information disclaimer card */}
              <div className="p-6 bg-indigo-50/40 rounded-3xl border border-indigo-100/50">
                <h3 className="text-xs font-bold text-indigo-950 mb-1.5">Direct Enquiries</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-3">
                  For critical technical emergencies or account lockouts, visit our Help Center or search the FAQ first.
                </p>
                <div className="text-[11px] font-semibold text-indigo-700">
                  Business Hours: 10:00 AM — 6:00 PM (IST)
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_15px_40px_rgba(15,23,42,0.03)]">
                
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-12 px-4"
                    >
                      <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-3xl mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-8 font-light">
                        Thank you for reaching out. Your enquiry has been compiled and is staged to be delivered to our support desk.
                      </p>
                      
                      <button
                        onClick={() => setSuccess(false)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-5 py-3 rounded-xl cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Send another message</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-5"
                    >
                      <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                            <User className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. Abhay Sharma"
                              required
                              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              required
                              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number (Optional)</label>
                          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 98765 43210"
                              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject *</label>
                          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="Brief subject description"
                              required
                              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message *</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can our teams help you? Please describe in detail..."
                          required
                          rows={5}
                          className="w-full p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 bg-slate-50"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-xs font-semibold tracking-wide disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 cursor-pointer mt-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      </button>

                      <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed font-light">
                        Note: This is a staged demo portal. Message entries are processed locally for security and simulation testing.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </main>

      <LightFooter />
    </div>
  );
}
