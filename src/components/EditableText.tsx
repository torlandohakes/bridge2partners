'use client';

import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

interface EditableTextProps {
  contentId: string;
  defaultText: string;
  isAdmin: boolean;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  value?: string;
}

export default function EditableText({ 
  contentId, 
  defaultText, 
  isAdmin, 
  element: Element = 'span',
  className = '',
  value
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLElement>(null);

  // Fallback to default if no database value exists yet
  const displayText = value || defaultText;

  const handleBlur = async () => {
    setIsEditing(false);
    if (!isAdmin || !textRef.current) return;
    
    let newText = textRef.current.innerText || textRef.current.textContent || '';
    
    // Quick sanitization to avoid persisting empty phantom nodes
    if (!newText.trim()) newText = defaultText;

    if (newText !== value) {
      try {
        const docRef = doc(db, 'site-content', 'home');
        // Check if doc exists, if not, setDoc. Or strictly use setDoc with merge:true
        await setDoc(docRef, { [contentId]: newText }, { merge: true });
      } catch (error) {
        console.error("Failed to save content", error);
        // Fallback UI error state could go here
      }
    }
  };

  // Provide seamless transition between native selection and edit mode
  const handleClick = (e: React.MouseEvent) => {
    if (!isAdmin || isEditing) return;
    
    // If the user highlighted text to copy it, do not intercept the interaction
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    
    setIsEditing(true);
    setTimeout(() => textRef.current?.focus(), 50);
  };

  const adminStyles = (isAdmin && !isEditing)
    ? 'p-1 -m-1 hover:ring-2 hover:ring-white/80 hover:bg-black/30 rounded-md transition-all cursor-text'
    : isEditing 
      ? 'p-1 -m-1 outline-none ring-2 ring-white bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.2)] rounded-md cursor-text transition-all'
      : '';

  return (
    <Element
      ref={textRef as any}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onClick={handleClick}
      onBlur={handleBlur}
      className={`${className} ${adminStyles}`}
      // dangerouslySetInnerHTML to persist <br/> tags from raw strings
      dangerouslySetInnerHTML={{ __html: isEditing ? (textRef.current?.innerText || displayText) : displayText.replace(/\\n/g, '<br/>') }}
    />
  );
}
