'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile, UserRole } from '@/lib/types';
import { PlatformStore } from '@/lib/services/platform-store';
import { auth } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  User
} from 'firebase/auth';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import EmailVerificationScreen from '@/components/auth/EmailVerificationScreen';

export interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: User | null;
  profile: any | null;
  jobSeekerProfile: any | null;
  employerProfile: any | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  loginModalOpen: boolean;
  roleModalOpen: boolean;
  tempPassword?: string | null;
  openLogin: (redirectTo?: string) => void;
  closeLogin: () => void;
  openRoleSelect: () => void;
  closeRoleSelect: () => void;
  selectRole: (role: UserRole) => void;
  updateRole: (role: UserRole) => Promise<void>;
  logout: () => void;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateJobSeekerProfile: (data: any) => Promise<void>;
  updateEmployerProfile: (data: any) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any; needsVerification?: boolean; email?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: any; needsVerification?: boolean; email?: string }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  deleteAccount: () => Promise<{ error: any }>;
  loginAsDemo: (role?: UserRole) => void;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithFacebook: () => Promise<{ error: any }>;
  sendPhoneOtp: (phone: string) => Promise<{ error: any }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);

  // Form states inside modal
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'verify'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  
  // Cache password for unverified resend flow
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Reject unverified users immediately on state changes
        if (!fbUser.emailVerified) {
          await firebaseSignOut(auth);
          setFirebaseUser(null);
          setUser(null);
          setIsLoading(false);
          return;
        }

        setFirebaseUser(fbUser);
        const localProfile = PlatformStore.getUserProfile();
        const updated = PlatformStore.saveUserProfile({
          id: fbUser.uid,
          email: fbUser.email || localProfile.email,
          fullName: fbUser.displayName || localProfile.fullName,
        });
        setUser(updated);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setIsLoading(false);
    }, (err) => {
      console.error("Auth state error:", err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openLogin = (redirectTo?: string) => {
    setAuthError(null);
    setAuthSuccess(null);
    setEmail('');
    setPassword('');
    setFullName('');
    setAuthMode('signin');
    setTempPassword(null);
    if (redirectTo) setRedirectAfterAuth(redirectTo);
    setLoginModalOpen(true);
  };

  const closeLogin = () => setLoginModalOpen(false);
  const openRoleSelect = () => setRoleModalOpen(true);
  const closeRoleSelect = () => setRoleModalOpen(false);

  const handleLoginSuccess = (userRole?: UserRole) => {
    setLoginModalOpen(false);
    const currentRole = userRole || user?.role || 'job_seeker';
    
    if (redirectAfterAuth) {
      router.push(redirectAfterAuth);
      setRedirectAfterAuth(null);
    } else {
      if (currentRole === 'job_seeker') {
        router.push('/dashboard/job-seeker');
      } else if (currentRole === 'employer') {
        router.push('/dashboard/employer');
      } else {
        router.push('/vendors');
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setOtpLoading(true);

    try {
      if (authMode === 'signin') {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const authenticatedUser = userCredential.user;

        if (!authenticatedUser.emailVerified) {
          // Send/resend verification email
          try {
            await sendEmailVerification(authenticatedUser);
          } catch (resendError) {
            console.error("Failed to auto-resend verification email in modal sign-in:", resendError);
          }

          setTempPassword(password);
          await firebaseSignOut(auth);
          setAuthMode('verify');
          setOtpLoading(false);
          return;
        }

        setAuthSuccess('Logged in successfully!');
        const localProfile = PlatformStore.getUserProfile();
        const updated = PlatformStore.saveUserProfile({
          id: authenticatedUser.uid,
          email: email,
          fullName: authenticatedUser.displayName || localProfile.fullName,
        });
        setUser(updated);
        setTempPassword(null);

        setTimeout(() => {
          setOtpLoading(false);
          handleLoginSuccess();
        }, 800);
      } else {
        // Sign Up
        if (!fullName.trim()) {
          setAuthError('Please enter your full name.');
          setOtpLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const authenticatedUser = userCredential.user;

        if (authenticatedUser) {
          await firebaseUpdateProfile(authenticatedUser, {
            displayName: fullName
          });

          // Immediately send Firebase verification email
          await sendEmailVerification(authenticatedUser);

          setTempPassword(password);
          // Immediately sign out to prevent session creation for unverified user
          await firebaseSignOut(auth);

          setAuthMode('verify');
          setOtpLoading(false);
          return;
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setOtpLoading(false);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setAuthError('Password or Email Incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setAuthError('User already exists. Sign in?');
      } else {
        setAuthError(error.message || 'Authentication failed. Please try again.');
      }
    }
  };

  const selectRole = (newRole: UserRole) => {
    const updated = PlatformStore.saveUserProfile({ role: newRole });
    setUser(updated);
    setRoleModalOpen(false);

    if (redirectAfterAuth) {
      router.push(redirectAfterAuth);
      setRedirectAfterAuth(null);
    } else {
      if (newRole === 'job_seeker') {
        router.push('/onboarding/job-seeker');
      } else if (newRole === 'employer') {
        router.push('/dashboard/employer');
      } else {
        router.push('/vendors');
      }
    }
  };

  const logout = () => {
    firebaseSignOut(auth).catch((e) => console.error(e));
    setUser(null);
    router.push('/explore');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    const updated = PlatformStore.saveUserProfile(data);
    setUser(updated);
  };

  const updateRole = async (newRole: UserRole) => {
    const updated = PlatformStore.saveUserProfile({ role: newRole });
    setUser(updated);
  };

  const updateJobSeekerProfile = async (data: any) => {
    const updated = PlatformStore.saveUserProfile(data);
    setUser(updated);
  };

  const updateEmployerProfile = async (data: any) => {
    const updated = PlatformStore.saveUserProfile(data);
    setUser(updated);
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setFirebaseUser(null);
    router.push('/explore');
  };

  const deleteAccount = async () => {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }
      await signOut();
      return { error: null };
    } catch (error: any) {
      console.error("Delete account error:", error);
      return { error };
    }
  };

  const signInWithEmail = async (emailInput: string, passwordInput: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      const authenticatedUser = userCredential.user;

      if (!authenticatedUser.emailVerified) {
        try {
          await sendEmailVerification(authenticatedUser);
        } catch (resendErr) {
          console.error("Failed to auto-resend verification email:", resendErr);
        }
        setTempPassword(passwordInput);
        await firebaseSignOut(auth);
        return { error: null, needsVerification: true, email: emailInput };
      }

      const localProfile = PlatformStore.getUserProfile();
      const updated = PlatformStore.saveUserProfile({
        id: authenticatedUser.uid,
        email: emailInput,
        fullName: authenticatedUser.displayName || localProfile.fullName,
      });
      setUser(updated);
      setFirebaseUser(authenticatedUser);
      setTempPassword(null);
      return { error: null };
    } catch (error: any) {
      console.error("Sign in error:", error);
      let friendlyError = error;
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        friendlyError = new Error('Password or Email Incorrect');
      } else {
        friendlyError = new Error(error.message || 'Authentication failed.');
      }
      return { error: friendlyError };
    }
  };

  const signUpWithEmail = async (emailInput: string, passwordInput: string, fullNameInput: string, phoneInput?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      const authenticatedUser = userCredential.user;

      if (authenticatedUser) {
        await firebaseUpdateProfile(authenticatedUser, {
          displayName: fullNameInput
        });
        await sendEmailVerification(authenticatedUser);
        setTempPassword(passwordInput);
        await firebaseSignOut(auth);
      }

      return { error: null, needsVerification: true, email: emailInput };
    } catch (error: any) {
      console.error("Sign up error:", error);
      let friendlyError = error;
      if (error.code === 'auth/email-already-in-use') {
        friendlyError = new Error('User already exists. Sign in?');
      } else {
        friendlyError = new Error(error.message || 'Failed to create account.');
      }
      return { error: friendlyError };
    }
  };

  const resetPassword = async (emailInput: string) => {
    try {
      await sendPasswordResetEmail(auth, emailInput);
      return { error: null };
    } catch (error: any) {
      console.error("Reset password error:", error);
      return { error };
    }
  };

  const updatePassword = async (passwordInput: string) => {
    try {
      if (auth.currentUser) {
        await firebaseUpdatePassword(auth.currentUser, passwordInput);
      }
      return { error: null };
    } catch (error: any) {
      console.error("Update password error:", error);
      return { error };
    }
  };

  const loginAsDemo = (demoRole: UserRole = 'job_seeker') => {
    selectRole(demoRole);
  };

  const signInWithGoogle = async () => {
    return { error: new Error('Google sign-in is disabled. Please use Email and Password.') };
  };

  const signInWithFacebook = async () => {
    return { error: new Error('Facebook sign-in is disabled. Please use Email and Password.') };
  };

  const sendPhoneOtp = async (phone: string) => {
    return { error: new Error('Phone OTP sign-in is disabled. Please use Email and Password.') };
  };

  const verifyPhoneOtp = async (phone: string, token: string) => {
    return { error: new Error('Phone OTP verification is disabled. Please use Email and Password.') };
  };

  const profile = user ? {
    id: user.id,
    email: user.email,
    full_name: user.fullName,
    role: user.role,
  } : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        profile,
        jobSeekerProfile: profile,
        employerProfile: profile,
        role: user?.role || 'job_seeker',
        isAuthenticated: Boolean(user),
        isLoading,
        isConfigured: true,
        loginModalOpen,
        roleModalOpen,
        tempPassword,
        openLogin,
        closeLogin,
        openRoleSelect,
        closeRoleSelect,
        selectRole,
        updateRole,
        logout,
        signOut,
        updateProfile,
        updateJobSeekerProfile,
        updateEmployerProfile,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        updatePassword,
        deleteAccount,
        loginAsDemo,
        signInWithGoogle,
        signInWithFacebook,
        sendPhoneOtp,
        verifyPhoneOtp,
      }}
    >
      {children}

      {/* LOGIN / SIGN UP MODAL */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-7 md:p-8 shadow-2xl border border-slate-100 relative text-slate-900">
            {authMode === 'verify' ? (
              <EmailVerificationScreen
                email={email}
                tempPassword={tempPassword}
                onNavigateToLogin={() => {
                  setAuthMode('signin');
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
              />
            ) : (
              <>
                <button
                  onClick={closeLogin}
                  className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                    Welcome to Business Glider
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Access verified jobs, hire talent, or connect with B2B vendors.
                  </p>
                </div>

                {authError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:bg-white transition-all">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Abhay Sharma"
                          required={authMode === 'signup'}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                        />
                      </div>
                    </div>
                  )}

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
                        minLength={6}
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
                      />
                    </div>
                  </div>

                  {authMode === 'signin' && (
                    <div className="flex justify-end -mt-1.5 mb-1">
                      <button
                        type="button"
                        onClick={() => {
                          closeLogin();
                          router.push(`/forgot-password?email=${encodeURIComponent(email)}`);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold transition-colors cursor-pointer"
                        id="forgot-password-link"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-semibold tracking-wide disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 cursor-pointer mt-2"
                  >
                    <span>{otpLoading ? 'Processing...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-5 text-center border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError(null);
                        setAuthSuccess(null);
                        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                    >
                      {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ROLE MODAL */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-7 md:p-9 shadow-2xl border border-slate-100 relative text-slate-900">
            <button
              onClick={closeRoleSelect}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                Welcome to Business Glider
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                What are you here to do?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your primary goal to personalize your experience.
              </p>
            </div>

            <div className="space-y-3.5">
              <button
                onClick={() => selectRole('job_seeker')}
                className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-900">
                    Find a Job
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Build a job seeker profile, browse verified openings, apply with 1-click, and track application tickets.
                  </p>
                </div>
              </button>

              <button
                onClick={() => selectRole('employer')}
                className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                    Hire Employees
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Post job openings, screen qualified applicants, schedule candidate interviews, and manage hiring pipelines.
                  </p>
                </div>
              </button>

              <button
                onClick={() => selectRole('vendor')}
                className="w-full text-left p-5 rounded-2xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 hover:shadow-md transition-all group flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-900">
                    Find / Register as Vendor
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Discover verified suppliers, agencies, and professional services, or showcase your business.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
