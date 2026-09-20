'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth?mode=signup');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center text-slate-500 text-xs">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
      <span>Redirecting to Sign Up...</span>
    </div>
  );
}
