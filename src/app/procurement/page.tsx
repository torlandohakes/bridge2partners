"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { ShieldCheck, FileText, Lock, Server, Activity, ShieldAlert } from "lucide-react";

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
        title={<EditableText element="span" contentId="procurement_hero_title" defaultText="Procurement" isAdmin={isAdmin} value={cmsContent.procurement_hero_title} documentId="procurement" />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Fast, frictionless vendor onboarding. Access all required legal and compliance documents below." isAdmin={isAdmin} value={cmsContent.hero_subtitle} documentId="procurement" />}
        theme="dark" 
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FDOM_alpha.png?alt=media&token=47717353-59db-4f9f-b8a6-4dd70e6520be"
        imageAlt="Dominick Grillas, Chief Administrative Officer"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Dominick Grillas" isAdmin={isAdmin} value={cmsContent.hero_caption_name} documentId="procurement" />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Chief Administrative Officer" isAdmin={isAdmin} value={cmsContent.hero_caption_title} documentId="procurement" />}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-xl">
               <ShieldCheck className="w-8 h-8 text-[#98cc67] shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-white mb-2"><EditableText element="span" contentId="comp_1_title" defaultText="SOC 2 Type II Audited" isAdmin={isAdmin} value={cmsContent.comp_1_title} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm leading-relaxed"><EditableText element="span" contentId="comp_1_desc" defaultText="Bridge2Partners maintains an active SOC 2 Type II report, validating the operational effectiveness of our security, availability, and confidentiality controls over an extended audit period." isAdmin={isAdmin} value={cmsContent.comp_1_desc} documentId="procurement" /></p>
               </div>
             </div>
             <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-xl">
               <Lock className="w-8 h-8 text-[#98cc67] shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-white mb-2"><EditableText element="span" contentId="comp_2_title" defaultText="ISO 27001 Aligned" isAdmin={isAdmin} value={cmsContent.comp_2_title} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm leading-relaxed"><EditableText element="span" contentId="comp_2_desc" defaultText="Our Information Security Management System (ISMS) is deeply aligned with ISO 27001 frameworks, ensuring systematic risk management and continuous improvement of security protocols." isAdmin={isAdmin} value={cmsContent.comp_2_desc} documentId="procurement" /></p>
               </div>
             </div>
             <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-xl">
               <FileText className="w-8 h-8 text-[#98cc67] shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-white mb-2"><EditableText element="span" contentId="comp_3_title" defaultText="GLBA & Privacy Standards" isAdmin={isAdmin} value={cmsContent.comp_3_title} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm leading-relaxed"><EditableText element="span" contentId="comp_3_desc" defaultText="We strictly enforce the Gramm-Leach-Bliley Act (GLBA) Safeguards Rule, maintaining robust administrative, technical, and physical safeguards for all non-public personal information (NPI)." isAdmin={isAdmin} value={cmsContent.comp_3_desc} documentId="procurement" /></p>
               </div>
             </div>
             <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-6 rounded-xl">
               <ShieldAlert className="w-8 h-8 text-[#98cc67] shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-white mb-2"><EditableText element="span" contentId="comp_4_title" defaultText="Annual Third-Party Pentests" isAdmin={isAdmin} value={cmsContent.comp_4_title} documentId="procurement" /></h4>
                 <p className="text-white/60 text-sm leading-relaxed"><EditableText element="span" contentId="comp_4_desc" defaultText="Our infrastructure and external-facing applications undergo rigorous annual penetration testing by independent CREST-certified security researchers to preemptively identify vulnerabilities." isAdmin={isAdmin} value={cmsContent.comp_4_desc} documentId="procurement" /></p>
               </div>
             </div>
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
          <div className="space-y-6">
             <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col md:flex-row gap-6 items-start">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <Server className="w-8 h-8 text-[#98cc67]" />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="sec_1_h4" defaultText="Encryption Standards & Key Management" isAdmin={isAdmin} value={cmsContent.sec_1_h4} documentId="procurement" /></h4>
                 <div className="text-white/70 text-[15px] leading-relaxed space-y-4">
                   <p><EditableText element="span" contentId="sec_1_p1" defaultText="Bridge2Partners mandates cryptographic protection for all sensitive data assets, adhering strictly to FIPS 140-2 validated cryptographic modules. All client-provided data is encrypted at rest using the Advanced Encryption Standard (AES) with 256-bit keys, ensuring military-grade protection against unauthorized physical or logical access. In transit, data is secured using Transport Layer Security (TLS) version 1.2 or 1.3 across all network boundaries, preventing interception during API payload transmissions and inter-service communications." isAdmin={isAdmin} value={cmsContent.sec_1_p1} documentId="procurement" /></p>
                   <p><EditableText element="span" contentId="sec_1_p2" defaultText="We utilize centralized, cloud-native key management services (such as AWS KMS or Google Cloud KMS) to separate encrypted data from the keys required to unlock it. This architecture guarantees that no single engineer or system compromise can result in data exposure. Furthermore, cryptographic keys undergo automated rotation every 90 days, and all key access requests are logged immutably for forensic auditing." isAdmin={isAdmin} value={cmsContent.sec_1_p2} documentId="procurement" /></p>
                 </div>
               </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col md:flex-row gap-6 items-start">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <Lock className="w-8 h-8 text-[#98cc67]" />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="sec_2_h4" defaultText="Endpoint Security & Zero Trust Architecture" isAdmin={isAdmin} value={cmsContent.sec_2_h4} documentId="procurement" /></h4>
                 <div className="text-white/70 text-[15px] leading-relaxed space-y-4">
                   <p><EditableText element="span" contentId="sec_2_p1" defaultText="Our internal network architecture operates on a Zero Trust model, meaning no device, user, or application is inherently trusted based on its network location. All B2P operator endpoints—including laptops and mobile devices—are centrally managed via enterprise Mobile Device Management (MDM) solutions. This allows our security operations center to enforce disk encryption, push mandatory OS patching, and remotely wipe compromised or lost devices instantly." isAdmin={isAdmin} value={cmsContent.sec_2_p1} documentId="procurement" /></p>
                   <p><EditableText element="span" contentId="sec_2_p2" defaultText="To combat sophisticated malware and ransomware threats, every endpoint is equipped with next-generation Endpoint Detection and Response (EDR) software, such as CrowdStrike Falcon. These agents continuously monitor behavioral anomalies and execute automated threat isolation if malicious activity is detected. Access to production systems and client data environments strictly requires multi-factor authentication (MFA) via hardware security keys, mitigating the risk of credential stuffing and phishing attacks." isAdmin={isAdmin} value={cmsContent.sec_2_p2} documentId="procurement" /></p>
                 </div>
               </div>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-xl flex flex-col md:flex-row gap-6 items-start">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                 <Activity className="w-8 h-8 text-[#98cc67]" />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-white mb-3"><EditableText element="span" contentId="sec_3_h4" defaultText="Incident Response & Business Continuity" isAdmin={isAdmin} value={cmsContent.sec_3_h4} documentId="procurement" /></h4>
                 <div className="text-white/70 text-[15px] leading-relaxed space-y-4">
                   <p><EditableText element="span" contentId="sec_3_p1" defaultText="In the event of a security anomaly, Bridge2Partners executes a formalized Incident Response Plan (IRP) aligned with NIST framework guidelines. This playbook ensures immediate triage, containment, and eradication of threats while establishing strict SLA-driven communication protocols for notifying affected clients and regulatory bodies. Our security teams conduct tabletop exercises annually to stress-test these protocols against simulated zero-day attacks and data exfiltration scenarios." isAdmin={isAdmin} value={cmsContent.sec_3_p1} documentId="procurement" /></p>
                   <p><EditableText element="span" contentId="sec_3_p2" defaultText="From an availability perspective, our Business Continuity Plan (BCP) leverages active-active multi-region cloud deployments. This ensures that critical consulting infrastructure and data rooms remain accessible even during regional outages. We continuously backup critical configuration states and execute disaster recovery (DR) failover tests to guarantee our operational resilience exceeds the demands of our financial services partners." isAdmin={isAdmin} value={cmsContent.sec_3_p2} documentId="procurement" /></p>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* 5. Insurance Overview */}
        <section id="insurance-overview" className="scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-6 text-[#98cc67] border-b border-white/10 pb-4">
            <EditableText element="span" contentId="insurance-overview_h2" defaultText="Insurance Overview" isAdmin={isAdmin} value={cmsContent["insurance-overview_h2"]} documentId="procurement" />
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="mb-8 font-sans text-lg text-white/70 leading-relaxed">
              <EditableText element="p" contentId="insurance-overview_p" defaultText="Bridge2Partners maintains a comprehensive suite of high-limit corporate insurance policies designed to satisfy the rigorous risk management requirements of Tier-1 commercial banking entities. Our coverage is underwritten by A-rated carriers to ensure full protection across our service delivery spectrum." isAdmin={isAdmin} value={cmsContent["insurance-overview_p"]} documentId="procurement" />
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-bold text-white mb-4">Active Coverage Types</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 text-white/80 bg-[#001b15] px-4 py-3 rounded-lg border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]"></div>
                  <EditableText element="span" contentId="ins_1_type" defaultText="Technology Errors & Omissions (E&O)" isAdmin={isAdmin} value={cmsContent.ins_1_type} documentId="procurement" />
                </li>
                <li className="flex items-center gap-3 text-white/80 bg-[#001b15] px-4 py-3 rounded-lg border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]"></div>
                  <EditableText element="span" contentId="ins_2_type" defaultText="Cyber Liability & Data Breach" isAdmin={isAdmin} value={cmsContent.ins_2_type} documentId="procurement" />
                </li>
                <li className="flex items-center gap-3 text-white/80 bg-[#001b15] px-4 py-3 rounded-lg border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]"></div>
                  <EditableText element="span" contentId="ins_3_type" defaultText="Commercial General Liability" isAdmin={isAdmin} value={cmsContent.ins_3_type} documentId="procurement" />
                </li>
                <li className="flex items-center gap-3 text-white/80 bg-[#001b15] px-4 py-3 rounded-lg border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#98cc67]"></div>
                  <EditableText element="span" contentId="ins_4_type" defaultText="Workers Compensation" isAdmin={isAdmin} value={cmsContent.ins_4_type} documentId="procurement" />
                </li>
              </ul>
            </div>

            <div className="p-4 bg-[#001b15] border border-[#98cc67]/30 rounded-lg text-sm text-white/70 italic flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#98cc67] shrink-0 mt-0.5" />
              <p>
                <EditableText element="span" contentId="insurance_disclaimer" defaultText="Certificates of Insurance (COI) detailing aggregate limits and naming the client as an additional insured can be generated within 24 hours of MSA or NDA execution." isAdmin={isAdmin} value={cmsContent.insurance_disclaimer} documentId="procurement" />
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
