import { SlideData, TextConfig } from '@/components/LinkedInCarouselTemplate';

const hiddenConfig: TextConfig = { visible: false, align: 'center' };

export const templates: Record<string, SlideData[]> = {
  blank_project: [
    {
      id: 1,
      type: 'hook',
      imageUrl: null,
      text: '',
      brandMarkType: 'logo',
      headline: 'Enter Headline Core',
      subheadline: 'Enter context metric or subtitle here.',
      eyebrowConfig: hiddenConfig,
      headlineConfig: { visible: true, align: 'center', size: 'lg', colorToken: 'text-light', opacity: '100' },
      subheadlineConfig: { visible: true, align: 'center', size: 'md', colorToken: 'text-light', opacity: '80' },
      bodyConfig: hiddenConfig,
      ctaConfig: hiddenConfig,
      footerConfig: hiddenConfig,
      backgroundColorToken: 'dark',
      layoutToken: 'center',
      cardVariantToken: 'none',
      imageStyleToken: 'none',
      buttonStyleToken: 'teal-solid'
    }
  ]
};
