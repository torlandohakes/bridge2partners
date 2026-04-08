'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import localforage from 'localforage';
import { Download, Plus, Trash2, ChevronLeft, ChevronRight, ImagePlus, Upload, Save, Eye, EyeOff, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { LinkedInCarouselTemplate, SlideType, SlideData, TextConfig } from './LinkedInCarouselTemplate';
import { BrandPaletteLegend } from './BrandPaletteLegend';
import { TokenDictionaryLegend } from './TokenDictionaryLegend';
import { templates } from '../lib/templates';
import { cn } from '@/lib/utils';

export function SocialAssetStudio() {
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  // Carousel State Engine
  const [slides, setSlides] = useState<SlideData[]>(templates.default_blank);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [newSlideType, setNewSlideType] = useState<SlideType>('thesis');
  const [isHydrating, setIsHydrating] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);

  const activeSlide = slides[activeIndex];

  // Hydration Engine
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await localforage.getItem<{ slides: SlideData[], aspectRatio: string }>('b2p-sas-state');
        if (savedState) {
          if (savedState.slides && savedState.slides.length > 0) setSlides(savedState.slides);
          if (savedState.aspectRatio) setAspectRatio(savedState.aspectRatio);
        }
      } catch (e) {
        console.error("Hydration failed", e);
      } finally {
        setIsHydrating(false);
      }
    };
    loadState();
  }, []);

  // Sync Engine
  useEffect(() => {
    if (isHydrating) return;
    localforage.setItem('b2p-sas-state', { slides, aspectRatio }).catch(console.error);
  }, [slides, aspectRatio, isHydrating]);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateKey = e.target.value;
    const template = templates[templateKey];
    if (!template) return;
    
    if (window.confirm("Applying a new template will overwrite your current slides. Continue?")) {
      setSlides(JSON.parse(JSON.stringify(template)));
      setActiveIndex(0);
      e.target.value = ""; // Reset dropdown to placeholder
    }
  };

  const handleAddSlide = (type: SlideType) => {
    const baseConfig: TextConfig = { visible: true, align: 'center' };
    const newSlide: SlideData = {
      id: Date.now(),
      type,
      imageUrl: null,
      text: '',
      eyebrowConfig: { ...baseConfig },
      headlineConfig: { ...baseConfig },
      subheadlineConfig: { ...baseConfig },
      bodyConfig: { ...baseConfig },
      ctaConfig: { ...baseConfig },
      footerConfig: { ...baseConfig },
    };
    setSlides([...slides, newSlide]);
    setActiveIndex(slides.length);
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, idx) => idx !== activeIndex);
    setSlides(newSlides);
    if (activeIndex >= newSlides.length) {
      setActiveIndex(newSlides.length - 1);
    }
  };

  const updateActiveSlide = (newProps: Partial<SlideData>) => {
    const newSlides = [...slides];
    newSlides[activeIndex] = { ...newSlides[activeIndex], ...newProps };
    setSlides(newSlides);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const updatedSlides = [...slides];
        updatedSlides[activeIndex].imageUrl = imageUrl;
        setSlides(updatedSlides);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportProject = () => {
    const projectData = JSON.stringify({ aspectRatio, slides }, null, 2);
    const blob = new Blob([projectData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `b2p-project-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };


  const handleImportProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.slides && json.aspectRatio) {
           setSlides(json.slides);
           setAspectRatio(json.aspectRatio);
           setActiveIndex(0);
        }
      } catch (err) {
         console.error('Failed to parse project file', err);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (e.target) e.target.value = '';
  };


  const handleChangeType = (type: SlideType) => {
    const updatedSlides = [...slides];
    updatedSlides[activeIndex].type = type;
    setSlides(updatedSlides);
  };

  const getPdfDimensions = (ratio: string) => {
    switch (ratio) {
      case '16:9': return { width: 800, height: 450 };
      case '4:5': return { width: 450, height: 562.5 };
      case '9:16': return { width: 400, height: 711.11 };
      case '1:1': default: return { width: 500, height: 500 };
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      if (slides.length === 1) {
        const node = document.getElementById('export-stage-0');
        if (node) {
          const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, skipFonts: false });
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `b2p-social-asset-${Date.now()}.png`;
          link.click();
        }
        return;
      }

      const dims = getPdfDimensions(aspectRatio);
      const isLandscape = dims.width > dims.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [dims.width, dims.height]
      });

      for (let i = 0; i < slides.length; i++) {
        const node = document.getElementById(`export-stage-${i}`);
        if (!node) continue;

        const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, skipFonts: false });
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, dims.width, dims.height);
      }

      pdf.save(`b2p-linkedin-carousel-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Failed to generate rendering buffer', error);
    } finally {
      setIsExporting(false);
    }
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

  if (isHydrating) {
     return <div className="min-h-screen bg-[#001b15] flex items-center justify-center font-ui text-xs text-white/50 uppercase tracking-widest">Hydrating Persistence Engine...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans relative">
      
      {/* Off-screen Staging Area for Multi-Slide Export */}
      <div className="fixed top-[200vh] left-[-9999px] pointer-events-none opacity-0 z-[-1] flex flex-col gap-4">
        {slides.map((slide, idx) => {
          const dims = getPdfDimensions(aspectRatio);
          return (
            <div 
              key={`stage-${slide.id}`} 
              style={{ width: `${dims.width}px`, height: `${dims.height}px` }}
              className="relative bg-white flex-shrink-0"
            >
              <div id={`export-stage-${idx}`} className="w-full h-full absolute inset-0 overflow-hidden">
                <LinkedInCarouselTemplate slide={slide} />
              </div>
            </div>
          );
        })}
      </div>

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
          
          {/* Persistence Engine Controls */}
          <div className="flex items-center space-x-1 border-r border-white/10 pr-4 mr-1 hidden md:flex">
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={projectInputRef} 
              onChange={handleImportProject} 
            />
            <button
               onClick={() => projectInputRef.current?.click()}
               className="flex items-center justify-center p-2 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
               title="Load Project"
            >
               <Upload className="w-4 h-4" />
            </button>
            <button
               onClick={handleExportProject}
               className="flex items-center justify-center p-2 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
               title="Save Project (.json)"
            >
               <Save className="w-4 h-4" />
            </button>
          </div>

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
              <span>Current Slide Template</span>
            </label>
            <select 
              value={activeSlide.type}
              onChange={(e) => handleChangeType(e.target.value as SlideType)}
              className="bg-[#00140f] border border-white/20 text-white text-xs font-ui rounded px-3 py-2 outline-none focus:ring-1 focus:ring-primary appearance-none pr-8 cursor-pointer relative"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
            >
              <option value="hook" className="bg-[#001b15] text-white">Cover Slide (Hook)</option>
              <option value="thesis" className="bg-[#001b15] text-white">Content Slide (Thesis)</option>
              <option value="solution" className="bg-[#001b15] text-white">Content Slide (Solution)</option>
              <option value="validation" className="bg-[#001b15] text-white">Content Slide (Validation)</option>
              <option value="cta" className="bg-[#001b15] text-white">Action Slide (CTA)</option>
            </select>
          </div>

          {/* Action Console (Background & Export) */}
          <div className="flex items-end space-x-2 pl-4 border-l border-white/10 shrink-0 h-full">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-ui h-9 px-3 rounded transition-all focus:outline-none"
              title="Upload Background Image"
            >
              <ImagePlus className="w-4 h-4" />
              <span className="uppercase tracking-widest font-bold text-[10px] hidden xl:inline-block">Background</span>
            </button>


            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center justify-center space-x-2 bg-[#98cc67] text-[#001b15] font-ui h-9 px-4 rounded transition-all focus:outline-none ${isExporting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95 hover:brightness-110'}`}
              title="Export to PDF"
            >
              <Download className="w-4 h-4" />
              <span className="uppercase tracking-widest font-bold text-[10px] hidden xl:inline-block">
                {isExporting ? 'Collating...' : 'Export'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Hand Direct Control Sidebar */}
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
                <option value="" disabled>Select Template...</option>
                {Object.keys(templates).map(k => (
                  <option key={k} value={k}>{k.replace(/_/g, ' ')}</option>
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
                 disabled={slides.length === 1}
                 className="flex items-center justify-center p-2.5 bg-white border border-neutral-200 hover:bg-red-50 text-red-500 disabled:opacity-30 rounded transition-colors shadow-sm"
                 title="Delete active slide"
               >
                 <Trash2 className="w-4 h-4" />
               </button>
             </div>
          </div>

          {/* Manual Design Overrides (Direct Control) */}
          <div className="flex flex-col w-full bg-white border border-neutral-200 rounded-lg shadow-sm p-4 sticky top-0">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00573f] mb-4">Direct Control: Slide {activeIndex + 1}</h3>
             
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Surface Color</label>
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
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Headline Color</label>
                <select 
                  value={activeSlide.headlineColorToken || 'text-light'}
                  onChange={e => updateActiveSlide({ headlineColorToken: e.target.value as SlideData['headlineColorToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="text-dark">Dark Slate</option>
                  <option value="text-primary">Primary Green</option>
                  <option value="text-light">White</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Watermark Color</label>
                <select 
                  value={activeSlide.watermarkColorToken || ''}
                  onChange={e => updateActiveSlide({ watermarkColorToken: e.target.value as SlideData['watermarkColorToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="">Inherit (Headline)</option>
                  <option value="text-dark">Dark Slate</option>
                  <option value="text-primary">Primary Green</option>
                  <option value="text-light">White</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Body Text Color</label>
                <select 
                  value={activeSlide.bodyColorToken || 'text-neutral'}
                  onChange={e => updateActiveSlide({ bodyColorToken: e.target.value as SlideData['bodyColorToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="text-neutral">Slate</option>
                  <option value="text-light">White (80%)</option>
                </select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Layout Structure</label>
                <select 
                  value={activeSlide.layoutToken || 'center'}
                  onChange={e => updateActiveSlide({ layoutToken: e.target.value as SlideData['layoutToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="center">Center Alignment</option>
                  <option value="left">Left Alignment</option>
                </select>
              </div>
              
              <div className="flex flex-col space-y-1.5 border-t border-neutral-100 pt-3 col-span-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-primary mb-1">Architecture</span>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Card Shape</label>
                <select 
                  value={activeSlide.cardVariantToken || 'none'}
                  onChange={e => updateActiveSlide({ cardVariantToken: e.target.value as SlideData['cardVariantToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="none">None</option>
                  <option value="thin-frame">Thin Frame</option>
                  <option value="understated-solid">Understated Solid</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Button Style</label>
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

              <div className="flex flex-col space-y-1.5 col-span-2">
                <label className="text-[9px] font-mono uppercase text-muted-foreground font-semibold">Image Style</label>
                <select 
                  value={activeSlide.imageStyleToken || 'none'}
                  onChange={e => updateActiveSlide({ imageStyleToken: e.target.value as SlideData['imageStyleToken'] })}
                  className="bg-neutral-50 border border-neutral-200 text-xs rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                >
                  <optgroup label="Layouts">
                    <option value="none">None / Background</option>
                    <option value="cutout">Cutout (Object Contain)</option>
                    <option value="framed">Framed Polarized</option>
                  </optgroup>
                  <optgroup label="Solid Fades">
                    <option value="full-bleed-dark-overlay">Full Bleed (Dark Overlay)</option>
                    <option value="full-bleed-green-overlay">Full Bleed (Green Overlay)</option>
                  </optgroup>
                  <optgroup label="Gradients">
                    <option value="overlay-gradient-institutional">Institutional Gradient</option>
                    <option value="overlay-gradient-teal">Teal Horizon Gradient</option>
                  </optgroup>
                  <optgroup label="Glass & Blur">
                    <option value="overlay-frosted-glass">Frosted Glass Blur</option>
                    <option value="overlay-aurora-spots">Aurora Spots Overlay</option>
                  </optgroup>
                </select>
              </div>

               {/* Typography Layout Block */}
               <div className="flex flex-col space-y-4 pt-4 mt-4 border-t border-neutral-100 col-span-2">
                 <div className="flex justify-between items-center mb-1">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00573f]">Typography Layout</h3>
                   <span className="text-[7px] text-neutral-400 bg-neutral-100 px-1 py-0.5 rounded font-bold">SLOTS</span>
                 </div>

                 <div className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-lg p-3">
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
                          )}
                       </div>
                     );
                   })}
                 </div>
               </div>
             </div>
          </div>
        </aside>

        {/* The Render Canvas */}
        <main className="flex-1 bg-neutral-100/50 relative overflow-y-auto flex flex-col items-center justify-center p-8">
          
          {/* Floating Legends */}
          <div className="absolute top-8 right-8 hidden lg:flex flex-col gap-4 z-40">
            <BrandPaletteLegend />
            <TokenDictionaryLegend />
          </div>

          {/* Constraints wrapper to mimic a realistic viewport for the canvas */}
          <div 
            className={`relative shadow-2xl transition-all duration-300 ease-in-out bg-white border border-neutral-200/50 flex-shrink-0 ${getAspectRatioClasses(aspectRatio)}`}
          >
            {/* Target Element for html-to-image */}
            <div id="export-canvas" className="w-full h-full absolute inset-0 overflow-hidden">
              <LinkedInCarouselTemplate slide={activeSlide} onUpdate={updateActiveSlide} />
            </div>
            
            {/* Slide Toggle (Outside export node, absolute bound to bottom right of canvas) */}
            <div className="absolute -bottom-14 right-0 bg-white border border-neutral-200 rounded-lg shadow-sm p-1.5 flex items-center space-x-3 z-40">
               <button 
                  onClick={handlePrev} 
                  disabled={activeIndex === 0}
                  className="text-foreground/50 hover:text-primary disabled:opacity-30 transition-colors focus:outline-none p-1"
                  title="Previous Slide"
               >
                  <ChevronLeft className="w-4 h-4" />
               </button>
               <span className="text-[10px] font-ui font-bold text-foreground/70 uppercase tracking-widest min-w-[50px] text-center">
                 {activeIndex + 1} / {slides.length}
               </span>
               <button 
                  onClick={handleNext} 
                  disabled={activeIndex === slides.length - 1}
                  className="text-foreground/50 hover:text-primary disabled:opacity-30 transition-colors focus:outline-none p-1"
                  title="Next Slide"
               >
                  <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
