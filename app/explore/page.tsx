'use client';
import { motion } from 'motion/react';
import LightNav from '@/components/explore-light/LightNav';
import LightHero from '@/components/explore-light/LightHero';
import PlatformOptions from '@/components/explore-light/PlatformOptions';
import SearchSections from '@/components/explore-light/SearchSections';
import FeaturedSections from '@/components/explore-light/FeaturedSections';
import LightFooter from '@/components/explore-light/LightFooter';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ExplorePage() {
  return (
    <div className="min-h-[100dvh] relative overflow-x-hidden flex flex-col bg-[#F7F9FC] text-[#0f172a] selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Ambient Layers */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(167,139,250,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08)_0%,transparent_40%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]" />
      </div>

      <LightNav />
      
      <main className="flex-1 flex flex-col relative z-10 pt-4 md:pt-8">
        <LightHero />
        <PlatformOptions />
        <SearchSections />
        <FeaturedSections />
      </main>

      <LightFooter />
      <WhatsAppButton />
    </div>
  );
}
