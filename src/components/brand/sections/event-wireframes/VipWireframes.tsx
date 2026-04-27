export function VipPreWireframe() {
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

export function VipLiveWireframe() {
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

export function VipPostWireframe() {
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
