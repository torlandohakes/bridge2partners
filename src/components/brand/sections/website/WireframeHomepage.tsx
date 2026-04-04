import { MousePointerClick, Columns3, Fingerprint, Swords, ChevronDown, ArrowRight, BrainCircuit } from "lucide-react";
import Image from "next/image";

export function WireframeHomepage() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 1: The Homepage (Category Entry Point)</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 space-y-4 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold">
        {/* Hero Block / Production Asset Preview */}
        <div 
          className="relative overflow-hidden flex flex-col rounded-lg shadow-sm border border-neutral/10 transition-all hover:scale-[1.01] min-h-[400px]"
          style={{ 
            backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        >
           {/* Contrast Overlay (Gradient) */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#001b15]/90 via-[#001b15]/50 to-transparent backdrop-blur-[1px]" />
           <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#001b15] via-[#001b15]/50 to-transparent pointer-events-none" />
           
           {/* Mock Header Nav */}
           <div className="relative z-10 w-full flex items-center justify-between px-6 pt-6 pb-4">
              <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={180} height={40} className="w-auto h-6 object-contain" />
              <div className="hidden sm:flex items-center gap-6 font-ui text-xs font-medium text-white/90 relative z-50">
                <div className="relative group">
                   <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-2">Services <ChevronDown className="w-3 h-3 opacity-60 transition-transform group-hover:rotate-180" /></span>
                   <div className="absolute top-[90%] left-0 mt-1 w-48 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 flex flex-col p-2">
                     {['M&A Integration', 'Commercial Lending', 'Wealth Management', 'Treasury Solutions'].map(vertical => (
                       <span key={vertical} className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors text-xs font-medium tracking-normal normal-case">
                         {vertical}
                       </span>
                     ))}
                   </div>
                </div>
                <span className="cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-2">Compliance Docs</span>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md transition-colors shadow-sm font-semibold tracking-wide normal-case cursor-pointer">
                  Schedule analysis
                </button>
              </div>
           </div>

           {/* Hero Content Body */}
           <div className="relative z-10 flex flex-col items-start justify-center flex-1 px-8 py-8 w-full max-w-3xl gap-4">
             <span className="font-ui text-[11px] sm:text-xs text-white/70 uppercase tracking-widest font-bold">For Banking Executives Facing Disruption</span>
             
             <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] tracking-tight normal-case drop-shadow-md">
               Innovate now.<br/>Future Proof Your Bank.
             </h1>
             
             <div className="flex flex-wrap items-center gap-4 mt-4">
               <button className="bg-primary hover:bg-primary/90 text-white font-ui text-sm font-semibold px-6 py-3 rounded-md shadow-xl transition-all normal-case tracking-normal cursor-pointer">
                 Digital Transformation
               </button>
               <button className="bg-transparent hover:bg-white/10 text-white font-ui text-sm font-semibold border border-white/40 px-6 py-3 rounded-md shadow-sm transition-all backdrop-blur-sm normal-case tracking-normal cursor-pointer">
                 Schedule analysis
               </button>
             </div>
           </div>

           {/* Glassmorphic AI Prompt Pill */}
           <div className="relative z-20 w-full px-8 pb-8 flex justify-center mt-auto">
              <div className="w-full max-w-3xl flex flex-col gap-2.5">
                 <label className="font-ui text-xs text-white/80 font-medium pl-5 tracking-wide normal-case drop-shadow-md">
                   What challenges are you facing in your role? <span className="text-white font-bold ml-1">Ask B2P Intelligence.</span>
                 </label>
                 <div className="relative w-full flex flex-col sm:flex-row items-center bg-white/5 backdrop-blur-[12px] border border-white/20 rounded-3xl sm:rounded-full shadow-2xl overflow-hidden p-1.5 group transition-all hover:bg-white/10 hover:border-white/30">
                    <div className="hidden sm:flex w-10 h-10 shrink-0 items-center justify-center bg-white/10 rounded-full ml-1 backdrop-blur-md border border-white/10 shadow-inner">
                       <BrainCircuit className="w-4 h-4 text-white/90" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="E.g., How do we structure a post-merger integration framework?" 
                      className="flex-1 w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 py-3 sm:py-2.5 font-ui text-xs sm:text-sm h-full focus:outline-none focus:ring-0"
                    />
                    <button className="w-full sm:w-auto h-full sm:min-h-[40px] bg-white text-[#001b15] px-6 py-2.5 sm:py-0 rounded-2xl sm:rounded-full transition-all font-bold shadow-md hover:scale-[1.02] active:scale-95 ml-0 sm:ml-2 flex items-center justify-center gap-2 text-xs">
                      Analyze <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
                 <span className="font-ui text-[9px] text-white/40 pl-5 uppercase tracking-widest font-semibold flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-[#98cc67] shadow-[0_0_6px_rgba(152,204,103,1)]"></span>
                   B2P Intelligence Live • Strict Confidentiality Enforced
                 </span>
              </div>
           </div>
        </div>

        {/* Logo Bar */}
        <div className="border-dashed border-2 border-neutral-300 flex justify-between items-center p-4 rounded bg-black/5">
           <span>Logos / Spotlight Deals</span>
           <div className="flex gap-2">
             <div className="w-8 h-4 bg-black/20 rounded" />
             <div className="w-8 h-4 bg-black/20 rounded" />
             <div className="w-8 h-4 bg-black/20 rounded" />
           </div>
        </div>

        {/* 2x2 Grid (The 4 Spokes) */}
        <div className="border-dashed border-2 border-neutral-300 p-5 rounded bg-black/5 space-y-4">
           <span className="flex items-center gap-2 text-neutral-800"><Columns3 className="w-4 h-4" /> The 4 Spokes</span>
           <div className="grid grid-cols-2 gap-4">
             <div className="h-16 bg-black/10 border border-white/50 rounded flex items-center justify-center shadow-sm text-neutral-800">M&A</div>
             <div className="h-16 bg-black/10 border border-white/50 rounded flex items-center justify-center shadow-sm text-neutral-800">Lending</div>
             <div className="h-16 bg-black/10 border border-white/50 rounded flex items-center justify-center shadow-sm text-neutral-800">Wealth</div>
             <div className="h-16 bg-black/10 border border-white/50 rounded flex items-center justify-center shadow-sm text-neutral-800">Treasury</div>
           </div>
        </div>

        {/* The Guide */}
        <div className="border-dashed border-2 border-neutral-300 flex items-center p-6 rounded bg-black/5 gap-4">
           <div className="w-12 h-12 rounded-full bg-black/10 shrink-0 flex items-center justify-center"><Fingerprint className="w-5 h-5 text-black/50" /></div>
           <div className="space-y-2 w-full">
             <span className="text-neutral-800 tracking-widest">The Guide: Executive Experience</span>
             <div className="w-full h-2 bg-black/20 rounded" />
             <div className="w-5/6 h-2 bg-black/20 rounded" />
           </div>
        </div>

        {/* The Stakes */}
        <div className="border-dashed border-2 border-[#dc2626]/40 flex flex-col items-center justify-center p-6 rounded bg-[#dc2626]/5 gap-2">
           <span className="text-[#dc2626] font-bold flex items-center gap-2 tracking-widest"><Swords className="w-4 h-4" /> The Stakes: Legacy M&A Failure</span>
           <div className="w-2/3 h-2 bg-[#dc2626]/30 rounded mt-1" />
           <div className="w-1/2 h-2 bg-[#dc2626]/30 rounded" />
        </div>

        {/* Final CTA */}
        <div className="border-dashed border-2 border-primary/40 flex flex-col items-center justify-center p-6 rounded bg-primary/5 gap-3 transition-colors hover:bg-primary/10">
           <span className="text-primary font-bold tracking-widest">The Final Call To Action</span>
           <div className="w-3/4 h-2 bg-primary/20 rounded mb-1" />
           <div className="bg-primary text-white px-5 py-2.5 rounded flex items-center gap-2 shadow-md">
             <MousePointerClick className="w-4 h-4" /> Start Assessment
           </div>
        </div>

      </div>
    </div>
  );
}
