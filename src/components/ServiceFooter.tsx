"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EditableText from "@/components/EditableText";
import EditableButtonText from "@/components/EditableButtonText";
import StrategyCallModal from "@/components/StrategyCallModal";
import ChallengeInputModal from "@/components/ChallengeInputModal";
import GapAnalysisModal from "@/components/GapAnalysisModal";
import LinkedInFeed from "@/components/LinkedInFeed";

interface ServiceFooterProps {
  isAdmin: boolean;
  cmsContent: Record<string, string>;
  documentId: string;
  tag?: string;
}

export default function ServiceFooter({ isAdmin, cmsContent, documentId, tag }: ServiceFooterProps) {
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalReport, setModalReport] = useState<string | null>(null);

  const handleGenerateAnalysis = async (fallbackPrompt?: string) => {
    const finalPrompt = fallbackPrompt || "Analyze a generic core system migration risk and produce a strategic action plan.";
    setIsModalOpen(true);
    setModalLoading(true);
    setModalReport(null);
    try {
      const response = await fetch('/api/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt })
      });
      const data = await response.json();
      if (data.report) setModalReport(data.report);
      else setModalReport("Error loading report. Ensure B2P Intelligence connection is configured.");
    } catch (e) {
      setModalReport("Failed to generate report due to a network error.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <GapAnalysisModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         reportMarkdown={modalReport} 
         isLoading={modalLoading} 
         theme="dark"
      />
      <ChallengeInputModal 
         isOpen={isChallengeModalOpen}
         onClose={() => setIsChallengeModalOpen(false)}
         onSubmit={handleGenerateAnalysis}
         theme="dark"
      />
      <StrategyCallModal 
         isOpen={isStrategyModalOpen}
         onClose={() => setIsStrategyModalOpen(false)}
         theme="dark"
      />

      <footer className="pt-24 pb-12 px-6 md:px-12 mt-auto bg-transparent relative z-10 w-full">
        {/* FINAL CTA */}
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-24">
          <EditableText element="h2" contentId="footer_cta_h2" defaultText="Ready to stop planning and start executing?" isAdmin={isAdmin} documentId={documentId} value={cmsContent.footer_cta_h2} className="font-display text-4xl md:text-5xl font-bold mb-8 text-white" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => setIsStrategyModalOpen(true)} className="bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold px-8">
              <EditableButtonText contentId="footer_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} documentId={documentId} value={cmsContent.footer_btn_1} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsChallengeModalOpen(true)} className="bg-white/5 text-white hover:bg-white/10 font-bold border-white/20 hover:text-white px-8">
              <EditableButtonText contentId="footer_btn_2" defaultText="Generate a Gap Analysis" isAdmin={isAdmin} documentId={documentId} value={cmsContent.footer_btn_2} />
            </Button>
          </div>
        </div>

        {/* DYNAMIC FOOTER LINKS */}
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-12">
          {tag && (
             <div className="mb-16">
               <h3 className="font-ui text-sm text-white/50 uppercase tracking-widest mb-6 font-bold">Market Momentum</h3>
               <LinkedInFeed theme="dark" tag={tag} />
             </div>
          )}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 font-ui">
            <span>© 2026 Bridge2Partners. All rights reserved.</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/team" className="hover:text-white transition-colors">Team</Link>
              <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
