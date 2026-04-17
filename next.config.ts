import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyB-NWripd9bhdLYad0ZH_8QVYar0tGdy-8",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "re_3SyUPTLJ_Gbjcs7R62BtD7gfvfsuFHVEi"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
