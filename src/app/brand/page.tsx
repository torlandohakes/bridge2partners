"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { SidebarNav } from "@/components/brand/SidebarNav";
import { StrategicCore } from "@/components/brand/sections/StrategicCore";
import { VisualIdentity } from "@/components/brand/sections/VisualIdentity";
import { UIComponentLibrary } from "@/components/brand/sections/UIComponentLibrary";
import { PitchDeckGuidelines } from "@/components/brand/sections/PitchDeckGuidelines";
import { EventPresenceGuidelines } from "@/components/brand/sections/EventPresenceGuidelines";
import { WebsiteGuidelines } from "@/components/brand/sections/WebsiteGuidelines";

function TabContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "strategic-core";

  return (
    <main className="min-w-0 flex-1">
      {tab === "strategic-core" && <StrategicCore />}
      {tab === "visual-identity" && <VisualIdentity />}
      {tab === "ui-component-library" && <UIComponentLibrary />}
      {tab === "pitch-deck-guidelines" && <PitchDeckGuidelines />}
      {tab === "event-presence-guidelines" && <EventPresenceGuidelines />}
      {tab === "website-guidelines" && <WebsiteGuidelines />}
    </main>
  );
}

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-foreground selection:bg-primary/20 relative overflow-hidden">
      {/* Decorative Premium Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#009677]/[0.06] blur-[100px]" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00573f]/[0.08] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-[#009677]/[0.05] blur-[150px]" />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Header */}
        <header className="pt-12 md:pt-16 pb-8 border-b border-neutral/10">
          <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display max-w-3xl">
              <span className="text-primary">Bridge2Partners</span> <span className="text-neutral/50 font-light">Brand Guidelines</span>
            </h1>
            
            <div className="inline-flex shrink-0 items-center justify-center self-end md:self-auto py-2">
              <Image 
                src="/images/Bridge2Partners_Brand_Logo_v7.png" 
                alt="Bridge2Partners Logo" 
                width={300} 
                height={80} 
                className="w-auto h-8 md:h-12 object-contain drop-shadow-sm" 
                priority
              />
            </div>
          </div>
          <p className="text-lg text-neutral/60 font-sans max-w-3xl leading-relaxed">
            The definitive architectural, visual, and strategic system engineered for the AI-ready bank.
          </p>
        </header>

        {/* Dashboard Layout */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 py-8 md:py-12 pb-32 md:pb-12 relative items-start">
          <Suspense fallback={<div className="flex-1 animate-pulse bg-neutral/5 h-64 rounded-lg" />}>
            <SidebarNav />
            <TabContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
