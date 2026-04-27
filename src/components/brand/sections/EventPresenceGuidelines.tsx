"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, CheckCircle2, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";

// -------------------------------------------------------------
// VISUAL WIREFRAME COMPONENTS
// -------------------------------------------------------------

import { TradeshowPreWireframe, TradeshowLiveWireframe, TradeshowPostWireframe } from "./event-wireframes/TradeshowWireframes";
import { RoundtablePreWireframe, RoundtableLiveWireframe, RoundtablePostWireframe } from "./event-wireframes/RoundtableWireframes";
import { VipPreWireframe, VipLiveWireframe, VipPostWireframe } from "./event-wireframes/VipWireframes";

// -------------------------------------------------------------
// MAIN COMPONENT & STATE MATRIX
// -------------------------------------------------------------

type MatrixStep = "pre" | "live" | "post";
type EventTier = "tradeshows" | "roundtables" | "vip";

const EVENT_MATRIX = {
  tradeshows: {
    pre: {
      logistics: [
        { title: "Define Enterprise-Grade ROI KPIs", detail: "<p>When dealing with six-figure deal sizes, the traditional tradeshow playbook of mass badge-scanning is a waste of resources. Volume is vanity; pipeline is sanity. Metrics must be locked in prior to deployment and strictly index on account penetration and pipeline velocity.</p><div class='mt-5 overflow-hidden border border-primary/10 rounded-lg shadow-sm'><table class='w-full text-left text-sm'><thead class='bg-neutral-50/50 border-b border-primary/10 text-[10px] uppercase tracking-widest text-muted-foreground font-mono'><tr><th class='p-3 font-semibold'>Phase</th><th class='p-3 font-semibold'>Target Metric</th><th class='p-3 font-semibold'>Volume</th><th class='p-3 font-semibold'>Directive</th></tr></thead><tbody class='divide-y divide-black/5 bg-white'><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-primary text-xs align-top bg-primary/5 border-b border-black/5' rowspan='2'>Pre-Event</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Pre-Booked Meetings</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>8–12</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>Per Account Exec. Built before boarding flight.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Account Coverage</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>25%+</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Must secure touchpoints with 1/4 of VIP accounts.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-[#009677] text-xs align-top bg-[#009677]/10 border-b border-black/5' rowspan='2'>Live Floor</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Net-New ICP Scans</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>25–40</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>Disqualify non-fit actively. High buying capacity only.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Executive Intros</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>3–5</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Net-new VP+ or C-suite introductions.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground-800 text-xs align-top bg-neutral-100' rowspan='2'>Post-Event</td><td class='p-3 font-semibold text-foreground align-top pt-4'>Sourced Pipeline</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pt-4'>3x ROI</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pt-4'>New qualified pipe to cover 3x total travel/sponsorship cost.</td></tr><tr class='group hover:bg-primary/5 transition-colors'><td class='p-3 font-semibold text-foreground align-top pb-4'>Accelerated Pipe</td><td class='p-3 text-primary font-mono font-bold tracking-tight align-top pb-4'>$500k+</td><td class='p-3 text-muted-foreground text-xs leading-tight align-top pb-4'>Face-to-face unlocks to push stalled deals to proposal.</td></tr></tbody></table></div>" },
        { title: "Create Target Account List", detail: "<p>A Target Account List (TAL) is our strategic map of the exact enterprise companies and executive attendees we absolutely must engage while on the show floor. Identifying these critical targets cannot be a solo activity; it requires a cross-functional intelligence-gathering exercise to uncover hidden internal connections and orchestrate warm introductions.</p><div class='mt-6 ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 1: The Data Merge</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Cross-reference the attendee list with the CRM. Flag active pipeline deals, Tier 1 whitespace, and highly engaged closed-lost accounts.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 2: Relationship Mapping</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Use standard LinkedIn search and executive networks to manually map our org chart against the attendee list. Identify who internally possesses a 1st or 2nd-degree connection to the target attendees. A warm executive intro is our primary weapon.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Step 3: The GTM Sync</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Bring the compiled intelligence to the regular GTM meeting at T-Minus 14 days. Reps claim accounts, assign outreach cadences, and formally request internal warm introductions.</span></div></div></div>" },
        { title: "Strategic Pre-Booking Protocol", detail: "<p class='mb-5'>Maximize event ROI by treating the tradeshow as a geographically convenient venue for strategic alignment with key banking accounts.</p><div class='grid grid-cols-1 md:grid-cols-3 gap-4'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><rect width='18' height='18' x='3' y='4' rx='2' ry='2'/><line x1='16' x2='16' y1='2' y2='6'/><line x1='8' x2='8' y1='2' y2='6'/><line x1='3' x2='21' y1='10' y2='10'/></svg></div><strong class='text-foreground mb-1 block text-base'>The 60/40 Portfolio</strong><span class='text-primary text-2xl font-display font-bold block mb-3 tracking-tight'>60% Locked</span><span class='text-muted-foreground text-sm leading-relaxed block'>Lock 60% of your calendar with targeted, high-value meetings before wheels up. Preserve the remaining 40% strictly for organic executive introductions, competitive intelligence gathering, and on-the-floor agility.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><rect width='20' height='14' x='2' y='7' rx='2' ry='2'/><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Discovery</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Gap Analysis</span><span class='text-muted-foreground text-sm leading-relaxed block'>Frame your outreach around high-level strategic value rather than product features. Invite target accounts to a closed-door \"Discovery\" or \"Gap Analysis Session\" focused on their specific banking architecture and market challenges.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm text-center flex flex-col items-center hover:border-primary/30 transition-colors'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' class='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Hook</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Insight-Led</span><span class='text-muted-foreground text-sm leading-relaxed block'>Activate the warm introductions generated during the GTM sync. Anchor your outreach in bespoke, account-specific insights—such as recent M&A activity, core banking modernization efforts, or regulatory shifts—to secure the meeting.</span></div></div>" }
      ],
      wireframe: <TradeshowPreWireframe />
    },
    live: {
      logistics: [
        { title: "Live Floor Execution Protocol", detail: "<p class='mb-6'>The public floor is for rapid qualification and immediate filtration. Volume is not the goal; architectural alignment is.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Targeted Intercept Protocol</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Do not passively wait behind a counter. Executive Consultants must proactively monitor the aisles for personas matching our Target Account List (TAL). Look for specific badge titles (CIO, VP of Digital, Head of Core Modernization) and intercept with peer-level confidence, not a sales pitch.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The 3-Question Disqualification</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Your goal on the public floor is to disqualify non-buyers immediately. Do not conduct product demos. Ask three sharp, architectural questions to gauge their current core banking state. If they are not a fit, scan their badge for marketing nurture and politely release them.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Annex Transition</strong><span class='text-muted-foreground text-sm leading-relaxed block'>If the prospect reveals a critical pain point and fits our ICP, do not attempt to close them on the noisy floor. Scan their badge, capture contextual CRM notes, and seamlessly transition them into the Private Strategy Annex for a focused, closed-door Executive Briefing.</span></div></div></div>" }
      ],
      wireframe: <TradeshowLiveWireframe />
    },
    post: {
      logistics: [
        { title: "Post-Event Sequencing Protocol", detail: "<p class='mb-6'>The event does not end when the floor closes. Speed to value and hyper-relevant context are the only ways to convert tradeshow interactions into actual closed-won pipeline.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Triage &amp; CRM Enrichment (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Mandate strict data hygiene. All intercepted lead data and Annex notes must be synced to Salesforce. Segment into \"Executive Track\" vs. \"Standard Nurture.\"</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Value-Add Anchor (T+48 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Avoid generic \"thanks for stopping by\" messaging. The first touchpoint must deliver a specific strategic asset (e.g., a whitepaper, case study, or compliance brief) that maps directly to the pain point discussed in the Annex.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Account Multi-Threading (T+7 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Map the buying committee. Leverage the initial tradeshow contact to gain introductions to technical, financial, and compliance stakeholders.</span></div></div></div>" }
      ],
      wireframe: <TradeshowPostWireframe />
    }
  },
  roundtables: {
    pre: {
      logistics: [
        { title: "Executive Alignment Protocol", detail: "<div class='grid grid-cols-1 md:grid-cols-3 gap-5 mt-2'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><circle cx='22' cy='11' r='2'/><path d='M22 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg></div><strong class='text-foreground mb-1 block text-base'>Audience Curation Mandate</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Strict 1:4 Ratio</span><span class='text-muted-foreground text-sm leading-relaxed block'>Enforce a strict 1:4 ratio of internal SMEs to external executives. No delegations, no \"plus-ones.\" We politely but firmly decline if the target attendee attempts to delegate downwards.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2v4a2 2 0 0 0 2 2h4'/><path d='M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z'/><path d='M20 18v-2a4 4 0 0 0-4-4H4'/><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/></svg></div><strong class='text-foreground mb-1 block text-base'>Executive Briefing Asset</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>T-Minus 72 Hours</span><span class='text-muted-foreground text-sm leading-relaxed block'>We do not send agenda bullet points. Distribute a highly researched, 2-page briefing document to establish the intellectual baseline before the call. Ensure all attendees enter the room primed for peer dialogue.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='4'/><line x1='21.17' y1='8' x2='12' y2='8'/><line x1='3.95' y1='6.06' x2='8.54' y2='14'/><line x1='10.88' y1='21.94' x2='15.46' y2='14'/></svg></div><strong class='text-foreground mb-1 block text-base'>Technical Fidelity Audit</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Studio Production</span><span class='text-muted-foreground text-sm leading-relaxed block'>Executive presence requires technical perfection. Mandate hardwired ethernet connections, dedicated external microphones, and sterile, professional background environments for all internal hosts.</span></div></div>" }
      ],
      wireframe: <RoundtablePreWireframe />
    },
    live: {
      logistics: [
        { title: "Virtual Facilitation Architecture", detail: "<p class='mb-6'>A high-end roundtable thrives on engineered tension. Control the flow ruthlessly but invisibly.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Orchestrated Hook (0-10 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Establish the Chatham House Rule immediately. Execute a highly curated round-robin introduction where the internal host connects the disparate backgrounds of the four guest executives to create instant peer respect.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Contrarian Pivot (10-25 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>We do not present slide decks. The Subject Matter Expert (SME) must introduce a single, contrarian thesis regarding market liquidity or compliance to instantly spark peer debate. Make them disagree.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Tactical Moderation &amp; Mapping (25-60 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Execute the \"Listen &amp; Map\" protocol. The host's primary job is to fade into the background, tracking points of agreement and friction between the external executives to leverage for highly-targeted post-event multi-threading.</span></div></div></div>" }
      ],
      wireframe: <RoundtableLiveWireframe />
    },
    post: {
      logistics: [
        { title: "Post-Event Amplification Protocol", detail: "<p class='mb-6'>The roundtable is simply the ignition sequence. The true value lies in how you leverage the peer insights to execute highly personalized, asynchronous follow-ups.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Executive Synthesis (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Draft a strict \"Chatham House\" summary of the session. Highlight the macro-frictions and consensus points discussed, strictly anonymizing all external executive quotes.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Bespoke 1:1 Pivot (T+48 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Outline the protocol for individual outreach. The internal host must reference a specific contrarian point the target executive made during the roundtable to seamlessly pivot into an invitation for a private, customized boardroom deep dive.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Pipeline &amp; Intelligence Sync (T+72 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Mandate the extraction of strategic intelligence. Update Salesforce with the newly established peer-to-peer relationship dynamics and tag any exposed legacy infrastructure or liquidity risks discussed.</span></div></div></div>" }
      ],
      wireframe: <RoundtablePostWireframe />
    }
  },
  vip: {
    pre: {
      logistics: [
        { title: "VIP Engagement Protocol", detail: "<div class='grid grid-cols-1 md:grid-cols-3 gap-5 mt-2'><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2v4a2 2 0 0 0 2 2h4'/><path d='M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z'/><path d='M20 18v-2a4 4 0 0 0-4-4H4'/><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Intelligence Dossier</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Mandatory 14 Days Out</span><span class='text-muted-foreground text-sm leading-relaxed block'>We go beyond LinkedIn. Profile current board seats, recent M&amp;A involvement, philanthropic overlap, and macro-headwinds specific to their sector. Know exactly who enters the room.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg></div><strong class='text-foreground mb-1 block text-base'>Hyper-Personalized Logistics</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>The White Glove Mandate</span><span class='text-muted-foreground text-sm leading-relaxed block'>Orchestrate bespoke transit (e.g., black car service directly to venue), precise dietary/allergy mapping, and discreet security clearing if applicable. Eliminate all friction.</span></div><div class='bg-neutral-50/50 border border-primary/10 p-5 rounded-xl shadow-sm hover:border-primary/30 transition-colors flex flex-col items-center text-center'><div class='w-12 h-12 bg-white rounded-full border border-primary/10 shadow-sm flex items-center justify-center mb-4 text-primary'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='14' x='2' y='5' rx='2'/><line x1='2' x2='22' y1='10' y2='10'/></svg></div><strong class='text-foreground mb-1 block text-base'>The Physical Touchpoint</strong><span class='text-primary text-xs tracking-widest font-mono font-bold uppercase block mb-3 mt-1 border-y border-primary/10 py-1.5'>Zero Digital Invites</span><span class='text-muted-foreground text-sm leading-relaxed block'>We do not send generic recurring calendar invites for VIP engagements. Execute hand-delivered, high-weight cardstock invitations or secure physical parcel delivery.</span></div></div>" }
      ],
      wireframe: <VipPreWireframe />
    },
    live: {
      logistics: [
        { title: "Private Dining Facilitation", detail: "<p class='mb-6'>A private executive dinner must feel entirely organic, disguising a highly orchestrated strategic maneuver. Never leave seating to chance.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Strategic Seating Choreography (0-15 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Strict mandate: Internal executives never sit next to each other. We use the \"Interleaved Anchor\" method, surrounding high-value target executives with complementary internal SMEs to control the narrative flow.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Organic Anchor (15-90 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Absolute zero-pitch environment. No decks, no collateral. Discussion must remain strictly on macro-economics, sector headwinds, and personal affinities discovered in the dossier. Build pure relationship equity.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Quiet Extraction (90-120 Min)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>The departure phase is critical. Hosts must extract a specific, actionable follow-up commitment (e.g., \"I'll have my team send over that liquidity framework we discussed\") before the target executive enters their car.</span></div></div></div>" }
      ],
      wireframe: <VipLiveWireframe />
    },
    post: {
      logistics: [
        { title: "VIP Escalation Protocol", detail: "<p class='mb-6'>The VIP event was merely the catalyst. Post-event execution must be ruthlessly fast, highly personalized, and immediately tied to active pipeline velocity.</p><div class='ml-2 space-y-6 border-l-2 border-primary/20 pl-6 relative pb-2'><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>1</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Concierge Continuation (T+24 Hours)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Automated emails are strictly prohibited. Mandate the delivery of a physical, handwritten note from the internal host on premium cardstock, referencing a specific personal affinity or contrarian insight discussed during the dinner.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>2</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>The Private Boardroom Briefing (T+5 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Deliver on the \"Quiet Extraction.\" If a bespoke liquidity framework was promised, hand-deliver it or present it via a secure, 1:1 telepresence session. No generic collateral.</span></div></div><div class='relative'><div class='absolute -left-[37px] top-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-white dark:ring-background'>3</div><div class='bg-neutral-50/50 border border-neutral-100 hover:border-primary/20 transition-colors p-4 rounded-lg shadow-sm'><strong class='text-foreground block mb-1 text-base'>Deal Desk Escalation (T+7 Days)</strong><span class='text-muted-foreground text-sm leading-relaxed block'>Internal sync protocol. The target account must be formally upgraded in Salesforce, forecast stages updated to \"Commit\" or \"Best Case,\" and the broader Deal Desk mobilized for bespoke pricing models.</span></div></div></div>" }
      ],
      wireframe: <VipPostWireframe />
    }
  }
};

const PHASE_METADATA = {
  tradeshows: {
    pre: "T-Minus 30",
    live: "The Floor",
    post: "The Sequence"
  },
  roundtables: {
    pre: "Targeted Invites",
    live: "The Workshop",
    post: "Intelligence Sync"
  },
  vip: {
    pre: "Golden Ticket",
    live: "The Experience",
    post: "Premium Gifting"
  }
};

export function EventPresenceGuidelines() {
  const [activeTier, setActiveTier] = useState<EventTier>("tradeshows");
  const [activeStep, setActiveStep] = useState<MatrixStep>("pre");
  
  // Custom Accordion Tracker mapping multiple logistics arrays cleanly
  const [expandedLogisticsItem, setExpandedLogisticsItem] = useState<number | null>(0);

  // When changing tiers or steps, reset the accordion to the top item to avoid empty states
  const handleStepChange = (step: MatrixStep) => {
     setActiveStep(step);
     setExpandedLogisticsItem(0);
  }
  const handleTierChange = (tier: EventTier) => {
     setActiveTier(tier);
     setActiveStep("pre");
     setExpandedLogisticsItem(0);
  }

  const payload = EVENT_MATRIX[activeTier][activeStep];

  return (
    <section id="event-presence-guidelines" className="w-full space-y-12 animate-in fade-in duration-500">
      
      {/* 1. Header Area */}
      <div className="space-y-3 pb-2">
        <h2 className="text-3xl font-semibold tracking-tighter text-primary font-heading">
          Event Presence & Field Operations
        </h2>
        <p className="text-lg text-muted-foreground font-sans max-w-3xl leading-relaxed">
          The physical operationalization of the Bridge2Partners narrative. We execute across three rigid tiers, ensuring our brand shows up with maximum impact and strict structural governance across all phases.
        </p>
      </div>

      {/* 2. Macro Filter (Tiers) - Underline Tabs */}
      <div className="w-full mb-8">
         <Tabs value={activeTier} onValueChange={(val) => handleTierChange(val as EventTier)} className="w-full">
            <TabsList className="flex items-center justify-start gap-8 border-b border-primary/10 w-full rounded-none bg-transparent p-0 h-auto overflow-x-auto custom-scrollbar">
               <TabsTrigger value="tradeshows" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🎪 Tradeshows</TabsTrigger>
               <TabsTrigger value="roundtables" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🎙️ Peers in Practice</TabsTrigger>
               <TabsTrigger value="vip" className="rounded-none border-b-2 border-transparent py-3 px-0 text-sm md:text-base font-semibold tracking-wide data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent transition-all text-muted-foreground hover:text-foreground">🍸 VIP Experiences</TabsTrigger>
            </TabsList>
         </Tabs>
      </div>

      {/* 3. The Playbook Matrix Payload */}
      <div className="flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-500" key={activeTier}>
         
         {/* Internal Timeline Stepper (Glass Navigation Pill) */}
         <div className="w-full mb-8 flex justify-start">
            <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-2 border border-white/40 dark:border-primary/20 bg-white/30 dark:bg-background/40 backdrop-blur-xl shadow-md rounded-full w-max">
               <span className="font-ui font-bold text-[10px] md:text-xs uppercase tracking-widest mx-2 text-foreground/50 hidden sm:inline-block">Phase</span>
               {[{id: "pre", label: "Pre-Event"}, {id: "live", label: "Live Execution"}, {id: "post", label: "Post-Event"}].map((step) => {
                  const isActive = activeStep === step.id;
                  const dateLabel = PHASE_METADATA[activeTier][step.id as MatrixStep];
                  return (
                    <button 
                      key={step.id}
                      onClick={() => handleStepChange(step.id as MatrixStep)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                         "flex items-center gap-2.5 rounded-full py-2 px-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                         isActive 
                           ? "bg-primary text-white shadow-sm" 
                           : "text-foreground/70 hover:bg-white/50 dark:hover:bg-neutral-800 hover:text-foreground"
                      )}
                    >
                       <span className={cn("text-[9px] font-mono tracking-widest uppercase font-bold hidden md:inline-block", isActive ? "text-white/70" : "text-muted-foreground")}>{dateLabel}</span>
                       <div className={cn("w-1 h-1 rounded-full hidden md:block", isActive ? "bg-white/50" : "bg-neutral-300")} />
                       <span className="text-xs md:text-sm font-ui font-semibold">{step.label}</span>
                    </button>
                  )
               })}
            </div>
         </div>

         {/* Vertical Stack Content Area */}
         <div className="flex flex-col gap-12 pb-12 w-full animate-in slide-in-from-bottom-4 duration-300" key={activeStep}>
            
            {/* Top Section: Logistical Action Plan */}
            <div className="space-y-4 w-full">
               <h4 className="font-ui font-semibold tracking-tight text-foreground flex items-center gap-2 pb-2 border-b border-primary/10">
                 <CheckCircle2 className="w-5 h-5 text-primary" /> Logistical Playbook
               </h4>
               <div className="bg-white/60 dark:bg-card backdrop-blur-md rounded-xl border border-primary/10 p-2 shadow-sm flex flex-col gap-1 w-full">
                  {payload.logistics.map((item, index) => {
                     const isExpanded = expandedLogisticsItem === index;
                     return (
                        <div key={index} className={cn("group flex flex-col rounded-lg transition-all duration-300 border", isExpanded ? "bg-white dark:bg-muted/10 shadow-sm border-neutral/10" : "border-transparent")}>
                           <button
                             onClick={() => setExpandedLogisticsItem(isExpanded ? null : index)}
                             aria-expanded={isExpanded}
                             className="flex items-center justify-between w-full p-4 transition-all duration-300 rounded-lg text-left outline-none hover:bg-neutral/5 focus-visible:ring-2 focus-visible:ring-primary/50"
                           >
                              <div className="flex items-center gap-3">
                                <div className={cn("p-1.5 rounded-lg flex items-center justify-center transition-colors min-w-[32px] min-h-[32px]", isExpanded ? "bg-primary/10 text-primary" : "bg-neutral/5 text-muted-foreground")}>
                                  <span className="font-mono text-xs font-bold">{index + 1}</span>
                                </div>
                                <span className={cn("font-ui font-semibold text-sm sm:text-base transition-colors", isExpanded ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>
                                  {item.title}
                                </span>
                              </div>
                              <ChevronDown className={cn("w-4 h-4 text-foreground/40 transition-transform duration-300", isExpanded ? "rotate-180 text-primary" : "")} />
                           </button>
                           <div className={cn("overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]", isExpanded ? "max-h-[800px]" : "max-h-0")}>
                             <div 
                               className="p-4 pt-0 pl-14 text-muted-foreground font-sans text-sm leading-relaxed"
                               dangerouslySetInnerHTML={{ __html: item.detail }}
                             />
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>

            {/* Bottom Section: Visual Specs */}
            <div className="space-y-4 w-full">
               <h4 className="font-ui font-semibold tracking-tight text-foreground flex items-center gap-2 pb-2 border-b border-primary/10">
                 <LayoutTemplate className="w-5 h-5 text-primary" /> Visual Spec
               </h4>
               <div className="bg-neutral-50/50 dark:bg-card/50 rounded-xl border border-primary/10 p-6 flex items-center justify-center min-h-[320px]">
                  {payload.wireframe}
               </div>
            </div>

         </div>

      </div>

    </section>
  );
}
