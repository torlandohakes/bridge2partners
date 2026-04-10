'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Pencil, Loader2 } from 'lucide-react';
import { db, uploadToFirebase } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface EditableImageProps {
  contentId: string;
  defaultSrc: string;
  isAdmin: boolean;
  value?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  triggerOnly?: boolean;
}

export default function EditableImage(props: EditableImageProps) {
  const { contentId, defaultSrc, isAdmin, value, alt, ...imageProps } = props;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displaySrc = value || defaultSrc;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    setIsUploading(true);
    try {
      const downloadURL = await uploadToFirebase(file, `cms-assets`);
      const docRef = doc(db, 'site-content', 'home');
      await setDoc(docRef, { [contentId]: downloadURL }, { merge: true });
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // The Glassmorphic Pencil Trigger Button
  const uploadTrigger = (
    <>
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleImageChange}
        disabled={isUploading}
      />
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all cursor-pointer z-50 ${props.triggerOnly ? 'relative' : 'absolute top-3 right-3 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'}`}
        title="Change Image"
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <Pencil className="w-3.5 h-3.5 text-white drop-shadow" />
        )}
      </div>
    </>
  );

  if (props.triggerOnly) {
    if (!isAdmin) return null;
    return uploadTrigger;
  }

  return (
    <div className={`relative w-full h-full group ${props.fill ? 'absolute inset-0' : ''}`}>
      <Image 
        src={displaySrc} 
        alt={alt} 
        {...imageProps} 
        className={`${props.className} ${isUploading ? 'opacity-50 grayscale blur-sm' : ''} transition-all duration-300`} 
      />
      
      {isAdmin && uploadTrigger}
    </div>
  );
}
