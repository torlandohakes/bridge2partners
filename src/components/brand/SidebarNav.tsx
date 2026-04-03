"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const navItems = [
  { id: "strategic-core", label: "Strategic Core" },
  { id: "visual-identity", label: "Visual Identity" },
  { id: "website-guidelines", label: "Website Guidelines" },
  { id: "ui-component-library", label: "UI Component Library" },
  { id: "pitch-deck-guidelines", label: "Pitch Deck Guidelines" },
  { id: "event-presence-guidelines", label: "Event Presence Guidelines" },
];

export function SidebarNav({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "strategic-core";

  return (
    <nav className={cn("sticky top-8 space-y-2", className)}>
      <h3 className="mb-4 px-4 text-sm font-semibold tracking-tight text-neutral uppercase opacity-70">
        Brand Guidelines
      </h3>
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <Link
              key={item.id}
              href={`?tab=${item.id}`}
              scroll={false}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm hover:bg-primary/15"
                  : "text-neutral/70 hover:bg-neutral/5 hover:text-neutral"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
