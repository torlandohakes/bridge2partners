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
    { id: "technology-stack", title: "Technology Stack", content: "Wireframe content for Technology Stack..." },
    { id: "compliance-standards", title: "Compliance Standards", content: "Wireframe content for Compliance..." },
    { id: "data-security-approach", title: "Data Security Approach", content: "Wireframe content for Data Security..." },
    { id: "insurance-coverage-limits", title: "Insurance Coverage Limits", content: "Wireframe content for Insurance..." },
  ];

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Procurement Documentation" isAdmin={isAdmin} value={cmsContent.hero_title} documentId="procurement" />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Fast, frictionless vendor onboarding. Access all required legal and compliance documents below." isAdmin={isAdmin} value={cmsContent.hero_subtitle} documentId="procurement" />}
        theme="dark" 
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDOM_alpha.png?alt=media&token=47717353-59db-4f9f-b8a6-4dd70e6520be"
        imageAlt="Dominick Grillas, Chief Administrative Officer"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Dominick Grillas" isAdmin={isAdmin} value={cmsContent.hero_caption_name} documentId="procurement" />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Chief Administrative Officer & Delivery QA Testing & Automation Leader" isAdmin={isAdmin} value={cmsContent.hero_caption_title} documentId="procurement" />}
      />

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-32 relative z-10">
        
        {/* 1. Legal Entity Overview */}
        <section id="legal-entity-overview" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="legal-entity-overview_h2" defaultText="Legal Entity Overview" isAdmin={isAdmin} value={cmsContent["legal-entity-overview_h2"]} documentId="procurement" />
          </h2>
          <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
            <EditableText element="p" contentId="legal-entity-overview_p" defaultText="Bridge2Partners is organized to seamlessly integrate with enterprise vendor management systems. We maintain clean, transparent corporate structuring to accelerate diligence and MSA approvals." isAdmin={isAdmin} value={cmsContent["legal-entity-overview_p"]} documentId="procurement" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
              <span className="text-sm font-ui text-white/40 uppercase tracking-wider mb-1">Entity Name</span>
              <span className="text-lg font-medium text-white/90"><EditableText element="span" contentId="legal_entity_name" defaultText="Bridge2Partners, LLC" isAdmin={isAdmin} value={cmsContent.legal_entity_name} documentId="procurement" /></span>
            </div>
            <div className="flex flex-col pb-4 md:pb-0 md:pl-4">
              <span className="text-sm font-ui text-white/40 uppercase tracking-wider mb-1">State of Incorporation</span>
              <span className="text-lg font-medium text-white/90"><EditableText element="span" contentId="legal_state" defaultText="Delaware" isAdmin={isAdmin} value={cmsContent.legal_state} documentId="procurement" /></span>
            </div>
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 py-4 md:pt-4 md:pr-4">
              <span className="text-sm font-ui text-white/40 uppercase tracking-wider mb-1">DUNS Number</span>
              <span className="text-lg font-medium text-white/90 font-mono"><EditableText element="span" contentId="legal_duns" defaultText="Available upon executed NDA" isAdmin={isAdmin} value={cmsContent.legal_duns} documentId="procurement" /></span>
            </div>
            <div className="flex flex-col pt-4 md:pl-4">
              <span className="text-sm font-ui text-white/40 uppercase tracking-wider mb-1">Primary NAICS Code</span>
              <span className="text-lg font-medium text-white/90 font-mono"><EditableText element="span" contentId="legal_naics" defaultText="541611 (Admin Management Consulting)" isAdmin={isAdmin} value={cmsContent.legal_naics} documentId="procurement" /></span>
            </div>
          </div>
        </section>

        {/* 2. Technology Stack */}
        <section id="technology-stack" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="technology-stack_h2" defaultText="Technology Stack" isAdmin={isAdmin} value={cmsContent["technology-stack_h2"]} documentId="procurement" />
          </h2>
          <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
            <EditableText element="p" contentId="technology-stack_p" defaultText="Our internal tooling and client-facing platforms operate on enterprise-grade, cloud-agnostic infrastructure designed for zero-trust environments." isAdmin={isAdmin} value={cmsContent["technology-stack_p"]} documentId="procurement" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_1_title" defaultText="Cloud Infrastructure" isAdmin={isAdmin} value={cmsContent.tech_1_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_1_desc" defaultText="AWS & Google Cloud Platform for distributed computing, utilizing isolated VPCs and dedicated instances for client workloads." isAdmin={isAdmin} value={cmsContent.tech_1_desc} documentId="procurement" /></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_2_title" defaultText="Identity & Access" isAdmin={isAdmin} value={cmsContent.tech_2_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_2_desc" defaultText="Okta-backed SSO with mandatory hardware-key MFA for all personnel and role-based access control (RBAC)." isAdmin={isAdmin} value={cmsContent.tech_2_desc} documentId="procurement" /></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_3_title" defaultText="Integration Layer" isAdmin={isAdmin} value={cmsContent.tech_3_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_3_desc" defaultText="MuleSoft & Apigee API gateways for secure, encrypted telemetry and data mapping across banking cores." isAdmin={isAdmin} value={cmsContent.tech_3_desc} documentId="procurement" /></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_4_title" defaultText="Core Banking & Lending" isAdmin={isAdmin} value={cmsContent.tech_4_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_4_desc" defaultText="Deep operational expertise integrating and migrating complex commercial lending platforms, including AFS, and modernizing FIS core ecosystems." isAdmin={isAdmin} value={cmsContent.tech_4_desc} documentId="procurement" /></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_5_title" defaultText="Payments & Onboarding" isAdmin={isAdmin} value={cmsContent.tech_5_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_5_desc" defaultText="Accelerating client lifecycle management through automated Treasury onboarding workflows and real-time payment rail integrations." isAdmin={isAdmin} value={cmsContent.tech_5_desc} documentId="procurement" /></p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="tech_6_title" defaultText="Delivery QA & Testing" isAdmin={isAdmin} value={cmsContent.tech_6_title} documentId="procurement" /></h3>
              <p className="text-sm text-white/60"><EditableText element="span" contentId="tech_6_desc" defaultText="Rigorous test automation and QA frameworks designed to ensure zero-defect deployments during highly sensitive banking migrations." isAdmin={isAdmin} value={cmsContent.tech_6_desc} documentId="procurement" /></p>
            </div>
          </div>
        </section>

        {/* 3. Compliance Standards */}
        <section id="compliance-standards" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="compliance-standards_h2" defaultText="Compliance Standards" isAdmin={isAdmin} value={cmsContent["compliance-standards_h2"]} documentId="procurement" />
          </h2>
          <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
            <EditableText element="p" contentId="compliance-standards_p" defaultText="We adhere to the strictest regulatory frameworks demanded by Tier-1 financial institutions. Full attestation reports are available in our secure data room." isAdmin={isAdmin} value={cmsContent["compliance-standards_p"]} documentId="procurement" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex flex-wrap gap-4">
             {["SOC 2 Type II Audited", "ISO 27001 Aligned", "GDPR & CCPA Compliant", "GLBA Privacy Standards", "Annual Third-Party Pentests"].map((standard, idx) => (
               <div key={idx} className="flex items-center gap-3 bg-[#001b15] border border-[#98cc67]/30 px-5 py-3 rounded-full">
                 <div className="w-2 h-2 rounded-full bg-[#98cc67]"></div>
                 <span className="font-medium text-white/90 text-sm">
                   <EditableText element="span" contentId={`comp_badge_${idx}`} defaultText={standard} isAdmin={isAdmin} value={cmsContent[`comp_badge_${idx}`]} documentId="procurement" />
                 </span>
               </div>
             ))}
          </div>
        </section>

        {/* 4. Data Security Approach */}
        <section id="data-security-approach" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="data-security-approach_h2" defaultText="Data Security Approach" isAdmin={isAdmin} value={cmsContent["data-security-approach_h2"]} documentId="procurement" />
          </h2>
          <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
            <EditableText element="p" contentId="data-security-approach_p" defaultText="We operate under the assumption of breach. Client data is never comingled, and we enforce strict data minimization policies during all engagements." isAdmin={isAdmin} value={cmsContent["data-security-approach_p"]} documentId="procurement" />
          </div>
          <div className="space-y-4">
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex gap-6 items-start">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <span className="text-[#98cc67] font-bold">01</span>
               </div>
               <div>
                 <h4 className="text-lg font-bold text-white mb-1"><EditableText element="span" contentId="sec_1_h4" defaultText="Encryption Standards" isAdmin={isAdmin} value={cmsContent.sec_1_h4} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm"><EditableText element="span" contentId="sec_1_p" defaultText="All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Cryptographic keys are managed via AWS KMS with regular rotation." isAdmin={isAdmin} value={cmsContent.sec_1_p} documentId="procurement" /></p>
               </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex gap-6 items-start">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <span className="text-[#98cc67] font-bold">02</span>
               </div>
               <div>
                 <h4 className="text-lg font-bold text-white mb-1"><EditableText element="span" contentId="sec_2_h4" defaultText="Endpoint Security" isAdmin={isAdmin} value={cmsContent.sec_2_h4} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm"><EditableText element="span" contentId="sec_2_p" defaultText="All B2P operator devices are MDM-enrolled, utilizing CrowdStrike Falcon for continuous EDR monitoring and automated threat isolation." isAdmin={isAdmin} value={cmsContent.sec_2_p} documentId="procurement" /></p>
               </div>
             </div>
          </div>
        </section>

        {/* 5. Insurance Coverage Limits */}
        <section id="insurance-coverage-limits" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="insurance-coverage-limits_h2" defaultText="Insurance Coverage Limits" isAdmin={isAdmin} value={cmsContent["insurance-coverage-limits_h2"]} documentId="procurement" />
          </h2>
          <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
            <EditableText element="p" contentId="insurance-coverage-limits_p" defaultText="We maintain comprehensive, high-limit insurance policies designed to satisfy the risk management requirements of commercial banking entities." isAdmin={isAdmin} value={cmsContent["insurance-coverage-limits_p"]} documentId="procurement" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="py-4 px-6 font-ui text-sm uppercase tracking-wider text-white/70 border-b border-white/10">Coverage Type</th>
                  <th className="py-4 px-6 font-ui text-sm uppercase tracking-wider text-white/70 border-b border-white/10">Aggregate Limit</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium"><EditableText element="span" contentId="ins_1_type" defaultText="Technology Errors & Omissions (E&O)" isAdmin={isAdmin} value={cmsContent.ins_1_type} documentId="procurement" /></td>
                  <td className="py-4 px-6 font-mono text-[#98cc67]"><EditableText element="span" contentId="ins_1_limit" defaultText="$5,000,000" isAdmin={isAdmin} value={cmsContent.ins_1_limit} documentId="procurement" /></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium"><EditableText element="span" contentId="ins_2_type" defaultText="Cyber Liability & Data Breach" isAdmin={isAdmin} value={cmsContent.ins_2_type} documentId="procurement" /></td>
                  <td className="py-4 px-6 font-mono text-[#98cc67]"><EditableText element="span" contentId="ins_2_limit" defaultText="$5,000,000" isAdmin={isAdmin} value={cmsContent.ins_2_limit} documentId="procurement" /></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium"><EditableText element="span" contentId="ins_3_type" defaultText="Commercial General Liability" isAdmin={isAdmin} value={cmsContent.ins_3_type} documentId="procurement" /></td>
                  <td className="py-4 px-6 font-mono text-[#98cc67]"><EditableText element="span" contentId="ins_3_limit" defaultText="$2,000,000" isAdmin={isAdmin} value={cmsContent.ins_3_limit} documentId="procurement" /></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-medium"><EditableText element="span" contentId="ins_4_type" defaultText="Workers Compensation" isAdmin={isAdmin} value={cmsContent.ins_4_type} documentId="procurement" /></td>
                  <td className="py-4 px-6 font-mono text-[#98cc67]"><EditableText element="span" contentId="ins_4_limit" defaultText="Statutory Limits" isAdmin={isAdmin} value={cmsContent.ins_4_limit} documentId="procurement" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-white/40 italic">
            <EditableText element="span" contentId="insurance_disclaimer" defaultText="*Certificates of Insurance (COI) naming the client as an additional insured can be generated within 24 hours of MSA execution." isAdmin={isAdmin} value={cmsContent.insurance_disclaimer} documentId="procurement" />
          </div>
        </section>

      </div>
    </main>
  );
}
