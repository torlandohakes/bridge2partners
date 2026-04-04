"use client";

import { useState } from "react";
import { Award, TrendingUp, Handshake, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const principles = [
  {
    id: "quality",
    icon: Award,
    title: "1. Commitment to Quality",
    subtitle: "Excellence is our North Star",
    body: "We are practitioners first - bankers and technologists who have lived in the trenches. In a hyper-competitive market, \"good enough\" or \"just participating\" with our clients is a slow death. Excellence means delivering expertise, deep domain knowledge, professional judgment, and innovation in everything we do.",
    bullets: [
      { trigger: "The Benchmark Standard", text: "Our work must withstand scrutiny at the highest level, reflecting senior-level judgment and decision-making." },
      { trigger: "Pride in Craft", text: "We hire experienced people who take obsessive pride in their execution, especially when the complexity is high." },
      { trigger: "Implementation over Ideas", text: "We move from ideas to implementation, staying accountable through execution and ensuring that what we design works in the real world." }
    ]
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "2. Growth-Oriented",
    subtitle: "The Bias Toward Action",
    body: "We do not stand still or coast on past success. We operate with an intentional bias toward driving results and scalable growth. We look for ways to expand our impact with existing clients, identify new problems we can solve, and develop new lines of work where our expertise applies.",
    bullets: [
      { trigger: "Commercial Curiosity", text: "Growth means staying curious, being tenacious, and actively pursuing opportunities rather than waiting for them to appear." },
      { trigger: "The Follow-Through Rule", text: "We follow up, close loops, and do not let good conversations fade due to inattention." },
      { trigger: "Scaling Impact", text: "We don't just solve one-off problems; we build scalable solutions for our clients and scalable ways of working for our firm." }
    ]
  },
  {
    id: "relationship",
    icon: Handshake,
    title: "3. Relationship-Focused",
    subtitle: "Trust as Competitive Advantage",
    body: "Relationships are the foundation of our business, and trust is our most valuable currency. In our industry, the firm with the deepest trust wins the biggest deals. Strong relationships broaden our network, strengthen our delivery, and support long-term capability building for both our clients and our team.",
    bullets: [
      { trigger: "The \"No-Status\" Rule", text: "We talk to everyone; we do not pre-judge people based on title or role, because insights often come from unexpected conversations." },
      { trigger: "Radical Listening", text: "We earn trust with our clients and colleagues by listening carefully, seeking to understand not just words, but context, intent, and meaning." },
      { trigger: "Enduring Investment", text: "We take the long view; we invest in people, treating trust as something earned through consistency, dedication, and delivery sustained over time." }
    ]
  },
  {
    id: "outcome",
    icon: Target,
    title: "4. Outcome-Driven",
    subtitle: "We Own the Will to Win",
    body: "We measure success by results, not activity. Delivering hours or completing tasks is a failure if it does not lead to a meaningful business outcome. This mindset applies to every role in the firm (including sales, marketing, delivery, technology and internal operations) and to every client engagement.",
    bullets: [
      { trigger: "Results-First Thinking", text: "Our best work is defined by the tangible impact we create for our clients, our partners, and the firm." },
      { trigger: "Total Ownership", text: "We embed ourselves with our clients and treat their goals as our own." },
      { trigger: "Beyond Implementation", text: "Our work isn't done at the hand-off; we stay engaged to ensure solutions scale and the client's team is equipped to sustain success." }
    ]
  }
];

export function StrategicCore() {
  const [activeId, setActiveId] = useState(principles[0].id);
  const [activeDetail, setActiveDetail] = useState(0);
  const activePrinciple = principles.find(p => p.id === activeId) || principles[0];
  const Icon = activePrinciple.icon;

  return (
    <section className="animate-in fade-in duration-500 space-y-12">
      
      <div className="space-y-4 max-w-4xl border-b border-neutral/10 pb-6">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Guiding Principles
        </h2>
        <p className="text-lg text-neutral/90 font-sans leading-relaxed max-w-3xl">
          These guiding principles define how we operate as a firm and how individuals, teams, and departments are expected to behave in their work. Internally, they provide a shared framework for setting goals, making decisions, and evaluating performance. Externally, they describe how clients and partners should experience Bridge2Partners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
        
        {/* Left Menu Column */}
        <div className="flex flex-col gap-3">
          {principles.map((p) => {
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

        {/* Right Stage Column */}
        <Card key={activeId} variant="frosted" className="animate-in fade-in zoom-in-95 duration-300 ease-out p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 border-b border-neutral/10 pb-6">
               <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-8 h-8 text-primary" />
               </div>
               <div>
                  <h3 className="font-ui text-2xl font-bold tracking-tight text-primary">
                    {activePrinciple.subtitle}
                  </h3>
               </div>
            </div>
            
            
            <p className="text-base text-neutral/80 font-sans leading-relaxed">
              {activePrinciple.body}
            </p>
            
            {/* The Focus Index (Progressive Disclosure) */}
            <div className="flex flex-col gap-1 pt-4">
              {activePrinciple.bullets.map((b, i) => {
                const isDetailActive = activeDetail === i;
                return (
                  <button 
                    key={i} 
                    onClick={() => setActiveDetail(i)}
                    className="flex flex-col text-left group border-b border-neutral/5 pb-2"
                  >
                    <div className="flex items-center py-2 w-full">
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
