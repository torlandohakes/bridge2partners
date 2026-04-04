import { MousePointerClick, Columns3, Fingerprint, Swords } from "lucide-react";

export function WireframeHomepage() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 1: The Homepage (Category Entry Point)</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 space-y-4 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold">
        {/* Hero Block */}
        <div className="border-dashed border-2 border-neutral-300 flex flex-col items-center justify-center p-6 rounded bg-black/5 gap-3 transition-colors hover:bg-black/10">
           <div className="w-3/4 h-6 bg-black/10 rounded" />
           <div className="w-1/2 h-3 bg-black/10 rounded" />
           <div className="flex items-center gap-2 mt-2">
             <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded flex items-center gap-2 shadow-sm">
               <MousePointerClick className="w-4 h-4" /> Primary CTA
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
           <div className="bg-primary text-white border border-primary-dark px-5 py-2.5 rounded flex items-center gap-2 shadow-md">
             <MousePointerClick className="w-4 h-4" /> Start Assessment
           </div>
        </div>

      </div>
    </div>
  );
}
