'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ShieldAlert, X, Loader2, FileText, Send, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface GapAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportMarkdown: string | null;
  isLoading: boolean;
  theme: 'dark' | 'medium' | 'light';
}

export default function GapAnalysisModal({ isOpen, onClose, reportMarkdown, isLoading, theme }: GapAnalysisModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    
    setEmailSending(true);
    setEmailError('');

    try {
      if (!db) throw new Error("Firestore not initialized. Verify Firebase config.");
      
      await addDoc(collection(db, 'gap-analysis-leads'), {
        name,
        email,
        phone: phone || null,
        markdownReport: reportMarkdown,
        status: 'new',
        createdAt: serverTimestamp()
      });

      setEmailSuccess(true);
    } catch (err: any) {
      setEmailError(err.message);
    } finally {
      setEmailSending(false);
    }
  };

  if (!isOpen) return null;

  // Theme-aware styles for the modal
  const modalBg = theme === 'light' ? 'bg-white text-slate-900 border-slate-200' : 
                  theme === 'medium' ? 'bg-[#001b15] text-white border-white/10' : 
                  'bg-slate-900 text-white border-white/10';
  
  const backdropBg = theme === 'light' ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-[#001b15]/60 backdrop-blur-md';
  const overlayText = theme === 'light' ? 'text-slate-500' : 'text-white/60';
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 ${backdropBg}`}>
      <div className={`relative w-full max-w-4xl max-h-[90vh] min-h-[50vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${modalBg} animate-in fade-in zoom-in duration-300`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${theme === 'light' ? 'border-slate-100' : 'border-white/10 bg-white/5'}`}>
          <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-[#98cc67]/10' : 'bg-transparent border border-white/10'}`}>
               <ShieldAlert className="w-6 h-6 text-[#98cc67]" />
             </div>
             <div>
               <h3 className="font-display font-bold text-2xl">Gap Analysis Report</h3>
               <p className={`font-ui text-xs tracking-wider uppercase mt-1 ${overlayText}`}>B2P Intelligence • Automated Consultant</p>
             </div>
          </div>
          <button onClick={onClose} className={`p-3 rounded-full hover:bg-black/10 transition-colors ${overlayText}`}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 font-reading">
           {isLoading ? (
             <div className="h-full flex flex-col items-center justify-center min-h-[300px] gap-6">
                <Loader2 className="w-12 h-12 text-[#98cc67] animate-spin" />
                <div className="text-center">
                  <p className="font-display font-bold text-xl mb-2">Architecting Transformation...</p>
                  <p className={`text-sm ${overlayText}`}>B2P Intelligence is analyzing your infrastructure liabilities.</p>
                </div>
             </div>
           ) : reportMarkdown ? (
             <article className="max-w-none">
               <div className={`markdown-body ${theme === 'light' ? 'text-slate-800' : 'text-white/90'}`}>
                  <ReactMarkdown
                    components={{
                       h1: ({node, ...props}) => <h1 className="text-3xl font-display font-bold text-[#98cc67] mb-6 pb-2 border-b border-[#98cc67]/20" {...props} />,
                       h2: ({node, ...props}) => <h2 className="text-2xl font-display font-bold mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                       h3: ({node, ...props}) => <h3 className="text-xl font-display font-bold mt-6 mb-3 text-[#98cc67]" {...props} />,
                       ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 pt-2 space-y-3 opacity-90" {...props} />,
                       ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-3 opacity-90" {...props} />,
                       strong: ({node, ...props}) => <strong className="font-bold text-[#98cc67]" {...props} />,
                       p: ({node, ...props}) => <p className="mb-5 leading-loose text-lg" {...props} />
                    }}
                  >{reportMarkdown}</ReactMarkdown>
               </div>

               {/* Lead Capture Sticky Target */}
               <div className={`mt-12 p-8 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'}`}>
                 {emailSuccess ? (
                   <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in duration-300">
                     <CheckCircle2 className="w-16 h-16 text-[#98cc67] mb-4" />
                     <h4 className="text-2xl font-display font-bold mb-2">Report Delivered!</h4>
                     <p className={overlayText}>Check your inbox. A Bridge2Partners Technical Consultant has also been notified and will be in touch shortly.</p>
                   </div>
                 ) : (
                   <>
                     <div className="text-center mb-8">
                       <h4 className="text-2xl font-display font-bold mb-2">Save This Strategy</h4>
                       <p className={overlayText}>Send a copy of this generation to your inbox and connect with our execution team.</p>
                     </div>
                     <form onSubmit={handleSendReport} className="space-y-4 max-w-md mx-auto">
                       {emailError && <p className="text-red-400 text-sm mb-4 text-center">{emailError}</p>}
                       <input 
                         type="text" 
                         required 
                         placeholder="Full Name" 
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className={`w-full bg-transparent border ${theme === 'light' ? 'border-slate-300' : 'border-white/20'} rounded-xl px-4 py-3 outline-none focus:border-[#98cc67] transition-colors`}
                       />
                       <input 
                         type="email" 
                         required 
                         placeholder="Corporate Email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className={`w-full bg-transparent border ${theme === 'light' ? 'border-slate-300' : 'border-white/20'} rounded-xl px-4 py-3 outline-none focus:border-[#98cc67] transition-colors`}
                       />
                       <input 
                         type="tel" 
                         placeholder="Phone Number (Optional)" 
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                         className={`w-full bg-transparent border ${theme === 'light' ? 'border-slate-300' : 'border-white/20'} rounded-xl px-4 py-3 outline-none focus:border-[#98cc67] transition-colors`}
                       />
                       <button 
                         type="submit" 
                         disabled={emailSending}
                         className={`w-full ${theme === 'light' ? 'bg-[#001b15] text-[#98cc67]' : 'bg-[#98cc67] text-[#001b15]'} font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100`}
                       >
                         {emailSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Me This Report</>}
                       </button>
                     </form>
                   </>
                 )}
               </div>
             </article>
           ) : (
             <div className="h-full flex flex-col items-center justify-center min-h-[300px] text-center">
                <FileText className={`w-16 h-16 mb-4 ${overlayText} opacity-30`} />
                <p className={overlayText}>No analysis detected. Please provide a scenario to begin.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
