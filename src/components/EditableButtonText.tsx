'use client';

import React, { useState, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface EditableButtonTextProps {
  contentId: string;
  defaultText: string;
  isAdmin: boolean;
  className?: string;
  value?: string;
  documentId?: string;
}

export default function EditableButtonText({ 
  contentId, 
  defaultText, 
  isAdmin, 
  className = '',
  value,
  documentId = 'home'
}: EditableButtonTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const displayText = value || defaultText;

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isAdmin || isEditing) return;
    
    // Prevent default touch behavior to stop text selection flashes on mobile
    if (e.type === 'touchstart') e.stopPropagation();

    // Start long-press timer
    timerRef.current = setTimeout(() => {
      setIsEditing(true);
      // Auto focus after it becomes editable
      setTimeout(() => textRef.current?.focus(), 50);
    }, 600); // 600ms hold
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleBlur = async () => {
    setIsEditing(false);
    if (!isAdmin || !textRef.current) return;
    
    let newText = textRef.current.innerText || textRef.current.textContent || '';
    if (!newText.trim()) newText = defaultText;

    if (newText !== value) {
      try {
        const docRef = doc(db, 'site-content', documentId);
        await setDoc(docRef, { [contentId]: newText }, { merge: true });
      } catch (error) {
        console.error("Failed to save content", error);
      }
    }
  };

  // Traps the click event if we are actively editing, so it doesn't trigger parent actions
  const handleClick = (e: React.MouseEvent) => {
    if (isEditing) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <span
      ref={textRef}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
      onBlur={handleBlur}
      className={`${className} ${isAdmin && !isEditing ? 'cursor-pointer' : ''} ${isEditing ? 'outline-none ring-2 ring-white rounded px-1 min-w-[50px] inline-block cursor-text' : ''} transition-all`}
      dangerouslySetInnerHTML={{ __html: isEditing ? (textRef.current?.innerText || displayText) : displayText }}
    />
  );
}
