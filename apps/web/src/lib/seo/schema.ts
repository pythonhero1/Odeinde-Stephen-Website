import { z } from "zod";

/**
 * Raw response from Rank Math Headless REST API:
 * GET /wp-json/rankmath/v1/getHead?url={url}
 */
export const RankMathRawResponseSchema = z.object({
  success: z.boolean(),
  head: z.string(),
});
export type RankMathRawResponse = z.infer<typeof RankMathRawResponseSchema>;

export const OpenGraphImageSchema = z.object({
  url: z.string().url(),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional(),
  type: z.string().optional(),
});

export const OpenGraphDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().url().optional(),
  siteName: z.string().default("Oderinde Stephen"),
  locale: z.string().default("en_GB"),
  type: z.string().default("website"),
  images: z.array(OpenGraphImageSchema).default([]),
});

export const TwitterDataSchema = z.object({
  card: z.enum(["summary", "summary_large_image", "app", "player"]).default("summary_large_image"),
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).default([]),
});

export const RobotsDataSchema = z.object({
  index: z.boolean().default(true),
  follow: z.boolean().default(true),
  maxImagePreview: z.enum(["none", "standard", "large"]).default("large"),
  maxSnippet: z.number().default(-1),
  maxVideoPreview: z.number().default(-1),
});

export const JsonLdNodeSchema = z.object({
  "@type": z.string(),
  "@id": z.string().optional(),
}).passthrough();

export const ParsedSeoMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  canonical: z.string().url().optional(),
  robots: RobotsDataSchema,
  openGraph: OpenGraphDataSchema,
  twitter: TwitterDataSchema,
  jsonLd: z.array(JsonLdNodeSchema).default([]),
});
