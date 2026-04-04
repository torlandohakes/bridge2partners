import { PenTool } from "lucide-react";

export function WireframeSpokePage() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6 flex-1 flex flex-col">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10 shrink-0">Wireframe 2: The Spoke Page (System 2 Deep Dive)</h4>
      
      <div className="bg-neutral/5 rounded-lg p-4 space-y-4 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold flex-1">
        {/* Left Aligned Hero */}
        <div className="border-dashed border-2 border-neutral-300 flex flex-col items-start p-6 rounded bg-black/5 gap-2">
           <span className="text-neutral-800">Spoke Narrative Hook (H1)</span>
           <div className="w-2/3 h-5 bg-black/10 rounded" />
           <div className="w-1/2 h-5 bg-black/10 rounded" />
        </div>

        {/* Sidebar Layout */}
        <div className="flex gap-4">
          <div className="w-1/3 border-dashed border-2 border-neutral-300 p-4 rounded bg-black/5 flex flex-col gap-3">
            <span className="text-neutral-800 leading-tight">Core Competencies<br/>(Planning, Testing)</span>
            <div className="w-full h-2 bg-black/10 rounded" />
            <div className="w-full h-2 bg-black/10 rounded" />
            <div className="w-full h-2 bg-black/10 rounded" />
          </div>
          <div className="w-2/3 border-dashed border-2 border-neutral-300 p-4 rounded bg-black/5 flex flex-col gap-3">
            <span className="text-neutral-800 flex items-center gap-1"><PenTool className="w-3 h-3" /> Deep-Dive Case Study & Data</span>
            <div className="flex gap-2">
               <span className="font-data text-secondary text-sm font-bold tracking-widest">34.2%</span>
               <span className="font-data text-secondary text-sm font-bold tracking-widest">12X ROI</span>
            </div>
            <div className="w-full h-1 bg-black/10 rounded mt-2" />
            <div className="w-full h-1 bg-black/10 rounded" />
            <div className="w-4/5 h-1 bg-black/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
