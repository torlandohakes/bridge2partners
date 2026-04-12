import SubpageHero from "@/components/SubpageHero";

export default function MAIntegrationService() {
  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="M&A Tech Integration" 
        subtitle="Execute derisked, post-merger technology integrations across legacy core dependencies." 
      />

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-[#98cc67]">The Challenge</h2>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[300px] flex items-center justify-center">
             <p className="text-white/50 border border-dashed border-white/20 p-6 w-full text-center rounded-xl bg-white/[0.02]">
               [Client Challenge Wireframe Block]
             </p>
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-[#98cc67]">How We Execute</h2>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[300px] flex items-center justify-center">
             <p className="text-white/50 border border-dashed border-white/20 p-6 w-full text-center rounded-xl bg-white/[0.02]">
               [Execution Strategy Wireframe Block]
             </p>
          </div>
        </div>
      </div>
    </main>
  );
}
