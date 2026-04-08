import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors, textColors, bodyColors, shapeVariants, layouts, imageStyles, buttonStyles } from '@/lib/design-tokens';
import { InlineEditableText } from './InlineEditableText';

export type SlideType = 'hook' | 'thesis' | 'solution' | 'validation' | 'cta';

export interface TextConfig {
  visible: boolean;
  align: 'left' | 'center' | 'right';
}

export interface SlideData {
  id: number;
  type: SlideType; // Kept for backend naming
  imageUrl: string | null;
  // Payload Strings
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  cta?: string;
  footer?: string;
  // Payload Configs
  eyebrowConfig: TextConfig;
  headlineConfig: TextConfig;
  subheadlineConfig: TextConfig;
  bodyConfig: TextConfig;
  ctaConfig: TextConfig;
  footerConfig: TextConfig;
  
  // Legacy backups to prevent crash on mount
  text?: string;
  kicker?: string;
  metric?: string;
  footnote?: string;

  backgroundColorToken?: keyof typeof colors;
  layoutToken?: keyof typeof layouts;
  cardVariantToken?: keyof typeof shapeVariants;
  headlineColorToken?: keyof typeof textColors;
  bodyColorToken?: keyof typeof bodyColors;
  imageStyleToken?: keyof typeof imageStyles;
  buttonStyleToken?: keyof typeof buttonStyles;
  watermarkColorToken?: keyof typeof textColors;
}

interface LinkedInCarouselTemplateProps {
  slide: SlideData;
  onUpdate?: (updates: Partial<SlideData>) => void;
}

export function LinkedInCarouselTemplate({ slide, onUpdate }: LinkedInCarouselTemplateProps) {
  const renderBackgroundEffects = () => {
    if (slide.backgroundColorToken === 'bg-aurora-spots') {
      return (
        <>
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#009677] rounded-full blur-[100px] opacity-30 mix-blend-screen pointer-events-none z-0" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#00573f] rounded-full blur-[100px] opacity-40 mix-blend-screen pointer-events-none z-0" />
          <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-[#98cc67] rounded-full blur-[100px] opacity-20 mix-blend-screen pointer-events-none z-0" />
        </>
      );
    }
    return null;
  };

  const renderBackgroundFallbackImage = () => {
    if (!slide.imageUrl) return null;
    
    const style = slide.imageStyleToken || 'none';
    
    if (['full-bleed-dark-overlay', 'full-bleed-green-overlay', 'overlay-gradient-institutional', 'overlay-gradient-teal', 'overlay-frosted-glass'].includes(style) || style === 'none') {
       return (
         <div className="absolute inset-0 z-0">
           <img src={slide.imageUrl} alt="Slide background" className="w-full h-full object-cover" />
           <div className={imageStyles[style as keyof typeof imageStyles]} />
         </div>
       );
    }

    if (style === 'overlay-aurora-spots') {
       return (
         <div className="absolute inset-0 z-0">
           <img src={slide.imageUrl} alt="Slide background" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 z-0 mix-blend-multiply" />
           <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#009677] rounded-full blur-[100px] opacity-60 mix-blend-screen pointer-events-none z-10" />
           <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#00573f] rounded-full blur-[100px] opacity-70 mix-blend-screen pointer-events-none z-10" />
         </div>
       );
    }
    
    if (style === 'cutout') {
      return (
         <div className="absolute inset-0 z-0 flex items-end justify-end p-8">
           <img src={slide.imageUrl} alt="Cutout" className="w-[80%] h-[80%] object-contain object-bottom right-0 mix-blend-normal" />
         </div>
      );
    }

    if (style === 'framed') {
       return (
         <div className="absolute inset-0 z-0 flex items-center justify-center p-12">
            <img src={slide.imageUrl} alt="Framed" className="w-full h-full object-cover p-2 border border-neutral-200 bg-white shadow-sm" />
         </div>
       );
    }

    return null;
  };

  const renderGlobalBranding = () => {
    const wmColorCSS = textColors[slide.watermarkColorToken || slide.headlineColorToken as keyof typeof textColors || 'text-light'];
    
    return (
      <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end z-20 pointer-events-none">
         <span className={cn("font-ui text-[9px] font-bold tracking-[0.25em] uppercase opacity-40", wmColorCSS)}>
           BRIDGE<span className="opacity-50">2</span>PARTNERS
         </span>
         {['thesis', 'solution'].includes(slide.type) && (
           <ArrowRight className={cn("w-5 h-5 opacity-40", wmColorCSS)} strokeWidth={1.5} />
         )}
      </div>
    );
  };

  const bgTokenCSS = colors[slide.backgroundColorToken as keyof typeof colors || 'dark'];
  const textTokenCSS = textColors[slide.headlineColorToken as keyof typeof textColors || 'text-light'];
  const bodyTokenCSS = bodyColors[slide.bodyColorToken as keyof typeof bodyColors || 'text-neutral'];
  const cardTokenCSS = shapeVariants[slide.cardVariantToken as keyof typeof shapeVariants || 'none'];
  const layoutTokenCSS = layouts[slide.layoutToken as keyof typeof layouts || 'center'];

  return (
    <div className={cn("w-full h-full flex p-12 relative overflow-hidden flex-col justify-center", bgTokenCSS)}>
      {renderBackgroundEffects()}
      {renderBackgroundFallbackImage()}
      
      {/* Main Content Wrapper */}
      <div className={cn("relative z-10 flex flex-col justify-center h-full w-full px-12", layoutTokenCSS, cardTokenCSS)}>
        
        {slide.eyebrowConfig?.visible && (
          <div className={cn("w-full mb-3", `text-${slide.eyebrowConfig.align}`)}>
             <InlineEditableText 
               as="span"
               value={slide.eyebrow || slide.kicker || ''}
               onChange={(val) => onUpdate?.({ eyebrow: val })}
               placeholder="01 / Enter Eyebrow..."
               className={cn("font-ui text-xs font-semibold tracking-[0.15em] uppercase opacity-50 block", textTokenCSS)}
             />
          </div>
        )}

        {slide.headlineConfig?.visible && (
          <div className={cn("w-full mb-5", `text-${slide.headlineConfig.align}`)}>
            <InlineEditableText 
               as="h1"
               value={slide.headline || slide.text || ''}
               onChange={(val) => onUpdate?.({ headline: val })}
               placeholder="Enter Core Headline..."
               className={cn("font-display text-4xl leading-tight font-medium tracking-tight drop-shadow-sm", textTokenCSS)}
             />
          </div>
        )}

        {slide.subheadlineConfig?.visible && (
          <div className={cn("w-full mb-5", `text-${slide.subheadlineConfig.align}`)}>
             <InlineEditableText 
               as="h2"
               value={slide.subheadline || slide.metric || ''}
               onChange={(val) => onUpdate?.({ subheadline: val })}
               placeholder="Enter structural subheadline details..."
               className={cn("font-heading text-2xl leading-snug font-medium drop-shadow-sm opacity-90", textTokenCSS)}
             />
          </div>
        )}

        {slide.bodyConfig?.visible && (
          <div className={cn("w-full mb-6", `text-${slide.bodyConfig.align}`)}>
             <InlineEditableText 
               as="p"
               value={slide.body || ''}
               onChange={(val) => onUpdate?.({ body: val })}
               placeholder="Enter comprehensive supporting arguments or analytical context..."
               className={cn("font-sans text-sm leading-relaxed", bodyTokenCSS)}
             />
          </div>
        )}

        {slide.ctaConfig?.visible && (
          <div className={cn("w-full mt-4", `text-${slide.ctaConfig.align}`)}>     
             {/* Wrapped Button inline-block for proper alignment targeting */}
             <div className={cn("inline-block px-6 py-3.5 font-ui font-bold text-[10px] tracking-widest uppercase rounded shadow-sm pointer-events-auto transition-all", buttonStyles[slide.buttonStyleToken as keyof typeof buttonStyles || 'teal-solid'])}>
                <InlineEditableText 
                  as="div"
                  value={slide.cta || ''}
                  onChange={(val) => onUpdate?.({ cta: val })}
                  placeholder="CALL TO ACTION"
                  className="w-full text-current"
                />
             </div>
          </div>
        )}

      </div>

      {slide.footerConfig?.visible && (
        <div className={cn("absolute bottom-6 left-12 right-12 z-20", `text-${slide.footerConfig.align}`)}>
             <InlineEditableText 
               as="span"
               value={slide.footer || slide.footnote || ''}
               onChange={(val) => onUpdate?.({ footer: val })}
               placeholder="Enter citation or footer detail..."
               className={cn("font-sans text-[8px] tracking-wide uppercase opacity-30 pointer-events-auto block", textTokenCSS)}
             />
        </div>
      )}
      
      {renderGlobalBranding()}
    </div>
  );
}
