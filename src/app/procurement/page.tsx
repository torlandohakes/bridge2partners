import SubpageHero from "@/components/SubpageHero";

export default function ProcurementPage() {
  const sections = [
    { id: "legal-entity-overview", title: "Legal Entity Overview", content: "Wireframe content for Legal Entity Overview..." },
    { id: "financial-stability-indicators", title: "Financial Stability Indicators", content: "Wireframe content for Financial Stability..." },
    { id: "insurance-coverage-limits", title: "Insurance Coverage Limits", content: "Wireframe content for Insurance..." },
    { id: "compliance-standards", title: "Compliance Standards", content: "Wireframe content for Compliance..." },
    { id: "data-security-approach", title: "Data Security Approach", content: "Wireframe content for Data Security..." },
  ];

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Procurement Documentation" 
        subtitle="Fast, frictionless vendor onboarding. Access all required legal and compliance documents below." 
        theme="dark" 
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDOM_alpha.png?alt=media&token=47717353-59db-4f9f-b8a6-4dd70e6520be"
        imageAlt="Dominick Grillas, Chief Administrative Officer"
        imageCaptionName="Dominick Grillas"
        imageCaptionTitle="Chief Administrative Officer & Delivery QA Testing & Automation Leader"
      />

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32 relative z-10">
        {sections.map(section => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
              {section.title}
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[200px] flex items-center justify-center backdrop-blur-sm">
              <p className="text-white/50 font-ui text-lg border border-dashed border-white/20 px-8 py-4 rounded-xl bg-white/[0.02]">
                [{section.content}]
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
