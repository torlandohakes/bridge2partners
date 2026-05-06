"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, BrainCircuit, ShieldAlert, Zap, Landmark, Handshake, ShieldCheck, FileText, CheckCircle2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GapAnalysisModal from "@/components/GapAnalysisModal";
import ChallengeInputModal from "@/components/ChallengeInputModal";
import StrategyCallModal from "@/components/StrategyCallModal";
import LinkedInFeed from "@/components/LinkedInFeed";
import LoginModal from "@/components/LoginModal";
import EditableText from "@/components/EditableText";
import EditableButtonText from "@/components/EditableButtonText";
import EditableImage from "@/components/EditableImage";
import SiteHeader from "@/components/SiteHeader";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

type ThemeMode = 'dark' | 'medium' | 'light';

const THEMES = {
  dark: {
    globalBg: "bg-[#000d0a]",
    textPrimary: "text-white",
    textSecondary: "text-white/80",
    textMuted: "text-white/50",
    textHighlight: "text-white",
    borderBase: "border-white/10",
    borderStrong: "border-white/20",
    cardBg: "bg-[#009677]/[0.05] shadow-[inset_0_1px_1px_rgba(0,150,119,0.15)]",
    cardHover: "hover:bg-[#009677]/[0.12]",
    heroOverlayBottom: "from-[#001b15]/60 via-[#001b15]/20 to-transparent",
    bgProblem: "bg-transparent",
    bgValueProp: "bg-gradient-to-b from-[#00120e] to-[#001b15]",
    bgGuide: "bg-gradient-to-b from-transparent to-[#00120e]",
    bgPlan: "bg-gradient-to-b from-[#001b15] to-[#00120e]",
    bgTrust: "bg-gradient-to-b from-[#00120e] to-[#000d0a]",
    orb1: "bg-[#009677]/[0.15] mix-blend-screen",
    orb2: "bg-[#00573f]/[0.25] mix-blend-screen",
    orb3: "bg-[#00573f]/[0.15] mix-blend-screen",
    orb4: "bg-[#009677]/[0.12] mix-blend-screen",
    logoOverlay: "opacity-50 grayscale hover:grayscale-0 hover:opacity-100 text-white",
    outlineBtn: "border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold",
    canvasBg: "bg-[#001b15]/70 backdrop-blur-[50px] shadow-[0_-30px_60px_rgba(0,0,0,0.5)]",
    canvasBorder: "border-white/20",
    sectionWrapper: "bg-white/10 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-white/10 shadow-2xl"
  },
  medium: {
    globalBg: "bg-[#00573f]",
    textPrimary: "text-[#001b15]",
    textSecondary: "text-[#001b15]/90",
    textMuted: "text-[#001b15]/70",
    textHighlight: "text-[#001b15]",
    borderBase: "border-white/30",
    borderStrong: "border-white/50",
    cardBg: "bg-white/20 shadow-xl border border-white/30 backdrop-blur-xl",
    cardHover: "hover:bg-white/30",
    heroOverlayBottom: "from-[#00573f]/60 via-[#00573f]/20 to-transparent",
    bgProblem: "bg-transparent",
    bgValueProp: "bg-transparent",
    bgGuide: "bg-transparent",
    bgPlan: "bg-transparent",
    bgTrust: "bg-transparent",
    orb1: "opacity-0",
    orb2: "opacity-0",
    orb3: "opacity-0",
    orb4: "opacity-0",
    logoOverlay: "opacity-60 invert-[0.8] hover:invert-[0] text-white",
    outlineBtn: "border-white/30 bg-white/20 hover:bg-white/40 text-[#001b15] font-bold",
    canvasBg: "bg-white/20 backdrop-blur-[60px] shadow-[0_-30px_60px_rgba(0,0,0,0.5)]",
    canvasBorder: "border-white/40",
    sectionWrapper: "bg-white/20 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-white/40 shadow-[0_20px_60px_rgba(255,255,255,0.05)]"
  },
  light: {
    globalBg: "bg-slate-50",
    textPrimary: "text-[#001b15]",
    textSecondary: "text-[#3d4645]",
    textMuted: "text-[#3d4645]/60",
    textHighlight: "text-[#001b15]",
    borderBase: "border-[#001b15]/10",
    borderStrong: "border-[#001b15]/20",
    cardBg: "bg-white/60 backdrop-blur-md shadow-sm border-[#001b15]/10",
    cardHover: "hover:bg-white",
    heroOverlayBottom: "from-[#009677]/50 via-[#00573f]/30 to-transparent",
    bgProblem: "bg-transparent",
    bgValueProp: "bg-transparent",
    bgGuide: "bg-transparent",
    bgPlan: "bg-transparent",
    bgTrust: "bg-transparent",
    orb1: "opacity-0",
    orb2: "opacity-0",
    orb3: "opacity-0",
    orb4: "opacity-0",
    logoOverlay: "opacity-60 grayscale hover:grayscale-0 hover:opacity-100 text-[#001b15]",
    outlineBtn: "border-[#001b15]/20 bg-transparent hover:bg-[#001b15]/5 text-[#001b15] font-bold",
    canvasBg: "bg-slate-50/50 backdrop-blur-[50px] shadow-[0_-30px_60px_rgba(0,150,119,0.20)]",
    canvasBorder: "border-[#001b15]/20",
    sectionWrapper: "bg-white/60 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-[#001b15]/10 shadow-[0_20px_60px_rgba(0,150,119,0.1)]"
  }
};

const LEADERSHIP_DATA = [
  {
    id: 'cordas',
    name: 'Michael Cordas',
    title: 'Chief Executive Officer',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FMichael%20Cordas%20B2P.png?alt=media&token=a733e89a-1323-409e-b8c6-aef101e34019',
    quote: "Digital transformation isn't about buying software; it is about institutional survival. We architect change that boards can bank on.",
    accolades: ['Former Managing Director, Global Banking', 'Architected $2B+ in M&A transitions'],
    clientFocus: ['Commerce Bank', 'Comerica']
  },
  {
    id: 'caulfield',
    name: '[First Name] Caulfield',
    title: 'Chief Operating Officer',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChris%20Caulfield%20B2P.png?alt=media&token=8cdfa742-4b68-4a90-a5ca-2fdd27bb7028',
    quote: "Execution is where budgets go to die. We embed with your teams to ensure operational continuity from day one to sign-off.",
    accolades: ['Operational Lead on 50+ Core Migrations', 'Specialist in Risk Mitigation'],
    clientFocus: ['Glacier Bank']
  },
  {
    id: 'simon',
    name: 'Kristine Simon',
    title: 'Chief Digital Officer',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FKristine%20Simon%20B2P.png?alt=media&token=9befb2de-3db1-4f95-bc8f-20012d525406',
    quote: "Legacy debt is the anchor slowing down commercial lending. We cut the anchor without sinking the ship.",
    accolades: ['Former Head of Digital, Top 20 Bank', 'Led FIS/Fiserv unified tech stack overhauls'],
    clientFocus: ['Fifth Third', 'Commerce Bank']
  },
  {
    id: 'summers',
    name: 'Christopher Summers',
    title: 'Managing partner',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChristopher%20Summers%20B2P%20Cutout.png?alt=media&token=b1ebc9e8-08a5-4ba8-8e48-7fad149d6ae2',
    quote: "I've audited 40 post-merger integrations. 90% of them failed because they treated it as an IT ticket, not a change management crisis.",
    accolades: ['40+ Post-Merger Integration Audits', 'Enterprise Change Management Specialist'],
    clientFocus: ['First National Bank', 'Banking Consortia']
  }
];

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeLeaderId, setActiveLeaderId] = useState(LEADERSHIP_DATA[0].id);
  const t = THEMES[theme];

  const [promptText, setPromptText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalReport, setModalReport] = useState<string | null>(null);

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAdmin = user !== null;

  // Real-time CMS State
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});

  // Bind Firestore Real-time Sync
  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'home'), (docSnapshot) => {
      if (docSnapshot.exists()) setCmsContent(docSnapshot.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGenerateAnalysis = async (fallbackPrompt?: string) => {
    const finalPrompt = promptText.trim() || fallbackPrompt || "Analyze a generic core system migration risk and produce a strategic action plan.";
    
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
      
      if (data.report) {
         setModalReport(data.report);
      } else {
         setModalReport("Error loading report. Ensure B2P Intelligence connection is configured.");
      }
    } catch (e) {
      setModalReport("Failed to generate report due to a network error.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${t.globalBg} selection:bg-white/80 selection:text-[#001b15] flex flex-col font-sans relative transition-colors duration-500`}>
      <GapAnalysisModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         reportMarkdown={modalReport} 
         isLoading={modalLoading} 
         theme={theme}
      />
      <ChallengeInputModal 
         isOpen={isChallengeModalOpen}
         onClose={() => setIsChallengeModalOpen(false)}
         onSubmit={handleGenerateAnalysis}
         theme={theme}
      />
      <StrategyCallModal 
         isOpen={isStrategyModalOpen}
         onClose={() => setIsStrategyModalOpen(false)}
         theme={theme}
      />
      
      <LoginModal 
         isOpen={showLoginModal}
         onClose={() => setShowLoginModal(false)}
         theme={theme}
      />
      
      {/* Dynamic Scrolling Aurora Canvas (For Light Theme Only) */}
      <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        {/* Core Teal Base */}
        <div className="absolute top-[5%] left-[-20%] w-[90vw] h-[70vw] rounded-[100%] bg-[#009677]/[0.45] blur-[140px] -rotate-12" />
        
        {/* Luminous Lime Flashes */}
        <div className="absolute top-[18%] right-[-25%] w-[70vw] h-[50vw] rounded-[100%] bg-[#98cc67]/[0.35] blur-[140px] rotate-45" />
        <div className="absolute top-[45%] left-[-30%] w-[80vw] h-[60vw] rounded-[100%] bg-[#98cc67]/[0.25] blur-[150px] -rotate-6" />

        {/* Deep B2P Green Rivers */}
        <div className="absolute top-[35%] right-[-30%] w-[90vw] h-[60vw] rounded-[100%] bg-[#00573f]/[0.40] blur-[160px] -rotate-12" />
        <div className="absolute top-[70%] left-[-20%] w-[90vw] h-[70vw] rounded-[100%] bg-[#00573f]/[0.40] blur-[180px] rotate-12" />

        {/* Lower Teal Anchors */}
        <div className="absolute top-[85%] right-[-20%] w-[80vw] h-[70vw] rounded-[100%] bg-[#009677]/[0.45] blur-[150px] -rotate-6" />
      </div>

      {/* Dynamic Scrolling Aurora Canvas (For Medium Theme Only) */}
      <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${theme === 'medium' ? 'opacity-100' : 'opacity-0'}`}>
        {/* Core White Base */}
        <div className="absolute top-[5%] left-[-20%] w-[90vw] h-[70vw] rounded-[100%] bg-white/[0.60] blur-[140px] -rotate-12" />
        
        {/* Teal Flashes */}
        <div className="absolute top-[18%] right-[-25%] w-[70vw] h-[50vw] rounded-[100%] bg-[#009677]/[0.80] blur-[140px] rotate-45" />
        <div className="absolute top-[45%] right-[-30%] w-[80vw] h-[60vw] rounded-[100%] bg-white/[0.50] blur-[150px] -rotate-6" />

        {/* Deep Teal Rivers */}
        <div className="absolute top-[35%] left-[-30%] w-[90vw] h-[60vw] rounded-[100%] bg-[#009677]/[0.90] blur-[160px] -rotate-12" />
        <div className="absolute top-[70%] left-[-20%] w-[90vw] h-[70vw] rounded-[100%] bg-white/[0.55] blur-[180px] rotate-12" />

        {/* Lower White Anchors */}
        <div className="absolute top-[85%] right-[-20%] w-[80vw] h-[70vw] rounded-[100%] bg-[#001b15]/[0.80] blur-[150px] -rotate-6" />
      </div>

      {/* Theme Toggle Widget (Admin Only) */}
      {user && (
        <div className={`fixed bottom-6 right-6 z-[999] flex items-center backdrop-blur-xl p-1.5 rounded-full shadow-2xl transition-colors duration-500 animate-in slide-in-from-bottom-8 ${theme === 'light' ? 'bg-slate-200/50 border border-[#001b15]/10' : 'bg-white/10 border border-white/20'}`}>
          <div className="flex px-1 border-r border-[#001b15]/20 mr-1 pr-2">
             <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${theme === 'dark' ? 'bg-[#001b15] text-white shadow-md' : theme === 'light' ? 'text-[#001b15]/60 hover:text-[#001b15]' : 'text-white/60 hover:text-white'}`}>Dark</button>
             <button onClick={() => setTheme('medium')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${theme === 'medium' ? 'bg-[#00573f] text-white shadow-md' : theme === 'light' ? 'text-[#001b15]/60 hover:text-[#001b15]' : 'text-white/60 hover:text-white'}`}>Med</button>
             <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${theme === 'light' ? 'bg-white text-[#001b15] shadow-sm' : 'text-white/60 hover:text-white'}`}>Light</button>
          </div>
          <button onClick={() => auth && signOut(auth)} className={`px-3 py-2 rounded-full transition-colors flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-black/10`} title="Sign Out">
             <LogOut className={`w-4 h-4 ${theme === 'light' ? 'text-[#001b15]' : 'text-white'}`} />
          </button>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <div 
        className={`relative w-full min-h-[140svh] sm:min-h-[110vh] z-10 transition-all duration-700`}
        style={{ 
          backgroundImage: `url("${cmsContent.hero_bg || 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797'}")`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'top'
        }}
      >
         {isAdmin && (
           <div className="absolute top-8 left-8 z-50 flex items-center">
             <EditableImage 
               contentId="hero_bg" 
               defaultSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2Fbridge2partners-hero-1.webp?alt=media&token=bb05e1e4-8f2d-4a75-8880-ddd7bbfa2797" 
               isAdmin={isAdmin} 
               value={cmsContent.hero_bg} 
               alt="Hero Background" 
               triggerOnly={true}
             />
           </div>
         )}
         {/* Contrast Overlay (Gradient) - Top is unconditionally dark for image/nav contrast */}
         <div className="absolute inset-0 bg-gradient-to-r from-[#001b15]/90 via-[#001b15]/50 to-transparent backdrop-blur-[1px] z-0" />
         <div className={`absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t ${t.heroOverlayBottom} pointer-events-none transition-colors duration-500 z-0`} />

         {/* UI Content Constraint Wrapper */}
         <div className="relative flex flex-col min-h-[140svh] sm:min-h-[100svh] z-10 pb-0">
         
         {/* Global Site Navigation */}
         <div className="absolute top-0 left-0 w-full z-[100]">
           <SiteHeader />
         </div>

         {/* Hero Content Body - Fixed White for Image Legibility */}
         <div className="relative z-10 flex flex-col items-start justify-center min-h-[85svh] sm:min-h-0 sm:flex-1 px-6 md:px-12 w-full max-w-5xl gap-10 sm:gap-6 md:gap-8 mt-8 md:mt-12 text-white pb-12 sm:pb-0">
           <div className="inline-flex items-center bg-[#001b15]/60 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/10 sm:border-transparent px-3 py-1.5 sm:p-0 rounded-full mb-2 sm:mb-4 shadow-lg sm:shadow-none">
             <EditableText element="span" contentId="hero_super" defaultText="FOR BANKING EXECUTIVES FACING DISRUPTION" isAdmin={isAdmin} value={cmsContent.hero_super} className="font-ui text-[9px] sm:text-xs md:text-sm text-[#98cc67] sm:text-[#009677] uppercase tracking-widest font-bold drop-shadow-sm" />
           </div>
           
           <EditableText element="h1" contentId="hero_h1" defaultText={"Bank modernization \\nand M&A integrations"} isAdmin={isAdmin} value={cmsContent.hero_h1} className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] sm:leading-[1.05] tracking-tight normal-case drop-shadow-md" />
           
           <EditableText element="p" contentId="hero_p" defaultText="Derisk your digital transformation. We provide the tactical team of banking experts you need to navigate complex digital integrations without disrupting everyday operations." isAdmin={isAdmin} value={cmsContent.hero_p} className="font-reading text-base sm:text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed" />
           
           <Button variant="default" onClick={() => setIsStrategyModalOpen(true)} className="flex sm:hidden mt-4 bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold w-full rounded-full py-6 text-base shadow-2xl">
              <EditableButtonText contentId="nav_btn_2" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.nav_btn_2} />
           </Button>
         </div>

         {/* Glassmorphic AI Gap Analysis Pill */}
         <div className="relative z-20 w-full px-0 sm:px-6 md:px-12 pb-0 sm:pb-12 md:pb-16 flex flex-col justify-start mt-auto">
             <div className={`w-full flex flex-col gap-5 sm:gap-3 max-w-6xl px-6 py-10 sm:p-0 rounded-t-[2.5rem] sm:rounded-none ${theme === 'light' ? 'bg-white/40' : 'bg-[#001b15]/60'} sm:bg-transparent backdrop-blur-2xl sm:backdrop-blur-none border-t border-white/10 sm:border-none shadow-[0_-10px_40px_rgba(0,0,0,0.3)] sm:shadow-none`}>
                <label className={`font-ui text-sm ${theme === 'light' ? t.textSecondary : 'text-white/80'} font-medium pl-0 sm:pl-6 drop-shadow tracking-wide transition-colors flex flex-col sm:flex-row sm:items-center`}>
                  <span className="block sm:inline leading-relaxed"><EditableText element="span" contentId="gap_analysis_label_pre" defaultText="Change management fails when the gap between strategy and reality is too wide." isAdmin={isAdmin} value={cmsContent.gap_analysis_label_pre} /></span>
                  <span className={`${theme === 'light' ? t.textHighlight : 'text-[#98cc67]'} font-bold mt-1 sm:mt-0 sm:ml-1 block sm:inline`}>
                     <EditableText element="span" contentId="gap_analysis_label_post" defaultText="Run an instant gap analysis." isAdmin={isAdmin} value={cmsContent.gap_analysis_label_post} />
                  </span>
                </label>
                <div className={`relative w-full flex flex-col sm:flex-row items-center ${theme === 'light' ? 'bg-white' : theme === 'medium' ? 'bg-white/25' : 'bg-white/5'} backdrop-blur-[12px] border ${t.borderStrong} rounded-3xl sm:rounded-full shadow-2xl overflow-hidden p-2 group transition-all`}>
                   <div className={`hidden sm:flex w-12 h-12 shrink-0 items-center justify-center ${theme === 'light' ? 'bg-slate-50' : 'bg-white/10'} rounded-full ml-1 backdrop-blur-md border ${t.borderBase} shadow-inner transition-colors`}>
                      <BrainCircuit className="w-5 h-5 text-[#98cc67]" />
                   </div>
                   <input 
                     type="text" 
                     value={promptText || ''}
                     onChange={(e) => setPromptText(e.target.value)}
                     placeholder={cmsContent.gap_analysis_placeholder || 'E.g., "We are migrating to a unified FIS core and need to align our commercial lending teams..."'} 
                     className={`flex-1 w-full bg-transparent border-none outline-none ${theme === 'light' ? t.textPrimary : 'text-white/90'} ${theme === 'light' ? 'placeholder:text-[#001b15]/60' : 'placeholder:text-white/60'} px-4 sm:px-6 py-4 sm:py-3 font-ui text-sm sm:text-base h-full focus:outline-none focus:ring-0 transition-colors`}
                   />
                   <button onClick={() => handleGenerateAnalysis()} className="w-full sm:w-auto h-full sm:min-h-[48px] bg-primary/80 backdrop-blur-[10px] border border-white/20 text-white px-8 py-3 sm:py-0 rounded-2xl sm:rounded-full transition-all font-bold hover:bg-primary/90 hover:scale-[1.02] active:scale-95 ml-0 sm:ml-2 flex items-center justify-center gap-2 whitespace-nowrap">
                     <EditableText element="span" contentId="gap_analysis_btn" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.gap_analysis_btn} />
                     <ArrowRight className="w-4 h-4 flex-shrink-0" />
                   </button>
                </div>
                {isAdmin && (
                  <div className="pl-6 flex items-center gap-2 text-[10px] sm:text-xs text-white/50 bg-black/40 w-fit px-3 py-1 rounded-full border border-white/10">
                    <span className="opacity-70 whitespace-nowrap">Edit Placeholder:</span>
                    <EditableText element="span" contentId="gap_analysis_placeholder" defaultText='E.g., "We are migrating to a unified FIS core and need to align our commercial lending teams..."' isAdmin={isAdmin} value={cmsContent.gap_analysis_placeholder} className="font-mono text-white/80" />
                  </div>
                )}
                <div className={`font-ui text-[10px] sm:text-[11px] ${theme === 'light' ? t.textMuted : 'text-white/60'} pl-0 sm:pl-6 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mt-1 transition-colors`}>
                  <strong className="flex items-center gap-2 uppercase tracking-widest text-[#98cc67] whitespace-nowrap">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#98cc67] shadow-[0_0_8px_rgba(152,204,103,1)] shrink-0"></span>
                     <EditableText element="span" contentId="gap_analysis_footer_strong" defaultText="B2P Intelligence" isAdmin={isAdmin} value={cmsContent.gap_analysis_footer_strong} />
                  </strong>
                  <span className="opacity-80 leading-relaxed pl-[14px] sm:pl-0 block">
                     <EditableText element="span" contentId="gap_analysis_footer_desc" defaultText="Identifies tech risks and operational friction prior to human discovery calls." isAdmin={isAdmin} value={cmsContent.gap_analysis_footer_desc} />
                  </span>
                </div>
             </div>
         </div>

         </div> {/* End 100vh Constraint */}
      </div>

      {/* ================= UNIFIED CONTENT CANVAS OVERLAP ================= */}
      <main className={`relative z-30 -mt-1 sm:-mt-[10vh] sm:rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-0 sm:border-t ${t.canvasBorder} ${t.canvasBg} flex flex-col transition-all duration-700`}>

      {/* ================= PROBLEM & STAKES SECTION ================= */}
      <section className={`lg:min-h-[100svh] flex flex-col justify-center px-6 md:px-12 py-16 lg:py-24 ${t.bgProblem} relative overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb1}`} />
        
        <div className={`max-w-7xl mx-auto w-full relative z-10 lg:overflow-hidden lg:rounded-[4rem]`}>
          {/* Desktop-Only Glass Card Wrapper */}
          <div className={`hidden lg:block absolute inset-0 rounded-[4rem] border pointer-events-none z-0 ${theme === 'light' ? 'bg-white/60 backdrop-blur-2xl border-[#001b15]/10 shadow-[0_20px_60px_rgba(0,150,119,0.1)]' : theme === 'medium' ? 'bg-white/20 backdrop-blur-3xl border-white/40 shadow-[0_20px_60px_rgba(255,255,255,0.05)]' : 'bg-white/10 backdrop-blur-2xl border-white/10 shadow-2xl'}`}></div>
          
          {/* Flat DOM Container: Flex column on mobile, Block on desktop */}
          <div className="max-w-6xl w-full mx-auto flex flex-col lg:block lg:p-16 relative z-10">
            
            {/* 1. Shield & Headline */}
            <div className="order-1 lg:w-[50%] lg:pr-8">
              <ShieldAlert className="relative z-20 w-12 h-12 text-[#98cc67] mb-6" />
              <h2 className={`relative z-20 lg:mix-blend-difference text-white font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight transition-colors`}>
                <EditableText element="span" contentId="problem_h2_top" defaultText="Strategies look flawless on paper." isAdmin={isAdmin} value={cmsContent.problem_h2_top} /> 
                <br/>
                <EditableText element="span" contentId="problem_h2_bot" defaultText="Execution is where budgets bloat." isAdmin={isAdmin} value={cmsContent.problem_h2_bot} className="text-white/80" />
              </h2>
            </div>
            
            {/* 2. Portrait Block & Quote Overlay */}
            <div className={`order-2 relative mt-4 mb-4 w-full h-[450px] sm:h-[500px] lg:mt-0 lg:mb-0 lg:absolute lg:z-0 transition-colors overflow-visible lg:bottom-[-64px] lg:right-0 lg:w-[50%] lg:h-auto lg:top-[-24px]`}>
              {/* Mobile Graphical Treatment */}
              <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#009677]/10 to-transparent rounded-[2rem] border border-[#009677]/20 overflow-hidden shadow-inner">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#98cc67]/20 blur-[80px] rounded-full"></div>
              </div>
              <div className={`absolute inset-0 lg:inset-auto lg:inset-y-0 lg:-right-10 lg:-left-[100%]`}>
                <EditableImage contentId="problem_img" defaultSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChristopher%20Summers%20B2P%20Cutout.png?alt=media&token=b1ebc9e8-08a5-4ba8-8e48-7fad149d6ae2" isAdmin={isAdmin} value={cmsContent.problem_img} alt="Christopher Summers B2P" fill sizes="(max-width: 1024px) 100vw, 50vw" className={`object-contain object-bottom lg:object-right-bottom transition-all duration-500 ${theme === 'light' ? '' : theme === 'medium' ? 'drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)]' : 'drop-shadow-[0_30px_45px_rgba(0,0,0,0.5)]'}`} />
              </div>
              
              {/* Quote Block (Docked inside card on mobile, floating on desktop) */}
              <div className="absolute z-20 bottom-[5px] left-[40px] right-[5px] w-auto max-w-none lg:left-auto lg:bottom-24 lg:right-4 lg:w-[90%] lg:max-w-sm bg-white/60 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-[1.5rem] p-4 lg:p-6 transition-all duration-500 hover:bg-white/80">
                 <EditableText element="p" contentId="problem_quote" defaultText={`"I've audited 40 post-merger integrations. 90% of them failed because they treated it as an IT ticket, not a change management crisis."`} isAdmin={isAdmin} value={cmsContent.problem_quote} className="text-[#001b15] font-reading font-medium italic text-xs md:text-lg leading-relaxed mb-2 md:mb-4" />
                 <div className="text-[#009677] font-ui text-[9px] md:text-base tracking-wide font-bold uppercase">
                   <EditableText element="span" contentId="problem_quote_name" defaultText="– Christopher Summers" isAdmin={isAdmin} value={cmsContent.problem_quote_name} />
                   <br />
                   <EditableText element="span" contentId="problem_quote_title" defaultText="Managing partner" isAdmin={isAdmin} value={cmsContent.problem_quote_title} className="text-[#001b15]/90 font-semibold tracking-normal capitalize" />
                 </div>
              </div>
            </div>

            {/* 4. Body Paragraph */}
            <div className="order-4 mt-8 lg:mt-0 lg:w-[50%] lg:pr-8">
              <EditableText element="p" contentId="problem_p" defaultText="Modernizing massive, interconnected bank ecosystems is overwhelmingly complex. You need practical operators who do the heavy lifting, not just high-level advisors." isAdmin={isAdmin} value={cmsContent.problem_p} className={`relative z-20 font-reading text-lg font-medium lg:font-normal mb-6 leading-relaxed w-full transition-colors text-white lg:mix-blend-difference`} />
            </div>

            {/* 5. Impact Card */}
            <div className="order-5 lg:w-[50%] lg:pr-8">
              <div className={`relative z-20 p-6 backdrop-blur-xl border border-white/5 border-t-white/15 border-l-white/10 shadow-2xl rounded-2xl transition-colors ${theme === 'medium' ? 'bg-[#009677]/80' : 'bg-[#001b15]/80'}`}>
                <EditableText element="p" contentId="problem_red_p" defaultText="And when digital migrations fail or M&A integrations fracture, it puts your institution’s stability and bottom line directly at risk." isAdmin={isAdmin} value={cmsContent.problem_red_p} className={`font-ui text-white/90 font-medium leading-relaxed transition-colors`} />
              </div>
            </div>

            {/* 6. Action Buttons */}
            <div className="order-6 mt-8 lg:mt-8 lg:w-[50%] lg:pr-8">
              <div className="relative z-20 flex flex-col sm:flex-row items-start gap-4">
                 <Button size="lg" onClick={() => setIsStrategyModalOpen(true)} className="bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold w-full sm:w-auto">
                   <EditableButtonText contentId="problem_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.problem_btn_1} />
                 </Button>
                 <Button size="lg" variant="outline" onClick={() => setIsChallengeModalOpen(true)} className={`${t.outlineBtn} bg-black/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none w-full sm:w-auto`}>
                   <EditableButtonText contentId="problem_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.problem_btn_2} />
                 </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= GUIDE & PROOF ================= */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgGuide} relative text-center overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb3}`} />
        {/* Desktop-Only Glass Card Wrapper */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className={`hidden lg:block absolute inset-0 rounded-[4rem] border pointer-events-none z-0 ${theme === 'light' ? 'bg-white/60 backdrop-blur-2xl border-[#001b15]/10 shadow-[0_20px_60px_rgba(0,150,119,0.1)]' : theme === 'medium' ? 'bg-white/20 backdrop-blur-3xl border-white/40 shadow-[0_20px_60px_rgba(255,255,255,0.05)]' : 'bg-white/10 backdrop-blur-2xl border-white/10 shadow-2xl'}`}></div>
          
          <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:block lg:p-16">
            
            {/* 1. Header Block */}
            <div className="order-1 text-left mb-8 lg:mb-16 relative z-10">
              <EditableText element="h2" contentId="guide_h2" defaultText="Your modernization is in safe hands." isAdmin={isAdmin} value={cmsContent.guide_h2} className={`font-display text-3xl md:text-4xl font-bold mb-4 ${t.textPrimary} transition-colors`} />
              <EditableText element="p" contentId="guide_p" defaultText="We combine deep banking experience with modern technology expertise. Because we have the ability to operate across strategy, implementation, and execution, your modernization is always in safe hands." isAdmin={isAdmin} value={cmsContent.guide_p} className={`font-reading text-base ${t.textSecondary} max-w-3xl leading-relaxed transition-colors`} />
            </div>

            {/* Interactive Pedigree UI Container */}
            <div className="order-2 w-full relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 text-left">
              
              {/* Left Column (Selector Menu) */}
              <div className="order-1 lg:order-none lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto snap-x gap-3 lg:gap-4 pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {LEADERSHIP_DATA.map((leader) => {
                  const isActive = activeLeaderId === leader.id;
                  return (
                    <button
                      key={leader.id}
                      onClick={() => setActiveLeaderId(leader.id)}
                      className={`text-center lg:text-left px-5 py-3 lg:p-6 rounded-full lg:rounded-xl border transition-all duration-300 flex-shrink-0 snap-start w-auto lg:w-full ${
                        isActive 
                          ? `${theme === 'light' ? 'bg-[#001b15]/5 border-[#001b15]/20 text-[#001b15]' : 'bg-white/20 border-white/50 shadow-lg text-white'}`
                          : `bg-transparent border-transparent ${theme === 'light' ? 'text-[#001b15]/50 hover:bg-[#001b15]/5 hover:text-[#001b15]' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`
                      }`}
                    >
                      <span className="block font-display text-base lg:text-2xl font-bold mb-0 lg:mb-1 whitespace-nowrap">
                        <EditableText element="span" contentId={`selector_menu_${leader.id}_name`} defaultText={leader.name} isAdmin={isAdmin} value={cmsContent[`selector_menu_${leader.id}_name`]} />
                      </span>
                      <span className={`hidden lg:block font-ui text-xs tracking-widest uppercase font-semibold ${isActive ? '' : 'opacity-70'}`}>
                        <EditableText element="span" contentId={`selector_menu_${leader.id}_title`} defaultText={leader.title} isAdmin={isAdmin} value={cmsContent[`selector_menu_${leader.id}_title`]} />
                      </span>
                    </button>
                  );
                })}
                
                {/* Desktop Action Button */}
                <Link href="/people" className="hidden lg:block mt-4">
                  <Button size="lg" variant="outline" className={`w-full ${t.outlineBtn} py-6 text-lg hover:scale-[1.02] transition-all`}>
                    <EditableButtonText contentId="meet_team_btn" defaultText="Meet Our Full Team" isAdmin={isAdmin} value={cmsContent.meet_team_btn} />
                  </Button>
                </Link>
              </div>

              {/* Right Column (Dynamic Pedigree Panel) */}
              <div className="order-2 lg:order-none lg:col-span-8">
                {(() => {
                  const activeLeader = LEADERSHIP_DATA.find(l => l.id === activeLeaderId) || LEADERSHIP_DATA[0];
                  return (
                    <div className={`backdrop-blur-3xl border rounded-3xl lg:rounded-2xl overflow-hidden relative min-h-[550px] lg:min-h-[500px] p-6 pt-0 lg:p-10 flex flex-col justify-end lg:justify-center transition-colors duration-500 ${theme === 'light' ? 'bg-gradient-to-t from-[#009677]/5 to-transparent lg:bg-none lg:bg-[#001b15]/5 border-[#001b15]/20 shadow-xl lg:shadow-none' : 'bg-gradient-to-t from-[#009677]/15 to-transparent lg:bg-none lg:bg-white/10 border-[#009677]/30 lg:border-white/30 shadow-inner lg:shadow-none'}`}>
                      
                      {/* Decorative Glowing Orb */}
                      <div className="lg:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#98cc67]/15 blur-[80px] rounded-full pointer-events-none"></div>

                      {/* Mobile Background Image (Top fading down) */}
                      <div 
                        className="lg:hidden absolute top-0 inset-x-0 h-[350px] w-full z-0 pointer-events-none transition-all duration-500"
                        style={{
                          backgroundImage: `url("${activeLeader.imageUrl}")`,
                          backgroundPosition: 'top center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                        }}
                      ></div>

                      {/* Desktop Background Image (Right fading left) */}
                      <div 
                        className="hidden lg:block absolute inset-y-0 right-0 w-[80%] z-0 pointer-events-none transition-all duration-500"
                        style={{
                          backgroundImage: `url("${activeLeader.imageUrl}")`,
                          backgroundPosition: 'bottom right',
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
                          maskImage: 'linear-gradient(to right, transparent 0%, black 60%)'
                        }}
                      ></div>

                      {/* Content Overlay */}
                      <div className="relative z-10 w-full lg:w-3/5 mt-[280px] lg:mt-0">
                        {/* Mobile Title Injection (Since it's hidden from pill) */}
                        <div className="lg:hidden mb-2 text-center">
                          <span className={`font-ui text-sm tracking-widest uppercase font-bold ${theme === 'light' ? 'text-[#009677]' : 'text-[#98cc67]'}`}>
                            <EditableText element="span" contentId={`leader_roster_${activeLeader.id}_title_mobile`} defaultText={activeLeader.title} isAdmin={isAdmin} value={cmsContent[`selector_menu_${activeLeader.id}_title`]} />
                          </span>
                        </div>

                        <p className={`text-xl text-center lg:text-left lg:text-3xl font-light italic leading-tight mb-6 pb-6 border-b ${theme === 'light' ? 'border-[#001b15]/10 text-[#001b15]' : 'border-white/20 text-white'}`}>
                          "<EditableText element="span" contentId={`leader_roster_${activeLeader.id}_quote`} defaultText={activeLeader.quote} isAdmin={isAdmin} value={cmsContent[`leader_roster_${activeLeader.id}_quote`]} />"
                        </p>
                        
                        <div className="mb-0">
                          <ul className="space-y-3 lg:space-y-4">
                            {activeLeader.accolades.map((accolade, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className={`w-5 h-5 lg:w-6 lg:h-6 mr-3 mt-0.5 lg:mt-1 flex-shrink-0 ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'}`} />
                                <span className={`font-ui font-medium text-base lg:text-lg ${theme === 'light' ? 'text-[#001b15]/90' : 'text-white/90'}`}>
                                  <EditableText element="span" contentId={`leader_roster_${activeLeader.id}_accolade_${i}`} defaultText={accolade} isAdmin={isAdmin} value={cmsContent[`leader_roster_${activeLeader.id}_accolade_${i}`]} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

              {/* Mobile Action Button */}
              <div className="order-3 lg:hidden mt-4">
                <Link href="/people">
                  <Button size="lg" variant="outline" className={`w-full ${t.outlineBtn} py-6 text-lg hover:scale-[1.02] transition-all`}>
                    <EditableButtonText contentId="meet_team_btn" defaultText="Meet Our Full Team" isAdmin={isAdmin} value={cmsContent.meet_team_btn} />
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE PROP (BENTO BOX) ================= */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgValueProp} relative overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb2}`} />
        
        {/* Desktop-Only Glass Card Wrapper */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className={`hidden lg:block absolute inset-0 rounded-[4rem] border pointer-events-none z-0 ${theme === 'light' ? 'bg-white/60 backdrop-blur-2xl border-[#001b15]/10 shadow-[0_20px_60px_rgba(0,150,119,0.1)]' : theme === 'medium' ? 'bg-white/20 backdrop-blur-3xl border-white/40 shadow-[0_20px_60px_rgba(255,255,255,0.05)]' : 'bg-white/10 backdrop-blur-2xl border-white/10 shadow-2xl'}`}></div>
          
          <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col lg:block lg:p-16">
            <div className="mb-8 lg:mb-16">
              <EditableText element="h2" contentId="value_h2" defaultText="Unifying disparate systems." isAdmin={isAdmin} value={cmsContent.value_h2} className={`font-display text-3xl md:text-4xl font-bold mb-4 ${t.textPrimary} transition-colors`} />
              <EditableText element="p" contentId="value_p" defaultText="Executing change management across your core banking infrastructure." isAdmin={isAdmin} value={cmsContent.value_p} className={`font-reading text-base ${t.textMuted} transition-colors`} />
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {[
                { cta: "Explore Wealth Management", link: "/services/wealth", eyebrow: "Led by John Gustav, CFA", avatar: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FJohn%20Gustav.png?alt=media&token=34dcdf7d-49b5-45a3-bc50-85a7ae83b798", icon: <Landmark className={`w-8 h-8 ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'} mb-2`} />, title: "Wealth", desc: "Align technology with business goals to accelerate platform modernization." },
                { cta: "Explore Commercial Lending", link: "/services/commercial-lending", eyebrow: "Led by Shane Williams", avatar: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(78).png?alt=media&token=51dedfc2-9786-4d4a-a9cf-cfaf389fe979", icon: <Handshake className={`w-8 h-8 ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'} mb-2`} />, title: "Commercial", desc: "Streamline commercial lending workflows and modernize infrastructure." },
                { cta: "Explore M&A Integration", link: "/services/ma-integration", eyebrow: "Led by Bob Holohan", avatar: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBob%20Holohan.png?alt=media&token=21c70eb2-4e77-46f6-8fd4-b2878eb15a7e", icon: <Zap className={`w-8 h-8 ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'} mb-2`} />, title: "M&A", desc: "Execute derisked, post-merger technology integrations." },
                { cta: "Explore Treasury Operations", link: "/services/treasury", eyebrow: "Led by Linda Weber", avatar: "https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FUntitled%20(76).png?alt=media&token=292094e1-53b4-43ee-94cf-841c3a139fe7", icon: <ShieldCheck className={`w-8 h-8 ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'} mb-2`} />, title: "Treasury", desc: "Modernize payments and treasury operations for immediate ROI." }
              ].map((item, idx) => (
                 <Card key={idx} className={`relative flex flex-col bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-xl p-6 sm:p-8 min-h-[420px] sm:min-h-[450px] transition-colors duration-300 hover:bg-white/30 group overflow-hidden`}>
                   
                   {/* Operator Cutout */}
                   <div className="absolute top-5 bottom-0 -right-24 sm:-right-5 z-0 pointer-events-none opacity-100 flex items-end justify-end w-[120%] sm:w-[90%]">
                     <EditableImage contentId={`value_card_${idx}_cutout`} defaultSrc={item.avatar} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_cutout`]} alt="Operator Portrait" fill sizes="(max-width: 768px) 400px, 400px" className="object-contain object-right-bottom drop-shadow-2xl" />
                   </div>

                   {/* Mobile Text Legibility Overlay (Radial Mask) */}
                   <div 
                     className="lg:hidden absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-xl"
                     style={{
                       background: 'radial-gradient(ellipse at 80% 35%, transparent 10%, rgba(0, 27, 21, 0.6) 60%, rgba(0, 27, 21, 0.95) 100%)'
                     }}
                   ></div>

                   {/* Top Left Icon */}
                   <div className="mb-auto z-20 relative pointer-events-auto">
                     {item.icon}
                   </div>

                   <div className="flex flex-col flex-1 pointer-events-none pr-[48px] lg:pr-2 w-full max-w-[75%] sm:max-w-[60%] lg:max-w-[55%] xl:max-w-[50%] z-20 relative justify-end pt-8">
                     <div className="pointer-events-auto">
                       {/* Operator Eyebrow (Editorial Stacked Layout) */}
                       <div className="mb-4">
                         <EditableText 
                           element="span" 
                           contentId={`value_card_${idx}_eyebrow_prefix`} 
                           defaultText="LED BY" 
                           isAdmin={isAdmin} 
                           value={cmsContent[`value_card_${idx}_eyebrow_prefix`]} 
                           className={`block text-[10px] tracking-widest uppercase font-bold ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'} mb-1.5`} 
                         />
                         <EditableText 
                           element="span" 
                           contentId={`value_card_${idx}_eyebrow_name`} 
                           defaultText={item.eyebrow.replace(/^Led by\s+/i, '')} 
                           isAdmin={isAdmin} 
                           value={cmsContent[`value_card_${idx}_eyebrow_name`] || (cmsContent[`value_card_${idx}_eyebrow`] ? cmsContent[`value_card_${idx}_eyebrow`].replace(/^Led by\s+/i, '') : undefined)} 
                           className={`block text-xs leading-snug uppercase font-bold ${theme === 'dark' ? 'text-white/90 drop-shadow-md' : 'text-[#001b15]/90'} pr-4`} 
                         />
                       </div>

                       <CardTitle className={`font-display text-2xl sm:text-3xl font-bold ${t.textPrimary} transition-colors mb-4 drop-shadow-sm`}>
                         <EditableText element="span" contentId={`value_card_${idx}_title`} defaultText={item.title} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_title`]} />
                       </CardTitle>
                     </div>
                     
                     <CardContent className="p-0 pointer-events-auto mb-8">
                       <EditableText element="p" contentId={`value_card_${idx}_desc`} defaultText={item.desc} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_desc`]} className={`text-xs sm:text-sm ${t.textSecondary} font-reading leading-relaxed transition-colors drop-shadow-md pr-2`} />
                     </CardContent>
                   </div>
                   
                   <a href={item.link} className={`mt-auto self-start inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold ${theme === 'dark' ? 'bg-black/40 text-[#98cc67] hover:bg-black/60 border border-[#98cc67]/30' : 'bg-[#00573f]/10 text-[#00573f] hover:bg-[#00573f]/20 border border-[#00573f]/20'} backdrop-blur-md transition-all group w-fit pointer-events-auto relative z-20`}>
                     <EditableText element="span" contentId={`value_card_${idx}_cta`} defaultText={item.cta} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_cta`]} />
                     <span className="ml-2 transform transition-transform group-hover:translate-x-1">&rarr;</span>
                   </a>
                 </Card>
              ))}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => setIsStrategyModalOpen(true)} className="bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold px-8">
                <EditableButtonText contentId="value_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.value_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsChallengeModalOpen(true)} className={`${t.outlineBtn} px-8`}>
                <EditableButtonText contentId="value_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.value_btn_2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE PLAN ================= */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgPlan} relative overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb4}`} />
        <div className={`max-w-7xl mx-auto w-full ${t.sectionWrapper} relative z-10`}>
          <div className="max-w-6xl w-full mx-auto relative z-10">
            <div className="text-center mb-20">
              <EditableText element="h2" contentId="plan_h2" defaultText="Three simple steps to derisk your transformation." isAdmin={isAdmin} value={cmsContent.plan_h2} className={`font-display text-4xl md:text-5xl font-bold mb-4 ${t.textPrimary} transition-colors`} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Removed continuous connecting line to prevent overlapping with glass circles */}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>1</div>
                <EditableText element="h3" contentId="plan_step_1_h3" defaultText="Assess your infrastructure." isAdmin={isAdmin} value={cmsContent.plan_step_1_h3} className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`} />
                <EditableText element="p" contentId="plan_step_1_p" defaultText="Using our AI-Powered Gap Analysis tool." isAdmin={isAdmin} value={cmsContent.plan_step_1_p} className={`${t.textSecondary} font-reading leading-relaxed transition-colors`} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Geometrically mapped connecting lines that span exactly between circle boundaries */}
                <div className={`hidden md:block absolute top-12 right-[calc(50%+3rem)] w-[calc(100%-3rem)] h-[2px] ${theme === 'light' ? 'bg-[#001b15]/10' : 'bg-white/10'} -z-10 transition-colors`}></div>
                <div className={`hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-[2px] ${theme === 'light' ? 'bg-[#001b15]/10' : 'bg-white/10'} -z-10 transition-colors`}></div>
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>2</div>
                <EditableText element="h3" contentId="plan_step_2_h3" defaultText="Schedule a Strategy Call." isAdmin={isAdmin} value={cmsContent.plan_step_2_h3} className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`} />
                <EditableText element="p" contentId="plan_step_2_p" defaultText="To map a phased integration strategy." isAdmin={isAdmin} value={cmsContent.plan_step_2_p} className={`${t.textSecondary} font-reading leading-relaxed transition-colors`} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>3</div>
                <EditableText element="h3" contentId="plan_step_3_h3" defaultText="Execute the change." isAdmin={isAdmin} value={cmsContent.plan_step_3_h3} className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`} />
                <EditableText element="p" contentId="plan_step_3_p" defaultText="We embed with your team to deliver the outcomes." isAdmin={isAdmin} value={cmsContent.plan_step_3_p} className={`${t.textSecondary} font-reading leading-relaxed transition-colors`} />
              </div>
            </div>

            <div className="mt-20 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => setIsStrategyModalOpen(true)} className="bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold px-10 py-6 text-lg hover:scale-105 transition-all">
                <EditableButtonText contentId="plan_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.plan_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsChallengeModalOpen(true)} className={`${t.outlineBtn} px-10 py-6 text-lg`}>
                <EditableButtonText contentId="plan_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.plan_btn_2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST CENTER (PROCUREMENT) & FOOTER CTA ================= */}
      <section className={`relative z-10 px-6 md:px-12 py-24 md:py-32 flex flex-col justify-center transition-colors duration-500 ${t.bgTrust}`}>
        <div className="max-w-6xl w-full mx-auto relative z-10">
          
          <div className="flex items-center gap-4 mb-8">
            <FileText className="w-10 h-10 text-[#98cc67]" />
            <div>
              <EditableText element="h2" contentId="trust_h2_procurement" defaultText="Procurement" isAdmin={isAdmin} value={cmsContent.trust_h2_procurement} className={`font-display text-3xl font-bold ${t.textPrimary} transition-colors`} />
              <EditableText element="p" contentId="trust_p" defaultText="Fast, frictionless vendor onboarding." isAdmin={isAdmin} value={cmsContent.trust_p} className={`${t.textSecondary} transition-colors`} />
            </div>
          </div>
          
          <div className={`bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 p-2 shadow-2xl transition-colors duration-500`}>
            {[
              { id: 'procurement_doc_1', text: 'Legal Entity Overview', hash: 'legal-entity-overview' },
              { id: 'procurement_doc_2', text: 'Technology Stack', hash: 'technology-stack' },
              { id: 'procurement_doc_4', text: 'Compliance Standards', hash: 'compliance-standards' },
              { id: 'procurement_doc_5', text: 'Data Security Approach', hash: 'data-security-approach' },
              { id: 'procurement_doc_3', text: 'Insurance Overview', hash: 'insurance-overview' }
            ].map((doc, i) => (
              <Link href={`/procurement#${doc.hash}`} key={i} className={`flex items-center justify-between p-6 ${theme === 'light' ? 'hover:bg-slate-50 border-b border-slate-100' : 'hover:bg-white/5 border-b border-white/5'} last:border-0 cursor-pointer group transition-colors block w-full`}>
                <EditableText 
                  element="span" 
                  contentId={doc.id} 
                  defaultText={doc.text} 
                  isAdmin={isAdmin} 
                  value={cmsContent[doc.id as keyof typeof cmsContent]} 
                  className={`font-ui font-medium text-lg lg:text-xl ${t.textSecondary} group-hover:${t.textHighlight} transition-colors`} 
                />
                <ArrowRight className={`w-5 h-5 ${t.textMuted} group-hover:text-[#98cc67] transition-colors`} />
              </Link>
            ))}
          </div>

        </div>

        {/* FINAL CTA & DYNAMIC FOOTER */}
        <footer className={`pt-24 pb-12 px-6 md:px-12 mt-auto bg-transparent`}>
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-24">
            <EditableText element="h2" contentId="footer_cta_h2" defaultText="Ready to stop planning and start executing?" isAdmin={isAdmin} value={cmsContent.footer_cta_h2} className={`font-display text-5xl md:text-6xl font-bold mb-8 ${t.textPrimary} transition-colors`} />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setIsStrategyModalOpen(true)} className="bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold px-8">
                <EditableButtonText contentId="footer_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.footer_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsChallengeModalOpen(true)} className={`bg-white text-[#001b15] hover:bg-white/90 font-bold ${theme === 'light' ? 'border border-[#001b15]/10' : 'border-none'}`}>
                <EditableButtonText contentId="footer_btn_2" defaultText="Generate a Gap Analysis" isAdmin={isAdmin} value={cmsContent.footer_btn_2} />
              </Button>
            </div>
          </div>

          <div className={`max-w-6xl mx-auto border-t ${t.borderBase} pt-12 transition-colors`}>
            {/* LinkedIn integration hidden temporarily for performance */}
            {/* <h3 className={`font-ui text-sm ${t.textMuted} uppercase tracking-widest mb-6 font-bold transition-colors`}>Market Momentum</h3>
            <LinkedInFeed theme={theme} /> */}
            <div className={`mt-16 flex flex-col md:flex-row items-center justify-between text-xs ${t.textMuted} font-ui transition-colors`}>
              <span>© 2026 Bridge2Partners. All rights reserved.</span>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/people" className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>People</Link>
                <Link href="/careers" className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Careers</Link>
                <Link href="/privacy" className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Privacy Policy</Link>
                <Link href="/terms" className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Terms of Service</Link>
                {!user && <span onClick={() => setShowLoginModal(true)} className={`hover:${t.textHighlight} cursor-pointer transition-colors opacity-50 hover:opacity-100`}>Admin Login</span>}
              </div>
            </div>
          </div>
        </footer>
      </section>

      </main>

    </div>
  );
}
