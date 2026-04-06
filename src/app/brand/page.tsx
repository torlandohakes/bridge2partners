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
import { SocialLeadership } from "@/components/brand/sections/SocialLeadership";

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
      {tab === "social-leadership" && <SocialLeadership />}
    </main>
  );
}

export default function BrandDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-foreground selection:bg-primary/20 relative">
      {/* Decorative Premium Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#009677]/[0.06] blur-[100px]" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00573f]/[0.08] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-[#009677]/[0.05] blur-[150px]" />
      </div>
      
      {/* 1. Global SaaS Header */}
      <header className="static w-full shrink-0 h-[64px] border-b border-neutral/10 flex items-center px-4 md:px-6">
         <div className="flex items-center gap-4 w-full">
           <img 
              src="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Brand_Logo_v7.webp?alt=media&token=a90040bc-3446-408d-8794-cab07568de66" 
              alt="Bridge2Partners Logo" 
              className="h-6 md:h-8 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]" 
           />
           <h1 className="text-base md:text-lg tracking-tight font-display leading-none border-l border-neutral/20 pl-4 mt-0.5">
             <span className="hidden sm:inline font-bold text-primary">Bridge2Partners </span>
             <span className="text-neutral/50 font-light">Brand Guidelines</span>
           </h1>
         </div>
      </header>
        
      {/* 2. Structural Flex Payload */}
      <div className="flex flex-1 w-full mx-auto relative z-10 max-w-[1800px] h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Sticky Left Sidebar */}
        <aside className="hidden md:flex flex-col shrink-0 sticky top-0 h-full overflow-y-auto pl-5 py-8 custom-scrollbar z-20">
          <Suspense fallback={<div className="animate-pulse bg-neutral/5 w-64 h-full rounded-lg" />}>
            <SidebarNav />
          </Suspense>
        </aside>

        {/* Tab Router Content Canvas */}
        <main className="flex-1 w-full min-w-0 px-5 lg:px-[60px] py-8 overflow-y-auto custom-scrollbar relative scroll-smooth h-full">
          <div className="w-full max-w-none pb-32">
            <Suspense fallback={<div className="flex-1 animate-pulse bg-neutral/5 h-[80vh] rounded-xl border border-border/10 shadow-sm" />}>
              <TabContent />
            </Suspense>
          </div>
        </main>

      </div>
    </div>
  );
}
