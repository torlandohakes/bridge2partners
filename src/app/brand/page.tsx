"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
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
        <header className="py-12 md:py-16 border-b border-neutral/10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary font-heading">
            Bridge2Partners Dashboard
          </h1>
          <p className="text-xl text-neutral/80 max-w-3xl mt-4">
            The definitive architectural, visual, and strategic system engineered for the AI-ready bank.
          </p>
        </header>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 py-12">
          <Suspense fallback={<div className="col-span-2 animate-pulse bg-neutral/5 h-64 rounded-lg" />}>
            <aside className="hidden md:block">
              <SidebarNav />
            </aside>
            <TabContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
