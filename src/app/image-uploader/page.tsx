"use client";

import React, { useState, useCallback, useRef } from "react";
import { UploadCloud, Copy, FileIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ImageUploaderPage() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Firebase upload failed", error);
          alert("Error uploading image. Check console for details.");
          setIsUploading(false);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedImages(prev => [url, ...prev]);
          } catch (error) {
            console.error(error);
          } finally {
            setIsUploading(false);
            setUploadProgress(0);
          }
        }
      );
    } catch (error) {
      console.error(error);
      setIsUploading(false);
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

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await handleUpload(e.dataTransfer.files[0]);
      }
    },
    []
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
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
            Securely push assets directly to Firebase Cloud Storage.
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
                    <div 
                      className="bg-[#98cc67] h-2.5 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(152,204,103,0.8)]" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="font-ui text-sm text-primary font-bold animate-pulse uppercase tracking-widest">
                    Uploading ({Math.round(uploadProgress)}%)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 text-neutral/60">
                  <div className="p-4 bg-white rounded-full shadow-sm border border-neutral/10">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-medium text-foreground">
                      Click or drag image to upload
                    </p>
                    <p className="text-sm">
                      Direct upload to Firebase Cloud Storage Bucket
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
              accept="image/*"
            />
          </CardContent>
        </Card>

        {/* Image Preview Gallery */}
        {uploadedImages.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-neutral/10">
            <h3 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <CheckCircle2 className="text-success h-6 w-6" /> Cloud Uploads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {uploadedImages.map((url, i) => (
                <Card key={i} className="overflow-hidden group shadow-md border-neutral/10">
                  <div className="aspect-video bg-neutral/5 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Uploaded asset ${i}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 bg-white backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileIcon className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-neutral truncate font-medium" title={url}>
                          Firebase URL
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(url)}
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
