import type { ParsedSeoMetadata, RobotsData, JsonLdNode, OpenGraphData, TwitterData } from "./types.ts";
import { getStaticFallbackSeo, DEFAULT_SITE_METADATA } from "./fallback-metadata.ts";
import { ParsedSeoMetadataSchema } from "./schema.ts";

const PUBLIC_ORIGIN =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_ORIGIN ||
  "https://oderindestephen.com";
const WP_API_ORIGIN =
  process.env.WP_API_ORIGIN || "http://localhost:10004";
const CMS_MEDIA_ORIGIN =
  process.env.CMS_MEDIA_ORIGIN || WP_API_ORIGIN;
const WP_HOME_URL =
  process.env.WP_HOME_URL ||
  (WP_API_ORIGIN.includes("localhost") ? "http://oderinde-cms.local" : WP_API_ORIGIN);

const CMS_ORIGINS = [
  WP_API_ORIGIN,
  WP_HOME_URL,
  "https://cms.oderindestephen.com",
  "http://localhost:10004",
  "http://oderinde-cms.local",
  "https://oderinde-cms.local",
  "http://oderindestephen.local",
  "https://oderindestephen.local",
];

/**
 * Translate CMS origins and local hostnames to the public frontend origin.
 * Preserves legitimate external destination links and schema.org namespaces.
 */
export function translateOrigins(text: string): string {
  if (!text) return "";
  let result = text;

  for (const cmsOrigin of CMS_ORIGINS) {
    if (!cmsOrigin) continue;
    // Strip trailing slash for consistent matching
    const cleanOrigin = cmsOrigin.replace(/\/$/, "");
    const escaped = cleanOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "g");
    result = result.replace(regex, PUBLIC_ORIGIN.replace(/\/$/, ""));
  }

  return result;
}

/**
 * Resolve robots directives with protection against CMS-level noindex contamination.
 */
export function resolveRobotsDirective(
  rawRobots: string | undefined,
  isDraft: boolean,
  isEditorialNoindex?: boolean
): RobotsData {
  if (isDraft) {
    return {
      index: false,
      follow: false,
      maxImagePreview: "none",
      maxSnippet: 0,
      maxVideoPreview: 0,
    };
  }

  if (isEditorialNoindex === true) {
    return {
      index: false,
      follow: false,
      maxImagePreview: "none",
      maxSnippet: 0,
      maxVideoPreview: 0,
    };
  }

  const isStaging =
    process.env.ENVIRONMENT === "staging" ||
    process.env.ENVIRONMENT === "preview";

  if (isStaging) {
    return {
      index: false,
      follow: false,
      maxImagePreview: "none",
      maxSnippet: 0,
      maxVideoPreview: 0,
    };
  }

  // Production safety: If WordPress has "Discourage search engines" enabled,
  // rawRobots will contain "noindex", but isEditorialNoindex is not set.
  // In that case, we guarantee production public indexing.
  const containsNoindex = rawRobots ? /noindex/i.test(rawRobots) : false;
  const containsNofollow = rawRobots ? /nofollow/i.test(rawRobots) : false;

  const shouldIndex = containsNoindex && !isEditorialNoindex ? true : !containsNoindex;
  const shouldFollow = containsNofollow && !isEditorialNoindex ? true : !containsNofollow;

  return {
    index: shouldIndex,
    follow: shouldFollow,
    maxImagePreview: "large",
    maxSnippet: -1,
    maxVideoPreview: -1,
  };
}

/**
 * Deduplicate Schema.org graph nodes by @type and normalized @id.
 * Strictly guarantees ONE Organization and ONE WebSite node per page.
 */
export function deduplicateJsonLdGraph(nodes: JsonLdNode[]): JsonLdNode[] {
  const seenTypes = new Set<string>();
  const seenIds = new Set<string>();
  const deduplicated: JsonLdNode[] = [];

  for (const rawNode of nodes) {
    if (!rawNode || typeof rawNode !== "object") continue;

    // Deep translate origins inside the schema node
    const translatedNode = JSON.parse(
      translateOrigins(JSON.stringify(rawNode))
    ) as JsonLdNode;

    const rawType = translatedNode["@type"];
    const types = Array.isArray(rawType) ? rawType.map(String) : [String(rawType || "")];
    const nodeId = String(translatedNode["@id"] || "");

    if (nodeId && seenIds.has(nodeId)) {
      continue;
    }

    // Singular entities: allow at most one Organization, WebSite, BreadcrumbList
    const singularTypes = ["Organization", "WebSite", "BreadcrumbList"];
    let isDuplicateSingular = false;
    for (const t of types) {
      if (singularTypes.includes(t)) {
        if (seenTypes.has(t)) {
          isDuplicateSingular = true;
          break;
        }
      }
    }

    if (isDuplicateSingular) {
      continue;
    }

    for (const t of types) {
      if (singularTypes.includes(t)) {
        seenTypes.add(t);
      }
    }

    if (nodeId) {
      seenIds.add(nodeId);
    }

    deduplicated.push(translatedNode);
  }

  return deduplicated;
}

/**
 * Pure TypeScript regex/token parser for Rank Math HTML head string.
 * Edge-safe (zero DOM/Cheerio dependencies).
 */
export function parseRankMathHead(
  rawHead: string,
  path: string,
  options?: { isDraft?: boolean; isEditorialNoindex?: boolean }
): ParsedSeoMetadata {
  const isDraft = options?.isDraft ?? false;
  const isEditorialNoindex = options?.isEditorialNoindex;

  // 1. Extract Title
  const titleMatch = rawHead.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? titleMatch[1].trim() : "";
  const title = translateOrigins(rawTitle);

  // 2. Extract Meta Tags
  const metaMap = new Map<string, string>();
  const metaRegex = /<meta\s+(?:name|property)=["']([^"']+)["']\s+content=["']([^"']*)["']\s*\/?>/gi;
  let match: RegExpExecArray | null;

  while ((match = metaRegex.exec(rawHead)) !== null) {
    const key = match[1].toLowerCase();
    const val = match[2];
    metaMap.set(key, val);
  }

  // 3. Extract Canonical Link
  const canonicalMatch = rawHead.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']\s*\/?>/i);
  const rawCanonical = canonicalMatch ? canonicalMatch[1].trim() : "";
  const canonical = rawCanonical
    ? translateOrigins(rawCanonical)
    : `${PUBLIC_ORIGIN}${path === "/" ? "" : path}`;

  // 4. Description
  const description = metaMap.get("description") || "";

  // 5. Robots
  const rawRobots = metaMap.get("robots");
  const robots = resolveRobotsDirective(rawRobots, isDraft, isEditorialNoindex);

  // 6. Open Graph
  const ogTitle = metaMap.get("og:title") || title;
  const ogDescription = metaMap.get("og:description") || description;
  const ogUrl = metaMap.get("og:url") ? translateOrigins(metaMap.get("og:url")!) : canonical;
  const ogSiteName = metaMap.get("og:site_name") || DEFAULT_SITE_METADATA.siteName;
  const ogLocale = metaMap.get("og:locale") || "en_GB";
  const ogType = metaMap.get("og:type") || "website";

  const ogImages: OpenGraphData["images"] = [];
  const ogImageUrl = metaMap.get("og:image");
  if (ogImageUrl) {
    const translatedImageUrl = translateOrigins(ogImageUrl);
    ogImages.push({
      url: translatedImageUrl,
      width: metaMap.get("og:image:width") ? Number(metaMap.get("og:image:width")) : 1200,
      height: metaMap.get("og:image:height") ? Number(metaMap.get("og:image:height")) : 630,
      alt: ogTitle,
    });
  } else {
    ogImages.push({
      url: DEFAULT_SITE_METADATA.defaultOgImage,
      width: 1200,
      height: 630,
      alt: ogTitle,
    });
  }

  const openGraph: OpenGraphData = {
    title: ogTitle,
    description: ogDescription,
    url: ogUrl,
    siteName: ogSiteName,
    locale: ogLocale,
    type: ogType,
    images: ogImages,
  };

  // 7. Twitter
  const twitterCard = (metaMap.get("twitter:card") as TwitterData["card"]) || "summary_large_image";
  const twitterTitle = metaMap.get("twitter:title") || ogTitle;
  const twitterDescription = metaMap.get("twitter:description") || ogDescription;
  const twitterImage = metaMap.get("twitter:image");

  const twitter: TwitterData = {
    card: twitterCard,
    title: twitterTitle,
    description: twitterDescription,
    images: twitterImage ? [translateOrigins(twitterImage)] : [DEFAULT_SITE_METADATA.defaultOgImage],
  };

  // 8. JSON-LD Structured Data
  const jsonLdNodes: JsonLdNode[] = [];
  const scriptRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch: RegExpExecArray | null;

  while ((scriptMatch = scriptRegex.exec(rawHead)) !== null) {
    try {
      const parsedJson = JSON.parse(scriptMatch[1].trim());
      if (parsedJson && Array.isArray(parsedJson["@graph"])) {
        jsonLdNodes.push(...parsedJson["@graph"]);
      } else if (parsedJson && parsedJson["@type"]) {
        jsonLdNodes.push(parsedJson);
      }
    } catch {
      // Ignore malformed JSON-LD in raw head
    }
  }

  const deduplicatedSchema = deduplicateJsonLdGraph(jsonLdNodes);

  return {
    title: title || DEFAULT_SITE_METADATA.siteName,
    description,
    canonical,
    robots,
    openGraph,
    twitter,
    jsonLd: deduplicatedSchema.length > 0 ? deduplicatedSchema : getStaticFallbackSeo(path).jsonLd,
  };
}

/**
 * Fetch and parse SEO metadata from Rank Math Headless REST API.
 * Resiliently falls back to curated static metadata if CMS is unreachable.
 */
export async function getRankMathSeo(
  path: string,
  options?: { isDraft?: boolean; isEditorialNoindex?: boolean }
): Promise<ParsedSeoMetadata> {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");

  try {
    const targetCmsUrl = `${WP_HOME_URL}${normalizedPath === "/" ? "/" : normalizedPath + "/"}`;
    const apiUrl = `${WP_API_ORIGIN}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(targetCmsUrl)}`;

    const res = await fetch(apiUrl, {
      next: {
        tags: ["cms-seo", `seo-${normalizedPath}`],
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return getStaticFallbackSeo(normalizedPath);
    }

    const data = await res.json();
    if (!data || typeof data.head !== "string" || !data.head.trim()) {
      return getStaticFallbackSeo(normalizedPath);
    }

    const parsed = parseRankMathHead(data.head, normalizedPath, options);
    return ParsedSeoMetadataSchema.parse(parsed);
  } catch (err) {
    console.warn(`[SEO API] Using fallback metadata for path "${normalizedPath}":`, err);
    return getStaticFallbackSeo(normalizedPath);
  }
}
