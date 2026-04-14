'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects, createProject, deleteProject, getCustomTemplates, deleteCustomTemplate, StudioProject, CustomTemplate } from '@/lib/studio-storage';
import { exportProjectToJson, importProjectFromJson } from '@/lib/studio-file-system';
import { Plus, Folder, Trash, ArrowRight, LayoutTemplate, BookmarkPlus, Upload, Download } from 'lucide-react';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { LinkedInCarouselTemplate } from '@/components/LinkedInCarouselTemplate';
import { SlideData } from '@/components/LinkedInCarouselTemplate';

function ThumbnailPreview({ slide, aspectRatio = '1:1' }: { slide: SlideData, aspectRatio?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial scale read before observer catches
    setScale(containerRef.current.getBoundingClientRect().width / 1080);
    
    const ob = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setScale(entry.contentRect.width / 1080);
      }
    });
    ob.observe(containerRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden pointer-events-none">
       <div 
         className="absolute top-0 left-0 origin-top-left"
         style={{ 
             width: '1080px', 
             height: aspectRatio === '4:5' ? '1350px' : '1080px',
             transform: `scale(${scale})`
         }}
       >
          <LinkedInCarouselTemplate slide={slide} aspectRatio={aspectRatio} />
       </div>
    </div>
  );
}

export default function StudioDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<StudioProject[]>([]);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  // For visual separation right now, hardcoded "My Templates" area (system templates only per phase 1)
  const systemTemplates = Object.keys(templates);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    const tpls = await getCustomTemplates();
    setProjects(data);
    setCustomTemplates(tpls);
    setLoading(false);
  };

  const handleCreateFromCustomTemplate = async (templateId: string) => {
    setLoading(true);
    try {
      const latestDBTemplates = await getCustomTemplates();
      const cTpl = latestDBTemplates.find(t => t.id === templateId);
      
      if (!cTpl) {
         setLoading(false);
         alert("CRITICAL ERROR: Template could not be found locally!");
         return;
      }
      if (!cTpl.slides || cTpl.slides.length === 0) {
         setLoading(false);
         alert("CRITICAL ERROR: This template physically has 0 slides. It is corrupted.");
         return;
      }

      const initialSlides = JSON.parse(JSON.stringify(cTpl.slides));
      const initialAspectRatio = cTpl.aspectRatio || '1:1';
      const newName = `Project ${new Date().toLocaleDateString()}`;
      
      const project = await createProject(newName, initialSlides, initialAspectRatio);
      // Hard navigation to burst Next.js client cache
      window.location.href = `/social-asset-studio/projects/${project.id}`;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreateProject = async (templateId?: string) => {
    setLoading(true);
    try {
      let initialSlides = [];
      let initialAspectRatio = '1:1';
      if (templateId) {
         if (templates[templateId] && templates[templateId].length > 0) {
           initialSlides = JSON.parse(JSON.stringify(templates[templateId]));
         }
      }
      
      const newName = `Project ${new Date().toLocaleDateString()}`;
      const safeSlides = initialSlides.length > 0 ? initialSlides : templates.blank_project;
      const project = await createProject(newName, safeSlides, initialAspectRatio); // using default aspect ratio if fallback utilized
      
      // Hard navigation to burst Next.js client cache
      window.location.href = `/social-asset-studio/projects/${project.id}`;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      await fetchProjects();
    }
  };

  const handleDeleteTemplate = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Delete this custom template forever?")) {
      await deleteCustomTemplate(id);
      await fetchProjects();
    }
  };

  const handleImportProject = async () => {
    const imported = await importProjectFromJson();
    if (imported) {
       setLoading(true);
       try {
         const newName = `Imported: ${imported.name}`;
         const project = await createProject(newName, imported.slides, imported.aspectRatio);
         router.push(`/social-asset-studio/projects/${project.id}`);
       } catch (err) {
         console.error(err);
         setLoading(false);
       }
    }
  };

  const handleExportProject = async (e: React.MouseEvent, proj: StudioProject) => {
    e.stopPropagation();
    await exportProjectToJson(proj);
  };

  if (loading) {
     return <div className="min-h-screen bg-[#f4f6f5] flex items-center justify-center font-mono text-sm text-neutral-400">Booting Studio...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f6f5] p-12 lg:p-24 pb-48 font-sans">
       <div className="max-w-6xl mx-auto flex flex-col space-y-16">
          <div className="flex flex-col space-y-2">
             <h1 className="text-4xl font-display font-medium text-slate-900 tracking-tight">Social Asset Studio</h1>
             <p className="text-neutral-500 font-heading">Deterministic orchestration dashboard for brand assets.</p>
          </div>

          <div className="flex flex-col space-y-6">
             <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
               <h2 className="text-xl font-heading font-medium text-slate-800 flex items-center">
                 <Folder className="w-5 h-5 mr-3 text-[#00573f]" /> Working Projects
               </h2>
               <div className="flex items-center space-x-3">
                 <button 
                   onClick={handleImportProject}
                   className="bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-600 px-4 py-2 rounded text-sm font-semibold flex items-center transition-colors shadow-sm"
                 >
                   <Upload className="w-4 h-4 mr-2" /> Import JSON
                 </button>
                 <button 
                   onClick={() => handleCreateProject()}
                   className="bg-[#00573f] hover:bg-[#004230] text-white px-4 py-2 rounded text-sm font-semibold flex items-center transition-colors shadow-sm"
                 >
                   <Plus className="w-4 h-4 mr-2" /> Blank Project
                 </button>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {projects.length === 0 ? (
                 <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white border border-neutral-200 border-dashed rounded-lg">
                   <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                     <Folder className="w-5 h-5 text-neutral-400" />
                   </div>
                   <p className="text-slate-700 font-medium font-heading">No projects active.</p>
                   <p className="text-neutral-400 text-sm mt-1">Start a blank project or spawn one from a template.</p>
                 </div>
               ) : (
                 projects.map(proj => (
                   <div 
                     key={proj.id}
                     onClick={() => router.push(`/social-asset-studio/projects/${proj.id}`)}
                     className="bg-white border border-neutral-200 rounded-lg flex flex-col cursor-pointer hover:border-[#00573f] hover:shadow-md transition-all group overflow-hidden"
                   >
                      <div 
                         className={cn("w-full relative overflow-hidden bg-neutral-100 border-b border-neutral-200", proj.aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square')}
                      >
                          {proj.slides && proj.slides.length > 0 ? (
                             <ThumbnailPreview slide={proj.slides[0]} aspectRatio={proj.aspectRatio} />
                          ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-neutral-300"><Folder className="w-8 h-8 opacity-50" /></div>
                          )}
                          
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm rounded px-2 py-1 flex items-center justify-center select-none border border-black/5 z-20">
                            <span className="text-[10px] font-bold text-[#00573f] font-mono">{proj.slides?.length || 0} Slides</span>
                          </div>

                          <div className="absolute top-3 right-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button 
                              onClick={(e) => handleExportProject(e, proj)}
                              title="Export to JSON"
                              className="p-1.5 text-neutral-600 bg-white shadow-sm hover:text-emerald-600 border border-black/10 rounded mr-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={(e) => handleDelete(e, proj.id)}
                              title="Delete Project"
                              className="p-1.5 text-neutral-600 bg-white shadow-sm hover:text-red-500 border border-black/10 rounded"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                      </div>

                      <div className="p-4 flex flex-col">
                         <h3 className="font-heading font-medium text-slate-800 line-clamp-1">{proj.name}</h3>
                         <p className="text-xs text-neutral-400 mt-1 font-mono">
                           Last edited: {new Date(proj.updatedAt).toLocaleDateString()}
                         </p>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </div>

          <div className="flex flex-col space-y-6">
             <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
               <h2 className="text-xl font-heading font-medium text-slate-800 flex items-center">
                 <BookmarkPlus className="w-5 h-5 mr-3 text-emerald-600" /> Your Custom Templates
               </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {customTemplates.length === 0 ? (
                 <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white border border-neutral-200 border-dashed rounded-lg">
                   <p className="text-slate-700 font-medium font-heading">No custom templates yet.</p>
                   <p className="text-neutral-400 text-sm mt-1">Open a project and click "Save Template" to store a master layout here.</p>
                 </div>
               ) : (
                 customTemplates.map(tpl => (
                   <div 
                     key={tpl.id}
                     onClick={() => handleCreateFromCustomTemplate(tpl.id)}
                     className="bg-white border border-emerald-500/30 rounded-lg flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all group overflow-hidden"
                   >
                      <div 
                         className={cn("w-full relative overflow-hidden bg-neutral-100 border-b border-emerald-500/20", tpl.aspectRatio === '4:5' ? 'aspect-[4/5]' : 'aspect-square')}
                      >
                          {tpl.slides && tpl.slides.length > 0 ? (
                             <ThumbnailPreview slide={tpl.slides[0]} aspectRatio={tpl.aspectRatio} />
                          ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-emerald-200"><BookmarkPlus className="w-8 h-8 opacity-50" /></div>
                          )}
                          
                          <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-sm shadow-sm rounded px-2 py-1 flex items-center justify-center select-none border border-emerald-600/20 z-20">
                            <span className="text-[10px] font-bold text-white font-mono">{tpl.slides?.length || 0} Blueprint Slides</span>
                          </div>

                          <div className="absolute top-3 right-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button 
                              onClick={(e) => handleDeleteTemplate(e, tpl.id)}
                              className="p-1.5 text-neutral-600 bg-white shadow-sm hover:text-red-500 border border-black/10 rounded"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                      </div>

                      <div className="p-4 flex flex-col">
                         <h3 className="font-heading font-medium text-emerald-900 line-clamp-1">{tpl.name}</h3>
                         <div className="mt-3 flex items-center text-emerald-600 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                           Spawn Custom Project <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                         </div>
                      </div>
                   </div>
                 ))
               )}
             </div>
          </div>

          <div className="flex flex-col space-y-6">
             <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
               <h2 className="text-xl font-heading font-medium text-slate-800 flex items-center">
                 <LayoutTemplate className="w-5 h-5 mr-3 text-emerald-600" /> System Templates
               </h2>
               <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold bg-neutral-100 px-2 py-1 rounded">Read Only</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {systemTemplates.map(key => (
                 <div 
                   key={key}
                   onClick={() => handleCreateProject(key)}
                   className="bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-lg transition-all group overflow-hidden"
                 >
                    <div 
                       className="w-full relative overflow-hidden bg-black border-b border-neutral-800 aspect-square"
                    >
                        {templates[key] && templates[key].length > 0 ? (
                           <ThumbnailPreview slide={templates[key][0]} aspectRatio="1:1" />
                        ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-neutral-700"><LayoutTemplate className="w-8 h-8 opacity-50" /></div>
                        )}
                        
                        <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md rounded px-2 py-1 flex items-center justify-center select-none border border-white/5 z-20">
                          <span className="text-[10px] font-bold text-white font-mono">{templates[key]?.length || 0} Base Configurations</span>
                        </div>
                    </div>

                    <div className="p-4 flex flex-col">
                       <h3 className="font-heading font-medium text-white line-clamp-1">{key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
                       <div className="mt-3 flex items-center text-emerald-400 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                         Create Project <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
       </div>
    </div>
  );
}
