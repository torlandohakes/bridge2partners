import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#001b15] selection:bg-primary/30 flex flex-col">
      <div 
        className="relative flex flex-col min-h-screen flex-1"
        style={{ 
          backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'top',
          backgroundAttachment: 'fixed'
        }}
      >
         {/* Contrast Overlay (Gradient) */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#001b15]/90 via-[#001b15]/50 to-transparent backdrop-blur-[1px]" />
         <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#001b15] via-[#001b15]/50 to-transparent pointer-events-none" />
         
         {/* Header Nav */}
         <div className="relative z-50 w-full flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 pt-8 pb-4 gap-6 sm:gap-0">
            <Link href="/">
              <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={200} height={40} className="w-auto h-8 md:h-10 object-contain" />
            </Link>
            <div className="flex items-center gap-6 md:gap-8 font-ui text-sm font-medium text-white/90">
              <div className="relative group hidden md:block">
                <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-4">Services <ChevronDown className="w-4 h-4 opacity-60 transition-transform group-hover:rotate-180" /></span>
                <div className="absolute top-[85%] left-0 mt-1 w-52 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 flex flex-col p-2">
                  {['M&A Integration', 'Commercial Lending', 'Wealth Management', 'Treasury Solutions'].map(vertical => (
                    <span key={vertical} className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors text-sm font-medium tracking-normal normal-case">
                      {vertical}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden md:block cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-4">Compliance Docs</span>
              <Link href="/brand" className="hidden sm:block text-white/60 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10">
                Design System
              </Link>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md transition-colors shadow-sm font-semibold tracking-wide normal-case cursor-pointer">
                Schedule analysis
              </button>
            </div>
         </div>

         {/* Hero Content Body */}
         <div className="relative z-10 flex flex-col items-start justify-center flex-1 px-6 md:px-12 w-full max-w-5xl gap-6 md:gap-8 min-h-[40vh] mt-4 md:mt-12">
           <span className="font-ui text-xs sm:text-sm text-white/70 uppercase tracking-widest font-bold">For Banking Executives Facing Disruption</span>
           
           <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] tracking-tight normal-case drop-shadow-md">
             Innovate now.<br/>Future Proof Your Bank.
           </h1>
           
           <div className="flex flex-wrap items-center gap-4 mt-2">
             <button className="bg-primary hover:bg-primary/90 text-white font-ui text-base font-semibold px-8 py-4 rounded-md shadow-xl transition-all normal-case tracking-normal cursor-pointer w-full sm:w-auto">
               Digital Transformation
             </button>
             <button className="bg-transparent hover:bg-white/10 text-white font-ui text-base font-semibold border border-white/40 px-8 py-4 rounded-md shadow-sm transition-all backdrop-blur-sm normal-case tracking-normal cursor-pointer w-full sm:w-auto">
               Schedule analysis
             </button>
           </div>
         </div>

         {/* Glassmorphic AI Prompt Pill */}
         <div className="relative z-20 w-full px-6 md:px-12 pb-12 md:pb-16 flex flex-col justify-start mt-auto">
            <div className="w-full flex flex-col gap-3">
               <label className="font-ui text-xs sm:text-sm text-white/80 font-medium pl-6 drop-shadow tracking-wide">
                 What challenges are you facing in your role? <span className="text-white font-bold ml-1">Ask B2P Intelligence.</span>
               </label>
               <div className="relative w-full flex flex-col sm:flex-row items-center bg-white/5 backdrop-blur-[12px] border border-white/20 rounded-3xl sm:rounded-full shadow-2xl overflow-hidden p-2 group transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <div className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center bg-white/10 rounded-full ml-1 backdrop-blur-md border border-white/10 shadow-inner">
                     <BrainCircuit className="w-5 h-5 text-white/90" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="E.g., How do we structure a post-merger integration framework?" 
                    className="flex-1 w-full bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 sm:px-6 py-4 sm:py-3 font-ui text-sm sm:text-base h-full focus:outline-none focus:ring-0"
                  />
                  <button className="w-full sm:w-auto h-full sm:min-h-[48px] bg-white text-[#001b15] px-8 py-3 sm:py-0 rounded-2xl sm:rounded-full transition-transform font-bold shadow-md hover:scale-[1.02] active:scale-95 ml-0 sm:ml-2 flex items-center justify-center gap-2">
                    Analyze <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               <span className="font-ui text-[10px] sm:text-[11px] text-white/50 pl-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                 <strong className="flex items-center gap-1.5 uppercase tracking-widest text-[#98cc67] whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[#98cc67] shadow-[0_0_8px_rgba(152,204,103,1)]"></span>B2P Intelligence</strong>
                 <span className="opacity-80 leading-snug">Modeled directly on internal M&A experts. AI can hallucinate; always verify critical structural decisions.</span>
               </span>
            </div>
         </div>
      </div>
    </div>
  );
}
