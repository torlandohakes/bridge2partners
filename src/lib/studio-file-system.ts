import { SlideData } from '@/components/LinkedInCarouselTemplate';
import { StudioProject } from './studio-storage';

export const exportProjectToJson = async (project: StudioProject | { name: string, aspectRatio: string, slides: SlideData[] }) => {
  const dataString = JSON.stringify(project, null, 2);
  const blob = new Blob([dataString], { type: 'application/json' });
  const filename = `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'b2p_project'}.json`;

  try {
    // Try Modern File System Access API (Native 'Save As' Dialog)
    if ('showSaveFilePicker' in window) {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    }
  } catch (err: any) {
    if (err.name === 'AbortError') return false; // User cancelled
    console.warn("showSaveFilePicker failed, falling back to basic download", err);
  }

  // Graceful Fallback (Browser auto-downloads to default folder)
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
};

export const importProjectFromJson = (): Promise<{ name: string, aspectRatio: string, slides: SlideData[] } | null> => {
  return new Promise(async (resolve) => {
    try {
      // Try Modern File System Access API
      if ('showOpenFilePicker' in window) {
        const [fileHandle] = await (window as any).showOpenFilePicker({
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        });
        const file = await fileHandle.getFile();
        const text = await file.text();
        const json = JSON.parse(text);
        if (json.slides && json.aspectRatio) {
          resolve(json);
          return;
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        resolve(null);
        return;
      }
      console.warn("showOpenFilePicker failed, falling back to input", err);
    }

    // Graceful Fallback (Hidden Input Dialog)
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (json.slides && json.aspectRatio) {
             resolve(json);
          } else {
             alert("Invalid Project JSON");
             resolve(null);
          }
        } catch {
          resolve(null);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });
};
