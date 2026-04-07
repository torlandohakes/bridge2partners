import React from 'react';
import { ArrowRight } from 'lucide-react';

export type SlideType = 'hook' | 'thesis';

export interface SlideData {
  id: number;
  type: SlideType;
  imageUrl?: string | null;
  text?: string;
}

interface LinkedInCarouselTemplateProps {
  slide: SlideData;
}

export function LinkedInCarouselTemplate({ slide }: LinkedInCarouselTemplateProps) {
  // Background layer logic for custom image uploads
  const renderBackground = (defaultBgClass: string) => {
    return (
      <>
        {slide.imageUrl ? (
          <div className="absolute inset-0 z-0">
            <img src={slide.imageUrl} alt="Slide background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#001b15]/60" />
          </div>
        ) : (
          <div className={`absolute inset-0 z-0 ${defaultBgClass}`} />
        )}
      </>
    );
  };

  if (slide.type === 'hook') {
    return (
      <div className="w-full h-full text-white flex flex-col items-center justify-center p-12 relative overflow-hidden">
        {renderBackground('bg-[#001b15]')}
        
        {/* Core Content layered on top */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-sm text-center space-y-6">
          <h1 className="font-display text-4xl leading-tight font-medium tracking-tight drop-shadow-sm">
            {slide.text || "The End of Legacy Liquidity Frameworks"}
          </h1>
          <hr className="w-16 border-t border-white/20" />
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-primary uppercase drop-shadow-sm">
            A Strategic Reevaluation
          </h2>
        </div>
        
        {/* Bottom Monogram */}
        <div className="absolute bottom-8 w-full flex justify-center z-10">
          <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">
            B2P
          </span>
        </div>
      </div>
    );
  }

  if (slide.type === 'thesis') {
    return (
      <div className="w-full h-full text-foreground flex flex-col justify-between p-12 relative overflow-hidden">
        {renderBackground('bg-white')}
        
        <div className="relative z-10 flex flex-col space-y-8 mt-4">
          <span className={`font-ui text-xs font-semibold tracking-[0.15em] uppercase ${slide.imageUrl ? 'text-white/70' : 'text-foreground/50'}`}>
            01 / Primary Thesis
          </span>
          <h2 className={`font-heading text-3xl leading-snug font-medium drop-shadow-sm ${slide.imageUrl ? 'text-white' : 'text-foreground'}`}>
            {slide.text || "Structural inefficiencies demand a modern architecture built on programmatic execution."}
          </h2>
          <p className={`font-sans text-sm leading-relaxed max-w-[85%] ${slide.imageUrl ? 'text-white/90' : 'text-foreground/80'}`}>
            By shifting from ad-hoc operational setups to deterministic asset pipelines, an organization can radically increase yield while decreasing the overall surface area for operational risk. This is the cornerstone of sustainable modern growth.
          </p>
        </div>

        {/* Bottom anchor */}
        <div className="relative z-10 w-full flex justify-end pb-2 pr-2">
          <ArrowRight className="w-6 h-6 text-primary" strokeWidth={1.5} />
        </div>
      </div>
    );
  }

  return null;
}
