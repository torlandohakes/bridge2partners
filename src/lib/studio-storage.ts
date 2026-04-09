import localforage from 'localforage';
import { SlideData } from '@/components/LinkedInCarouselTemplate';

export interface StudioProject {
  id: string;
  name: string;
  updatedAt: number;
  slides: SlideData[];
  aspectRatio: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  createdAt: number;
  slides: SlideData[];
  aspectRatio: string;
}

const PROJECTS_KEY = 'b2p-sas-projects';
const TEMPLATES_KEY = 'b2p-sas-templates';

// --- PROJECTS DB ---

const initProjectsDB = async (): Promise<StudioProject[]> => {
  const data = await localforage.getItem<StudioProject[]>(PROJECTS_KEY);
  if (!data) {
    await localforage.setItem(PROJECTS_KEY, []);
    return [];
  }
  return data;
};

export const getProjects = async (): Promise<StudioProject[]> => {
  const projects = await initProjectsDB();
  return projects.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getProject = async (id: string): Promise<StudioProject | null> => {
  const projects = await initProjectsDB();
  return projects.find(p => p.id === id) || null;
};

export const createProject = async (name: string, slides: SlideData[], aspectRatio: string = 'aspect-square'): Promise<StudioProject> => {
  const projects = await initProjectsDB();
  const newProject: StudioProject = {
    id: `proj_${Date.now()}`,
    name,
    updatedAt: Date.now(),
    slides,
    aspectRatio
  };
  projects.push(newProject);
  await localforage.setItem(PROJECTS_KEY, projects);
  return newProject;
};

export const updateProject = async (id: string, updates: Partial<Omit<StudioProject, 'id'>>): Promise<StudioProject | null> => {
  const projects = await initProjectsDB();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: Date.now()
  };

  await localforage.setItem(PROJECTS_KEY, projects);
  return projects[index];
};

export const deleteProject = async (id: string): Promise<void> => {
  const projects = await initProjectsDB();
  const filtered = projects.filter(p => p.id !== id);
  await localforage.setItem(PROJECTS_KEY, filtered);
};

// --- CUSTOM TEMPLATES DB ---

const initTemplatesDB = async (): Promise<CustomTemplate[]> => {
  const data = await localforage.getItem<CustomTemplate[]>(TEMPLATES_KEY);
  if (!data) {
    await localforage.setItem(TEMPLATES_KEY, []);
    return [];
  }
  return data;
};

export const getCustomTemplates = async (): Promise<CustomTemplate[]> => {
  const templates = await initTemplatesDB();
  return templates.sort((a, b) => b.createdAt - a.createdAt);
};

export const createCustomTemplate = async (name: string, slides: SlideData[], aspectRatio: string = '1:1'): Promise<CustomTemplate> => {
  const templates = await initTemplatesDB();
  // We strip text configuration off to act as pure layouts for templates.
  const layoutOnlySlides = slides.map(slide => ({
    ...slide,
    // Safely copy all token values explicitly to prevent shallow data loss
    brandMarkType: slide.brandMarkType,
    backgroundColorToken: slide.backgroundColorToken,
    layoutToken: slide.layoutToken,
    cardVariantToken: slide.cardVariantToken,
    imageStyleToken: slide.imageStyleToken,
    buttonStyleToken: slide.buttonStyleToken,
    headlineColorToken: slide.headlineColorToken,
    bodyColorToken: slide.bodyColorToken,
    eyebrowConfig: slide.eyebrowConfig,
    headlineConfig: slide.headlineConfig,
    subheadlineConfig: slide.subheadlineConfig,
    bodyConfig: slide.bodyConfig,
    ctaConfig: slide.ctaConfig,
    footerConfig: slide.footerConfig,

    // Scrub text fields
    text: '',
    eyebrow: slide.eyebrow?.startsWith('0') ? slide.eyebrow : 'Enter Context',
    headline: 'Enter Headline Core',
    subheadline: 'Enter Subheadline',
    body: 'Provide structural copy data here.',
    cta: 'Call to Action',
    footer: 'Source Data'
  }));

  const newTemplate: CustomTemplate = {
    id: `tpl_${Date.now()}`,
    name,
    createdAt: Date.now(),
    slides: layoutOnlySlides,
    aspectRatio
  };
  templates.push(newTemplate);
  await localforage.setItem(TEMPLATES_KEY, templates);
  return newTemplate;
};

export const deleteCustomTemplate = async (id: string): Promise<void> => {
  const templates = await initTemplatesDB();
  const filtered = templates.filter(t => t.id !== id);
  await localforage.setItem(TEMPLATES_KEY, filtered);
};
