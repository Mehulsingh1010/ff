// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",                    // Critical: generates pure static files in /out folder
  trailingSlash: true,                 // Helps with static hosting (e.g., /about/ instead of /about)
  images: {
    unoptimized: true,                 // Required when using output: 'export'
  },
  // Optional: if you have basePath or assetPrefix in the future, add here
};

export default nextConfig;