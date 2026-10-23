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
  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/business-website-solutions",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/insights/:slug",
        permanent: true,
      },
      {
        source: "/website-redesign",
        destination: "/business-website-solutions",
        permanent: true,
      },
      {
        source: "/client-portals-business-systems",
        destination: "/business-website-solutions",
        permanent: true,
      },
      {
        source: "/wordpress-development",
        destination: "/business-website-development",
        permanent: true,
      },
      {
        source: "/woocommerce-development",
        destination: "/e-commerce-development",
        permanent: true,
      },
      {
        source: "/shopify-development",
        destination: "/e-commerce-development",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
