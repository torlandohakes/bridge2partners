export function RoundtablePreWireframe() {
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

export function RoundtableLiveWireframe() {
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

export function RoundtablePostWireframe() {
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
