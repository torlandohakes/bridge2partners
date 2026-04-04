import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, AlertTriangle, CheckCircle2, User, Layout, Eye, Search, Layers } from "lucide-react";

function ShowcaseBlock({ title, promptId, children }: { title: string; promptId: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 mb-10 w-full">
      <h4 className="font-ui text-md font-semibold text-primary/80 uppercase tracking-widest text-[11px] mb-1">{title}</h4>
      <div className="grid lg:grid-cols-2 gap-4 w-full">
        {/* Light Mode Spec */}
        <div className="p-8 border border-primary/10 rounded-xl bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">Light Spec</div>
          <div className="w-full flex justify-center">{children}</div>
        </div>
        {/* Tactical Dark Mode Spec */}
        <div className="dark p-8 border border-primary/10 rounded-xl bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">Dark Spec</div>
          <div className="w-full flex justify-center">{children}</div>
        </div>
      </div>
      <div className="w-full bg-muted/40 p-3 rounded-md flex items-center justify-between border border-border/10 cursor-copy hover:bg-muted/60 transition-colors group">
        <code className="text-xs text-muted-foreground font-mono select-all font-semibold break-all">Prompt ID: {promptId}</code>
        <span className="text-[10px] text-muted-foreground/40 group-hover:text-primary transition-colors font-mono uppercase tracking-widest">Double-click to copy</span>
      </div>
    </div>
  );
}

export function UIComponentLibrary() {
  return (
    <section id="ui-component-library" className="space-y-12 pt-8 pb-32 scroll-mt-20 max-w-6xl mx-auto">
      <div className="space-y-4 border-b border-primary/10 pb-6">
        <h2 className="text-4xl font-semibold tracking-tighter text-primary font-display">
          UI Component Library
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl font-sans">
          The master reference for interactive elements across the platform. This serves as the definitive visual specification sheet and structural prompt catalog for autonomous generation.
        </p>
      </div>

      {/* Category 1: Foundations */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 text-primary">
          <Layout className="w-6 h-6" />
          <h3 className="text-2xl font-semibold font-heading">1. Foundations</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Base tokens dictating layout rules, typography, and core visual rendering protocols.</p>

        <ShowcaseBlock title="Color Tokens" promptId="[Foundation: Color Tokens]">
          <div className="flex flex-wrap gap-3 items-center justify-center bg-card p-4 rounded-xl border border-primary/10">
             <div className="w-10 h-10 rounded-full bg-primary shadow-sm border border-border/5" title="Primary" />
             <div className="w-10 h-10 rounded-full bg-secondary shadow-sm border border-border/5" title="Secondary" />
             <div className="w-10 h-10 rounded-full bg-neutral shadow-sm border border-border/5" title="Neutral" />
             <div className="flex items-center gap-2 bg-background border border-border/10 rounded-full px-3 py-1.5 shadow-sm">
                 <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                 <span className="text-xs font-mono text-muted-foreground font-semibold">High-Voltage Accent</span>
             </div>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Typography Hierarchy" promptId="[Foundation: Typography]">
           <div className="flex flex-col gap-4 w-full text-left bg-card p-6 rounded-xl border border-primary/10">
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">Hero Display (Montserrat)</h1>
              <h3 className="font-heading text-xl font-semibold text-primary">Structural Heading (Inter)</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Standard long-form reading typography sits inside the Public Sans matrix, ensuring maximum legibility across dense data interfaces.
              </p>
              <div className="font-data text-lg font-medium text-foreground tracking-widest tabular-nums mt-2">
                 Data Yield: $8,492,105.00
              </div>
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 2: Layout, Structure & Media */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <div className="flex items-center gap-2 text-primary">
          <Layers className="w-6 h-6" />
          <h3 className="text-2xl font-semibold font-heading">2. Layout, Structure & Media</h3>
        </div>

        <ShowcaseBlock title="Standard Section Container" promptId="[Layout: Standard Section Container]">
          <div className="w-full border border-dashed border-primary/20 py-10 md:py-16 bg-primary/5 flex items-center justify-center rounded-xl relative">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,87,63,0.05)_0%,transparent_70%)]" />
             <span className="text-xs font-mono text-muted-foreground font-semibold tracking-widest uppercase">container mx-auto py-16</span>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Grid Split 25/75" promptId="[Layout: Grid Split 25/75]">
          <div className="w-full flex gap-4 h-24">
             <div className="w-1/4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-[10px] text-muted-foreground font-mono">25fr</div>
             <div className="w-3/4 bg-primary/5 border border-primary/10 rounded-lg flex items-center justify-center text-[10px] text-muted-foreground font-mono">75fr Content Matrix</div>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Brand Filtered Image" promptId="[Media: Brand Filtered Image]">
           <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary/10 bg-muted group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none" />
              <img 
                 src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop" 
                 alt="Brand Abstract"
                 className="w-full h-full object-cover saturate-50 contrast-125 opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 z-20 text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-md">saturate-[.50] / mix-blend-overlay</div>
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 3: Action & Navigation */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <h3 className="text-2xl font-semibold font-heading text-primary">3. Action & Navigation</h3>

        <ShowcaseBlock title="Buttons (All Variants)" promptId="[Action: Button - {Variant}]">
          <div className="flex flex-wrap gap-4 items-center justify-center">
             <Button>Primary</Button>
             <Button variant="secondary">Secondary</Button>
             <Button variant="outline">Outline</Button>
             <Button variant="ghost">Ghost</Button>
             <Button variant="destructive">Destructive</Button>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Standard Tabs" promptId="[Nav: Standard Tabs]">
           <Tabs defaultValue="overview" className="w-full max-w-sm">
             <TabsList className="w-full grid grid-cols-2">
               <TabsTrigger value="overview">Overview</TabsTrigger>
               <TabsTrigger value="metrics">Metrics</TabsTrigger>
             </TabsList>
           </Tabs>
        </ShowcaseBlock>

        <ShowcaseBlock title="Dropdown Menu Mock" promptId="[Nav: Dropdown Menu]">
           <div className="relative w-56 text-left h-64 flex flex-col items-center pt-2">
              <div className="flex w-full items-center justify-between gap-2 px-4 py-2.5 bg-background border border-primary/10 rounded-lg text-sm font-medium shadow-sm transition-colors text-foreground cursor-pointer hover:bg-muted/30">
                 Select Framework <ChevronDown className="w-4 h-4 opacity-80 text-primary" />
              </div>
              
              {/* Glassmorphic Flyout Mock */}
              <div className="absolute top-14 left-0 w-full bg-white/60 dark:bg-background/60 backdrop-blur-xl border border-white/40 dark:border-primary/20 rounded-xl shadow-xl flex flex-col p-1.5 z-50">
                 <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Strategic Vectors</div>
                 <div className="w-full text-sm font-medium text-primary px-3 py-2 bg-primary/10 rounded-md cursor-default flex items-center justify-between">
                    Digital Transformation
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 </div>
                 <div className="w-full text-sm font-medium text-foreground/80 px-3 py-2 hover:bg-foreground/5 rounded-md cursor-pointer transition-colors">Yield Optimization</div>
                 <div className="w-full text-sm font-medium text-foreground/80 px-3 py-2 hover:bg-foreground/5 rounded-md cursor-pointer transition-colors">Risk Assessment</div>
                 
                 <div className="w-full h-[0.5px] bg-border/20 my-1.5"></div>
                 
                 <div className="w-full text-sm font-medium text-destructive px-3 py-2 hover:bg-destructive/10 rounded-md cursor-pointer transition-colors">Clear Selection</div>
              </div>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Glass Navigation Pill" promptId="[Nav: Glass Pill]">
           <div className="flex items-center gap-1.5 px-4 py-2.5 border border-white/40 dark:border-primary/20 bg-white/30 dark:bg-background/40 backdrop-blur-xl shadow-lg rounded-full">
              <span className="font-ui font-bold text-xs uppercase tracking-widest mr-3 text-foreground ml-2">B2P</span>
              <Button variant="ghost" size="sm" className="rounded-full text-xs font-medium text-foreground">Overview</Button>
              <Button variant="ghost" size="sm" className="rounded-full text-xs font-medium text-muted-foreground hover:text-foreground">Capabilities</Button>
              <Button variant="outline" size="sm" className="rounded-full text-xs font-medium border-primary/20 bg-background/50 hover:bg-background/80 shadow-sm ml-2">Engage Force</Button>
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 4: Data Entry */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <h3 className="text-2xl font-semibold font-heading text-primary">4. Data Entry (Forms)</h3>

        <ShowcaseBlock title="Standard Text Input" promptId="[Input: Text Standard]">
           <div className="w-full max-w-sm space-y-2 text-left">
              <label className="text-xs font-semibold text-foreground uppercase tracking-widest">Corporate Identity</label>
              <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background flex items-center shadow-sm">
                <span className="text-muted-foreground opacity-60">Enter full legal entity...</span>
              </div>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Switch Toggle mock" promptId="[Input: Switch Toggle]">
           <div className="flex items-center gap-3">
              <div className="w-11 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer hover:bg-primary/90 transition-colors">
                 <div className="w-5 h-5 bg-background rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
              <span className="text-sm font-medium text-foreground">Asynchronous Processing</span>
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 5: Data Display */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <h3 className="text-2xl font-semibold font-heading text-primary">5. Data Display</h3>

        <ShowcaseBlock title="Status Badges" promptId="[Display: Badge - {Variant}]">
           <div className="flex gap-3 flex-wrap justify-center">
              <Badge>Default / Active</Badge>
              <Badge variant="secondary">Secondary State</Badge>
              <Badge variant="outline">Outlined Token</Badge>
              <Badge variant="destructive">Critical Error</Badge>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Identity Avatar" promptId="[Display: Avatar]">
           <div className="flex items-center gap-3 bg-card p-2 pr-4 rounded-full border border-primary/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                 <User className="w-5 h-5 text-muted-foreground/70" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold leading-none text-foreground">J. Sterling</span>
                 <span className="text-xs text-muted-foreground leading-none mt-1">Lead Partner</span>
              </div>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Standard Card" promptId="[Display: Standard Card]">
           <Card className="w-full max-w-sm">
              <CardHeader className="pb-3">
                 <CardTitle>Enterprise Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground">Governing frameworks and rigid token injection across the stack.</p>
              </CardContent>
           </Card>
        </ShowcaseBlock>

        <ShowcaseBlock title="Data Table MOCK" promptId="[Display: Data Table]">
           <div className="w-full max-w-xl border border-primary/10 rounded-xl overflow-hidden bg-card shadow-sm">
              <div className="grid grid-cols-3 bg-muted/40 p-3 border-b border-primary/10 text-xs font-semibold text-muted-foreground uppercase tracking-widest text-left">
                 <div>Entity</div>
                 <div>Status</div>
                 <div className="text-right">Valuation</div>
              </div>
              <div className="grid grid-cols-3 p-3 border-b border-primary/5 text-sm text-foreground items-center text-left">
                 <div className="font-medium">Apex Holdings LLC</div>
                 <div><Badge className="h-5 text-[10px] bg-primary/20 text-primary hover:bg-primary/30">Active</Badge></div>
                 <div className="text-right font-data">$18.5M</div>
              </div>
              <div className="grid grid-cols-3 p-3 text-sm text-foreground items-center text-left">
                 <div className="font-medium">Meridian Trust</div>
                 <div><Badge variant="outline" className="h-5 text-[10px]">Pending</Badge></div>
                 <div className="text-right font-data">$4.2M</div>
              </div>
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 6: Feedback & Overlays */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <h3 className="text-2xl font-semibold font-heading text-primary">6. Feedback & Overlays</h3>

        <ShowcaseBlock title="Alert Banner MOCK" promptId="[Feedback: Alert - {Type}]">
           <div className="w-full flex items-start gap-3 bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-left">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                 <strong className="text-sm font-semibold">Critical Protocol Failure</strong>
                 <span className="text-sm opacity-90 leading-tight">Identity tokens mismatched during session injection.</span>
              </div>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Standard Dialog MOCK" promptId="[Overlay: Standard Dialog]">
           <div className="w-full max-w-sm bg-card border border-primary/10 shadow-2xl rounded-xl p-6 text-left relative z-10 before:absolute before:inset-0 before:ring-1 before:ring-white/10 before:rounded-xl">
              <h4 className="font-bold text-lg mb-1 text-foreground">Confirm Execution</h4>
              <p className="text-sm text-muted-foreground mb-6">Are you absolutely certain you wish to finalize this pipeline configuration?</p>
              <div className="flex justify-end gap-3 w-full">
                 <Button variant="ghost" size="sm">Cancel</Button>
                 <Button size="sm">Execute Force</Button>
              </div>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Skeleton Block" promptId="[Feedback: Skeleton Block]">
           <div className="w-full max-w-md space-y-3">
              <div className="w-2/3 h-5 bg-muted rounded-md animate-pulse" />
              <div className="w-full h-24 bg-muted rounded-xl animate-pulse" />
           </div>
        </ShowcaseBlock>
      </div>

      {/* Category 7: B2P Proprietary */}
      <div className="space-y-6 pt-12 border-t border-primary/10">
        <div className="flex items-center gap-2 text-primary">
          <Eye className="w-6 h-6" />
          <h3 className="text-2xl font-semibold font-heading">7. B2P Proprietary Components</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Specialized components utilizing custom geometry and maximum glassmorphic blur.</p>

        <ShowcaseBlock title="Glass Card Container" promptId="[B2P Custom: Glass Card Container]">
           <div className="w-full h-40 border border-transparent bg-white/40 dark:bg-background/40 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.2)] rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="font-heading font-semibold text-foreground/80 tracking-widest uppercase text-xs z-10 backdrop-blur-md px-3 py-1 bg-background/50 rounded shadow-sm border border-border/10">Glass Form Factor</span>
           </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Task Force Roster Card MOCK" promptId="[B2P Custom: Task Force Roster Card]">
           <div className="w-full max-w-xs flex gap-4 p-3 bg-card border border-primary/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow items-center text-left">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted relative shrink-0 border border-primary/20">
                 <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none" />
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover saturate-50 contrast-125" alt="Headshot" />
              </div>
              <div className="flex flex-col">
                 <span className="text-sm font-semibold text-foreground tracking-tight">E. Vance, CFA</span>
                 <span className="text-xs text-primary font-medium">Head of Strategy</span>
              </div>
           </div>
        </ShowcaseBlock>
      </div>

    </section>
  );
}
