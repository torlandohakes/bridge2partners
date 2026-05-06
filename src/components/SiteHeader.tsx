"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditableButtonText from "@/components/EditableButtonText";
import StrategyCallModal from "@/components/StrategyCallModal";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function SiteHeader() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    // We pull nav button content from the "home" document so it stays synced site-wide
    const unsub = onSnapshot(doc(db, 'site-content', 'home'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  return (
    <>
      <StrategyCallModal 
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        theme="dark"
      />
      <div className="relative z-50 w-full flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 pt-8 pb-4 gap-6 sm:gap-0 text-white">
        <Link href="/">
          <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Logo" width={250} height={40} className="w-auto h-8 md:h-10 object-contain" priority />
        </Link>
        <div className="flex items-center gap-6 md:gap-8 font-ui text-sm font-medium text-white/90">
          <Link href="/people" className="hidden md:block hover:text-white transition-colors tracking-normal normal-case py-4">
            People
          </Link>
          <div className="relative group hidden md:block" tabIndex={0}>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors tracking-normal normal-case py-4 outline-none">Services <ChevronDown className="w-4 h-4 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" /></span>
            {/* Invisible bridge to prevent hover loss */}
            <div className="absolute top-full left-0 pt-2 w-52 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300">
              <div className="bg-[#001b15]/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col p-2">
              {[
                { label: 'Wealth Management', href: '/services/wealth' },
                { label: 'Commercial Lending', href: '/services/commercial-lending' },
                { label: 'M&A Integrations', href: '/services/ma-integration' },
                { label: 'Treasury Solutions', href: '/services/treasury' }
              ].map(vertical => (
                <Link href={vertical.href} key={vertical.label} className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors text-sm font-medium tracking-normal normal-case block">
                  {vertical.label}
                </Link>
              ))}
              </div>
            </div>
          </div>
          <Button asChild variant="outline" className="hidden md:flex border-white/20 hover:bg-white/10 text-white font-normal bg-white/5">
            <Link href="/procurement">
              <EditableButtonText contentId="nav_btn_procurement" defaultText="Procurement" isAdmin={isAdmin} value={cmsContent.nav_btn_procurement} documentId="home" />
            </Link>
          </Button>
          <Button variant="default" onClick={() => setIsStrategyModalOpen(true)} className="hidden md:flex bg-primary/80 backdrop-blur-[10px] border border-white/20 hover:bg-primary/90 text-white font-bold">
            <EditableButtonText contentId="nav_btn_2" defaultText="Schedule a Strategy Call" isAdmin={isAdmin} value={cmsContent.nav_btn_2} documentId="home" />
          </Button>
        </div>
      </div>
    </>
  );
}
