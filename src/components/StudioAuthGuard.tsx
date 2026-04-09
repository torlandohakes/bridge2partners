'use client';

import React, { useState, useEffect } from 'react';

export function StudioAuthGuard({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('b2p_studio_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'b2pass') { // Generic hardcoded passcode just for the tool
      sessionStorage.setItem('b2p_studio_unlocked', 'true');
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
    }
  };

  if (!isClient) return <div className="min-h-screen bg-[#001b15]" />; // Prevent SSR hydration mismatch wrapper

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#001b15] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center border border-white/20 mx-auto mb-4">
             <span className="text-white text-sm font-mono font-bold tracking-widest leading-none">SAS</span>
          </div>
          <h1 className="text-white font-ui font-semibold tracking-widest uppercase text-xl">
            Restricted Access
          </h1>
          <p className="text-white/50 text-sm mt-2 font-mono">
            Enter administrative passcode to open Studio.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="flex flex-col space-y-4">
          <input 
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            className={`w-full bg-[#00140f] border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-emerald-500'} text-white text-center font-mono rounded px-4 py-3 outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all`}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs text-center font-mono">Incorrect credential.</p>}
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-ui uppercase tracking-widest text-sm py-3 rounded transition-colors font-semibold"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
