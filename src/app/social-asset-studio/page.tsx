'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProjects, createProject, deleteProject, getCustomTemplates, deleteCustomTemplate, StudioProject, CustomTemplate } from '@/lib/studio-storage';
import { exportProjectToJson, importProjectFromJson } from '@/lib/studio-file-system';
import { Plus, Folder, Trash, ArrowRight, LayoutTemplate, BookmarkPlus, Upload, Download } from 'lucide-react';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';

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
                     className="bg-white border border-neutral-200 rounded-lg p-5 flex flex-col cursor-pointer hover:border-[#00573f] hover:shadow-md transition-all group"
                   >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-[#f4f6f5] rounded flex items-center justify-center select-none shadow-inner border border-neutral-100">
                          <span className="text-xs font-bold text-[#00573f] font-mono">{proj.slides?.length || 0}</span>
                        </div>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => handleExportProject(e, proj)}
                            title="Export to JSON"
                            className="p-1.5 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded mr-1"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => handleDelete(e, proj.id)}
                            title="Delete Project"
                            className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-heading font-medium text-slate-800 line-clamp-1">{proj.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1.5 font-mono">
                        Last edited: {new Date(proj.updatedAt).toLocaleDateString()}
                      </p>
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
                     className="bg-white border border-emerald-500/30 rounded-lg p-6 flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-lg transition-all group overflow-hidden relative"
                   >
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BookmarkPlus className="w-24 h-24 text-emerald-600" />
                      </div>
                      <div className="relative z-10 flex flex-col h-full">
                         <div className="flex items-start justify-between mb-2">
                           <h3 className="font-heading text-lg font-medium text-slate-800 pr-4">{tpl.name}</h3>
                           <button 
                             onClick={(e) => handleDeleteTemplate(e, tpl.id)}
                             className="opacity-0 group-hover:opacity-100 transition-opacity p-1 -mt-1 -mr-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded"
                           >
                             <Trash className="w-4 h-4" />
                           </button>
                         </div>
                         <p className="text-xs text-emerald-700 mb-6 font-mono leading-relaxed bg-emerald-50 p-2 rounded w-fit border border-emerald-100">
                           {tpl.slides.length} Slide Blueprints
                         </p>
                         <div className="mt-auto flex items-center text-emerald-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                           Spawn Custom Project <ArrowRight className="w-4 h-4 ml-2" />
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
                   className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col cursor-pointer hover:border-emerald-500 hover:shadow-lg transition-all group overflow-hidden relative"
                 >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <LayoutTemplate className="w-24 h-24 text-white" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                       <h3 className="font-heading text-lg font-medium text-white mb-2">{key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
                       <p className="text-xs text-neutral-400 mb-6 font-mono leading-relaxed bg-black/20 p-2 rounded w-fit">
                         {templates[key].length} Base Configurations
                       </p>
                       <div className="mt-auto flex items-center text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                         Create Project <ArrowRight className="w-4 h-4 ml-2" />
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
