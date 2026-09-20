'use client';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full animate-in fade-in duration-150">
      {children}
    </div>
  );
}

