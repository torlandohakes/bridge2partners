"use client";

import { useState, useEffect } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "./data";
import { collection, onSnapshot as onCollectionSnapshot } from "firebase/firestore";

export default function PeoplePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"All" | "Executive Leadership" | "Business Line Leaders" | "Technical Expertise" | "Business Development">("All");

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (!db) return;
    const unsub = onCollectionSnapshot(collection(db, 'team'), (snapshot) => {
      const teamData = snapshot.docs.map(doc => ({ ...doc.data() } as TeamMember));
      
      // Define correct order for categories
      const categoryOrder = {
        "Executive Leadership": 1,
        "Business Line Leaders": 2,
        "Technical Expertise": 3,
        "Business Development": 4
      };

      // Sort team members based on category order
      teamData.sort((a, b) => {
        const orderA = categoryOrder[a.category as keyof typeof categoryOrder] || 99;
        const orderB = categoryOrder[b.category as keyof typeof categoryOrder] || 99;
        return orderA - orderB;
      });

      setTeam(teamData);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredTeam = team.filter(member => activeTab === "All" || member.category === activeTab);

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
          {["All", "Executive Leadership", "Business Line Leaders", "Technical Expertise", "Business Development"].map(tab => (
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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#98cc67]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
            {filteredTeam.map((member) => (
            <Link href={`/people/${member.id}`} key={member.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col h-full cursor-pointer">
              
              {/* Image Container */}
              <div className="relative aspect-[10/11] w-full bg-[#001b15]/50 overflow-hidden flex items-end justify-center">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#98cc67]/10 rounded-full blur-3xl group-hover:bg-[#98cc67]/20 transition-colors"></div>
                
                <Image 
                  src={member.imageUrl} 
                  alt={member.name}
                  unoptimized
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
                <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-[#98cc67] transition-colors">
                  {member.name}
                </h3>
                <p className="text-white/60 font-ui font-medium mb-4">
                  {member.title}
                </p>
                <div className="w-8 h-px bg-white/20 mb-4 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-white/70 font-sans leading-relaxed text-sm flex-grow line-clamp-3">
                  {member.bio}
                </p>
                
                <div className="mt-6 inline-flex items-center gap-2 text-[#98cc67] group-hover:text-white transition-colors w-fit font-bold text-sm">
                  View Profile &rarr;
                </div>
              </div>
            </Link>
          ))}
          </div>
        )}
      </div>
      </div>
    </main>
  );
}
