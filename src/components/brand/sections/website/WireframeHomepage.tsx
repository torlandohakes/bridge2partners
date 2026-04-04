import { MousePointerClick, Columns3, Fingerprint, Swords } from "lucide-react";

export function WireframeHomepage() {
  return (
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
  );
}
