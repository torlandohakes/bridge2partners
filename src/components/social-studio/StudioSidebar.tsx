import React from 'react';
import { Plus, Trash2, ChevronDown, Eye, EyeOff, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { SlideData, SlideType, TextConfig } from '../LinkedInCarouselTemplate';
import { CustomTemplate } from '@/lib/studio-storage';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface StudioSidebarProps {
  handleTemplateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  customTemplates: CustomTemplate[];
  newSlideType: SlideType;
  setNewSlideType: (type: SlideType) => void;
  handleAddSlide: (type: SlideType) => void;
  handleDeleteSlide: () => void;
  slidesLength: number;
  elementsOpen: boolean;
  setElementsOpen: (val: boolean) => void;
  activeSlide: SlideData;
  updateActiveSlide: (newProps: Partial<SlideData>) => void;
  typographyOpen: boolean;
  setTypographyOpen: (val: boolean) => void;
}

export function StudioSidebar({
  handleTemplateChange,
  customTemplates,
  newSlideType,
  setNewSlideType,
  handleAddSlide,
  handleDeleteSlide,
  slidesLength,
  elementsOpen,
  setElementsOpen,
  activeSlide,
  updateActiveSlide,
  typographyOpen,
  setTypographyOpen
}: StudioSidebarProps) {
  return (
    <aside className="absolute left-0 top-0 bottom-0 h-full w-80 bg-white border-r border-neutral-200 flex flex-col overflow-y-auto shrink-0 z-50 p-5 shadow-[4px_0_15px_rgba(0,0,0,0.02)]">
      
      {/* Global Pattern Library / Template Selector */}
      <div className="flex flex-col space-y-3 bg-neutral-50 p-4 border border-neutral-100 rounded-lg shadow-sm mb-6">
         <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#00573f]">Deck Template</h3>
         <select 
           onChange={handleTemplateChange}
           defaultValue=""
           className="bg-white border border-neutral-200 text-foreground text-xs font-ui font-semibold rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary appearance-none pr-8 cursor-pointer relative w-full shadow-sm capitalize"
           style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
         >
            <option value="" disabled className="bg-[#001b15] text-white/50">Load Template...</option>
            {customTemplates.length > 0 && <optgroup label="Custom Templates" className="bg-[#00140f] text-emerald-400 font-semibold uppercase tracking-wider text-[10px]" />}
            {customTemplates.map(tpl => (
               <option key={tpl.id} value={tpl.id} className="bg-[#001b15] text-white font-normal capitalize">
                 {tpl.name}
               </option>
            ))}
            <optgroup label="System Baselines" className="bg-[#00140f] text-white/50 font-semibold uppercase tracking-wider text-[10px]" />
            {Object.keys(templates).map(key => (
               <option key={key} value={key} className="bg-[#001b15] text-white font-normal capitalize">
                 {key.split('_').join(' ')}
               </option>
            ))}
         </select>
      </div>

      {/* Slide Builder Controls */}
      <div className="flex flex-col space-y-4 bg-neutral-50 p-4 border border-neutral-100 rounded-lg shadow-sm mb-6">
         <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Slide Architecture</h3>
         <select 
           value={newSlideType} 
           onChange={e => setNewSlideType(e.target.value as SlideType)}
           className="bg-white border border-neutral-200 text-foreground text-xs font-ui font-semibold rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary appearance-none pr-8 cursor-pointer relative w-full shadow-sm"
           style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
         >
            <option value="hook">Cover (Hook)</option>
            <option value="thesis">Content (Thesis)</option>
            <option value="solution">Content (Solution)</option>
            <option value="validation">Content (Validation)</option>
            <option value="cta">Action (CTA)</option>
         </select>
         
         <div className="flex items-center space-x-2">
           <button
             onClick={() => handleAddSlide(newSlideType)}
             className="flex-1 flex items-center justify-center space-x-1.5 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded transition-colors shadow-sm"
           >
             <Plus className="w-3.5 h-3.5" />
             <span>Add</span>
           </button>
           
           <button
             onClick={handleDeleteSlide}
             disabled={slidesLength === 1}
             className="flex items-center justify-center p-2.5 bg-white border border-neutral-200 hover:bg-red-50 text-red-500 disabled:opacity-30 rounded transition-colors shadow-sm"
             title="Delete active slide"
           >
             <Trash2 className="w-4 h-4" />
           </button>
         </div>
      </div>

      {/* Manual Design Overrides (Direct Control) */}
      <div className="flex flex-col gap-4 sticky top-0">
        {/* Elements Block */}
        <div className="flex flex-col w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
          <div 
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setElementsOpen(!elementsOpen)}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00573f]">Elements</h3>
            <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", !elementsOpen && "rotate-180")} />
          </div>
         
          {elementsOpen && (
            <div className="flex flex-col space-y-5 mt-4">
              {/* Category: Surface & Structure */}
              <div className="flex flex-col space-y-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-primary">Surface & Structure</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Layout Anchor</label>
                    <select 
                      value={activeSlide.layoutToken || 'center'}
                      onChange={e => updateActiveSlide({ layoutToken: e.target.value as SlideData['layoutToken'] })}
                      className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="top-left">Top Left</option>
                      <option value="top-center">Top Center</option>
                      <option value="top-right">Top Right</option>
                      <option value="left">Center Left</option>
                      <option value="center">Centered Block</option>
                      <option value="right">Center Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-center">Bottom Center</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Surface Fade</label>
                    <select 
                      value={activeSlide.backgroundColorToken || 'dark'}
                      onChange={e => updateActiveSlide({ backgroundColorToken: e.target.value as SlideData['backgroundColorToken'] })}
                      className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <optgroup label="Solid Colors">
                        <option value="dark">Dark</option>
                        <option value="primary">Primary Green</option>
                        <option value="light">Sterile White</option>
                      </optgroup>
                      <optgroup label="Gradients">
                        <option value="gradient-institutional">Institutional Fade</option>
                        <option value="gradient-radial-brand">Radial Focus</option>
                        <option value="gradient-linear-teal">Teal Horizon</option>
                      </optgroup>
                      <optgroup label="Trendy/Effects">
                        <option value="bg-aurora-spots">Aurora Spots</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Card Shape</label>
                    <select 
                      value={activeSlide.cardVariantToken || 'none'}
                      onChange={e => updateActiveSlide({ cardVariantToken: e.target.value as SlideData['cardVariantToken'] })}
                      className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="none">None</option>
                      <option value="glass-panel">Glass Panel</option>
                      <option value="thin-frame">Thin Frame</option>
                      <option value="understated-solid">Understated Solid</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Text Bounding</label>
                    <select 
                      value={activeSlide.contentWidth || '100'}
                      onChange={e => updateActiveSlide({ contentWidth: e.target.value as SlideData['contentWidth'] })}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none font-mono"
                    >
                      <option value="100">100% (Full Bleed)</option>
                      <option value="80">80% Width</option>
                      <option value="65">65% Width</option>
                      <option value="50">50% Width</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className="border-t border-neutral-100" />

              {/* Category: Imagery & Backgrounds */}
              <div className="flex flex-col space-y-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-primary">Imagery & Backgrounds</span>
                
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Image Style</label>
                    <select 
                      value={activeSlide.imageStyleToken || 'none'}
                      onChange={e => updateActiveSlide({ imageStyleToken: e.target.value as SlideData['imageStyleToken'] })}
                      className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <optgroup label="Layouts">
                        <option value="none">None</option>
                        <option value="framed">Framed</option>
                      </optgroup>
                      <optgroup label="Solid Fades">
                        <option value="full-bleed-dark-overlay">Dark Overlay</option>
                        <option value="full-bleed-green-overlay">Green Overlay</option>
                      </optgroup>
                      <optgroup label="Gradients">
                        <option value="overlay-gradient-institutional">Institutional</option>
                        <option value="overlay-gradient-teal">Teal Horizon</option>
                      </optgroup>
                      <optgroup label="Glass & Blur">
                        <option value="overlay-frosted-glass">Frosted Glass</option>
                        <option value="overlay-aurora-spots">Aurora Spots</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full pt-1">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Scale</label>
                      <select 
                        value={activeSlide.imageFit || 'cover'}
                        onChange={e => updateActiveSlide({ imageFit: e.target.value as 'cover' | 'contain' | 'cutout' })}
                        className="w-full bg-neutral-50 border border-neutral-200 text-[10px] rounded p-2 focus:ring-1 focus:ring-primary outline-none uppercase font-mono"
                      >
                        <option value="cover">Cover</option>
                        <option value="contain">Contain</option>
                        <option value="cutout">Anchor Cutout</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Alignment</label>
                      <select 
                        value={activeSlide.imageAlign || 'center'}
                        onChange={e => updateActiveSlide({ imageAlign: e.target.value as SlideData['imageAlign'] })}
                        className="w-full bg-neutral-50 border border-neutral-200 text-[10px] rounded p-2 focus:ring-1 focus:ring-primary outline-none uppercase font-mono"
                      >
                        <option value="far-left">Far Left</option>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="far-right">Far Right</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Stack Order</label>
                      <select 
                        value={activeSlide.imagePosition || 'back'}
                        onChange={e => updateActiveSlide({ imagePosition: e.target.value as 'front' | 'back' })}
                        className="w-full bg-neutral-50 border border-neutral-200 text-[10px] rounded p-2 focus:ring-1 focus:ring-primary outline-none uppercase font-mono"
                      >
                        <option value="back">Back</option>
                        <option value="front">Front</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Opacity</label>
                      <select 
                        value={activeSlide.imageOpacity || '100'}
                        onChange={e => updateActiveSlide({ imageOpacity: e.target.value as SlideData['imageOpacity'] })}
                        className="w-full bg-neutral-50 border border-neutral-200 text-[10px] rounded p-2 focus:ring-1 focus:ring-primary outline-none uppercase font-mono"
                      >
                        <option value="100">100%</option>
                        <option value="80">80%</option>
                        <option value="60">60%</option>
                        <option value="40">40%</option>
                        <option value="20">20%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100" />

              {/* Category: Interface Elements */}
              <div className="flex flex-col space-y-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-primary">Interface Tooling</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Action Button</label>
                    <select 
                      value={activeSlide.buttonStyleToken || ''}
                      onChange={e => updateActiveSlide({ buttonStyleToken: e.target.value as SlideData['buttonStyleToken'] })}
                      className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="">None / Default</option>
                      <option value="teal-solid">Teal (Solid)</option>
                      <option value="white-solid">White (Solid)</option>
                      <option value="glass">Glass</option>
                      <option value="frosted-outline">Frosted Outline</option>
                      <option value="neon-outline">Neon Outline</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100" />

              {/* Category: Brand Identity */}
              <div className="flex flex-col space-y-3">
                 <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-primary">Brand Identity</span>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-1.5 col-span-2">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Mark Style</label>
                      <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full">
                        <button 
                           onClick={() => updateActiveSlide({ brandMarkType: 'watermark' })}
                           className={cn("flex-1 text-[9px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors", (activeSlide.brandMarkType || 'watermark') === 'watermark' && "bg-white text-black shadow-sm")}
                        >Text</button>
                        <button 
                           onClick={() => updateActiveSlide({ brandMarkType: 'logo' })}
                           className={cn("flex-1 text-[9px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors", activeSlide.brandMarkType === 'logo' && "bg-white text-black shadow-sm")}
                        >Logo</button>
                        <button 
                           onClick={() => updateActiveSlide({ brandMarkType: 'icon' })}
                           className={cn("flex-1 text-[9px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors", activeSlide.brandMarkType === 'icon' && "bg-white text-black shadow-sm")}
                        >Icon</button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Scale</label>
                      <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full">
                        {['sm', 'md', 'lg'].map(size => (
                          <button 
                             key={size}
                             onClick={() => updateActiveSlide({ brandMarkSize: size as SlideData['brandMarkSize'] })}
                             className={cn("flex-1 text-[9px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase", (activeSlide.brandMarkSize || 'md') === size && "bg-white text-black shadow-sm")}
                          >{size}</button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Opacity</label>
                      <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full">
                        {['50', '80', '100'].map(op => (
                          <button 
                             key={op}
                             onClick={() => updateActiveSlide({ brandMarkOpacity: op as SlideData['brandMarkOpacity'] })}
                             className={cn("flex-1 text-[9px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors", (activeSlide.brandMarkOpacity || '80') === op && "bg-white text-black shadow-sm")}
                          >{op}%</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5 col-span-2">
                      <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Mark Color</label>
                      <select 
                        value={activeSlide.watermarkColorToken || ''}
                        onChange={e => updateActiveSlide({ watermarkColorToken: e.target.value as SlideData['watermarkColorToken'] })}
                        className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="">Inherit (Auto)</option>
                        <option value="original">Original Asset</option>
                        <option value="text-dark">Dark Slate</option>
                        <option value="text-primary">Primary Green</option>
                        <option value="text-light">White</option>
                      </select>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Typography Layout Block */}
        <div className="flex flex-col w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-4">
          <div 
            className="flex justify-between items-center cursor-pointer select-none"
            onClick={() => setTypographyOpen(!typographyOpen)}
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00573f]">Typography</h3>
            <div className="flex items-center space-x-2">
              <span className="text-[7px] text-neutral-400 bg-neutral-100 px-1 py-0.5 rounded font-bold">SLOTS</span>
              <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", !typographyOpen && "rotate-180")} />
            </div>
          </div>

          {typographyOpen && (
            <div className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-lg p-3 mt-4">
               {[
                 { key: 'eyebrowConfig', label: 'Eyebrow' },
                 { key: 'headlineConfig', label: 'Headline' },
                 { key: 'subheadlineConfig', label: 'Subheadline' },
                 { key: 'bodyConfig', label: 'Body Copy' },
                 { key: 'ctaConfig', label: 'Call to Action' },
                 { key: 'footerConfig', label: 'Footer' },
               ].map(slot => {
                 const config = activeSlide[slot.key as keyof SlideData] as TextConfig || { visible: false, align: 'center' };
                 return (
                   <div key={slot.key} className="flex flex-col space-y-2 pb-3 mb-3 border-b border-neutral-200 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex items-center justify-between">
                        <label className={cn("text-[9px] font-mono uppercase font-semibold flex items-center transition-colors", config.visible ? "text-foreground" : "text-muted-foreground opacity-50")}>
                          {slot.label}
                        </label>
                        <button 
                          onClick={() => updateActiveSlide({ [slot.key]: { ...config, visible: !config.visible }})}
                          className={cn("p-1 rounded opacity-50 hover:bg-neutral-200 transition-colors", config.visible && "text-primary opacity-100")}
                        >
                          {config.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {config.visible && (
                        <div className="flex flex-col gap-1 w-full mt-1">
                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full">
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, align: 'left' }})}
                               className={cn("flex-1 flex justify-center py-1 rounded-sm text-neutral-500 hover:text-black transition-colors", config.align === 'left' && "bg-white text-black shadow-sm")}
                            ><AlignLeft className="w-3.5 h-3.5" /></button>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, align: 'center' }})}
                               className={cn("flex-1 flex justify-center py-1 rounded-sm text-neutral-500 hover:text-black transition-colors", config.align === 'center' && "bg-white text-black shadow-sm")}
                            ><AlignCenter className="w-3.5 h-3.5" /></button>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, align: 'right' }})}
                               className={cn("flex-1 flex justify-center py-1 rounded-sm text-neutral-500 hover:text-black transition-colors", config.align === 'right' && "bg-white text-black shadow-sm")}
                            ><AlignRight className="w-3.5 h-3.5" /></button>
                          </div>
                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full items-center">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[50px]">Size</span>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, size: 'sm' }})}
                               className={cn("flex-1 text-[8px] font-bold py-1 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center", (config.size || 'md') === 'sm' && "bg-white text-black shadow-sm")}
                            >SM</button>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, size: 'md' }})}
                               className={cn("flex-1 text-[8px] font-bold py-1 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center", (config.size || 'md') === 'md' && "bg-white text-black shadow-sm")}
                            >MD</button>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, size: 'lg' }})}
                               className={cn("flex-1 text-[8px] font-bold py-1 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center", (config.size || 'md') === 'lg' && "bg-white text-black shadow-sm")}
                            >LG</button>
                          </div>

                          <div className="flex bg-neutral-200/50 p-1 rounded gap-1 w-full items-center">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[50px]">Color</span>
                            <select 
                              value={config.colorToken || ''}
                              onChange={e => updateActiveSlide({ [slot.key]: { ...config, colorToken: e.target.value }})}
                              className="flex-1 bg-white border border-neutral-200 text-[9px] rounded p-1 outline-none text-black font-semibold uppercase tracking-wider"
                            >
                              <option value="">Slide Default</option>
                              <option value="b2p-black">B2P Black</option>
                              <option value="b2p-green">B2P Green</option>
                              <option value="secondary-teal">Secondary Teal</option>
                              <option value="neutral-slate">Neutral Slate</option>
                              <option value="luminous-lime">Luminous Lime</option>
                              <option value="sterile-white">Sterile White</option>
                            </select>
                          </div>

                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full items-center">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[50px]">Opacity</span>
                            {['100', '80', '50'].map(op => {
                              const defaultOp = slot.key === 'headlineConfig' || slot.key === 'bodyConfig' || slot.key === 'ctaConfig' ? '100' : (slot.key === 'footerConfig' ? '50' : '80');
                              const isActive = (config.opacity || defaultOp) === op;
                              return (
                                <button 
                                   key={op}
                                   onClick={() => updateActiveSlide({ [slot.key]: { ...config, opacity: op }})}
                                   className={cn("flex-1 text-[8px] font-bold py-1 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center", isActive && "bg-white text-black shadow-sm")}
                                >{op}%</button>
                              );
                            })}
                          </div>

                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full items-center overflow-x-auto no-scrollbar">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[40px] shrink-0">Pad</span>
                            {['none', 'sm', 'md', 'lg', 'xl'].map(p => {
                              const isActive = (config.padding || 'none') === p; // Let layout handle glass indent directly
                              return (
                                <button 
                                   key={p}
                                   onClick={() => updateActiveSlide({ [slot.key]: { ...config, padding: p }})}
                                   className={cn("flex-1 px-1.5 text-[8px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center shrink-0", isActive && "bg-white text-black shadow-sm")}
                                >{p}</button>
                              );
                            })}
                          </div>

                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full items-center overflow-x-auto no-scrollbar">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[40px] shrink-0">Space</span>
                            {['none', 'sm', 'md', 'lg', 'xl'].map(p => {
                              const isActive = (config.vSpace || 'none') === p;
                              return (
                                <button 
                                   key={p}
                                   onClick={() => updateActiveSlide({ [slot.key]: { ...config, vSpace: p }})}
                                   className={cn("flex-1 px-1.5 text-[8px] font-bold py-1.5 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center shrink-0", isActive && "bg-white text-black shadow-sm")}
                                >{p}</button>
                              );
                            })}
                          </div>

                          <div className="flex bg-neutral-200/50 p-0.5 rounded gap-0.5 w-full items-center">
                            <span className="text-[7px] font-mono text-neutral-400 uppercase tracking-widest px-2 border-r border-neutral-300 min-w-[50px]">Layout</span>
                            <button 
                               onClick={() => updateActiveSlide({ [slot.key]: { ...config, glassBackground: !config.glassBackground }})}
                               className={cn("flex-1 text-[8px] font-bold py-1 rounded-sm text-neutral-500 hover:text-black transition-colors uppercase tracking-widest text-center", config.glassBackground && "bg-white text-black shadow-sm")}
                            >{config.glassBackground ? 'Glass Active' : 'Standard'}</button>
                          </div>
                        </div>
                      )}
                   </div>
                 );
               })}
             </div>
          )}
        </div>
      </div>
    </aside>
  );
}
