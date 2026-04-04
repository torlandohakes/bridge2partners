"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Layers, ChevronLeft, ChevronRight } from "lucide-react";

export function WireframeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      title: "The Dwell Time King",
      body: "In 2026, PDF Carousels are the single highest-performing asset class on LinkedIn. Every swipe is calculated by the algorithm as high-intent engagement, creating massive reach multipliers."
    },
    {
      title: "The 5-7 Slide Rule",
      body: "Under 3 slides fails to trigger the Dwell Time algorithm. Over 8 slides causes a 60% viewer drop-off. Keep it punchy, dense, and exactly 5 to 7 slides long."
    },
    {
      title: "High-Signal Visuals",
      body: "Do not use walls of text. Use our font-display (Montserrat) for massive headers, and font-data (Barlow) for single, high-contrast data points."
    },
    {
      title: "Zero-Click Value",
      body: "Never tease an insight and say 'link in comments.' Deliver the entire framework directly inside these slides to maximize platform retention."
    },
    {
      title: "The Algorithmic CTA",
      body: "The final slide must explicitly direct the executive on what to do next. Route them to our interactive Gap Analysis tool, not a generic contact form."
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl border border-neutral/10 p-6 md:p-8 shadow-sm space-y-6">
      <h4 className="font-ui font-bold text-primary tracking-tight pb-3 border-b border-neutral/10 flex items-center gap-2 text-base">
        <Layers className="w-5 h-5 shrink-0" /> Wireframe 4: Deep-Dive Carousel (Interactive)
      </h4>
      
      <div className="bg-neutral/5 rounded-xl p-6 min-h-[440px] flex flex-col justify-center border-dashed border-2 border-white shadow-inner">
         
         {/* The Carousel Stage */}
         <div className="bg-[#0a110f] min-h-[280px] relative rounded-xl border border-black/10 shadow-lg flex flex-col items-center justify-center p-8 overflow-hidden group">
            {/* Ambient Light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#98cc67]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Navigation Left */}
            <button 
               onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
               disabled={currentSlide === 0}
               className="absolute left-4 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98cc67] shadow-lg"
               aria-label="Previous Slide"
            >
               <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Slide Content */}
            <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xs transition-all duration-300">
               <h5 className="font-display text-secondary text-xl md:text-2xl font-bold tracking-tight drop-shadow-md">
                  {carouselSlides[currentSlide].title}
               </h5>
               <p className="font-sans text-neutral-200 leading-relaxed text-sm">
                  {carouselSlides[currentSlide].body}
               </p>
            </div>

            {/* Navigation Right */}
            <button 
               onClick={() => setCurrentSlide(prev => Math.min(carouselSlides.length - 1, prev + 1))}
               disabled={currentSlide === carouselSlides.length - 1}
               className="absolute right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98cc67] shadow-lg"
               aria-label="Next Slide"
            >
               <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 flex items-center gap-2 z-20">
               {carouselSlides.map((_, idx) => (
                  <div 
                     key={idx} 
                     className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx === currentSlide ? "bg-[#98cc67] w-6 shadow-[0_0_8px_rgba(152,204,103,0.8)]" : "bg-white/30 w-1.5"
                     )}
                  />
               ))}
            </div>

         </div>
         
         <div className="text-center mt-6 text-sm text-neutral/70 font-medium">
            Interactive Preview: Click to cycle through 2026 Algorithmic Frameworks.
         </div>
      </div>
    </div>
  );
}
