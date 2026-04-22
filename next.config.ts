import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },
};

export default nextConfig;
