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
  MonitorSmartphone,
  CreditCard,
  Database,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const getPitchSlides = (slideCopies: string[], customBg: string | null) => [
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
         {/* Background Image Layer */}
         {customBg ? (
           <img 
             src={customBg} 
             alt="Custom Background" 
             className="absolute inset-0 w-full h-full object-cover object-right opacity-50 mix-blend-luminosity z-0" 
           />
         ) : (
           <div 
             className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-50 mix-blend-luminosity z-0" 
             style={{ backgroundImage: `url("/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797')}")` }}
           />
         )}


         {/* Organic Cinematic Background Overlay */}
         <div 
           className="absolute inset-0 w-full h-full min-w-full min-h-full pointer-events-none z-0" 
           style={{
             backgroundImage: `
               linear-gradient(110deg, rgba(10, 17, 15, 0.95) 0%, rgba(10, 17, 15, 0.4) 40%, transparent 80%),
               linear-gradient(20deg, rgba(4, 43, 38, 0.9) 0%, rgba(4, 43, 38, 0.5) 45%, transparent 100%)
             `
           }}
         />
         
         {/* Stacked Left-Aligned Typography */}
         <div className="relative z-10 w-[85cqw] flex flex-col gap-[1.5cqw] b2p-narrative-text transition-opacity duration-300 overflow-visible">
            <h2 className="font-display font-black text-[5.5cqw] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300 drop-shadow-md flex flex-col leading-[1.05] overflow-visible border-b-[1.5cqw] border-transparent pb-0">
              {slideCopies[0].split('\n').map((line, index, array) => {
                 const isLastLine = index === array.length - 1 && line.trim() !== "";
                 return (
                   <span key={index} className={cn(isLastLine ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70 drop-shadow-[0_0_20px_rgba(0,150,119,0.3)] leading-normal" : "")}>
                     {line}
                   </span>
                 );
              })}
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
    concept: "The Risk Inversion. You must destroy the illusion that doing nothing is the 'safe' option. We are taking their fear of operational risk and replacing it with the much more dangerous reality of active market share loss.",
    speakerNotes: "Look the champion in the eye. 'Every quarter you push this project back because of internal friction, your headcount rises to manage the legacy mess, and your best customers migrate to better tech. Doing nothing is actively costing you market share.'",
    visualRules: "A single, full-screen, high-impact cinematic image with direct text overlay to maximize raw emotional punch. Deep shadows, forced vertical stacking.",
    aiPersona: "Conservative CFO",
    aiObjection: "Our current tech debt is manageable. Shifting to a new modular methodology seems like a massive capital expenditure for unproven ROI. How do you justify the initial burn?",
    slideContent: (
      <div className="w-full h-full bg-[#050908] relative flex flex-col justify-center p-[6cqw] overflow-hidden group z-30">
         {/* Background Image Layer */}
         {customBg ? (
           <img 
             src={customBg} 
             alt="Custom Background" 
             className="absolute inset-0 w-full h-full object-cover object-center z-0" 
           />
         ) : (
           <div 
             className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
             style={{ backgroundImage: `url("/images/slide_2_chains.png")` }}
           />
         )}

         {/* Cinematic Background Overlay */}
         <div 
           className="absolute inset-0 w-full h-full min-w-full min-h-full pointer-events-none z-0 mix-blend-multiply" 
           style={{
             backgroundImage: `
               linear-gradient(110deg, rgba(5, 9, 8, 0.40) 0%, rgba(5, 9, 8, 0.20) 45%, transparent 90%),
               linear-gradient(20deg, rgba(5, 14, 11, 0.40) 0%, rgba(5, 14, 11, 0.15) 50%, transparent 100%)
             `
           }}
         />
         
         {/* Stacked Left-Aligned Typography */}
         <div className="relative z-10 w-[85cqw] flex flex-col gap-[1.5cqw] b2p-narrative-text transition-opacity duration-300 overflow-visible">
            <h2 className="font-display font-black text-[5.5cqw] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300 drop-shadow-md flex flex-col leading-[1.05] overflow-visible border-b-[1.5cqw] border-transparent pb-0">
              {slideCopies[1].split('\n').map((line, index, array) => {
                 const isLastLine = index === array.length - 1 && line.trim() !== "";
                 return (
                   <span key={index} className={cn(isLastLine ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70 drop-shadow-[0_0_20px_rgba(0,150,119,0.3)] leading-normal" : "")}>
                     {line}
                   </span>
                 );
              })}
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
           02
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "The Reframe",
    concept: "The Paradigm Shift. They are terrified of a 'rip and replace' demolition. Relieve that anxiety instantly. You are shifting their mental model from risky destruction to a safe, surgical parallel build.",
    speakerNotes: "Drop the pitch tone and speak like a partner. 'You don't need a wrecking ball, and you don't need an army. We act as your elite task force. Your legacy systems keep making money, while we surgically build your modern architecture alongside it.'",
    visualRules: "Clean, minimalist design transitioning from weight to precision. Center-left typography with an anchoring horizontal line and a dark silhouette schematic illustrating parallel engineering.",
    aiPersona: "Chief Information Officer",
    aiObjection: "You're oversimplifying. We have 40+ legacy systems tied directly into our core banking platform. A clean 'hub and spoke' is a consultant's pipe dream.",
    slideContent: (
      <div className="w-full h-full bg-neutral-900 relative flex flex-col justify-center p-[6cqw] pl-[8cqw] overflow-hidden group z-30">
         {/* Background Layer: Gradient Sweep with Conditional Custombg Handling */}
         {customBg ? (
           <div className="absolute inset-0 z-0">
             <img src={customBg} className="w-full h-full object-cover object-center" />
             <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-950 opacity-70 mix-blend-multiply" />
           </div>
         ) : (
           <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 z-0" />
         )}

         {/* The Silhouette Schematic */}
         <div className="absolute bottom-[5.5cqw] right-[4cqw] w-[60cqw] h-[12cqw] z-30 pointer-events-none flex items-end justify-end">
           <img 
             src="/images/slide_3_bridge_v3.png" 
             alt="Bridge Architectural Schematic"
             className="w-full h-full object-contain object-right-bottom drop-shadow-[0_0_15px_rgba(0,150,119,0.4)]"
           />
         </div>

         {/* The Crisp Secondary Line Anchor */}
         <div className="absolute bottom-[5.5cqw] left-0 w-full h-[0.15cqw] bg-secondary z-20 shadow-[0_0_10px_rgba(0,150,119,0.5)]" />
         
         {/* Center-Left Typography */}
         <div className="relative z-30 w-[60cqw] flex flex-col items-start gap-[1.5cqw] b2p-narrative-text transition-opacity duration-300 overflow-visible text-left">
            <h2 className="font-display font-black text-[5cqw] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300 drop-shadow-md flex flex-col leading-[1.1] overflow-visible pb-0">
              {slideCopies[2].split('\n').map((line, index, array) => {
                 const isLastLine = index === array.length - 1 && line.trim() !== "";
                 return (
                   <span key={index} className={cn(isLastLine ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70 drop-shadow-[0_0_20px_rgba(0,150,119,0.3)] leading-normal" : "")}>
                     {line}
                   </span>
                 );
              })}
            </h2>
         </div>

         {/* Custom Slide Anchors */}
         <div className="absolute bottom-[2cqw] left-[4cqw] flex items-center gap-[1cqw] z-30">
           <img 
             src={`/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Favicon.png?alt=media&token=8281d312-5968-4fa1-9e37-347481934b95')}`}
             alt="B2P Logo" 
             className="w-[2cqw] h-[2cqw] rounded-[0.4cqw] opacity-90 shadow-[0_0_15px_rgba(152,204,103,0.2)]"
           />
           <span className="font-ui text-[1cqw] text-white/50 tracking-widest uppercase font-bold">Bridge2Partners</span>
         </div>
         <div className="absolute bottom-[2cqw] right-[4cqw] font-ui text-[1cqw] text-white/50 tracking-widest font-bold z-30">
           03
         </div>
      </div>
    )
  },

  {
    id: 4,
    title: "The Proof",
    concept: "The Competence Anchor. You reframed their thinking in Slide 3; now you must prove it. By immediately pairing a clean architectural diagram with a massive $80B bank case study, you destroy any doubt that this is just theoretical marketing.",
    speakerNotes: "Point to the hub. 'We don't just talk about decoupled architecture; we build it. For an $80B bank, we constructed a simplified middleware layer with over 40 interfaces, isolating their legacy core while their digital experience teams built the future.'",
    visualRules: "Maximum contrast background. Disruptive visual pattern representing technical competence and Hub-and-Spoke architecture.",
    aiPersona: "Head of Retail Banking",
    aiObjection: "Look, 'Agile' and 'Banking' are oxymorons. Our regulators won't let us be agile. How does this promised land survive compliance?",
    slideContent: (
      <div className="w-full h-full bg-[#050807] relative flex flex-row p-[6cqw] gap-[2cqw] overflow-hidden group z-30">
         {/* Left Side: Typography & Proof (40%) */}
         <div className="w-[45%] flex flex-col justify-center h-full z-10 gap-[4cqw] pl-[2cqw]">
            <h2 className="font-display font-black text-[4.5cqw] leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
               {slideCopies[3].split('\n').map((line, index, array) => {
                 const isLastLine = index === array.length - 1 && line.trim() !== "";
                 return (
                   <span key={index} className={cn(isLastLine ? "text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/70 drop-shadow-[0_0_20px_rgba(0,150,119,0.3)] leading-normal" : "")}>
                     {line}<br/>
                   </span>
                 );
               })}
            </h2>
            
            <div className="flex flex-col gap-[1.5cqw] border-l-[0.3cqw] border-neutral-800 pl-[2cqw]">
              <div className="flex flex-col gap-[0.2cqw]">
                <span className="text-primary text-[3.5cqw] font-black leading-none drop-shadow-[0_0_15px_rgba(152,204,103,0.3)]">40+</span>
                <span className="text-neutral-400 text-[1.5cqw] font-semibold uppercase tracking-widest">Interfaces Built</span>
              </div>
              <div className="flex flex-col gap-[0.2cqw]">
                <span className="text-primary text-[3.5cqw] font-black leading-none drop-shadow-[0_0_15px_rgba(152,204,103,0.3)]">$80B</span>
                <span className="text-neutral-400 text-[1.5cqw] font-semibold uppercase tracking-widest">Bank Deployment</span>
              </div>
              <div className="flex flex-col gap-[0.2cqw] pt-[1cqw]">
                <span className="text-white text-[2cqw] font-black uppercase tracking-wider leading-none">Zero Disruption.</span>
              </div>
            </div>
         </div>

         {/* Right Side: The Diagram (55%) */}
         <div className="w-[55%] relative h-full flex items-center justify-center z-10">
            {/* Background Diagram Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:2cqw_2cqw] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

            {/* Central Hub */}
            <div className="absolute w-[14cqw] h-[14cqw] rounded-full border-[0.3cqw] border-primary flex items-center justify-center bg-[#050807] z-30 shadow-[0_0_50px_rgba(152,204,103,0.15)] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]">
               <div className="w-[11cqw] h-[11cqw] rounded-full bg-primary/10 flex flex-col items-center justify-center border border-primary/30">
                  <span className="text-white font-display font-medium text-[1.1cqw] text-center leading-tight">Systems<br/>of <span className="font-bold text-primary">Record</span></span>
               </div>
            </div>

            {/* Manual Radial Spokes Setup for 5 nodes */}
            {/* Core Rings */}
            <div className="absolute w-[24cqw] h-[24cqw] rounded-full border-[0.1cqw] border-primary/20 border-dashed animate-[spin_60s_linear_infinite_reverse]" />
            <div className="absolute w-[36cqw] h-[36cqw] rounded-full border-[0.1cqw] border-white/10" />

            {/* Lines radiating out (using absolute divs mapped tightly) */}
            <svg className="absolute w-[36cqw] h-[36cqw]" viewBox="0 0 100 100">
               <line x1="50" y1="50" x2="50" y2="0" stroke="rgba(152,204,103,0.8)" strokeWidth="0.5" className="drop-shadow-[0_0_5px_rgba(152,204,103,1)]"/> {/* Top - Digital Portal */}
               <line x1="50" y1="50" x2="97.5" y2="34.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" /> {/* Top Right - Payments */}
               <line x1="50" y1="50" x2="79.3" y2="90.4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" /> {/* Bottom Right - Data Lake */}
               <line x1="50" y1="50" x2="20.7" y2="90.4" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" /> {/* Bottom Left - CRM */}
               <line x1="50" y1="50" x2="2.5" y2="34.5" stroke="rgba(152,204,103,0.8)" strokeWidth="0.5" className="drop-shadow-[0_0_5px_rgba(152,204,103,1)]"/> {/* Top Left - APIs */}
            </svg>

            {/* Nodes positioning manually using % from center */}
            {/* Node 1 Top (Digital Portal) */}
            <div className="absolute top-[calc(50%-18cqw)] left-[calc(50%-2.5cqw)] w-[5cqw] h-[5cqw] rounded-xl border-[0.15cqw] border-primary bg-[#050807] flex flex-col items-center justify-center shadow-[0_0_15px_rgba(152,204,103,0.3)] z-40">
              <MonitorSmartphone size="2cqw" className="text-primary"/>
            </div>
            <div className="absolute top-[calc(50%-21cqw)] left-[calc(50%-5cqw)] w-[10cqw] text-center font-ui text-[1cqw] text-primary tracking-widest font-bold">DIGITAL<br/>PORTAL</div>

            {/* Node 2 Top Right (Payments) */}
            <div className="absolute top-[calc(50%-8.5cqw)] left-[calc(50%+14.5cqw)] w-[5cqw] h-[5cqw] rounded-xl border-[0.1cqw] border-neutral-700 bg-[#050807] flex flex-col items-center justify-center z-40">
              <CreditCard size="2cqw" className="text-white"/>
            </div>
            <div className="absolute top-[calc(50%-10cqw)] left-[calc(50%+21cqw)] w-[10cqw] text-left font-ui text-[1cqw] text-white/70 tracking-widest font-bold">PAYMENTS</div>

            {/* Node 3 Bottom Right (Data Lake) */}
            <div className="absolute top-[calc(50%+12.5cqw)] left-[calc(50%+7.5cqw)] w-[5cqw] h-[5cqw] rounded-xl border-[0.1cqw] border-neutral-700 bg-[#050807] flex flex-col items-center justify-center z-40">
              <Database size="2cqw" className="text-white"/>
            </div>
            <div className="absolute top-[calc(50%+18cqw)] left-[calc(50%+5cqw)] w-[10cqw] text-center font-ui text-[1cqw] text-white/70 tracking-widest font-bold">DATA LAKE</div>

            {/* Node 4 Bottom Left (CRM) */}
            <div className="absolute top-[calc(50%+12.5cqw)] left-[calc(50%-12.5cqw)] w-[5cqw] h-[5cqw] rounded-xl border-[0.1cqw] border-neutral-700 bg-[#050807] flex flex-col items-center justify-center z-40">
              <Users size="2cqw" className="text-white"/>
            </div>
            <div className="absolute top-[calc(50%+18cqw)] left-[calc(50%-15cqw)] w-[10cqw] text-center font-ui text-[1cqw] text-white/70 tracking-widest font-bold">CRM</div>

            {/* Node 5 Top Left (APIs) */}
            <div className="absolute top-[calc(50%-8.5cqw)] left-[calc(50%-20cqw)] w-[5cqw] h-[5cqw] rounded-xl border-[0.15cqw] border-primary bg-[#050807] flex flex-col items-center justify-center shadow-[0_0_15px_rgba(152,204,103,0.3)] z-40">
              <Network size="2cqw" className="text-primary"/>
            </div>
            <div className="absolute top-[calc(50%-10cqw)] left-[calc(50%-32cqw)] w-[10cqw] text-right font-ui text-[1cqw] text-primary tracking-widest font-bold">CORE APIs</div>
         </div>

         {/* Custom Slide Anchors */}
         <div className="absolute bottom-[2cqw] left-[4cqw] flex items-center gap-[1cqw] z-30">
           <img 
             src={`/api/proxy-image?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Favicon.png?alt=media&token=8281d312-5968-4fa1-9e37-347481934b95')}`}
             alt="B2P Logo" 
             className="w-[2cqw] h-[2cqw] rounded-[0.4cqw] opacity-90 shadow-[0_0_15px_rgba(152,204,103,0.2)]"
           />
           <span className="font-ui text-[1cqw] text-white/50 tracking-widest uppercase font-bold">Bridge2Partners</span>
         </div>
         <div className="absolute bottom-[2cqw] right-[4cqw] font-ui text-[1cqw] text-white/50 tracking-widest font-bold z-30">
           04
         </div>
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
  const [slideCopies, setSlideCopies] = useState<string[]>([
    "Innovation is Survival.\nYour Legacy Stack is\nDead Weight.",
    "Delaying modernization\nfunds your\nCompetitors.",
    "Don't break the bank.\nBuild in parallel.",
    "The Simplified\nMiddleware Layer.",
    "Slide 5: The Magic Tools\n(Pending High-Fidelity Design)",
    "Slide 6: The Proof\n(Pending High-Fidelity Design)",
    "Slide 7: Appendix\n(Pending High-Fidelity Design)",
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarTab, setSidebarTab] = useState<'strategy' | 'roleplay'>('strategy');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hideTypography, setHideTypography] = useState(false);
  const [customBg, setCustomBg] = useState<string | null>(null);
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
                   Customize Slide Copy (Max 10 Words)
                   <span className={cn("text-[9px] bg-neutral-100 px-1.5 py-0.5 rounded font-mono font-bold border", slideCopies[currentSlide].split(/\s+/).filter(w=>w.trim()!=='').length >= 10 ? "text-red-500 border-red-200 bg-red-50" : "text-neutral-500 border-neutral-200/50")}>
                     {slideCopies[currentSlide].split(/\s+/).filter(w=>w.trim()!=='').length} / 10
                   </span>
                 </label>
                 <textarea 
                   value={slideCopies[currentSlide]}
                   onChange={(e) => {
                     const copy = e.target.value;
                     const words = copy.split(/\s+/).filter(w => w.trim() !== "");
                     if (words.length <= 10) {
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
