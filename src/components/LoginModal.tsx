'use client';

import React, { useState } from 'react';
import { ShieldCheck, X, Loader2, ArrowRight } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'medium' | 'light';
}

export default function LoginModal({ isOpen, onClose, theme }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!auth) throw new Error("Firebase Auth not initialized.");
      await signInWithEmailAndPassword(auth, email, password);
      // Success => User State globally tracks auth
      onClose();
    } catch (err: any) {
      setError("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const modalBg = theme === 'light' ? 'bg-white text-slate-900 border-slate-200' : 
                  theme === 'medium' ? 'bg-[#00573f] text-white border-white/20' : 
                  'bg-[#00120e] text-white border-white/10';
  
  const backdropBg = theme === 'light' ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-[#000d0a]/70 backdrop-blur-md';
  const overlayText = theme === 'light' ? 'text-slate-500' : 'text-white/60';
  const inputBg = theme === 'light' ? 'bg-transparent border-slate-300 focus:border-[#001b15]' : 'bg-white/5 border-white/20 focus:border-[#98cc67]';

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${backdropBg} animate-in fade-in duration-300`}>
      <div className={`relative w-full max-w-sm rounded-[2rem] border shadow-2xl overflow-hidden ${modalBg} animate-in zoom-in-95 duration-300 flex flex-col`}>
        
        <div className="flex justify-end p-4 absolute top-0 right-0 w-full z-10 pointer-events-none">
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-black/10 transition-colors pointer-events-auto ${overlayText}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 pt-10 flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner ${theme === 'light' ? 'bg-[#001b15]/5' : 'bg-white/10 border border-white/10'}`}>
            <ShieldCheck className={`w-8 h-8 ${theme === 'light' ? 'text-[#001b15]' : 'text-[#98cc67]'}`} />
          </div>
          
          <h3 className="font-display font-bold text-2xl tracking-tight mb-2">Designer Access</h3>
          <p className={`font-ui text-sm mb-8 leading-relaxed ${overlayText}`}>
            Authenticate to unlock the global design system toolkit.
          </p>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            {error && (
              <div className="w-full text-center text-red-500 font-ui text-xs font-bold bg-red-500/10 py-2 rounded-lg mb-4 border border-red-500/20">
                {error}
              </div>
            )}
            
            <input 
              type="email" 
              required 
              placeholder="Admin Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full ${inputBg} rounded-xl px-4 py-3 outline-none transition-colors text-sm font-ui`}
            />
            
            <input 
              type="password" 
              required 
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full ${inputBg} rounded-xl px-4 py-3 outline-none transition-colors text-sm font-ui`}
            />

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 ${theme === 'light' ? 'bg-[#001b15] text-white' : 'bg-[#98cc67] text-[#00120e]'}`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Unlock Dashboard <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
