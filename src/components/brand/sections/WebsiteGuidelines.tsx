"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Swords, Compass, Network, Activity, LayoutTemplate } from "lucide-react";

import { WireframeHomepage } from "./website/WireframeHomepage";
import { WireframeSpokePage } from "./website/WireframeSpokePage";
import { WireframeGapAnalysis } from "./website/WireframeGapAnalysis";
import { WireframeProcurement } from "./website/WireframeProcurement";
import { WireframeTeam } from "./website/WireframeTeam";
import { WireframeBusinessCard } from "./website/WireframeBusinessCard";
import { WireframeCareers } from "./website/WireframeCareers";

const brandScriptTriggers = [
  {
    id: "stakes",
    title: "The Hero & The Stakes",
    icon: Swords,
    detail: "Regional Bank Executives facing legacy tech failure. The stakes are lost M&A valuations or losing market share to agile fintechs. They need immediate, proven intervention."
  },
  {
    id: "guide",
    title: "The Guide (Empathy + Authority)",
    icon: Compass,
    detail: "We are not theorists. We are ex-bankers with decades of executive experience. We understand the regulatory and operational trenches because we have lived and succeeded in them."
  },
  {
    id: "plan",
    title: "The Plan (Hub & Spoke)",
    icon: Network,
    detail: "We guide them from the burning M&A entry point into our four core operational spokes: M&A Integration, Commercial Lending, Wealth Management, and Treasury/Payments."
  },
  {
    id: "cta",
    title: "The Call to Action (Interactive)",
    icon: Activity,
    detail: "Instead of hiding behind traditional, static PDFs, our primary Call To Action is a functional \"Gap Analysis\" or \"M&A Readiness\" digital tool that proves our immediate consultative value."
  }
];

export function WebsiteGuidelines() {
  const [expandedTrigger, setExpandedTrigger] = useState<string | null>("stakes");

  return (
    <section id="website-guidelines" className="w-full space-y-16 animate-in fade-in duration-500">
      
      {/* 1. The Header & Strategy */}
      <div className="space-y-4 border-b border-primary/10 pb-8">
        <h2 className="text-3xl font-semibold tracking-tighter text-primary font-heading">
          Website Wireframes & BrandScript
        </h2>
        <div className="flex flex-col gap-2 mt-2">
           <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary">Website Core Purpose</span>
           <p className="text-lg text-slate-800 dark:text-slate-200 font-sans max-w-3xl leading-relaxed font-medium">
             Executive and Institutional Validation. The site exists to prove to the market that Bridge2Partners possesses specialized human expertise, a future-focused methodology, and uncompromising adherence to enterprise banking compliance. It is engineered to satisfy the most stringent procurement standards.
           </p>
        </div>
      </div>

      {/* 2. B2P BrandScript (Focus Index Accordion) */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-semibold font-heading text-foreground">B2P BrandScript</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-primary/10 p-2 shadow-sm flex flex-col gap-1 inline-block w-full">
          {brandScriptTriggers.map((trigger) => {
            const isExpanded = expandedTrigger === trigger.id;
            const Icon = trigger.icon;

            return (
              <div key={trigger.id} className={cn(
                "group flex flex-col rounded-lg transition-all duration-300 border",
                isExpanded ? "bg-white shadow-sm border-neutral/10" : "border-transparent"
              )}>
                <button
                  onClick={() => setExpandedTrigger(isExpanded ? null : trigger.id)}
                  aria-expanded={isExpanded}
                  className={cn(
                    "flex items-center justify-between w-full p-4 lg:p-6 transition-all duration-300 rounded-lg text-left",
                    "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:bg-neutral/5 focus-visible:outline-none",
                    !isExpanded && "hover:bg-neutral/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
                      isExpanded ? "bg-primary/10 text-primary" : "bg-neutral/5 text-muted-foreground group-hover:text-muted-foreground"
                    )}>
                      <Icon strokeWidth={1.5} className="w-5 h-5 shrink-0" />
                    </div>
                    <span className={cn(
                      "font-ui font-semibold text-lg transition-colors",
                      isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {trigger.title}
                    </span>
                  </div>
                  <div className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0">
                    <ChevronDown
                      strokeWidth={1.5}
                      className={cn(
                        "w-5 h-5 text-foreground/40 transition-transform duration-300",
                        isExpanded ? "rotate-180 text-primary" : ""
                      )}
                    />
                  </div>
                </button>
                
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    isExpanded ? "max-h-[200px]" : "max-h-0"
                  )}
                >
                  <div className="p-6 pt-0 lg:pl-[88px] pl-[76px] text-muted-foreground font-sans leading-relaxed text-sm md:text-base border-l-2 border-transparent">
                    {trigger.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. The Layout Blueprints (CSS Wireframes - Imported) */}
      <div className="space-y-8 pt-8">
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-primary" strokeWidth={1.5} /> Structural Schematics
          </h3>
          <p className="text-muted-foreground font-sans max-w-2xl">
            Below are functional wireframes outlining the digital structure, referencing our strict UI archetypes. These blueprints guide the engineering phase.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
          <WireframeHomepage />

          <div className="space-y-8 flex flex-col">
            <WireframeSpokePage />
            <WireframeGapAnalysis />
          </div>
        </div>

        {/* --- SECOND TIER SCHEMATICS --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full mt-8">
          <WireframeProcurement />
          <WireframeTeam />
          <WireframeBusinessCard />
          <WireframeCareers />
        </div>

      </div>

    </section>
  );
}
