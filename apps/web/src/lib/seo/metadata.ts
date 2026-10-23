import type { Metadata } from "next";
import { getRankMathSeo } from "./rankmath.ts";
import { DEFAULT_SITE_METADATA } from "./fallback-metadata.ts";

interface PageMetadataOptions {
  fallbackTitle?: string;
  fallbackDescription?: string;
  isDraft?: boolean;
  isEditorialNoindex?: boolean;
}

/**
 * Construct Next.js App Router Metadata object by querying Rank Math
 * with automatic fallback to curated static metadata.
 */
export async function constructPageMetadata(
  path: string,
  options?: PageMetadataOptions
): Promise<Metadata> {
  const seo = await getRankMathSeo(path, {
    isDraft: options?.isDraft,
    isEditorialNoindex: options?.isEditorialNoindex,
  });

  const title = options?.fallbackTitle
    ? (seo.title.includes("Oderinde") ? seo.title : `${options.fallbackTitle} | ${DEFAULT_SITE_METADATA.siteName}`)
    : seo.title;
  const description = seo.description || options?.fallbackDescription || DEFAULT_SITE_METADATA.siteName;
  const canonical = seo.canonical || `${DEFAULT_SITE_METADATA.origin}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    metadataBase: new URL(DEFAULT_SITE_METADATA.origin),
    alternates: {
      canonical,
    },
    openGraph: {
      title: seo.openGraph.title || title,
      description: seo.openGraph.description || description,
      url: seo.openGraph.url || canonical,
      siteName: seo.openGraph.siteName || DEFAULT_SITE_METADATA.siteName,
      locale: seo.openGraph.locale || "en_GB",
      type: (seo.openGraph.type as "website" | "article") || "website",
      images: seo.openGraph.images.length > 0
        ? seo.openGraph.images
        : [{ url: DEFAULT_SITE_METADATA.defaultOgImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: seo.twitter.card || "summary_large_image",
      title: seo.twitter.title || title,
      description: seo.twitter.description || description,
      images: seo.twitter.images.length > 0
        ? seo.twitter.images
        : [DEFAULT_SITE_METADATA.defaultOgImage],
    },
    robots: {
      index: seo.robots.index,
      follow: seo.robots.follow,
      googleBot: {
        index: seo.robots.index,
        follow: seo.robots.follow,
        "max-image-preview": seo.robots.maxImagePreview || "large",
        "max-snippet": seo.robots.maxSnippet ?? -1,
        "max-video-preview": seo.robots.maxVideoPreview ?? -1,
      },
    },
  };
}
