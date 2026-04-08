import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InlineEditableTextProps {
  value: string;
  onChange?: (val: string) => void;
  className?: string;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function InlineEditableText({ 
  value, 
  onChange, 
  className = '', 
  placeholder = 'Add text...', 
  as: Component = 'p' 
}: InlineEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Enter strictly for single-line inputs (headers, spans)
    if (e.key === 'Enter' && !e.shiftKey && Component !== 'p' && Component !== 'div') {
      e.preventDefault();
      handleBlur();
    }
  };

  // If component is read-only (e.g., thumbnail), just render the display object
  if (!onChange) {
    if (!value) return null; // match conditional rendering logic
    return <Component className={className}>{value}</Component>;
  }

  // Display raw input fields when actively editing
  if (isEditing) {
    if (Component === 'p' || Component === 'div') {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(className, "bg-transparent border-none outline-none resize-none overflow-hidden m-0 p-0 block w-full outline outline-2 outline-blue-500/50 rounded-sm")}
          rows={Math.max(1, tempValue.split('\n').length)}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(className, "bg-transparent border-none outline-none m-0 p-0 block w-full outline-2 outline-dashed outline-blue-500/40 rounded-sm")}
      />
    );
  }

  // If there's no value and we are just displaying a placeholder, fade it out to indicate editability
  const displayValue = value || placeholder;
  const opacityModifier = value ? '' : 'opacity-40 italic';

  return (
    <Component 
      onClick={() => setIsEditing(true)}
      className={cn(className, opacityModifier, "cursor-text hover:outline-2 hover:outline-dashed hover:outline-blue-500/40 hover:bg-white/5 rounded-sm transition-all py-0.5 px-1 -mx-1")}
    >
      {displayValue}
    </Component>
  );
}
