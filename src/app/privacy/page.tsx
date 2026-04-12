import SubpageHero from "@/components/SubpageHero";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Privacy Policy" 
        subtitle="Bridge2Partners is dedicated to protecting your data and maintaining the highest standards of security." 
      />

      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10 space-y-12">
        <h2 className="text-3xl font-display font-bold text-[#98cc67]">1. Data Collection</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
           <p className="text-white/70 font-ui text-lg leading-relaxed mb-4">
              [Privacy Policy Content Wireframe] <br/><br/>
              Bridge2Partners collects information that you provide to us directly through forms, emails, and direct communication.
           </p>
           <p className="text-white/50 text-sm">
              Please contact legal@bridge2partners.com for full data governance details.
           </p>
        </div>
      </div>
    </main>
  );
}
