import { Database, BarChart3 } from "lucide-react";

export function WireframeGapAnalysis() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex-1 flex flex-col">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 3: The Gap Analysis Tool</h4>
      
      <div className="bg-neutral/5 rounded-lg p-6 space-y-6 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold flex flex-col justify-center flex-1 overflow-hidden">
        {/* Central Interactive Card */}
        <div className="bg-white/80 shadow-xl border border-black/5 rounded-lg mx-auto w-full max-w-[95%] p-4 space-y-5">
           <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="text-neutral-900 flex items-center gap-1 truncate"><Database className="w-3 h-3 shrink-0" /> Assessment Interface</span>
              <span className="bg-black/5 px-2 py-0.5 rounded shrink-0 leading-none">Step 2 of 4</span>
           </div>

           {/* Sliders/Inputs */}
           <div className="space-y-4">
             <div>
               <span className="text-neutral-700">Variable Input A</span>
               <div className="w-full h-1.5 bg-black/10 rounded mt-1 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white border-2 border-[#98cc67] rounded-full shadow-sm -ml-1.5" />
                  <div className="h-full bg-gradient-to-r from-transparent to-[#98cc67]/30 rounded w-1/3" />
               </div>
             </div>
             <div>
               <span className="text-neutral-700">Variable Input B</span>
               <div className="w-full h-1.5 bg-black/10 rounded mt-1 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-3 h-3 bg-white border-2 border-[#98cc67] rounded-full shadow-sm -ml-1.5" />
                  <div className="h-full bg-gradient-to-r from-transparent to-[#98cc67]/30 rounded w-2/3" />
               </div>
             </div>
           </div>

           {/* Results Output Block */}
           <div className="bg-[#98cc67]/10 border border-[#98cc67]/30 rounded p-4 flex flex-col items-center justify-center gap-1 mt-4 transition-all text-center">
              <BarChart3 className="w-5 h-5 text-[#98cc67] mb-1" />
              <span className="text-[#98cc67] font-bold opacity-80">Dynamic Results / ROI Output</span>
              <span className="font-data text-[#98cc67] font-bold text-lg leading-none">$1.4M Projected</span>
           </div>
        </div>
      </div>
    </div>
  );
}
