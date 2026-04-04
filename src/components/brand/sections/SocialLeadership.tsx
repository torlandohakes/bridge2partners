"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Mic, Database, Cpu, LayoutTemplate, MessageSquare, CheckCircle2, ArrowRight, ListChecks, FileText, CalendarClock, AlignLeft, ImageIcon, Layers, Users, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      title: "The Dwell Time King",
      body: "In 2026, PDF Carousels are the single highest-performing asset class on LinkedIn. Every swipe is calculated by the algorithm as high-intent engagement, creating massive reach multipliers."
    },
    {
      title: "The 5-7 Slide Rule",
      body: "Under 3 slides fails to trigger the Dwell Time algorithm. Over 8 slides causes a 60% viewer drop-off. Keep it punchy, dense, and exactly 5 to 7 slides long."
    },
    {
      title: "High-Signal Visuals",
      body: "Do not use walls of text. Use our font-display (Montserrat) for massive headers, and font-data (Barlow) for single, high-contrast data points."
    },
    {
      title: "Zero-Click Value",
      body: "Never tease an insight and say 'link in comments.' Deliver the entire framework directly inside these slides to maximize platform retention."
    },
    {
      title: "The Algorithmic CTA",
      body: "The final slide must explicitly direct the executive on what to do next. Route them to our interactive Gap Analysis tool, not a generic contact form."
    }
  ];

  return (
    <section id="social-leadership" className="space-y-16 pt-8 scroll-mt-20">
      
      {/* 1. The Header */}
      <div className="space-y-4 border-b border-neutral/10 pb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Thought Leadership & B2P Intelligence
        </h2>
        <p className="text-lg text-neutral/80 font-sans max-w-3xl leading-relaxed">
          We do not rely on generic marketing copy. Our thought leadership is powered by a proprietary AI pipeline that extracts tacit knowledge from our executive SMEs, vectorizes it, and deploys it via Retrieval-Augmented Generation (RAG) to produce institutional-grade content and interactive lead magnets.
        </p>
      </div>

      {/* 2. The Extraction Engine (Focus Index Accordion) */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-bold font-heading text-neutral">The Extraction Engine</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-neutral/10 p-2 shadow-sm flex flex-col gap-1 inline-block w-full">
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
                      isExpanded ? "bg-primary/10 text-primary" : "bg-neutral/5 text-neutral/50 group-hover:text-neutral/70"
                    )}>
                      <Icon strokeWidth={1.5} className="w-5 h-5 shrink-0" />
                    </div>
                    <span className={cn(
                      "font-ui font-semibold text-lg transition-colors",
                      isExpanded ? "text-primary" : "text-neutral/80 group-hover:text-neutral"
                    )}>
                      {trigger.title}
                    </span>
                  </div>
                  <div className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0">
                    <ChevronDown
                      strokeWidth={1.5}
                      className={cn(
                        "w-5 h-5 text-neutral/40 transition-transform duration-300",
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
                  <div className="p-6 pt-0 lg:pl-[88px] pl-[76px] text-neutral/80 font-sans leading-relaxed text-sm md:text-base border-l-2 border-transparent">
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
          <h3 className="text-2xl font-bold font-heading text-neutral flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-primary" strokeWidth={1.5} /> Tool Schematics
          </h3>
          <p className="text-neutral/70 font-sans max-w-2xl">
            Below are architectural wireframes mapping the interactive deployment end-state for our AI-generated Gap Analysis lead magnet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Wireframe 1: The Discovery Interface */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 1: The Discovery Interface</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[380px]">
               <div className="w-full max-w-[340px] bg-white shadow-md border border-neutral/10 rounded-xl overflow-hidden flex flex-col font-mono text-[10px] text-neutral/50 uppercase tracking-widest relative p-6 space-y-5">
                 
                 <div className="flex items-center gap-2 pb-3 border-b border-black/5">
                    <MessageSquare className="w-4 h-4 shrink-0 text-primary/70" />
                    <span className="font-bold opacity-80 text-primary">AI Gap Analysis Engine</span>
                 </div>

                 {/* Input Block */}
                 <div className="space-y-2">
                    <span className="opacity-40 leading-tight block">User Input: Describe your current operational or integration pain points...</span>
                    <div className="w-full h-24 border-dashed border-2 border-black/10 rounded bg-black/5 flex items-start p-3">
                       <span className="w-16 h-1.5 bg-black/20 rounded inline-block" />
                    </div>
                 </div>

                 {/* Action */}
                 <div className="w-full bg-primary flex items-center justify-center py-3 rounded-md border border-primary-dark shadow-sm text-white font-sans font-bold tracking-normal mt-2 transition-transform hover:-translate-y-0.5">
                    Analyze with B2P Intelligence <ArrowRight className="w-3 h-3 ml-2" />
                 </div>

               </div>
            </div>
          </div>

          {/* Wireframe 2: The RAG Output Report */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 2: The RAG Output Report</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[380px]">
               <div className="w-full bg-white shadow-xl border border-black/5 rounded-xl flex flex-col font-mono text-[10px] text-neutral/50 uppercase tracking-widest relative border-t-[6px] border-t-primary">
                 
                 {/* Header & Lime Badge */}
                 <div className="flex items-center justify-between p-4 border-b border-black/5 bg-black/5">
                    <span className="font-bold">Output Validation</span>
                    <div className="flex items-center gap-1.5 bg-[#001b15] text-[#98cc67] px-2.5 py-1 rounded-full border border-[#98cc67]/30 shadow-[0_0_8px_rgba(152,204,103,0.2)]">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67] animate-pulse" />
                       Processing Complete
                    </div>
                 </div>

                 {/* Body Split */}
                 <div className="flex flex-col sm:flex-row p-4 gap-4 flex-1">
                    {/* Left Column */}
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

                    {/* Right Column */}
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

                 {/* Footer */}
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
        <h3 className="text-2xl font-bold font-heading text-neutral">2026 LinkedIn Distribution Strategy & Visual Standards</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-3 pb-6 border-b border-neutral/10">
            <h4 className="font-ui font-bold text-primary text-xl tracking-tight">The 2026 Playbook: Zero-Click & Dwell Time</h4>
            <p className="font-sans text-neutral/80 leading-relaxed max-w-4xl hover:text-neutral transition-colors">
              Executive buyers ignore fluff. We deploy "Zero-Click Content" (delivering the entire insight in the feed without requiring a click). We optimize for Dwell Time by leveraging deep-dive Carousels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="font-ui font-semibold text-neutral">Team Amplification Rule</span>
              <p className="font-sans text-neutral/70 text-sm leading-relaxed">
                The algorithm penalizes raw reposts. When the team shares B2P content, they must use the "Insight Wrap"—adding a 2-sentence personal perspective above the shared post.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-ui font-semibold text-neutral">Optimal Post Architecture</span>
              <p className="font-sans text-neutral/70 text-sm leading-relaxed">
                While LinkedIn allows up to 3,000 characters, optimal dwell-time completion rates dictate a strict constraint of <strong className="font-bold text-neutral">1,300 - 1,900 characters</strong> per text post.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-ui font-semibold text-neutral">Penalties & Spam Filtering</span>
              <p className="font-sans text-neutral/70 text-sm leading-relaxed">
                Tagging is restricted to <strong className="font-bold text-neutral">3-5 people maximum.</strong> If tagged individuals do not engage in the first hour, the post is penalized. Hashtags are capped at 3-5 relevant tags; engagement-bait (#follow) is strictly forbidden.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-ui font-semibold text-neutral">Visual Guidelines</span>
              <p className="font-sans text-neutral/70 text-sm leading-relaxed">
                No generic stock photos. All human imagery must use our cool-toned/grayscale filter. Data visualizations must utilize our B2P Green and Luminous Lime for high-signal contrast.
              </p>
            </div>
          </div>
        </div>

        {/* 5. The Post Blueprints (CSS Wireframes) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 max-w-5xl">
          
          {/* Wireframe 1: Text/Article Post */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
              <AlignLeft className="w-5 h-5 shrink-0" /> Wireframe 1: Text Post
            </h4>
            
            <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col">
               <div className="border-dashed border-2 border-white bg-black/5 rounded-lg p-6 md:p-8 flex flex-col gap-6 h-full font-sans">
                  <span className="font-bold text-lg border-b border-black/10 pb-3 text-primary flex flex-col gap-1.5">
                     <span>The Pattern Interrupt (Hook)</span>
                     <span className="text-xs text-neutral/80 font-medium normal-case tracking-normal leading-tight">
                        <strong className="text-primary opacity-80">Constraint:</strong> Max <strong className="text-neutral font-bold rounded">140 characters</strong> to beat the "See More" mobile truncation wall.
                     </span>
                     <span className="text-xs text-neutral/80 font-medium normal-case tracking-normal leading-tight">
                        <strong className="text-primary opacity-80">Whitespace Rule:</strong> Maximum 1-2 sentences per paragraph. Strictly 8-12 words per line.
                     </span>
                  </span>
                  
                  <div className="space-y-6 flex-1">
                     <div className="space-y-2">
                        <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">1. The Core Insight</span>
                        <span className="text-sm text-neutral/70 leading-relaxed block">1-2 short sentences maximum. Break the corporate scroll.</span>
                        <div className="pt-3 pb-1 flex flex-col gap-3">
                           <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                           <div className="border-b-2 border-dashed border-neutral/30 w-3/4" />
                        </div>
                     </div>
                     <div className="space-y-2 pt-2">
                        <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral font-data">2. The Data Point</span>
                        <span className="text-sm text-neutral/70 leading-relaxed block">Back up the insight with an exact number. Do not round up.</span>
                        <div className="pt-2 text-secondary font-data text-2xl font-bold tracking-tighter">
                           68.4% Integration Failure Rate
                        </div>
                     </div>
                     <div className="space-y-2 pt-2">
                        <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">3. The Contrarian Take</span>
                        <span className="text-sm text-neutral/70 leading-relaxed block">Deliver the Bridge2Partners pivot. Why is the industry wrong?</span>
                        <div className="pt-3 flex flex-col gap-5">
                           <div className="border-b-2 border-dashed border-neutral/30 w-11/12" />
                           <div className="flex flex-col gap-3">
                              <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                              <div className="border-b-2 border-dashed border-neutral/30 w-1/2" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="border-t border-black/10 pt-5 mt-4 space-y-3">
                     <span className="text-sm font-bold text-neutral uppercase tracking-widest opacity-80">Simulated Comment Section</span>
                     <div className="bg-white/50 p-4 border border-black/5 rounded-md text-sm leading-relaxed text-neutral shadow-sm flex flex-col sm:flex-row gap-2 sm:items-start">
                        <strong className="bg-[#dc2626]/10 text-[#dc2626] border border-[#dc2626]/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shrink-0 sm:mt-0.5 shadow-sm">Algorithm Rule</strong>
                        <span>Links in the main body trigger severe reach penalties. Links must be placed in the first comment with heavy contextual phrasing, or repurposed into native Carousels.</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Wireframe 2: Single Image / Stat Card */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
              <ImageIcon className="w-5 h-5 shrink-0" /> Wireframe 2: Stat Card
            </h4>
            
            <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col">
               <div className="border-dashed border-2 border-white bg-black/5 rounded-lg p-6 md:p-8 flex flex-col gap-6 h-full font-sans">
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">1. The Narrative Hook</span>
                        <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                           <strong className="text-primary opacity-80">Context Rule:</strong> Set up the exact data variable in 1 line. E.g. "M&A valuations drop rapidly during integration friction."
                        </span>
                        <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                           <strong className="text-primary opacity-80">OCR Synergy Rule:</strong> LinkedIn's AI reads image text. The text inside the graphic MUST share exact keywords with the post's body copy to trigger the relevance multiplier.
                        </span>
                        <div className="pt-3 pb-1">
                           <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                        </div>
                     </div>
                  </div>
                  
                  {/* Media Block Simulation */}
                  <div className="w-full flex-1 bg-[#0a110f] border border-black/10 rounded-xl relative flex flex-col items-center justify-center p-8 mt-1 shadow-inner overflow-hidden">
                      {/* Ambient Light Rings */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#98cc67]/10 rounded-full blur-3xl" />

                      {/* Exact Visual Directive */}
                      <div className="relative z-10 text-xs text-white/80 font-medium text-center leading-relaxed">
                         <strong className="text-white">Visual Rule:</strong> Eliminate complex charts. Emphasize one massive data point inside a glassmorphic container over a cool-toned background.
                      </div>
                      
                      {/* Glass Component Simulation */}
                      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 mt-6 flex flex-col items-center gap-1 relative z-20">
                         <span className="font-ui text-white/80 text-[10px] tracking-widest uppercase font-bold text-center">Integration Speed</span>
                         <span className="text-[#98cc67] font-data text-5xl font-bold tracking-tighter drop-shadow-[0_0_12px_rgba(152,204,103,0.3)]">4.2x</span>
                      </div>
                  </div>

                  {/* Alt-Text Rule (Evicted from dark block) */}
                  <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-md text-xs font-bold text-center leading-snug shadow-sm">
                     ALGORITHM RULE: Images without custom Alt-Text are actively penalized. You must write descriptive Alt-Text.
                  </div>

                  <div className="border-t border-black/10 pt-5 mt-4 space-y-3">
                     <span className="text-sm font-bold text-neutral uppercase tracking-widest opacity-80">2. The Comment CTA</span>
                     <div className="bg-white/50 p-4 border border-black/5 rounded-md text-sm leading-relaxed text-neutral shadow-sm space-y-3">
                        <span className="block">
                           <strong className="text-[#dc2626] bg-[#dc2626]/5 px-2 py-0.5 rounded mr-1">Spam Trap:</strong> Generic questions ('Thoughts?') are flagged as engagement bait. Demand a highly specific, technical perspective.
                        </span>
                        <div className="border-l-2 border-primary/40 pl-3 py-2 italic text-neutral/70 font-medium bg-neutral/5 rounded-r">
                           "Where does your legacy tech stack break down during the initial 90-day PMI window?"
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Wireframe 3: The Relational Anchor */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
              <Users className="w-5 h-5 shrink-0" /> Wireframe 3: The Relational Anchor
            </h4>
            
            <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col">
               <div className="border-dashed border-2 border-white bg-black/5 rounded-lg p-6 md:p-8 flex flex-col gap-6 h-full font-sans">
                  <div className="space-y-2">
                     <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">1. The Anti-Corporate Hook</span>
                     <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                        <strong className="text-primary opacity-80">Context Rule:</strong> Banish "We are thrilled to announce..." Start with a candid observation, an inside joke, or a real human moment.
                     </span>
                     <div className="pt-3 pb-1 flex flex-col gap-3">
                        <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                        <div className="border-b-2 border-dashed border-neutral/30 w-3/4" />
                     </div>
                  </div>
                  
                  {/* Media Block Simulation */}
                  <div className="w-full h-64 bg-neutral/10 border border-black/10 rounded-xl relative flex flex-col items-center justify-center p-6 mt-1 shadow-inner overflow-hidden">
                      {/* Organic visual placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#98cc67]/5 to-primary/5" />
                      
                      {/* Abstract People Illustration */}
                      <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-4 sm:gap-6 opacity-30 pointer-events-none mix-blend-multiply">
                         <div className="flex flex-col items-center translate-y-4 scale-90">
                            <div className="w-14 h-14 rounded-full bg-primary" />
                            <div className="w-24 h-28 rounded-t-[3rem] bg-primary mt-2" />
                         </div>
                         <div className="flex flex-col items-center -translate-y-2 relative z-10">
                            <div className="w-16 h-16 rounded-full bg-neutral" />
                            <div className="w-28 h-32 rounded-t-[3rem] bg-neutral mt-2" />
                         </div>
                         <div className="flex flex-col items-center translate-y-6 scale-75">
                            <div className="w-14 h-14 rounded-full bg-[#98cc67]" />
                            <div className="w-24 h-24 rounded-t-[3rem] bg-[#98cc67] mt-2" />
                         </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-center gap-4 text-center mt-auto pb-2">
                         <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-sm border border-neutral/10">
                            <span className="text-[10px] sm:text-xs font-bold text-neutral/80 uppercase tracking-widest">Visual: Organic Team Photo</span>
                         </div>
                         
                         <div className="bg-yellow-100/90 text-yellow-800 border border-yellow-500/30 px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md backdrop-blur-md max-w-[95%]">
                            BRAND RULE: Apply a subtle 10% cool-tone to the photo. It must look organic, but still belong in our color universe.
                         </div>
                      </div>
                  </div>

                  {/* Red Algorithmic Badge */}
                  <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-md text-xs font-bold text-center leading-snug shadow-sm">
                     ALGORITHM RULE: The AI explicitly detects faces. Photos with 2+ unpolished human faces get a 3x reach multiplier. DO NOT USE STOCK IMAGERY.
                  </div>

                  <div className="border-t border-black/10 pt-5 mt-4 space-y-3">
                     <span className="text-sm font-bold text-neutral uppercase tracking-widest opacity-80">2. The Tagging Strategy</span>
                     <div className="bg-white/50 p-4 border border-black/5 rounded-md text-sm leading-relaxed text-neutral shadow-sm space-y-3">
                        <span className="block">
                           <strong className="text-[#dc2626] bg-[#dc2626]/5 px-2 py-0.5 rounded mr-1">Spam Trap:</strong> Never mass-tag the entire company.
                        </span>
                        <div className="border-l-2 border-primary/40 pl-3 py-2 text-neutral/70 font-medium">
                           Strictly limit tags to <strong className="font-bold text-neutral">3-5 people pictured.</strong> If tagged individuals do not comment in the first "Golden Hour," the algorithm severely penalizes the post reach.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Wireframe 4: The Deep-Dive Carousel (Interactive) */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
              <Layers className="w-5 h-5 shrink-0" /> Wireframe 4: Deep-Dive Carousel (Interactive)
            </h4>
            
            <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col justify-center border-dashed border-2 border-white shadow-inner">
               
               {/* The Carousel Stage */}
               <div className="bg-[#0a110f] min-h-[280px] relative rounded-xl border border-black/10 shadow-lg flex flex-col items-center justify-center p-8 overflow-hidden group">
                  {/* Ambient Light */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#98cc67]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Navigation Left */}
                  <button 
                     onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                     disabled={currentSlide === 0}
                     className="absolute left-4 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98cc67] shadow-lg"
                     aria-label="Previous Slide"
                  >
                     <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                  </button>

                  {/* Slide Content */}
                  <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xs transition-all duration-300">
                     <h5 className="font-display text-[#98cc67] text-xl md:text-2xl font-bold tracking-tight drop-shadow-md">
                        {carouselSlides[currentSlide].title}
                     </h5>
                     <p className="font-sans text-neutral-200 leading-relaxed text-sm">
                        {carouselSlides[currentSlide].body}
                     </p>
                  </div>

                  {/* Navigation Right */}
                  <button 
                     onClick={() => setCurrentSlide(prev => Math.min(carouselSlides.length - 1, prev + 1))}
                     disabled={currentSlide === carouselSlides.length - 1}
                     className="absolute right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98cc67] shadow-lg"
                     aria-label="Next Slide"
                  >
                     <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-6 flex items-center gap-2 z-20">
                     {carouselSlides.map((_, idx) => (
                        <div 
                           key={idx} 
                           className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              idx === currentSlide ? "bg-[#98cc67] w-6 shadow-[0_0_8px_rgba(152,204,103,0.8)]" : "bg-white/30 w-1.5"
                           )}
                        />
                     ))}
                  </div>

               </div>
               
               <div className="text-center mt-6 text-sm text-neutral/70 font-medium">
                  Interactive Preview: Click to cycle through 2026 Algorithmic Frameworks.
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
