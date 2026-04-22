"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import ServiceFooter from "@/components/ServiceFooter";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function TreasuryService() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'treasury'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Treasury & Payments" isAdmin={isAdmin} documentId="treasury" value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Modernize payments and treasury operations for immediate ROI without core replacement." isAdmin={isAdmin} documentId="treasury" value={cmsContent.hero_subtitle} />}
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(76).png?alt=media&token=292094e1-53b4-43ee-94cf-841c3a139fe7"
        imageAlt="Linda Weber, Managing Director, Treasury Management & Payments Practice Leader"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Linda Weber" isAdmin={isAdmin} documentId="treasury" value={cmsContent.hero_caption_name} />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Managing Director, Treasury Management & Payments Practice Leader" isAdmin={isAdmin} documentId="treasury" value={cmsContent.hero_caption_title} />}
        imageCaptionPosition="right"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Challenge & Execution 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-20">
          
          {/* Left Column: The Challenge */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-[#98cc67] mb-8">
              <EditableText element="span" contentId="challenge_h2" defaultText="The Challenge" isAdmin={isAdmin} documentId="treasury" value={cmsContent.challenge_h2} />
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed flex-grow">
              <p>
                <EditableText element="span" contentId="challenge_p_1" defaultText="Fragmented legacy processes and overhyped buzzwords promise 'digital' but deliver manual friction. Onboarding is a 'disjointed' experience filled with redundant PDF forms and 'too many hands' in the decision-making process." isAdmin={isAdmin} documentId="treasury" value={cmsContent.challenge_p_1} />
              </p>
              <p>
                <EditableText element="span" contentId="challenge_p_2" defaultText="Teams feel like they are 'servicing an airplane while it's in flight,' struggling to align Treasury and Operations." isAdmin={isAdmin} documentId="treasury" value={cmsContent.challenge_p_2} />
              </p>
              <div className="text-white/60 italic border-l-2 border-[#98cc67]/30 pl-4 mt-8">
                <p className="leading-relaxed mb-3">
                  <EditableText element="span" contentId="challenge_p_3" defaultText="&quot;Banks shouldn't lose 'share of wallet' to fintechs just because their internal silos make the client experience difficult.&quot;" isAdmin={isAdmin} documentId="treasury" value={cmsContent.challenge_p_3} />
                </p>
                <span className="font-ui font-bold text-white/90 text-[13px] not-italic uppercase tracking-widest">— Linda Weber</span>
              </div>
            </div>
          </div>

          {/* Right Column: How We Execute */}
          <div className="bg-[#001b15]/50 border border-[#98cc67]/30 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-white mb-8">
              <EditableText element="span" contentId="execute_h2" defaultText="How We Execute" isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_h2} />
            </h2>
            
            <div className="flex flex-col justify-between flex-grow space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 border border-[#98cc67]/30 text-[#98cc67] flex items-center justify-center font-display font-bold text-xl shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step1_h3" defaultText="Peer Discovery" isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step1_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step1_p" defaultText="Join a Peers In Practice Roundtable to benchmark your journey against other senior leaders and identify common industry pitfalls." isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step1_p} />
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
                    <EditableText element="span" contentId="execute_step2_h3" defaultText="Journey Mapping" isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step2_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step2_p" defaultText="Map your current workflows to identify 'low-hanging fruit' and 'quick wins' that drive immediate speed to revenue." isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step2_p} />
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
                    <EditableText element="span" contentId="execute_step3_h3" defaultText="Change Leadership" isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step3_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step3_p" defaultText="Execute a strategic roadmap focused on internal alignment and training to ensure your organization is as ready for change as your technology is." isAdmin={isAdmin} documentId="treasury" value={cmsContent.execute_step3_p} />
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
            <EditableText element="span" contentId="explainer_p_1" defaultText="We understand that change is hard and that senior leaders face immense pressure to modernize without breaking existing trust. Led by industry veterans Christine Simon and Linda Weber, B2P facilitates candid, peer-to-peer discussions that cut through the noise of sales pitches." isAdmin={isAdmin} documentId="treasury" value={cmsContent.explainer_p_1} />
          </p>
          <div className="break-inside-avoid">
            <EditableText element="span" contentId="explainer_p_2" defaultText="Our approach drastically shortens onboarding times, allowing clients to generate transaction revenue faster with a 'Single Pane of Glass' view that replaces manual rekeying. We empower your Operations and Treasury teams to deliver an 'Apple-like' client experience. Without this alignment, you risk fractured trust, operational burnout, and losing your competitive advantage as fintechs continue to 'eat the banks' lunch.'" isAdmin={isAdmin} documentId="treasury" value={cmsContent.explainer_p_2} />
          </div>
        </div>
      </div>

      <ServiceFooter isAdmin={isAdmin} cmsContent={cmsContent} documentId="treasury" tag="treasury" />
    </main>
  );
}
