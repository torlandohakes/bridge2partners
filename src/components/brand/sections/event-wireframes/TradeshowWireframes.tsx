import { Users, Mail, Send, QrCode } from "lucide-react";

export function TradeshowPreWireframe() {
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

export function TradeshowLiveWireframe() {
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

export function TradeshowPostWireframe() {
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
