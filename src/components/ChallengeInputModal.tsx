'use client';

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';

interface ChallengeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (challenge: string) => void;
  theme: 'dark' | 'medium' | 'light';
}

export default function ChallengeInputModal({ isOpen, onClose, onSubmit, theme }: ChallengeInputModalProps) {
  const [challengeText, setChallengeText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (challengeText.trim()) {
      onSubmit(challengeText);
      setChallengeText('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Theme-aware styles for the modal
  const modalBg = theme === 'light' ? 'bg-white text-slate-900 border-slate-200' : 
                  theme === 'medium' ? 'bg-[#001b15] text-white border-white/10' : 
                  'bg-slate-900 text-white border-white/10';
  
  const backdropBg = theme === 'light' ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-[#001b15]/60 backdrop-blur-md';
  const overlayText = theme === 'light' ? 'text-slate-500' : 'text-white/60';

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-12 ${backdropBg}`}>
      <div className={`relative w-full max-w-2xl flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${modalBg} animate-in fade-in zoom-in duration-300`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'light' ? 'border-slate-100' : 'border-white/10 bg-white/5'}`}>
          <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-[#98cc67]/10' : 'bg-[#98cc67]/20 border border-[#98cc67]/30'}`}>
               <Sparkles className="w-6 h-6 text-[#98cc67]" />
             </div>
             <div>
               <h3 className="font-display font-bold text-2xl">What's slowing you down?</h3>
               <p className={`font-ui text-xs tracking-wider uppercase mt-1 ${overlayText}`}>B2P Intelligence • Gap Analysis</p>
             </div>
          </div>
          <button onClick={onClose} className={`p-3 rounded-full hover:bg-black/10 transition-colors ${overlayText}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
          <p className={`font-reading text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-white/80'}`}>
            Describe your current operational blocker, migration target, or post-merger integration challenge. Our AI Engine will generate a high-level execution map.
          </p>

          <textarea
            value={challengeText}
            onChange={(e) => setChallengeText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='E.g., "We are migrating to a unified FIS core and need to align our commercial lending teams..."' 
            className={`w-full min-h-[150px] resize-none rounded-xl p-4 md:p-5 font-reading text-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#98cc67] ${
              theme === 'dark' 
                ? 'bg-black/40 border border-white/20 text-white placeholder:text-white/30' 
                : theme === 'medium'
                  ? 'bg-white/5 border border-white/20 text-white placeholder:text-white/40'
                  : 'bg-slate-50 border border-slate-200 text-[#001b15] placeholder:text-slate-400 focus:bg-white'
            }`}
            autoFocus
          />

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              disabled={!challengeText.trim()}
              className="bg-[#009677] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#007a61] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors duration-300 shadow-lg"
            >
              Generate Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
