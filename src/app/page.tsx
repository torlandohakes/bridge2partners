import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#001b15] selection:bg-primary/30">
      <div 
        className="relative flex flex-col min-h-screen"
        style={{ 
          backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
         {/* Contrast Overlay (Gradient) */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#001b15]/90 via-[#001b15]/50 to-transparent" />
         <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#001b15] via-[#001b15]/50 to-transparent pointer-events-none" />
         
         {/* Header Nav */}
         <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 pt-8 pb-4 gap-6 sm:gap-0">
            <Link href="/">
              <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={200} height={40} className="w-auto h-8 md:h-10 object-contain" />
            </Link>
            <div className="flex items-center gap-6 md:gap-8 font-ui text-sm font-medium text-white/90">
              <span className="hidden md:flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case">Services <ChevronDown className="w-4 h-4 opacity-60" /></span>
              <span className="hidden md:block cursor-pointer hover:text-white transition-colors tracking-normal normal-case">Compliance Docs</span>
              <Link href="/brand" className="hidden sm:block text-white/60 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                Design System
              </Link>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md transition-colors shadow-sm font-semibold tracking-wide normal-case cursor-pointer">
                Schedule analysis
              </button>
            </div>
         </div>

         {/* Hero Content Body */}
         <div className="relative z-10 flex flex-col items-start justify-center flex-1 px-6 md:px-12 w-full max-w-5xl gap-6 md:gap-8 pb-24 md:pb-32">
           <span className="font-ui text-xs sm:text-sm text-white/70 uppercase tracking-widest font-bold">For Banking Executives Facing Disruption</span>
           
           <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.05] tracking-tight normal-case drop-shadow-md">
             Innovate now.<br/>Future Proof Your Bank.
           </h1>
           
           <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-8">
             <button className="bg-primary hover:bg-primary/90 text-white font-ui text-base font-semibold px-8 py-4 rounded-md shadow-xl transition-all normal-case tracking-normal cursor-pointer w-full sm:w-auto">
               Digital Transformation
             </button>
             <button className="bg-transparent hover:bg-white/10 text-white font-ui text-base font-semibold border border-white/40 px-8 py-4 rounded-md shadow-sm transition-all backdrop-blur-sm normal-case tracking-normal cursor-pointer w-full sm:w-auto">
               Schedule analysis
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}
