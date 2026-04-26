import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Turbopack to use this directory as the workspace root
    root: __dirname,
  },
};

export default nextConfig;
