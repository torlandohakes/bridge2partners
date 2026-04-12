import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SubpageHeroProps {
  title: string;
  subtitle: string;
  theme?: "light" | "dark" | "medium";
}

export default function SubpageHero({ title, subtitle, theme = "dark" }: SubpageHeroProps) {
  const isLight = theme === "light";
  
  return (
    <section className={`relative pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden transition-colors duration-500 min-h-[50vh] ${
      isLight ? "bg-slate-50 text-[#001b15]" : "bg-[#000d0a] text-white"
    }`}>
      {/* Background Orbs to match brand identity */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full blur-[150px] pointer-events-none ${
        isLight ? "bg-[#00573f]/10" : "bg-[#009677]/[0.15] mix-blend-screen"
      }`} />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-bold opacity-70 hover:opacity-100 transition-opacity mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
          {title}
        </h1>
        <p className={`font-reading text-xl md:text-2xl max-w-3xl leading-relaxed ${
          isLight ? "text-[#001b15]/70" : "text-white/70"
        }`}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
