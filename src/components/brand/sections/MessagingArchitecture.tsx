import React from 'react';

export function MessagingArchitecture() {
  return (
    <div className="space-y-16 pb-24">
      {/* 1. Header Section */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono font-bold uppercase tracking-widest border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Messaging
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-slate-900 leading-[1.1]">
          B2P Messaging
        </h2>
        <p className="text-xl text-slate-600 font-sans leading-relaxed max-w-3xl">
          A definitive guide to help us talk about who we are, what we solve, and why it matters to the market.
        </p>
      </section>

      {/* 2. Brand Script StoryBrand Framework */}
      <section className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold font-heading text-foreground">The Brand Script</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            This script serves as our foundational narrative structure. Every piece of content we produce—ranging from executive pitch decks to social media campaigns—should trace its messaging back to these core storytelling pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-primary border-b border-neutral-100 pb-3">1. The Character</h4>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>Who are they?</strong> Regional Banking Executives, Heads of IT, CIOs, and COOs.
            </p>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>What do they want?</strong> To securely navigate complex digital transformations and execute bank-wide change management without disrupting everyday operations.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-md border border-[#00573f]/50 p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#009677] rounded-full blur-[40px] opacity-20 pointer-events-none" />
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-[#98cc67] border-b border-white/10 pb-3 relative z-10">2. The Problem</h4>
            <div className="space-y-3 relative z-10">
              <p className="text-sm font-sans text-white/90 leading-relaxed">
                <strong>External:</strong> Critical infrastructure—like wealth platforms, commercial lending workflows, M&A integrations, and treasury/payments—are heavily fragmented.
              </p>
              <p className="text-sm font-sans text-white/90 leading-relaxed">
                <strong>Internal:</strong> Leaders feel overwhelmed by the risk, cost, and complexity of modernizing massive, interconnected bank ecosystems.
              </p>
              <p className="text-sm font-sans text-white/90 leading-relaxed">
                <strong>Philosophical:</strong> Transformation shouldn't compromise stability; change management requires specialized orchestration.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-primary border-b border-neutral-100 pb-3">3. The Guide</h4>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>Empathy:</strong> We understand that a failed digital migration or poorly integrated M&A inherently threatens the institution's reputation and bottom line.
            </p>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>Authority:</strong> We are banking insiders. Our team consists of industry experts who have spent their careers navigating every level of banking change and transformation, making us uniquely equipped to derisk your modernization.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-primary border-b border-neutral-100 pb-3">4. The Plan</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm font-sans text-slate-700">
              <li><strong>Assess the Ecosystem</strong>: Comprehensive gap analysis across your wealth, lending, or treasury infrastructure.</li>
              <li><strong>Design the Transformation</strong>: Map a derisked, phased integration or migration strategy.</li>
              <li><strong>Execute Change Management</strong>: Drive user adoption, align IT with operations, and modernize your banking core effortlessly.</li>
            </ol>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-primary border-b border-neutral-100 pb-3">5. The Call To Action</h4>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>Direct:</strong> "Consult with an Advisory Partner" or "Schedule an Assessment".
            </p>
            <p className="text-sm font-sans text-slate-700 leading-relaxed">
              <strong>Transitional:</strong> "Download the Bank Modernization Case Study" or "Explore our M&A Blueprint".
            </p>
          </div>

          <div className="bg-neutral-50 rounded-xl shadow-inner border border-neutral-200 p-6 space-y-4">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-neutral-500 border-b border-neutral-200 pb-3">6. The Stakes</h4>
            <div className="space-y-3">
              <p className="text-sm font-sans text-slate-700 leading-relaxed">
                <span className="text-[#059669] font-bold">Success:</span> Achieve operational agility, unify disparate bank systems, and unlock new revenue velocity.
              </p>
              <p className="text-sm font-sans text-slate-700 leading-relaxed">
                <span className="text-[#dc2626] font-bold">Failure:</span> Stagnate on legacy technical debt, fumble critical M&A integrations, and lose enterprise clients to tech-superior competitors.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
