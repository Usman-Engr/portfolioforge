import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage (project assets and user uploads)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      // GitHub user avatars (used in GitHub integration)
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      // Google account profile pictures (OAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Unsplash (stock images for templates)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // UI noise texture used on auth pages
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app',
      },
    ],
  },
};

export default nextConfig;
