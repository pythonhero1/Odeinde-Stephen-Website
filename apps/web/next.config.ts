import type { NextConfig } from "next";

const CMS_ORIGIN =
  process.env.CMS_MEDIA_ORIGIN ||
  process.env.WP_API_ORIGIN ||
  "https://cms.oderindestephen.com";

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
      // Core solutions and pages
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
      // Historical post permalink (from WordPress XML baseline)
      {
        source: "/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026",
        destination: "/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026",
        permanent: true,
      },
      // WordPress RSS feeds
      {
        source: "/feed",
        destination: "/insights",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/insights",
        permanent: true,
      },
      // WordPress author archives
      {
        source: "/author/:slug*",
        destination: "/insights",
        permanent: true,
      },
      // Divi Theme Builder layouts & templates cleanup
      {
        source: "/et_pb_layout/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/et_template/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/et_body_layout/:slug*",
        destination: "/",
        permanent: true,
      },
      // WordPress admin/login forwards
      {
        source: "/wp-admin/:path*",
        destination: `${CMS_ORIGIN}/wp-admin/:path*`,
        permanent: false,
      },
      {
        source: "/wp-login.php",
        destination: `${CMS_ORIGIN}/wp-login.php`,
        permanent: false,
      },
      // Old media URL continuity (/wp-content/uploads/...)
      {
        source: "/wp-content/uploads/:path*",
        destination: `${CMS_ORIGIN}/wp-content/uploads/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
