import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function resolveStorageUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (typeof url !== 'string') return '';
  if (url.includes('firebasestorage.googleapis.com')) {
    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'bridge2partners-prod.firebasestorage.app';
    return url.replace('bridge2partners-staging.firebasestorage.app', bucket)
              .replace('bridge2partners-staging.appspot.com', bucket);
  }
  return url;
}
