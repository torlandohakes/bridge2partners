'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Video, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'medium' | 'light';
}

export default function StrategyCallModal({ isOpen, onClose, theme }: StrategyCallModalProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  // Generate 14 days from today for the mock calendar
  const today = new Date();
  const mockDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1); // Start from tomorrow
    // Skip weekends for enterprise realism
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    if (d.getDay() === 6) d.setDate(d.getDate() + 2);
    return d;
  });

  const mockTimes = ["09:00 AM", "10:30 AM", "01:00 PM", "03:15 PM", "04:30 PM"];

  // Theme-aware styles for the modal
  const modalBg = theme === 'light' ? 'bg-white text-slate-900 border-slate-200' : 
                  theme === 'medium' ? 'bg-[#001b15] text-white border-white/10' : 
                  'bg-slate-900 text-white border-white/10';
  
  const backdropBg = theme === 'light' ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-[#001b15]/60 backdrop-blur-md';
  const overlayText = theme === 'light' ? 'text-slate-500' : 'text-white/60';
  const divider = theme === 'light' ? 'border-slate-100' : 'border-white/10';
  
  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
      setSelectedDate(null);
      setSelectedTime(null);
      onClose();
    }, 2500);
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-12 ${backdropBg}`}>
      <div className={`relative w-full max-w-5xl h-[80vh] min-h-[500px] max-h-[800px] flex flex-col md:flex-row rounded-3xl border shadow-2xl overflow-hidden ${modalBg} animate-in fade-in zoom-in duration-300`}>
        
        {/* Left Column (Call Context) */}
        <div className={`w-full md:w-1/3 p-8 border-r ${divider} ${theme === 'light' ? 'bg-slate-50/50' : 'bg-black/10'}`}>
           <button onClick={onClose} className={`absolute top-6 left-6 md:hidden p-2 rounded-full hover:bg-black/10 transition-colors ${overlayText}`}>
              <X className="w-5 h-5" />
           </button>
           <div className="mt-8 md:mt-4 mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${theme === 'light' ? 'bg-[#98cc67]/10' : 'bg-[#98cc67]/20 border border-[#98cc67]/30'}`}>
                 <CalendarIcon className="w-8 h-8 text-[#98cc67]" />
              </div>
              <h3 className={`font-ui text-xs tracking-widest uppercase mb-2 ${overlayText} font-bold`}>Transformation Architecture</h3>
              <h2 className="font-display font-bold text-3xl mb-6">Discovery & Strategy Execution Call</h2>

              <div className={`space-y-4 font-ui text-sm ${theme === 'light' ? 'text-slate-700' : 'text-white/80'}`}>
                 <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 opacity-50" />
                    <span className="font-medium">45 Minutes</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 opacity-50" />
                    <span className="font-medium">Microsoft Teams Integration</span>
                 </div>
              </div>

              <p className={`mt-8 font-reading leading-relaxed ${overlayText}`}>
                 Book an immediate technical block with our Senior Partners. We will skip the sales pitch and dive directly into your post-merger integration or legacy architecture constraints.
              </p>
           </div>
        </div>

        {/* Right Column (Interactive Calendar Mockup) */}
        <div className="flex-1 flex flex-col p-8 relative overflow-y-auto">
          <div className="flex justify-end hidden md:flex mb-2">
             <button onClick={onClose} className={`p-2 rounded-full hover:bg-black/10 transition-colors ${overlayText}`}>
                <X className="w-6 h-6" />
             </button>
          </div>

          {isConfirmed ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-20 h-20 text-[#98cc67] mb-6" />
                <h3 className="font-display font-bold text-3xl mb-2">Meeting Confirmed</h3>
                <p className={`font-reading text-lg max-w-md ${overlayText}`}>
                   Your invite for {selectedDate !== null && mockDates[selectedDate].toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime} has been dispatched.
                </p>
             </div>
          ) : (
            <>
              <h3 className="font-display font-bold text-2xl mb-8">Select a Date & Time</h3>
              
              <div className="flex flex-col lg:flex-row gap-8">
                 {/* Calendar Grid */}
                 <div className="flex-1">
                    <h4 className={`font-ui text-sm font-semibold mb-4 ${overlayText}`}>Available Dates</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                       {mockDates.map((date, idx) => {
                         const isSelected = selectedDate === idx;
                         return (
                           <button 
                             key={idx}
                             onClick={() => { setSelectedDate(idx); setSelectedTime(null); }}
                             className={`p-4 rounded-xl border text-center transition-all ${
                               isSelected 
                                 ? 'bg-[#00573f] text-white border-[#00573f] shadow-[0_10px_20px_rgba(0,87,63,0.3)] scale-105' 
                                 : `${theme === 'light' ? 'bg-white border-slate-200 hover:border-[#98cc67] hover:bg-[#98cc67]/5' : 'bg-black/20 border-white/10 hover:border-[#98cc67]/50 hover:bg-[#98cc67]/10'}`
                             }`}
                           >
                              <div className={`text-xs uppercase mb-1 font-ui font-semibold ${isSelected ? 'text-white/80' : overlayText}`}>
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className={`text-xl font-bold font-display ${isSelected ? 'text-white' : theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                                {date.getDate()}
                              </div>
                           </button>
                         );
                       })}
                    </div>
                 </div>

                 {/* Time Slots (Only visible if Date is selected) */}
                 {selectedDate !== null && (
                   <div className="w-full lg:w-48 animate-in slide-in-from-right-8 duration-300">
                     <h4 className={`font-ui text-sm font-semibold mb-4 ${overlayText}`}>
                       {mockDates[selectedDate].toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                     </h4>
                     <div className="flex flex-col gap-3">
                        {mockTimes.map((time, idx) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedTime(time)}
                              className={`p-4 rounded-xl border text-center font-bold tracking-wide transition-all ${
                                isSelected 
                                  ? 'bg-[#009677] text-white border-[#009677] shadow-[0_10px_20px_rgba(0,150,119,0.3)]' 
                                  : `${theme === 'light' ? 'bg-white border-slate-200 text-[#001b15]' : 'bg-black/20 border-white/10 text-white'}`
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                     </div>

                     {selectedTime && (
                       <button
                         onClick={handleConfirm}
                         className="w-full mt-8 bg-[#98cc67] hover:bg-[#86bb55] text-[#001b15] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-xl animate-in fade-in duration-300"
                       >
                         Confirm <ArrowRight className="w-5 h-5" />
                       </button>
                     )}
                   </div>
                 )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
