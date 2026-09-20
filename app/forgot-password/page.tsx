'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import LightNav from '@/components/explore-light/LightNav';
import LightFooter from '@/components/explore-light/LightFooter';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openLogin } = useAuth();

  const [email, setEmail] = useState(() => {
    const emailParam = searchParams ? searchParams.get('email') : null;
    return emailParam ? decodeURIComponent(emailParam) : '';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (emailStr: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr);
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedEmail = (email || '').trim();

    if (!trimmedEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Firebase password reset integration
      await sendPasswordResetEmail(auth, trimmedEmail);
      setSuccess(trimmedEmail);
    } catch (err: any) {
      console.error("Firebase reset password error:", err);
      if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/user-not-found') {
        // According to user requirements: Do not reveal unnecessary account-existence info through custom UI.
        // Modern Firebase configuration does this naturally. For old Firebase configurations, we can simulate
        // success or handle user-not-found according to desired instructions.
        // Let's treat this as success or generic clean notification.
        setSuccess(trimmedEmail);
      } else {
        setError(err.message || 'Failed to send password reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    router.push('/explore');
    // Allow navigation to complete, then trigger the centralized sign in modal
    setTimeout(() => {
      openLogin();
    }, 150);
  };

  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      <title>Forgot Password - Business Glider</title>

      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.05)_0%,transparent_40%)]" />
      </div>

      <LightNav />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 py-16 px-6">
        <div className="w-full max-w-md bg-white rounded-[32px] border border-slate-200/60 shadow-xl p-8 md:p-10 relative">
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="reset-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3 block">
                    Security Operations
                  </span>
                  <h1 className="text-3xl font-light tracking-tight text-slate-900">
                    Forgot <span className="font-semibold text-indigo-600">Password?</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleResetRequest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                        id="reset-email-input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-xs font-semibold tracking-wide disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 cursor-pointer"
                    id="submit-reset-link"
                  >
                    <span>{loading ? 'Sending...' : 'Get Reset Link'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="border-t border-slate-100 pt-5 text-center">
                  <button
                    onClick={handleBackToSignIn}
                    className="text-xs text-slate-500 hover:text-indigo-600 font-semibold transition-colors cursor-pointer"
                    id="back-to-signin-link"
                  >
                    Return to Sign In
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Check Your Inbox</h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-light max-w-xs mx-auto">
                    We sent you a password change link to <span className="font-semibold text-indigo-600">{success}</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-[11px] text-slate-500 leading-relaxed">
                  Please click the link in that email to proceed. If you don&apos;t receive it within a few minutes, please check your spam folder.
                </div>

                <button
                  onClick={handleBackToSignIn}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 cursor-pointer"
                  id="success-signin-btn"
                >
                  <span>Sign In</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <LightFooter />
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center text-slate-500 text-xs">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
        <span>Loading secure workspace...</span>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
