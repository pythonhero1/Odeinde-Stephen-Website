/**
 * Cache and revalidation configuration for WordPress CMS REST data.
 * Adheres to Build Plan Section 6 & 11:
 * - Explicit cache tags for targeted on-demand revalidation
 * - Bounded fallback lifetime (ISR)
 * - Cache Components disabled during initial scaffolding
 */

export const CMS_CACHE_TAGS = {
  pages: "cms-pages",
  posts: "cms-posts",
  caseStudies: "cms-case-studies",
  settings: "cms-settings",
  seo: "cms-seo",
} as const;

export type CmsCacheTag =
  | (typeof CMS_CACHE_TAGS)[keyof typeof CMS_CACHE_TAGS]
  | `page-${string}`
  | `page-id-${number}`
  | `case-study-${string}`
  | `post-${string}`
  | (string & {});

/**
 * Default fallback time-to-live (seconds) for ISR when on-demand
 * webhook revalidation has not fired. 3600s = 1 hour.
 */
export const DEFAULT_REVALIDATE_SECONDS = 3600;

/**
 * Standard Next.js fetch options generator for CMS queries.
 */
export function getCmsFetchOptions(
  tags: CmsCacheTag[] = [],
  revalidate: number = DEFAULT_REVALIDATE_SECONDS
): RequestInit {
  return {
    next: {
      tags,
      revalidate,
    },
  };
}

/**
 * Verified default site settings contract per D-6, D-8, D-10, D-11.
 * Serves as resilient fallback when CMS is offline or during static compilation.
 */
export const DEFAULT_SITE_SETTINGS = {
  siteName: "Oderinde Stephen",
  siteTagline: "Website Development & Digital Solutions",
  bookingUrl: "https://cal.com/oderinde/free",
  contactEmail: "Contact@oderindestephen.com",
  contactPhone: "+44 7848 149224",
  contactLocation: "London, United Kingdom & Worldwide Remote",
  currency: "GBP" as const,
  portalUrl: "https://portal.oderindestephen.com/",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/pythonhero/",
    clutch: "https://clutch.co/profile/oderinde-stephen",
    trustpilot: "https://www.trustpilot.com/review/oderindestephen.com",
    googleBusiness: "https://share.google/vDGgZ0FrAHvVTa31h",
  },
  navigation: [
    { label: "Solutions", path: "/business-website-solutions", isExternal: false, isCta: false },
    { label: "Development", path: "/business-website-development", isExternal: false, isCta: false },
    { label: "Case Studies", path: "/case-studies", isExternal: false, isCta: false },
    { label: "Portfolio", path: "/portfolio", isExternal: false, isCta: false },
    { label: "Pricing", path: "/pricing", isExternal: false, isCta: false },
    { label: "Insights", path: "/insights", isExternal: false, isCta: false },
    { label: "Contact", path: "/contact", isExternal: false, isCta: false },
    { label: "Book Call", path: "https://cal.com/oderinde/free", isExternal: true, isCta: true },
  ],
  footer: {
    copyright: "© 2026 Oderinde Stephen. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms" },
    ],
  },
} as const;
