"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Plus, X, Loader2 } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface EditableLogoStripProps {
  documentId: string;
  contentId: string;
  isAdmin: boolean;
  logos?: string[];
}

export default function EditableLogoStrip({
  documentId,
  contentId,
  isAdmin,
  logos = [],
}: EditableLogoStripProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    setIsUploading(true);

    const newUrls: string[] = [];

    try {
      for (const file of files) {
        // Upload to Firebase Storage
        const fileRef = ref(storage, `images/logos/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              newUrls.push(downloadURL);
              resolve();
            }
          );
        });
      }

      // Update Firestore
      if (newUrls.length > 0) {
        const updatedLogos = [...(logos || []), ...newUrls];
        const docRef = doc(db, "site-content", documentId);
        await setDoc(docRef, { [contentId]: updatedLogos }, { merge: true });
      }
    } catch (error) {
      console.error("Failed to upload logos", error);
      alert("Failed to upload logos. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = async (indexToRemove: number) => {
    if (!isAdmin) return;
    
    // Optimistic UI could be added here, but for simplicity we rely on snapshot updates
    const updatedLogos = logos.filter((_, i) => i !== indexToRemove);
    try {
      const docRef = doc(db, "site-content", documentId);
      await setDoc(docRef, { [contentId]: updatedLogos }, { merge: true });
    } catch (error) {
      console.error("Failed to remove logo", error);
    }
  };

  if (!isAdmin && (!logos || logos.length === 0)) {
    return null; // Don't render anything if public user and no logos
  }

  return (
    <div className="w-full py-8">
      <div className="flex overflow-x-auto gap-8 items-center justify-center custom-scrollbar pb-4">
        {logos.map((url, index) => (
          <div key={`${url}-${index}`} className="relative group shrink-0 flex items-center justify-center w-40 h-20 bg-white/5 border border-white/10 rounded-lg p-4">
            <Image
              src={url}
              alt={`Partner Logo ${index + 1}`}
              fill
              className="object-contain opacity-70 hover:opacity-100 transition-opacity p-4"
              unoptimized
            />
            {isAdmin && (
              <button
                onClick={() => handleRemoveLogo(index)}
                className="absolute -top-2 -right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                title="Remove Logo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {isAdmin && (
          <div 
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`shrink-0 flex items-center justify-center w-40 h-20 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
              isUploading ? "border-[#98cc67]/30 bg-[#98cc67]/5" : "border-white/20 hover:border-[#98cc67]/50 hover:bg-white/5"
            }`}
          >
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-[#98cc67] animate-spin" />
            ) : (
              <div className="flex flex-col items-center justify-center text-white/50 hover:text-[#98cc67]">
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-ui uppercase tracking-wider">Add Logo</span>
              </div>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
