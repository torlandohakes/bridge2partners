'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PaletteColor {
  name: string;
  hex: string;
}

const BRAND_COLORS: PaletteColor[] = [
  { name: 'B2P Black', hex: '#001b15' },
  { name: 'B2P Green', hex: '#00573f' },
  { name: 'Secondary Teal', hex: '#009677' },
  { name: 'Neutral Slate', hex: '#3d4645' },
  { name: 'Luminous Lime', hex: '#98cc67' },
  { name: 'Sterile White', hex: '#ffffff' },
];

export function BrandPaletteLegend() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col bg-[#001b15] border border-neutral-200/20 rounded-xl shadow-2xl p-4 w-60 z-50">
      <div className="mb-3 pb-2 border-b border-white/10">
        <h3 className="text-white font-ui text-xs font-bold uppercase tracking-widest">
          Brand Palette
        </h3>
        <p className="text-white/50 font-sans text-[10px] mt-0.5">
          Click to copy hex values
        </p>
      </div>

      <div className="flex flex-col space-y-1">
        {BRAND_COLORS.map((color) => (
          <button
            key={color.hex}
            onClick={() => handleCopy(color.hex)}
            className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-md transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full border border-white/20 shadow-inner shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-white/80 font-sans text-xs font-medium group-hover:text-white transition-colors">
                {color.name}
              </span>
            </div>
            
            <div className="flex items-center text-white/40 group-hover:text-primary transition-colors">
              {copiedHex === color.hex ? (
                 <Check className="w-3.5 h-3.5 text-primary" />
              ) : (
                 <span className="font-mono text-[10px] hidden group-hover:inline-block mr-1">{color.hex}</span>
              )}
              {copiedHex !== color.hex && <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
