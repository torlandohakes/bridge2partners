export function getLocalFallbackImage(src: string, memberIdOrContentId?: string): string {
  if (!src) return '/images/silhouette.svg';
  
  // Only apply local fallback overrides in local development (localhost or non-production environment)
  const isLocal = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ||
                  (process.env.NODE_ENV !== 'production');

  if (isLocal && src.includes('firebasestorage.googleapis.com') && (src.includes('bridge2partners-staging') || src.includes('bridge2partners-prod'))) {
    const id = memberIdOrContentId?.toLowerCase() || '';
    
    // Check main site content elements
    if (id === 'hero_bg') return '/images/hero_bg.jpg';
    if (id === 'problem_img') return '/images/leadership_portrait_4.png';
    
    // Check homepage value cards
    if (id.includes('value_card_0')) return '/images/leadership_portrait_1.png';
    if (id.includes('value_card_1')) return '/images/leadership_portrait_2.png';
    if (id.includes('value_card_2')) return '/images/leadership_portrait_3.png';
    if (id.includes('value_card_3')) return '/images/leadership_portrait_4.png';
    
    // Check specific leadership team member IDs
    if (id.includes('cordas')) return '/images/leadership_portrait_1.png';
    if (id.includes('caulfield')) return '/images/leadership_portrait_2.png';
    if (id.includes('simon')) return '/images/leadership_portrait_3.png';
    if (id.includes('summers')) return '/images/leadership_portrait_4.png';
    
    // Check other team members (e.g. John Gustav, Bob Holohan, Shane Williams, Linda Weber, Neil Kjeldsen, Tony Lockard, Raechelle Freeman, Liza Anne DeJulio, Teuta Naghshineh)
    if (id.includes('gustav')) return '/images/leadership_portrait_1.png';
    if (id.includes('williams')) return '/images/leadership_portrait_2.png';
    if (id.includes('holohan')) return '/images/leadership_portrait_3.png';
    if (id.includes('weber')) return '/images/leadership_portrait_4.png';
    if (id.includes('kjeldsen')) return '/images/leadership_portrait_2.png';
    if (id.includes('lockard')) return '/images/leadership_portrait_1.png';
    if (id.includes('freeman')) return '/images/leadership_portrait_3.png';
    if (id.includes('dejulio')) return '/images/leadership_portrait_4.png';
    if (id.includes('naghshineh')) return '/images/leadership_portrait_4.png';
    
    // Default fallback headshot silhouette for people
    return '/images/silhouette.svg';
  }
  return src;
}
