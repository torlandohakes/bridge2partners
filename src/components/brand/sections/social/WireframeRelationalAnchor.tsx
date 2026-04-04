import { Users } from "lucide-react";

export function WireframeRelationalAnchor() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
        <Users className="w-5 h-5 shrink-0" /> Wireframe 3: The Relational Anchor
      </h4>
      
      <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col">
         <div className="border-dashed border-2 border-white bg-black/5 rounded-lg p-6 md:p-8 flex flex-col gap-6 h-full font-sans">
            <div className="space-y-2">
               <span className="text-sm opacity-80 font-bold block uppercase tracking-widest text-neutral">1. The Anti-Corporate Hook</span>
               <span className="text-sm text-neutral/80 font-medium leading-relaxed block">
                  <strong className="text-primary opacity-80">Context Rule:</strong> Banish "We are thrilled to announce..." Start with a candid observation, an inside joke, or a real human moment.
               </span>
               <div className="pt-3 pb-1 flex flex-col gap-3">
                  <div className="border-b-2 border-dashed border-neutral/30 w-full" />
                  <div className="border-b-2 border-dashed border-neutral/30 w-3/4" />
               </div>
            </div>
            
            {/* Media Block Simulation */}
            <div className="w-full h-64 bg-neutral/10 border border-black/10 rounded-xl relative flex flex-col items-center justify-center p-6 mt-1 shadow-inner overflow-hidden">
                {/* Organic visual placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#98cc67]/5 to-primary/5" />
                
                {/* Abstract People Illustration */}
                <div className="absolute bottom-0 left-0 w-full flex items-end justify-center gap-4 sm:gap-6 opacity-30 pointer-events-none mix-blend-multiply">
                   <div className="flex flex-col items-center translate-y-4 scale-90">
                      <div className="w-14 h-14 rounded-full bg-primary" />
                      <div className="w-24 h-28 rounded-t-[3rem] bg-primary mt-2" />
                   </div>
                   <div className="flex flex-col items-center -translate-y-2 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-neutral" />
                      <div className="w-28 h-32 rounded-t-[3rem] bg-neutral mt-2" />
                   </div>
                   <div className="flex flex-col items-center translate-y-6 scale-75">
                      <div className="w-14 h-14 rounded-full bg-[#98cc67]" />
                      <div className="w-24 h-24 rounded-t-[3rem] bg-[#98cc67] mt-2" />
                   </div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-4 text-center mt-auto pb-2">
                   <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-sm border border-neutral/10">
                      <span className="text-[10px] sm:text-xs font-bold text-neutral/80 uppercase tracking-widest">Visual: Organic Team Photo</span>
                   </div>
                   
                   <div className="bg-yellow-100/90 text-yellow-800 border border-yellow-500/30 px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md backdrop-blur-md max-w-[95%]">
                      BRAND RULE: Apply a subtle 10% cool-tone to the photo. It must look organic, but still belong in our color universe.
                   </div>
                </div>
            </div>

            {/* Red Algorithmic Badge */}
            <div className="bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-md text-xs font-bold text-center leading-snug shadow-sm">
               ALGORITHM RULE: The AI explicitly detects faces. Photos with 2+ unpolished human faces get a 3x reach multiplier. DO NOT USE STOCK IMAGERY.
            </div>

            <div className="border-t border-black/10 pt-5 mt-4 space-y-3">
               <span className="text-sm font-bold text-neutral uppercase tracking-widest opacity-80">2. The Tagging Strategy</span>
               <div className="bg-white/50 p-4 border border-black/5 rounded-md text-sm leading-relaxed text-neutral shadow-sm space-y-3">
                  <span className="block">
                     <strong className="text-[#dc2626] bg-[#dc2626]/5 px-2 py-0.5 rounded mr-1">Spam Trap:</strong> Never mass-tag the entire company.
                  </span>
                  <div className="border-l-2 border-primary/40 pl-3 py-2 text-neutral/70 font-medium">
                     Strictly limit tags to <strong className="font-bold text-neutral">3-5 people pictured.</strong> If tagged individuals do not comment in the first "Golden Hour," the algorithm severely penalizes the post reach.
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
