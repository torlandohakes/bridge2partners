'use client';

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, ChevronLeft, ChevronRight, ImagePlus } from 'lucide-react';
import { LinkedInCarouselTemplate, SlideType, SlideData } from './LinkedInCarouselTemplate';
import { BrandPaletteLegend } from './BrandPaletteLegend';

export function SocialAssetStudio() {
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  // Carousel State Engine
  const [slides, setSlides] = useState<SlideData[]>([
    { id: 1, type: 'hook', imageUrl: null, text: '' }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeSlide = slides[activeIndex];

  const handleAddSlide = (type: SlideType) => {
    const newSlide: SlideData = {
      id: Date.now(),
      type,
      imageUrl: null,
      text: ''
    };
    setSlides([...slides, newSlide]);
    setActiveIndex(slides.length);
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 1) return; // Need at least one slide
    const updatedSlides = slides.filter((_, idx) => idx !== activeIndex);
    setSlides(updatedSlides);
    
    // Adjust active index if we deleted the last slide
    if (activeIndex >= updatedSlides.length) {
      setActiveIndex(updatedSlides.length - 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) setActiveIndex(activeIndex + 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedSlides = [...slides];
      updatedSlides[activeIndex].imageUrl = imageUrl;
      setSlides(updatedSlides);
    }
  };

  const handleChangeType = (type: SlideType) => {
    const updatedSlides = [...slides];
    updatedSlides[activeIndex].type = type;
    setSlides(updatedSlides);
  };

  const handleExport = () => {
    // Placeholder function for html-to-image pipeline
    console.log('Exporting canvas to PNG...', { aspectRatio, activeIndex, slidesCount: slides.length });
  };

  // Compute bounding box based on aspect ratio
  const getAspectRatioClasses = (ratio: string) => {
    switch (ratio) {
      case '1:1': return 'aspect-square max-w-[500px] w-full';
      case '4:5': return 'aspect-[4/5] max-w-[450px] w-full';
      case '16:9': return 'aspect-video max-w-[800px] w-full';
      case '9:16': return 'aspect-[9/16] max-w-[400px] w-full';
      default: return 'aspect-square max-w-[500px] w-full';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans">
      {/* Zone 1: The Command Header */}
      <header className="bg-[#001b15] border-b border-primary/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center border border-white/20">
            <span className="text-white text-xs font-mono font-bold tracking-widest leading-none">SAS</span>
          </div>
          <h1 className="text-white font-ui font-semibold tracking-wide uppercase text-sm">
            Social Asset Studio
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="flex flex-col space-y-1 w-full sm:w-48">
            <label className="text-[10px] font-ui text-white/50 uppercase tracking-widest font-semibold flex justify-between">
              <span>Aspect Ratio Matrix</span>
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm font-sans rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none transition-all cursor-pointer"
            >
              <option value="1:1" className="bg-[#001b15] text-white">1:1 (LinkedIn Square)</option>
              <option value="4:5" className="bg-[#001b15] text-white">4:5 (Portrait)</option>
              <option value="16:9" className="bg-[#001b15] text-white">16:9 (Presentation)</option>
              <option value="9:16" className="bg-[#001b15] text-white">9:16 (Stories)</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1 w-full sm:w-48">
            <label className="text-[10px] font-ui text-white/50 uppercase tracking-widest font-semibold flex justify-between">
              <span>Active Slide Type</span>
            </label>
            <select
              value={activeSlide.type}
              onChange={(e) => handleChangeType(e.target.value as SlideType)}
              className="bg-white/5 border border-white/10 text-white text-sm font-sans rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary appearance-none transition-all cursor-pointer"
            >
              <option value="hook" className="bg-[#001b15] text-white">Cover Slide (Hook)</option>
              <option value="thesis" className="bg-[#001b15] text-white">Content Slide (Thesis)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Zone 2: The Render Canvas */}
      <main className="flex-1 bg-neutral-100/50 relative overflow-y-auto flex flex-col items-center justify-center p-8">
        
        {/* Floating Brand Palette */}
        <div className="absolute top-8 right-8 hidden lg:block z-40">
          <BrandPaletteLegend />
        </div>

        {/* Constraints wrapper to mimic a realistic viewport for the canvas */}
        <div 
          className={`relative shadow-2xl transition-all duration-300 ease-in-out bg-white border border-neutral-200/50 flex-shrink-0 ${getAspectRatioClasses(aspectRatio)}`}
        >
          {/* Target Element for html-to-image */}
          <div id="export-canvas" className="w-full h-full absolute inset-0 overflow-hidden">
            <LinkedInCarouselTemplate slide={activeSlide} />
          </div>
        </div>

      </main>

      {/* Zone 3: The Unified Export & Management Console */}
      <footer className="bg-white border-t border-neutral-200 p-4 flex flex-col lg:flex-row items-center justify-between gap-4 shrink-0 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] w-full">
        
        {/* Slide Toggle & Indicator */}
        <div className="flex items-center space-x-4 bg-neutral-50 px-4 py-2 border border-neutral-200 rounded-md">
           <button 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              className="text-foreground/50 hover:text-primary disabled:opacity-30 transition-colors focus:outline-none"
              title="Previous Slide"
           >
              <ChevronLeft className="w-5 h-5" />
           </button>
           <span className="text-xs font-ui font-bold text-foreground/70 uppercase tracking-widest min-w-[70px] text-center">
             {activeIndex + 1} / {slides.length}
           </span>
           <button 
              onClick={handleNext} 
              disabled={activeIndex === slides.length - 1}
              className="text-foreground/50 hover:text-primary disabled:opacity-30 transition-colors focus:outline-none"
              title="Next Slide"
           >
              <ChevronRight className="w-5 h-5" />
           </button>
        </div>

        {/* Slide Management */}
        <div className="flex items-center space-x-3 bg-neutral-50 p-2 border border-neutral-200 rounded-md">
           <button
             onClick={() => handleAddSlide('hook')}
             className="flex items-center justify-center space-x-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 shadow-sm text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors"
           >
             <Plus className="w-3.5 h-3.5 text-primary" />
             <span className="hidden sm:inline-block">Add Hook</span>
           </button>
           <button
             onClick={() => handleAddSlide('thesis')}
             className="flex items-center justify-center space-x-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 shadow-sm text-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors"
           >
             <Plus className="w-3.5 h-3.5 text-primary" />
             <span className="hidden sm:inline-block">Add Thesis</span>
           </button>
           
           <div className="w-px h-5 bg-neutral-300 ml-2" />
           
           <button
             onClick={handleDeleteSlide}
             disabled={slides.length === 1}
             className="flex items-center justify-center p-1.5 hover:bg-red-50 text-red-400 hover:text-red-600 disabled:opacity-30 rounded-sm transition-colors ml-2"
             title="Delete active slide"
           >
             <Trash2 className="w-4 h-4" />
           </button>
        </div>

        {/* Output Console (Background & Export) */}
        <div className="flex items-center space-x-3">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-white border border-neutral-200 text-foreground font-ui px-4 py-2.5 rounded-md font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-200 active:scale-95 hover:bg-neutral-50 shadow-sm"
          >
            <ImagePlus className="w-4 h-4 text-primary" />
            <span className="uppercase tracking-widest font-bold text-[10px] sm:text-xs">Background</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-primary border text-white font-ui px-4 py-2.5 rounded-md font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95 hover:brightness-110"
          >
            <Download className="w-4 h-4" />
            <span className="uppercase tracking-widest font-bold text-[10px] sm:text-xs">Export to PNG</span>
          </button>
        </div>

      </footer>
    </div>
  );
}
