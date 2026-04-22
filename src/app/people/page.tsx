"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import ServiceFooter from "@/components/ServiceFooter";
import Image from "next/image";
import { TeamMember, MOCK_TEAM } from "./data";

export default function PeoplePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"All" | "Executive" | "Practice Leader" | "Client Success" | "Strategic Advisor">("All");

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'people'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  const filteredTeam = MOCK_TEAM.filter(member => activeTab === "All" || member.category === activeTab);

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Our People" isAdmin={isAdmin} value={cmsContent.hero_title} documentId="people" />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="We are operators, not just advisors. Meet the team driving transformation across tier-1 financial institutions." isAdmin={isAdmin} value={cmsContent.hero_subtitle} documentId="people" />}
        theme="dark" 
        imageSrc="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FChristopher%20Summers%20B2P%20Cutout.png?alt=media&token=b1ebc9e8-08a5-4ba8-8e48-7fad149d6ae2"
        imageAlt="Christopher Summers, Managing Partner"
        imageCaptionName={<EditableText element="span" contentId="hero_caption_name" defaultText="Christopher Summers" isAdmin={isAdmin} value={cmsContent.hero_caption_name} documentId="people" />}
        imageCaptionTitle={<EditableText element="span" contentId="hero_caption_title" defaultText="Managing Partner" isAdmin={isAdmin} value={cmsContent.hero_caption_title} documentId="people" />}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-white/10 pb-6">
          {["All", "Executive", "Practice Leader", "Client Success", "Strategic Advisor"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-ui text-sm uppercase tracking-wider font-bold transition-all ${activeTab === tab ? 'bg-[#98cc67] text-[#001b15]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
          {filteredTeam.map((member) => (
            <div key={member.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col h-full">
              
              {/* Image Container */}
              <div className="relative aspect-[10/11] w-full bg-[#001b15]/50 overflow-hidden flex items-end justify-center">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#98cc67]/10 rounded-full blur-3xl group-hover:bg-[#98cc67]/20 transition-colors"></div>
                
                <Image 
                  src={member.imageUrl} 
                  alt={member.name}
                  fill
                  className="object-contain object-bottom scale-100 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-[#000d0a]/80 backdrop-blur-sm z-10">
                <span className="text-[#98cc67] font-ui text-[10px] uppercase tracking-widest font-bold mb-2 block">
                  {member.category}
                </span>
                <h3 className="text-xl font-display font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-white/60 font-ui font-medium mb-4">
                  {member.title}
                </p>
                <div className="w-8 h-px bg-white/20 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-white/70 font-sans leading-relaxed text-sm flex-grow">
                  {member.bio}
                </p>
                
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} className="mt-6 inline-flex items-center gap-2 text-[#98cc67] hover:text-white transition-colors w-fit font-bold text-sm" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceFooter 
        isAdmin={isAdmin} 
        cmsContent={cmsContent} 
        documentId="people"
      />
    </main>
  );
}
