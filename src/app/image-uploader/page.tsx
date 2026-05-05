"use client";

import React, { useState, useCallback, useRef } from "react";
import { UploadCloud, Copy, FileIcon, CheckCircle2, FileText, Database, Archive, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface UploadedAsset {
  url: string;
  name: string;
  type: string;
}

export default function AssetUploaderPage() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // overall percentage
  const [uploadedAssets, setUploadedAssets] = useState<UploadedAsset[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // Increased to 50MB for databases/PDFs

  const processFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(f => f.size <= MAX_FILE_SIZE);
    
    if (validFiles.length < files.length) {
      alert(`Some files were skipped because they exceed the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit.`);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    let completed = 0;
    const total = validFiles.length;

    // Upload concurrently but track progress based on completed files
    const uploadPromises = validFiles.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const storageRef = ref(storage, 'assets/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: could track granular bytes here, but keeping it simple
          },
          (error) => {
            console.error("Firebase upload failed for " + file.name, error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              setUploadedAssets(prev => [{ url, name: file.name, type: file.type }, ...prev]);
              completed++;
              setUploadProgress((completed / total) * 100);
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      alert("Error uploading some files. Check console for details.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        await processFiles(e.dataTransfer.files);
      }
    },
    []
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
  };

  const renderPreview = (asset: UploadedAsset) => {
    if (asset.type.startsWith('image/')) {
      return (
        <div className="aspect-video bg-neutral/5 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.url}
            alt={asset.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      );
    }

    // Non-image previews
    let Icon = FileText;
    let bgColor = "bg-blue-500/10";
    let iconColor = "text-blue-500";

    if (asset.name.endsWith('.accdb') || asset.name.endsWith('.mdb') || asset.name.endsWith('.sql')) {
      Icon = Database;
      bgColor = "bg-purple-500/10";
      iconColor = "text-purple-500";
    } else if (asset.name.endsWith('.zip') || asset.name.endsWith('.rar')) {
      Icon = Archive;
      bgColor = "bg-yellow-500/10";
      iconColor = "text-yellow-500";
    } else if (asset.type === 'application/pdf') {
      Icon = FileText;
      bgColor = "bg-red-500/10";
      iconColor = "text-red-500";
    }

    return (
      <div className={`aspect-video ${bgColor} relative flex flex-col items-center justify-center p-6 text-center`}>
         <Icon className={`w-12 h-12 ${iconColor} mb-3`} />
         <span className={`font-ui text-sm font-semibold ${iconColor} truncate w-full px-4`}>
           {asset.name}
         </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-foreground selection:bg-primary/20 relative overflow-hidden py-16 px-6">
      {/* Decorative Premium Mesh Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary font-heading">
            Cloud Asset Uploader
          </h1>
          <p className="text-lg text-neutral/80">
            Securely push any file type or document directly to Firebase Cloud Storage.
          </p>
        </header>

        {/* Drag Drop Zone */}
        <Card className="max-w-2xl mx-auto relative overflow-hidden transition-all duration-200 shadow-lg border-neutral/10">
          <CardContent className="p-0">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-16 flex flex-col items-center justify-center transition-colors ${
                isUploading 
                  ? "cursor-default border-neutral/20 bg-neutral/5" 
                  : "cursor-pointer " + (isDragActive ? "border-primary bg-primary/5" : "border-neutral/20 hover:border-primary/50 hover:bg-neutral/5")
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center w-full max-w-xs space-y-4">
                  <div className="w-full bg-neutral/20 rounded-full h-2.5 overflow-hidden shadow-inner">
                     {/* Indeterminate loader if 0%, else percentage */}
                    <div 
                      className={`bg-[#98cc67] h-2.5 rounded-full shadow-[0_0_8px_rgba(152,204,103,0.8)] ${uploadProgress === 0 ? 'w-1/3 animate-pulse' : 'transition-all duration-300'}`} 
                      style={uploadProgress > 0 ? { width: `${uploadProgress}%` } : {}}
                    />
                  </div>
                  <p className="font-ui text-sm text-primary font-bold animate-pulse uppercase tracking-widest">
                    Uploading Assets...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 text-neutral/60">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-neutral/10">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-medium text-foreground">
                      Click or drag files to upload
                    </p>
                    <p className="text-sm">
                      Supports Images, PDFs, Databases, and ZIPs (Max 50MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              multiple // <--- Added Multiple Support
            />
          </CardContent>
        </Card>

        {/* Asset Preview Gallery */}
        {uploadedAssets.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-neutral/10">
            <h3 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <CheckCircle2 className="text-success h-6 w-6" /> Cloud Uploads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {uploadedAssets.map((asset, i) => (
                <Card key={i} className="overflow-hidden group shadow-md border-neutral/10 flex flex-col">
                  {renderPreview(asset)}
                  <CardContent className="p-4 bg-white backdrop-blur-md flex-1 flex flex-col justify-end">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs text-neutral/50 font-ui uppercase tracking-wider mb-1">Firebase URL</span>
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-3 w-3 text-primary shrink-0" />
                          <span className="text-sm text-neutral truncate font-medium" title={asset.url}>
                            {asset.name}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(asset.url)}
                        title="Copy Path"
                        className="shrink-0 h-8 font-medium px-3 bg-neutral/5 hover:bg-neutral/10 text-primary border border-neutral/10"
                      >
                        <Copy className="h-3 w-3 mr-1.5" /> Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
