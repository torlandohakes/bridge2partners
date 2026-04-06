import { ShieldCheck, Server, Code, TableProperties } from "lucide-react";

export function WireframeProcurement() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 4: Procurement Page</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 space-y-5 font-mono text-xs text-neutral-700 uppercase tracking-wider font-semibold">
        {/* Top Block */}
        <div className="border-dashed border-2 border-neutral-300 flex items-center justify-between p-4 rounded bg-black/5">
           <span className="text-neutral-900 flex items-center gap-2"><ShieldCheck className="w-4 h-4 shrink-0" /> Vendor Compliance & Infosec</span>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-3 gap-3">
           <div className="border-dashed border-2 border-neutral-300 flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
              <Server className="w-4 h-4 text-neutral-700 shrink-0" />
              <span className="text-neutral-800">AFS/FIS Integration</span>
              <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">REST/SOAP</span>
           </div>
           <div className="border-dashed border-2 border-neutral-300 flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
              <ShieldCheck className="w-4 h-4 text-neutral-700 shrink-0" />
              <span className="text-neutral-800">SOC2/Compliance</span>
              <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">TYPE II</span>
           </div>
           <div className="border-dashed border-2 border-neutral-300 flex flex-col items-center justify-center p-4 rounded bg-black/5 gap-2 text-center">
              <Code className="w-4 h-4 text-neutral-700 shrink-0" />
              <span className="text-neutral-800">Testing Arch</span>
              <span className="font-data text-secondary tracking-widest bg-black/5 px-1 py-0.5 mt-1">CI/CD</span>
           </div>
        </div>

        {/* Bottom Block */}
        <div className="border-dashed border-2 border-neutral-300 flex flex-col p-4 rounded bg-black/5 gap-3">
           <span className="text-neutral-900 flex items-center gap-1.5"><TableProperties className="w-3 h-3 shrink-0" /> Tech Stack Compatibility Matrix</span>
           <div className="space-y-1">
             <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
             <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
             <div className="w-full h-4 border border-black/10 bg-black/5 rounded" />
           </div>
        </div>
      </div>
    </div>
  );
}
