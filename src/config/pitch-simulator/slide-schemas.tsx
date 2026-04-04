import React from 'react';
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export const getPitchSlides = (slideCopies: string[], customBg: string | null) => [
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
    title: "The Insiders",
    concept: "The Insider Flex. You are proving that B2P is an elite strike team. By showing their faces and deep banking pedigree, you shift the dynamic from 'outside vendor' to 'experienced peer.'",
    speakerNotes: "'We don't bring junior analysts to learn on your dime. Look at this roster. We bring domain experts who have run commercial lending and technology platforms at the exact institutions you compete with every day.'",
    visualRules: "Digital Business Card Bento Grid. Premium layout presenting the elite task force using an asymmetrical masonry architecture.",
    aiPersona: "Head of Retail Banking",
    aiObjection: "Consultants are consultants. I need someone who understands my specific regulatory environment.",
    slideContent: (
      <div className="w-full h-full bg-neutral-950 relative flex flex-row p-[6cqw] gap-[2cqw] overflow-hidden group z-30 items-center">
         {/* The Crisp Luminous Line Anchor */}
         <div className="absolute bottom-[5.5cqw] left-0 w-full h-[0.15cqw] bg-primary z-20 shadow-[0_0_10px_rgba(152,204,103,0.5)]" />

         {/* Left Side (40%): Typography Header */}
         <div className="w-[38%] flex flex-col justify-center h-full z-30 gap-[1cqw]">
            <h2 className="font-display font-black text-[4cqw] leading-[1.05] tracking-tight text-white drop-shadow-md">
               {slideCopies[3].split('\n')[0] || "We Are Bankers, Like You."}
            </h2>
            <p className="font-sans text-[1.4cqw] leading-snug text-neutral-400 font-medium mt-[1cqw] max-w-[90%]">
               {slideCopies[3].split('\n').slice(1).join('\n') || "We have worked at the banks we serve. Dedicated specialists with tenure at the top 100 financial institutions."}
            </p>
         </div>

         {/* Right Side (60%): The Bento Grid */}
         <div className="w-[62%] flex flex-col justify-center h-full z-30 pb-[2cqw]">
            <div className="w-full grid grid-cols-12 gap-[1cqw]">
               {[
                 { span: "col-span-7", name: "Tony Lockhard", role: "Managing Partner", tags: ["Executive Strategy"] },
                 { span: "col-span-5", name: "Jordan Brooks", role: "Director of Digital", tags: ["Core APIs"] },
                 { span: "col-span-4", name: "Sarah Chen", role: "VP Lending", tags: ["Risk Modeling"] },
                 { span: "col-span-4", name: "Marcus Wright", role: "Head of Payments", tags: ["Ledger Core"] },
                 { span: "col-span-4", name: "Michael Thorne", role: "Lead Security", tags: ["Infosec"] },
                 { span: "col-span-5", name: "David Vance", role: "Head of CRM", tags: ["Salesforce"] },
                 { span: "col-span-3", name: "Elena Rostova", role: "Data Ops", tags: ["Pipelines"] },
                 { span: "col-span-4", name: "Chloe Price", role: "Cloud Arch", tags: ["AWS/Azure"] }
               ].map((person, idx) => (
                 <div key={idx} className={cn(person.span, "bg-white/5 border border-white/10 rounded-[1cqw] p-[1.2cqw] transition-all hover:bg-white/10 hover:border-primary/50 flex flex-col relative group cursor-pointer overflow-hidden")}>
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-[1cqw]">
                       <div className="w-[3cqw] h-[3cqw] rounded-full bg-neutral-800 border-[0.1cqw] border-neutral-700 overflow-hidden flex items-center justify-center">
                          <Users size="1.5cqw" className="text-neutral-500 opacity-50" />
                       </div>
                       <QrCode size="1.2cqw" className="text-neutral-600 group-hover:text-primary transition-colors" />
                    </div>
                    {/* Card Body */}
                    <div className="flex flex-col gap-[0.3cqw] flex-grow justify-end">
                       <h3 className="text-white font-display font-bold text-[1.2cqw] leading-none mb-[0.2cqw] truncate">{person.name}</h3>
                       <span className="text-primary text-[0.8cqw] font-bold uppercase tracking-widest leading-none mb-[0.5cqw] truncate">{person.role}</span>
                       <div className="flex flex-wrap gap-[0.3cqw]">
                         {person.tags.map(tag => (
                           <span key={tag} className="bg-white/10 rounded-full px-[0.6cqw] py-[0.2cqw] text-[0.7cqw] text-neutral-300 font-semibold tracking-wide border border-white/5 whitespace-nowrap">
                             {tag}
                           </span>
                         ))}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
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
