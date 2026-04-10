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

  const adminStyles = isAdmin 
    ? 'p-1 -m-1 hover:ring-1 hover:ring-white/50 hover:bg-white/5 rounded-md transition-all cursor-text outline-none focus:ring-1 focus:ring-white focus:bg-white/10'
    : '';

  return (
    <Element
      ref={textRef as any}
      contentEditable={isAdmin}
      suppressContentEditableWarning={true}
      onFocus={() => isAdmin && setIsEditing(true)}
      onBlur={handleBlur}
      className={`${className} ${adminStyles}`}
      // dangerouslySetInnerHTML to persist <br/> tags from raw strings
      dangerouslySetInnerHTML={{ __html: isEditing ? (textRef.current?.innerText || displayText) : displayText.replace(/\\n/g, '<br/>') }}
    />
  );
}
