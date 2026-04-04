import { ImageIcon } from "lucide-react";

export function WireframeStatCard() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
        <ImageIcon className="w-5 h-5 shrink-0" /> Wireframe 2: Stat Card
      </h4>
      
      <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col">
         <div className="border-dashed border-2 border-white bg-black/5 rounded-lg p-6 md:p-8 flex flex-col gap-6 h-full font-sans">
            <div className="space-y-4">
               <div className="space-y-2">
                  <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">1. The Narrative Hook</span>
                  <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                     <strong className="text-primary opacity-80">Context Rule:</strong> Set up the exact data variable in 1 line. E.g. "M&A valuations drop rapidly during integration friction."
                  </span>
                  <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                     <strong className="text-primary opacity-80">OCR Synergy Rule:</strong> LinkedIn's AI reads image text. The text inside the graphic MUST share exact keywords with the post's body copy to trigger the relevance multiplier.
                  </span>
                  <div className="pt-3 pb-1">
                     <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                  </div>
               </div>
            </div>
            
            {/* Media Block Simulation */}
            <div className="w-full flex-1 bg-[#0a110f] border border-black/10 rounded-xl relative flex flex-col items-center justify-center p-8 mt-1 shadow-inner overflow-hidden">
                {/* Ambient Light Rings */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#98cc67]/10 rounded-full blur-3xl" />

                {/* Exact Visual Directive */}
                <div className="relative z-10 text-xs text-white/80 font-medium text-center leading-relaxed">
                   <strong className="text-white">Visual Rule:</strong> Eliminate complex charts. Emphasize one massive data point inside a glassmorphic container over a cool-toned background.
                </div>
                
                {/* Glass Component Simulation */}
                <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 mt-6 flex flex-col items-center gap-1 relative z-20">
                   <span className="font-ui text-white/80 text-[10px] tracking-widest uppercase font-bold text-center">Integration Speed</span>
                   <span className="text-[#98cc67] font-data text-5xl font-bold tracking-tighter drop-shadow-[0_0_12px_rgba(152,204,103,0.3)]">4.2x</span>
                </div>
            </div>

            {/* Alt-Text Rule (Evicted from dark block) */}
            <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-md text-xs font-bold text-center leading-snug shadow-sm">
               ALGORITHM RULE: Images without custom Alt-Text are actively penalized. You must write descriptive Alt-Text.
            </div>

            <div className="border-t border-black/10 pt-5 mt-4 space-y-3">
               <span className="text-sm font-bold text-neutral uppercase tracking-widest opacity-80">2. The Comment CTA</span>
               <div className="bg-white/50 p-4 border border-black/5 rounded-md text-sm leading-relaxed text-neutral shadow-sm space-y-3">
                  <span className="block">
                     <strong className="text-[#dc2626] bg-[#dc2626]/5 px-2 py-0.5 rounded mr-1">Spam Trap:</strong> Generic questions ('Thoughts?') are flagged as engagement bait. Demand a highly specific, technical perspective.
                  </span>
                  <div className="border-l-2 border-primary/40 pl-3 py-2 italic text-neutral/70 font-medium bg-neutral/5 rounded-r">
                     "Where does your legacy tech stack break down during the initial 90-day PMI window?"
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
