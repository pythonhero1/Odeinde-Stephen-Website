import {
  SiteSettingsSchema,
  PathResolverSchema,
  CaseStudySchema,
  PageSchema,
  type SiteSettings,
  type PathResolution,
  type CaseStudy,
  type Page,
  type CmsEnquiryPayload,
} from "./schema.ts";
import { CMS_CACHE_TAGS, DEFAULT_SITE_SETTINGS, getCmsFetchOptions } from "./cache.ts";

const WP_API_ORIGIN = process.env.WP_API_ORIGIN || "http://localhost:10004";
const CMS_BRIDGE_SECRET = process.env.CMS_BRIDGE_SECRET || "local-bridge-dev-secret-key-32chars";

/**
 * Fetch public site settings from /wp-json/os/v1/site.
 * Falls back resiliently to DEFAULT_SITE_SETTINGS if CMS is unavailable.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(
      `${WP_API_ORIGIN}/wp-json/os/v1/site`,
      getCmsFetchOptions([CMS_CACHE_TAGS.settings])
    );

    if (!res.ok) {
      console.warn(`[CMS API] /os/v1/site returned ${res.status}, using default settings.`);
      return SiteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
    }

    const data = await res.json();
    return SiteSettingsSchema.parse(data);
  } catch (err) {
    console.error("[CMS API] Failed to fetch site settings:", err);
    return SiteSettingsSchema.parse(DEFAULT_SITE_SETTINGS);
  }
}

/**
 * Resolve a public URL path to a WordPress content type and ID.
 * Returns null if path is non-existent or unpublished (404).
 */
export async function resolvePath(path: string): Promise<PathResolution | null> {
  try {
    const url = `${WP_API_ORIGIN}/wp-json/os/v1/resolve?path=${encodeURIComponent(path)}`;
    const res = await fetch(url, getCmsFetchOptions([CMS_CACHE_TAGS.pages]));

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Path resolution failed with status: ${res.status}`);
    }

    const data = await res.json();
    return PathResolverSchema.parse(data);
  } catch (err) {
    console.error(`[CMS API] Failed to resolve path "${path}":`, err);
    return null;
  }
}

/**
 * Fetch all published case studies from /wp/v2/case-study.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(
      `${WP_API_ORIGIN}/wp-json/wp/v2/case-study?_embed&per_page=100`,
      getCmsFetchOptions([CMS_CACHE_TAGS.caseStudies, CMS_CACHE_TAGS.pages])
    );

    if (!res.ok) {
      throw new Error(`Case studies fetch failed with status: ${res.status}`);
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item) => CaseStudySchema.parse(item));
  } catch (err) {
    console.error("[CMS API] Failed to fetch case studies:", err);
    return [];
  }
}

async function isDraftModeEnabled(): Promise<boolean> {
  try {
    const { draftMode } = await import("next/headers");
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

/**
 * Fetch a single case study by its slug.
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const isDraft = await isDraftModeEnabled();

    if (isDraft) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = await computeHmacSha256(`${timestamp}./os/v1/preview`, CMS_BRIDGE_SECRET);

      const res = await fetch(
        `${WP_API_ORIGIN}/wp-json/os/v1/preview?slug=${encodeURIComponent(slug)}&type=case-study`,
        {
          headers: {
            "X-OS-Signature": signature,
            "X-OS-Timestamp": timestamp,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      return CaseStudySchema.parse(data);
    }

    const res = await fetch(
      `${WP_API_ORIGIN}/wp-json/wp/v2/case-study?slug=${encodeURIComponent(slug)}&_embed`,
      getCmsFetchOptions([CMS_CACHE_TAGS.caseStudies, `case-study-${slug}`])
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return CaseStudySchema.parse(data[0]);
  } catch (err) {
    console.error(`[CMS API] Failed to fetch case study "${slug}":`, err);
    return null;
  }
}

/**
 * Fetch a page by its slug from /wp/v2/pages.
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const isDraft = await isDraftModeEnabled();

    if (isDraft) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = await computeHmacSha256(`${timestamp}./os/v1/preview`, CMS_BRIDGE_SECRET);

      const res = await fetch(
        `${WP_API_ORIGIN}/wp-json/os/v1/preview?slug=${encodeURIComponent(slug)}&type=page`,
        {
          headers: {
            "X-OS-Signature": signature,
            "X-OS-Timestamp": timestamp,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      return PageSchema.parse(data);
    }

    const res = await fetch(
      `${WP_API_ORIGIN}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed`,
      getCmsFetchOptions([CMS_CACHE_TAGS.pages, `page-${slug}`])
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return PageSchema.parse(data[0]);
  } catch (err) {
    console.error(`[CMS API] Failed to fetch page "${slug}":`, err);
    return null;
  }
}

/**
 * Fetch a page by its ID.
 */
export async function getPageById(id: number): Promise<Page | null> {
  try {
    const isDraft = await isDraftModeEnabled();
    const fetchOptions = isDraft
      ? { cache: "no-store" as const }
      : getCmsFetchOptions([CMS_CACHE_TAGS.pages, `page-id-${id}`]);

    const url = `${WP_API_ORIGIN}/wp-json/wp/v2/pages/${id}?_embed`;
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return PageSchema.parse(data);
  } catch (err) {
    console.error(`[CMS API] Failed to fetch page ID ${id}:`, err);
    return null;
  }
}

/**
 * Compute HMAC-SHA256 signature using standard Web Crypto API.
 * Works natively in Node.js and Cloudflare Pages Workers runtime.
 */
export async function computeHmacSha256(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Relay an authenticated client enquiry to WordPress /wp-json/os/v1/enquiries.
 */
export async function submitEnquiryToCms(payload: CmsEnquiryPayload): Promise<{
  success: boolean;
  enquiryId?: number;
  message: string;
}> {
  const rawBody = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = await computeHmacSha256(`${timestamp}.${rawBody}`, CMS_BRIDGE_SECRET);

  const res = await fetch(`${WP_API_ORIGIN}/wp-json/os/v1/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-OS-Signature": signature,
      "X-OS-Timestamp": timestamp,
    },
    body: rawBody,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `CMS enquiry submission failed with status ${res.status}`);
  }

  return {
    success: true,
    enquiryId: data.enquiryId,
    message: data.message || "Enquiry submitted successfully.",
  };
}
