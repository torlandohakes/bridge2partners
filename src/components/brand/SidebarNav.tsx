"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Compass, Palette, Globe, Component, Presentation, MapPin, PanelLeftOpen, PanelLeftClose, BrainCircuit, MessageSquare } from "lucide-react";

const navItems = [
  { id: "strategic-core", label: "Strategic Core", icon: Compass },
  { id: "messaging", label: "Messaging", icon: MessageSquare },
  { id: "visual-identity", label: "Visual Identity", icon: Palette },
  { id: "website-guidelines", label: "Website Guidelines", icon: Globe },
  { id: "ui-component-library", label: "UI Component Library", icon: Component },
  { id: "social-leadership", label: "Thought Leadership", icon: BrainCircuit },
  { id: "pitch-deck-guidelines", label: "Pitch Deck Guidelines", icon: Presentation },
  { id: "event-presence-guidelines", label: "Event Presence Guidelines", icon: MapPin },
];

export function SidebarNav({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "strategic-core";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 flex items-center overflow-x-auto overscroll-x-contain pb-6 pt-3 px-4 bg-white/85 backdrop-blur-xl border-t border-neutral/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "md:static md:bottom-auto md:left-auto md:z-auto md:flex-col md:items-stretch md:overflow-visible md:bg-transparent md:p-0 md:backdrop-blur-none md:border-none md:shadow-none md:pb-0",
        isExpanded ? "md:w-64" : "md:w-[72px]",
        "shrink-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
        className
      )}
    >
      {/* Desktop/Tablet Header & Toggle Button */}
      <div className={cn(
        "hidden md:flex items-center mb-4 transition-all duration-300 min-h-[44px]",
        isExpanded ? "justify-between px-4" : "justify-center px-0"
      )}>
        {isExpanded && (
          <h3 className="text-xs font-bold tracking-widest text-neutral font-mono uppercase opacity-50 whitespace-nowrap overflow-hidden transition-all duration-300">
            Brand Architecture
          </h3>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-neutral/50 hover:text-neutral hover:bg-neutral/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <PanelLeftClose strokeWidth={1.5} className="w-5 h-5 shrink-0" /> : <PanelLeftOpen strokeWidth={1.5} className="w-5 h-5 shrink-0" />}
        </button>
      </div>

      <div className="flex md:flex-col gap-2 lg:gap-1 w-max md:w-auto items-center md:items-stretch transition-all duration-300">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={`?tab=${item.id}`}
              scroll={false}
              title={item.label}
              className={cn(
                "group relative flex items-center justify-center rounded-xl min-h-[44px] min-w-[44px] px-4 py-2.5 text-sm transition-all duration-300 overflow-hidden",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                isExpanded ? "md:justify-start" : "md:justify-center md:px-0",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-neutral/70 hover:bg-neutral/5 hover:text-neutral border border-transparent"
              )}
            >
              <Icon 
                strokeWidth={1.5} 
                className={cn(
                  "w-5 h-5 shrink-0 transition-all duration-300", 
                  isActive ? "text-primary scale-110 drop-shadow-sm" : "text-neutral/50 group-hover:text-neutral/80 group-hover:scale-105"
                )} 
              />
              <span className={cn(
                "hidden md:inline-flex items-center whitespace-nowrap transition-all duration-300",
                isExpanded ? "max-w-[200px] opacity-100 ml-3" : "max-w-0 opacity-0 ml-0",
                isActive ? "font-bold" : "font-medium"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
