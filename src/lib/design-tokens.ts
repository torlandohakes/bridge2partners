import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colors = {
  primary: 'bg-[#00573f]',
  dark: 'bg-[#001b15]',
  light: 'bg-white',
  'gradient-institutional': 'bg-gradient-to-br from-[#001b15] to-[#00573f]',
  'gradient-radial-brand': 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00573f] to-[#001b15]',
  'gradient-linear-teal': 'bg-gradient-to-r from-[#00573f] to-[#009677]',
  'bg-aurora-spots': 'bg-[#001b15]'
};

export const typographyColors = {
  'b2p-black': 'text-[#001b15]',
  'b2p-green': 'text-[#00573f]',
  'secondary-teal': 'text-[#009677]',
  'neutral-slate': 'text-[#3d4645]',
  'luminous-lime': 'text-[#98cc67]',
  'sterile-white': 'text-white'
};

export const shapeVariants = {
  none: '',
  'thin-frame': 'absolute inset-6 border border-neutral-300 bg-transparent rounded-sm',
  'understated-solid': 'absolute inset-6 bg-[#f4f6f5] border border-neutral-200 rounded-sm shadow-sm',
  'glass-panel': 'w-fit h-fit bg-[#001b15]/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl flex flex-col max-w-full'
};

export const imageStyles = {
  none: 'hidden',
  'full-bleed-dark-overlay': 'absolute inset-0 bg-[#001b15]/60 mix-blend-multiply',
  'full-bleed-green-overlay': 'absolute inset-0 bg-[#00573f]/70 mix-blend-multiply',
  'overlay-gradient-institutional': 'absolute inset-0 bg-gradient-to-br from-[#001b15]/90 to-[#00573f]/70 mix-blend-multiply',
  'overlay-gradient-teal': 'absolute inset-0 bg-gradient-to-r from-[#00573f]/80 to-[#009677]/80 mix-blend-multiply',
  'overlay-frosted-glass': 'absolute inset-0 bg-black/20 backdrop-blur-md',
  'overlay-aurora-spots': '', // Specialized DOM injection
  'cutout': '', // Specialized DOM injection
  'framed': '' // Specialized DOM injection
};

export const buttonStyles = {
  'teal-solid': 'bg-[#009677] hover:bg-[#007a61] text-white border border-[#009677]',
  'white-solid': 'bg-white hover:bg-neutral-50 text-slate-900 border border-white',
  'glass': 'backdrop-blur-md bg-white/20 border border-white/30 text-white',
  'frosted-outline': 'bg-white/5 border border-white/10 text-white backdrop-blur-md',
  'neon-outline': 'bg-transparent border border-[#98cc67] text-[#98cc67]'
};

export const layouts = {
  'center': 'justify-center items-center text-center',
  'left': 'justify-center items-start text-left',
  'right': 'justify-center items-end text-right',
  'top-left': 'justify-start items-start text-left mt-8',
  'top-center': 'justify-start items-center text-center mt-8',
  'top-right': 'justify-start items-end text-right mt-8',
  'bottom-left': 'justify-end items-start text-left mb-8',
  'bottom-center': 'justify-end items-center text-center mb-8',
  'bottom-right': 'justify-end items-end text-right mb-8'
};
