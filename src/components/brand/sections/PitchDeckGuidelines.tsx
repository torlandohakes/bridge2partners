"use client";

import { useState } from "react";
import { MoveRight, MonitorPlay, Layers, SplitSquareHorizontal, Goal, Crown } from "lucide-react";
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
    <section className="animate-in fade-in duration-500 space-y-12">
      
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
    </section>
  );
}
