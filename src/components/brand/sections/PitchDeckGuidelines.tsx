"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Expand, 
  Shrink, 
  BrainCircuit, 
  Mic, 
  Send, 
  Lightbulb,
  ShieldAlert,
  MessageSquare,
  Network,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const pitchSlides = [
  {
    id: 1,
    title: "The Hook",
    concept: "Name the undeniable reality.",
    speakerNotes: "Do not talk about B2P. Talk about the squeeze between megabanks and agile fintechs.",
    visualRules: "Strict Rule: Max 12 words per slide. Use font-display.",
    aiPersona: "Skeptical Regional Bank EVP",
    aiObjection: "Look, we've integrated three banks in the last five years using legacy methods. It's slow, but it works. Why do I need to change?",
    slideContent: (
      <div className="w-full h-full bg-[#001b15] relative flex flex-col items-center justify-center p-12 overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
         <span className="font-display font-bold text-5xl lg:text-7xl text-white tracking-tight leading-tight text-center">
           The Era of<br/>Slow M&A is Dead.
         </span>
      </div>
    )
  },
  {
    id: 2,
    title: "The Stakes",
    concept: "Polarize the room.",
    speakerNotes: "Frame integration friction as an existential threat to their valuation.",
    visualRules: "Split layout. Dark/Muted vs Luminous Lime highlight.",
    aiPersona: "Conservative CFO",
    aiObjection: "Our current tech debt is manageable. Shifting to a new modular methodology seems like a massive capital expenditure for unproven ROI. How do you justify the initial burn?",
    slideContent: (
      <div className="w-full h-full bg-[#001b15] relative flex overflow-hidden">
         <div className="w-1/2 flex items-center justify-center p-12 border-r border-white/10 bg-black/20">
           <span className="font-display font-medium text-4xl lg:text-5xl text-white/50 text-center leading-tight">Quarters of<br/>Tech Debt.</span>
         </div>
         <div className="w-1/2 flex items-center justify-center p-12 relative overflow-hidden">
           <div className="absolute inset-0 bg-[#98cc67]/10" />
           <span className="font-display font-bold text-4xl lg:text-5xl text-[#98cc67] text-center leading-tight drop-shadow-md z-10">Results in<br/>Weeks.</span>
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "The Reframe",
    concept: "Simplify the Ecosystem.",
    speakerNotes: "Explain that integration fails when treated as an IT problem rather than a systems architecture problem.",
    visualRules: "Clean minimalist hub-and-spoke diagram.",
    aiPersona: "Chief Information Officer",
    aiObjection: "You're oversimplifying. We have 40+ legacy systems tied directly into our core banking platform. A clean 'hub and spoke' is a consultant's pipe dream.",
    slideContent: (
      <div className="w-full h-full bg-[#001b15] relative flex items-center justify-center p-12 overflow-hidden">
         <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            {/* Center Node */}
            <div className="w-40 h-40 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center z-20 backdrop-blur-md shadow-2xl">
              <Network className="w-12 h-12 text-[#98cc67] mb-2" />
              <span className="text-base text-white font-ui font-bold text-center leading-tight tracking-wide">Systems of<br/>Record</span>
            </div>
            {/* Satellites */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
               <span className="text-xs text-white/70 uppercase tracking-widest font-semibold">Lending</span>
            </div>
            <div className="absolute bottom-6 left-0 -translate-x-1/4 w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
               <span className="text-xs text-white/70 uppercase tracking-widest font-semibold">Wealth</span>
            </div>
            <div className="absolute bottom-6 right-0 translate-x-1/4 w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
               <span className="text-xs text-white/70 uppercase tracking-widest font-semibold">Treasury</span>
            </div>
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
              <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
              <line x1="50" y1="50" x2="15" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
              <line x1="50" y1="50" x2="85" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
            </svg>
         </div>
      </div>
    )
  },
  {
    id: 4,
    title: "The Promised Land",
    concept: "The frictionless future state.",
    speakerNotes: "Build massive contrast here to break the problem tension and introduce the Agile Institutional future.",
    visualRules: "Maximum contrast background. Disruptive visual pattern.",
    aiPersona: "Head of Retail Banking",
    aiObjection: "Look, 'Agile' and 'Banking' are oxymorons. Our regulators won't let us be agile. How does this promised land survive compliance?",
    slideContent: (
      <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark relative flex flex-col items-center justify-center p-12 overflow-hidden group">
         <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
         <span className="font-display font-extrabold text-5xl lg:text-7xl text-white tracking-tighter leading-tight text-center drop-shadow-md">
           The Agile<br/>Regional Institution.
         </span>
      </div>
    )
  },
  {
    id: 5,
    title: "The Magic Tools",
    concept: "Introduce B2P Capabilities.",
    speakerNotes: "Position our ex-banker SME experience as the required bridge to the Promised Land. We are operators, not just advisors.",
    visualRules: "4-Column grid representing capability nodes.",
    aiPersona: "Chief Operating Officer",
    aiObjection: "So you're consultants? I have McKinsey telling me they can do this. What actually makes your 'tools' magic compared to standard M&A consulting frameworks?",
    slideContent: (
      <div className="w-full h-full bg-[#001b15] relative flex flex-col items-center justify-center p-16 overflow-hidden">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full">
           <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 relative p-6 shadow-inner">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-[#98cc67]"/></div>
             <span className="text-sm lg:text-base text-white/80 font-ui text-center leading-tight font-medium">Commercial<br/>Lending</span>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 relative p-6 shadow-inner">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-[#98cc67]"/></div>
             <span className="text-sm lg:text-base text-white/80 font-ui text-center leading-tight font-medium">Treasury<br/>Solutions</span>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 relative p-6 shadow-inner">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-[#98cc67]"/></div>
             <span className="text-sm lg:text-base text-white/80 font-ui text-center leading-tight font-medium">Wealth<br/>Management</span>
           </div>
           <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center gap-4 relative p-6 shadow-inner">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-8 h-8 text-[#98cc67]"/></div>
             <span className="text-sm lg:text-base text-white/80 font-ui text-center leading-tight font-medium">Digital<br/>Onboarding</span>
           </div>
         </div>
      </div>
    )
  },
  {
    id: 6,
    title: "The Proof",
    concept: "Validation & Data.",
    speakerNotes: "End with a functional Call to Action—route them to the digital Gap Analysis, not a generic 'Questions?' slide.",
    visualRules: "Massive font-data numerics. Subtle logo anchor strip.",
    aiPersona: "Venture Capital Partner / Board Member",
    aiObjection: "Those are big numbers, but Bank of America has infinite runway. We have 18 months. Has this framework actually worked for a regional player our size?",
    slideContent: (
      <div className="w-full h-full bg-[#001b15] relative flex flex-col items-center justify-between p-12 lg:p-20 overflow-hidden">
         <div className="flex-1 w-full flex items-center justify-between border-b border-white/10 pb-8">
            <div className="flex flex-col items-center flex-1 border-r border-white/10 gap-2">
              <span className="font-data text-6xl lg:text-8xl font-semibold text-white tracking-tight drop-shadow-lg">$250B</span>
              <span className="font-ui text-sm lg:text-base text-[#98cc67] uppercase tracking-widest font-bold drop-shadow">M&A Integration</span>
            </div>
            <div className="flex flex-col items-center flex-1 gap-2">
              <span className="font-data text-6xl lg:text-8xl font-semibold text-white tracking-tight drop-shadow-lg">40+</span>
              <span className="font-ui text-sm lg:text-base text-[#98cc67] uppercase tracking-widest font-bold drop-shadow">Integrations Delivered</span>
            </div>
         </div>
         <div className="w-full h-24 flex items-center justify-center gap-16 pt-8 opacity-40">
            <span className="font-mono text-sm lg:text-base text-white uppercase tracking-widest font-bold">Bank of America</span>
            <span className="font-mono text-sm lg:text-base text-white uppercase tracking-widest font-bold">Wells Fargo</span>
            <span className="font-mono text-sm lg:text-base text-white uppercase tracking-widest font-bold">Chase</span>
         </div>
      </div>
    )
  }
];

export function PitchDeckGuidelines() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarTab, setSidebarTab] = useState<'strategy' | 'roleplay'>('strategy');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeSlide = pitchSlides[currentSlide];

  const handleNext = () => {
    if (currentSlide < pitchSlides.length - 1) setCurrentSlide(prev => prev + 1);
  };
  
  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return (
    <section className="animate-in fade-in duration-500 flex flex-col gap-8 w-full max-w-7xl mx-auto">
      
      {/* Header Context */}
      <div className="border-b border-neutral/10 pb-6 w-full flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Pitch Simulator & AI Roleplay
        </h2>
        <p className="text-base text-neutral-600 font-sans max-w-3xl">
          Abandoning text-heavy brochures in favor of the Evidence-Based Strategic Narrative Framework. 
          Use this module to visualize the 6-slide arc and practice dynamic objections against B2P Intelligence.
        </p>
      </div>

      {/* Simulator Interface */}
      <div className={cn(
        "bg-white/40 backdrop-blur-sm border border-neutral/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300",
        isFullscreen ? "fixed inset-4 z-[100] flex flex-col bg-white shadow-2xl border-none ring-1 ring-black/5" : "flex flex-col lg:flex-row relative min-h-[600px]"
      )}>
        
        {/* Left Stage: 16:9 Slide Viewer (60-70%) */}
        <div className={cn(
          "flex flex-col bg-neutral-100", 
          isFullscreen ? "flex-1" : "w-full lg:w-[65%] border-b lg:border-b-0 lg:border-r border-neutral/10"
        )}>
          {/* Deck Header */}
          <div className="h-14 bg-white border-b border-neutral/10 flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-3">
               <span className="font-ui font-semibold text-neutral-800 text-sm tracking-tight">{activeSlide.title}</span>
               <span className="bg-primary/10 text-primary text-[10px] font-mono px-2 py-0.5 rounded tracking-widest uppercase font-bold">Standard 16:9</span>
             </div>
             {/* Controls */}
             <div className="flex items-center gap-4">
                <span className="text-xs font-ui text-neutral-500 font-medium">Slide {currentSlide + 1} of {pitchSlides.length}</span>
                <div className="flex items-center gap-1 border border-neutral/20 rounded-md overflow-hidden bg-neutral-50">
                   <button onClick={handlePrev} disabled={currentSlide === 0} className="p-1.5 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                     <ChevronLeft className="w-4 h-4 text-neutral-700" />
                   </button>
                   <div className="w-px h-4 bg-neutral/20" />
                   <button onClick={handleNext} disabled={currentSlide === pitchSlides.length - 1} className="p-1.5 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                     <ChevronRight className="w-4 h-4 text-neutral-700" />
                   </button>
                </div>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors bg-white border border-neutral/20 rounded-md shadow-sm">
                   {isFullscreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                </button>
             </div>
          </div>
          
          {/* Active Canvas wrapper */}
          <div className="flex-1 w-full bg-neutral-100/50 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
             {/* Aspect Ratio 16:9 Enforcer */}
             <div className="w-full max-w-full relative shadow-2xl ring-1 ring-black/5" style={{ aspectRatio: '16/9' }}>
                {/* Embedded Slide */}
                <div className="absolute inset-0 bg-[#001b15] overflow-hidden">
                   {/* Custom Slide Internal Padding & Watermark applied to all */}
                   <div className="absolute bottom-4 left-6 text-white/30 text-[10px] font-mono z-20 flex items-center gap-2">
                     <div className="w-3 h-3 bg-primary rounded-sm shadow-sm" /> Bridge2Partners
                   </div>
                   <div className="absolute bottom-4 right-6 text-white/30 text-[10px] font-mono z-20">
                     0{currentSlide + 1} / 0{pitchSlides.length}
                   </div>
                   {/* Core Content */}
                   {activeSlide.slideContent}
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar: Interactive Training Panel (30-40%) */}
        <div className={cn(
          "flex flex-col bg-white",
          isFullscreen ? "h-[300px] shrink-0 border-t border-neutral/10" : "w-full lg:w-[35%] min-w-[320px]"
        )}>
          {/* Glassmorphic Tab Toggle */}
          <div className="h-14 border-b border-neutral/10 px-4 flex items-center justify-center bg-neutral-50/50 shrink-0">
             <div className="bg-neutral-200/60 p-1 rounded-lg w-full flex">
               <button 
                 onClick={() => setSidebarTab('strategy')}
                 className={cn(
                   "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all",
                   sidebarTab === 'strategy' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                 )}
               >
                 <Lightbulb className="w-3.5 h-3.5" /> Strategy
               </button>
               <button 
                 onClick={() => setSidebarTab('roleplay')}
                 className={cn(
                   "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all",
                   sidebarTab === 'roleplay' ? "bg-primary text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                 )}
               >
                 <BrainCircuit className="w-3.5 h-3.5" /> AI Roleplay
               </button>
             </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            
            {/* Strategy Tab */}
            {sidebarTab === 'strategy' && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 
                 <div className="space-y-2 relative">
                   <div className="absolute -left-3 top-2 w-1 h-8 bg-neutral-200 rounded-r-md"></div>
                   <span className="font-ui text-[10px] text-neutral-400 uppercase tracking-widest font-bold">The Concept</span>
                   <p className="font-sans text-neutral-900 font-semibold text-sm leading-snug">
                     {activeSlide.concept}
                   </p>
                 </div>

                 <div className="space-y-3 bg-neutral-50 border border-neutral-100 p-4 rounded-xl">
                   <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-1.5">
                     <MessageSquare className="w-3 h-3" /> Speaker Notes
                   </span>
                   <p className="font-sans text-neutral-700 text-sm leading-relaxed">
                     {activeSlide.speakerNotes}
                   </p>
                 </div>

                 <div className="space-y-3 bg-[#dc2626]/5 border border-[#dc2626]/10 p-4 rounded-xl">
                   <span className="font-ui text-[10px] text-[#dc2626] uppercase tracking-widest font-bold flex items-center gap-1.5">
                     <ShieldAlert className="w-3 h-3" /> Visual Rules
                   </span>
                   <p className="font-mono text-[#dc2626] text-xs leading-relaxed font-semibold">
                     {activeSlide.visualRules}
                   </p>
                 </div>

                 <div className="mt-4 pt-4 border-t border-neutral/10">
                   <p className="text-xs text-neutral-400 font-sans italic">
                     These slides enforce the "No-Read" cognitive mandate. Do not add supplementary text boxes.
                   </p>
                 </div>

              </div>
            )}

            {/* Roleplay Tab */}
            {sidebarTab === 'roleplay' && (
              <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-left-4 duration-300 h-full max-h-[500px]">
                 
                 {/* Persona Header */}
                 <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg flex items-start gap-3 mb-4 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-bold block">Simulated Persona</span>
                      <span className="font-sans text-neutral-900 font-semibold text-sm leading-tight">
                        {activeSlide.aiPersona}
                      </span>
                    </div>
                 </div>

                 {/* Mock Chat Window */}
                 <div className="flex-1 w-full bg-neutral-50 border border-neutral-100 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto min-h-[150px]">
                    
                    {/* B2P Initialization */}
                    <div className="flex flex-col items-center justify-center text-center pb-4 border-b border-neutral-100 mb-2">
                       <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1">Scenario Loaded</span>
                       <span className="text-xs text-neutral-500">Presenting: Slide {currentSlide + 1} - {activeSlide.title}</span>
                    </div>

                    {/* AI Objection */}
                    <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl rounded-tl-sm p-4 animate-in slide-in-from-left-2 relative">
                       <span className="absolute -top-2 left-2 bg-white px-1 font-ui text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Objection</span>
                       <p className="text-sm font-sans text-neutral-700 leading-relaxed mt-1">
                         "{activeSlide.aiObjection}"
                       </p>
                    </div>

                 </div>

                 {/* Mock Input Area */}
                 <div className="mt-4 pt-3 border-t border-neutral/10 shrink-0">
                    <div className="relative flex items-center bg-white border border-neutral-300 rounded-full shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                       <button className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-primary transition-colors ml-1">
                         <Mic className="w-4 h-4" />
                       </button>
                       <input 
                         type="text"
                         className="flex-1 bg-transparent border-none text-sm placeholder:text-neutral-400 py-3 px-2 focus:outline-none"
                         placeholder="Practice your rebuttal..."
                       />
                       <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-1.5 shadow-sm hover:bg-primary-dark transition-colors">
                         <Send className="w-3.5 h-3.5 -ml-0.5" />
                       </button>
                    </div>
                    <span className="block text-center mt-2 font-ui text-[9px] text-neutral-400 tracking-widest uppercase">
                      Speech-to-Text API Offline in Preview
                    </span>
                 </div>
                 
              </div>
            )}

          </div>
        </div>
      </div>

    </section>
  );
}
