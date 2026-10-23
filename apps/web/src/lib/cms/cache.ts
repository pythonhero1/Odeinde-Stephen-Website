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
 * Verified default site settings contract per D-6, D-8, D-10.
 * Serves as resilient fallback until Phase 02 /wp-json/os/v1/site is connected.
 */
export const DEFAULT_SITE_SETTINGS = {
  siteName: "Oderinde Stephen",
  siteTagline: "Website Development & Digital Solutions",
  bookingUrl: "https://cal.com/oderinde/free",
  contactEmail: "Contact@oderindestephen.com",
  currency: "GBP" as const,
  portalUrl: "https://portal.oderindestephen.com/",
} as const;
