import { Users, ImageIcon } from "lucide-react";

export function WireframeTeam() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex flex-col">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 5: The Institutional Team Page</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold flex-1 flex flex-col">
        <div className="border-dashed border-2 border-neutral-300 flex items-center justify-center p-4 rounded bg-black/5 shrink-0">
           <span className="text-neutral-900 flex items-center gap-2"><Users className="w-4 h-4 shrink-0" /> The Pedigree: Executive Leadership</span>
        </div>

        {/* 3x3 Grid Sim (Row) */}
        <div className="grid grid-cols-3 gap-4 flex-1">
           {[1, 2, 3].map((i) => (
             <div key={i} className="border-dashed border-2 border-neutral-300 rounded bg-black/5 flex flex-col p-3 gap-3 h-full">
                <div className="w-full aspect-square bg-black/10 flex items-center justify-center rounded shrink-0">
                   <div className="flex flex-col items-center gap-1 px-1">
                     <ImageIcon className="w-5 h-5 opacity-30" />
                     <span className="text-[7px] text-neutral-700 leading-[8px] text-center">Enforce Grayscale Filter</span>
                   </div>
                </div>
                <div className="space-y-2 flex flex-col items-center flex-1 justify-end">
                   <div className="w-3/4 h-2 bg-black/20 rounded" />
                   <div className="w-1/2 h-1.5 bg-black/10 rounded" />
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
