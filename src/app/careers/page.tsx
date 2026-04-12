import SubpageHero from "@/components/SubpageHero";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Careers at Bridge2Partners" 
        subtitle="Join the team solving the hardest modernization problems in Tier-1 banking and wealth management." 
      />

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-8">
        <h2 className="text-3xl font-display font-bold text-[#98cc67] mb-8">Open Positions</h2>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center hover:bg-white/10 transition-colors cursor-not-allowed">
           <span className="text-white/50 font-ui text-lg mb-2">No open positions at this time.</span>
           <span className="text-white/30 text-sm">Check back later or send your resume to <span className="underline">careers@bridge2partners.com</span></span>
        </div>
      </div>
    </main>
  );
}
