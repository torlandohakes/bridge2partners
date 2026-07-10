'use client';

import React, { useState } from 'react';
import LinkedInFeed from '@/components/LinkedInFeed';
import { Newspaper, Send, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InsightsPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe.');
      }

      setStatus('success');
      setMessage(data.message || 'Successfully subscribed!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000d0a] text-white font-sans relative overflow-hidden flex flex-col pt-32 pb-16">
      {/* Aurora Ambient Background Orbs */}
      <div className="absolute top-[10%] left-[-20%] w-[80vw] h-[50vw] rounded-full bg-[#009677]/[0.15] blur-[150px] pointer-events-none -rotate-12" />
      <div className="absolute top-[30%] right-[-20%] w-[70vw] h-[45vw] rounded-full bg-[#98cc67]/[0.08] blur-[140px] pointer-events-none rotate-45" />
      <div className="absolute bottom-[10%] left-[10%] w-[60vw] h-[40vw] rounded-full bg-[#00573f]/[0.12] blur-[160px] pointer-events-none -rotate-6" />

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-12 flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Newspaper className="w-4 h-4 text-[#98cc67]" />
            <span className="font-ui text-[10px] sm:text-xs tracking-widest uppercase font-bold text-white/90">
              Thought Leadership & News
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight mb-6">
            Insights from the <span className="text-[#98cc67] bg-gradient-to-r from-[#98cc67] to-[#009677] bg-clip-text text-transparent">Frontlines</span>
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light">
            Real-time industry analysis, post-merger integration strategies, and banking modernization updates directly from our practicing operators.
          </p>
        </div>

        {/* Live Feed Container */}
        <div className="flex-1 mb-20">
          <LinkedInFeed theme="dark" />
        </div>

        {/* Newsletter CTA Block */}
        <section className="relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-16 overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#009677]/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <Send className="w-10 h-10 text-[#98cc67] mb-6" />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Get insights delivered to your inbox
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
              Subscribe to get our quarterly digital transformation reports, core systems diagnostics, and post-merger change playbooks.
            </p>
            
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#98cc67]/10 border border-[#98cc67]/20 max-w-md w-full animate-fade-in">
                <CheckCircle2 className="w-8 h-8 text-[#98cc67] animate-bounce" />
                <p className="font-ui text-sm font-semibold text-[#98cc67]">{message}</p>
                <p className="text-xs text-white/50">You will receive our next weekly LinkedIn digest.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email" 
                  required
                  disabled={loading}
                  className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#98cc67] transition-all font-ui text-sm sm:text-base outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary/80 backdrop-blur-[10px] border border-white/20 text-white px-8 py-6 rounded-full transition-all font-bold hover:bg-primary/90 hover:scale-[1.02] flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#98cc67]" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-xs mt-3 font-semibold font-ui">{message}</p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
