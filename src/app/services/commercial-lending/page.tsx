"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function CommercialLendingService() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'commercial-lending'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Commercial Lending Automation" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Streamline commercial lending workflows and modernize infrastructure for faster loan origination." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.hero_subtitle} />}
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(78).png?alt=media&token=51dedfc2-9786-4d4a-a9cf-cfaf389fe979"
        imageAlt="Shane Williams, Head of Capital Markets and Commercial Lending"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Shane Williams" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.hero_caption_name} />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Head of Capital Markets and Commercial Lending" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.hero_caption_title} />}
        imageCaptionPosition="right"
      />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Challenge & Execution 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch mb-20">
          
          {/* Left Column: The Challenge */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-[#98cc67] mb-8">
              <EditableText element="span" contentId="challenge_h2" defaultText="The Challenge" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.challenge_h2} />
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-white/80 leading-relaxed flex-grow">
              <p>
                <EditableText element="span" contentId="challenge_p_1" defaultText="Disjointed tech stacks and manual data entry are crippling commercial lending operations, turning your best relationship managers into internal administrators." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.challenge_p_1} />
              </p>
              <p>
                <EditableText element="span" contentId="challenge_p_2" defaultText="Attempting a digital overhaul on complex loan origination systems carries massive risk. Leaders fear that modernization will disrupt active credit workflows and frustrate top producers." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.challenge_p_2} />
              </p>
              <div className="text-white/60 italic border-l-2 border-[#98cc67]/30 pl-4 mt-8">
                <p className="leading-relaxed mb-3">
                  <EditableText element="span" contentId="challenge_p_3" defaultText="&quot;The goal isn't to replicate past inefficiencies with new software; it's to free up your relationship managers to focus entirely on driving revenue.&quot;" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.challenge_p_3} />
                </p>
                <span className="font-ui font-bold text-white/90 text-[13px] not-italic uppercase tracking-widest">— Shane Williams</span>
              </div>
            </div>
          </div>

          {/* Right Column: How We Execute */}
          <div className="bg-[#001b15]/50 border border-[#98cc67]/30 p-10 rounded-2xl shadow-xl flex flex-col h-full">
            <h2 className="text-4xl font-display font-bold text-white mb-8">
              <EditableText element="span" contentId="execute_h2" defaultText="How We Execute" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_h2} />
            </h2>
            
            <div className="flex flex-col justify-between flex-grow space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6 items-start relative">
                <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 border border-[#98cc67]/30 text-[#98cc67] flex items-center justify-center font-display font-bold text-xl shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    <EditableText element="span" contentId="execute_step1_h3" defaultText="Workflow Diagnostic" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step1_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step1_p" defaultText="We analyze your end-to-end credit lifecycle—from origination to underwriting and booking—to identify bottlenecks and redundancies." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step1_p} />
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
                    <EditableText element="span" contentId="execute_step2_h3" defaultText="Target Operating Model" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step2_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step2_p" defaultText="We architect a streamlined, future-state operating model that integrates disparate systems into a unified lending platform." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step2_p} />
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
                    <EditableText element="span" contentId="execute_step3_h3" defaultText="Accelerated Deployment" isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step3_h3} />
                  </h3>
                  <p className="font-sans text-white/70 leading-relaxed text-[15px]">
                    <EditableText element="span" contentId="execute_step3_p" defaultText="We embed seasoned operators alongside your teams to drive adoption, manage change, and ensure immediate ROI without disrupting active deal flow." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.execute_step3_p} />
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
            <EditableText element="span" contentId="explainer_p_1" defaultText="We know that commercial lending is the engine of your bank's profitability, and that overhauling the systems that run it feels like performing open-heart surgery. Led by industry veterans like Shane Williams, Bridge2Partners acts as the vital bridge between your high-level modernization strategy and the complex, on-the-ground reality of your credit operations. We don't just hand you a playbook; we actively drive the transformation." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.explainer_p_1} />
          </p>
          <div className="break-inside-avoid">
            <EditableText element="span" contentId="explainer_p_2" defaultText="By streamlining your commercial lending infrastructure, you drastically reduce time-to-decision, enabling your relationship managers to win more deals and grow their portfolios. Without this rigorous alignment, you risk frustrating your best clients with sluggish approvals, burning out your underwriting teams with manual rework, and ultimately losing highly profitable commercial relationships to more agile competitors." isAdmin={isAdmin} documentId="commercial-lending" value={cmsContent.explainer_p_2} />
          </div>
        </div>
      </div>
    </main>
  );
}
