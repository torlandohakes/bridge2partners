import SubpageHero from "@/components/SubpageHero";
import Link from "next/link";

export default function TeamPage() {
  const teamMock = [
    { id: "michael", name: "Michael", role: "Managing Partner" },
    { id: "caulfield", name: "Caulfield", role: "Partner, AI Strategy" },
    { id: "kristine", name: "Kristine", role: "Partner, Operations" },
    { id: "summers", name: "Summers", role: "Partner, Treasury" }
  ];

  return (
    <main className="min-h-screen bg-[#000d0a] text-white">
      <SubpageHero 
        title="Our People" 
        subtitle="Meet the leaders driving modernization across the financial sector." 
      />

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMock.map(member => (
          <div key={member.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#98cc67] transition-colors">
            <div className="h-[300px] bg-white/10 w-full relative">
              <span className="absolute inset-0 flex items-center justify-center text-white/30 text-sm font-ui">[Portrait Placeholder]</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-display font-bold">{member.name}</h3>
              <p className="text-white/60 font-ui mb-6">{member.role}</p>
              <Link href={`/team/${member.id}`} className="text-[#98cc67] font-bold text-sm hover:text-white transition-colors">
                View Digital Card &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
