"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function ProcurementPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'procurement'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

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
        title={<EditableText element="span" contentId="hero_title" defaultText="Procurement Documentation" isAdmin={isAdmin} value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Fast, frictionless vendor onboarding. Access all required legal and compliance documents below." isAdmin={isAdmin} value={cmsContent.hero_subtitle} />}
        theme="dark" 
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDOM_alpha.png?alt=media&token=47717353-59db-4f9f-b8a6-4dd70e6520be"
        imageAlt="Dominick Grillas, Chief Administrative Officer"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Dominick Grillas" isAdmin={isAdmin} value={cmsContent.hero_caption_name} />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Chief Administrative Officer & Delivery QA Testing & Automation Leader" isAdmin={isAdmin} value={cmsContent.hero_caption_title} />}
      />

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32 relative z-10">
        {sections.map(section => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
              <EditableText element="span" contentId={`${section.id}_h2`} defaultText={section.title} isAdmin={isAdmin} value={cmsContent[`${section.id}_h2`]} />
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[200px] flex items-center justify-center backdrop-blur-sm">
              <div className="text-white/50 font-ui text-lg border border-dashed border-white/20 px-8 py-4 rounded-xl bg-white/[0.02]">
                <EditableText element="p" contentId={`${section.id}_p`} defaultText={`[${section.content}]`} isAdmin={isAdmin} value={cmsContent[`${section.id}_p`]} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
