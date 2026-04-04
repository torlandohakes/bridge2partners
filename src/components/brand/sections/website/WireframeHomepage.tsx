import { MousePointerClick, Columns3, Fingerprint, Swords, ChevronDown } from "lucide-react";
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
           <div className="absolute inset-0 bg-gradient-to-r from-[#001b15]/90 via-[#001b15]/50 to-transparent" />
           <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#001b15] via-[#001b15]/50 to-transparent pointer-events-none" />
           
           {/* Mock Header Nav */}
           <div className="relative z-10 w-full flex items-center justify-between px-6 pt-6 pb-4">
              <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={180} height={40} className="w-auto h-6 object-contain" />
              <div className="hidden sm:flex items-center gap-6 font-ui text-xs font-medium text-white/90">
                <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case">Services <ChevronDown className="w-3 h-3 opacity-60" /></span>
                <span className="cursor-pointer hover:text-white transition-colors tracking-normal normal-case">Compliance Docs</span>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md transition-colors shadow-sm font-semibold tracking-wide normal-case">
                  Schedule analysis
                </button>
              </div>
           </div>

           {/* Hero Content Body */}
           <div className="relative z-10 flex flex-col items-start justify-center flex-1 px-8 py-12 w-full max-w-3xl gap-4">
             <span className="font-ui text-[11px] sm:text-xs text-white/70 uppercase tracking-widest font-bold">For Banking Executives Facing Disruption</span>
             
             <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-[1.1] tracking-tight normal-case">
               Innovate now.<br/>Future Proof Your Bank.
             </h1>
             
             <div className="flex flex-wrap items-center gap-4 mt-4">
               <button className="bg-primary hover:bg-primary/90 text-white font-ui text-sm font-semibold px-6 py-3 rounded-md shadow-xl transition-all normal-case tracking-normal">
                 Digital Transformation
               </button>
               <button className="bg-transparent hover:bg-white/10 text-white font-ui text-sm font-semibold border border-white/40 px-6 py-3 rounded-md shadow-sm transition-all backdrop-blur-sm normal-case tracking-normal">
                 Schedule analysis
               </button>
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
