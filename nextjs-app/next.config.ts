import type { NextConfig } from "next";

const isGitHubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github';

const nextConfig: NextConfig = {
  // GitHub Pages 使用靜態導出，Vercel 使用 SSR
  ...(isGitHubPages && { output: 'export' }),

  basePath: '',

  images: {
    // GitHub Pages 需要 unoptimized，Vercel 可以使用優化
    unoptimized: isGitHubPages,
  },

  // GitHub Pages 需要 trailing slash
  trailingSlash: isGitHubPages,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
