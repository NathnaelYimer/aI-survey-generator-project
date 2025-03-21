// next.config.mjs (or next.config.js)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;