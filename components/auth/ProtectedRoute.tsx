'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, RefreshCw } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import EmailVerificationScreen from '@/components/auth/EmailVerificationScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  redirectPath?: string;
}

export default function ProtectedRoute({
  children,
  title = 'Authentication Required',
  description = 'You must sign in with a verified Business Glider account to access this feature.',
  redirectPath = '/explore',
}: ProtectedRouteProps) {
  const { openLogin } = useAuth();
  const [firebaseUser, setFirebaseUser] = useState<User | null>(() => auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 border border-slate-200/80 shadow-sm text-center flex flex-col items-center justify-center min-w-[320px]">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
          <p className="text-xs font-semibold text-slate-500">Checking credentials, please wait...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-sm text-center max-w-md w-full mx-auto">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
            Access Restricted
          </span>
          <h2 className="text-xl font-bold text-slate-950 mt-2 mb-3">
            {title}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            {description}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => openLogin(redirectPath)}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              Sign In / Create Account
            </button>

            <Link
              href="/explore"
              className="block text-xs font-bold text-slate-500 hover:text-slate-800 py-2.5 transition-colors"
            >
              &larr; Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!firebaseUser.emailVerified) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          <EmailVerificationScreen
            email={firebaseUser.email || ''}
            onNavigateToLogin={() => openLogin(redirectPath)}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
