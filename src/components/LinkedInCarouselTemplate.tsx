import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors, textColors, bodyColors, shapeVariants, layouts, imageStyles, buttonStyles } from '@/lib/design-tokens';
import { InlineEditableText } from './InlineEditableText';

export type SlideType = 'hook' | 'thesis' | 'solution' | 'validation' | 'cta';

export interface TextConfig {
  visible: boolean;
  align: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  colorToken?: 'text-dark' | 'text-primary' | 'text-light' | 'text-neutral';
  opacity?: '100' | '80' | '50';
  glassBackground?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
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
  watermarkColorToken?: string;
  brandMarkType?: 'watermark' | 'logo' | 'icon';
  brandMarkSize?: 'sm' | 'md' | 'lg';
  brandMarkOpacity?: '50' | '80' | '100';
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
    const safeImageUrl = slide.imageUrl.startsWith('http') ? `/api/proxy-image?url=${encodeURIComponent(slide.imageUrl)}` : slide.imageUrl;
    
    if (['full-bleed-dark-overlay', 'full-bleed-green-overlay', 'overlay-gradient-institutional', 'overlay-gradient-teal', 'overlay-frosted-glass'].includes(style) || style === 'none') {
       return (
         <div className="absolute inset-0 z-0">
           <img src={safeImageUrl} alt="Slide background" className="w-full h-full object-cover" />
           <div className={imageStyles[style as keyof typeof imageStyles]} />
         </div>
       );
    }

    if (style === 'overlay-aurora-spots') {
       return (
         <div className="absolute inset-0 z-0">
           <img src={safeImageUrl} alt="Slide background" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 z-0 mix-blend-multiply" />
           <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#009677] rounded-full blur-[100px] opacity-60 mix-blend-screen pointer-events-none z-10" />
           <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#00573f] rounded-full blur-[100px] opacity-70 mix-blend-screen pointer-events-none z-10" />
         </div>
       );
    }
    
        if (style === 'cutout') {
      return (
         <div className="absolute inset-0 z-0 overflow-hidden">
           <img src={safeImageUrl} alt="Cutout" className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%] object-contain object-right-bottom mix-blend-normal" />
         </div>
      );
    }

    if (style === 'framed') {
       return (
         <div className="absolute inset-0 z-0 flex items-center justify-center p-12">
            <img src={safeImageUrl} alt="Framed" className="w-full h-full object-cover p-2 border border-neutral-200 bg-white shadow-sm" />
         </div>
       );
    }

    return null;
  };

  const renderGlobalBranding = () => {
    const wmColorToken = slide.watermarkColorToken || slide.headlineColorToken as string || 'text-light';
    const wmColorCSS = wmColorToken === 'original' ? '' : (textColors[wmColorToken as keyof typeof textColors] || 'text-white');
    const brandMarkType = slide.brandMarkType || 'watermark';
    const brandMarkSize = slide.brandMarkSize || 'md';
    const brandMarkOpacity = slide.brandMarkOpacity || '80';

    let logoUrl = 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Brand_Logo_v7.webp?alt=media&token=a90040bc-3446-408d-8794-cab07568de66'; // Primary Logo (Color)
    
    if (wmColorToken === 'text-light') {
      logoUrl = 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners%20Logo-3-White.png?alt=media&token=0a8d7276-834f-4ff8-971d-63f079efb214';
    } else if (wmColorToken === 'text-dark') {
      logoUrl = 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners%20Logo-2-Black.png?alt=media&token=8bc5af5c-85fb-4782-acf5-73f9db67f1f8';
    }

    const iconUrl = 'https://firebasestorage.googleapis.com/v0/b/bridge2partners-staging.firebasestorage.app/o/images%2FBridge2Partners_Favicon.png?alt=media&token=8281d312-5968-4fa1-9e37-347481934b95';

    const safeLogoUrl = `/api/proxy-image?url=${encodeURIComponent(logoUrl)}`;
    const safeIconUrl = `/api/proxy-image?url=${encodeURIComponent(iconUrl)}`;

    const wmTextSizeClass = {
      sm: 'text-[12px]',
      md: 'text-[16px]',
      lg: 'text-[24px]'
    }[brandMarkSize];

    const logoSizeClass = {
      sm: 'h-5',
      md: 'h-8',
      lg: 'h-12'
    }[brandMarkSize];

    const iconSizeClass = {
      sm: 'h-7 w-7',
      md: 'h-11 w-11',
      lg: 'h-16 w-16'
    }[brandMarkSize];

    const opacityClass = {
      '50': 'opacity-50',
      '80': 'opacity-80',
      '100': 'opacity-100'
    }[brandMarkOpacity];

    return (
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20 pointer-events-none">
         {brandMarkType === 'watermark' && (
           <span className={cn("font-ui font-bold tracking-[0.25em] uppercase", opacityClass, wmTextSizeClass, wmColorCSS)}>
             BRIDGE<span className="opacity-50">2</span>PARTNERS
           </span>
         )}
         {brandMarkType === 'logo' && (
           <img src={safeLogoUrl} alt="Bridge2Partners Logo" className={cn("w-auto object-contain", opacityClass, logoSizeClass)} />
         )}
         {brandMarkType === 'icon' && (
           <img src={safeIconUrl} alt="Bridge2Partners Icon" className={cn("object-contain", opacityClass, iconSizeClass, wmColorToken === 'text-light' ? 'brightness-200 grayscale' : (wmColorToken === 'text-dark' ? 'brightness-0 grayscale' : ''))} />
         )}
         {['thesis', 'solution'].includes(slide.type) && (
           <ArrowRight className={cn("w-5 h-5", opacityClass, wmColorCSS)} strokeWidth={1.5} />
         )}
      </div>
    );
  };

  const bgTokenCSS = colors[slide.backgroundColorToken as keyof typeof colors || 'dark'];
  const textTokenCSS = textColors[(slide as any).headlineColorToken as keyof typeof textColors || 'text-light'];
  const bodyTokenCSS = bodyColors[(slide as any).bodyColorToken as keyof typeof bodyColors || 'text-neutral'];
  const cardTokenCSS = shapeVariants[slide.cardVariantToken as keyof typeof shapeVariants || 'none'];
  const layoutTokenCSS = layouts[slide.layoutToken as keyof typeof layouts || 'center'];
  const outerPaddingCSS = 'p-6';

  const getIndentCSS = (config?: TextConfig) => {
    const p = config?.padding || 'none';
    return {
      'none': '',
      'sm': 'pl-4',
      'md': 'pl-8',
      'lg': 'pl-16',
      'xl': 'pl-24'
    }[p];
  };

  const getVSpaceCSS = (config?: TextConfig, defaultSpace: string = 'mb-1') => {
    const p = config?.vSpace;
    return p ? {
      'none': 'mb-0',
      'sm': 'mb-3',
      'md': 'mb-6',
      'lg': 'mb-12',
      'xl': 'mb-24'
    }[p] : defaultSpace;
  };

  const getGlassCSS = (config?: TextConfig) => config?.glassBackground ? 'bg-[#001b15]/60 backdrop-blur-md border border-white/20 rounded-lg px-6 py-4 shadow-xl inline-block max-w-full' : '';

  return (
    <div className={cn("w-full h-full flex relative overflow-hidden flex-col", outerPaddingCSS, bgTokenCSS)}>
      {renderBackgroundEffects()}
      {renderBackgroundFallbackImage()}
      
      {/* Main Content Wrapper */}
      <div className={cn("relative z-10 flex flex-col h-full w-full", layoutTokenCSS, cardTokenCSS)}>
        
        {slide.eyebrowConfig?.visible && (
          <div className={cn("w-full", getVSpaceCSS(slide.eyebrowConfig, 'mb-3'), `text-${slide.eyebrowConfig.align}`, getIndentCSS(slide.eyebrowConfig))}>
             <InlineEditableText 
               as="span"
               value={slide.eyebrow || slide.text || ''}
               onChange={(val) => onUpdate?.({ eyebrow: val })}
               placeholder="01 / Enter Eyebrow..."
               className={cn("font-ui font-semibold tracking-[0.15em] uppercase block", 
                 { '100': 'opacity-100', '80': 'opacity-80', '50': 'opacity-50' }[slide.eyebrowConfig.opacity || '80'],
                 slide.eyebrowConfig.colorToken ? ((textColors as Record<string,string>)[slide.eyebrowConfig.colorToken] || (bodyColors as Record<string,string>)[slide.eyebrowConfig.colorToken]) : textTokenCSS,
               {
                 'sm': 'text-xs',
                 'md': 'text-sm',
                 'lg': 'text-base'
               }[slide.eyebrowConfig.size || 'md'], getGlassCSS(slide.eyebrowConfig))}
             />
          </div>
        )}

        {slide.headlineConfig?.visible && (
          <div className={cn("w-full", getVSpaceCSS(slide.headlineConfig, 'mb-5'), `text-${slide.headlineConfig.align}`, getIndentCSS(slide.headlineConfig))}>
             <InlineEditableText 
               as="h1"
               value={slide.headline || slide.text || ''}
               onChange={(val) => onUpdate?.({ headline: val })}
               placeholder="Enter Core Headline..."
               className={cn("font-display leading-tight font-medium tracking-tight drop-shadow-sm", 
                 { '100': 'opacity-100', '80': 'opacity-80', '50': 'opacity-50' }[slide.headlineConfig.opacity || '100'],
                 slide.headlineConfig.colorToken ? ((textColors as Record<string,string>)[slide.headlineConfig.colorToken] || (bodyColors as Record<string,string>)[slide.headlineConfig.colorToken]) : textTokenCSS,
               {
                 'sm': 'text-4xl',
                 'md': 'text-5xl',
                 'lg': 'text-6xl'
               }[slide.headlineConfig.size || 'md'], getGlassCSS(slide.headlineConfig))}
             />
          </div>
        )}

        {slide.subheadlineConfig?.visible && (
          <div className={cn("w-full", getVSpaceCSS(slide.subheadlineConfig, 'mb-5'), `text-${slide.subheadlineConfig.align}`, getIndentCSS(slide.subheadlineConfig))}>
             <InlineEditableText 
               as="h2"
               value={slide.subheadline || slide.metric || ''}
               onChange={(val) => onUpdate?.({ subheadline: val })}
               placeholder="Enter structural subheadline details..."
               className={cn("font-heading leading-snug font-medium drop-shadow-sm", 
                 { '100': 'opacity-100', '80': 'opacity-80', '50': 'opacity-50' }[slide.subheadlineConfig.opacity || '80'],
                 slide.subheadlineConfig.colorToken ? ((textColors as Record<string,string>)[slide.subheadlineConfig.colorToken] || (bodyColors as Record<string,string>)[slide.subheadlineConfig.colorToken]) : textTokenCSS,
               {
                 'sm': 'text-2xl',
                 'md': 'text-3xl',
                 'lg': 'text-4xl'
               }[slide.subheadlineConfig.size || 'md'], getGlassCSS(slide.subheadlineConfig))}
             />
          </div>
        )}

        {slide.bodyConfig?.visible && (
          <div className={cn("w-full", getVSpaceCSS(slide.bodyConfig, 'mb-6'), `text-${slide.bodyConfig.align}`, getIndentCSS(slide.bodyConfig))}>
             <InlineEditableText 
               as="div"
               value={slide.body || ''}
               onChange={(val) => onUpdate?.({ body: val })}
               placeholder="Enter comprehensive supporting arguments or analytical context..."
               className={cn("font-body leading-relaxed drop-shadow-sm", 
                 { '100': 'opacity-100', '80': 'opacity-80', '50': 'opacity-50' }[slide.bodyConfig.opacity || '100'],
                 slide.bodyConfig.colorToken ? ((textColors as Record<string,string>)[slide.bodyConfig.colorToken] || (bodyColors as Record<string,string>)[slide.bodyConfig.colorToken]) : bodyTokenCSS,
               {
                 'sm': 'text-sm',
                 'md': 'text-base',
                 'lg': 'text-lg'
               }[slide.bodyConfig.size || 'md'], getGlassCSS(slide.bodyConfig))}
             />
          </div>
        )}

        {slide.ctaConfig?.visible && (
          <div className={cn("w-full", getVSpaceCSS(slide.ctaConfig, 'mt-4'), `text-${slide.ctaConfig.align}`, getIndentCSS(slide.ctaConfig))}>     
             {/* Wrapped Button inline-block for proper alignment targeting */}
             <div className={cn("inline-block font-ui font-bold tracking-widest uppercase rounded shadow-sm pointer-events-auto transition-all", {
               'sm': 'px-6 py-3.5 text-[10px]',
               'md': 'px-8 py-4 text-xs',
               'lg': 'px-10 py-5 text-sm'
             }[slide.ctaConfig.size || 'md'], buttonStyles[slide.buttonStyleToken as keyof typeof buttonStyles || 'teal-solid'])}>
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
        <div className={cn("absolute bottom-8 left-12 right-12 z-20", getVSpaceCSS(slide.footerConfig, 'mb-0'), `text-${slide.footerConfig.align}`, getIndentCSS(slide.footerConfig))}>
             <InlineEditableText 
               as="span"
               value={slide.footer || slide.footnote || ''}
               onChange={(val) => onUpdate?.({ footer: val })}
               placeholder="Enter citation or footer detail..."
               className={cn("font-ui font-medium tracking-[0.15em] uppercase pointer-events-auto block", 
                 { '100': 'opacity-100', '80': 'opacity-80', '50': 'opacity-50' }[slide.footerConfig.opacity || '50'],
                 slide.footerConfig.colorToken ? ((textColors as Record<string,string>)[slide.footerConfig.colorToken] || (bodyColors as Record<string,string>)[slide.footerConfig.colorToken]) : textTokenCSS,
               {
                 'sm': 'text-[8px]',
                 'md': 'text-[10px]',
                 'lg': 'text-[12px]'
               }[slide.footerConfig.size || 'md'], getGlassCSS(slide.footerConfig))}
             />
        </div>
      )}
      
      {renderGlobalBranding()}
    </div>
  );
}
