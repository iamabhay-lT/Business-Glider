'use client';

// Unified re-export from context/AuthContext to eliminate redundant Firebase listeners and duplicate Auth Providers
export { AuthProvider, useAuth } from '@/context/AuthContext';
export type { AuthContextType } from '@/context/AuthContext';
