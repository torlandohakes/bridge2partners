import { AlignLeft } from "lucide-react";

export function WireframeTextPost() {
  return (
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
  );
}
