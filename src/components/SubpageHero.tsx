import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface SubpageHeroProps {
  title: ReactNode;
  subtitle: ReactNode;
  theme?: "light" | "dark" | "medium";
  imageSrc?: string;
  imageAlt?: string;
  imageCaptionName?: ReactNode;
  imageCaptionTitle?: ReactNode;
  imageCaptionPosition?: "left" | "right";
}

export default function SubpageHero({ title, subtitle, theme = "dark", imageSrc, imageAlt, imageCaptionName, imageCaptionTitle, imageCaptionPosition = "left" }: SubpageHeroProps) {
  const isLight = theme === "light";
  
  return (
    <section className={`relative pt-32 pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden transition-colors duration-500 min-h-[50vh] ${
      isLight ? "bg-slate-50 text-[#001b15]" : "bg-[#000d0a] text-white"
    }`}>
      {/* Background Orbs to match brand identity */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vw] rounded-full blur-[150px] pointer-events-none ${
        isLight ? "bg-[#00573f]/10" : "bg-[#009677]/[0.15] mix-blend-screen"
      }`} />

      <div className={`max-w-6xl w-full mx-auto relative z-10 flex flex-col md:flex-row gap-12 ${imageSrc ? "items-end" : "items-center"}`}>
        <div className={`flex-1 ${imageSrc ? "max-w-2xl" : "w-full"}`}>
          <Link href="/" className="inline-flex items-center text-sm font-bold opacity-70 hover:opacity-100 transition-opacity mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            {title}
          </h1>
          <p className={`font-reading text-xl md:text-2xl leading-relaxed ${imageSrc ? "max-w-xl" : "max-w-3xl"} ${
            isLight ? "text-[#001b15]/70" : "text-white/70"
          }`}>
            {subtitle}
          </p>
        </div>

        {imageSrc && (
          <div className="flex-1 flex justify-center md:justify-end md:-mb-24 w-full md:w-auto mt-8 md:mt-0 relative z-20">
            <div className="relative inline-flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={imageSrc} 
                alt={imageAlt || "Hero profile"} 
                className="max-h-[350px] md:max-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] brightness-110"
              />
              
              {(imageCaptionName || imageCaptionTitle) && (
                <div className={`absolute bottom-8 ${imageCaptionPosition === 'right' ? 'right-4 md:right-8' : '-left-4 md:-left-16'} backdrop-blur-md border p-4 rounded-xl shadow-2xl shrink-0 z-10 animate-fade-in ${
                  isLight ? "bg-white/80 border-[#00573f]/20" : "bg-[#000d0a]/80 border-white/10"
                }`}>
                  {imageCaptionName && <div className="font-display font-bold text-lg">{imageCaptionName}</div>}
                  {imageCaptionTitle && <div className="text-[#98cc67] text-sm mt-1 max-w-[200px] md:max-w-[260px] leading-snug">{imageCaptionTitle}</div>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
