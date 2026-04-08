'use client';

import React from 'react';
import { shapeVariants, textColors, colors, layouts } from '@/lib/design-tokens';
import { cn } from '@/lib/utils';

export function TokenDictionaryLegend() {
  return (
    <div className="flex flex-col bg-[#001b15] border border-neutral-200/20 rounded-xl shadow-2xl p-4 w-60 z-50 pointer-events-auto">
      <div className="mb-3 pb-2 border-b border-white/10 sticky top-0 bg-[#001b15] z-10">
        <h3 className="text-white font-ui text-xs font-bold uppercase tracking-widest">
          Token Dictionary
        </h3>
        <p className="text-white/50 font-sans text-[10px] mt-0.5">
          AI Architecture Definitions
        </p>
      </div>

      <div className="flex flex-col space-y-4 max-h-[350px] overflow-y-auto pr-1">
        
        {/* Backgrounds */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#98cc67] uppercase tracking-widest font-bold">Surfaces</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(colors).map(([token, twClass]) => (
              <div key={token} className="relative group rounded overflow-hidden border border-white/10 h-[38px] flex items-center justify-center">
                <div className={cn("absolute inset-0", twClass)} />
                <span className={cn(
                  "relative z-10 text-[8px] font-mono font-bold uppercase transition-opacity",
                  ['primary', 'neutral', 'dark'].includes(token) ? 'text-white/80 group-hover:text-white' : 'text-slate-900/80 group-hover:text-slate-900'
                )}>{token}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text Typographic Archetypes */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#98cc67] uppercase tracking-widest font-bold">Text Colors</span>
          <div className="flex flex-col gap-2">
            {Object.entries(textColors).map(([token, twClass]) => {
              let fontClass = "font-serif text-sm";
              let sampleText = "Preview";
              let archetype = "Default";
              let bgClass = "bg-white/5";
              let labelClass = "text-white/50";
              let bottomClass = "text-white/30";

              if (token === 'text-light') {
                fontClass = "font-display font-extrabold text-xl tracking-tight leading-none";
                sampleText = "Transformative.";
                archetype = "Montserrat (Hero)";
              } else if (token === 'text-dark') {
                fontClass = "font-heading font-semibold text-sm tracking-tight leading-snug";
                sampleText = "Capital Routing";
                archetype = "Inter (Interface)";
                bgClass = "bg-slate-50";
                labelClass = "text-slate-500";
                bottomClass = "text-slate-400";
              } else if (token === 'text-accent') {
                fontClass = "font-data font-semibold text-xl tracking-wide leading-none";
                sampleText = "+34.2% Yield";
                archetype = "Barlow (Financial)";
              }

              return (
                <div key={token} className={cn("flex flex-col px-3 py-2 rounded border border-white/10", bgClass)}>
                  <span className={cn("text-[9px] font-mono mb-1.5", labelClass)}>{token}</span>
                  <span className={cn(fontClass, twClass)}>{sampleText}</span>
                  <span className={cn("text-[7px] uppercase mt-2 tracking-widest font-bold", bottomClass)}>{archetype}</span>
                </div>
              );
            })}
            
            {/* Inherited Body Font */}
            <div className="flex flex-col px-3 py-2 rounded border border-white/10 bg-[#001b15] shadow-inner">
              <span className="text-[9px] font-mono mb-1.5 text-white/50">body (inherited)</span>
              <span className="font-sans text-[10px] leading-relaxed text-white/80">
                Transformative growth requires deep, structural fortitude. We engineer compliance-first orchestration flows.
              </span>
              <span className="text-[7px] uppercase mt-2 tracking-widest font-bold text-white/30">Public Sans (Long-Form)</span>
            </div>
          </div>
        </div>

        {/* Shapes */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#98cc67] uppercase tracking-widest font-bold">Shape Variants</span>
          <div className="flex flex-col gap-2">
            {Object.entries(shapeVariants).map(([token, twClass]) => (
              <div key={token} className="relative bg-slate-900 rounded border border-white/5 p-2 overflow-hidden flex flex-col justify-center min-h-[50px] group">
                 <div className="absolute inset-0 bg-[#00573f] opacity-10 pointer-events-none" />
                 <span className="text-[8px] font-mono text-white/40 mb-1 z-10">{token}</span>
                 <div className={cn("w-full py-2 flex items-center justify-center z-10", twClass)}>
                   <span className={cn("text-[8px] font-bold uppercase", twClass.includes('text-white') ? 'text-white' : 'text-slate-900')}>Preview Box</span>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
