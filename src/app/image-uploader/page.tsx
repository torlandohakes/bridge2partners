"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { UploadCloud, Copy, FileIcon, AlertTriangle, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadToFirebase } from "@/lib/firebase/storage";

type UploadMode = "local" | "firebase";

export default function ImageUploaderPage() {
  const [mode, setMode] = useState<UploadMode>("local");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [localAssets, setLocalAssets] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "local") {
      fetch("/api/images/local")
        .then(res => res.json())
        .then(data => {
          if (data.images) {
            setLocalAssets(data.images.map((img: string) => `/images/${img}`));
          }
        })
        .catch(err => console.error("Failed to fetch local images", err));
    }
  }, [mode]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      if (mode === "local") {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload-local", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Local upload failed");

        const data = await res.json();
        setUploadedImages(prev => [data.url, ...prev]);
      } else {
        // Firebase Mode
        const url = await uploadToFirebase(file, "cms-uploads");
        setUploadedImages(prev => [url, ...prev]);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading image. Check console for details.");
    } finally {
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
    [mode]
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    // Could add a toast notification here
  };

  const handleDeleteLocalAsset = async (url: string) => {
    if (!confirm("Are you sure you want to permanently delete this asset?")) return;
    try {
      const filename = url.split('/').pop();
      const res = await fetch("/api/images/local", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename })
      });
      if (!res.ok) throw new Error("Delete failed");
      setLocalAssets(prev => prev.filter(img => img !== url));
    } catch (err) {
      console.error(err);
      alert("Failed to delete asset. Ensure it is not locked by another process.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-foreground selection:bg-primary/20 relative overflow-hidden py-16 px-6">
      {/* Decorative Premium Mesh Gradient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary font-heading">
            Asset Uploader Utility
          </h1>
          <p className="text-lg text-neutral/80">
            Internal dashboard for managing static and dynamic images.
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="flex bg-white/60 backdrop-blur-md border border-white/50 p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setMode("local")}
              className={`px-6 py-2.5 rounded text-sm font-medium transition-colors ${
                mode === "local" 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-neutral/70 hover:text-primary"
              }`}
            >
              Static Assets (Local Dev)
            </button>
            <button
              onClick={() => setMode("firebase")}
              className={`px-6 py-2.5 rounded text-sm font-medium transition-colors ${
                mode === "firebase" 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-neutral/70 hover:text-primary"
              }`}
            >
              Dynamic Assets (Firebase CMS)
            </button>
          </div>
        </div>

        {/* Warning Banner */}
        {mode === "local" && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex gap-3 items-start max-w-2xl mx-auto shadow-sm">
            <AlertTriangle className="text-warning mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h4 className="font-bold text-warning-foreground font-heading tracking-tight mb-1">
                Local Dev Mode Only
              </h4>
              <p className="text-sm text-warning-foreground/80 leading-relaxed">
                Images uploaded here are saved directly to the Next.js <code className="font-mono bg-warning/10 px-1 rounded">/public</code> folder using the Node.js file system. 
                This will purposefully fail in serverless production environments (like Vercel) where the file system is strictly read-only.
              </p>
            </div>
          </div>
        )}

        {/* Drag Drop Zone */}
        <Card className="max-w-2xl mx-auto relative overflow-hidden transition-all duration-200">
          <CardContent className="p-0">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-16 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragActive 
                  ? "border-primary bg-primary/5" 
                  : "border-neutral/20 hover:border-primary/50 hover:bg-neutral/5"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center space-y-4 text-primary">
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <p className="font-medium animate-pulse">Uploading asset...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 text-neutral/60">
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-medium text-foreground">
                      Click or drag image to upload
                    </p>
                    <p className="text-sm">
                      Supports JPG, PNG, WebP up to 5MB
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
              <CheckCircle2 className="text-success h-6 w-6" /> Recently Uploaded
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {uploadedImages.map((url, i) => (
                <Card key={i} className="overflow-hidden group">
                  <div className="aspect-video bg-neutral/5 relative">
                    {/* Next.js generic img tag mapping */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Uploaded asset ${i}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileIcon className="h-4 w-4 text-neutral/50 shrink-0" />
                        <span className="text-sm text-neutral truncate" title={url}>
                          {url.split('/').pop() || url}
                        </span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(url)}
                        title="Copy Path"
                        className="shrink-0 h-8 font-medium px-3"
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

        {/* Current Local Assets Preview (Only in Local Mode) */}
        {mode === "local" && localAssets.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-neutral/10">
            <h3 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
               Current Local Assets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {localAssets.map((url, i) => (
                <Card key={i} variant="glass" className="overflow-hidden group">
                  <div className="aspect-video bg-neutral/5 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Local asset ${i}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 bg-white/80 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileIcon className="h-4 w-4 text-neutral/50 shrink-0" />
                        <span className="text-sm text-neutral truncate" title={url}>
                          {url.split('/').pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCopy(url)}
                          title="Copy Path"
                          className="shrink-0 h-8 font-medium px-3"
                        >
                          <Copy className="h-3 w-3 mr-1.5" /> Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLocalAsset(url)}
                          title="Delete Asset"
                          className="shrink-0 h-8 w-8 !bg-[#dc2626]/10 text-[#dc2626] hover:bg-[#dc2626]/20 border border-[#dc2626]/20 shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
