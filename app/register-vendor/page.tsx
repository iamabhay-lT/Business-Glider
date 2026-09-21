'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Store, Building2, MapPin, DollarSign, CheckCircle2, 
  ArrowRight, ShieldCheck, Mail, Phone, Globe, Sparkles,
  AlertCircle, RefreshCw, Lock
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import { PlatformStore } from '@/lib/services/platform-store';
import { POPULAR_VENDOR_CATEGORIES } from '@/lib/data/categories';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import EmailVerificationScreen from '@/components/auth/EmailVerificationScreen';

export default function RegisterVendorPage() {
  const router = useRouter();
  const { openLogin } = useAuth();

  // Authentication states
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Controlled form states - initialized strictly empty
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Web Development & Cloud');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  // UI state managers
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredVendorId, setRegisteredVendorId] = useState('');

  // Synchronize Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.email) {
        setEmail(user.email);
      } else {
        setEmail('');
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Double check authenticating credentials strictly before submitting
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setValidationError('Authentication Required. Please sign in to register your vendor profile.');
      openLogin('/register-vendor');
      return;
    }

    const isGoogle = Boolean(currentUser.providerData?.some((p) => p.providerId === 'google.com'));
    if (!currentUser.emailVerified && !isGoogle) {
      setValidationError('Email Verification Required. Please verify your email first.');
      return;
    }

    // Explicit field validation
    if (!businessName.trim()) {
      setValidationError('Business Name is required.');
      return;
    }
    if (!category) {
      setValidationError('Primary Sector is required.');
      return;
    }
    if (!contactName.trim()) {
      setValidationError('Contact Person is required.');
      return;
    }
    if (!email.trim()) {
      setValidationError('Business Email is required.');
      return;
    }
    if (!phone.trim()) {
      setValidationError('WhatsApp / Phone number is required.');
      return;
    }
    if (!location.trim()) {
      setValidationError('City / Location is required.');
      return;
    }
    if (!startingPrice.trim()) {
      setValidationError('Starting Package / Budget is required.');
      return;
    }
    if (!servicesInput.trim()) {
      setValidationError('Services Provided is required.');
      return;
    }
    if (!description.trim()) {
      setValidationError('Business Description & Capabilities are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate premium registration submission latency
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const services = (servicesInput || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const newVendor = PlatformStore.addVendor({
        name: businessName,
        category,
        contactPerson: contactName,
        email,
        phone,
        location,
        startingPrice,
        services: services.length > 0 ? services : ['Consulting', 'Support'],
        description,
        website: website || undefined,
        verified: false, // Do not falsely claim verification immediately upon self-submission
        rating: 5.0,
        reviewCount: 1,
      });

      setRegisteredVendorId(newVendor.id);
      setRegistrationSuccess(true);
    } catch (err: any) {
      console.warn('Registration note:', err?.message || err);
      setValidationError(err?.message || 'Failed to register vendor profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <main className="max-w-3xl mx-auto px-6 md:px-12 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            B2B Marketplace Partner
          </span>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-950 mt-1">
            Register as a Business Glider Vendor
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Showcase your agency, consultancy, or specialized enterprise services to thousands of verified businesses.
          </p>
        </div>

        {/* State A: Authentication & Loading Spinner */}
        {authLoading ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
            <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
            <p className="text-xs font-semibold text-slate-500">Checking credentials, please wait...</p>
          </div>
        ) : !firebaseUser ? (
          /* State B: Logged Out Required View */
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
              Authentication Required
            </span>
            <h2 className="text-xl font-bold text-slate-950 mt-2 mb-3">
              Account Registration Required
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              You must sign in or create a Business Glider account to register as a verified vendor and submit your business to our catalog.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => openLogin('/register-vendor')}
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                Sign In / Create Account
              </button>

              <Link
                href="/vendors"
                className="block text-xs font-bold text-slate-500 hover:text-slate-800 py-2.5 transition-colors"
              >
                &larr; Back to Directory
              </Link>
            </div>
          </div>
        ) : (!firebaseUser.emailVerified && !firebaseUser.providerData?.some((p) => p.providerId === 'google.com')) ? (
          /* State C: Email Unverified Fallback */
          <div className="max-w-md mx-auto">
            <EmailVerificationScreen
              email={firebaseUser.email || ''}
              onNavigateToLogin={() => openLogin('/register-vendor')}
            />
          </div>
        ) : (
          /* State D: Authenticated & Verified (Form Render) */
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
            {registrationSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase">
                  Listing Submitted
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                  Registration submitted successfully.
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  Your business listing <span className="font-semibold text-slate-800">{businessName}</span> has been received. Our partner team will review your capabilities for official verification.
                </p>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto mb-6 text-left text-xs space-y-1.5">
                  <p className="text-slate-500"><span className="font-bold text-slate-800">Registration ID:</span> {registeredVendorId}</p>
                  <p className="text-slate-500"><span className="font-bold text-slate-800">Category:</span> {category}</p>
                  <p className="text-slate-500"><span className="font-bold text-slate-800">Location:</span> {location}</p>
                  <p className="text-slate-500"><span className="font-bold text-slate-800">Starting Price:</span> {startingPrice}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/vendors"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <span>Explore in Marketplace</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`https://wa.me/918979393003?text=${encodeURIComponent(
                      `Hello Business Glider, I just registered "${businessName}" as a vendor (ID: ${registeredVendorId}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 text-center"
                  >
                    Connect with Partner Manager on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Company & Contact Information</h3>
                  <p className="text-xs text-slate-500">Provide official details for client verification.</p>
                </div>

                {validationError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-medium flex items-center gap-2.5">
                    <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Business Name *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <Store className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Acme Tech Solutions"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Primary Sector *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none cursor-pointer"
                    >
                      {POPULAR_VENDOR_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Abhay Sharma"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Business Email *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contact@agency.com"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">WhatsApp / Phone *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">City / Location *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="New Delhi, NCR"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Starting Package / Budget *</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        placeholder="e.g. ₹25,000"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Portfolio / Website</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-transparent text-xs text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Services Provided (Comma separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={servicesInput}
                    onChange={(e) => setServicesInput(e.target.value)}
                    placeholder="e.g. Web Development, Digital Marketing, Printing"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Business Description & Capabilities *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your business and capabilities..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:border-indigo-500 focus:bg-white resize-none transition-all"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href="/vendors"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    &larr; Back to Directory
                  </Link>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3.5 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-75 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-slate-900/10"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isSubmitting ? 'REGISTERING...' : 'REGISTER VERIFIED VENDOR'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <WhatsAppFloat />
    </div>
  );
}
