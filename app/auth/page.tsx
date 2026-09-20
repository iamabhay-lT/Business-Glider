'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import EmailVerificationScreen from '@/components/auth/EmailVerificationScreen';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    tempPassword,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot-password'>(() => {
    const initialMode = searchParams ? searchParams.get('mode') : null;
    if (initialMode === 'signup' || initialMode === 'forgot-password') {
      return initialMode;
    }
    return 'signin';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Track unverified email to show the verification screen
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await signInWithEmail(email, password);
      if (result.error) {
        setErrorMessage(result.error.message || 'Incorrect email or password.');
      } else if (result.needsVerification) {
        setUnverifiedEmail(result.email || email);
      } else {
        setSuccessMessage('Logged in successfully!');
        setTimeout(() => {
          router.push('/explore');
        }, 800);
      }
    } catch (err) {
      setErrorMessage('Unexpected error during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await signUpWithEmail(email, password, name, phoneNumber);
      if (result.error) {
        setErrorMessage(result.error.message || 'Failed to create account.');
      } else if (result.needsVerification) {
        setUnverifiedEmail(result.email || email);
      } else {
        setSuccessMessage('Account created successfully!');
        setTimeout(() => {
          router.push('/onboarding/role');
        }, 800);
      }
    } catch (err) {
      setErrorMessage('Unexpected error during sign up.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        setErrorMessage(error.message || 'Failed to send reset email.');
      } else {
        setSuccessMessage('Password reset link sent to your email.');
      }
    } catch {
      setErrorMessage('Error sending reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setEmail('');
    setPassword('');
    setName('');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0f172a] flex flex-col justify-between relative overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08)_0%,transparent_40%)]" />
      </div>

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <Link href="/explore" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </Link>
        <Link href="/" className="flex flex-col text-right">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none">
            BUSINESS
          </span>
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0f172a] uppercase leading-none mt-1">
            GLIDER<span className="text-[9px] font-normal align-top ml-0.5">™</span>
          </span>
        </Link>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        {unverifiedEmail ? (
          <EmailVerificationScreen
            email={unverifiedEmail}
            tempPassword={tempPassword}
            onNavigateToLogin={() => {
              setUnverifiedEmail(null);
              setMode('signin');
            }}
          />
        ) : (
          <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Firebase Email Authentication</span>
              </div>
              <h1 className="text-3xl font-light tracking-tight text-slate-900">
                {mode === 'signin' ? (
                  <>Sign In</>
                ) : mode === 'signup' ? (
                  <>Create Account</>
                ) : (
                  <>Reset Password</>
                )}
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                {mode === 'signin'
                  ? 'Continue your journey with Business Glider.'
                  : mode === 'signup' 
                  ? 'Join us today and explore new opportunities.'
                  : 'Enter your email to receive a reset link.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/60 flex items-start gap-2.5 text-rose-700 text-sm leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  {errorMessage}
                  {(errorMessage.includes('already registered') || errorMessage.includes('already exists')) && (
                    <button 
                      onClick={() => { resetState(); setMode('signin'); }}
                      className="ml-2 underline font-medium hover:text-rose-800 cursor-pointer"
                    >
                      Switch to Sign in
                    </button>
                  )}
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center gap-2 text-emerald-800 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {mode === 'signin' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
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
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => { resetState(); setMode('forgot-password'); }}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 mt-2 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
                
                <div className="mt-6 text-center border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-600">
                    Don&apos;t have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => { resetState(); setMode('signup'); }}
                      className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                    >
                      Create Account
                  </button>
                  </p>
                </div>
              </form>
            )}

            {mode === 'signup' && (
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abhay Sharma"
                      required
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
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
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 89793 93003"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-800 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 mt-2 flex justify-center items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
                
                <div className="mt-6 text-center border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-600">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => { resetState(); setMode('signin'); }}
                      className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            )}
            
            {mode === 'forgot-password' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 mt-2 flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
                
                <div className="mt-6 text-center border-t border-slate-100 pt-4">
                  <button 
                    type="button"
                    onClick={() => { resetState(); setMode('signin'); }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                  >
                    ← Back to sign in
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 relative z-10">
        © {new Date().getFullYear()} Business Glider™ Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center text-slate-500 text-xs">
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <span>Loading authentication...</span>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
