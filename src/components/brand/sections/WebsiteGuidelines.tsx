"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Swords, Compass, Network, Activity, LayoutTemplate, MousePointerClick, BarChart3, Fingerprint, PenTool, Database, Columns3, Server, ShieldCheck, Code, TableProperties, Users, ImageIcon, Smartphone, UserCircle, Download, Mail, Phone, Globe, Rocket, Heart, TrendingUp, Briefcase } from "lucide-react";

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
    <section id="website-guidelines" className="space-y-16 pt-8 scroll-mt-20">
      
      {/* 1. The Header & Strategy */}
      <div className="space-y-4 border-b border-neutral/10 pb-8">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Website Wireframes & BrandScript
        </h2>
        <p className="text-lg text-neutral/80 font-sans max-w-3xl leading-relaxed">
          The Bridge2Partners website operates on a Hub-and-Spoke StoryBrand methodology. Our Hub is Change Management & Digital Transformation. Our Category Entry Point (the burning pain) is M&A integration.
        </p>
      </div>

      {/* 2. The BrandScript Matrix (Focus Index Accordion) */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-bold font-heading text-neutral">The BrandScript Matrix</h3>
        
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-neutral/10 p-2 shadow-sm flex flex-col gap-1 inline-block w-full">
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

      {/* 3. The Layout Blueprints (CSS Wireframes) */}
      <div className="space-y-8 pt-8">
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold font-heading text-neutral flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-primary" strokeWidth={1.5} /> Structural Schematics
          </h3>
          <p className="text-neutral/70 font-sans max-w-2xl">
            Below are functional wireframes outlining the digital structure, referencing our strict UI archetypes. These blueprints guide the engineering phase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Wireframe 1: The Homepage */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 1: The Homepage (Category Entry Point)</h4>
            
            <div className="bg-neutral/5 rounded-lg p-4 space-y-4 font-mono text-[10px] text-neutral/50 uppercase tracking-widest">
              
              {/* Hero Block */}
              <div className="border-dashed border-2 border-white flex flex-col items-center justify-center p-6 rounded bg-black/5 gap-3 transition-colors hover:bg-black/10">
                 <div className="w-3/4 h-6 bg-black/10 rounded" />
                 <div className="w-1/2 h-3 bg-black/10 rounded" />
                 <div className="flex items-center gap-2 mt-2">
                   <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded flex items-center gap-2">
                     <MousePointerClick className="w-3 h-3" /> Primary CTA
                   </div>
                 </div>
              </div>

              {/* Logo Bar */}
              <div className="border-dashed border-2 border-white flex justify-between items-center p-3 rounded bg-black/5">
                 <span className="opacity-50">Logos / Spotlight Deals</span>
                 <div className="flex gap-2">
                   <div className="w-8 h-4 bg-black/10 rounded" />
                   <div className="w-8 h-4 bg-black/10 rounded" />
                   <div className="w-8 h-4 bg-black/10 rounded" />
                 </div>
              </div>

              {/* 2x2 Grid (The 4 Spokes) */}
              <div className="border-dashed border-2 border-white p-4 rounded bg-black/5 space-y-3">
                 <span className="opacity-50 flex items-center gap-1"><Columns3 className="w-3 h-3" /> The 4 Spokes</span>
                 <div className="grid grid-cols-2 gap-3">
                   <div className="h-16 bg-black/5 border border-white rounded flex items-center justify-center"><span className="opacity-50">M&A</span></div>
                   <div className="h-16 bg-black/5 border border-white rounded flex items-center justify-center"><span className="opacity-50">Lending</span></div>
                   <div className="h-16 bg-black/5 border border-white rounded flex items-center justify-center"><span className="opacity-50">Wealth</span></div>
                   <div className="h-16 bg-black/5 border border-white rounded flex items-center justify-center"><span className="opacity-50">Treasury</span></div>
                 </div>
              </div>

              {/* The Guide */}
              <div className="border-dashed border-2 border-white flex items-center p-6 rounded bg-black/5 gap-4">
                 <div className="w-12 h-12 rounded-full bg-black/10 shrink-0 flex items-center justify-center"><Fingerprint className="w-4 h-4 text-black/30" /></div>
                 <div className="space-y-2 w-full">
                   <span className="opacity-50">The Guide: Decades of Executive Experience</span>
                   <div className="w-full h-2 bg-black/10 rounded" />
                   <div className="w-5/6 h-2 bg-black/10 rounded" />
                 </div>
              </div>

              {/* The Stakes */}
              <div className="border-dashed border-2 border-[#dc2626]/30 flex flex-col items-center justify-center p-5 rounded bg-[#dc2626]/5 gap-2">
                 <span className="opacity-60 text-[#dc2626] font-bold flex items-center gap-1.5"><Swords className="w-3 h-3" /> The Stakes: Legacy Tech M&A Failure</span>
                 <div className="w-2/3 h-1.5 bg-[#dc2626]/20 rounded mt-1" />
                 <div className="w-1/2 h-1.5 bg-[#dc2626]/20 rounded" />
              </div>

              {/* Final CTA */}
              <div className="border-dashed border-2 border-primary/30 flex flex-col items-center justify-center p-6 rounded bg-primary/5 gap-3 transition-colors hover:bg-primary/10">
                 <span className="opacity-80 text-primary font-bold">The Final Call To Action</span>
                 <div className="w-3/4 h-2 bg-primary/10 rounded" />
                 <div className="bg-primary text-white border border-primary-dark px-4 py-2 rounded flex items-center gap-2 mt-1 shadow-sm">
                   <MousePointerClick className="w-3 h-3" /> Start Assessment
                 </div>
              </div>

            </div>
          </div>

          <div className="space-y-8 flex flex-col">
            
            {/* Wireframe 2: The Spoke Page */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
              <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 2: The Spoke Page (System 2 Deep Dive)</h4>
              
              <div className="bg-neutral/5 rounded-lg p-4 space-y-4 font-mono text-[10px] text-neutral/50 uppercase tracking-widest">
                
                {/* Left Aligned Hero */}
                <div className="border-dashed border-2 border-white flex flex-col items-start p-6 rounded bg-black/5 gap-2">
                   <span className="opacity-50">Spoke Narrative Hook (H1)</span>
                   <div className="w-2/3 h-5 bg-black/10 rounded" />
                   <div className="w-1/2 h-5 bg-black/10 rounded" />
                </div>

                {/* Sidebar Layout */}
                <div className="flex gap-4">
                  <div className="w-1/3 border-dashed border-2 border-white p-4 rounded bg-black/5 flex flex-col gap-3">
                    <span className="opacity-50 leading-tight">Core Competencies<br/>(Planning, Testing)</span>
                    <div className="w-full h-2 bg-black/10 rounded" />
                    <div className="w-full h-2 bg-black/10 rounded" />
                    <div className="w-full h-2 bg-black/10 rounded" />
                  </div>
                  <div className="w-2/3 border-dashed border-2 border-white p-4 rounded bg-black/5 flex flex-col gap-3">
                    <span className="opacity-50 flex items-center gap-1"><PenTool className="w-3 h-3" /> Deep-Dive Case Study & Data</span>
                    <div className="flex gap-2">
                       <span className="font-data text-secondary text-sm font-bold tracking-widest">34.2%</span>
                       <span className="font-data text-secondary text-sm font-bold tracking-widest">12X ROI</span>
                    </div>
                    <div className="w-full h-1 bg-black/10 rounded mt-2" />
                    <div className="w-full h-1 bg-black/10 rounded" />
                    <div className="w-4/5 h-1 bg-black/10 rounded" />
                  </div>
                </div>

              </div>
            </div>

            {/* Wireframe 3: The Gap Analysis */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex-1 flex flex-col">
              <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 3: The Gap Analysis Tool</h4>
              
              <div className="bg-neutral/5 rounded-lg p-6 space-y-6 font-mono text-[10px] text-neutral/50 uppercase tracking-widest flex flex-col justify-center flex-1 overflow-hidden">
                
                {/* Central Interactive Card */}
                <div className="bg-white/80 shadow-xl border border-black/5 rounded-lg mx-auto w-full max-w-[95%] p-4 space-y-5">
                   <div className="flex items-center justify-between border-b border-black/5 pb-2">
                      <span className="opacity-60 flex items-center gap-1 truncate"><Database className="w-3 h-3 shrink-0" /> Assessment Interface</span>
                      <span className="bg-black/5 px-2 py-0.5 rounded shrink-0 leading-none">Step 2 of 4</span>
                   </div>

                   {/* Sliders/Inputs */}
                   <div className="space-y-4">
                     <div>
                       <span className="opacity-40">Variable Input A</span>
                       <div className="w-full h-1.5 bg-black/10 rounded mt-1 relative">
                          <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white border-2 border-[#98cc67] rounded-full shadow-sm -ml-1.5" />
                          <div className="h-full bg-gradient-to-r from-transparent to-[#98cc67]/30 rounded w-1/3" />
                       </div>
                     </div>
                     <div>
                       <span className="opacity-40">Variable Input B</span>
                       <div className="w-full h-1.5 bg-black/10 rounded mt-1 relative">
                          <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-3 h-3 bg-white border-2 border-[#98cc67] rounded-full shadow-sm -ml-1.5" />
                          <div className="h-full bg-gradient-to-r from-transparent to-[#98cc67]/30 rounded w-2/3" />
                       </div>
                     </div>
                   </div>

                   {/* Results Output Block */}
                   <div className="bg-[#98cc67]/10 border border-[#98cc67]/30 rounded p-4 flex flex-col items-center justify-center gap-1 mt-4 transition-all text-center">
                      <BarChart3 className="w-5 h-5 text-[#98cc67] mb-1" />
                      <span className="text-[#98cc67] font-bold opacity-80">Dynamic Results / ROI Output</span>
                      <span className="font-data text-[#98cc67] font-bold text-lg leading-none">$1.4M Projected</span>
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* --- SECOND TIER SCHEMATICS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* Wireframe 4: The Procurement Vanguard (Technical Deep Dive) */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 4: The Procurement Vanguard</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-[10px] text-neutral/50 uppercase tracking-widest">
              
              {/* Top Block */}
              <div className="border-dashed border-2 border-white flex items-center justify-between p-4 rounded bg-black/5">
                 <span className="opacity-60 flex items-center gap-2"><ShieldCheck className="w-4 h-4 shrink-0" /> Vendor Compliance & Infosec</span>
              </div>

              {/* Middle Grid */}
              <div className="grid grid-cols-3 gap-3">
                 <div className="border-dashed border-2 border-white flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
                    <Server className="w-4 h-4 opacity-40 shrink-0" />
                    <span className="opacity-50">AFS/FIS Integration</span>
                    <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">REST/SOAP</span>
                 </div>
                 <div className="border-dashed border-2 border-white flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
                    <ShieldCheck className="w-4 h-4 opacity-40 shrink-0" />
                    <span className="opacity-50">SOC2/Compliance</span>
                    <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">TYPE II</span>
                 </div>
                 <div className="border-dashed border-2 border-white flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
                    <Code className="w-4 h-4 opacity-40 shrink-0" />
                    <span className="opacity-50">Testing Arch</span>
                    <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">CI/CD</span>
                 </div>
              </div>

              {/* Bottom Block */}
              <div className="border-dashed border-2 border-white flex flex-col p-4 rounded bg-black/5 gap-3">
                 <span className="opacity-60 flex items-center gap-1.5"><TableProperties className="w-3 h-3 shrink-0" /> Tech Stack Compatibility Matrix</span>
                 <div className="space-y-1">
                   <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
                   <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
                   <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
                 </div>
              </div>

            </div>
          </div>

          {/* Wireframe 5: The Institutional Team Page */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex flex-col">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 5: The Institutional Team Page</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-[10px] text-neutral/50 uppercase tracking-widest flex-1 flex flex-col">
              
              <div className="border-dashed border-2 border-white flex items-center justify-center p-4 rounded bg-black/5 shrink-0">
                 <span className="opacity-60 flex items-center gap-2"><Users className="w-4 h-4 shrink-0" /> The Pedigree: Executive Leadership</span>
              </div>

              {/* 3x3 Grid Sim (Row) */}
              <div className="grid grid-cols-3 gap-4 flex-1">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="border-dashed border-2 border-white rounded bg-black/5 flex flex-col p-3 gap-3 h-full">
                      <div className="w-full aspect-square bg-black/10 flex items-center justify-center rounded shrink-0">
                         <div className="flex flex-col items-center gap-1 px-1">
                           <ImageIcon className="w-5 h-5 opacity-30" />
                           <span className="text-[7px] opacity-40 leading-[8px] text-center">Enforce Grayscale Filter</span>
                         </div>
                      </div>
                      <div className="space-y-2 flex flex-col items-center flex-1 justify-end">
                         <div className="w-3/4 h-2 bg-black/20 rounded" />
                         <div className="w-1/2 h-1.5 bg-black/10 rounded" />
                      </div>
                   </div>
                 ))}
              </div>

            </div>
          </div>

          {/* Wireframe 6: The Digital Business Card */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 6: The Digital Business Card (Mobile-First)</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[500px]">
               {/* Mobile Container */}
               <div className="w-full max-w-[260px] h-full max-h-[460px] bg-white shadow-md border border-neutral/10 rounded-[2rem] overflow-hidden flex flex-col font-mono text-[10px] text-neutral/50 uppercase tracking-widest relative pb-6 border-b-[6px] border-neutral/20 border-x-4">
                 
                 {/* Top Banner & Profile */}
                 <div className="h-20 bg-black/5 w-full relative shrink-0">
                    <span className="absolute top-3 left-3 opacity-30 flex items-center gap-1"><Smartphone className="w-3 h-3" /> Mobile</span>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full p-1 shadow-sm">
                       <div className="w-full h-full bg-black/10 rounded-full flex items-center justify-center">
                         <UserCircle className="w-6 h-6 opacity-30" />
                       </div>
                    </div>
                 </div>

                 {/* Identity Block */}
                 <div className="mt-10 flex flex-col items-center px-6 gap-2 shrink-0">
                    <div className="w-2/3 h-3 bg-black/20 rounded shrink-0" />
                    <div className="w-1/2 h-2 bg-black/10 rounded shrink-0" />
                    
                    <div className="flex border border-black/10 bg-black/5 px-4 py-2 mt-2 w-full justify-center items-center gap-2 rounded text-[9px] hover:bg-black/10 transition-colors">
                      <Download className="w-3 h-3" /> Save Contact / VCard
                    </div>
                 </div>

                 {/* Interaction Rail */}
                 <div className="flex justify-center gap-3 mt-4 border-y border-black/5 py-4 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Mail className="w-4 h-4 opacity-50" /></div>
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Phone className="w-4 h-4 opacity-50" /></div>
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Globe className="w-4 h-4 opacity-50" /></div>
                 </div>

                 {/* Footer Menu */}
                 <div className="px-5 space-y-2 mt-4 shrink-0 flex-1 flex flex-col pb-4 h-full overflow-hidden justify-end">
                    <span className="opacity-40 mb-1">4 Core Spokes</span>
                    <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">M&A Integration</span></div>
                    <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">Commercial Lending</span></div>
                    <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">Wealth & Treasury</span></div>
                 </div>

               </div>
            </div>
          </div>

          {/* Wireframe 7: The Talent Engine (Careers) */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex flex-col">
            <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 7: The Talent Engine (Careers)</h4>
            
            <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-[10px] text-neutral/50 uppercase tracking-widest flex-1 flex flex-col">
              
              {/* Top Hero */}
              <div className="border-dashed border-2 border-white flex items-center justify-center p-6 rounded bg-black/5 shrink-0">
                 <span className="opacity-60 flex items-center gap-2 text-[12px]"><Rocket className="w-4 h-4" /> Build the Future of Banking</span>
              </div>

              {/* Middle Block Split */}
              <div className="flex gap-4">
                 <div className="flex-1 border-dashed border-2 border-white rounded bg-black/5 p-4 flex flex-col items-center justify-center text-center gap-2">
                    <Heart className="w-4 h-4 opacity-40 shrink-0" />
                    <span className="opacity-50">Culture & Values</span>
                 </div>
                 <div className="flex-1 border-dashed border-2 border-white rounded bg-black/5 p-4 flex flex-col items-center justify-center text-center gap-2">
                    <TrendingUp className="w-4 h-4 opacity-40 shrink-0" />
                    <span className="opacity-50">Benefits & Growth</span>
                 </div>
              </div>

              {/* Bottom Block (Open Roles) */}
              <div className="border-dashed border-2 border-white p-4 rounded bg-black/5 flex-1 flex flex-col space-y-3 justify-center">
                 <span className="opacity-60 flex items-center gap-1.5 border-b border-black/10 pb-2"><Briefcase className="w-3 h-3" /> Open Roles Array</span>
                 {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between bg-black/5 rounded p-3">
                       <div className="space-y-1.5">
                          <div className="w-24 h-2 bg-black/20 rounded" />
                          <div className="w-16 h-1.5 bg-black/10 rounded" />
                       </div>
                       <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded flex items-center font-sans tracking-normal text-xs font-semibold">
                          Apply
                       </div>
                    </div>
                 ))}
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
