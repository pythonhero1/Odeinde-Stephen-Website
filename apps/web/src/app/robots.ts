import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_ORIGIN ||
  "https://oderindestephen.com";

export default function robots(): MetadataRoute.Robots {
  const isStaging =
    process.env.ENVIRONMENT === "staging" ||
    process.env.ENVIRONMENT === "preview";

  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/*?*preview=", "/*?*token="],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
