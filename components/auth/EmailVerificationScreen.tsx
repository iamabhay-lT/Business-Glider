'use client';

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, RefreshCw, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface EmailVerificationScreenProps {
  email: string;
  onNavigateToLogin: () => void;
  tempPassword?: string | null;
}

export default function EmailVerificationScreen({
  email,
  onNavigateToLogin,
  tempPassword,
}: EmailVerificationScreenProps) {
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Prompt for password if tempPassword is not available
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [promptPassword, setPromptPassword] = useState('');

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async (passwordToUse: string) => {
    setIsResending(true);
    setMessage(null);

    try {
      // Re-authenticate only if necessary
      // If we don't have the user currently signed in, sign them in with password
      let currentUser = auth.currentUser;
      
      if (!currentUser || currentUser.email !== email) {
        // Sign in to get user object
        const userCredential = await signInWithEmailAndPassword(auth, email, passwordToUse);
        currentUser = userCredential.user;
      }

      // Send verification email
      await sendEmailVerification(currentUser);
      
      // Sign out immediately as required to prevent active session
      await signOut(auth);

      setMessage({ type: 'success', text: 'Verification email sent.' });
      setCooldown(60); // 60-second cooldown
      setShowPasswordPrompt(false);
      setPromptPassword('');
    } catch (error: any) {
      console.warn('Resend verification note:', error?.message || error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to resend verification email. Please try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  const onResendClick = () => {
    if (cooldown > 0) return;
    
    if (tempPassword) {
      handleResend(tempPassword);
    } else {
      // Prompt user for password to re-authenticate
      setShowPasswordPrompt(true);
    }
  };

  const handlePasswordPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptPassword) return;
    handleResend(promptPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl text-slate-900 animate-in fade-in duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Envelope Icon */}
        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 relative">
          <Mail className="w-10 h-10 animate-bounce" />
          <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
          </span>
        </div>

        <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase mb-2">
          Verify Your Email
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
          Almost there!
        </h2>
        
        {/* Exact Messaging Required by User */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          We have sent you a verification email to <strong className="text-slate-950 font-semibold">{email}</strong>. Verify it and log in
        </p>

        {message && (
          <div
            className={`w-full mb-6 p-3.5 rounded-xl text-xs flex items-center gap-2.5 border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            )}
            <span className="text-left font-medium">{message.text}</span>
          </div>
        )}

        {/* Password Prompt for Re-authentication */}
        {showPasswordPrompt && (
          <form onSubmit={handlePasswordPromptSubmit} className="w-full mb-6 text-left animate-in slide-in-from-top-4 duration-200">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Enter password to verify identity:
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                <Lock className="w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={promptPassword}
                  onChange={(e) => setPromptPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                />
              </div>
              <button
                type="submit"
                disabled={isResending}
                className="bg-slate-950 hover:bg-slate-800 text-white px-4 rounded-xl text-xs font-semibold tracking-wide disabled:opacity-50 transition-all cursor-pointer"
              >
                Send
              </button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          {/* Prominent Sign In button */}
          <button
            onClick={onNavigateToLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Resend button */}
          <button
            onClick={onResendClick}
            disabled={isResending || cooldown > 0}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isResending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span>
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Verification Email'}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
