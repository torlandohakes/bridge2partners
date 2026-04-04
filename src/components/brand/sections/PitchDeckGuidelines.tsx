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
  EyeOff,
  ImagePlus,
  X,
  QrCode,
  MonitorSmartphone,
  CreditCard,
  Database,
  Users,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPitchSlides } from "@/config/pitch-simulator/slide-schemas";


export function PitchDeckGuidelines() {
  const [slideCopies, setSlideCopies] = useState<string[]>([
    "Innovation is Survival.\nYour Legacy Stack is\nDead Weight.",
    "Delaying modernization\nfunds your\nCompetitors.",
    "Don't break the bank.\nBuild in parallel.",
    "We Are Bankers, Like You.\nWe have worked at the banks we serve. Dedicated specialists with tenure at the top 100 financial institutions.",
    "The Simplified\nMiddleware Layer.",
    "Execution at Scale.",
    "The Enterprise Architecture Assessment.",
    "Bridge2Partners",
    "Appendix A: Playbooks & Capabilities",
    "Appendix B1: $80B Commercial Lending",
    "Appendix B2: $32B Deposit Onboarding",
    "Appendix B3: $250B M&A Integration",
    "Appendix B4: Enterprise PMO",
    "Appendix C: Integration Matrix",
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarTab, setSidebarTab] = useState<'strategy' | 'roleplay'>('strategy');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideTypography, setHideTypography] = useState(false);
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (e.g. limit to 10MB to prevent browser crash)
      if (file.size > 10 * 1024 * 1024) {
        alert("Image too large. Please select a file under 10MB.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomBg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset input
    }
  };
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [wordLimitWarning, setWordLimitWarning] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const currentSlideMaxWords = currentSlide === 3 ? 25 : 10;
  const pitchSlides = getPitchSlides(slideCopies, customBg);


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

  const handleCopyScript = () => {
    navigator.clipboard.writeText(pitchSlides[currentSlide].speakerNotes || '');
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
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
        isFullscreen ? "fixed inset-0 z-50 flex flex-col landscape:flex-row h-screen w-screen overflow-hidden bg-neutral-50/95 backdrop-blur" : "flex flex-col lg:flex-row relative min-h-[600px]"
      )}>
        
        {/* Left Stage: 16:9 Slide Viewer (60-70%) */}
        <div className={cn(
          "flex flex-col bg-neutral-100", 
          isFullscreen ? "flex-1 w-full landscape:h-full flex flex-col overflow-hidden" : "w-full lg:w-[65%] border-b lg:border-b-0 lg:border-r border-neutral/10"
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
          isFullscreen ? "w-full h-[40vh] landscape:w-[400px] landscape:h-full shrink-0 z-10 border-t landscape:border-t-0 landscape:border-l border-neutral-200 shadow-2xl" : "w-full lg:w-[35%] min-w-[320px]"
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
          <div className="flex-1 overflow-y-auto p-6 flex flex-col h-full">
            
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
                   <div className="flex items-center justify-between mb-2">
                     <span className="font-ui text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-1.5">
                       <PlayCircle className="w-3.5 h-3.5" /> Execution & Speaker Notes
                     </span>
                     <button 
                       onClick={handleCopyScript}
                       className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors"
                       title="Copy to clipboard"
                     >
                       {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                     </button>
                   </div>
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
              <div className="flex flex-col flex-1 animate-in fade-in slide-in-from-left-4 duration-300 h-full pb-4">
                 
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
                 <div className="shrink-0 pt-3 border-t border-neutral/10 mt-2">
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
          
          {/* Persistent Customization & Export Dock */}
          <div className="shrink-0 p-4 border-t border-neutral-200 bg-white/95 backdrop-blur z-20 flex flex-col gap-4">
             {/* Dynamic Command Center (Universally Active) */}
               <div className="select-none flex flex-col">
                 <label className="text-[11px] font-ui font-bold text-neutral-800 uppercase tracking-widest flex items-center justify-between mb-2">
                   Customize Slide Copy (Max {currentSlideMaxWords} Words)
                   <span className={cn("text-[9px] bg-neutral-100 px-1.5 py-0.5 rounded font-mono font-bold border", slideCopies[currentSlide].split(/\s+/).filter(w=>w.trim()!=='').length >= currentSlideMaxWords ? "text-red-500 border-red-200 bg-red-50" : "text-neutral-500 border-neutral-200/50")}>
                     {slideCopies[currentSlide].split(/\s+/).filter(w=>w.trim()!=='').length} / {currentSlideMaxWords}
                   </span>
                 </label>
                 <textarea 
                   value={slideCopies[currentSlide]}
                   onChange={(e) => {
                     const copy = e.target.value;
                     const words = copy.split(/\s+/).filter(w => w.trim() !== "");
                     if (words.length <= currentSlideMaxWords) {
                       const newCopies = [...slideCopies];
                       newCopies[currentSlide] = copy;
                       setSlideCopies(newCopies);
                       setWordLimitWarning(false);
                     } else {
                       setWordLimitWarning(true);
                       setTimeout(() => setWordLimitWarning(false), 2500);
                     }
                   }}
                   className="w-full text-sm font-sans resize-none p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg shadow-inner focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-neutral-400"
                   rows={3}
                   placeholder="Enter new multiline hook text here..."
                 />
                 {wordLimitWarning && (
                   <p className="text-[10px] text-red-500 font-bold mt-1.5 animate-in fade-in slide-in-from-top-1 bg-red-50 px-2 py-1 rounded-sm border border-red-100 flex items-center gap-1.5">
                     <ShieldAlert className="w-3.5 h-3.5" /> Max word count reached. Protect the prospect's cognitive load.
                   </p>
                 )}
               </div>

             {/* Environmental Overlays */}
             <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleImageUpload} 
                 accept="image/*" 
                 className="hidden" 
               />
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="flex-1 py-1.5 px-3 border border-neutral-200 rounded-md shadow-sm bg-white hover:bg-neutral-50 text-neutral-600 text-[10px] sm:text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
               >
                 <ImagePlus className="w-3.5 h-3.5" />
                 Replace Background
               </button>
               {customBg && (
                 <button 
                   onClick={() => setCustomBg(null)}
                   title="Remove Custom Background"
                   className="p-1.5 border border-red-200 rounded-md shadow-sm bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                 >
                   <X className="w-3.5 h-3.5" />
                 </button>
               )}
             </div>

             {/* Export Engine */}
             <div className="flex items-center justify-between gap-3 pt-1">
                <button 
                  onClick={() => setHideTypography(!hideTypography)}
                  title="Toggle Typography for Export"
                  className={cn(
                    "flex-1 py-2 px-3 transition-colors border rounded-md shadow-sm flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest",
                    hideTypography ? "bg-neutral-800 text-white border-neutral-800" : "bg-white text-neutral-600 border-neutral-200 hover:text-neutral-900 hover:bg-neutral-50"
                  )}
                >
                   {hideTypography ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   <span className="hidden sm:inline-block">Toggle Text</span>
                </button>
                
                <div className="flex-1 relative">
                  <button 
                    onClick={handleExportSlide}
                    disabled={isExporting}
                    className="w-full relative overflow-hidden group flex items-center justify-center gap-2 py-2 px-3 bg-primary border border-primary-dark text-white rounded-md shadow-sm hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {isExporting ? <Loader2 className="w-4 h-4 animate-spin relative z-10" /> : <Download className="w-4 h-4 relative z-10" />}
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold relative z-10">Export PNG</span>
                  </button>
                  {exportSuccess && (
                     <div className="absolute bottom-full mb-3 right-0 bg-neutral-900 border border-neutral-700 text-white px-3 py-2 rounded shadow-lg text-[10px] font-mono whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
                       Asset downloaded successfully.
                     </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>

    </section>
  );
}
