"use client";

import { use, useState, useEffect } from "react";
import { TeamMember } from "../data";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Mail, Phone, Calendar, Download, QrCode, X, ChevronLeft, BadgeCheck, Briefcase } from "lucide-react";
import { notFound } from "next/navigation";

export default function DigitalBusinessCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    const fetchMember = async () => {
      if (!db) return;
      try {
        const docRef = doc(db, 'team', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as TeamMember;
          if (data.hasDigitalBusinessCard === false) {
            setMember(null);
          } else {
            setMember(data);
          }
        } else {
          setMember(null);
        }
      } catch (err) {
        console.error("Error fetching member:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMember();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#000d0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#98cc67]"></div>
      </main>
    );
  }

  if (!member) {
    return notFound();
  }

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${member.name.split(' ').pop()};${member.name.split(' ')[0]};;;\nFN:${member.name}\nORG:Bridge2Partners\nTITLE:${member.title}\nTEL;TYPE=WORK,VOICE:${member.phone || ''}\nEMAIL;TYPE=PREF,INTERNET:${member.email || ''}\nURL:${member.linkedinUrl || ''}\nEND:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${member.name.replace(/\\s/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#000d0a] text-white flex flex-col items-center pb-24 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#98cc67]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Nav */}
      <div className="w-full max-w-md px-6 py-6 flex justify-between items-center z-10">
        <Link href="/people" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="text-sm font-ui uppercase tracking-widest font-bold text-[#98cc67]">
          Bridge2Partners
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full max-w-md px-6 flex flex-col items-center mt-4 z-10">
        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 bg-[#001b15]/80 mb-6 drop-shadow-2xl">
          <Image 
            src={member.imageUrl} 
            alt={member.name}
            unoptimized
            fill
            className="object-contain object-bottom"
            sizes="192px"
            priority
          />
        </div>

        <div className="flex items-center gap-2 justify-center mb-1">
          <h1 className="text-3xl font-display font-bold text-white text-center">
            {member.name}
          </h1>
          <BadgeCheck className="w-6 h-6 text-[#98cc67] flex-shrink-0" />
        </div>
        <p className="text-[#98cc67] font-ui font-medium text-lg text-center mb-1">
          {member.title}
        </p>
        <p className="text-white/50 font-ui text-sm uppercase tracking-wider text-center mb-4">
          {member.category}
        </p>

        {/* Expertise Tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {member.expertise.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-ui text-white/80">
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Primary CTA */}
        <button 
          onClick={handleDownloadVCard}
          className="w-full py-4 bg-[#98cc67] hover:bg-white text-[#001b15] rounded-xl font-bold font-ui text-lg flex items-center justify-center gap-3 transition-colors mb-6 shadow-[0_0_40px_rgba(152,204,103,0.3)]"
        >
          <Download className="w-5 h-5" />
          Save Contact
        </button>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-4 w-full mb-10">
          <a href={`mailto:${member.email || 'hello@bridge2partners.com'}`} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#98cc67] group-hover:text-[#001b15] group-hover:border-[#98cc67] transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-ui text-white/50 group-hover:text-white transition-colors">Email</span>
          </a>
          <a href={`tel:${member.phone || '+18005550199'}`} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#98cc67] group-hover:text-[#001b15] group-hover:border-[#98cc67] transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-ui text-white/50 group-hover:text-white transition-colors">Call</span>
          </a>
          <a href={member.linkedinUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#98cc67] group-hover:text-[#001b15] group-hover:border-[#98cc67] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <span className="text-xs font-ui text-white/50 group-hover:text-white transition-colors">Connect</span>
          </a>
          <button onClick={() => setShowQR(true)} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#98cc67] group-hover:text-[#001b15] group-hover:border-[#98cc67] transition-all">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-xs font-ui text-white/50 group-hover:text-white transition-colors">Share</span>
          </button>
        </div>

        {/* Bio Section */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-display font-bold text-xl mb-3">About</h3>
          <p className="text-white/70 font-sans text-sm leading-relaxed">
            {member.fullBio}
          </p>
        </div>

        {/* Career Highlights Section */}
        {member.workHistory && member.workHistory.length > 0 && (
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-[#98cc67]" />
              <h3 className="text-white font-display font-bold text-xl">Career Highlights</h3>
            </div>
            <div className="space-y-4">
              {member.workHistory.map((role, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-white font-bold font-sans text-base">{role.company}</span>
                  {role.title && (
                    <span className="text-[#98cc67] font-ui text-sm">{role.title}</span>
                  )}
                  {role.years && (
                    <span className="text-white/40 font-ui text-xs mt-0.5">{role.years}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Section (If exists) */}
        {member.calendarUrl && (
           <a 
            href={member.calendarUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#98cc67]/10 text-[#98cc67] flex items-center justify-center group-hover:bg-[#98cc67] group-hover:text-[#001b15] transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold font-ui">Book a Meeting</h3>
                <p className="text-white/50 text-xs font-ui">Schedule time directly on my calendar</p>
              </div>
            </div>
          </a>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-[#000d0a]/90 backdrop-blur-sm" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 text-black/50 hover:bg-black/10 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-[#001b15] font-display font-bold text-2xl mb-2 text-center">Share Profile</h3>
            <p className="text-[#001b15]/60 text-sm font-ui text-center mb-8">Scan to view {member.name.split(' ')[0]}'s digital card</p>
            
            <div className="p-4 bg-white border-2 border-black/5 rounded-2xl shadow-xl">
              <QRCodeSVG value={currentUrl} size={200} fgColor="#001b15" />
            </div>
            
            <p className="text-[#001b15]/40 text-xs font-mono mt-8">{currentUrl}</p>
          </div>
        </div>
      )}

    </main>
  );
}
