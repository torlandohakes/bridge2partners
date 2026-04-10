"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, BrainCircuit, ShieldAlert, Zap, Landmark, Handshake, ShieldCheck, FileText, CheckCircle2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GapAnalysisModal from "@/components/GapAnalysisModal";
import LoginModal from "@/components/LoginModal";
import EditableText from "@/components/EditableText";
import EditableButtonText from "@/components/EditableButtonText";
import EditableImage from "@/components/EditableImage";
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
    bgValueProp: "bg-gradient-to-b from-transparent to-[#00120e]",
    bgGuide: "bg-gradient-to-b from-[#00120e] to-[#001b15]",
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
    textPrimary: "text-white",
    textSecondary: "text-white/80",
    textMuted: "text-white/50",
    textHighlight: "text-[#98cc67]",
    borderBase: "border-white/10",
    borderStrong: "border-white/25",
    cardBg: "bg-white/5 shadow-md backdrop-blur-md",
    cardHover: "hover:bg-white/10",
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
    outlineBtn: "border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold",
    canvasBg: "bg-white/10 backdrop-blur-[60px] shadow-[0_-30px_60px_rgba(0,0,0,0.5)]",
    canvasBorder: "border-white/30",
    sectionWrapper: "bg-white/10 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-white/10 shadow-2xl"
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

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const t = THEMES[theme];

  const [promptText, setPromptText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
         setModalReport("Error loading report. Ensure GEMINI_API_KEY is configured.");
      }
    } catch (e) {
      setModalReport("Failed to generate report due to a network error.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${t.globalBg} selection:bg-primary/30 flex flex-col font-sans relative transition-colors duration-500`}>
      <GapAnalysisModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         reportMarkdown={modalReport} 
         isLoading={modalLoading} 
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
        <div className="absolute top-[45%] left-[-30%] w-[80vw] h-[60vw] rounded-[100%] bg-white/[0.50] blur-[150px] -rotate-6" />

        {/* Deep Teal Rivers */}
        <div className="absolute top-[35%] right-[-30%] w-[90vw] h-[60vw] rounded-[100%] bg-[#009677]/[0.90] blur-[160px] -rotate-12" />
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
        className={`relative w-full min-h-[110vh] z-10 transition-all duration-700`}
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

         {/* 100vh UI Content Constraint Wrapper */}
         <div className="relative flex flex-col min-h-screen z-10">
         
         {/* Header Nav - Fixed White for Image Legibility */}
         <div className="relative z-50 w-full flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 pt-8 pb-4 gap-6 sm:gap-0 text-white">
            <Link href="/">
              <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={200} height={40} className="w-auto h-8 md:h-10 object-contain" style={{ width: 'auto' }} priority />
            </Link>
            <div className="flex items-center gap-6 md:gap-8 font-ui text-sm font-medium text-white/90">
              <div className="relative group hidden md:block">
                <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-4">Services <ChevronDown className="w-4 h-4 opacity-60 transition-transform group-hover:rotate-180" /></span>
                <div className="absolute top-[85%] left-0 mt-1 w-52 bg-[#001b15]/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 flex flex-col p-2">
                  {['Wealth Management', 'Commercial Lending', 'M&A Integrations', 'Treasury Solutions'].map(vertical => (
                    <span key={vertical} className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors text-sm font-medium tracking-normal normal-case">
                      {vertical}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="hidden md:flex border-white/20 hover:bg-white/10 text-white font-normal bg-white/5">
                <EditableButtonText contentId="nav_btn_1" defaultText="View Procurement Docs" isAdmin={isAdmin} value={cmsContent.nav_btn_1} />
              </Button>
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-bold">
                <EditableButtonText contentId="nav_btn_2" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.nav_btn_2} />
              </Button>
            </div>
         </div>

         {/* Hero Content Body - Fixed White for Image Legibility */}
         <div className="relative z-10 flex flex-col items-start justify-center flex-1 px-6 md:px-12 w-full max-w-5xl gap-6 md:gap-8 mt-4 md:mt-12 text-white">
           <EditableText element="span" contentId="hero_super" defaultText="FOR BANKING EXECUTIVES FACING DISRUPTION" isAdmin={isAdmin} value={cmsContent.hero_super} className="font-ui text-xs sm:text-sm text-secondary uppercase tracking-widest font-bold" />
           
           <EditableText element="h1" contentId="hero_h1" defaultText={"Bank modernization \\nand M&A integrations"} isAdmin={isAdmin} value={cmsContent.hero_h1} className="font-display font-extrabold text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight normal-case drop-shadow-md" />
           
           <EditableText element="p" contentId="hero_p" defaultText="Derisk your digital transformation. We provide the tactical team of banking experts you need to navigate complex digital integrations without disrupting everyday operations." isAdmin={isAdmin} value={cmsContent.hero_p} className="font-reading text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed" />
         </div>

         {/* Glassmorphic AI Gap Analysis Pill */}
         <div className="relative z-20 w-full px-6 md:px-12 pb-12 md:pb-16 flex flex-col justify-start mt-auto">
            <div className="w-full flex flex-col gap-3 max-w-6xl">
               <label className={`font-ui text-xs sm:text-sm ${t.textSecondary} font-medium pl-6 drop-shadow tracking-wide transition-colors`}>
                 Change management fails when the gap between strategy and reality is too wide. <span className={`${t.textHighlight} font-bold ml-1`}>Run an instant gap analysis.</span>
               </label>
               <div className={`relative w-full flex flex-col sm:flex-row items-center ${theme === 'light' ? 'bg-white' : 'bg-white/5'} backdrop-blur-[12px] border ${t.borderStrong} rounded-3xl sm:rounded-full shadow-2xl overflow-hidden p-2 group transition-all`}>
                  <div className={`hidden sm:flex w-12 h-12 shrink-0 items-center justify-center ${theme === 'light' ? 'bg-slate-50' : 'bg-white/10'} rounded-full ml-1 backdrop-blur-md border ${t.borderBase} shadow-inner transition-colors`}>
                     <BrainCircuit className="w-5 h-5 text-primary" />
                  </div>
                  <input 
                    type="text" 
                    value={promptText || ''}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder='E.g., "We are migrating to a unified FIS core and need to align our commercial lending teams..."' 
                    className={`flex-1 w-full bg-transparent border-none outline-none ${t.textPrimary} placeholder:${t.textMuted} px-4 sm:px-6 py-4 sm:py-3 font-ui text-sm sm:text-base h-full focus:outline-none focus:ring-0 transition-colors`}
                  />
                  <button onClick={() => handleGenerateAnalysis()} className="w-full sm:w-auto h-full sm:min-h-[48px] bg-primary text-white px-8 py-3 sm:py-0 rounded-2xl sm:rounded-full transition-transform font-bold shadow-md hover:scale-[1.02] active:scale-95 ml-0 sm:ml-2 flex items-center justify-center gap-2">
                    Generate Gap Analysis <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               <span className={`font-ui text-[10px] sm:text-[11px] ${t.textMuted} pl-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1 transition-colors`}>
                 <strong className="flex items-center gap-1.5 uppercase tracking-widest text-[#98cc67] whitespace-nowrap"><span className="w-1.5 h-1.5 rounded-full bg-[#98cc67] shadow-[0_0_8px_rgba(152,204,103,1)]"></span>B2P Intelligence</strong>
                 <span className="opacity-80 leading-snug">Identifies tech risks and operational friction prior to human discovery calls.</span>
               </span>
            </div>
         </div>

         </div> {/* End 100vh Constraint */}
      </div>

      {/* ================= UNIFIED CONTENT CANVAS OVERLAP ================= */}
      <main className={`relative z-30 -mt-[10vh] rounded-t-[2.5rem] md:rounded-t-[4rem] border-t ${t.canvasBorder} ${t.canvasBg} flex flex-col transition-all duration-700`}>

      {/* ================= PROBLEM & STAKES SECTION ================= */}
      <section className={`min-h-[100vh] flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgProblem} relative overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb1}`} />
        <div className={`max-w-7xl mx-auto w-full ${t.sectionWrapper} relative z-10`}>
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <ShieldAlert className="w-12 h-12 text-[#98cc67] mb-6" />
              <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight ${t.textPrimary} transition-colors`}>
                <EditableText element="span" contentId="problem_h2_top" defaultText="Strategies look flawless on paper." isAdmin={isAdmin} value={cmsContent.problem_h2_top} /> 
                <br/>
                <EditableText element="span" contentId="problem_h2_bot" defaultText="Execution is where budgets bloat." isAdmin={isAdmin} value={cmsContent.problem_h2_bot} className={t.textMuted} />
              </h2>
              <EditableText element="p" contentId="problem_p" defaultText="Modernizing massive, interconnected bank ecosystems is overwhelmingly complex. You need practical operators who do the heavy lifting, not just high-level advisors." isAdmin={isAdmin} value={cmsContent.problem_p} className={`font-reading text-lg mb-6 leading-relaxed ${t.textSecondary} transition-colors`} />
              
              <div className={`p-6 ${theme === 'light' ? 'bg-red-50' : 'bg-[#00120e]/50'} border border-red-500/20 rounded-xl backdrop-blur-sm transition-colors`}>
                <EditableText element="p" contentId="problem_red_p" defaultText="And when digital migrations fail or M&A integrations fracture, it puts your institution’s stability and bottom line directly at risk." isAdmin={isAdmin} value={cmsContent.problem_red_p} className={`font-ui ${theme === 'light' ? 'text-red-700' : 'text-red-400'} font-medium leading-relaxed transition-colors`} />
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                 <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_20px_rgba(152,204,103,0.2)]">
                   <EditableButtonText contentId="problem_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.problem_btn_1} />
                 </Button>
                 <Button size="lg" variant="outline" onClick={() => handleGenerateAnalysis()} className={t.outlineBtn}>
                   <EditableButtonText contentId="problem_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.problem_btn_2} />
                 </Button>
              </div>
            </div>
            {/* High-Contrast Execution Team Photo */}
            <div className={`relative aspect-square rounded-2xl overflow-hidden border ${t.borderBase} shadow-2xl bg-[#002a21] transition-colors`}>
              <EditableImage contentId="problem_img" defaultSrc="/images/team_working_complex_problem.png" isAdmin={isAdmin} value={cmsContent.problem_img} alt="Banking Execution Team" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-tr ${theme === 'light' ? 'from-transparent' : 'from-[#001b15]/40'} to-transparent pointer-events-none transition-colors duration-500`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE PROP (BENTO BOX) ================= */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgValueProp} relative overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb2}`} />
        <div className={`max-w-7xl mx-auto w-full ${t.sectionWrapper} relative z-10`}>
          <div className="max-w-6xl w-full mx-auto relative z-10">
            <div className="mb-16">
              <EditableText element="h2" contentId="value_h2" defaultText="Unifying disparate systems." isAdmin={isAdmin} value={cmsContent.value_h2} className={`font-display text-4xl md:text-5xl font-bold mb-4 ${t.textPrimary} transition-colors`} />
              <EditableText element="p" contentId="value_p" defaultText="Executing change management across your core banking infrastructure." isAdmin={isAdmin} value={cmsContent.value_p} className={`font-reading text-xl ${t.textMuted} transition-colors`} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Landmark className="w-8 h-8 text-[#98cc67] mb-2" />, title: "Wealth", desc: "Align technology with business goals to accelerate platform modernization." },
                { icon: <Handshake className="w-8 h-8 text-[#98cc67] mb-2" />, title: "Commercial", desc: "Streamline commercial lending workflows and modernize infrastructure." },
                { icon: <Zap className="w-8 h-8 text-[#98cc67] mb-2" />, title: "M&A", desc: "Execute derisked, post-merger technology integrations." },
                { icon: <ShieldCheck className="w-8 h-8 text-[#98cc67] mb-2" />, title: "Treasury", desc: "Modernize payments and treasury operations for immediate ROI." }
              ].map((item, idx) => (
                 <Card key={idx} className={`${t.cardBg} backdrop-blur-sm ${t.cardHover} transition-colors border ${t.borderBase}`}>
                   <CardHeader>
                     {item.icon}
                     <CardTitle className={`font-display text-2xl ${t.textPrimary} transition-colors`}>
                       <EditableText element="span" contentId={`value_card_${idx}_title`} defaultText={item.title} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_title`]} />
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <EditableText element="p" contentId={`value_card_${idx}_desc`} defaultText={item.desc} isAdmin={isAdmin} value={cmsContent[`value_card_${idx}_desc`]} className={`${t.textSecondary} font-reading leading-relaxed transition-colors`} />
                   </CardContent>
                 </Card>
              ))}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-[0_0_20px_rgba(152,204,103,0.2)]">
                <EditableButtonText contentId="value_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.value_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleGenerateAnalysis()} className={`${t.outlineBtn} px-8`}>
                <EditableButtonText contentId="value_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.value_btn_2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GUIDE & PROOF ================= */}
      <section className={`min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 ${t.bgGuide} relative text-center overflow-hidden transition-colors duration-500`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full blur-[150px] pointer-events-none transition-colors duration-500 ${t.orb3}`} />
        <div className={`max-w-7xl mx-auto w-full ${t.sectionWrapper} relative z-10`}>
          <div className="max-w-6xl w-full mx-auto text-center mb-16 relative z-10">
            <EditableText element="h2" contentId="guide_h2" defaultText="Your modernization is in safe hands." isAdmin={isAdmin} value={cmsContent.guide_h2} className={`font-display text-4xl md:text-5xl font-bold mb-6 ${t.textPrimary} transition-colors`} />
            <EditableText element="p" contentId="guide_p" defaultText="We combine deep banking experience with modern technology expertise. Because we have the ability to operate across strategy, implementation, and execution, your modernization is always in safe hands." isAdmin={isAdmin} value={cmsContent.guide_p} className={`font-reading text-xl ${t.textSecondary} max-w-3xl mx-auto leading-relaxed transition-colors`} />
          </div>

          {/* Logo Banner */}
          <div className={`flex flex-wrap justify-center items-center gap-12 transition-all duration-500 mb-20 relative z-10 ${t.logoOverlay}`}>
             <span className="font-display text-xl font-bold">Commerce Bank</span>
             <span className="font-display text-xl font-bold">Comerica</span>
             <span className="font-display text-xl font-bold">Fifth Third</span>
             <span className="font-display text-xl font-bold">Glacier Bank</span>
          </div>

          {/* Leadership Faces Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full relative z-10">
            {[1,2,3,4].map(i => (
               <div key={i} className={`relative aspect-[3/4] rounded-lg border ${t.borderBase} overflow-hidden group transition-colors`}>
                 <EditableImage contentId={`leader_img_${i}`} defaultSrc={`/images/leadership_portrait_${i}.png`} isAdmin={isAdmin} value={cmsContent[`leader_img_${i}`]} alt={`Leadership Portrait ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-slate-900/80 via-transparent' : 'from-[#001b15]/90 via-[#001b15]/20'} to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
               </div>
            ))}
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
              {/* Connecting line for desktop */}
              <div className={`hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] ${theme === 'light' ? 'bg-[#001b15]/10' : 'bg-white/10'} z-0 transition-colors`}></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>1</div>
                <h3 className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`}>Assess your infrastructure.</h3>
                <p className={`${t.textSecondary} font-reading leading-relaxed transition-colors`}>Using our AI-Powered Gap Analysis tool.</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>2</div>
                <h3 className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`}>Schedule a Strategy Call.</h3>
                <p className={`${t.textSecondary} font-reading leading-relaxed transition-colors`}>To map a phased integration strategy.</p>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-display font-bold ${theme === 'dark' ? 'text-[#98cc67] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(152,204,103,0.15)]' : 'text-[#00573f] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,87,63,0.3)]'} mb-8 transition-colors`}>3</div>
                <h3 className={`text-2xl font-display font-bold mb-4 ${t.textPrimary} transition-colors`}>Execute the change.</h3>
                <p className={`${t.textSecondary} font-reading leading-relaxed transition-colors`}>We embed with your team to deliver the outcomes.</p>
              </div>
            </div>

            <div className="mt-20 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-6 text-lg shadow-[0_0_25px_rgba(152,204,103,0.25)] hover:scale-105 transition-transform">
                <EditableButtonText contentId="plan_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.plan_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleGenerateAnalysis()} className={`${t.outlineBtn} px-10 py-6 text-lg`}>
                <EditableButtonText contentId="plan_btn_2" defaultText="Generate Gap Analysis" isAdmin={isAdmin} value={cmsContent.plan_btn_2} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST CENTER (PROCUREMENT) & FOOTER CTA ================= */}
      <section className={`flex flex-col justify-center pt-24 ${t.bgTrust} relative z-10 transition-colors duration-500`}>
        
        <div className={`max-w-7xl mx-auto w-full ${t.sectionWrapper} relative z-10 mb-32`}>
          <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-8">
              <FileText className="w-10 h-10 text-[#98cc67]" />
              <div>
                <EditableText element="h2" contentId="trust_h2" defaultText="Procurement & Trust Center" isAdmin={isAdmin} value={cmsContent.trust_h2} className={`font-display text-3xl font-bold ${t.textPrimary} transition-colors`} />
                <EditableText element="p" contentId="trust_p" defaultText="Fast, frictionless vendor onboarding." isAdmin={isAdmin} value={cmsContent.trust_p} className={`${t.textSecondary} transition-colors`} />
              </div>
            </div>
            
            <div className={`${theme === 'light' ? 'bg-white/50' : 'bg-[#00120e]/50'} rounded-2xl border ${t.borderBase} p-2 shadow-2xl backdrop-blur-sm transition-colors duration-500`}>
              {['Legal Entity Overview', 'Financial Stability Indicators', 'Insurance Coverage Limits', 'Compliance Standards', 'Data Security Approach'].map((doc, i) => (
                <div key={i} className={`flex items-center justify-between p-5 ${theme === 'light' ? 'hover:bg-slate-50 border-b border-slate-100' : 'hover:bg-white/5 border-b border-white/5'} last:border-0 cursor-pointer group transition-colors`}>
                  <span className={`font-ui font-medium ${t.textSecondary} group-hover:${t.textHighlight} transition-colors`}>{doc}</span>
                  <ArrowRight className={`w-4 h-4 ${t.textMuted} group-hover:text-[#98cc67] transition-colors`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL CTA & DYNAMIC FOOTER */}
        <footer className={`pt-24 pb-12 px-6 md:px-12 mt-auto bg-transparent`}>
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-24">
            <EditableText element="h2" contentId="footer_cta_h2" defaultText="Ready to stop planning and start executing?" isAdmin={isAdmin} value={cmsContent.footer_cta_h2} className={`font-display text-5xl md:text-6xl font-bold mb-8 ${t.textPrimary} transition-colors`} />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8">
                <EditableButtonText contentId="footer_btn_1" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.footer_btn_1} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleGenerateAnalysis()} className={`bg-white text-[#001b15] hover:bg-white/90 font-bold ${theme === 'light' ? 'border border-[#001b15]/10' : 'border-none'}`}>
                <EditableButtonText contentId="footer_btn_2" defaultText="Generate a Gap Analysis" isAdmin={isAdmin} value={cmsContent.footer_btn_2} />
              </Button>
            </div>
          </div>

          <div className={`max-w-6xl mx-auto border-t ${t.borderBase} pt-12 transition-colors`}>
            <h3 className={`font-ui text-sm ${t.textMuted} uppercase tracking-widest mb-6 font-bold transition-colors`}>Market Momentum</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[1,2,3].map(i => (
                 <div key={i} className={`${theme === 'light' ? 'bg-white border-[#001b15]/10 shadow-sm' : 'bg-white/5 border-white/10'} border rounded-xl p-6 transition-colors`}>
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-blue-400" /></div>
                     <div className={`text-xs font-ui ${t.textSecondary} transition-colors`}>Bridge2Partners • LinkedIn</div>
                   </div>
                   <div className={`h-4 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/20'} rounded w-3/4 mb-2 transition-colors`}></div>
                   <div className={`h-4 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/20'} rounded w-full mb-2 transition-colors`}></div>
                   <div className={`h-4 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/20'} rounded w-5/6 transition-colors`}></div>
                 </div>
               ))}
            </div>
            <div className={`mt-16 flex flex-col md:flex-row items-center justify-between text-xs ${t.textMuted} font-ui transition-colors`}>
              <span>© 2026 Bridge2Partners. All rights reserved.</span>
              <div className="flex gap-6 mt-4 md:mt-0">
                <span className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Careers</span>
                <span className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Privacy Policy</span>
                <span className={`hover:${t.textHighlight} cursor-pointer transition-colors`}>Terms of Service</span>
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
