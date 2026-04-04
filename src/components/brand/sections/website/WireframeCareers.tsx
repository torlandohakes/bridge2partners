import { Rocket, Heart, TrendingUp, Briefcase } from "lucide-react";

export function WireframeCareers() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex flex-col">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 7: The Talent Engine (Careers)</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-[10px] text-neutral/50 uppercase tracking-widest flex-1 flex flex-col">
        {/* Top Hero */}
        <div className="border-dashed border-2 border-white flex items-center justify-center p-6 rounded bg-black/5 shrink-0">
           <span className="opacity-60 flex items-center gap-2 text-[12px]"><Rocket className="w-4 h-4" /> Build the Future of Banking</span>
        </div>

        {/* Middle Block Split */}
        <div className="flex gap-4">
           <div className="flex-1 border-dashed border-2 border-white rounded bg-black/5 p-4 flex flex-col items-center justify-center text-center gap-2">
              <Heart className="w-4 h-4 opacity-40 shrink-0" />
              <span className="opacity-50">Culture & Values</span>
           </div>
           <div className="flex-1 border-dashed border-2 border-white rounded bg-black/5 p-4 flex flex-col items-center justify-center text-center gap-2">
              <TrendingUp className="w-4 h-4 opacity-40 shrink-0" />
              <span className="opacity-50">Benefits & Growth</span>
           </div>
        </div>

        {/* Bottom Block (Open Roles) */}
        <div className="border-dashed border-2 border-white p-4 rounded bg-black/5 flex-1 flex flex-col space-y-3 justify-center">
           <span className="opacity-60 flex items-center gap-1.5 border-b border-black/10 pb-2"><Briefcase className="w-3 h-3" /> Open Roles Array</span>
           {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between bg-black/5 rounded p-3">
                 <div className="space-y-1.5">
                    <div className="w-24 h-2 bg-black/20 rounded" />
                    <div className="w-16 h-1.5 bg-black/10 rounded" />
                 </div>
                 <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded flex items-center font-sans tracking-normal text-xs font-semibold">
                    Apply
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
}
