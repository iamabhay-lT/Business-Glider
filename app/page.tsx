import Hero from '@/components/Hero';

export default function Page() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden flex flex-col justify-center bg-black">
      <div className="absolute inset-0 w-full h-full pointer-events-none [background:radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05)_0%,transparent_50%)]" />
      
      <main className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 z-20 relative">
        <Hero />
      </main>
    </div>
  );
}
