"use client";

import { useState, useEffect, useMemo } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { 
  Mail, Users, Calendar, Search, ShieldCheck, 
  Smartphone, Monitor, Save, Plus, Trash2, 
  Loader2, Sparkles, Building2, UserSquare2, Eye,
  ArrowUpRight, Clock, ToggleLeft, ToggleRight, CheckCircle2,
  ChevronRight, Settings, PauseCircle, PlayCircle, Pause, Play, RefreshCw
} from "lucide-react";
import LoginModal from "@/components/LoginModal";

interface Subscriber {
  id: string;
  email: string;
  active: boolean;
  subscribedAt?: any;
}

interface NewsletterConfig {
  frequency: string;
  dayOfWeek: string;
  timeOfDay: string;
  senderEmail: string;
  senderName?: string;
  subjectLine?: string;
  paused?: boolean;
  filterDays?: number;
  maxPosts?: number;
  excludedPostIds?: string[];
}

export default function MailerAdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'digest' | 'subscribers' | 'manual' | 'abm'>('digest');
  
  // Data State
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [submittingEmail, setSubmittingEmail] = useState(false);
  
  // Config State
  const [config, setConfig] = useState<NewsletterConfig>({
    frequency: '1st_15th',
    dayOfWeek: '1st & 15th',
    timeOfDay: '09:00',
    senderEmail: 'torlando.hakes@bridge2partners.com',
    senderName: 'Bridge2Partners Insights',
    subjectLine: '',
    paused: false,
    filterDays: 15,
    maxPosts: 15,
    excludedPostIds: []
  });
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSuccess, setConfigSuccess] = useState(false);

  // AI Subject Preview State
  const [aiSubject, setAiSubject] = useState("");
  const [generatingAiSubject, setGeneratingAiSubject] = useState(false);
  const [cyclingSubject, setCyclingSubject] = useState(false);

  // Preview State
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showScheduleSettings, setShowScheduleSettings] = useState(false);
  const [showFilterSettings, setShowFilterSettings] = useState(false);
  const [showIncludedPosts, setShowIncludedPosts] = useState(false);
  
  // Test Send State
  const [showTestSettings, setShowTestSettings] = useState(false);
  const [testRecipientEmail, setTestRecipientEmail] = useState("torlando.hakes@bridge2partners.com");
  const [sendingTest, setSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // Authentication Check
  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user !== null && user.email === 'torlando.hakes@bridge2partners.com');
    });
    return () => unsub();
  }, []);

  // Fetch Subscribers
  useEffect(() => {
    if (!db || !isAdmin) return;
    const unsub = onSnapshot(collection(db, "subscribers"), (snapshot) => {
      const subData = snapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email || '',
        active: doc.data().active ?? true,
        subscribedAt: doc.data().subscribedAt
      }));
      setSubscribers(subData);
    });
    return () => unsub();
  }, [isAdmin]);

  // Fetch Config
  useEffect(() => {
    if (!db || !isAdmin) return;
    const fetchConfig = async () => {
      try {
        const configDoc = await getDoc(doc(db, "site-settings", "newsletter_config"));
        if (configDoc.exists()) {
          setConfig(prev => ({ ...prev, ...configDoc.data() as NewsletterConfig }));
        }
      } catch (err) {
        console.error("Failed to load newsletter settings:", err);
      }
    };
    fetchConfig();
  }, [isAdmin]);

  // Fetch LinkedIn Posts for preview
  useEffect(() => {
    if (!isAdmin) return;
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const res = await fetch("/api/linkedin?count=50");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts || []);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [isAdmin]);

  // Handle subscriber edit actions
  const toggleSubscriber = async (sub: Subscriber) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "subscribers", sub.id), {
        active: !sub.active
      });
    } catch (err) {
      console.error("Failed to toggle subscriber status:", err);
    }
  };

  const deleteSubscriber = async (subId: string) => {
    if (!db || !confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      await deleteDoc(doc(db, "subscribers", subId));
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    }
  };

  const handleTogglePost = async (postId: string) => {
    if (!postId) return;
    const currentExcluded = config.excludedPostIds || [];
    let newExcluded: string[];
    if (currentExcluded.includes(postId)) {
      newExcluded = currentExcluded.filter(id => id !== postId);
    } else {
      newExcluded = [...currentExcluded, postId];
    }
    setConfig(prev => ({ ...prev, excludedPostIds: newExcluded }));
    if (db) {
      try {
        await setDoc(doc(db, "site-settings", "newsletter_config"), { excludedPostIds: newExcluded }, { merge: true });
      } catch (err) {
        console.error("Failed to save post exclusion to Firestore:", err);
      }
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !newEmail.includes("@")) return;
    setSubmittingEmail(true);
    try {
      const cleanEmail = newEmail.trim().toLowerCase();
      const docId = cleanEmail.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      await setDoc(doc(db, "subscribers", docId), {
        email: cleanEmail,
        subscribedAt: new Date(),
        active: true
      });
      setNewEmail("");
    } catch (err) {
      console.error("Failed to add subscriber:", err);
    } finally {
      setSubmittingEmail(false);
    }
  };

  // Handle config updates
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSavingConfig(true);
    setConfigSuccess(false);
    try {
      await setDoc(doc(db, "site-settings", "newsletter_config"), config, { merge: true });
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save newsletter configurations:", err);
    } finally {
      setSavingConfig(false);
    }
  };

  // Handle manual test email dispatches using Firestore challenge verification
  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipientEmail || !db) return;
    setSendingTest(true);
    setTestSuccess(null);
    setTestError(null);

    try {
      // 1. Generate unique random challenge token
      const challenge = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // 2. Save challenge locally in Firestore config
      await setDoc(doc(db, 'site-settings', 'newsletter_config'), {
        testChallenge: challenge,
        testChallengeCreatedAt: Date.now()
      }, { merge: true });

      // 3. Trigger dispatch API with challenge token
      const res = await fetch(`/api/newsletter/send-digest?testChallenge=${challenge}&testEmail=${encodeURIComponent(testRecipientEmail)}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setTestSuccess(`Test email sent successfully to ${testRecipientEmail}!`);
        // 4. Reset challenge variables
        await setDoc(doc(db, 'site-settings', 'newsletter_config'), {
          testChallenge: null,
          testChallengeCreatedAt: null
        }, { merge: true });
      } else {
        setTestError(data.error || data.message || "Failed to send test email.");
      }
    } catch (err: any) {
      console.error("Test email failed:", err);
      setTestError(err.message || "An unexpected error occurred.");
    } finally {
      setSendingTest(false);
    }
  };

  // Calculate next scheduled send date
  const getNextSendDate = (day: string, timeStr: string) => {
    if (!timeStr) return 'Not Scheduled';
    const [hourStr, minStr] = timeStr.split(':');
    const targetHour = parseInt(hourStr, 10) || 0;
    const targetMin = parseInt(minStr, 10) || 0;
    
    const now = new Date();
    
    if (config.frequency === '1st_15th') {
      let candidate1 = new Date(now.getFullYear(), now.getMonth(), 1, targetHour, targetMin, 0);
      let candidate2 = new Date(now.getFullYear(), now.getMonth(), 15, targetHour, targetMin, 0);
      let candidate3 = new Date(now.getFullYear(), now.getMonth() + 1, 1, targetHour, targetMin, 0);
      
      let nextDate = candidate1;
      if (now.getTime() >= candidate1.getTime()) {
        nextDate = candidate2;
      }
      if (now.getTime() >= candidate2.getTime()) {
        nextDate = candidate3;
      }
      
      return nextDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) + ` at ${timeStr}`;
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = daysOfWeek.indexOf(day);
    if (targetDayIndex === -1) return 'Not Scheduled';
    
    let sendDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMin, 0);
    
    let dayDiff = targetDayIndex - now.getDay();
    if (dayDiff < 0 || (dayDiff === 0 && now.getTime() >= sendDate.getTime())) {
      dayDiff += 7;
    }
    
    sendDate.setDate(sendDate.getDate() + dayDiff);
    return sendDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + ` at ${timeStr}`;
  };

  // Pre-filter preview posts based on target duration (memoized)
  const filteredPosts = useMemo(() => {
    // 1. Sort posts descending by timestamp initially
    const sortedPosts = [...posts].sort((a, b) => {
      const timeA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
      const timeB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    const filterDays = config.filterDays ?? 15;
    const maxPosts = config.maxPosts ?? 15;
    const excludedPostIds = config.excludedPostIds ?? [];

    const nowInPacific = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    nowInPacific.setHours(0, 0, 0, 0);
    const limitDate = nowInPacific.getTime() - filterDays * 24 * 60 * 60 * 1000;

    // 2. Filter posts by time duration and exclusion
    const periodPosts = sortedPosts.filter(post => {
      // Filter out explicitly excluded posts
      if (excludedPostIds.includes(post.id)) return false;

      const postTime = typeof post.timestamp === 'number' ? post.timestamp : new Date(post.timestamp).getTime();
      return postTime >= limitDate;
    });

    // 3. Feature articles first, then regular posts
    const articles = periodPosts.filter(p => p.isArticle);
    const regularPosts = periodPosts.filter(p => !p.isArticle);
    
    return [...articles, ...regularPosts].slice(0, maxPosts);
  }, [posts, config.filterDays, config.maxPosts, config.excludedPostIds]);

  // Fetch dynamic AI-generated subject line via Gemini endpoint
  useEffect(() => {
    if (filteredPosts.length === 0 || config.subjectLine) {
      setAiSubject("");
      return;
    }

    const fetchSubject = async () => {
      setGeneratingAiSubject(true);
      try {
        const res = await fetch('/api/newsletter/generate-subject', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ posts: filteredPosts })
        });
        if (res.ok) {
          const data = await res.json();
          setAiSubject(data.subject || "");
        }
      } catch (err) {
        console.error("Failed to fetch dynamic AI subject:", err);
      } finally {
        setGeneratingAiSubject(false);
      }
    };

    fetchSubject();
  }, [filteredPosts, config.subjectLine]);

  // Cycle subject line options using Gemini exclusions
  const cycleSubjectLine = async () => {
    console.log("[Cycle] Cycle button clicked!");
    const postsToUse = filteredPosts.length > 0 ? filteredPosts : posts;
    console.log("[Cycle] Using posts count:", postsToUse.length);
    setCyclingSubject(true);
    try {
      console.log("[Cycle] Fetching new subject from API with exclude:", config.subjectLine || aiSubject);
      const res = await fetch('/api/newsletter/generate-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          posts: postsToUse, 
          exclude: config.subjectLine || aiSubject 
        })
      });
      console.log("[Cycle] API response status:", res.status);
      if (res.ok) {
        const data = await res.json();
        const newSubject = data.subject || "";
        console.log("[Cycle] New generated subject returned from Gemini:", newSubject);
        setConfig(prev => ({ ...prev, subjectLine: newSubject }));
        await setDoc(doc(db, "site-settings", "newsletter_config"), { subjectLine: newSubject }, { merge: true });
        console.log("[Cycle] Updated state and Firestore successfully!");
      } else {
        console.error("[Cycle] API request failed with status:", res.status);
      }
    } catch (err) {
      console.error("[Cycle] Failed to cycle subject:", err);
    } finally {
      setCyclingSubject(false);
      console.log("[Cycle] Cycle completed.");
    }
  };

  // Generate Email Newsletter HTML Template for Preview iframe
  const generatePreviewHtml = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bridge2partners.com';
    
    // Helper to parse post text into headline and body
    const getPostHeadlineAndBody = (text: string) => {
      if (!text) return { headline: '', body: '' };
      const parts = text.split('\n\n');
      if (parts.length > 1) {
        return { headline: parts[0].trim(), body: parts.slice(1).join('\n\n').trim() };
      }
      const lines = text.split('\n');
      if (lines.length > 1) {
        return { headline: lines[0].trim(), body: lines.slice(1).join('\n').trim() };
      }
      const match = text.match(/^([^.!?]+[.!?])\s*(.*)$/);
      if (match) {
        return { headline: match[1].trim(), body: match[2].trim() };
      }
      return { headline: '', body: text };
    };

    const articleCards = filteredPosts.filter(p => p.isArticle);
    const regularCards = filteredPosts.filter(p => !p.isArticle);

    const renderCard = (post: any) => {
      const imageUrl = post.imageUrl 
        ? (post.imageUrl.startsWith('/') ? `${baseUrl}${post.imageUrl}` : post.imageUrl)
        : '';
      const { headline, body } = getPostHeadlineAndBody(post.text);
      const cleanedBody = body
        .split('\n')
        .map(line => line.trim())
        .join('\n');
      const isTruncated = cleanedBody.length > 320;
      const truncatedBody = isTruncated 
        ? `${cleanedBody.substring(0, 320)}... <a href="${post.link}" target="_blank" style="color: #98cc67; text-decoration: none; font-weight: bold; display: inline-block;">Keep reading</a>` 
        : cleanedBody;
      
      const authorHeaderHtml = `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
          <tr>
            <td width="44" valign="top">
              <div style="width: 40px; height: 40px; border-radius: 4px; overflow: hidden; background-color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.1);">
                <img src="${baseUrl}/images/B2P_LI_LOGO_Primary.webp" alt="Logo" width="40" height="40" style="display: block; object-fit: cover;" />
              </div>
            </td>
            <td style="padding-left: 12px;" valign="top">
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; color: #ffffff; line-height: 1.2;">
                Bridge2Partners <span style="display: inline-block; background-color: #0066f5; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle; margin-left: 2px;"></span>
              </div>
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.5); margin-top: 2px;">
                Banking Transformation Advisors
              </div>
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: rgba(255, 255, 255, 0.4); margin-top: 1px;">
                ${post.date || 'Recent Update'}
              </div>
            </td>
          </tr>
        </table>
      `;

      const contentHtml = `
        <!-- Post Headline -->
        ${headline ? `
          <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; line-height: 1.4; margin-bottom: 12px;">
            ${headline}
          </div>
        ` : ''}
        <div style="font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: rgba(255, 255, 255, 0.75); white-space: pre-wrap; margin-bottom: 16px; text-align: left;">${truncatedBody}</div>
      `;

      const footerHtml = `
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.4); font-weight: bold; vertical-align: middle;">
              <img src="${baseUrl}/images/icon_like.svg" width="12" height="12" style="display: inline-block; vertical-align: middle; margin-right: 4px; opacity: 0.4;" alt="likes" />
              <span style="vertical-align: middle; margin-right: 12px; font-weight: normal; color: rgba(255, 255, 255, 0.4);">${post.likes}</span>
              <img src="${baseUrl}/images/icon_comment.svg" width="12" height="12" style="display: inline-block; vertical-align: middle; margin-right: 4px; opacity: 0.4;" alt="comments" />
              <span style="vertical-align: middle; font-weight: normal; color: rgba(255, 255, 255, 0.4);">${post.comments}</span>
            </td>
            <td align="right">
              <a href="${post.link}" target="_blank" style="display: inline-block; background-color: #98cc67; color: #001b15; text-decoration: none; padding: 8px 16px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold;">
                View on LinkedIn
              </a>
            </td>
          </tr>
        </table>
      `;

      if (post.isArticle) {
        return `
          <!-- Article Card (Image on Top) -->
          <div style="background-color: #0b1a16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; margin-bottom: 24px; text-align: left;">
            ${imageUrl ? `
              <div style="width: 100%; overflow: hidden; background-color: #050e0c; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <a href="${post.link}" target="_blank">
                  <img src="${imageUrl}" alt="Article Cover" style="width: 100%; height: auto; display: block; object-fit: cover;" />
                </a>
              </div>
            ` : ''}
            <div style="padding: 24px;">
              ${authorHeaderHtml}
              ${contentHtml}
              ${footerHtml}
            </div>
          </div>
        `;
      } else {
        return `
          <!-- Regular Post Card (Image on Bottom) -->
          <div style="background-color: #0b1a16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left;">
            ${authorHeaderHtml}
            ${contentHtml}
            ${imageUrl ? `
              <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05); background-color: #050e0c;">
                <a href="${post.link}" target="_blank">
                  <img src="${imageUrl}" alt="LinkedIn Update Attachment" style="width: 100%; aspect-ratio: 1 / 1; display: block; object-fit: cover;" />
                </a>
              </div>
            ` : ''}
            ${footerHtml}
          </div>
        `;
      }
    };

    let postCardsHtml = '';
    
    if (articleCards.length > 0) {
      postCardsHtml += `
        <!-- Section Heading: Featured Articles -->
        <h2 style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 20px 0; border-left: 3px solid #98cc67; padding-left: 10px; line-height: 1.2; text-align: left;">
          Featured Articles
        </h2>
        ${articleCards.map(renderCard).join('')}
        <div style="height: 12px;"></div>
      `;
    }
    
    if (regularCards.length > 0) {
      postCardsHtml += `
        <!-- Section Heading: Latest Insights -->
        <h2 style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 20px 0; border-left: 3px solid #ffffff; padding-left: 10px; line-height: 1.2; text-align: left;">
          Latest Insights
        </h2>
        ${regularCards.map(renderCard).join('')}
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #000d0a; color: #ffffff; margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; }
          .footer { padding: 32px 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: rgba(255, 255, 255, 0.4); }
        </style>
      </head>
      <body>
        <div class="container">
          <div style="padding: 24px 0; border-bottom: 1px solid #ffffff; margin-bottom: 32px; text-align: left;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; color: #98cc67; text-transform: uppercase; letter-spacing: 0.25em;">
                    BRIDGE2PARTNERS &bull; INSIGHTS
                  </div>
                  <div style="font-family: 'Georgia', Times, serif; font-size: 26px; font-weight: 900; color: #ffffff; margin-top: 8px; line-height: 1.2; letter-spacing: -0.02em;">
                    Insights from the Frontlines
                  </div>
                  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: rgba(255, 255, 255, 0.6); margin-top: 8px; line-height: 1.5; font-weight: 300;">
                    Banking modernization insights, post-merger integration strategies, and industry analysis directly from experienced practitioners.
                  </div>
                  <div style="margin-top: 16px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 12px;">
                          <a href="https://www.linkedin.com/company/bridge-2-partners" target="_blank" style="display: inline-block; background-color: #98cc67; color: #001b15; text-decoration: none; padding: 6px 16px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold; line-height: 1.2;">
                            Follow on LinkedIn
                          </a>
                        </td>
                        <td>
                          <a href="mailto:?subject=Bridge2Partners%20Insights%20Digest&body=I%27m%20reading%20the%20Bridge2Partners%20Insights%20Digest%2C%20which%20features%20their%20latest%20banking%20modernization%20insights%2C%20post-merger%20integration%20strategies%2C%20and%20industry%20updates%20from%20practicing%20advisors.%0A%0AYou%20can%20read%20this%20full%20newsletter%20edition%20online%20here%3A%0Ahttps%3A%2F%2Fbridge2partners-production.web.app%2Finsights" target="_blank" style="display: inline-block; background-color: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); text-decoration: none; padding: 5px 15px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold; line-height: 1.2;">
                            Share via Email
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div style="height: 24px;"></div>
          ${postCardsHtml || '<div style="color: rgba(255,255,255,0.4); padding: 40px;">No LinkedIn updates match the preceding period filter.</div>'}
          <div class="footer">
            <p style="margin: 0 0 16px 0; line-height: 1.6;">
              You are receiving this digest because you subscribed to insights on <a href="#" style="color: #98cc67; text-decoration: none;">bridge2partners.com</a>.
            </p>
            <a href="#" style="color: #98cc67; text-decoration: underline; font-weight: bold;">Unsubscribe from this list</a>
            <p style="font-size: 9px; color: rgba(255, 255, 255, 0.3); margin-top: 16px; line-height: 1.4;">
              &copy; ${new Date().getFullYear()} Bridge2Partners LLC. All rights reserved.<br/>
              1209 N. Orange St, Wilmington, DE 19801
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Memoize previewHtml to prevent iframe re-renders from stealing text input focus
  const previewHtml = useMemo(() => {
    return generatePreviewHtml();
  }, [filteredPosts]);

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Unauthorized layout (Dark Glassmorphic Auth)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#000d0a] text-white flex flex-col items-center justify-center p-6 pt-32">
        <div className="absolute top-[20%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-[#009677]/[0.05] blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 max-w-md w-full border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 text-center">
          <ShieldCheck className="w-16 h-16 text-[#98cc67] mx-auto mb-6" />
          <h1 className="font-display font-extrabold text-2xl mb-2">Admin Credentials Required</h1>
          <p className="font-sans text-sm text-white/60 mb-8">
            Access to the Bridge2Partners Email and Campaign manager dashboard is strictly restricted.
          </p>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="w-full bg-[#98cc67] text-[#001b15] font-bold font-ui py-3.5 rounded-full hover:bg-[#84b256] transition-all hover:scale-[1.01]"
          >
            Authenticate Admin
          </button>
        </div>
        
        {showLoginModal && (
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)} 
            theme="dark"
          />
        )}
      </div>
    );
  }

  // Brand guidelines light-theme dashboard layout stretching full height
  return (
    <div className="h-screen flex bg-slate-50 text-slate-800 selection:bg-primary/20 relative overflow-hidden w-full">
      {/* Decorative Premium Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#009677]/[0.04] blur-[100px]" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00573f]/[0.05] blur-[120px]" />
      </div>
      
      {/* Left Sticky Sidebar Nav */}
      <aside className="hidden md:flex flex-col shrink-0 w-64 border-r border-slate-200 bg-white h-full p-6 justify-between z-20">
          <div className="flex flex-col gap-6">
            <div className="mb-2">
              <img 
                 src="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Brand_Logo_v7.webp?alt=media&token=a90040bc-3446-408d-8794-cab07568de66" 
                 alt="Bridge2Partners Logo" 
                 className="h-6 w-auto object-contain" 
              />
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</div>
            
            <nav className="flex flex-col gap-1.5">
              <button 
                onClick={() => setActiveTab('digest')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'digest' 
                    ? 'bg-[#00573f] text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>LinkedIn Digest</span>
              </button>

              <button 
                onClick={() => setActiveTab('subscribers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'subscribers' 
                    ? 'bg-[#00573f] text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Subscribers ({subscribers.filter(s => s.active).length})</span>
              </button>

              <button 
                onClick={() => setActiveTab('manual')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'manual' 
                    ? 'bg-[#00573f] text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Compose Campaign</span>
              </button>

              <button 
                onClick={() => setActiveTab('abm')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'abm' 
                    ? 'bg-[#00573f] text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>ABM Bank Tools</span>
              </button>
            </nav>
          </div>

          {/* Sidebar Footer info */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left">
            <div className="text-[10px] font-bold text-[#00573f] uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Mode</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
              Authenticated securely as torlando.hakes@bridge2partners.com.
            </p>
          </div>
        </aside>

        {/* Tab Router Content Canvas (Right Column) */}
        <main className="flex-1 w-full min-w-0 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50 text-left h-full">
          <div className="w-full max-w-none pb-24">
                   {/* Tab 1: LinkedIn Digest Preview & Settings */}
            {activeTab === 'digest' && (
              <div className="flex flex-col gap-6">
                
                {/* Header overview */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold tracking-tight font-display text-slate-800">LinkedIn Digest Settings & Preview</h2>
                  <p className="text-xs text-slate-500 font-light font-sans">Configure weekly dispatch metrics and preview layout renders.</p>
                </div>

                {/* Toolbar containing Settings toggles and Viewport selectors */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowScheduleSettings(!showScheduleSettings)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        showScheduleSettings 
                          ? 'bg-[#00573f] text-white border-transparent shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Delivery Schedule</span>
                    </button>
                    
                    <button 
                      onClick={() => setShowFilterSettings(!showFilterSettings)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        showFilterSettings 
                          ? 'bg-[#00573f] text-white border-transparent shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Filter Rules</span>
                    </button>
                    
                    <button 
                      onClick={() => setShowTestSettings(!showTestSettings)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        showTestSettings 
                          ? 'bg-[#00573f] text-white border-transparent shadow-sm' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Test Email</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-[10px] text-slate-400 font-medium">Viewport size:</div>
                    <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                      <button 
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-1.5 rounded transition-all ${previewMode === 'desktop' ? 'bg-white text-[#00573f] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Desktop View"
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-1.5 rounded transition-all ${previewMode === 'mobile' ? 'bg-white text-[#00573f] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        title="Mobile View"
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsible Delivery Settings Drawer */}
                {showScheduleSettings && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <h3 className="font-display font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-[#00573f]" />
                      Schedule Configuration
                    </h3>

                    <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Dispatch Frequency</label>
                        <select 
                          value={config.frequency}
                          onChange={(e) => {
                            const newFreq = e.target.value;
                            setConfig(prev => ({ 
                              ...prev, 
                              frequency: newFreq,
                              dayOfWeek: newFreq === '1st_15th' ? '1st & 15th' : prev.dayOfWeek === '1st & 15th' ? 'Monday' : prev.dayOfWeek
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        >
                          <option value="1st_15th">1st & 15th of Month</option>
                          <option value="weekly">Weekly Digest</option>
                          <option value="biweekly">Bi-Weekly Digest</option>
                          <option value="monthly">Monthly Digest</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Send Day</label>
                        <select 
                          disabled={config.frequency === '1st_15th'}
                          value={config.frequency === '1st_15th' ? '1st & 15th' : config.dayOfWeek}
                          onChange={(e) => setConfig(prev => ({ ...prev, dayOfWeek: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f] disabled:opacity-60"
                        >
                          {config.frequency === '1st_15th' ? (
                            <option value="1st & 15th">1st & 15th of Month</option>
                          ) : (
                            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Send Time</label>
                        <select 
                          value={config.timeOfDay}
                          onChange={(e) => setConfig(prev => ({ ...prev, timeOfDay: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        >
                          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                            <option key={t} value={t}>{t} AM/PM</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Sender Name</label>
                        <input 
                          type="text"
                          value={config.senderName || ''}
                          onChange={(e) => setConfig(prev => ({ ...prev, senderName: e.target.value }))}
                          required
                          placeholder="e.g. Bridge2Partners Insights"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        />
                      </div>

                       <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Sender Address</label>
                        <input 
                          type="email"
                          value={config.senderEmail}
                          onChange={(e) => setConfig(prev => ({ ...prev, senderEmail: e.target.value }))}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        />
                      </div>



                      <div className="md:col-span-2 lg:col-span-5 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            {config.paused ? (
                              <>
                                <PauseCircle className="w-4 h-4 text-amber-500" />
                                <span>Campaign Status: Paused</span>
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
                                <span>Campaign Status: Active</span>
                              </>
                            )}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {config.paused 
                              ? "Automated digest deliveries are temporarily suspended. Click Resume to re-enable schedule." 
                              : "Automated digest deliveries will dispatch on schedule. Click Pause to suspend deliveries."}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, paused: !prev.paused }))}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            config.paused 
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" 
                              : "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                          }`}
                        >
                          {config.paused ? (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume Campaign</span>
                            </>
                          ) : (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause Campaign</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="md:col-span-2 lg:col-span-5 flex items-center justify-between gap-4 mt-2 pt-4 border-t border-slate-100">
                        {configSuccess ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-250 rounded-xl px-4 py-2 animate-fade-in">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Schedule settings saved successfully!</span>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 font-medium">
                            {config.frequency === '1st_15th' 
                              ? 'Automatically dispatches on the 1st and 15th of each month.' 
                              : 'Dispatches automatically at the configured recurring slot.'}
                          </div>
                        )}
                        <button 
                          type="submit" 
                          disabled={savingConfig}
                          className="bg-[#00573f] hover:bg-[#003d2b] text-white font-bold font-ui text-xs px-6 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                        >
                          {savingConfig ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Settings</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Collapsible Filter Constraints Drawer */}
                {showFilterSettings && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-5">
                    <div>
                      <h3 className="font-display font-bold text-sm text-slate-800 mb-1 uppercase tracking-wider text-[10px]">Filter Constraints</h3>
                      <p className="text-[10px] text-slate-400">Configure how LinkedIn posts are filtered and selected for the automatic campaigns.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                      {/* Column 1: Lookback Days */}
                      <div className="flex flex-col justify-center gap-1.5 bg-slate-50 border border-slate-150 rounded-xl p-4">
                        <span className="text-xs font-semibold text-slate-700">Lookback Period (Days)</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            min="1"
                            max="365"
                            value={config.filterDays ?? 15}
                            onChange={async (e) => {
                              const val = parseInt(e.target.value) || 15;
                              setConfig(prev => ({ ...prev, filterDays: val }));
                              if (db) {
                                await setDoc(doc(db, "site-settings", "newsletter_config"), { filterDays: val }, { merge: true });
                              }
                            }}
                            className="w-full max-w-[100px] bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00573f] shadow-inner"
                          />
                          <span className="text-[10px] text-slate-400 font-semibold">days</span>
                        </div>
                      </div>

                      {/* Column 2: Max Updates Capping */}
                      <div className="flex flex-col justify-center gap-1.5 bg-slate-50 border border-slate-150 rounded-xl p-4">
                        <span className="text-xs font-semibold text-slate-700">Max Updates Capping</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number"
                            min="1"
                            max="50"
                            value={config.maxPosts ?? 15}
                            onChange={async (e) => {
                              const val = parseInt(e.target.value) || 15;
                              setConfig(prev => ({ ...prev, maxPosts: val }));
                              if (db) {
                                await setDoc(doc(db, "site-settings", "newsletter_config"), { maxPosts: val }, { merge: true });
                              }
                            }}
                            className="w-full max-w-[100px] bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00573f] shadow-inner"
                          />
                          <span className="text-[10px] text-slate-400 font-semibold">posts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collapsible Test Settings Drawer */}
                {showTestSettings && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-4">
                    <div>
                      <h3 className="font-display font-bold text-sm text-slate-800 mb-1 uppercase tracking-wider text-[10px]">Send Test Email</h3>
                      <p className="text-[10px] text-slate-400">Trigger a manual test dispatch of the current newsletter configuration and selected candidates to a test recipient.</p>
                    </div>

                    <form onSubmit={handleSendTestEmail} className="flex flex-col sm:flex-row items-end gap-4 border-t border-slate-100 pt-4">
                      <div className="flex-1 w-full">
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Recipient Email Address</label>
                        <input 
                          type="email"
                          required
                          value={testRecipientEmail}
                          onChange={(e) => setTestRecipientEmail(e.target.value)}
                          placeholder="recipient@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={sendingTest}
                        className="w-full sm:w-auto bg-[#00573f] hover:bg-[#003d2b] text-white font-bold font-ui text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                      >
                        {sendingTest ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Test</span>
                          </>
                        )}
                      </button>
                    </form>

                    {testSuccess && (
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-250 rounded-xl px-4 py-2 animate-fade-in flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{testSuccess}</span>
                      </div>
                    )}

                    {testError && (
                      <div className="text-xs font-bold text-red-600 bg-red-50 border border-red-250 rounded-xl px-4 py-2 animate-fade-in flex items-center gap-1.5">
                        <span className="w-4 h-4 flex items-center justify-center border border-red-300 rounded-full font-bold text-[9px]">!</span>
                        <span>{testError}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Upcoming Campaign Metadata (Horizontal 3-column row) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Interactive Subject Line */}
                  {/* Card 1: Interactive Subject Line */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex flex-col justify-between gap-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Subject Line
                      </span>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <input 
                          type="text"
                          value={config.subjectLine || ''}
                          placeholder={generatingAiSubject ? "Generating with Gemini..." : (aiSubject || "Auto-Generate with Gemini AI")}
                          onChange={(e) => setConfig(prev => ({ ...prev, subjectLine: e.target.value }))}
                          onBlur={async (e) => {
                            try {
                              await setDoc(doc(db, "site-settings", "newsletter_config"), { subjectLine: e.target.value }, { merge: true });
                            } catch (err) {
                              console.error("Failed to auto-save subject line:", err);
                            }
                          }}
                          className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#00573f] shadow-inner"
                        />
                        <button
                          type="button"
                          disabled={cyclingSubject}
                          onClick={cycleSubjectLine}
                          title="Cycle through different dynamic AI subject lines"
                          className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-[#00573f] p-2.5 rounded-xl transition-all border border-slate-200 flex items-center justify-center focus:outline-none"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${cyclingSubject ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <span className="text-[8px] text-slate-400 block leading-tight">
                      Edit the subject manually, or click the cycle button to generate a new AI subject line.
                    </span>
                  </div>

                  {/* Card 2: Interactive Campaign status & Pause/Play toggle */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex flex-col justify-between gap-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Next Scheduled Send</span>
                      {config.paused ? (
                        <span className="font-bold text-xs text-amber-600 flex items-center gap-1.5 animate-pulse">
                          <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
                          Campaign Paused
                        </span>
                      ) : (
                        <span className="font-semibold text-xs text-slate-700 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#00573f]" />
                          {getNextSendDate(config.dayOfWeek, config.timeOfDay)}
                        </span>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={async () => {
                        const newPaused = !config.paused;
                        setConfig(prev => ({ ...prev, paused: newPaused }));
                        try {
                          await setDoc(doc(db, "site-settings", "newsletter_config"), { paused: newPaused }, { merge: true });
                        } catch (err) {
                          console.error("Failed to auto-save pause status:", err);
                        }
                      }}
                      className="mt-1 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 focus:outline-none"
                    >
                      {config.paused ? (
                        <>
                          <Play className="w-3 h-3 text-[#00573f] fill-current" />
                          <span>Resume Campaign</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 text-slate-500 fill-current" />
                          <span>Pause Campaign</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card 3: Target Audience */}
                  <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Audience</span>
                    <span className="font-semibold text-xs text-slate-700 mt-1">
                      {subscribers.filter(s => s.active).length} Active Subscribers &bull; {filteredPosts.length} updates included
                    </span>
                  </div>

                </div>

                {/* Collapsible Included Updates Accordion */}
                <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">
                  <button 
                    onClick={() => setShowIncludedPosts(!showIncludedPosts)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <span>List & Select LinkedIn Updates ({filteredPosts.length} Included / {posts.length} Total Candidates)</span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showIncludedPosts ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showIncludedPosts && (
                    <div className="border-t border-slate-200 p-6 bg-slate-50 flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-semibold px-1 pb-3 border-b border-slate-200">
                        <span>Select updates to include in campaign dispatch. By default, all updates are selected.</span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <button 
                            type="button"
                            onClick={async () => {
                              setConfig(prev => ({ ...prev, excludedPostIds: [] }));
                              if (db) {
                                await setDoc(doc(db, "site-settings", "newsletter_config"), { excludedPostIds: [] }, { merge: true });
                              }
                            }}
                            className="text-[#00573f] hover:underline"
                          >
                            Select All
                          </button>
                          <span className="text-slate-300">|</span>
                          <button 
                            type="button"
                            onClick={async () => {
                              const allIds = posts.map(p => p.id).filter(Boolean);
                              setConfig(prev => ({ ...prev, excludedPostIds: allIds }));
                              if (db) {
                                await setDoc(doc(db, "site-settings", "newsletter_config"), { excludedPostIds: allIds }, { merge: true });
                              }
                            }}
                            className="text-slate-500 hover:underline"
                          >
                            Deselect All
                          </button>
                        </div>
                      </div>

                      {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {posts.map((post, idx) => {
                            const isExcluded = (config.excludedPostIds || []).includes(post.id);
                            const postTime = typeof post.timestamp === 'number' ? post.timestamp : new Date(post.timestamp).getTime();
                            const isWithinRange = (() => {
                              const limit = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
                              limit.setHours(0, 0, 0, 0);
                              return postTime >= limit.getTime() - (config.filterDays ?? 15) * 24 * 60 * 60 * 1000;
                            })();
                            const isIncluded = !isExcluded && isWithinRange && filteredPosts.some(p => p.id === post.id);

                            return (
                              <div 
                                key={idx} 
                                onClick={() => handleTogglePost(post.id)}
                                className={`bg-white border rounded-xl p-4 flex flex-col gap-2.5 text-[11px] hover:border-slate-350 hover:shadow-sm transition-all cursor-pointer select-none ${
                                  isIncluded ? 'border-[#00573f]/30 ring-1 ring-[#00573f]/5' : 'border-slate-200 opacity-75'
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="checkbox"
                                      checked={!isExcluded}
                                      onChange={() => {}} // handled by parent onClick
                                      className="rounded border-slate-300 text-[#00573f] focus:ring-[#00573f] cursor-pointer"
                                    />
                                    <span className="font-bold text-[#00573f]">Update #{idx + 1}</span>
                                  </div>
                                  <span className="text-[9px] text-slate-400 font-medium">{post.date}</span>
                                </div>

                                <p className="text-slate-600 line-clamp-3 leading-relaxed font-sans">{post.text}</p>
                                
                                <div className="flex justify-between items-center gap-2 pt-2.5 border-t border-slate-100 mt-auto">
                                  <div className="flex gap-2 text-[9px] text-slate-400 font-bold">
                                    <span>👍 {post.likes}</span>
                                    <span>💬 {post.comments}</span>
                                  </div>

                                  {isIncluded && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-green-50 text-green-700 border border-green-250">
                                      Included
                                    </span>
                                  )}
                                  {isExcluded && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                      Excluded
                                    </span>
                                  )}
                                  {!isExcluded && !isWithinRange && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                      Out of Range
                                    </span>
                                  )}
                                  {!isExcluded && isWithinRange && !isIncluded && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                      Capped Limit
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center max-w-md mx-auto">
                          <p className="text-xs text-amber-700 font-semibold">⚠️ No updates found</p>
                          <p className="text-[10px] text-amber-600 mt-1">
                            No posts were fetched from LinkedIn. Please verify the LinkedIn integration status.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Centered Email Preview Container */}
                <div className="flex justify-center border border-slate-200 bg-slate-100 rounded-3xl overflow-hidden p-6 h-[750px]">
                  {loadingPosts ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-[#00573f]" />
                      <span className="text-xs text-slate-400">Compiling content nodes...</span>
                    </div>
                  ) : (
                    <div 
                      className={`bg-white border border-slate-300 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${
                        previewMode === 'mobile' ? 'w-[360px]' : 'w-full'
                      }`}
                    >
                      <iframe 
                        srcDoc={previewHtml}
                        className="w-full border-none h-full"
                        title="Visual digest layout email frame"
                      />
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab 2: Subscriber Management */}
            {activeTab === 'subscribers' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold tracking-tight font-display text-slate-800">Subscribers & Audience lists</h2>
                  <p className="text-xs text-slate-500 font-light">Monitor active subscriber sign-ups and manage email profiles.</p>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col gap-6">
                  
                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Search bar */}
                    <div className="relative max-w-sm w-full">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#00573f] text-slate-800"
                      />
                    </div>

                    {/* Manual add Form */}
                    <form onSubmit={handleAddSubscriber} className="flex gap-2">
                      <input 
                        type="email"
                        placeholder="Add subscriber email..."
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00573f] text-slate-800"
                      />
                      <button 
                        type="submit" 
                        disabled={submittingEmail}
                        className="bg-[#00573f] hover:bg-[#003d2b] text-white font-bold font-ui text-xs px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        {submittingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>Add User</span>
                      </button>
                    </form>
                  </div>

                  {/* Audience Data Grid */}
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold tracking-wider font-ui text-slate-400 uppercase">
                          <th className="p-3 pl-5">Email Address</th>
                          <th className="p-3">Opt-in Date</th>
                          <th className="p-3 text-center">Status</th>
                          <th className="p-3 text-right pr-5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {filteredSubscribers.length > 0 ? (
                          filteredSubscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 pl-5 font-semibold text-slate-700">{sub.email}</td>
                              <td className="p-3 text-slate-500">
                                {sub.subscribedAt?.seconds 
                                  ? new Date(sub.subscribedAt.seconds * 1000).toLocaleDateString('en-US', { dateStyle: 'medium' }) 
                                  : sub.subscribedAt 
                                    ? new Date(sub.subscribedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
                                    : 'Imported'
                                }
                              </td>
                              <td className="p-3 text-center">
                                <button 
                                  onClick={() => toggleSubscriber(sub)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    sub.active 
                                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                                      : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${sub.active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                  {sub.active ? 'Active' : 'Unsubscribed'}
                                </button>
                              </td>
                              <td className="p-3 text-right pr-5">
                                <button 
                                  onClick={() => deleteSubscriber(sub.id)}
                                  className="p-1 rounded-full hover:bg-red-500/10 text-slate-400 hover:text-red-600 transition-colors"
                                  title="Delete Subscriber"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-400">
                              {searchQuery ? "No matching records found." : "No registered email subscribers."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary count */}
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wide border-t border-slate-100 pt-4">
                    <span>Active Subscribers: {subscribers.filter(s => s.active).length}</span>
                    <span>Total Database: {subscribers.length}</span>
                  </div>

                </div>

              </div>
            )}

            {/* Tab 3: Custom Compose Email (Placeholder) */}
            {activeTab === 'manual' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold tracking-tight font-display text-slate-800">Compose Manual Email Campaign</h2>
                  <p className="text-xs text-slate-500 font-light font-sans">Draft and distribute custom styled email campaigns directly to your subscribers.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Form */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Subject Line</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Navigating Bank Mergers Operations: 2026 Core Integration Report" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Preheader Preview text</label>
                          <input 
                            type="text" 
                            placeholder="Three operational priorities for Day 1 readiness." 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Accent Theme</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f]">
                            <option>Primary Green (#00573f)</option>
                            <option>Accent Light (#98cc67)</option>
                            <option>Executive Blue (#0066f5)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold font-ui text-slate-500 mb-1.5 uppercase">Email Body Content (Markdown/HTML supported)</label>
                        <textarea 
                          rows={6}
                          placeholder="Write custom content here..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 focus:outline-none focus:border-[#00573f] font-mono"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button 
                          disabled 
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-400 font-bold font-ui text-xs py-3 rounded-xl transition-all cursor-not-allowed border border-slate-200"
                        >
                          Send Test
                        </button>
                        <button 
                          disabled 
                          className="flex-1 bg-[#00573f] text-white font-bold font-ui text-xs py-3 rounded-xl transition-all opacity-50 cursor-not-allowed shadow-sm"
                        >
                          Send Campaign
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Right editor Canvas preview placeholder */}
                  <div className="lg:col-span-5 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-white">
                    <Sparkles className="w-8 h-8 text-[#00573f] mb-3 opacity-60" />
                    <h4 className="font-semibold text-sm text-slate-800 mb-2">Live Editor Dashboard</h4>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
                      Entering text on the left will compile and render a fully branded responsive email layout in real-time.
                    </p>
                    <div className="w-full bg-slate-50 h-32 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                      [PREVIEW CANVAS NOT CONNECTED]
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* Tab 4: ABM Bank Prospecting & Lead Search (Placeholder) */}
            {activeTab === 'abm' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight font-display text-slate-800">ABM Target Bank Prospecting</h2>
                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider font-ui border border-slate-300">Placeholder</span>
                  </div>
                  <p className="text-xs text-slate-500 font-light">Identify banks and senior operating stakeholders by core banking system installations.</p>
                </div>

                {/* Filter mockups */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col gap-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold font-ui text-slate-400 uppercase tracking-wide">Core Banking Systems</label>
                      <select disabled className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed">
                        <option>AFSVision (Automated Financial Systems)</option>
                        <option>Loan IQ (Finastra)</option>
                        <option>Temenos Transact</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold font-ui text-slate-400 uppercase tracking-wide">US Asset Tier</label>
                      <select disabled className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed">
                        <option>Regional US ($10B - $100B Assets)</option>
                        <option>National US (+$100B Assets)</option>
                        <option>Community banking</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-bold font-ui text-slate-400 uppercase tracking-wide">Target Executive</label>
                      <select disabled className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed">
                        <option>Chief Operating Officer / COO</option>
                        <option>Head of Commercial Lending Operations</option>
                        <option>VP Operations Transformation</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 justify-end">
                      <button disabled className="w-full bg-[#00573f] text-white font-bold font-ui text-xs py-2 rounded-xl opacity-40 cursor-not-allowed flex items-center justify-center gap-1">
                        <span>Prospect Database</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Grid mockup lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                    
                    {/* Institutions list */}
                    <div className="flex flex-col gap-3 text-left">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#00573f]" />
                        Key Target Institutions
                      </h4>

                      {[
                        { name: "Providence National Bank", size: "$35B Assets", system: "AFSVision System", region: "RI, United States" },
                        { name: "Pioneer Bank Group", size: "$72B Assets", system: "Finastra Migrate", region: "TX, United States" },
                        { name: "Valley State Credit", size: "$11B Assets", system: "AFSVision Legacy", region: "CA, United States" }
                      ].map((bank, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors">
                          <div>
                            <h5 className="font-semibold text-xs text-slate-700">{bank.name}</h5>
                            <p className="text-[9px] text-slate-400 mt-1">{bank.size} &bull; {bank.region}</p>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-0.5 bg-[#00573f]/10 text-[#00573f] rounded-full border border-[#00573f]/15">
                            {bank.system}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Key leads list */}
                    <div className="flex flex-col gap-3 text-left">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <UserSquare2 className="w-3.5 h-3.5 text-[#00573f]" />
                        Target Business Leads
                      </h4>

                      {[
                        { name: "Jennifer Connelly", role: "Head of Lending Tech Services", company: "Providence National Bank", type: "2nd Degree" },
                        { name: "David Hasselhoff", role: "Director of System Migrations", company: "Pioneer Bank Group", type: "Outreached" },
                        { name: "Eleanor Vance", role: "Chief Commercial Credit Officer", company: "Valley State Credit", type: "1st Degree" }
                      ].map((lead, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition-colors">
                          <div>
                            <h5 className="font-semibold text-xs text-slate-700">{lead.name}</h5>
                            <p className="text-[9px] text-slate-400 mt-0.5">{lead.role}</p>
                            <p className="text-[8px] text-slate-400 mt-0.5">{lead.company}</p>
                          </div>
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                            lead.type === '1st Degree' 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : lead.type === 'Outreached' 
                                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                                : 'bg-slate-200 text-slate-500'
                          }`}>
                            {lead.type}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Integration Call Banner */}
                  <div className="rounded-2xl border border-[#00573f]/15 bg-[#00573f]/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                    <div className="flex flex-col gap-1 max-w-xl">
                      <h5 className="font-semibold text-[#00573f] text-xs flex items-center gap-1.5">
                        💡 LinkedIn Lead & Marketing API Integrations
                      </h5>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                        Enable CRM webhooks or configure the LinkedIn Marketing Developer OAuth tokens to active-prospect commercial banking leaders. Connect contact records with our email newsletter compiler.
                      </p>
                    </div>
                    <button disabled className="bg-[#00573f] text-white font-bold font-ui text-xs px-5 py-3 rounded-xl opacity-40 cursor-not-allowed whitespace-nowrap">
                      Connect Integration
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        </main>
      </div>
  );
}
