"use client";

import { useState } from "react";
import { MoveRight, MonitorPlay, Layers, SplitSquareHorizontal, Goal, Crown, AlertCircle, Shield, Network, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const deckSections = [
  {
    id: "grid",
    icon: SplitSquareHorizontal,
    title: "1. The Grid Math",
    subtitle: "Coordinate System Restrictions",
    body: "Consistency breeds trust. If slides jump around during a presentation, the subconscious perception of quality immediately drops. Our deck grid is engineered to ensure absolute, pixel-perfect physical alignment from slide 1 to slide 50.",
    bullets: [
      { trigger: "Left & Right Margins", text: "Must be rigidly locked to exactly 0.85 inches. No content or text box should bleed past this line." },
      { trigger: "Top Margin", text: "Must be locked to exactly 0.35 inches to accommodate the Icon + Title macro-structure." },
      { trigger: "The Grid Bleed", text: "Background imagery or dynamic meshes are the only elements permitted to bleed off the slide edges." }
    ]
  },
  {
    id: "anatomy",
    icon: Layers,
    title: "2. Slide Anatomy",
    subtitle: "The 6 Structural Elements",
    body: "Every core slide must adhere to the 6 structural elements. This standardized architecture prevents mental fatigue for rapid executive consumption and allows us to rapidly scale pitch decks across different domains while maintaining a single cohesive voice.",
    bullets: [
      { trigger: "1. Focus Icon", text: "Located in the top left alignment. Establishes the immediate cognitive context of the slide." },
      { trigger: "2. The Title", text: "Set in font-display Montserrat, anchoring the top layout block." },
      { trigger: "3. The Description", text: "Directly underneath the title. A 1-2 sentence thesis statement that summarizes the entire slide's conclusion." },
      { trigger: "4. The Content", text: "The primary data visualizations, structural models, ROI grids, or strategic pillars." },
      { trigger: "5. Pagination", text: "Situated quietly in the bottom right corner as a non-intrusive anchor." },
      { trigger: "6. B2P Logo", text: "A permanent watermarked anchor to constantly enforce the brand identity." }
    ]
  },
  {
    id: "hierarchy",
    icon: Crown,
    title: "3. Typographic Constraints",
    subtitle: "Applying the 4-Tier Archetypes",
    body: "Do not deviate from the Typographic Archetypes established in the web dashboard. The exact same psychological principles apply to physical presentations.",
    bullets: [
      { trigger: "Slide Titles", text: "Montserrat (700, 800) for maximum executive authority." },
      { trigger: "Numeric Visualizations", text: "Barlow (500, 600) for all graphs, ROI callouts, and dense data labels." },
      { trigger: "Interface Legends", text: "Inter (500) for diagram keys, chart legends, and metadata tags." },
      { trigger: "Paragraph Blocks", text: "Public Sans (300, 400) for prolonged reading spans on text-heavy slides." }
    ]
  },
  {
    id: "delivery",
    icon: MonitorPlay,
    title: "4. Presentation Fidelity",
    subtitle: "Export & Delivery Protocols",
    body: "A beautiful deck can be ruined instantly by poor delivery formatting or broken fonts on a client's machine.",
    bullets: [
      { trigger: "Immutable Export", text: "Unless requested otherwise, NEVER send raw `.pptx` or `.key` files. Always deliver flat `.pdf` documents to ensure fonts and layout vectors remain perfectly intact on every machine." },
      { trigger: "16:9 Aspect Ratio", text: "Our universal standard for executive presentations. 4:3 is strictly prohibited." },
      { trigger: "Dark Mode Supremacy", text: "When projecting in heavily lit board rooms, default to our Tertiary dark backgrounds (#001b15) to maintain high contrast and the SaaS aesthetic." }
    ]
  }
];

export function PitchDeckGuidelines() {
  const [activeId, setActiveId] = useState(deckSections[0].id);
  const [activeDetail, setActiveDetail] = useState(0);

  const activeSection = deckSections.find(p => p.id === activeId) || deckSections[0];
  const Icon = activeSection.icon;

  return (
    <section className="animate-in fade-in duration-500 space-y-16">
      
      <div className="space-y-4 max-w-4xl border-b border-neutral/10 pb-6">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Pitch Deck Architecture
        </h2>
        <p className="text-lg text-neutral/90 font-sans leading-relaxed max-w-3xl">
          Standards for executive presentations, mirroring our dynamic interactive SaaS layouts. These structural guardrails maintain our authoritative institutional voice during high-ticket live engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
        {/* Left Menu Column */}
        <div className="flex flex-col gap-3">
          {deckSections.map((p) => {
            const isActive = p.id === activeId;
            const ItemIcon = p.icon;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveId(p.id);
                  setActiveDetail(0);
                }}
                className={cn(
                  "p-4 rounded-lg transition-all duration-300 flex items-center gap-4 text-left border",
                  isActive
                    ? "bg-white/60 backdrop-blur-md border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.03)] scale-100"
                    : "bg-transparent border-transparent hover:bg-white/30 text-neutral/70 hover:text-neutral scale-[0.98]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isActive ? "bg-primary text-white" : "bg-neutral/10 text-neutral/50 group-hover:bg-neutral/20"
                )}>
                  <ItemIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "font-ui font-bold tracking-tight text-sm",
                    isActive ? "text-primary" : ""
                  )}>
                    {p.title}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Stage Column (The Focus Index) */}
        <Card key={activeId} variant="frosted" className="animate-in fade-in zoom-in-95 duration-300 ease-out p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-neutral/10 pb-6">
               <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
               </div>
               <div>
                  <h3 className="font-ui text-2xl font-bold tracking-tight text-primary">
                    {activeSection.subtitle}
                  </h3>
               </div>
            </div>
            
            <p className="text-base text-neutral/80 font-sans leading-relaxed">
              {activeSection.body}
            </p>
            
            {/* The Focus Index (Progressive Disclosure) */}
            <div className="flex flex-col gap-1 pt-4">
              {activeSection.bullets.map((b, i) => {
                const isDetailActive = activeDetail === i;
                return (
                  <button 
                    key={i} 
                    onClick={() => setActiveDetail(i)}
                    className="flex flex-col text-left group border-b border-neutral/5 pb-2 cursor-pointer"
                  >
                    <div className="flex items-center py-2 w-full justify-between">
                      <span className={cn(
                        "transition-colors duration-300 font-ui font-bold tracking-tight text-sm",
                        isDetailActive ? "text-primary" : "text-neutral/40 group-hover:text-neutral/70"
                      )}>
                        {b.trigger}
                      </span>
                    </div>
                    
                    <div className={cn(
                      "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isDetailActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}>
                      <div className="overflow-hidden">
                        <p className={cn(
                          "text-sm text-neutral/70 font-sans leading-relaxed pb-3 transition-opacity duration-300",
                          isDetailActive ? "opacity-100" : "opacity-0"
                        )}>
                           {b.text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <div className="h-px w-full bg-neutral/10 my-8"></div>

      {/* Part 1: The Executive Mandate */}
      <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0 border border-primary/20">
            <AlertCircle className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-3">
            <h3 className="font-ui text-2xl font-bold tracking-tight text-primary">The Cognitive Load Mandate</h3>
            <p className="font-sans text-neutral-700 leading-relaxed max-w-3xl text-lg font-medium">
              "If the prospect is reading, they cannot listen. Our salespeople are the presentation; the deck is merely the visual anchor."
            </p>
          </div>
        </div>
        <div className="bg-[#dc2626]/5 border border-[#dc2626]/20 rounded-xl p-5 flex items-start gap-4 shadow-sm ml-0 md:ml-20">
           <Shield className="w-6 h-6 text-[#dc2626] shrink-0 mt-0.5" />
           <p className="font-sans text-[#dc2626] font-semibold tracking-wide text-sm leading-relaxed">
             Strictly forbid bulleted lists and paragraphs. Restrict slides to a maximum of 12 words. Emphasize massive typography (<code className="font-mono bg-white/50 px-1.5 py-0.5 rounded text-xs border border-[#dc2626]/10">font-display</code>) and single, high-signal data points (<code className="font-mono bg-white/50 px-1.5 py-0.5 rounded text-xs border border-[#dc2626]/10">font-data</code>).
           </p>
        </div>
      </div>

      {/* Part 2: The 6-Slide Narrative */}
      <div className="space-y-8 pt-8">
        <h3 className="font-ui text-2xl font-bold tracking-tight text-primary border-b border-neutral/10 pb-4">
          The 6-Slide Strategic Narrative
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Wireframe 1: The Hook */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#001b15] border-dashed border-2 border-white/20 rounded-xl shadow-lg relative flex flex-col items-center justify-center p-8 overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
               <span className="font-display font-bold text-4xl lg:text-5xl text-white tracking-tight leading-tight text-center">
                 The Era of<br/>Slow M&A is Dead.
               </span>
               <div className="absolute bottom-4 right-6 text-white/30 text-xs font-mono">01</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Hook (The Shift)</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">Name the undeniable reality.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Speaker Note:</strong> "Do not talk about B2P. Talk about the squeeze between megabanks and agile fintechs."
               </p>
            </div>
          </div>

          {/* Wireframe 2: The Stakes */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#001b15] border-dashed border-2 border-white/20 rounded-xl shadow-lg relative flex overflow-hidden">
               <div className="w-1/2 flex items-center justify-center p-6 border-r border-white/10 bg-black/20">
                 <span className="font-display font-medium text-2xl lg:text-3xl text-white/50 text-center leading-tight">Quarters of<br/>Tech Debt.</span>
               </div>
               <div className="w-1/2 flex items-center justify-center p-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[#98cc67]/10" />
                 <span className="font-display font-bold text-2xl lg:text-3xl text-[#98cc67] text-center leading-tight drop-shadow-md z-10">Results in<br/>Weeks.</span>
               </div>
               <div className="absolute bottom-4 right-6 text-white/30 text-xs font-mono z-20">02</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Stakes</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">Polarize the room.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Speaker Note:</strong> "Frame integration friction as an existential threat to their valuation."
               </p>
            </div>
          </div>

          {/* Wireframe 3: The Pattern Interrupt */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#001b15] border-dashed border-2 border-white/20 rounded-xl shadow-lg relative flex items-center justify-center p-8 overflow-hidden">
               <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center">
                  {/* Center Node */}
                  <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center z-20 backdrop-blur-md shadow-2xl">
                    <Network className="w-8 h-8 text-[#98cc67] mb-1" />
                    <span className="text-[11px] text-white font-ui font-bold text-center leading-tight tracking-wide">Systems of<br/>Record</span>
                  </div>
                  {/* Satellites */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
                     <span className="text-[9px] text-white/70 uppercase tracking-widest font-semibold">Lending</span>
                  </div>
                  <div className="absolute bottom-6 left-0 -translate-x-1/4 w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
                     <span className="text-[9px] text-white/70 uppercase tracking-widest font-semibold">Wealth</span>
                  </div>
                  <div className="absolute bottom-6 right-0 translate-x-1/4 w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center z-10">
                     <span className="text-[9px] text-white/70 uppercase tracking-widest font-semibold">Treasury</span>
                  </div>
                  {/* Connecting lines conceptually simulated */}
                  <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
                    <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2"/>
                    <line x1="50" y1="50" x2="15" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2"/>
                    <line x1="50" y1="50" x2="85" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2"/>
                  </svg>
               </div>
               <div className="absolute bottom-4 right-6 text-white/30 text-xs font-mono z-20">03</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Pattern Interrupt</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">Simplify the Ecosystem.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Speaker Note:</strong> "Explain that integration fails when treated as an IT problem rather than a systems architecture problem."
               </p>
            </div>
          </div>

          {/* Wireframe 4: The Promised Land */}
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-primary to-primary-dark border-dashed border-2 border-white/30 rounded-xl shadow-lg relative flex flex-col items-center justify-center p-8 overflow-hidden group">
               <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
               <span className="font-display font-extrabold text-4xl lg:text-5xl text-white tracking-tighter leading-tight text-center drop-shadow-md">
                 The Agile<br/>Regional Institution.
               </span>
               <div className="absolute bottom-4 right-6 text-white/50 text-xs font-mono">04</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Promised Land</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">The frictionless future state.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Visual Rules:</strong> Maximum contrast. The Promised Land slide must feel entirely distinct from the problem slides to immediately alter the room's energy.
               </p>
            </div>
          </div>

          {/* Wireframe 5: The Magic Tools */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#001b15] border-dashed border-2 border-white/20 rounded-xl shadow-lg relative flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full h-full">
                 <div className="bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 relative p-4 shadow-inner">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#98cc67]"/></div>
                   <span className="text-[10px] md:text-xs text-white/80 font-ui text-center leading-tight font-medium">Commercial<br/>Lending</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 relative p-4 shadow-inner">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#98cc67]"/></div>
                   <span className="text-[10px] md:text-xs text-white/80 font-ui text-center leading-tight font-medium">Treasury<br/>Solutions</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 relative p-4 shadow-inner">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#98cc67]"/></div>
                   <span className="text-[10px] md:text-xs text-white/80 font-ui text-center leading-tight font-medium">Wealth<br/>Management</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 relative p-4 shadow-inner">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-[#98cc67]"/></div>
                   <span className="text-[10px] md:text-xs text-white/80 font-ui text-center leading-tight font-medium">Digital<br/>Onboarding</span>
                 </div>
               </div>
               <div className="absolute bottom-4 right-6 text-white/30 text-xs font-mono z-20 bg-[#001b15] px-1">05</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Magic Tools</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">Introduce B2P Capabilities.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Speaker Note:</strong> "Position our ex-banker SME experience as the required bridge to the Promised Land."
               </p>
            </div>
          </div>

          {/* Wireframe 6: The Proof */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#001b15] border-dashed border-2 border-white/20 rounded-xl shadow-lg relative flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden">
               <div className="flex-1 w-full flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex flex-col items-center flex-1 border-r border-white/10 gap-2">
                    <span className="font-data text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">$250B</span>
                    <span className="font-ui text-[10px] sm:text-xs text-[#98cc67] uppercase tracking-widest font-bold drop-shadow">M&A Integration</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 gap-2">
                    <span className="font-data text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight">40+</span>
                    <span className="font-ui text-[10px] sm:text-xs text-[#98cc67] uppercase tracking-widest font-bold drop-shadow">Integrations Delivered</span>
                  </div>
               </div>
               <div className="w-full h-16 flex items-center justify-center gap-8 sm:gap-12 pt-6 opacity-40">
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">Bank of America</span>
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">Wells Fargo</span>
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">Chase</span>
               </div>
               <div className="absolute bottom-4 right-6 text-white/30 text-xs font-mono z-20">06</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-neutral/10 p-5 rounded-xl shadow-sm">
               <span className="font-ui font-bold text-neutral-800 text-sm block mb-1">Concept: The Proof</span>
               <span className="font-ui text-[11px] text-neutral-500 uppercase tracking-widest font-bold mb-3 block">Validation & Data.</span>
               <p className="font-sans text-sm text-neutral-600 leading-relaxed bg-white/50 p-3 rounded border border-neutral/5">
                 <strong className="text-neutral-800">Speaker Note:</strong> "End with a functional Call to Action—route them to the digital Gap Analysis, not a generic 'Questions?' slide."
               </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
