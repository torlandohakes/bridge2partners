"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Mic, Database, Cpu, LayoutTemplate, MessageSquare, ArrowRight, ListChecks, FileText, CalendarClock } from "lucide-react";

import { WireframeTextPost } from "./social/WireframeTextPost";
import { WireframeStatCard } from "./social/WireframeStatCard";
import { WireframeRelationalAnchor } from "./social/WireframeRelationalAnchor";
import { WireframeCarousel } from "./social/WireframeCarousel";

const extractionTriggers = [
  {
    id: "ingestion",
    title: "Step 1: The AI Interviewer (Ingestion)",
    icon: Mic,
    detail: "SMEs interact with a custom chat/audio interface. An AI agent poses highly specific, strategic questions. SMEs respond via voice recording or text, removing the friction of blank-page writing."
  },
  {
    id: "storage",
    title: "Step 2: The Vector Brain (Storage)",
    icon: Database,
    detail: "Audio is transcribed and all raw SME intelligence is embedded and stored in a secure vector database. This becomes the firm's centralized, queryable intellectual property."
  },
  {
    id: "deployment",
    title: "Step 3: RAG Outputs (Deployment)",
    icon: Cpu,
    detail: "We utilize RAG to query the vector database, transforming raw SME insights into high-fidelity LinkedIn posts, long-form articles, and dynamic Gap Analysis reports."
  }
];

export function SocialLeadership() {
  const [expandedTrigger, setExpandedTrigger] = useState<string | null>("ingestion");

  return (
    <section id="social-leadership" className="w-full space-y-16 animate-in fade-in duration-500">
      
      {/* 1. The Header */}
      <div className="space-y-4 border-b border-primary/10 pb-8">
        <h2 className="text-3xl font-semibold tracking-tighter text-primary font-heading">
          Thought Leadership & B2P Intelligence
        </h2>
        <p className="text-lg text-muted-foreground font-sans max-w-3xl leading-relaxed">
          We do not rely on generic marketing copy. Our thought leadership is powered by a proprietary AI pipeline that extracts tacit knowledge from our executive SMEs, vectorizes it, and deploys it via Retrieval-Augmented Generation (RAG) to produce institutional-grade content and interactive lead magnets.
        </p>
      </div>

      {/* 2. The Extraction Engine (Focus Index Accordion) */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-semibold font-heading text-foreground">The Extraction Engine</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-primary/10 p-2 shadow-sm flex flex-col gap-1 inline-block w-full">
          {extractionTriggers.map((trigger) => {
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

      {/* 3. The Blueprint: Gap Analysis Lead Magnet (CSS Wireframes) */}
      <div className="space-y-8 pt-8">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-primary" strokeWidth={1.5} /> Tool Schematics
          </h3>
          <p className="text-muted-foreground font-sans max-w-2xl">
            Below are architectural wireframes mapping the interactive deployment end-state for our AI-generated Gap Analysis lead magnet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Wireframe 1: The Discovery Interface */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-primary/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-semibold text-primary tracking-tight pb-2 border-b border-primary/10">Wireframe 1: The Discovery Interface</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[380px]">
               <div className="w-full max-w-[340px] bg-white shadow-md border border-primary/10 rounded-xl overflow-hidden flex flex-col font-mono text-[10px] text-muted-foreground uppercase tracking-widest relative p-6 space-y-5">
                 <div className="flex items-center gap-2 pb-3 border-b border-black/5">
                    <MessageSquare className="w-4 h-4 shrink-0 text-primary/70" />
                    <span className="font-bold opacity-80 text-primary">AI Gap Analysis Engine</span>
                 </div>
                 <div className="space-y-2">
                    <span className="opacity-40 leading-tight block">User Input: Describe your current operational or integration pain points...</span>
                    <div className="w-full h-24 border-dashed border-2 border-black/10 rounded bg-black/5 flex items-start p-3">
                       <span className="w-16 h-1.5 bg-black/20 rounded inline-block" />
                    </div>
                 </div>
                 <div className="w-full bg-primary flex items-center justify-center py-3 rounded-md border border-primary-dark shadow-sm text-white font-sans font-bold tracking-normal mt-2 transition-transform hover:-translate-y-0.5">
                    Analyze with B2P Intelligence <ArrowRight className="w-3 h-3 ml-2" />
                 </div>
               </div>
            </div>
          </div>

          {/* Wireframe 2: The RAG Output Report */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-primary/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-semibold text-primary tracking-tight pb-2 border-b border-primary/10">Wireframe 2: The RAG Output Report</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[380px]">
               <div className="w-full bg-white shadow-xl border border-black/5 rounded-xl flex flex-col font-mono text-[10px] text-muted-foreground uppercase tracking-widest relative">
                 <div className="flex items-center justify-between p-4 border-b border-black/5 bg-black/5">
                    <span className="font-bold">Output Validation</span>
                    <div className="flex items-center gap-1.5 bg-[#001b15] text-[#98cc67] px-2.5 py-1 rounded-full border border-[#98cc67]/30 shadow-[0_0_8px_rgba(152,204,103,0.2)]">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] animate-pulse" />
                       Processing Complete
                    </div>
                 </div>
                 <div className="flex flex-col sm:flex-row p-4 gap-4 flex-1">
                    <div className="w-full sm:w-1/2 space-y-3">
                       <span className="opacity-60 flex items-center gap-1 text-[9px]"><ListChecks className="w-3 h-3" /> Identified Vulnerabilities</span>
                       <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="border-dashed border-2 border-black/10 bg-black/5 p-2 rounded flex gap-2 items-center">
                               <div className="w-2 h-2 rounded bg-[#dc2626]/40 shrink-0" />
                               <div className="w-full h-1.5 bg-black/10 rounded" />
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="w-full sm:w-1/2 space-y-3">
                       <span className="opacity-60 flex items-center gap-1 text-[9px]"><FileText className="w-3 h-3" /> SME-Backed Recommendations</span>
                       <div className="border-dashed border-2 border-black/10 bg-black/5 p-3 rounded space-y-1.5 h-full">
                          <div className="w-full h-1.5 bg-black/10 rounded" />
                          <div className="w-full h-1.5 bg-black/10 rounded" />
                          <div className="w-5/6 h-1.5 bg-black/10 rounded" />
                          <div className="w-[40%] h-1.5 bg-black/10 rounded mt-3" />
                       </div>
                    </div>
                 </div>
                 <div className="p-4 border-t border-black/5 bg-black-[0.02]">
                    <div className="w-full bg-secondary flex items-center justify-center py-3 rounded-md text-white font-sans font-bold tracking-normal shadow-sm transition-transform hover:-translate-y-0.5 mt-2">
                       <CalendarClock className="w-4 h-4 mr-2" /> Schedule Implementation Call
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The 2026 Algorithmic Strategy */}
      <div className="space-y-8 pt-8">
        <h3 className="text-2xl font-bold font-heading text-foreground">2026 LinkedIn Distribution Strategy & Visual Standards</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-primary/10 p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-3 pb-6 border-b border-primary/10">
            <h4 className="font-ui font-semibold text-primary text-xl tracking-tight">The 2026 Playbook: Zero-Click & Dwell Time</h4>
            <p className="font-sans text-muted-foreground leading-relaxed max-w-4xl hover:text-foreground transition-colors">
              Executive buyers ignore fluff. We deploy "Zero-Click Content" (delivering the entire insight in the feed without requiring a click). We optimize for Dwell Time by leveraging deep-dive Carousels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/40 border border-white/60 p-5 rounded-xl h-full flex flex-col space-y-2 shadow-sm">
              <span className="font-ui font-semibold text-foreground-900">The Native Distribution Pipeline (No Reposts)</span>
              <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                Never ask the team to "repost" from the Bridge2Partners company page. Reposts suffer a massive algorithmic reach penalty. Instead, marketing will provide the team with the raw assets (PDFs, images) and text frameworks. The team must upload and publish these assets natively directly to their own feeds. A native personal post generates up to 10x the reach of a company page repost.
              </p>
            </div>
            <div className="bg-white/40 border border-white/60 p-5 rounded-xl h-full flex flex-col space-y-3 shadow-sm">
              <span className="font-ui font-semibold text-foreground-900">Optimal Post Architecture</span>
              <div className="space-y-4 flex-1">
                <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                  Feed Posts: Maintain a strict <span className="font-data text-primary font-bold px-1.5 py-0.5 bg-[#98cc67]/20 rounded shadow-sm text-sm">1,300 - 1,900 characters</span> constraint for optimal dwell-time.
                </p>
                <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                  Articles: Target <span className="font-data font-extrabold text-foreground-900">800 - 1,200 words</span>. Shorter pieces face suppression and must be natively reformatted.
                </p>
                <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                  Comments: Generic replies are penalized. Trigger engagement multipliers by exceeding <span className="font-data font-extrabold text-foreground-900">12 words</span> with a <span className="font-data font-extrabold text-foreground-900">2-sentence minimum</span>.
                </p>
              </div>
            </div>
            <div className="bg-white/40 border border-white/60 p-5 rounded-xl h-full flex flex-col space-y-2 shadow-sm">
              <span className="font-ui font-semibold text-foreground-900">Penalties & Spam Filtering</span>
              <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                Tagging is restricted to <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold uppercase">3-5 people maximum</span>. If tagged individuals do not engage in the first hour, the post is penalized. Hashtags are capped at 3-5 relevant tags; engagement-bait (#follow) is <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-xs font-bold uppercase">strictly forbidden</span>.
              </p>
            </div>
            <div className="bg-white/40 border border-white/60 p-5 rounded-xl h-full flex flex-col space-y-2 shadow-sm">
              <span className="font-ui font-semibold text-foreground-900">Visual Guidelines</span>
              <p className="font-sans text-foreground-700 text-sm leading-relaxed">
                No generic stock photos. All human imagery must use our cool-toned/grayscale filter. Data visualizations must utilize our B2P Green and Luminous Lime for high-signal contrast.
              </p>
            </div>
          </div>
        </div>

        {/* 5. The Post Blueprints (Imported) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4 w-full">
          <WireframeTextPost />
          <WireframeStatCard />
          <WireframeRelationalAnchor />
          <WireframeCarousel />
        </div>
      </div>
    </section>
  );
}
