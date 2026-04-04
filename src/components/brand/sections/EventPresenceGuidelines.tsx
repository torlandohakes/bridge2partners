import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventPresenceGuidelines() {
  return (
    <section id="event-presence-guidelines" className="space-y-8 pt-8 pb-32 scroll-mt-20">
      <div className="space-y-2 border-b border-primary/10 pb-4">
        <h2 className="text-3xl font-semibold tracking-tighter text-primary font-heading">
          Event Presence Guidelines
        </h2>
        <p className="text-muted-foreground">
          Rules for physical activations, digital conferences, and localized marketing efforts.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* The Local Bridge Rule */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl text-primary font-heading flex items-center gap-2">
              <span className="text-2xl">🌉</span> The "Local Bridge" Rule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              <strong>CRITICAL MARKING POLICY:</strong> When marketing a regional event (e.g., a dinner in Chicago, a summit in Austin), you must <strong>never</strong> use standard cityscape silhouettes or generic skylines.
            </p>
            <p className="text-foreground leading-relaxed">
              Always feature a stylized, minimalist vector graphic of a prominent bridge local to that specific city. This reinforces our "Bridge2Partners" namesake and implies we are building direct, localized connections within their specific economic ecosystem.
            </p>
            <div className="bg-white/60 p-4 rounded-lg border border-primary/10 text-sm italic text-muted-foreground">
              Example: For a Brooklyn event, use a geometric, single-color (Primary `#00573f`) abstraction of the Brooklyn Bridge's suspension cables.
            </div>
          </CardContent>
        </Card>

        {/* Booth & Collateral */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Physical Booths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Backdrops must be stark white or very light grey to maintain the "Light Theme" airy vibe.</li>
                <li>Typography must strictly be Inter Bold.</li>
                <li>Use living plants (nodding to our Forest Green primary) to structure physical space.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Digital Overlays (Zoom/Teams)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Virtual backgrounds should be our `Tertiary` hex (`#001b15`) with a subtle `backdrop-blur` glassmorphism effect rendering a faint glow.</li>
                <li>Names and titles should be displayed using Public Sans.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
