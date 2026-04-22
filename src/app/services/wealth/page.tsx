"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import ServiceFooter from "@/components/ServiceFooter";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function WealthManagementService() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'wealth'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Wealth Management Analytics" isAdmin={isAdmin} documentId="wealth" value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Align technology with business goals to accelerate platform modernization and deepen client relationships." isAdmin={isAdmin} documentId="wealth" value={cmsContent.hero_subtitle} />}
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(75).png?alt=media&token=fd2c0e28-b578-44c2-b113-483c83d8b308"
        imageAlt="John Gustav, Head of Financial Services"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="John Gustav" isAdmin={isAdmin} documentId="wealth" value={cmsContent.hero_caption_name} />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Head of Financial Services" isAdmin={isAdmin} documentId="wealth" value={cmsContent.hero_caption_title} />}
        imageCaptionPosition="right"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Challenge & Execution 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-20">
          
          {/* Left Column: The Challenge */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-[#98cc67] mb-8">
              <EditableText element="span" contentId="challenge_h2" defaultText="The Challenge" isAdmin={isAdmin} documentId="wealth" value={cmsContent.challenge_h2} />
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed flex-grow">
              <p>
                <EditableText element="span" contentId="challenge_p_1" defaultText="Wealth management operations are burdened by outdated, manual processes. At the same time, leadership faces a constant mandate to scale efficiently while reducing overall expenses year over year." isAdmin={isAdmin} documentId="wealth" value={cmsContent.challenge_p_1} />
              </p>
              <p>
                <EditableText element="span" contentId="challenge_p_2" defaultText="Undertaking a major technology transformation carries massive professional risk. The pressure to modernize core systems without disrupting daily business operations is intense." isAdmin={isAdmin} documentId="wealth" value={cmsContent.challenge_p_2} />
              </p>
              <div className="text-white/60 italic border-l-2 border-[#98cc67]/30 pl-4 mt-8">
                <p className="leading-relaxed mb-3">
                  <EditableText element="span" contentId="challenge_p_3" defaultText="&quot;It's fundamentally wrong that clunky operations stand in the way of clients achieving their life goals. Your Financial Advisors shouldn't have to fight their own firm's internal systems just to do their jobs.&quot;" isAdmin={isAdmin} documentId="wealth" value={cmsContent.challenge_p_3} />
                </p>
                <span className="font-ui font-bold text-white/90 text-[13px] not-italic uppercase tracking-widest">— John Gustav</span>
              </div>
            </div>
          </div>

          {/* Right Column: How We Execute */}
          <div className="bg-[#001b15]/50 border border-[#98cc67]/30 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-white mb-8">
              <EditableText element="span" contentId="execute_h2" defaultText="How We Execute" isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_h2} />
            </h2>
            
            <div className="flex flex-col justify-between flex-grow space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 border border-[#98cc67]/30 text-[#98cc67] flex items-center justify-center font-display font-bold text-xl shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step1_h3" defaultText="The Operating Model Diagnostic" isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step1_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step1_p" defaultText="We assess operations front-to-back, analyzing experience, risk, efficiency, and functional capabilities." isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step1_p} />
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
                    <EditableText element="span" contentId="execute_step2_h3" defaultText="The Blueprint" isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step2_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step2_p" defaultText="We engineer a customized strategy that brings your firm to modern standards, acting as an insurance policy for your project." isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step2_p} />
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
                    <EditableText element="span" contentId="execute_step3_h3" defaultText="Rapid Implementation" isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step3_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step3_p" defaultText="We staff a dedicated technical team to execute integration, change management, and testing to accelerate transformation." isAdmin={isAdmin} documentId="wealth" value={cmsContent.execute_step3_p} />
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
            <EditableText element="span" contentId="explainer_p_1" defaultText="We know exactly how heavy the burden of leadership is. We understand the constant measurement you face and the stress of keeping highly mobile, revenue-generating FAs from taking their book of business elsewhere. We are your window to the outside world. We bring deep, specialized industry best practices so you don't have to rely on 'the way we've always done it'." isAdmin={isAdmin} documentId="wealth" value={cmsContent.explainer_p_1} />
          </p>
          <p className="break-inside-avoid">
            <EditableText element="span" contentId="explainer_p_2" defaultText="We back up our strategic expertise with a deep bench of cross-industry technical talent to ensure the job gets done right the first time. By executing rapidly and flawlessly, FAs become highly productive and loyal, the firm captures more wallet share, and you become the undisputed champion of a seamless, modern client experience—avoiding the severe professional consequences of a botched implementation." isAdmin={isAdmin} documentId="wealth" value={cmsContent.explainer_p_2} />
          </p>
        </div>
      </div>
      
      <ServiceFooter isAdmin={isAdmin} cmsContent={cmsContent} documentId="wealth" tag="wealth" />
    </main>
  );
}
