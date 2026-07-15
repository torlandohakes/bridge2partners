export function getLocalFallbackImage(src: string, memberIdOrContentId?: string): string {
  if (!src) return '/images/silhouette.svg';
  return src;
}
