import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oderindestephen.com",
      },
      {
        protocol: "https",
        hostname: "cms.oderindestephen.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Ensure trailing slashes or clean URLs consistent with WordPress SEO
  trailingSlash: false,
};

export default nextConfig;
