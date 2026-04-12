import SubpageHero from "@/components/SubpageHero";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Terms of Service" 
        subtitle="The rules, conditions, and operational parameters for utilizing Bridge2Partners digital infrastructure." 
      />

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
        <h2 className="text-3xl font-display font-bold text-[#98cc67]">1. Usage Agreement</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
           <p className="text-white/70 font-ui text-lg leading-relaxed mb-4">
              [Terms of Service Content Wireframe] <br/><br/>
              By accessing the Bridge2Partners platform, you agree to abide by all specified corporate protocols and regulatory compliances.
           </p>
           <p className="text-white/50 text-sm">
              Please contact legal@bridge2partners.com for full contractual details.
           </p>
        </div>
      </div>
    </main>
  );
}
