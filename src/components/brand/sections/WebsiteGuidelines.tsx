import { Card, CardContent } from "@/components/ui/card";

export function WebsiteGuidelines() {
  return (
    <section className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2 border-b border-neutral/10 pb-4">
        <h2 className="text-3xl font-bold tracking-tighter text-primary font-heading">
          Website Strategy Guidelines
        </h2>
        <p className="text-neutral/80">
          The purpose and psychological positioning of our digital presence.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Core Philosophy */}
        <Card className="border-t-4 border-t-primary border-white/50">
          <CardContent className="p-8 space-y-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-secondary">
              The Core Philosophy
            </h3>
            <p className="text-2xl md:text-3xl font-heading font-medium leading-snug text-primary">
              "Our website is a high-stakes trust accelerator, not an e-commerce store. We sell 6-to-7 figure digital transformation and change management advisory to regional and midsized banks."
            </p>
          </CardContent>
        </Card>

        {/* Jobs to be Done */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold font-heading text-neutral">Our Primary Jobs (JTBD)</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-bold text-lg text-primary tracking-tight">Discovery</h4>
                <p className="text-sm text-neutral/80 leading-relaxed">
                  Surface organically when banking executives research legacy modernization and AI-readiness.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-bold text-lg text-secondary tracking-tight">Validation</h4>
                <p className="text-sm text-neutral/80 leading-relaxed">
                  Project stability, authority, and deep technical competence. Prove we speak their language.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-2">
                <h4 className="font-bold text-lg text-primary tracking-tight">Conversion</h4>
                <p className="text-sm text-neutral/80 leading-relaxed">
                  Move prospects seamlessly from reading case studies to booking high-level strategic consultations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Verticals */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-bold font-heading text-neutral">Our 4 Core Verticals</h3>
          <div className="bg-white/40 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-sm">
            <ol className="list-decimal list-inside space-y-3 lg:space-y-0 lg:flex lg:justify-between text-neutral font-medium">
              <li>Wealth Management</li>
              <li>Commercial Lending</li>
              <li>Treasury &amp; Payments</li>
              <li>M&amp;A Due Diligence</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
