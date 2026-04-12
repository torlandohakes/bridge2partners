import Link from "next/link";
import { ArrowLeft, Mail, Phone, ExternalLink } from "lucide-react";

export default function DigitalCardPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[#001b15] text-white flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-sm mb-6">
        <Link href="/team" className="inline-flex items-center text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Team
        </Link>
      </div>

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[2rem] p-8 pt-16 relative overflow-hidden backdrop-blur-md shadow-2xl mt-12">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#00573f] to-[#001b15] -z-10" />
        
        <div className="w-28 h-28 mx-auto -mt-28 mb-6 rounded-full bg-[#000d0a] border-4 border-[#001b15] shadow-xl flex items-center justify-center overflow-hidden">
          <span className="text-xs text-white/50 text-center block">[Portrait]</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white capitalize">{params.id}</h1>
          <p className="text-[#98cc67] font-ui font-medium uppercase tracking-widest text-xs mt-2">Partner & Executive</p>
          <p className="text-white/60 font-reading mt-6 text-sm leading-relaxed">
            [Bio Wireframe] Dedicated to bridging the gap between legacy systems and modern capabilities. Operational excellence via AI.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-[#98cc67] hover:bg-[#85b558] text-[#001b15] font-bold py-4 rounded-xl transition-colors flex items-center justify-center">
            <ExternalLink className="w-5 h-5 mr-2" />
            Save to Contacts (vCard)
          </button>
          
          <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2" />
            Email {params.id}
          </button>
        </div>
      </div>
    </main>
  );
}
