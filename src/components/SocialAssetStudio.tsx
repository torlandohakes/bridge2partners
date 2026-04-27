'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Download, Plus, Trash2, ChevronLeft, ChevronRight, ChevronDown, ImagePlus, Upload, Save, Eye, EyeOff, AlignLeft, AlignCenter, AlignRight, LayoutDashboard, BookmarkPlus } from 'lucide-react';
import { LinkedInCarouselTemplate, SlideType, SlideData, TextConfig } from './LinkedInCarouselTemplate';
import { BrandPaletteLegend } from './BrandPaletteLegend';
import { TokenDictionaryLegend } from './TokenDictionaryLegend';
import { templates } from '../lib/templates';
import { getProject, updateProject, createCustomTemplate, getCustomTemplates, CustomTemplate } from '@/lib/studio-storage';
import { exportProjectToJson, importProjectFromJson } from '@/lib/studio-file-system';
import { CommandHeader } from './social-studio/CommandHeader';
import { StudioSidebar } from './social-studio/StudioSidebar';
import { cn } from '@/lib/utils';

export function SocialAssetStudio({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  // Carousel State Engine
  const [slides, setSlides] = useState<SlideData[]>(templates.blank_project);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [newSlideType, setNewSlideType] = useState<SlideType>('thesis');
  const [isHydrating, setIsHydrating] = useState(true);
  const [elementsOpen, setElementsOpen] = useState(true);
  const [typographyOpen, setTypographyOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);

  const activeSlide = slides[activeIndex];

  // Hydration Engine
  useEffect(() => {
    const loadState = async () => {
      try {
        const cTpls = await getCustomTemplates();
        setCustomTemplates(cTpls);
        if (projectId) {
          const project = await getProject(projectId);
          if (project) {
            setSlides(project.slides && project.slides.length > 0 ? project.slides : templates.blank_project);
            setAspectRatio(project.aspectRatio || '1:1');
          } else {
            router.push('/social-asset-studio');
          }
        }
      } catch (e) {
        console.error("Hydration failed", e);
      } finally {
        setIsHydrating(false);
      }
    };
    loadState();
  }, [projectId, router]);

  // Sync Engine
  useEffect(() => {
    if (isHydrating || !projectId) return;
    
    // Auto-save debounce logic
    const handler = setTimeout(() => {
      updateProject(projectId, { slides, aspectRatio }).catch(console.error);
    }, 1000);
    
    return () => clearTimeout(handler);
  }, [slides, aspectRatio, isHydrating, projectId]);

  const handleExportProject = async () => {
    // Generate a temporary name for the export based off the active slide config if no project metadata is immediately handy
    await exportProjectToJson({ name: `Studio_Export_${Date.now()}`, aspectRatio, slides });
  };

  const handleImportProject = async () => {
    const imported = await importProjectFromJson();
    if (imported) {
      if (window.confirm("Loading this physical JSON will overwrite your current active canvas. Continue?")) {
        setSlides(imported.slides);
        setAspectRatio(imported.aspectRatio);
        setActiveIndex(0);
      }
    }
  };
  const handleSaveAsTemplate = async () => {
    if (slides.length <= 1) {
       alert("WARNING: You are trying to save a Custom Template but you only have 1 slide in this project right now! Templates need multiple customized slides. Please add more slides before saving.");
    }
    const name = window.prompt("Name your new Custom Template:");
    if (!name) return;
    try {
      const template = await createCustomTemplate(name, slides, aspectRatio);
      const cTpls = await getCustomTemplates();
      setCustomTemplates(cTpls);
      alert(`Custom template saved successfully! It captured exactly ${template.slides.length} slides.`);
    } catch (err) {
      console.error(err);
      alert("Failed to save template.");
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateKey = e.target.value;
    if (!templateKey) return;
    
    if (window.confirm("Applying a new template will overwrite your current slides. Continue?")) {
      if (templateKey.startsWith('tpl_')) {
        const cTpl = customTemplates.find(t => t.id === templateKey);
        if (cTpl) {
          if (cTpl.slides.length === 0) {
             alert("Error: The template you selected has 0 slides. This shouldn't happen.");
             return;
          }
          setSlides(JSON.parse(JSON.stringify(cTpl.slides)));
          if (cTpl.aspectRatio) setAspectRatio(cTpl.aspectRatio);
          alert(`Successfully hydrated ${cTpl.slides.length} slides from the template.`);
        }
      } else {
        const sysTemplate = templates[templateKey];
        if (sysTemplate && sysTemplate.length > 0) {
          setSlides(JSON.parse(JSON.stringify(sysTemplate)));
        }
      }
      setActiveIndex(0);
      e.target.value = ""; // Reset dropdown to placeholder
    } else {
      e.target.value = "";
    }
  };

  const handleAddSlide = (type: SlideType) => {
    let newSlide: SlideData = {
      id: Date.now(),
      type,
      imageUrl: null,
      text: '',
      brandMarkType: 'logo',
      eyebrowConfig: { visible: false, align: 'center' },
      headlineConfig: { visible: false, align: 'center' },
      subheadlineConfig: { visible: false, align: 'center' },
      bodyConfig: { visible: false, align: 'center' },
      ctaConfig: { visible: false, align: 'center' },
      footerConfig: { visible: false, align: 'center' },
    };

    switch (type) {
      case 'hook':
        newSlide = {
          ...newSlide,
          backgroundColorToken: 'gradient-institutional',
          layoutToken: 'center',
          cardVariantToken: 'none',
          imageStyleToken: 'overlay-aurora-spots',
          headline: 'Enter Core Headline',
          subheadline: 'Enter brief supporting statement',
          headlineConfig: { visible: true, align: 'center', size: 'lg', colorToken: 'text-light', opacity: '100' },
          subheadlineConfig: { visible: true, align: 'center', size: 'md', colorToken: 'text-light', opacity: '80' },
        };
        break;
      case 'thesis':
        newSlide = {
          ...newSlide,
          backgroundColorToken: 'light',
          layoutToken: 'left',
          cardVariantToken: 'understated-solid',
          eyebrow: '01 / The Status Quo',
          headline: 'State the foundational problem here.',
          body: 'Explain exactly why legacy systems are failing or how current methods break down under pressure.',
          eyebrowConfig: { visible: true, align: 'left', size: 'sm', colorToken: 'text-primary', opacity: '100' },
          headlineConfig: { visible: true, align: 'left', size: 'md', colorToken: 'text-dark', opacity: '100' },
          bodyConfig: { visible: true, align: 'left', size: 'md', colorToken: 'text-neutral', opacity: '100' },
        };
        break;
      case 'solution':
        newSlide = {
          ...newSlide,
          brandMarkType: 'watermark',
          backgroundColorToken: 'dark',
          layoutToken: 'left',
          cardVariantToken: 'thin-frame',
          eyebrow: '02 / The Answer',
          headline: 'State the exact counter-solution here.',
          body: 'Detail precisely how Bridge2Partners bypasses the constraints of the thesis and creates Alpha.',
          eyebrowConfig: { visible: true, align: 'left', size: 'sm', colorToken: 'text-light', opacity: '50' },
          headlineConfig: { visible: true, align: 'left', size: 'md', colorToken: 'text-light', opacity: '100' },
          bodyConfig: { visible: true, align: 'left', size: 'md', colorToken: 'text-light', opacity: '80' },
        };
        break;
      case 'validation':
        newSlide = {
          ...newSlide,
          backgroundColorToken: 'light',
          layoutToken: 'center',
          cardVariantToken: 'none',
          eyebrow: '03 / Validation',
          subheadline: '100%',
          headline: 'Enter the specific metric or stat.',
          footer: 'Source: Internal Data Benchmark',
          eyebrowConfig: { visible: true, align: 'center', size: 'sm', colorToken: 'text-primary', opacity: '100' },
          subheadlineConfig: { visible: true, align: 'center', size: 'lg', colorToken: 'text-dark', opacity: '100' },
          headlineConfig: { visible: true, align: 'center', size: 'sm', colorToken: 'text-neutral', opacity: '80' },
          footerConfig: { visible: true, align: 'center', size: 'md', colorToken: 'text-neutral', opacity: '50' },
        };
        break;
      case 'cta':
        newSlide = {
          ...newSlide,
          backgroundColorToken: 'primary',
          layoutToken: 'center',
          cardVariantToken: 'none',
          headline: 'Secure Your Infrastructure.',
          subheadline: 'Architecting alpha for the enterprise.',
          cta: 'Schedule Consultation',
          headlineConfig: { visible: true, align: 'center', size: 'md', colorToken: 'text-light', opacity: '100' },
          subheadlineConfig: { visible: true, align: 'center', size: 'sm', colorToken: 'text-light', opacity: '80' },
          ctaConfig: { visible: true, align: 'center', size: 'md', colorToken: 'text-dark', opacity: '100' },
          buttonStyleToken: 'white-solid'
        };
        break;
    }

    setSlides(prev => {
      const updated = [...prev, newSlide];
      setActiveIndex(updated.length - 1);
      return updated;
    });
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
        updateActiveSlide({ imageUrl });
        
        // Clear input so the same file can be uploaded again
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(file);
    }
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
      <CommandHeader 
        onBack={() => router.push('/social-asset-studio')}
        onImport={handleImportProject}
        onExportProject={handleExportProject}
        onSaveTemplate={handleSaveAsTemplate}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        activeSlide={activeSlide}
        handleChangeType={handleChangeType}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        updateActiveSlide={updateActiveSlide}
        handleExport={handleExport}
        isExporting={isExporting}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Hand Direct Control Sidebar */}
        <StudioSidebar 
          handleTemplateChange={handleTemplateChange}
          customTemplates={customTemplates}
          newSlideType={newSlideType}
          setNewSlideType={setNewSlideType}
          handleAddSlide={handleAddSlide}
          handleDeleteSlide={handleDeleteSlide}
          slidesLength={slides.length}
          elementsOpen={elementsOpen}
          setElementsOpen={setElementsOpen}
          activeSlide={activeSlide}
          updateActiveSlide={updateActiveSlide}
          typographyOpen={typographyOpen}
          setTypographyOpen={setTypographyOpen}
        />

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
