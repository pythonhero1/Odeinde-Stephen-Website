/**
 * Strongly typed SEO interfaces for Rank Math headless integration,
 * metadata generation, and Schema.org structured data.
 */

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export interface OpenGraphData {
  title?: string;
  description?: string;
  url?: string;
  siteName: string;
  locale: string;
  type: string;
  images: OpenGraphImage[];
}

export interface TwitterData {
  card: "summary" | "summary_large_image" | "app" | "player";
  title?: string;
  description?: string;
  images: string[];
}

export interface RobotsData {
  index: boolean;
  follow: boolean;
  maxImagePreview?: "none" | "standard" | "large";
  maxSnippet?: number;
  maxVideoPreview?: number;
}

export interface JsonLdNode {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
}

export interface ParsedSeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  robots: RobotsData;
  openGraph: OpenGraphData;
  twitter: TwitterData;
  jsonLd: JsonLdNode[];
}

export interface FallbackSeoItem {
  title: string;
  description: string;
  canonical: string;
  openGraphType?: string;
  schemaType?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
}
