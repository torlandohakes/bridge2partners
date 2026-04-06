"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, Calendar, Users, Target, CheckCircle2, QrCode, Mail, Video, LayoutTemplate, Coffee, ArrowRight, Send, Briefcase, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------
// VISUAL WIREFRAME COMPONENTS
// -------------------------------------------------------------

// TRADESHOWS
function TradeshowPreWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      {/* 1. Relationship Mapping Table */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
        <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-neutral-50/50">
           <span>Relationship Mapping Table</span>
           <span className="text-[10px] font-bold bg-[#009677]/10 text-[#009677] px-3 py-1 rounded shadow-sm uppercase">Live Data Tracker</span>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[700px]">
            <thead className="bg-neutral-50/80 border-b border-primary/10 text-xs text-muted-foreground uppercase tracking-widest">
              <tr>
                <th className="p-5 font-semibold border-r border-black/5">Target Account</th>
                <th className="p-5 font-semibold border-r border-black/5">Key Attendee & Title</th>
                <th className="p-5 font-semibold border-r border-black/5">Internal Connection</th>
                <th className="p-5 font-semibold border-r border-black/5">Connection Degree</th>
                <th className="p-5 font-semibold">Action Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-5 font-bold text-foreground border-r border-black/5">GlobalFin</td>
                <td className="p-5 text-muted-foreground border-r border-black/5"><span className="text-foreground font-medium">Marcus Davis</span>, VP Architecture</td>
                <td className="p-5 text-foreground border-r border-black/5 font-medium">Michael Cordas (CEO)</td>
                <td className="p-5 border-r border-black/5"><span className="bg-[#009677]/10 text-[#009677] px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><Users className="w-3.5 h-3.5"/> 1st Degree</span></td>
                <td className="p-5 text-muted-foreground"><span className="border-b border-primary/30 pb-0.5 text-primary font-medium cursor-pointer">Warm Intro Request</span></td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-5 font-bold text-foreground border-r border-black/5">Acme Bank</td>
                <td className="p-5 text-muted-foreground border-r border-black/5"><span className="text-foreground font-medium">V. Chen</span>, Chief Information Officer</td>
                <td className="p-5 text-foreground border-r border-black/5 font-medium">Linda Weber (Mng Dir)</td>
                <td className="p-5 border-r border-black/5"><span className="bg-primary/10 text-primary px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><Users className="w-3.5 h-3.5"/> 2nd Degree</span></td>
                <td className="p-5 text-muted-foreground"><span className="border-b border-primary/30 pb-0.5 text-primary font-medium cursor-pointer">DM via Mutual Channel</span></td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-5 font-bold text-foreground border-r border-black/5">Apex Capital</td>
                <td className="p-5 text-muted-foreground border-r border-black/5"><span className="text-foreground font-medium">J. Reynolds</span>, Head of Tech</td>
                <td className="p-5 text-muted-foreground opacity-50 border-r border-black/5">—</td>
                <td className="p-5 border-r border-black/5"><span className="bg-neutral-100 text-muted-foreground px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><Mail className="w-3.5 h-3.5"/> Cold</span></td>
                <td className="p-5 text-muted-foreground"><span className="border-b border-primary/30 pb-0.5 text-primary font-medium cursor-pointer">Targeted Event Drop</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. 1:1 Networking Outreach Wireframe */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm p-5 font-sans">
        <div className="font-bold text-primary border-b border-primary/10 pb-4 mb-5 uppercase tracking-widest text-xs flex items-center justify-between">
           <span>1:1 Networking Outreach Protocol</span>
           <span className="text-[10px] font-bold bg-[#009677]/10 text-[#009677] px-3 py-1 rounded uppercase shadow-sm">Direct Message</span>
        </div>
        <div className="bg-neutral-50/50 border border-neutral-200 rounded-lg overflow-hidden flex flex-col shadow-inner">
           <div className="bg-neutral-100/80 border-b border-neutral-200 p-4 text-sm flex gap-4 items-center">
              <span className="text-muted-foreground font-medium text-right pr-2">To:</span> 
              <span className="font-bold text-foreground block truncate">Marcus Davis (VP Architecture, GlobalFin)</span>
           </div>
           <div className="bg-neutral-100/80 border-b border-neutral-200 p-4 text-sm flex gap-4 items-center">
              <span className="text-muted-foreground font-medium text-right pr-2">Subj:</span> 
              <span className="font-bold text-foreground">Vegas 1:1 / Architectural Transition</span>
           </div>
           <div className="p-6 text-sm space-y-5 leading-relaxed text-foreground bg-white">
              <p>Hi Marcus,</p>
              <p>Our CEO, Michael Cordas, mentioned that you're charting out the next phase of the core systems at GlobalFin. <span className="bg-[#009677]/10 text-[#009677] px-2 py-0.5 rounded inline-block font-mono text-[10px] uppercase font-bold ml-1 align-middle shadow-sm">[Reference Shared Internal Connection]</span></p>
              <p>Since we just successfully unwound a similar legacy stack matrix over at Visa, it would be highly valuable to compare notes while we're both in Vegas next week. <span className="bg-[#009677]/10 text-[#009677] px-2 py-0.5 rounded inline-block font-mono text-[10px] uppercase font-bold ml-1 align-middle shadow-sm">[Acknowledge Specific Banking Transition]</span></p>
              <p>Are you open to carving out 15 minutes for a quick coffee sync near the Aria? No pitches, strictly a 1:1 architectural exchange. <span className="bg-[#009677]/10 text-[#009677] px-2 py-0.5 rounded inline-block font-mono text-[10px] uppercase font-bold ml-1 align-middle shadow-sm">[Soft CTA for Coffee/1:1]</span></p>
              <p className="text-muted-foreground pt-4">Best,<br/><span className="font-semibold text-foreground">Linda Weber</span><br/>Managing Director</p>
           </div>
           <div className="bg-neutral-50/80 border-t border-neutral-200 p-4 flex justify-end">
              <div className="bg-primary text-white text-sm px-6 py-2.5 rounded-md text-center cursor-pointer font-bold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"><Send className="w-4 h-4"/> Send Outreach</div>
           </div>
        </div>
      </div>


    </div>
  );
}

function TradeshowLiveWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      {/* 1. The Disqualification Script Card */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
        <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-neutral-50/50">
           <span>The Disqualification Script</span>
           <span className="text-[10px] font-bold bg-[#009677]/10 text-[#009677] px-3 py-1 rounded shadow-sm uppercase">Rapid Filtration</span>
        </div>
        <div className="p-8 space-y-8">
           <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shadow-sm border border-primary/20">1</div>
              </div>
              <div className="flex-1">
                 <div className="text-xl md:text-2xl font-serif text-foreground font-medium italic leading-relaxed">
                   "Are you currently evaluating modernization for your core banking platform, or focused on edge solutions?"
                 </div>
              </div>
           </div>
           
           <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shadow-sm border border-primary/20">2</div>
              </div>
              <div className="flex-1">
                 <div className="text-xl md:text-2xl font-serif text-foreground font-medium italic leading-relaxed">
                   "Who is driving the architectural mandate internally?"
                 </div>
              </div>
           </div>

           <div className="flex gap-5">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shadow-sm border border-primary/20">3</div>
              </div>
              <div className="flex-1">
                 <div className="text-xl md:text-2xl font-serif text-foreground font-medium italic leading-relaxed">
                   "Is budget allocated for a migration this fiscal year?"
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Mobile CRM Capture UI */}
      <div className="w-full bg-neutral-100/50 rounded-xl border border-black/5 shadow-sm p-8 font-sans flex flex-col items-center relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="font-bold text-primary pb-6 uppercase tracking-widest text-xs z-10 self-start">Mobile CRM Sync Spec</div>

        {/* Mobile Phone shape */}
        <div className="w-[340px] bg-white rounded-[3rem] border-[8px] border-neutral-900 shadow-2xl relative overflow-hidden flex flex-col h-[680px] z-10 shrink-0">
           {/* Notch/Top bar */}
           <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
              <div className="w-32 h-7 bg-neutral-900 rounded-b-2xl" />
           </div>
           
           {/* Header */}
           <div className="bg-primary pt-12 pb-5 px-6 text-white flex justify-between items-center shadow-sm relative z-10">
              <span className="font-semibold tracking-tight text-lg">Capture Lead</span>
              <span className="text-[10px] uppercase tracking-widest font-bold bg-white/20 px-2.5 py-1 rounded">Live Sync</span>
           </div>

           {/* Viewfinder (Top) */}
           <div className="w-full aspect-square bg-neutral-950 relative flex items-center justify-center overflow-hidden">
              <div className="w-[70%] h-[70%] border-2 border-[#009677] border-dashed rounded-lg flex flex-col items-center justify-center text-[#009677] relative z-10 shadow-[0_0_15px_rgba(0,150,119,0.15)]">
                 <QrCode className="w-14 h-14 mb-3 opacity-90" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Scanning Badge...</span>
              </div>
              {/* Scan Line Animation (Static CSS representation) */}
              <div className="absolute top-[45%] left-0 right-0 h-[3px] bg-[#009677] shadow-[0_0_12px_rgba(0,150,119,1)]" />
           </div>

           {/* Form Content */}
           <div className="p-6 flex-1 flex flex-col bg-neutral-50/80">
              <div className="mb-5">
                 <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Lead Status</label>
                 <div className="w-full bg-white border border-neutral-200 rounded-lg p-3.5 flex justify-between items-center shadow-sm cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-3.5 h-3.5 rounded-full bg-[#009677] shadow-sm" />
                       <span className="font-semibold text-foreground text-sm">Hot (ICP Fit)</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
                 </div>
              </div>

              <div className="mb-auto">
                 <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Contextual Notes</label>
                 <div className="w-full h-28 bg-white border border-neutral-200 rounded-lg p-3.5 shadow-inner relative flex flex-col">
                    <p className="text-sm text-foreground/80 leading-relaxed font-serif italic mb-2 opacity-90">"VP at GlobalFin. Migrating off legacy mainframe next Q3. Exploring our architectural overlay. Needs intro to our CEO..."</p>
                    <div className="mt-auto self-end w-9 h-9 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shadow-sm">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                    </div>
                 </div>
              </div>

              <div className="w-full bg-primary text-white py-4 rounded-xl text-center font-bold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] flex items-center justify-center gap-2 mt-6 active:scale-[0.98] transition-transform cursor-pointer">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                 Save & Sync to Salesforce
              </div>
           </div>
           
           {/* Bottom Phone Bar */}
           <div className="bg-neutral-50/80 h-7 flex justify-center py-2.5 absolute bottom-0 inset-x-0 pointer-events-none">
              <div className="w-[35%] h-[5px] bg-black/20 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
}

function TradeshowPostWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: ROI & Pipeline Attribution Dashboard */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
         <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-neutral-50/50">
           <span>Pipeline Attribution Dashboard</span>
           <span className="text-[10px] font-bold bg-[#009677]/10 text-[#009677] px-3 py-1 rounded shadow-sm uppercase tracking-widest">SaaS Reporting</span>
        </div>
        <div className="p-8 flex flex-col gap-6">
           {/* Metric 1 */}
           <div className="w-full border border-neutral-200 rounded-lg p-5 flex flex-col group hover:border-primary/30 transition-colors bg-white shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Net-New Pipeline Generated</span>
              <span className="text-3xl font-display font-medium text-foreground tracking-tight mb-4">$2.4M</span>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                 <div className="w-[75%] h-full bg-[#009677] rounded-full" />
              </div>
              <span className="text-[10px] text-muted-foreground mt-2 inline-block font-medium">75% to Target Goal</span>
           </div>

           {/* Metric 2 */}
           <div className="w-full border border-neutral-200 rounded-lg p-5 flex flex-col group hover:border-primary/30 transition-colors bg-white shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Meetings Booked (C-Suite)</span>
              <span className="text-3xl font-display font-medium text-foreground tracking-tight mb-3">14</span>
              <div className="flex items-center gap-2">
                 <div className="bg-[#009677]/10 text-[#009677] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">+3 from previous event</div>
              </div>
           </div>

           {/* Metric 3 */}
           <div className="w-full border border-neutral-200 rounded-lg p-5 flex flex-col group hover:border-primary/30 transition-colors bg-white shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Cost Per Acquisition (CPA)</span>
              <span className="text-3xl font-display font-medium text-foreground tracking-tight mb-3">$4,200</span>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                 <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                 </div>
                 Optimal financial efficiency
              </div>
           </div>
        </div>
      </div>

      {/* Wireframe B: Multi-Touch Sequence Flowchart */}
      <div className="w-full bg-neutral-50/50 rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
        <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-white">
           <span>Multi-Touch Outreach Sequence</span>
           <span className="text-[10px] font-bold bg-neutral-100 border border-neutral-200 text-muted-foreground px-3 py-1 rounded shadow-sm uppercase tracking-widest">14-Day Cadence</span>
        </div>
        <div className="p-8 pt-10">
           <div className="relative pl-8 space-y-10 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-neutral-200">
              
              {/* Touchpoint 1 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                 </div>
                 <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm relative group hover:border-primary/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 block flex items-center gap-2">Day 1</span>
                    <strong className="text-base text-foreground block mb-2 font-serif italic">Direct Exec Email (Contextual Anchor)</strong>
                    <span className="text-sm text-muted-foreground font-medium block leading-relaxed">Deliver a specific strategic asset (whitepaper/case study) mapping directly to the architectural pain point discussed in the Annex. Absolutely no pitching.</span>
                 </div>
              </div>

              {/* Touchpoint 2 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-white border-2 border-[#0A66C2] flex items-center justify-center shadow-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A66C2]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                 </div>
                 <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm relative group hover:border-[#0A66C2]/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#0A66C2] mb-1.5 block flex items-center gap-2">Day 3</span>
                    <strong className="text-base text-foreground block mb-2 font-serif italic">LinkedIn Connection (No Pitch)</strong>
                    <span className="text-sm text-muted-foreground font-medium block leading-relaxed">Executive peer-to-peer connection request. Reference the specific in-person Vegas interaction to establish digital proximity and trusted advisor status.</span>
                 </div>
              </div>

              {/* Touchpoint 3 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center shadow-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                 </div>
                 <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm relative group hover:border-primary/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1.5 block flex items-center gap-2">Day 7</span>
                    <strong className="text-base text-foreground block mb-2 font-serif italic">Soft Outreach to VPs of Engineering (Multi-Threading)</strong>
                    <span className="text-sm text-muted-foreground font-medium block leading-relaxed">Expand organizational footprint. Execute multi-threading matrix by asking the initial CIO/VP connection to bridge an intro downwards to technical stakeholders.</span>
                 </div>
              </div>

           </div>
        </div>
      </div>
      
    </div>
  );
}

// PEERS IN PRACTICE
function RoundtablePreWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: Curated Invitation Matrix */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
        <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-neutral-50/50">
           <span>Curated Invitation Matrix</span>
           <span className="text-[10px] font-bold bg-[#009677]/10 text-[#009677] px-3 py-1 rounded shadow-sm uppercase tracking-widest">SaaS Data Grid</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50/50 border-b border-neutral-200 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              <tr>
                <th className="p-5 font-semibold">Target Executive</th>
                <th className="p-5 font-semibold">Current Pipeline Stage</th>
                <th className="p-5 font-semibold">Peer Match (Host)</th>
                <th className="p-5 font-semibold">Bespoke Invitation Angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-5 flex items-center gap-3 text-foreground font-medium"><span className="font-bold text-black border-r border-black/10 pr-3">Acme Bank</span>CIO</td>
                <td className="p-5"><span className="bg-primary/10 text-primary px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest">In Negotiation</span></td>
                <td className="p-5 text-foreground font-medium">Michael Cordas (CEO)</td>
                <td className="p-5 text-muted-foreground italic font-serif">"Given our discussion on legacy data siloes..."</td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-5 flex items-center gap-3 text-foreground font-medium"><span className="font-bold text-black border-r border-black/10 pr-3">GlobalFin</span>VP Digital</td>
                <td className="p-5"><span className="bg-neutral-100 text-muted-foreground px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Initial Discovery</span></td>
                <td className="p-5 text-foreground font-medium">Linda Weber (Mng Dir)</td>
                <td className="p-5 text-muted-foreground italic font-serif">"I know you're leading the digital transformation board this year..."</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Wireframe B: The Executive Briefing Document Spec */}
      <div className="w-full bg-neutral-100/50 rounded-xl border border-primary/10 shadow-inner overflow-hidden flex flex-col font-sans p-10 items-center justify-center relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '16px 16px' }} />
        
        <div className="w-full max-w-[550px] aspect-[1/1.414] bg-white border border-slate-300 shadow-2xl relative flex flex-col p-10 z-10 transition-transform duration-700 hover:scale-[1.02]">
           {/* Document Header */}
           <div className="border-b-[4px] border-slate-900 pb-8 mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground font-mono mb-4 block">Confidential Executive Briefing</span>
              <h2 className="text-4xl font-serif text-slate-900 leading-tight">Macroeconomic Headwinds & Liquidity Frameworks</h2>
           </div>
           
           {/* Document Meta */}
           <div className="flex gap-12 border-b border-slate-200 pb-5 mb-8 text-xs text-slate-500 font-medium font-sans">
              <div>
                 <strong className="block text-slate-800 text-[10px] uppercase tracking-widest mb-1.5 font-bold">Prepared For</strong>
                 <span>Bridge2Partners Strategy Roundtable</span>
              </div>
              <div>
                 <strong className="block text-slate-800 text-[10px] uppercase tracking-widest mb-1.5 font-bold">Distribution</strong>
                 <span className="text-red-700 font-bold">Strictly Embargoed</span>
              </div>
           </div>

           {/* 2-Column Abstract */}
           <div className="columns-2 gap-8 text-[11px] text-slate-600 leading-relaxed font-serif relative">
              <p className="mb-4"><span className="float-left text-5xl leading-none pr-2 font-bold text-slate-900 font-sans tracking-tighter">A</span>s we navigate the coming fiscal cycle, the compounding pressure of regulatory scrutiny and legacy infrastructural debt presents a dual-front challenge for tier-one institutions. This document serves as the foundational baseline for our upcoming closed-door discussion.</p>
              <p className="mb-4">The core thesis examines how rapid liquidity deployment is currently hindered by siloed mainframe architecture, and why incremental edge solutions are no longer viable strategies for long-term capitalization.</p>
              <p className="mb-4">Participants are expected to review these findings prior to the session to ensure our dialogue immediately tackles strategic implementation rather than foundational theory.</p>
              <p>The operational framework shifts the focus entirely toward core modernization velocity over disparate API wrapping protocols.</p>
              {/* Divider line in middle of columns */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-200 -translate-x-1/2" />
           </div>

           {/* Document Footer */}
           <div className="mt-auto border-t-[4px] border-slate-900 pt-5 flex justify-between items-center text-[10px] uppercase tracking-[0.1em] font-mono text-slate-400 font-bold">
              <span>Bridge2Partners Intelligence</span>
              <span>Page 1 of 2</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function RoundtableLiveWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: Bespoke Telepresence Grid */}
      <div className="w-full bg-neutral-900 rounded-xl border border-black shadow-xl overflow-hidden flex flex-col font-sans p-6 text-white min-h-[400px]">
         <div className="flex justify-between items-center mb-5">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50 font-bold">Executive Roundtable Access</span>
            <div className="flex gap-2 text-[8px] md:text-[10px] font-mono tracking-widest uppercase">
               <span className="bg-red-500 text-white px-2 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">Live</span>
               <span className="bg-white/10 text-white/70 px-2 py-1 rounded">Recording Disabled by Policy</span>
            </div>
         </div>
         
         {/* 1:4 Ratio Grid */}
         <div className="grid grid-cols-6 grid-rows-2 gap-4 flex-1 h-full min-h-[300px]">
            {/* The Active Guest Speaker (Takes up 4 cols, 2 rows ) */}
            <div className="col-span-4 row-span-2 relative bg-neutral-800 rounded-lg border-2 border-[#007FFF] shadow-[0_0_20px_rgba(0,127,255,0.2)] overflow-hidden group">
               <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent z-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               </div>
               <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                  <div className="bg-black/60 backdrop-blur w-max px-3 py-1.5 rounded border border-white/20 text-white text-[11px] font-mono uppercase tracking-widest shadow-lg flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#007FFF] shrink-0 shadow-[0_0_8px_rgba(0,127,255,0.8)]"></div>
                     Chris M. — CIO, Acme Corp
                  </div>
               </div>
            </div>

            {/* Internal Host (Top Right) */}
            <div className="col-span-2 row-span-1 border border-white/10 bg-neutral-800 rounded-lg relative overflow-hidden flex items-center justify-center group hover:border-white/20 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/10"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <div className="bg-black/60 backdrop-blur px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest text-[#009677] font-bold border border-[#009677]/30">
                     Host: M. Cordas
                  </div>
                  {/* Muted Mic */}
                  <div className="bg-red-500/80 backdrop-blur p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg></div>
               </div>
            </div>

            {/* Guest 3 (Bottom left of right side) */}
            <div className="col-span-1 row-span-1 border border-white/10 bg-neutral-800 rounded-lg relative overflow-hidden flex flex-col items-center justify-center group hover:border-white/20 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/10"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <div className="bg-black/60 backdrop-blur px-1.5 py-1 rounded text-[8px] font-mono uppercase tracking-widest text-white/70">
                     Guest 3
                  </div>
                  <div className="bg-red-500/80 backdrop-blur p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg></div>
               </div>
            </div>

            {/* Guest 4 (Bottom right) */}
            <div className="col-span-1 row-span-1 border border-white/10 bg-neutral-800 rounded-lg relative overflow-hidden flex flex-col items-center justify-center group hover:border-white/20 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/10"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                  <div className="bg-black/60 backdrop-blur px-1.5 py-1 rounded text-[8px] font-mono uppercase tracking-widest text-white/70">
                     Guest 4
                  </div>
                  <div className="bg-red-500/80 backdrop-blur p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="2" x2="22" y1="2" y2="22"/><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/><path d="M5 10v2a7 7 0 0 0 12 5"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="12" x2="12" y1="19" y2="22"/></svg></div>
               </div>
            </div>
         </div>
      </div>

      {/* Wireframe B: Moderator Intelligence Console */}
      <div className="w-full bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans">
        <div className="font-bold text-primary border-b border-primary/10 p-5 uppercase tracking-widest text-xs flex items-center justify-between bg-neutral-50/50">
           <span>Moderator Console (Internal Side-Channel)</span>
           <span className="text-[10px] font-bold bg-neutral-100 text-muted-foreground px-3 py-1.5 rounded shadow-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              00:14:32 REMAINING
           </span>
        </div>
        <div className="p-8 flex flex-col gap-6">
           
           {/* Live CRM Feed */}
           <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live CRM Feed / Context</span>
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 relative border-l-4 border-l-[#007FFF] shadow-sm">
                 <strong className="text-sm uppercase tracking-widest text-muted-foreground block mb-2 font-mono">Active Speaker:</strong>
                 <p className="text-lg font-medium text-slate-900 border-b border-neutral-200 pb-4 mb-4">C. Mitchell, CIO at Acme Corp</p>
                 <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 block mb-2 font-mono">CRM Intelligence:</span>
                 <p className="text-sm text-muted-foreground leading-relaxed italic font-serif">
                   "Currently migrating off legacy mainframe processing. Extremely risk-averse regarding downtime during Q4."
                 </p>
                 <p className="text-xs font-bold text-red-700 mt-5 pt-4 border-t border-red-100 bg-red-50/50 p-3 rounded flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    Constraint Alert: Probe strictly on transition risk windows and integration layering. Do not discuss pricing.
                 </p>
              </div>
           </div>

           {/* Inject Provocation Button */}
           <div className="w-full bg-slate-900 text-white rounded-lg p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors shadow-md mt-2">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <div>
                     <span className="text-base font-bold block mb-0.5">Inject Provocation (Pivot)</span>
                     <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Execute contrarian thesis injection via Host</span>
                  </div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
           </div>
           
        </div>
      </div>
      
    </div>
  );
}

function RoundtablePostWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: The Synthesis Asset Spec */}
      <div className="w-full bg-slate-900 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex flex-col font-sans p-2 relative text-slate-100">
         {/* Fake browser/portal chrome */}
         <div className="w-full h-8 bg-slate-800/80 rounded-t-lg border-b border-slate-700 flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            <div className="ml-4 bg-slate-900 px-3 py-1 rounded text-[8px] font-mono tracking-widest text-slate-400 border border-slate-700 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               portal.bridge2partners.com/intelligence
            </div>
         </div>
         
         <div className="p-8 pt-10 pb-12 flex flex-col items-center bg-white border-t border-slate-300 text-slate-900">
            <div className="w-full max-w-[500px]">
               <div className="border-b border-slate-300 pb-5 mb-6 text-center">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold block mb-2">Chatham House Executive Synthesis</span>
                  <h3 className="text-3xl font-serif text-slate-900 leading-tight">Q3 Market Liquidity Friction Points</h3>
               </div>
               
               <div className="space-y-6">
                  {/* Section: Macro Consensus */}
                  <div className="border border-slate-200 rounded-lg p-5 shadow-sm bg-slate-50">
                     <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                        </div>
                        <strong className="text-sm uppercase tracking-widest font-mono text-slate-700">Macro Consensus</strong>
                     </div>
                     <ul className="text-xs text-slate-600 leading-relaxed space-y-3 font-serif list-disc pl-4">
                        <li>Peer agreement that legacy core transitions represent unquantifiable risk profiles over the next 24 months.</li>
                        <li>Broad skepticism regarding API wrapper longevity versus true data-layer modernization.</li>
                     </ul>
                  </div>

                  {/* Section: Emerging Frictions */}
                  <div className="border border-slate-200 rounded-lg p-5 shadow-sm bg-white">
                     <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                        </div>
                        <strong className="text-sm uppercase tracking-widest font-mono text-slate-700">Emerging Frictions</strong>
                     </div>
                     <ul className="text-xs text-slate-600 leading-relaxed space-y-3 font-serif list-disc pl-4">
                        <li>Divergent timelines on executing the primary data-lake shift.</li>
                        <li>Internal compliance bottlenecks explicitly blocking velocity for 3 of the 4 participants.</li>
                     </ul>
                  </div>
               </div>
               
            </div>
         </div>
      </div>

      {/* Wireframe B: Post-Event Relationship Node Graph */}
      <div className="w-full bg-neutral-50/50 rounded-xl border border-primary/10 shadow-sm flex flex-col font-sans p-10 pt-12 items-center relative overflow-hidden">
        
        {/* Top Node (Internal Host) */}
        <div className="bg-slate-900 border border-slate-700 text-white rounded-xl py-3 px-6 shadow-xl relative z-10 flex flex-col items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#007FFF] mb-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
           <strong className="text-sm font-bold block">Internal SME</strong>
           <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">M. Cordas</span>
        </div>

        {/* Tree Path Lines */}
        <div className="w-[2px] h-8 bg-slate-300 relative z-0"></div>
        <div className="w-[300px] sm:w-[400px] h-[2px] bg-slate-300 relative z-0"></div>
        <div className="w-[300px] sm:w-[400px] flex justify-between relative z-0">
           <div className="w-[2px] h-8 bg-slate-300"></div>
           <div className="w-[2px] h-8 bg-[#009677]"></div>
           <div className="w-[2px] h-8 bg-slate-300"></div>
        </div>

        {/* Bottom Nodes (Attendees) */}
        <div className="w-full max-w-[500px] flex justify-between relative z-10">
           
           <div className="bg-white border border-slate-200 rounded-lg p-3 shadow text-center w-24 sm:w-28">
              <span className="text-[10px] font-bold text-slate-900 block mb-1">Guest 1</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Nurture</span>
           </div>

           <div className="bg-white border-2 border-[#009677] rounded-lg p-3 shadow-xl text-center w-36 sm:w-40 transform -translate-y-2 relative group hover:-translate-y-3 transition-transform">
              {/* distinct callout badge */}
              <div className="absolute -top-7 -right-4 sm:-right-8 w-max">
                 <div className="bg-[#009677]/10 border border-[#009677]/30 text-[#009677] px-2 py-1 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-mono shadow-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    Private Briefing Secured
                 </div>
              </div>
              <strong className="text-xs font-bold text-slate-900 block mb-1">C. Mitchell (CIO)</strong>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Acme Corp</span>
           </div>

           <div className="bg-white border border-slate-200 rounded-lg p-3 shadow text-center w-24 sm:w-28">
              <span className="text-[10px] font-bold text-slate-900 block mb-1">Guest 3</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">Nurture</span>
           </div>

        </div>

      </div>
      
    </div>
  );
}

// VIP
function VipPreWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: Executive Intelligence Dossier Spec */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-primary/10 flex flex-col font-sans p-6">
         <div className="w-full bg-neutral-50/50 rounded-lg p-6 border border-neutral-200">
            <div className="flex justify-between items-start border-b border-primary/10 pb-5 mb-6">
               <div>
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold flex items-center gap-2 mb-2">
                     <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Internal Eyes Only
                  </span>
                  <h3 className="text-2xl font-serif text-slate-900 tracking-wide">Target Profile: C. Mitchell</h3>
               </div>
               <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground block">Dossier Generated</span>
                  <span className="text-xs text-primary font-mono font-bold">T-Minus 14 Days</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-5 rounded border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-primary/5 pb-3 mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                     <span className="text-[10px] uppercase tracking-widest font-mono text-foreground font-bold">Board Affiliations</span>
                  </div>
                  <ul className="text-xs text-muted-foreground leading-relaxed font-serif space-y-3 list-disc pl-3">
                     <li>Currently sits on the board of <span className="font-semibold text-foreground">Global Logistics Corp.</span></li>
                     <li>Advisory chair for <span className="font-semibold text-foreground">FinTech Forward</span> philanthropic arm.</li>
                  </ul>
               </div>

               <div className="bg-white p-5 rounded border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-primary/5 pb-3 mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12" y1="18" y2="18.01"/><path d="M8 13h4l-2 3h4"/></svg>
                     <span className="text-[10px] uppercase tracking-widest font-mono text-foreground font-bold">Recent Capital Moves</span>
                  </div>
                  <ul className="text-xs text-muted-foreground leading-relaxed font-serif space-y-3 list-disc pl-3">
                     <li>Spearheaded the $150M acquisition of <span className="font-semibold text-foreground">DataSync Tech</span> last quarter.</li>
                     <li>Strong public advocate for <span className="font-semibold text-foreground">CapEx efficiency</span> over OpEx scale.</li>
                  </ul>
               </div>

               <div className="bg-white p-5 rounded border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-primary/5 pb-3 mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                     <span className="text-[10px] uppercase tracking-widest font-mono text-foreground font-bold">Strategic Frictions</span>
                  </div>
                  <ul className="text-xs text-muted-foreground leading-relaxed font-serif space-y-3 list-disc pl-3">
                     <li>Under immense board pressure to modernize legacy mainframe by Q4.</li>
                     <li>Highly risk-averse to prolonged multi-year integration timelines.</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>

      {/* Wireframe B: The Physical Asset Mockup */}
      <div className="w-full bg-neutral-950 rounded-xl overflow-hidden flex flex-col items-center justify-center py-12 relative border border-black shadow-inner">
         <div className="w-64 h-80 bg-neutral-900 rounded-lg shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 border border-neutral-800 transition-transform hover:scale-105 duration-500 z-10">
           <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0)_40%,rgba(255,255,255,0.05)_50%,rgba(0,0,0,0)_60%)]" />
           <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-6 border-b border-white/10 pb-2 w-full text-center">Exclusive Access</div>
           <div className="text-xl font-display text-white text-center font-light leading-snug">The Bridge2Partners<br/><span className="text-primary font-serif italic">Porsche Center</span><br/>Experience.</div>
           <div className="text-[8px] uppercase tracking-widest text-white/30 mt-auto font-mono text-center pt-6 border-t border-white/10 w-full">Heavyweight Matte Stock<br/>Blind Debossed Logo</div>
         </div>
      </div>

    </div>
  );
}

function VipLiveWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: Top-Down Seating Blueprint */}
      <div className="w-full bg-neutral-100 rounded-xl border border-primary/10 shadow-sm overflow-hidden flex flex-col font-sans p-6 md:p-10 items-center justify-center relative min-h-[400px]">
         <span className="absolute top-5 left-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground font-bold">Interleaved Anchor Execution</span>
         
         <div className="relative w-full max-w-[600px] h-48 flex items-center justify-center mt-12 md:mt-6">
            
            {/* The Dining Table */}
            <div className="w-[85%] sm:w-[80%] h-24 sm:h-28 bg-slate-800 rounded-[60px] md:rounded-[50px] shadow-2xl border-4 border-slate-700 relative z-10 flex items-center justify-center">
               <div className="w-full border-t flex border-slate-600/50 justify-center gap-2 border-dashed absolute top-1/2 -z-10"></div>
            </div>

            {/* Top Seats */}
            <div className="absolute top-0 left-0 w-full flex justify-center gap-6 sm:gap-12 z-20">
               {/* Internal Host */}
               <div className="relative transform translate-y-3 sm:translate-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center z-20 relative">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <span className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[9px] font-bold tracking-widest uppercase font-mono text-slate-800">SME: Cordas</span>
               </div>
               {/* Target Exec */}
               <div className="relative transform translate-y-3 sm:translate-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-yellow-600 shadow-xl flex items-center justify-center z-20 relative ring-4 ring-yellow-600/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <span className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[9px] font-bold tracking-widest uppercase font-mono text-yellow-700">T1: Mitchell</span>
               </div>
               {/* Internal Host */}
               <div className="relative transform translate-y-3 sm:translate-y-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center z-20 relative">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <span className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[9px] font-bold tracking-widest uppercase font-mono text-slate-800">SME: Weber</span>
               </div>
            </div>

            {/* End Cap Left */}
            <div className="absolute left-[2%] sm:left-[5%] top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white bg-slate-400 shadow flex items-center justify-center z-20 relative"></div>
            </div>
            
            {/* End Cap Right */}
            <div className="absolute right-[2%] sm:right-[5%] top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white bg-slate-400 shadow flex items-center justify-center z-20 relative"></div>
            </div>

            {/* Bottom Seats */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-6 sm:gap-12 z-20">
               <div className="relative transform -translate-y-3 sm:-translate-y-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white bg-slate-400 shadow-xl flex items-center justify-center z-20 relative mt-2"></div>
               </div>
               {/* Tier 1 Guest (Cross lines of sight) */}
               <div className="relative transform -translate-y-3 sm:-translate-y-2">
                  <span className="absolute -bottom-5 sm:-bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[8px] sm:text-[9px] font-bold tracking-widest uppercase font-mono text-yellow-700">T1: Vance</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-yellow-600 shadow-xl flex items-center justify-center z-20 relative ring-4 ring-yellow-600/20">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
               </div>
                <div className="relative transform -translate-y-3 sm:-translate-y-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 border-white bg-slate-400 shadow-xl flex items-center justify-center z-20 relative mt-2"></div>
               </div>
            </div>

         </div>

         {/* Legend */}
         <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-16 sm:mt-12 bg-white/50 backdrop-blur border border-primary/10 px-4 py-2 rounded-full relative md:absolute bottom-4 z-30">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Tier 1 Target</span></div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-white border border-slate-300"></div><span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Internal SME</span></div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-400"></div><span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Tier 2 Guest</span></div>
         </div>
      </div>

      {/* Wireframe B: Host Pocket Protocol UI */}
      <div className="w-full flex justify-center pb-6">
         <div className="w-[320px] bg-slate-900 rounded-[30px] border-[6px] border-black shadow-2xl overflow-hidden flex flex-col font-sans p-5 pb-8 relative shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
            
            {/* Mobile Notch & Header */}
            <div className="w-20 h-4 bg-black rounded-full mx-auto mb-6"></div>
            <div className="flex justify-between items-end border-b border-slate-700 pb-3 mb-5">
               <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-primary font-bold">Cloakroom Sync</span>
                  <h3 className="text-xl font-serif text-white mt-1">Host Protocol: 01</h3>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
               
               <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-4 flex gap-3 shadow-sm hover:border-slate-500 transition-colors">
                  <div className="w-5 h-5 rounded-sm border border-slate-600 flex items-center justify-center shrink-0 mt-0.5"><div className="w-3 h-3 bg-primary rounded-[2px]"></div></div>
                  <div>
                     <strong className="text-white text-sm block mb-1">C. Mitchell Wine Pref</strong>
                     <span className="text-slate-400 text-xs block leading-relaxed">Ensure sommelier pours Cabernet for Mitchell immediately. No tasting required.</span>
                  </div>
               </div>

               <div className="bg-slate-800/80 border border-slate-700/50 rounded-lg p-4 flex gap-3 shadow-sm hover:border-slate-500 transition-colors">
                  <div className="w-5 h-5 rounded-sm border border-slate-600 flex items-center justify-center shrink-0 mt-0.5"></div>
                  <div>
                     <strong className="text-white text-sm block mb-1">Introduce CTO to VP</strong>
                     <span className="text-slate-400 text-xs block leading-relaxed">Cross table line-of-sight intro: Connect our CTO specifically with the VP of Engineering regarding pipeline architecture.</span>
                  </div>
               </div>

               <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 flex gap-3 shadow-sm relative overflow-hidden">
                  <div className="w-1 h-full bg-red-600 absolute left-0 top-0"></div>
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-red-500">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  <div>
                     <strong className="text-red-400 text-sm block mb-1">Avoid Q2 M&A Topics</strong>
                     <span className="text-red-300/80 text-xs block leading-relaxed">Do not bring up the recent rumored Q2 M&A failures unless Mitchell states it first.</span>
                  </div>
               </div>

            </div>

         </div>
      </div>
      
    </div>
  );
}

function VipPostWireframe() {
  return (
    <div className="flex flex-col gap-10 w-full animate-in fade-in duration-500">
      
      {/* Wireframe A: The Handwritten Asset Mockup */}
      <div className="w-full bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center py-20 relative border border-slate-800 shadow-inner">
         {/* Textured slate background */}
         <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] mix-blend-overlay"></div>
         
         {/* The Card */}
         <div className="w-[80%] max-w-[400px] bg-[#f9f8f6] shadow-[15px_15px_40px_rgba(0,0,0,0.5)] transform -rotate-2 p-10 relative z-10 rounded-sm">
            {/* Embossed Monogram */}
            <div className="w-8 h-8 mx-auto mb-8 relative flex items-center justify-center">
               <div className="absolute inset-0 rotate-45 border border-black/10"></div>
               <span className="font-serif text-black/20 text-xs tracking-widest font-bold">B2P</span>
            </div>

            {/* Handwritten Text */}
            <div className="font-serif italic text-slate-800 text-lg leading-relaxed tracking-wide opacity-90 transform -rotate-1">
               <p className="mb-4">Charles,</p>
               <p className="mb-4 indent-4">Thoroughly enjoyed our debate on Q4 risk-weighting over dinner.</p>
               <p className="mb-6 indent-4">I've attached the bespoke liquidity framework we discussed. Let's touch base next week.</p>
               <p className="text-right mr-6">— M. Cordas</p>
            </div>
         </div>
      </div>

      {/* Wireframe B: Deal Desk Command UI */}
      <div className="w-full bg-[#0a0a0a] rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans border border-slate-800 font-mono">
         {/* Top Header */}
         <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#111]">
            <div className="flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
               <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Pipeline Escalation</span>
            </div>
            <span className="text-slate-500 text-[10px] uppercase tracking-widest hidden md:block">Platform Admin</span>
         </div>

         <div className="p-6 md:p-8 space-y-8 flex flex-col">
            {/* The Opportunity Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] uppercase tracking-widest rounded-sm mb-3">Forecast Category: Commit</span>
                  <h3 className="text-2xl font-serif text-white tracking-wide">Acme Bank Corp.</h3>
                  <span className="text-slate-500 text-xs uppercase tracking-widest block mt-1">Core Modernization Initiative</span>
               </div>
               <div className="text-left md:text-right">
                  <span className="text-3xl font-light text-white font-sans tracking-tight">$4,250,000</span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest block mt-1">Total Contract Value (TCV)</span>
               </div>
            </div>

            {/* Next Best Action Card */}
            <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-5 flex flex-col sm:flex-row items-start gap-4">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
               </div>
               <div className="flex-1 w-full flex flex-col">
                  <strong className="text-emerald-400 text-sm block mb-1 uppercase tracking-widest font-mono">Next Best Action</strong>
                  <span className="text-emerald-100/70 text-sm block leading-relaxed font-sans">Mobilize Pricing Committee for Custom SLA. Internal meeting required before T+5 Boardroom Briefing.</span>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                     <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs px-4 py-2 rounded shadow transition-colors font-semibold">Initiate Deal Desk</button>
                     <button className="bg-transparent border border-slate-700 text-slate-400 hover:text-slate-200 font-sans text-xs px-4 py-2 rounded transition-colors">View Opportunity</button>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}


// -------------------------------------------------------------
// MAIN COMPONENT & STATE MATRIX
// -------------------------------------------------------------

type MatrixStep = "pre" | "live" | "post";
type EventTier = "tradeshows" | "roundtables" | "vip";

const EVENT_MATRIX = {
  tradeshows: {
    pre: {
      logistics: [
        { title: "Define Enterprise-Grade ROI KPIs", detail: "<p>When dealing with six-figure deal sizes, the traditional tradeshow playbook of mass badge-scanning is a waste of resources. Volume is vanity; pipeline is sanity. Metrics must be locked in prior to deployment and strictly index on account penetration and pipeline velocity.</p><div class='mt-5 overflow-hidden border border-primary/10 rounded-lg shadow-sm'><table class='w-full text-left text-sm'><thead class='bg-neutral-50/50 border-b border-primary/10 text-[10px] uppercase tracking-widest text-muted-foreground font-mono'><tr><th class='p-3 font-semibold'>Phase</th><th class='p-3 font-semibold'>Target Metric</th><th class='p-3 font-semibold'>Volume</th><th class='p-3 font-semibold'>Directive</th></tr></thead><tbody class='divide-y divide-black/5 bg-white'><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-primary text-xs align-top bg-primary/5 border-b border-black/5' rowspan='2'>Pre-Event</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Pre-Booked Meetings</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>8–12</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>Per Account Exec. Built before boarding flight.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Account Coverage</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>25%+</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Must secure touchpoints with 1/4 of VIP accounts.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-[#009677] text-xs align-top bg-[#009677]/10 border-b border-black/5' rowspan='2'>Live Floor</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Net-New ICP Scans</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>25–40</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>Disqualify non-fit actively. High buying capacity only.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Executive Intros</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>3–5</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Net-new VP+ or C-suite introductions.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground-800 text-xs align-top bg-neutral-100' rowspan='2'>Post-Event</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Sourced Pipeline</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>3x ROI</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>New qualified pipe to cover 3x total travel/sponsorship cost.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Accelerated Pipe</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>$500k+</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Face-to-face unlocks to push stalled deals to proposal.</td></tr></tbody></table></div>" },
        { title: "Create Target Account List", detail: "<p>A Target Account List (TAL) is our strategic map of the exact enterprise companies and executive attendees we absolutely must engage while on the show floor. Identifying these critical targets cannot be a solo activity; it requires a cross-functional intelligence-gathering exercise to uncover hidden internal connections and orchestrate warm introductions.</p><div class='mt-6 ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 1: The Data Merge</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Cross-reference the attendee list with the CRM. Flag active pipeline deals, Tier 1 whitespace, and highly engaged closed-lost accounts.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 2: Relationship Mapping</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Use standard LinkedIn search and executive networks to manually map our org chart against the attendee list. Identify who internally possesses a 1st or 2nd-degree connection to the target attendees. A warm executive intro is our primary weapon.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 3: The GTM Sync</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Bring the compiled intelligence to the regular GTM meeting at T-Minus 14 days. Reps claim accounts, assign outreach cadences, and formally request internal warm introductions.</span></div></div></div>" },
        { title: "Strategic Pre-Booking Protocol", detail: "<p class='mb-5'>Maximize event ROI by treating the tradeshow as a geographically convenient venue for strategic alignment with key banking accounts.</p><div class='grid grid-cols-1 md:grid-cols-3 gap-4'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><rect width='18' height='18' x='3' y='4' rx='2' ry='2'/><line x1='16' x2='16' y1='2' y2='6'/><line x1='8' x2='8' y1='2' y2='6'/><line x1='3' x2='21' y1='10' y2='10'/></svg></div><strong class='text-foreground mb-1 block text-base'>The 60/40 Portfolio</strong><span class='text-primary text-2xl font-display font-bold block mb-3 tracking-tight'>60% Locked</span><span class='text-muted-foreground text-sm leading-relaxed block'>Lock 60% of your calendar with targeted, high-value meetings before wheels up. Preserve the remaining 40% strictly for organic executive introductions, competitive intelligence gathering, and on-the-floor agility.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><rect width='20' height='14' x='2' y='7' rx='2' ry='2'/><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Discovery</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Gap Analysis</span><span class='text-muted-foreground text-sm leading-relaxed block'>Frame your outreach around high-level strategic value rather than product features. Invite target accounts to a closed-door \"Discovery\" or \"Gap Analysis Session\" focused on their specific banking architecture and market challenges.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Hook</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Insight-Led</span><span class='text-muted-foreground text-sm leading-relaxed block'>Activate the warm introductions generated during the GTM sync. Anchor your outreach in bespoke, account-specific insights—such as recent M&A activity, core banking modernization efforts, or regulatory shifts—to secure the meeting.</span></div></div>" }
      ],
      wireframe: <TradeshowPreWireframe />
    },
    live: {
      logistics: [
        { title: "Live Floor Execution Protocol", detail: "<p class='mb-6'>The public floor is for rapid qualification and immediate filtration. Volume is not the goal; architectural alignment is.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Targeted Intercept Protocol</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Do not passively wait behind a counter. Executive Consultants must proactively monitor the aisles for personas matching our Target Account List (TAL). Look for specific badge titles (CIO, VP of Digital, Head of Core Modernization) and intercept with peer-level confidence, not a sales pitch.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The 3-Question Disqualification</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Your goal on the public floor is to disqualify non-buyers immediately. Do not conduct product demos. Ask three sharp, architectural questions to gauge their current core banking state. If they are not a fit, scan their badge for marketing nurture and politely release them.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Annex Transition</strong><span class='text-muted-foreground text-sm leading-relaxed block'>If the prospect reveals a critical pain point and fits our ICP, do not attempt to close them on the noisy floor. Scan their badge, capture contextual CRM notes, and seamlessly transition them into the Private Strategy Annex for a focused, closed-door Executive Briefing.</span></div></div></div>" }
      ],
      wireframe: <TradeshowLiveWireframe />
    },
    post: {
      logistics: [
        { title: "Post-Event Sequencing Protocol", detail: "<p class='mb-6'>The event does not end when the floor closes. Speed to value and hyper-relevant context are the only ways to convert tradeshow interactions into actual closed-won pipeline.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Triage &amp; CRM Enrichment (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Mandate strict data hygiene. All intercepted lead data and Annex notes must be synced to Salesforce. Segment into \"Executive Track\" vs. \"Standard Nurture.\"</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Value-Add Anchor (T+48 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Avoid generic \"thanks for stopping by\" messaging. The first touchpoint must deliver a specific strategic asset (e.g., a whitepaper, case study, or compliance brief) that maps directly to the pain point discussed in the Annex.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Account Multi-Threading (T+7 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Map the buying committee. Leverage the initial tradeshow contact to gain introductions to technical, financial, and compliance stakeholders.</span></div></div></div>" }
      ],
      wireframe: <TradeshowPostWireframe />
    }
  },
  roundtables: {
    pre: {
      logistics: [
        { title: "Executive Alignment Protocol", detail: "<div class='grid grid-cols-1 md:grid-cols-3 gap-5 mt-2'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><circle cx='22' cy='11' r='2'/><path d='M22 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg></div><strong class='text-foreground mb-1 block text-base'>Audience Curation Mandate</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Strict 1:4 Ratio</span><span class='text-muted-foreground text-sm leading-relaxed block'>Enforce a strict 1:4 ratio of internal SMEs to external executives. No delegations, no \"plus-ones.\" We politely but firmly decline if the target attendee attempts to delegate downwards.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2v4a2 2 0 0 0 2 2h4'/><path d='M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z'/><path d='M20 18v-2a4 4 0 0 0-4-4H4'/><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/></svg></div><strong class='text-foreground mb-1 block text-base'>Executive Briefing Asset</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>T-Minus 72 Hours</span><span class='text-muted-foreground text-sm leading-relaxed block'>We do not send agenda bullet points. Distribute a highly researched, 2-page briefing document to establish the intellectual baseline before the call. Ensure all attendees enter the room primed for peer dialogue.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='4'/><line x1='21.17' y1='8' x2='12' y2='8'/><line x1='3.95' y1='6.06' x2='8.54' y2='14'/><line x1='10.88' y1='21.94' x2='15.46' y2='14'/></svg></div><strong class='text-foreground mb-1 block text-base'>Technical Fidelity Audit</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Studio Production</span><span class='text-muted-foreground text-sm leading-relaxed block'>Executive presence requires technical perfection. Mandate hardwired ethernet connections, dedicated external microphones, and sterile, professional background environments for all internal hosts.</span></div></div>" }
      ],
      wireframe: <RoundtablePreWireframe />
    },
    live: {
      logistics: [
        { title: "Virtual Facilitation Architecture", detail: "<p class='mb-6'>A high-end roundtable thrives on engineered tension. Control the flow ruthlessly but invisibly.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Orchestrated Hook (0-10 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Establish the Chatham House Rule immediately. Execute a highly curated round-robin introduction where the internal host connects the disparate backgrounds of the four guest executives to create instant peer respect.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Contrarian Pivot (10-25 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>We do not present slide decks. The Subject Matter Expert (SME) must introduce a single, contrarian thesis regarding market liquidity or compliance to instantly spark peer debate. Make them disagree.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Tactical Moderation &amp; Mapping (25-60 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Execute the \"Listen &amp; Map\" protocol. The host's primary job is to fade into the background, tracking points of agreement and friction between the external executives to leverage for highly-targeted post-event multi-threading.</span></div></div></div>" }
      ],
      wireframe: <RoundtableLiveWireframe />
    },
    post: {
      logistics: [
        { title: "Post-Event Amplification Protocol", detail: "<p class='mb-6'>The roundtable is simply the ignition sequence. The true value lies in how you leverage the peer insights to execute highly personalized, asynchronous follow-ups.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Executive Synthesis (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Draft a strict \"Chatham House\" summary of the session. Highlight the macro-frictions and consensus points discussed, strictly anonymizing all external executive quotes.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Bespoke 1:1 Pivot (T+48 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Outline the protocol for individual outreach. The internal host must reference a specific contrarian point the target executive made during the roundtable to seamlessly pivot into an invitation for a private, customized boardroom deep dive.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Pipeline &amp; Intelligence Sync (T+72 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Mandate the extraction of strategic intelligence. Update Salesforce with the newly established peer-to-peer relationship dynamics and tag any exposed legacy infrastructure or liquidity risks discussed.</span></div></div></div>" }
      ],
      wireframe: <RoundtablePostWireframe />
    }
  },
  vip: {
    pre: {
      logistics: [
        { title: "VIP Engagement Protocol", detail: "<div class='grid grid-cols-1 md:grid-cols-3 gap-5 mt-2'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2v4a2 2 0 0 0 2 2h4'/><path d='M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z'/><path d='M20 18v-2a4 4 0 0 0-4-4H4'/><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Intelligence Dossier</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Mandatory 14 Days Out</span><span class='text-muted-foreground text-sm leading-relaxed block'>We go beyond LinkedIn. Profile current board seats, recent M&amp;A involvement, philanthropic overlap, and macro-headwinds specific to their sector. Know exactly who enters the room.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg></div><strong class='text-foreground mb-1 block text-base'>Hyper-Personalized Logistics</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>The White Glove Mandate</span><span class='text-muted-foreground text-sm leading-relaxed block'>Orchestrate bespoke transit (e.g., black car service directly to venue), precise dietary/allergy mapping, and discreet security clearing if applicable. Eliminate all friction.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='14' x='2' y='5' rx='2'/><line x1='2' x2='22' y1='10' y2='10'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Physical Touchpoint</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Zero Digital Invites</span><span class='text-muted-foreground text-sm leading-relaxed block'>We do not send generic recurring calendar invites for VIP engagements. Execute hand-delivered, high-weight cardstock invitations or secure physical parcel delivery.</span></div></div>" }
      ],
      wireframe: <VipPreWireframe />
    },
    live: {
      logistics: [
        { title: "Private Dining Facilitation", detail: "<p class='mb-6'>A private executive dinner must feel entirely organic, disguising a highly orchestrated strategic maneuver. Never leave seating to chance.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Strategic Seating Choreography (0-15 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Strict mandate: Internal executives never sit next to each other. We use the \"Interleaved Anchor\" method, surrounding high-value target executives with complementary internal SMEs to control the narrative flow.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Organic Anchor (15-90 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Absolute zero-pitch environment. No decks, no collateral. Discussion must remain strictly on macro-economics, sector headwinds, and personal affinities discovered in the dossier. Build pure relationship equity.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Quiet Extraction (90-120 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>The departure phase is critical. Hosts must extract a specific, actionable follow-up commitment (e.g., \"I'll have my team send over that liquidity framework we discussed\") before the target executive enters their car.</span></div></div></div>" }
      ],
      wireframe: <VipLiveWireframe />
    },
    post: {
      logistics: [
        { title: "VIP Escalation Protocol", detail: "<p class='mb-6'>The VIP event was merely the catalyst. Post-event execution must be ruthlessly fast, highly personalized, and immediately tied to active pipeline velocity.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Concierge Continuation (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Automated emails are strictly prohibited. Mandate the delivery of a physical, handwritten note from the internal host on premium cardstock, referencing a specific personal affinity or contrarian insight discussed during the dinner.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Private Boardroom Briefing (T+5 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Deliver on the \"Quiet Extraction.\" If a bespoke liquidity framework was promised, hand-deliver it or present it via a secure, 1:1 telepresence session. No generic collateral.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Deal Desk Escalation (T+7 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Internal sync protocol. The target account must be formally upgraded in Salesforce, forecast stages updated to \"Commit\" or \"Best Case,\" and the broader Deal Desk mobilized for bespoke pricing models.</span></div></div></div>" }
      ],
      wireframe: <VipPostWireframe />
    }
  }
};

const PHASE_METADATA = {
  tradeshows: {
    pre: "T-Minus 30",
    live: "The Floor",
    post: "The Sequence"
  },
  roundtables: {
    pre: "Targeted Invites",
    live: "The Workshop",
    post: "Intelligence Sync"
  },
  vip: {
    pre: "Golden Ticket",
    live: "The Experience",
    post: "Premium Gifting"
  }
};

export function EventPresenceGuidelines() {
  const [activeTier, setActiveTier] = useState<EventTier>("tradeshows");
  const [activeStep, setActiveStep] = useState<MatrixStep>("pre");
  
  // Custom Accordion Tracker mapping multiple logistics arrays cleanly
  const [expandedLogisticsItem, setExpandedLogisticsItem] = useState<number | null>(0);

  // When changing tiers or steps, reset the accordion to the top item to avoid empty states
  const handleStepChange = (step: MatrixStep) => {
     setActiveStep(step);
     setExpandedLogisticsItem(0);
  }
  const handleTierChange = (tier: EventTier) => {
     setActiveTier(tier);
     setActiveStep("pre");
     setExpandedLogisticsItem(0);
  }

  const payload = EVENT_MATRIX[activeTier][activeStep];

  return (
    <section id="event-presence-guidelines" className="w-full space-y-12 animate-in fade-in duration-500">
      
      {/* 1. Header Area */}
      <div className="space-y-3 pb-2">
        <h2 className="text-3xl font-semibold tracking-tighter text-primary font-heading">
          Event Presence & Field Operations
        </h2>
        <p className="text-lg text-muted-foreground font-sans max-w-3xl leading-relaxed">
          The physical operationalization of the Bridge2Partners narrative. We execute across three rigid tiers, ensuring our brand shows up with maximum impact and strict structural governance across all phases.
        </p>
      </div>

      {/* 2. Macro Filter (Tiers) - Underline Tabs */}
      <div className="w-full mb-8">
         <Tabs value={activeTier} onValueChange={(val) => handleTierChange(val as EventTier)} className="w-full">
            <TabsList className="flex items-center justify-start gap-8 border-b border-primary/10 w-full rounded-none bg-transparent p-0 h-auto overflow-x-auto custom-scrollbar">
               <TabsTrigger value="tradeshows" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🎪 Tradeshows</TabsTrigger>
               <TabsTrigger value="roundtables" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🎙️ Peers in Practice</TabsTrigger>
               <TabsTrigger value="vip" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🍸 VIP Experiences</TabsTrigger>
            </TabsList>
         </Tabs>
      </div>

      {/* 3. The Playbook Matrix Payload */}
      <div className="flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-500" key={activeTier}>
         
         {/* Internal Timeline Stepper (Glass Navigation Pill) */}
         <div className="w-full mb-8 flex justify-start">
            <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-2 border border-white/40 dark:border-primary/20 bg-white/30 dark:bg-background/40 backdrop-blur-xl shadow-md rounded-full w-max">
               <span className="font-ui font-bold text-[10px] md:text-xs uppercase tracking-widest mx-2 text-foreground/50 hidden sm:inline-block">Phase</span>
               {[{id: "pre", label: "Pre-Event"}, {id: "live", label: "Live Execution"}, {id: "post", label: "Post-Event"}].map((step, idx) => {
                  const isActive = activeStep === step.id;
                  const dateLabel = PHASE_METADATA[activeTier][step.id as MatrixStep];
                  return (
                    <button 
                      key={step.id}
                      onClick={() => handleStepChange(step.id as MatrixStep)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                         "flex items-center gap-2.5 rounded-full py-2 px-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                         isActive 
                           ? "bg-primary text-white shadow-sm" 
                           : "text-foreground/70 hover:bg-white/50 dark:hover:bg-neutral-800 hover:text-foreground"
                      )}
                    >
                       <span className={cn("text-[9px] font-mono tracking-widest uppercase font-bold hidden md:inline-block", isActive ? "text-white/70" : "text-muted-foreground")}>{dateLabel}</span>
                       <div className={cn("w-1 h-1 rounded-full hidden md:block", isActive ? "bg-white/50" : "bg-neutral-300")} />
                       <span className="text-xs md:text-sm font-ui font-semibold">{step.label}</span>
                    </button>
                  )
               })}
            </div>
         </div>

         {/* Vertical Stack Content Area */}
         <div className="flex flex-col gap-12 pb-12 w-full animate-in slide-in-from-bottom-4 duration-300" key={activeStep}>
            
            {/* Top Section: Logistical Action Plan */}
            <div className="space-y-4 w-full">
               <h4 className="font-ui font-semibold tracking-tight text-foreground flex items-center gap-2 pb-2 border-b border-primary/10">
                 <CheckCircle2 className="w-5 h-5 text-primary" /> Logistical Playbook
               </h4>
               <div className="bg-white/60 dark:bg-card backdrop-blur-md rounded-xl border border-primary/10 p-2 shadow-sm flex flex-col gap-1 w-full">
                  {payload.logistics.map((item, index) => {
                     const isExpanded = expandedLogisticsItem === index;
                     return (
                        <div key={index} className={cn("group flex flex-col rounded-lg transition-all duration-300 border", isExpanded ? "bg-white dark:bg-muted/10 shadow-sm border-neutral/10" : "border-transparent")}>
                           <button
                             onClick={() => setExpandedLogisticsItem(isExpanded ? null : index)}
                             aria-expanded={isExpanded}
                             className="flex items-center justify-between w-full p-4 transition-all duration-300 rounded-lg text-left outline-none hover:bg-neutral/5 focus-visible:ring-2 focus-visible:ring-primary/50"
                           >
                              <div className="flex items-center gap-3">
                                <div className={cn("p-1.5 rounded-lg flex items-center justify-center transition-colors min-w-[32px] min-h-[32px]", isExpanded ? "bg-primary/10 text-primary" : "bg-neutral/5 text-muted-foreground")}>
                                  <span className="font-mono text-xs font-bold">{index + 1}</span>
                                </div>
                                <span className={cn("font-ui font-semibold text-sm sm:text-base transition-colors", isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
                                  {item.title}
                                </span>
                              </div>
                              <ChevronDown className={cn("w-4 h-4 text-foreground/40 transition-transform duration-300", isExpanded ? "rotate-180 text-primary" : "")} />
                           </button>
                           <div className={cn("overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]", isExpanded ? "max-h-[800px]" : "max-h-0")}>
                             <div 
                               className="p-4 pt-0 pl-14 text-muted-foreground font-sans text-sm leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: item.detail }}
                             />
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>

            {/* Bottom Section: Visual Specs */}
            <div className="space-y-4 w-full">
               <h4 className="font-ui font-semibold tracking-tight text-foreground flex items-center gap-2 pb-2 border-b border-primary/10">
                 <LayoutTemplate className="w-5 h-5 text-primary" /> Visual Spec
               </h4>
               <div className="bg-neutral-50/50 dark:bg-card/50 rounded-xl border border-primary/10 p-6 flex items-center justify-center min-h-[320px]">
                  {payload.wireframe}
               </div>
            </div>

         </div>

      </div>

    </section>
  );
}
