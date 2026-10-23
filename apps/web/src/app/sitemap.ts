import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts } from "@/lib/cms/api";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://oderindestephen.com";

interface StaticRouteConfig {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: string;
}

const STATIC_ROUTES: StaticRouteConfig[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-10-21T15:20:23Z" },
  { path: "/business-website-solutions", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-10-21T03:08:08Z" },
  { path: "/business-website-development", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-10-21T03:06:10Z" },
  { path: "/e-commerce-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-10-20T02:03:58Z" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-10-20T13:48:42Z" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-10-19T13:04:08Z" },
  { path: "/portfolio", priority: 0.7, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts] = await Promise.all([
    getCaseStudies(),
    getPosts(),
  ]);

  const nowIso = new Date().toISOString();

  // 1. Static Core Routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: route.lastModified ? new Date(route.lastModified) : new Date(nowIso),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Published Case Studies (strictly exclude drafts)
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies
    .filter((cs) => cs.status === "publish" && cs.slug)
    .map((cs) => ({
      url: `${BASE_URL}/case-study/${cs.slug}`,
      lastModified: cs.modified ? new Date(cs.modified) : new Date(nowIso),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // 3. Published Blog Posts (strictly exclude drafts)
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((p) => p.status === "publish" && p.slug)
    .map((p) => ({
      url: `${BASE_URL}/insights/${p.slug}`,
      lastModified: p.modified ? new Date(p.modified) : new Date(nowIso),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...caseStudyEntries, ...postEntries];
}
