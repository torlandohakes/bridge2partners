"use client";

import { useState, useEffect, useRef } from "react";
import SubpageHero from "@/components/SubpageHero";
import EditableText from "@/components/EditableText";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { Upload, CheckCircle2, AlertCircle, Loader2, Award, TrendingUp, Handshake, Target } from "lucide-react";

export default function CareersPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cmsContent, setCmsContent] = useState<Record<string, string>>({});
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => setIsAdmin(user !== null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(doc(db, 'site-content', 'careers'), (docSnap) => {
      if (docSnap.exists()) setCmsContent(docSnap.data() as Record<string, string>);
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/send-application', {
        method: 'POST',
        body: formData, // Browser automatically sets multipart/form-data headers
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitStatus("success");
      e.currentTarget.reset();
      setFileName(null);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const principles = [
    {
      id: "quality",
      icon: Award,
      titleId: "principle_1_title",
      defaultTitle: "1. Commitment to Quality",
      subtitleId: "principle_1_subtitle",
      defaultSubtitle: "Excellence is our North Star",
      bodyId: "principle_1_body",
      defaultBody: "We are practitioners first - bankers and technologists who have lived in the trenches. Excellence means delivering expertise, deep domain knowledge, professional judgment, and innovation in everything we do.",
    },
    {
      id: "growth",
      icon: TrendingUp,
      titleId: "principle_2_title",
      defaultTitle: "2. Growth-Oriented",
      subtitleId: "principle_2_subtitle",
      defaultSubtitle: "The Bias Toward Action",
      bodyId: "principle_2_body",
      defaultBody: "We operate with an intentional bias toward driving results and scalable growth. We look for ways to expand our impact with existing clients, identify new problems we can solve, and develop new lines of work.",
    },
    {
      id: "relationship",
      icon: Handshake,
      titleId: "principle_3_title",
      defaultTitle: "3. Relationship-Focused",
      subtitleId: "principle_3_subtitle",
      defaultSubtitle: "Trust as Competitive Advantage",
      bodyId: "principle_3_body",
      defaultBody: "Relationships are the foundation of our business, and trust is our most valuable currency. Strong relationships broaden our network, strengthen our delivery, and support long-term capability building.",
    },
    {
      id: "outcome",
      icon: Target,
      titleId: "principle_4_title",
      defaultTitle: "4. Outcome-Driven",
      subtitleId: "principle_4_subtitle",
      defaultSubtitle: "We Own the Will to Win",
      bodyId: "principle_4_body",
      defaultBody: "We measure success by results, not activity. Delivering hours or completing tasks is a failure if it does not lead to a meaningful business outcome.",
    }
  ];

  return (
    <main className="min-h-screen bg-[#000d0a] text-white pb-24">
      <SubpageHero 
        title={<EditableText element="span" contentId="hero_title" defaultText="Careers at Bridge2Partners" isAdmin={isAdmin} documentId="careers" value={cmsContent.hero_title} />}
        subtitle={<EditableText element="span" contentId="hero_subtitle" defaultText="Join the team solving the hardest modernization problems in Tier-1 banking and wealth management." isAdmin={isAdmin} documentId="careers" value={cmsContent.hero_subtitle} />}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        
        {/* Guiding Principles Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#98cc67] mb-6">
              <EditableText element="span" contentId="values_h2" defaultText="Our Guiding Principles" isAdmin={isAdmin} documentId="careers" value={cmsContent.values_h2} />
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto font-sans leading-relaxed">
              <EditableText element="span" contentId="values_p" defaultText="These principles define how we operate as a firm and how we expect our team to behave. They are the foundation of how we evaluate performance and how our clients experience our partnership." isAdmin={isAdmin} documentId="careers" value={cmsContent.values_p} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.04] transition-colors group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#009677]/10 flex items-center justify-center border border-[#009677]/30 group-hover:bg-[#009677]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#98cc67]" />
                    </div>
                    <div>
                      <h3 className="font-ui text-sm font-semibold text-[#98cc67] tracking-wider uppercase mb-1">
                        <EditableText element="span" contentId={p.titleId} defaultText={p.defaultTitle} isAdmin={isAdmin} documentId="careers" value={cmsContent[p.titleId]} />
                      </h3>
                      <h4 className="font-display text-xl font-bold text-white">
                        <EditableText element="span" contentId={p.subtitleId} defaultText={p.defaultSubtitle} isAdmin={isAdmin} documentId="careers" value={cmsContent[p.subtitleId]} />
                      </h4>
                    </div>
                  </div>
                  <p className="text-white/70 font-sans leading-relaxed">
                    <EditableText element="span" contentId={p.bodyId} defaultText={p.defaultBody} isAdmin={isAdmin} documentId="careers" value={cmsContent[p.bodyId]} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 max-w-3xl mx-auto mb-24" />

        {/* Application Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              <EditableText element="span" contentId="apply_h2" defaultText="Apply to Join the Firm" isAdmin={isAdmin} documentId="careers" value={cmsContent.apply_h2} />
            </h2>
            <p className="text-white/60">
              <EditableText element="span" contentId="apply_p" defaultText="We are always looking for exceptional practitioners. Submit your information below to initiate a conversation with our leadership team." isAdmin={isAdmin} documentId="careers" value={cmsContent.apply_p} />
            </p>
          </div>

          <div className="bg-[#001b15]/40 backdrop-blur-xl border border-[#98cc67]/20 p-8 md:p-12 rounded-[2rem] shadow-2xl">
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[#98cc67]/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#98cc67]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received</h3>
                <p className="text-white/60 max-w-sm">Thank you for your interest in Bridge2Partners. Our leadership team will review your credentials and be in touch.</p>
                <button 
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white/5 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80 pl-1">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#98cc67]/50 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80 pl-1">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    required
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#98cc67]/50 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-white/80 pl-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      disabled={isSubmitting}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#98cc67]/50 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-white/80 pl-1">Location (City, State)</label>
                    <input 
                      type="text" 
                      id="location"
                      name="location" 
                      disabled={isSubmitting}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#98cc67]/50 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Chicago, IL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium text-white/80 pl-1">LinkedIn Profile URL *</label>
                  <input 
                    type="url" 
                    id="linkedin"
                    name="linkedin" 
                    required
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#98cc67]/50 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-white/80 pl-1">Resume / CV *</label>
                  <div 
                    onClick={() => !isSubmitting && fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${fileName ? 'border-[#98cc67]/50 bg-[#98cc67]/5' : 'border-white/20 hover:border-[#98cc67]/50 hover:bg-white/5'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input 
                      type="file" 
                      id="resume"
                      name="resume"
                      ref={fileInputRef}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                    />
                    <div className="flex flex-col items-center gap-3">
                      <Upload className={`w-8 h-8 ${fileName ? 'text-[#98cc67]' : 'text-white/40'}`} />
                      {fileName ? (
                        <div className="flex flex-col items-center">
                          <span className="text-[#98cc67] font-medium">{fileName}</span>
                          <span className="text-white/40 text-xs mt-1">Click to change file</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-white/80 font-medium">Click to upload resume</span>
                          <span className="text-white/40 text-xs mt-1">PDF or DOCX (Max 15MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">There was an error submitting your application. Please try again or email us directly.</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#98cc67] hover:bg-[#a5db72] text-[#001b15] font-bold text-lg py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
