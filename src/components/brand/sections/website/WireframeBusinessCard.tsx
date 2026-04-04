import { Smartphone, UserCircle, Download, Mail, Phone, Globe } from "lucide-react";

export function WireframeBusinessCard() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-2 border-b border-neutral/10">Wireframe 6: The Digital Business Card (Mobile-First)</h4>
      
      <div className="bg-neutral/5 rounded-lg p-5 flex items-center justify-center h-[500px]">
         {/* Mobile Container */}
         <div className="w-full max-w-[260px] h-full max-h-[460px] bg-white shadow-md border border-neutral/10 rounded-[2rem] overflow-hidden flex flex-col font-mono text-[10px] text-neutral/50 uppercase tracking-widest relative pb-6 border-b-[6px] border-neutral/20 border-x-4">
           
           {/* Top Banner & Profile */}
           <div className="h-20 bg-black/5 w-full relative shrink-0">
              <span className="absolute top-3 left-3 opacity-30 flex items-center gap-1"><Smartphone className="w-3 h-3" /> Mobile</span>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full p-1 shadow-sm">
                 <div className="w-full h-full bg-black/10 rounded-full flex items-center justify-center">
                   <UserCircle className="w-6 h-6 opacity-30" />
                 </div>
              </div>
           </div>

           {/* Identity Block */}
           <div className="mt-10 flex flex-col items-center px-6 gap-2 shrink-0">
              <div className="w-2/3 h-3 bg-black/20 rounded shrink-0" />
              <div className="w-1/2 h-2 bg-black/10 rounded shrink-0" />
              
              <div className="flex border border-black/10 bg-black/5 px-4 py-2 mt-2 w-full justify-center items-center gap-2 rounded text-[9px] hover:bg-black/10 transition-colors">
                <Download className="w-3 h-3" /> Save Contact / VCard
              </div>
           </div>

           {/* Interaction Rail */}
           <div className="flex justify-center gap-3 mt-4 border-y border-black/5 py-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Mail className="w-4 h-4 opacity-50" /></div>
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Phone className="w-4 h-4 opacity-50" /></div>
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"><Globe className="w-4 h-4 opacity-50" /></div>
           </div>

           {/* Footer Menu */}
           <div className="px-5 space-y-2 mt-4 shrink-0 flex-1 flex flex-col pb-4 h-full overflow-hidden justify-end">
              <span className="opacity-40 mb-1">4 Core Spokes</span>
              <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">M&A Integration</span></div>
              <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">Commercial Lending</span></div>
              <div className="w-full min-h-[30px] bg-black/5 rounded flex items-center px-4"><span className="opacity-50">Wealth & Treasury</span></div>
           </div>
         </div>
      </div>
    </div>
  );
}
