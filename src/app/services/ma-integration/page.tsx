"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import ServiceFooter from "@/components/ServiceFooter";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function MAIntegrationService() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'ma-integration'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="M&A Tech Integration" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Execute derisked, post-merger technology integrations across legacy core dependencies." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.hero_subtitle} />}
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(77).png?alt=media&token=361ca2b2-eb78-45c0-8c7a-80f76df8e060"
        imageAlt="Bob Holohan, Managing Director of M&A and Business Transformation"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Bob Holohan" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.hero_caption_name} />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Managing Director of M&A and Business Transformation" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.hero_caption_title} />}
        imageCaptionPosition="right"
      />

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-[#98cc67]">
            <EditableText element="span" contentId="section_1_h2" defaultText="The Challenge" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.section_1_h2} />
          </h2>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[300px] flex items-center justify-center">
             <div className="text-white/50 border border-dashed border-white/20 p-6 w-full text-center rounded-xl bg-white/[0.02]">
               <EditableText element="p" contentId="section_1_p" defaultText="[Client Challenge Wireframe Block]" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.section_1_p} />
             </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold text-[#98cc67]">
            <EditableText element="span" contentId="section_2_h2" defaultText="How We Execute" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.section_2_h2} />
          </h2>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl min-h-[300px] flex items-center justify-center">
             <div className="text-white/50 border border-dashed border-white/20 p-6 w-full text-center rounded-xl bg-white/[0.02]">
               <EditableText element="p" contentId="section_2_p" defaultText="[Execution Strategy Wireframe Block]" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.section_2_p} />
             </div>
          </div>
        </div>
      </div>

      <ServiceFooter isAdmin={isAdmin} cmsContent={cmsContent} documentId="ma-integration" tag="mergers" />
    </main>
  );
}
