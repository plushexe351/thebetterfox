import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Uncomment this line to enable static export 
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
