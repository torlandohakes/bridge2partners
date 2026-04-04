"use client";

import { useState, useRef } from "react";
import { toPng } from 'html-to-image';
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
  CheckCircle2,
  Wand2,
  Loader2,
  Globe,
  Target,
  PlayCircle,
  Layout,
  Download,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

const pitchSlides = [
  {
    id: 1,
    title: "The Hook",
    concept: "Loss Aversion. Executives are paralyzed by the operational terror of migrating legacy systems. You must make the risk of doing *nothing* feel more dangerous than the risk of changing. We are breaking their Status Quo Bias.",
    speakerNotes: "Do not read the slide. Let it sit for 3 seconds of silence to let the visual gravity hit. Then say: 'You are squeezed between fintechs taking your deposits and megabanks outspending you on tech. You know you need to modernize, but ripping out a legacy core feels like risking the bank. So you wait. But waiting is what's actually killing your valuation.'",
    visualRules: "Strictly 8 words. The brain cannot read and listen simultaneously. The single Luminous Lime word 'Anchor' acts as a visual trap, forcing them to finish reading in 1.5 seconds so their attention immediately returns to you.",
    aiPersona: "Skeptical Regional Bank EVP",
    aiObjection: "Look, we've integrated three banks in the last five years using legacy methods. It's slow, but it works. Why do I need to change?",
    slideContent: (
      <div className="w-full h-full bg-[#0a110f] relative flex flex-col justify-center p-[6cqw] overflow-hidden group z-30">
         {/* Remote Image Background Layer */}
         <div 
           className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-50 mix-blend-luminosity z-0" 
           style={{ backgroundImage: `url("/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797')}")` }}
         />
         {/* Partial Frosted Glass (Protects the 'Bridge' rendering on the right) */}
         <div className="absolute inset-y-0 left-0 w-3/4 pointer-events-none z-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black_40%,transparent_100%)]" />

         {/* Organic Cinematic Background Overlay */}
         <div 
           className="absolute inset-0 pointer-events-none z-0" 
           style={{
             backgroundImage: `
               linear-gradient(110deg, rgba(10, 17, 15, 0.95) 0%, rgba(10, 17, 15, 0.4) 40%, transparent 80%),
               linear-gradient(20deg, rgba(4, 43, 38, 0.9) 0%, rgba(4, 43, 38, 0.5) 45%, transparent 100%)
             `
           }}
         />
         
         {/* Stacked Left-Aligned Typography */}
         <div className="relative z-10 w-[75cqw] flex flex-col gap-[1.5cqw] b2p-narrative-text transition-opacity duration-300">
            <h2 className="font-display font-black text-[5.5cqw] tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300 drop-shadow-md">
              Innovation is Survival.<br/>Your Legacy Stack is the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#98cc67] to-[#7bb050] drop-shadow-[0_0_20px_rgba(152,204,103,0.3)]">Anchor.</span>
            </h2>
         </div>

         {/* Custom Slide Anchors */}
         <div className="absolute bottom-[3cqw] left-[4cqw] flex items-center gap-[1cqw] z-20">
           <img 
             src={`/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Favicon.png?alt=media&token=8281d312-5968-4fa1-9e37-347481934b95')}`}
             alt="B2P Logo" 
             className="w-[2.5cqw] h-[2.5cqw] rounded-[0.5cqw] opacity-90 shadow-[0_0_15px_rgba(152,204,103,0.2)]"
           />
           <span className="font-ui text-[1.2cqw] text-white/50 tracking-widest uppercase font-bold">Bridge2Partners</span>
         </div>
         <div className="absolute bottom-[3cqw] right-[4cqw] font-ui text-[1.2cqw] text-white/50 tracking-widest font-bold z-20">
           01
         </div>
      </div>
    )
  },
  {
    id: 2,
    title: "The Stakes",
    concept: "Polarizing the Room. You must create a stark contrast between their current trajectory (pain) and the Bridge2Partners trajectory (speed). If they don't feel the sting of the left side, they won't buy the right side.",
    speakerNotes: "Point directly to the slide. 'Right now, every new integration you attempt adds quarters of tech debt. With the B2P Hub-and-Spoke architecture, we deliver functional, compliant results in weeks.'",
    visualRules: "50/50 visual split. The negative outcome must be visually muted and heavy. The positive outcome must utilize our Luminous Lime to signal activation and relief.",
    aiPersona: "Conservative CFO",
    aiObjection: "Our current tech debt is manageable. Shifting to a new modular methodology seems like a massive capital expenditure for unproven ROI. How do you justify the initial burn?",
    slideContent: (
      <div className="w-full h-full relative flex overflow-hidden z-30 bg-black">
         {/* Left Side: Muted / Tech Debt */}
         <div className="flex-1 bg-neutral-950 flex flex-col justify-center p-[6cqw] border-r border-white/5 relative group pb-[8cqw]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0" />
            <div className="relative z-10 w-[35cqw] flex flex-col b2p-narrative-text transition-opacity duration-300">
               <h2 className="font-display font-black text-[4.5cqw] tracking-tight leading-[1.1] text-white/40 drop-shadow-sm">
                 Quarters of Tech Debt.
               </h2>
            </div>
         </div>
         {/* Right Side: Activated / Results */}
         <div className="flex-1 bg-gradient-to-br from-[#0a110f] to-[#042b26] flex flex-col justify-center p-[6cqw] relative group pb-[8cqw]">
            <div className="absolute inset-0 bg-[#98cc67]/10 mix-blend-overlay pointer-events-none z-0" />
            <div className="relative z-10 w-[35cqw] flex flex-col b2p-narrative-text transition-opacity duration-300">
               <h2 className="font-display font-black text-[4.5cqw] tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-[#98cc67] to-[#7bb050] drop-shadow-[0_0_20px_rgba(152,204,103,0.3)]">
                 Results in Weeks.
               </h2>
            </div>
         </div>

         {/* Custom Slide Anchors */}
         <div className="absolute bottom-[3cqw] left-[4cqw] flex items-center gap-[1cqw] z-20">
           <img 
             src={`/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Favicon.png?alt=media&token=8281d312-5968-4fa1-9e37-347481934b95')}`}
             alt="B2P Logo" 
             className="w-[2.5cqw] h-[2.5cqw] rounded-[0.5cqw] opacity-40 shadow-[0_0_15px_rgba(255,255,255,0.05)] mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-500"
           />
           <span className="font-ui text-[1.2cqw] text-white/20 tracking-widest uppercase font-bold">Bridge2Partners</span>
         </div>
         <div className="absolute bottom-[3cqw] right-[4cqw] font-ui text-[1.2cqw] text-[#98cc67]/70 tracking-widest font-bold z-20">
           02
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
      <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 relative z-30">
         <span className="font-ui font-semibold text-neutral-500 uppercase tracking-widest sm:text-lg">Slide 3: The Reframe</span>
         <span className="font-sans text-neutral-400 mt-2 text-sm italic">(Pending High-Fidelity Design)</span>
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
      <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 relative z-30">
         <span className="font-ui font-semibold text-neutral-500 uppercase tracking-widest sm:text-lg">Slide 4: The Promised Land</span>
         <span className="font-sans text-neutral-400 mt-2 text-sm italic">(Pending High-Fidelity Design)</span>
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
      <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 relative z-30">
         <span className="font-ui font-semibold text-neutral-500 uppercase tracking-widest sm:text-lg">Slide 5: The Magic Tools</span>
         <span className="font-sans text-neutral-400 mt-2 text-sm italic">(Pending High-Fidelity Design)</span>
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
      <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 relative z-30">
         <span className="font-ui font-semibold text-neutral-500 uppercase tracking-widest sm:text-lg">Slide 6: The Proof</span>
         <span className="font-sans text-neutral-400 mt-2 text-sm italic">(Pending High-Fidelity Design)</span>
      </div>
    )
  },
  {
    id: 7,
    title: "Appendix",
    concept: "The Proof Arsenal (System 2 Validation). The core 6 slides hook the emotional/strategic brain (System 1). The Appendix is strictly for the logical, risk-mitigating brain (System 2). It proves we have the receipts.",
    speakerNotes: "Never present these slides voluntarily. Keep them in reserve. When the CIO stops you to ask how our middleware handles API rate limits, seamlessly jump to the corresponding Appendix slide. Use it to kill objections with overwhelming competence.",
    visualRules: "Appendix slides are permitted to be highly data-dense. This is where we place complex architecture diagrams, detailed case study metrics (like the 40+ integrations), and technical timelines. Must still obey strict typography hierarchy.",
    aiPersona: "Chief Technology Officer / Risk Officer",
    aiObjection: "Your narrative is great, but we need to see the actual API limits, compliance workflows, and security frameworks before we sign anything.",
    slideContent: (
      <div className="w-full h-full bg-neutral-900/50 flex flex-col items-center justify-center border-2 border-dashed border-neutral-600 relative z-30 group">
         <div className="absolute top-6 right-8 bg-[#dc2626]/10 border border-[#dc2626]/30 px-3 py-1.5 rounded-sm shadow-sm backdrop-blur-sm">
            <span className="font-ui text-[10px] uppercase font-bold tracking-widest text-[#dc2626]">DO NOT PRESENT VOLUNTARILY</span>
         </div>
         <span className="font-ui font-semibold text-neutral-300 uppercase tracking-widest sm:text-lg text-center">Appendix:<br/>Technical Validation & Proof</span>
         <span className="font-sans text-neutral-500 mt-3 text-sm italic">(Pending High-Fidelity Design)</span>
      </div>
    )
  }
];

export function PitchDeckGuidelines() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarTab, setSidebarTab] = useState<'strategy' | 'roleplay'>('strategy');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideTypography, setHideTypography] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  // Real DOM-to-Image capture sequence
  const handleExportSlide = async () => {
    if (!slideRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);
    
    try {
      const dataUrl = await toPng(slideRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `b2p-slide-${currentSlide + 1}-asset.png`;
      link.href = dataUrl;
      link.click();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to export slide', err);
    } finally {
      setIsExporting(false);
    }
  };

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
        isFullscreen ? "fixed inset-0 z-50 flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-neutral-50/95 backdrop-blur" : "flex flex-col lg:flex-row relative min-h-[600px]"
      )}>
        
        {/* Left Stage: 16:9 Slide Viewer (60-70%) */}
        <div className={cn(
          "flex flex-col bg-neutral-100", 
          isFullscreen ? "flex-1 h-full flex flex-col overflow-hidden" : "w-full lg:w-[65%] border-b lg:border-b-0 lg:border-r border-neutral/10"
        )}>
          {/* Deck Header */}
          <div className="h-14 bg-white border-b border-neutral/10 flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-3">
               <span className="font-ui font-semibold text-neutral-800 text-sm tracking-tight">{activeSlide.title}</span>
               <span className="bg-primary/10 text-primary text-[10px] font-mono px-2 py-0.5 rounded tracking-widest uppercase font-bold">Standard 16:9</span>
             </div>
             {/* Controls & Export Engine */}
             <div className="flex items-center gap-3">
                <span className="text-xs font-ui text-neutral-500 font-medium mr-1 hidden sm:inline-block">Slide {currentSlide + 1} of {pitchSlides.length}</span>
                
                <div className="flex items-center gap-2 mr-2">
                  <button 
                    onClick={() => setHideTypography(!hideTypography)}
                    title="Toggle Typography for Export"
                    className={cn(
                      "p-1.5 transition-colors border rounded shadow-sm flex items-center justify-center",
                      hideTypography ? "bg-neutral-800 text-white border-neutral-800" : "bg-white text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:bg-neutral-50"
                    )}
                  >
                     {hideTypography ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  <div className="relative flex items-center">
                    <button 
                      onClick={handleExportSlide}
                      disabled={isExporting}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white rounded shadow-sm hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                      <span className="text-[10px] uppercase tracking-widest font-bold hidden md:inline-block">Export Layer</span>
                    </button>
                    {exportSuccess && (
                       <div className="absolute top-10 right-0 bg-neutral-900 text-white px-3 py-1.5 rounded shadow-lg text-[10px] font-mono whitespace-nowrap animate-in fade-in slide-in-from-top-2 z-50 pointer-events-none">
                         Slide exported as high-res PNG.
                       </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-0.5 border border-neutral/20 rounded-md overflow-hidden bg-neutral-50 shadow-sm">
                   <button onClick={handlePrev} disabled={currentSlide === 0} className="p-1.5 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                     <ChevronLeft className="w-4 h-4 text-neutral-700" />
                   </button>
                   <div className="w-px h-4 bg-neutral/20" />
                   <button onClick={handleNext} disabled={currentSlide === pitchSlides.length - 1} className="p-1.5 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                     <ChevronRight className="w-4 h-4 text-neutral-700" />
                   </button>
                </div>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors bg-white border border-neutral/20 rounded-md shadow-sm ml-1">
                   {isFullscreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                </button>
             </div>
          </div>
          
          {/* Active Canvas wrapper */}
          <div className={cn(
            "w-full bg-neutral-100/50 flex items-center justify-center overflow-hidden",
            isFullscreen ? "flex-1 h-full p-4 lg:p-10" : "flex-1 p-4 sm:p-8"
          )}>
             {/* Aspect Ratio 16:9 Enforcer */}
             <div 
               id="b2p-slide-capture-node" 
               ref={slideRef}
               className={cn(
                 "w-full max-w-full max-h-full mx-auto relative shadow-2xl ring-1 ring-black/5 overflow-hidden transition-opacity duration-300 @container",
                 hideTypography && "[&_.b2p-narrative-text]:opacity-0"
               )} 
               style={{ aspectRatio: '16/9' }}
             >
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
          isFullscreen ? "w-full lg:w-[450px] shrink-0 h-full overflow-y-auto border-l shadow-2xl z-10" : "w-full lg:w-[35%] min-w-[320px]"
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
                 <Lightbulb className="w-3.5 h-3.5" /> Slide Strategy
               </button>
               <button 
                 onClick={() => setSidebarTab('roleplay')}
                 className={cn(
                   "flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all",
                   sidebarTab === 'roleplay' ? "bg-primary text-white shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                 )}
               >
                 <BrainCircuit className="w-3.5 h-3.5" /> B2P Intelligence
               </button>
             </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            
            {/* Strategy Tab */}
            {sidebarTab === 'strategy' && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                 
                 {/* Block 1: The Psychology */}
                 <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl shadow-sm relative overflow-hidden group">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                   <span className="font-ui text-[10px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                     <Target className="w-3.5 h-3.5 text-primary" /> The Cognitive Goal
                   </span>
                   <p className="font-sans text-neutral-900 font-medium text-sm leading-relaxed">
                     {activeSlide.concept}
                   </p>
                 </div>

                 {/* Block 2: The Script */}
                 <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl shadow-sm relative overflow-hidden group">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 group-hover:bg-primary transition-colors" />
                   <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                     <PlayCircle className="w-3.5 h-3.5" /> Execution & Speaker Notes
                   </span>
                   <p className="font-sans text-neutral-800 text-sm leading-relaxed italic">
                     "{activeSlide.speakerNotes}"
                   </p>
                 </div>

                 {/* Block 3: The Architecture */}
                 <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl shadow-sm relative overflow-hidden group">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-300 group-hover:bg-neutral-500 transition-colors" />
                   <span className="font-ui text-[10px] text-neutral-500 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                     <Layout className="w-3.5 h-3.5 text-neutral-600" /> Visual Rules & Cognitive Load
                   </span>
                   <p className="font-sans text-neutral-700 text-sm leading-relaxed">
                     {activeSlide.visualRules}
                   </p>
                 </div>

              </div>
            )}

            {/* B2P Intelligence Tab (Socratic Chat) */}
            {sidebarTab === 'roleplay' && (
              <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-left-4 duration-300 h-full max-h-[600px] pb-4">
                 
                 {/* Intelligence Header */}
                 <div className="space-y-1 mb-4 shrink-0">
                   <h4 className="font-ui font-bold text-neutral-900 tracking-tight text-lg flex items-center gap-2">
                     <BrainCircuit className="w-5 h-5 text-primary" /> B2P Intelligence <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mt-1">- Active Session</span>
                   </h4>
                   <p className="text-xs font-sans text-neutral-500">
                     Collaborative builder. Discuss your target account and we will architect a bespoke strategic narrative together.
                   </p>
                 </div>

                 {/* Conversational Chat Window */}
                 <div className="flex-1 w-full bg-neutral-50 border border-neutral-100 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto mb-4 custom-scrollbar">
                    
                    {/* Transcript Generation */}
                    <div className="flex flex-col gap-4 pb-2">
                      {/* Message 1 (AI) */}
                      <div className="flex gap-3 max-w-[95%]">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><BrainCircuit className="w-3.5 h-3.5 text-primary"/></div>
                        <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl rounded-tl-sm p-3">
                          <p className="text-sm font-sans text-neutral-700 leading-relaxed">Tell me about your upcoming pitch. Who are we talking to?</p>
                        </div>
                      </div>

                      {/* Message 2 (User) */}
                      <div className="flex gap-3 max-w-[95%] self-end flex-row-reverse">
                        <div className="w-6 h-6 rounded bg-neutral-200 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[9px] font-bold text-neutral-600">REP</span></div>
                        <div className="bg-neutral-800 text-white shadow-sm rounded-2xl rounded-tr-sm p-3">
                          <p className="text-sm font-sans leading-relaxed">First Horizon Bank. Meeting with their EVP of Digital.</p>
                        </div>
                      </div>

                      {/* Message 3 (AI) */}
                      <div className="flex gap-3 max-w-[95%]">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><BrainCircuit className="w-3.5 h-3.5 text-primary"/></div>
                        <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl rounded-tl-sm p-3">
                          <p className="text-sm font-sans text-neutral-700 leading-relaxed">Got it. First Horizon has been pushing hard into wealth management. What's the specific pain point or trigger event we are anchoring this pitch to?</p>
                        </div>
                      </div>

                      {/* Message 4 (User) */}
                      <div className="flex gap-3 max-w-[95%] self-end flex-row-reverse">
                        <div className="w-6 h-6 rounded bg-neutral-200 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[9px] font-bold text-neutral-600">REP</span></div>
                        <div className="bg-neutral-800 text-white shadow-sm rounded-2xl rounded-tr-sm p-3">
                          <p className="text-sm font-sans leading-relaxed">They are losing high-net-worth clients during the initial 90-day onboarding window due to disjointed legacy systems.</p>
                        </div>
                      </div>

                      {/* Message 5 (AI) */}
                      <div className="flex gap-3 max-w-[95%] animate-in slide-in-from-left-2 duration-500">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><BrainCircuit className="w-3.5 h-3.5 text-primary"/></div>
                        <div className="bg-white border border-[#98cc67]/30 shadow-md ring-1 ring-[#98cc67]/10 rounded-2xl rounded-tl-sm p-4 relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#98cc67]" />
                          <p className="text-sm font-sans text-neutral-700 leading-relaxed mb-3">Perfect. Let's build the Strategic Narrative.</p>
                          <div className="bg-neutral-50 border border-neutral-200 rounded p-3 mb-3">
                            <span className="font-ui font-bold text-xs text-neutral-800 block mb-1">Slide 1 (The Hook): "The Legacy Stack is the Anchor."</span>
                            <p className="text-xs font-sans text-neutral-600">
                              <span className="font-semibold text-neutral-800">Instruction:</span> Use massive left-stacked <code className="font-mono bg-neutral-200 px-1 py-0.5 rounded text-[10px]">font-display</code> text on a cinematic overlay. Do not mention B2P. Anchor their bleeding AUM directly to their core architecture gap.
                            </p>
                          </div>
                          <p className="text-sm font-sans text-neutral-700 leading-relaxed font-semibold">Ready to map out Slide 2 (The Stakes)?</p>
                        </div>
                      </div>
                    </div>

                 </div>

                 {/* Mock Chat Input Area */}
                 <div className="shrink-0 pt-2 border-t border-neutral/10">
                    <div className="relative flex items-center bg-white border border-neutral-300 rounded-full shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                       <button className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-primary transition-colors ml-1">
                         <Mic className="w-4 h-4" />
                       </button>
                       <input 
                         type="text"
                         className="flex-1 bg-transparent border-none text-sm placeholder:text-neutral-400 py-3 px-2 focus:outline-none font-sans"
                         placeholder="Yes, let's build Slide 2..."
                       />
                       <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-1.5 shadow-sm hover:bg-primary-dark transition-colors">
                         <Send className="w-3.5 h-3.5 -ml-0.5" />
                       </button>
                    </div>
                 </div>
                 
              </div>
            )}

          </div>
        </div>
      </div>

    </section>
  );
}
