import React from 'react';
import { LayoutDashboard, Upload, Download, BookmarkPlus, ImagePlus, Trash2 } from 'lucide-react';
import { SlideData, SlideType } from '../LinkedInCarouselTemplate';

interface CommandHeaderProps {
  onBack: () => void;
  onImport: () => void;
  onExportProject: () => void;
  onSaveTemplate: () => void;
  aspectRatio: string;
  setAspectRatio: (val: string) => void;
  activeSlide: SlideData;
  handleChangeType: (type: SlideType) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateActiveSlide: (newProps: Partial<SlideData>) => void;
  handleExport: () => void;
  isExporting: boolean;
}

export function CommandHeader({
  onBack,
  onImport,
  onExportProject,
  onSaveTemplate,
  aspectRatio,
  setAspectRatio,
  activeSlide,
  handleChangeType,
  fileInputRef,
  handleImageUpload,
  updateActiveSlide,
  handleExport,
  isExporting
}: CommandHeaderProps) {
  return (
    <header className="bg-[#001b15] border-b border-primary/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 transition-colors">
      <div className="flex items-center space-x-3">
        <button 
           onClick={onBack}
           className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 transition-colors cursor-pointer text-white"
           title="Back to Dashboard"
        >
           <LayoutDashboard className="w-4 h-4" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-white font-ui font-semibold tracking-wide uppercase text-sm flex items-center">
            <span className="bg-white text-black px-1.5 py-0.5 rounded text-[8px] mr-2">B2P</span> Social Asset Studio
          </h1>
          <span className="text-[9px] text-[#009677] font-mono tracking-widest uppercase">Auto-saving active</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4 mr-1 hidden md:flex">
           <button
              onClick={onImport}
              className="flex items-center justify-center p-2 text-white/50 hover:bg-white/10 hover:text-white rounded transition-colors"
              title="Import Project JSON into Canvas"
           >
              <Upload className="w-4 h-4" />
           </button>
           <button
              onClick={onExportProject}
              className="flex items-center justify-center p-2 text-white/50 hover:bg-white/10 hover:text-white rounded transition-colors"
              title="Export Canvas to JSON"
           >
              <Download className="w-4 h-4" />
           </button>
           <div className="w-px h-6 bg-white/10 mx-2"></div>
           <button
              onClick={onSaveTemplate}
              className="flex items-center justify-center p-2 border border-emerald-500/20 rounded hover:bg-emerald-500/10 text-emerald-400 font-ui text-[10px] tracking-widest uppercase transition-colors"
              title="Extract active structural layout to your Custom Templates"
           >
              <BookmarkPlus className="w-3.5 h-3.5 mr-2" />
              Save Template
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

        <div className="flex items-end space-x-2 pl-4 border-l border-white/10 shrink-0 h-full">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <div className="flex items-center rounded border border-white/10 bg-white/5 overflow-hidden h-9">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center space-x-2 hover:bg-white/10 text-white font-ui h-full px-3 transition-all focus:outline-none"
              title={activeSlide.imageUrl ? "Replace Background Image" : "Upload Background Image"}
            >
              <ImagePlus className="w-4 h-4" />
              <span className="uppercase tracking-widest font-bold text-[10px] hidden xl:inline-block">Background</span>
            </button>
            {activeSlide.imageUrl && (
               <button
                 onClick={() => updateActiveSlide({ imageUrl: null })}
                 className="flex items-center justify-center h-full px-2 hover:bg-red-500/80 text-white border-l border-white/10 transition-colors focus:outline-none"
                 title="Clear Background Image"
               >
                  <Trash2 className="w-3.5 h-3.5" />
               </button>
            )}
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center justify-center space-x-2 bg-white hover:bg-neutral-50 text-slate-900 shadow-sm font-ui h-9 px-4 rounded transition-all focus:outline-none ${isExporting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
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
  );
}
