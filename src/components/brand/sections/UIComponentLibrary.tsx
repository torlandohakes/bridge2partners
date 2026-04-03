import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function UIComponentLibrary() {
  return (
    <section id="ui-component-library" className="space-y-8 pt-8 scroll-mt-20">
      <div className="space-y-2 border-b border-neutral/10 pb-4">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          UI Component Library
        </h2>
        <p className="text-neutral/80">
          The master reference for universal interactive elements across the platform.
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-heading">Button States</h3>
        <Card variant="default">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Container Archetypes */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold font-heading">Container Archetypes</h3>
        <p className="text-sm text-neutral/70">The underlying structural geometries that house content across the platform.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle className="text-base text-neutral">Default Frame</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral/80">Standard <code>bg-white</code> component with a subtle border. Used for generic form wrappers and low-priority panels.</p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base text-primary">Glass Container</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral/80">Premium <code>backdrop-blur-md</code> aesthetic mapping beautifully over our dynamic mesh lighting.</p>
            </CardContent>
          </Card>

          <Card variant="frosted">
            <CardHeader>
              <CardTitle className="text-base text-primary">Frosted Container</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral/80">Heavily blurred <code>backdrop-blur-xl</code> with inset luminous borders. Used exclusively for deeply interactive states and authoritative macro-information.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-heading">Form Elements</h3>
        <Card className="max-w-2xl">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Standard Input</label>
              <Input placeholder="Enter your query..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Dropdown</label>
              <Select defaultValue="">
                <option value="" disabled>Select an industry...</option>
                <option value="fintech">Fintech</option>
                <option value="healthcare">Healthcare SaaS</option>
                <option value="logistics">Logistics</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Textarea</label>
              <Textarea placeholder="Provide additional context for this M&A transaction..." />
            </div>

            <Button className="w-full">Submit Analysis Request</Button>
          </CardContent>
        </Card>
      </div>

      {/* Layout Conventions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-heading">Standard Spacing & Layout Constraints</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="bg-primary/5 border-primary/20 border-dashed shadow-none">
            <CardHeader>
              <CardTitle className="text-primary text-base">Section Padding `py-16 md:py-24`</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral/80">
                Use generous vertical padding to separate distinct macro-sections of content.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/5 border-secondary/20 border-dashed shadow-none">
            <CardHeader>
              <CardTitle className="text-secondary text-base">Grid Gap `gap-6` or `gap-8`</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral/80">
                Maintains a breathable, airy interface suitable for dense data presentation without feeling cluttered.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Strict Engineering Standards */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold font-heading">Strict Engineering Standards</h3>
        <p className="text-sm text-neutral/70">UX baseline directives that cannot be violated during development.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
             <CardHeader className="pb-3"><CardTitle className="text-base text-primary">A11y Focus Rings</CardTitle></CardHeader>
             <CardContent>
                <p className="text-sm text-neutral/80 font-mono text-xs bg-neutral/5 p-2 rounded-lg mb-3 break-all">focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none</p>
                <p className="text-sm text-neutral/80 leading-relaxed font-sans">Every single interactive element (Inputs, Buttons, Links, Dropdowns) must inherit this exact custom focus ring logic to ensure keyboard-navigation compliance.</p>
             </CardContent>
          </Card>
          
          <Card variant="default">
             <CardHeader className="pb-3"><CardTitle className="text-base text-primary">Mobile Touch Physics</CardTitle></CardHeader>
             <CardContent>
                <p className="text-sm text-neutral/80 font-mono text-xs bg-neutral/5 p-2 rounded-lg mb-3 break-all">min-h-[44px] min-w-[44px]</p>
                <p className="text-sm text-neutral/80 leading-relaxed font-sans">Visual icon size does not govern physical tap targets. All clickable vectors and tiny icon buttons must be wrapped in a hit-area spanning a minimum of 44x44 CSS pixels.</p>
             </CardContent>
          </Card>

          <Card variant="default">
             <CardHeader className="pb-3"><CardTitle className="text-base text-primary">Iconography</CardTitle></CardHeader>
             <CardContent>
                <p className="text-sm text-neutral/80 font-mono text-xs bg-neutral/5 p-2 rounded-lg mb-3 break-all">lucide-react strokeWidth={"{1.5}"}</p>
                <p className="text-sm text-neutral/80 leading-relaxed font-sans">Do not mix iconography libraries. Use Lucide React exclusively. To maintain our lightweight glassmorphic aesthetic, explicitly force the stroke width to 1.5 across all instances.</p>
             </CardContent>
          </Card>
        </div>
      </div>

    </section>
  );
}
