import { HelpCircle, CheckCircle, AlertTriangle, XCircle, Download } from "lucide-react";
import Image from "next/image";

export function VisualIdentity() {
  return (
    <section id="visual-identity" className="space-y-8 pt-8 scroll-mt-20">
      <div className="space-y-2 border-b border-neutral/10 pb-4">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Visual Identity
        </h2>
        <p className="text-neutral/80">
          Our core color palette and typography rules ensure accessibility across all digital properties.
        </p>
      </div>

      {/* Brand Marks & Photography Container */}
      <div className="space-y-6 pt-2 pb-8 border-b border-neutral/10">
        <h3 className="text-xl font-bold font-heading text-neutral">Brand Marks &amp; Photography</h3>
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          
          {/* Logo Constraint */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 shadow-sm overflow-hidden mix-blend-normal">
            <h4 className="font-ui font-bold text-primary tracking-tight text-lg mb-2">The Canonical Mark</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
               {/* Left Column (Light Mode) */}
               <div className="flex flex-col gap-2">
                 <div className="bg-white p-6 rounded-lg flex items-center justify-center border border-neutral/10 shadow-sm min-h-[140px]">
                   <Image src="/images/Bridge2Partners_Brand_Logo_v7.webp" alt="Bridge2Partners Primary Logo" width={200} height={60} className="w-full max-w-[160px] h-auto object-contain" />
                 </div>
                 <a href="/images/Bridge2Partners_Brand_Logo_v7.webp" download className="flex items-center justify-center gap-2 text-xs font-medium text-neutral/70 hover:text-primary transition-colors py-2 bg-neutral/5 rounded-md border border-neutral/10">
                   <Download className="w-3.5 h-3.5" /> Primary
                 </a>
               </div>
               
               {/* Right Column (Dark/Glass Mode) */}
               <div className="flex flex-col gap-2">
                 <div className="bg-[#005642] p-6 rounded-lg flex items-center justify-center border border-primary/20 shadow-inner min-h-[140px]">
                   <Image src="/images/Bridge2Partners_Logo-3-White.png" alt="Bridge2Partners Reversed Logo" width={200} height={60} className="w-full max-w-[160px] h-auto object-contain" />
                 </div>
                 <a href="/images/Bridge2Partners_Logo-3-White.png" download className="flex items-center justify-center gap-2 text-xs font-medium text-neutral/70 hover:text-primary transition-colors py-2 bg-neutral/5 rounded-md border border-neutral/10">
                   <Download className="w-3.5 h-3.5" /> Reversed
                 </a>
               </div>
            </div>

            <p className="text-sm text-neutral/80 mt-6 leading-relaxed font-sans pb-2">
              <strong className="text-neutral">Clear Space Rule:</strong> Always maintain a protective boundary around the logo equal to the width of the &apos;B&apos;. <br/><br/>
              The mark must physically anchor the top-left of SaaS dashboards or the exact optical center of presentation covers. Avoid over-scaling.
            </p>

            <div className="mt-4 pt-6 border-t border-neutral/10 flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold text-neutral/50 uppercase tracking-widest shrink-0">Secondary Assets:</span>
              <div className="bg-white p-2 rounded flex items-center justify-center border border-neutral/10 shadow-sm w-[44px] h-[44px] shrink-0">
                <Image src="/icon-brand.png" alt="Bridge2Partners Icon" width={32} height={32} className="w-full h-auto object-contain" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a href="/icon-brand.png" download className="flex items-center justify-center gap-2 text-xs font-medium text-neutral/70 hover:text-primary transition-colors py-1.5 px-3 bg-neutral/5 rounded border border-neutral/10 outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <Download className="w-3.5 h-3.5" /> Icon Mark
                </a>
                <a href="https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners%20Logo-2-Black.png?alt=media&token=8bc5af5c-85fb-4782-acf5-73f9db67f1f8" download target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-xs font-medium text-neutral/70 hover:text-neutral transition-colors py-1.5 px-3 bg-neutral/5 rounded border border-neutral/10 outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <Download className="w-3.5 h-3.5" /> Black Version (PNG)
                </a>
              </div>
            </div>
          </div>

          {/* Photography Constraints */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 shadow-sm">
            <h4 className="font-ui font-bold text-primary tracking-tight text-lg mb-2">Team Photography</h4>
            <div className="grid grid-cols-2 gap-4 mt-6">
               {/* Approved Cropping Example */}
               <div className="bg-[#059669]/5 p-6 rounded-lg flex flex-col items-center justify-center border border-[#059669]/20 gap-4 transition-all">
                 <div className="flex items-center gap-2 text-[#059669] font-bold font-ui text-sm">
                   <CheckCircle className="w-4 h-4" /> APPROVED
                 </div>
                 <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white grayscale pointer-events-none shadow-md ring-4 ring-[#059669]/20">
                   <Image src="/images/Gemini_Generated_Image_d6dv7zd6dv7zd6dv.jpeg" alt="Approved Cropping Example" fill className="object-cover" />
                 </div>
               </div>
               
               {/* Incorrect Cropping Example */}
               <div className="bg-[#dc2626]/5 p-6 rounded-lg flex flex-col items-center justify-center border border-[#dc2626]/20 gap-4 transition-all">
                 <div className="flex items-center gap-2 text-[#dc2626] font-bold font-ui text-sm">
                   <XCircle className="w-4 h-4" /> TIGHT CROP
                 </div>
                 <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white mix-blend-luminosity pointer-events-none shadow-md ring-4 ring-[#dc2626]/20">
                   <Image src="/images/Tony_Lockhard_Bridge2Partners_Classic_Headshot.jpeg" alt="Incorrect Cropping Example" fill className="object-cover" />
                 </div>
               </div>
            </div>
            <p className="text-sm text-neutral/80 mt-6 leading-relaxed font-sans">
              <strong className="text-neutral">Breathable Cropping:</strong> Never crop aggressively tight onto faces. Allow environmental headroom. <br/><br/>
              <strong className="text-neutral">Tone Rules:</strong> All team headshots and corporate imagery must be subjected to a cool-toned filter (<code>mix-blend-luminosity</code> or <code>grayscale</code>) to sit homogenously within our AI-ready glassmorphic architecture. Raw, unedited color photography shatters the UI immersion.
            </p>
          </div>

        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold font-heading text-neutral">Color Palette</h3>
        <p className="text-sm text-neutral/70 flex items-center flex-wrap gap-1 relative z-10">
          Always ensure 
          <span className="relative group inline-flex items-center cursor-help text-primary font-medium border-b border-primary/30 border-dashed pb-[1px]">
            WCAG AAA compliance
            <HelpCircle className="w-3.5 h-3.5 ml-1 text-primary/70" />
            
            {/* Premium Glassmorphic Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-white/95 backdrop-blur-md border border-neutral/10 text-neutral text-xs rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none text-left leading-relaxed">
              <strong className="block font-bold text-primary font-heading text-sm mb-1">Web Content Accessibility Guidelines (AAA)</strong>
              The highest standard of accessibility mapping. Demands a strict contrast ratio of at least 7:1 for normal text, ensuring legibility for users with severe vision impairment.
              
              {/* Tooltip Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white border-t-neutral/10" />
            </span>
          </span> 
          when positioning these colors against our light-mode background.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ColorSwatch name="Primary" hex="#00573f" className="bg-[#00573f]" textColor="text-white" showTints />
          <ColorSwatch name="Secondary" hex="#009677" className="bg-[#009677]" textColor="text-white" showTints />
          <ColorSwatch name="Tertiary" hex="#001b15" className="bg-[#001b15]" textColor="text-white" showTints />
          <ColorSwatch name="Neutral" hex="#3d4645" className="bg-[#3d4645]" textColor="text-white" showTints />
        </div>

        <div className="space-y-4 pt-8">
          <h4 className="text-md font-bold font-heading text-neutral uppercase tracking-widest">Approved Gradients</h4>
          <p className="text-sm text-neutral/70">
            For use in data visualization or subtle emphasis. Gradients must exclusively flow Dark to Light and maintain strict WCAG AAA contrast for any superimposed typography.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GradientSwatch name="Primary Depth" gradient="bg-gradient-to-br from-[#001b15] to-[#00573f]" description="Tertiary to Primary" />
            <GradientSwatch name="Secondary Lift" gradient="bg-gradient-to-br from-[#00573f] to-[#009677]" description="Primary to Secondary" />
            <GradientSwatch name="Neutral Base" gradient="bg-gradient-to-br from-[#1a1e1e] to-[#3d4645]" description="Black to Neutral" />
          </div>
        </div>

        {/* Accent Color Structural Constraints */}
        <div className="mt-10 bg-white/60 backdrop-blur-md border border-neutral/10 rounded-lg p-8 shadow-sm">
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-start">
            
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-full shrink-0 bg-[#98cc67] shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] flex items-center justify-center border border-[#98cc67]/20" />
                 <div className="flex flex-col">
                    <h4 className="font-ui font-bold text-lg text-primary tracking-tight leading-none">High-Voltage Accent</h4>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#98cc67] font-bold mt-1">#98cc67</p>
                 </div>
               </div>
               <p className="text-sm text-neutral/80 font-sans leading-relaxed pt-2">
                 This luminous lime functions entirely as a digital highlighter. It breaks our institutional dark-green mold explicitly to drive extreme focal attention. However, it completely lacks the optical weight needed for complex geometries. <strong className="text-neutral">It must be deployed with absolute surgical precision.</strong>
               </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Approved Uses */}
               <div className="space-y-3 p-5 rounded-lg bg-[#059669]/5 border border-[#059669]/20 transition-all hover:bg-[#059669]/10">
                 <div className="flex items-center gap-2 text-[#059669] font-bold font-ui text-sm mb-3">
                   <div className="bg-[#059669]/20 p-1 rounded-full"><CheckCircle className="w-4 h-4" /></div>
                   APPROVED USE
                 </div>
                 <ul className="space-y-3 text-sm text-neutral/80 font-sans">
                    <li className="flex gap-2 items-start"><span className="shrink-0 text-[#059669] mt-0.5">•</span> Dynamic notification dots & badges.</li>
                    <li className="flex gap-2 items-start"><span className="shrink-0 text-[#059669] mt-0.5">•</span> Micro-highlights on data spikes (e.g. upward-trending graph nodes).</li>
                    <li className="flex gap-2 items-start"><span className="shrink-0 text-[#059669] mt-0.5">•</span> Active focal state lines on complex data grids.</li>
                 </ul>
               </div>

               {/* Misuse */}
               <div className="space-y-3 p-5 rounded-lg bg-[#dc2626]/5 border border-[#dc2626]/20 transition-all hover:bg-[#dc2626]/10">
                 <div className="flex items-center gap-2 text-[#dc2626] font-bold font-ui text-sm mb-3">
                   <div className="bg-[#dc2626]/20 p-1 rounded-full"><XCircle className="w-4 h-4" /></div>
                   STRICT MISUSE
                 </div>
                 <ul className="space-y-3 text-sm text-neutral/80 font-sans">
                     <li className="flex gap-2 items-start"><span className="shrink-0 text-[#dc2626] mt-0.5">✕</span> <strong>Never</strong> use as typography (FAILS WCAG against white).</li>
                     <li className="flex gap-2 items-start"><span className="shrink-0 text-[#dc2626] mt-0.5">✕</span> <strong>Never</strong> use as a solid background block or pill container.</li>
                     <li className="flex gap-2 items-start"><span className="shrink-0 text-[#dc2626] mt-0.5">✕</span> <strong>Never</strong> deploy more than once on a single viewport.</li>
                 </ul>
               </div>
            </div>

          </div>
        </div>

      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold font-heading text-neutral">Semantic States</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="rounded-lg border border-[#059669]/20 bg-white/60 backdrop-blur-md p-5 space-y-4 shadow-sm">
            <div className="flex gap-2 items-center text-[#059669]">
              <CheckCircle className="h-5 w-5" />
              <div className="flex flex-col">
                <p className="font-bold text-sm leading-tight">Success</p>
                <p className="text-[10px] font-mono opacity-80 uppercase uppercase tracking-wider">#059669</p>
              </div>
            </div>
            <p className="text-xs text-neutral/70 leading-relaxed">Used for confirmation mechanisms, completed milestones, and positive trajectory metrics.</p>
            <button className="bg-[#059669]/10 backdrop-blur-md border border-[#059669]/30 text-[#059669] shadow-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#059669]/20 transition-all w-full flex justify-center items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Save Configuration
            </button>
          </div>

          <div className="rounded-lg border border-[#d97706]/20 bg-white/60 backdrop-blur-md p-5 space-y-4 shadow-sm">
            <div className="flex gap-2 items-center text-[#d97706]">
              <AlertTriangle className="h-5 w-5" />
              <div className="flex flex-col">
                <p className="font-bold text-sm leading-tight">Warning</p>
                <p className="text-[10px] font-mono opacity-80 uppercase tracking-wider">#d97706</p>
              </div>
            </div>
            <p className="text-xs text-neutral/70 leading-relaxed">Used for destructive action confirmations, systemic bottlenecks, and pending authorizations.</p>
            <button className="bg-[#d97706]/10 backdrop-blur-md border border-[#d97706]/30 text-[#d97706] shadow-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d97706]/20 transition-all w-full flex justify-center items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Review Flag
            </button>
          </div>

          <div className="rounded-lg border border-[#dc2626]/20 bg-white/60 backdrop-blur-md p-5 space-y-4 shadow-sm">
            <div className="flex gap-2 items-center text-[#dc2626]">
              <XCircle className="h-5 w-5" />
              <div className="flex flex-col">
                <p className="font-bold text-sm leading-tight">Error</p>
                <p className="text-[10px] font-mono opacity-80 uppercase tracking-wider">#dc2626</p>
              </div>
            </div>
            <p className="text-xs text-neutral/70 leading-relaxed">Used exclusively for critical failures, integration blockages, and non-reversible actions.</p>
            <button className="bg-[#dc2626]/10 backdrop-blur-md border border-[#dc2626]/30 text-[#dc2626] shadow-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#dc2626]/20 transition-all w-full flex justify-center items-center gap-2">
              Purge Record
            </button>
          </div>
          
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-bold font-heading text-neutral">Typographic Archetypes</h3>
        <p className="text-sm text-neutral/70">
          Our typography load relies heavily on psychological segmentation. Do not mix data fonts into reading blocks, and do not use reading fonts for hero scale elements.
        </p>

        <div className="grid gap-6">
          
          {/* Hero Display */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-sm">
            <div className="space-y-2 max-w-lg">
              <div className="flex gap-3 items-baseline">
                <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">Hero Display</span>
                <span className="text-xs text-neutral/50 font-mono">Montserrat (700, 800)</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-primary tracking-tight leading-none">
                Transformative Growth.
              </h1>
              <p className="text-xs text-neutral/70">Used exclusively for landing page Hero H1s and massive brand pull-quotes.</p>
            </div>
            <a href="https://fonts.google.com/specimen/Montserrat" target="_blank" rel="noopener noreferrer" className="shrink-0 max-w-fit flex items-center justify-center gap-2 bg-white/50 hover:bg-white text-neutral border border-neutral/10 px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Download Montserrat
            </a>
          </div>

          {/* Financial Data Display */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-sm">
            <div className="space-y-2 max-w-lg">
              <div className="flex gap-3 items-baseline">
                <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">Financial Data</span>
                <span className="text-xs text-neutral/50 font-mono">Barlow (500, 600)</span>
              </div>
              <h2 className="text-4xl text-secondary font-data font-semibold tracking-wide">
                +34.2% Yield
              </h2>
              <p className="text-xs text-neutral/70">Used exclusively for numerical ROI, tabular data, and highly structured technical micro-copy.</p>
            </div>
            <a href="https://fonts.google.com/specimen/Barlow" target="_blank" rel="noopener noreferrer" className="shrink-0 max-w-fit flex items-center justify-center gap-2 bg-white/50 hover:bg-white text-neutral border border-neutral/10 px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Download Barlow
            </a>
          </div>

          {/* Interface & Action */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-sm">
            <div className="space-y-2 max-w-lg">
              <div className="flex gap-3 items-baseline">
                <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">Interface &amp; Action</span>
                <span className="text-xs text-neutral/50 font-mono">Inter (400, 500, 600)</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-primary text-white text-sm font-ui font-medium px-4 py-1.5 rounded-lg shadow-sm">Primary Action</button>
                <button className="bg-neutral/5 border border-neutral/10 text-neutral text-sm font-ui font-medium px-4 py-1.5 rounded-lg shadow-sm">Secondary</button>
              </div>
              <p className="text-xs text-neutral/70">The backbone of our SaaS UI. Used for buttons, navs, and structural dashboard headings.</p>
            </div>
             <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="shrink-0 max-w-fit flex items-center justify-center gap-2 bg-white/50 hover:bg-white text-neutral border border-neutral/10 px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Download Inter
            </a>
          </div>

          {/* Long-Form Reading */}
          <div className="bg-white/60 backdrop-blur-md rounded-lg border border-neutral/10 p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-sm">
            <div className="space-y-2 max-w-lg">
              <div className="flex gap-3 items-baseline">
                <span className="text-xs font-mono text-primary font-bold tracking-widest uppercase">Long-Form Reading</span>
                <span className="text-xs text-neutral/50 font-mono">Public Sans (300, 400)</span>
              </div>
              <p className="text-base font-sans text-neutral leading-relaxed">
                We believe transformation requires deep, structural fortitude. Our advisory blocks rely on extended periods of executive focus, requiring a frictionless reading experience.
              </p>
              <p className="text-xs text-neutral/70 pt-2">Used strictly for dense paragraphs, case studies, and extensive body copy.</p>
            </div>
             <a href="https://fonts.google.com/specimen/Public+Sans" target="_blank" rel="noopener noreferrer" className="shrink-0 max-w-fit flex items-center justify-center gap-2 bg-white/50 hover:bg-white text-neutral border border-neutral/10 px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm">
              <Download className="w-3.5 h-3.5" /> Download Public Sans
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}

function ColorSwatch({ name, hex, className, textColor, showTints = false }: { name: string, hex: string, className: string, textColor: string, showTints?: boolean }) {
  return (
    <div className="rounded-lg overflow-hidden border border-neutral/10 shadow-sm transition-transform hover:scale-[1.02] flex flex-col h-full bg-white">
      <div className={`h-24 w-full flex items-end p-3 shrink-0 ${className}`}>
        <span className={`font-mono text-sm font-medium ${textColor}`}>{hex}</span>
      </div>
      
      {showTints && (
        <div className="flex flex-col w-full bg-white border-b border-neutral/10">
          {[80, 60, 40, 20].map(opacity => (
            <div key={opacity} className="h-8 w-full flex items-center px-3 relative">
              <div className="absolute inset-0" style={{ backgroundColor: hex, opacity: opacity / 100 }} />
              <span className={`font-mono text-[10px] font-bold tracking-widest relative z-10 ${opacity > 40 ? textColor : 'text-neutral/80 mix-blend-multiply'}`}>
                {opacity}%
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 bg-white/80 backdrop-blur-md mt-auto">
        <p className="font-semibold text-sm text-foreground">{name}</p>
      </div>
    </div>
  )
}

function GradientSwatch({ name, gradient, description }: { name: string, gradient: string, description: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-neutral/10 shadow-sm transition-transform hover:scale-[1.02]">
      <div className={`h-28 w-full flex items-end p-3 ${gradient}`}>
        <span className="font-mono text-sm font-medium text-white mix-blend-overlay">Dark ➝ Light</span>
      </div>
      <div className="p-3 bg-white/80 backdrop-blur-md flex flex-col gap-1">
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-neutral/60">{description}</p>
      </div>
    </div>
  )
}
