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

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Challenge & Execution 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-20">
          
          {/* Left Column: The Challenge */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-[#98cc67] mb-8">
              <EditableText element="span" contentId="challenge_h2" defaultText="The Challenge" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.challenge_h2} />
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed flex-grow">
              <p>
                <EditableText element="span" contentId="challenge_p_1" defaultText="The complex, high-stakes tasks that slow down integration and delay the realization of value." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.challenge_p_1} />
              </p>
              <p>
                <EditableText element="span" contentId="challenge_p_2" defaultText="The fear that the 'Day One' transition will be messy, leading to a loss of credibility with the board or employees." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.challenge_p_2} />
              </p>
              <div className="text-white/60 italic border-l-2 border-[#98cc67]/30 pl-4 mt-8">
                <p className="leading-relaxed mb-3">
                  <EditableText element="span" contentId="challenge_p_3" defaultText="&quot;A merger shouldn't just be a 'survivable' event; it should be an immediate competitive advantage.&quot;" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.challenge_p_3} />
                </p>
                <span className="font-ui font-bold text-white/90 text-[13px] not-italic uppercase tracking-widest">— Bob Holohan</span>
              </div>
            </div>
          </div>

          {/* Right Column: How We Execute */}
          <div className="bg-[#001b15]/50 border border-[#98cc67]/30 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-white mb-8">
              <EditableText element="span" contentId="execute_h2" defaultText="How We Execute" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_h2} />
            </h2>
            
            <div className="flex flex-col justify-between flex-grow space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 border border-[#98cc67]/30 text-[#98cc67] flex items-center justify-center font-display font-bold text-xl shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step1_h3" defaultText="Integration Assessment" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step1_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step1_p" defaultText="We identify the complex dependencies that usually cause delays." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step1_p} />
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="absolute left-6 top-12 bottom-[-1.5rem] w-px bg-gradient-to-b from-[#98cc67]/30 to-transparent"></div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 items-start relative pt-2">
                <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 border border-[#98cc67]/30 text-[#98cc67] flex items-center justify-center font-display font-bold text-xl shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step2_h3" defaultText="Operational Readiness" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step2_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step2_p" defaultText="We build a 'Day One' roadmap to ensure total financial and tech control." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step2_p} />
                  </p>
                </div>
                {/* Connecting Line */}
                <div className="absolute left-6 top-14 bottom-[-1.5rem] w-px bg-gradient-to-b from-[#98cc67]/30 to-transparent"></div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 items-start pt-2">
                <div className="w-12 h-12 rounded-full bg-[#98cc67] text-[#000d0a] flex items-center justify-center font-display font-black text-xl shrink-0 shadow-[0_0_15px_rgba(152,204,103,0.3)]">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step3_h3" defaultText="Synergy Acceleration" isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step3_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step3_p" defaultText="We execute the plan to realize the deal's benefits faster than the market expects." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.execute_step3_p} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 max-w-5xl mx-auto mb-16" />

        {/* Two-Column Explainer Paragraph */}
        <div className="max-w-5xl mx-auto columns-1 md:columns-2 gap-16 font-sans text-lg text-white/70 leading-relaxed space-y-6 md:space-y-0 mb-24">
          <p className="break-inside-avoid first-letter:text-6xl first-letter:font-display first-letter:text-[#98cc67] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
            <EditableText element="span" contentId="explainer_p_1" defaultText="We understand that the gap between signing the deal and actually seeing the benefits is where most M&A value is lost. When multiple organizations attempt to consolidate their disparate tech stacks, core banking systems, and deeply ingrained operational cultures, the friction can be catastrophic if not actively managed. We specialize in the operational and technological heavy lifting that often stalls out post-closing. We step in as an extension of your leadership team to serve as the tactical bridge between high-level strategy and ground-level execution. We don't just plan; we accelerate." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.explainer_p_1} />
          </p>
          <div className="break-inside-avoid">
            <EditableText element="span" contentId="explainer_p_2" defaultText="By integrating successfully, you achieve seamless business continuity—meaning no 'broken' transitions. We engineer a technology roadmap that actively supports the new, larger organization rather than hindering it, leading to the accelerated realization of synergies and benefits. Without this rigorous execution framework, you face delayed ROI, massive operational drag that frustrates your employees, and a potential loss of financial control during the critical first 90 days. We ensure your merger is treated as a strategic catalyst, not just an IT survival exercise." isAdmin={isAdmin} documentId="ma-integration" value={cmsContent.explainer_p_2} />
          </div>
        </div>
      </div>

      <ServiceFooter isAdmin={isAdmin} cmsContent={cmsContent} documentId="ma-integration" tag="mergers" />
    </main>
  );
}
