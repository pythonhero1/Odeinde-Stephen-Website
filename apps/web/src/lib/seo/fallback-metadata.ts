import type { FallbackSeoItem, ParsedSeoMetadata, JsonLdNode } from "./types.ts";

export const DEFAULT_SITE_METADATA = {
  siteName: "Oderinde Stephen",
  origin: "https://oderindestephen.com",
  defaultOgImage: "https://oderindestephen.com/images/og-default.png",
  twitterHandle: "@pythonhero",
};

export const STATIC_ROUTE_METADATA: Record<string, FallbackSeoItem> = {
  "/": {
    title: "Website Development & Digital Solutions | Oderinde Stephen",
    description:
      "High-performance headless WordPress and web development for scaling businesses. Bespoke engineering, clean architectures, and proven outcomes.",
    canonical: "https://oderindestephen.com/",
    openGraphType: "website",
    schemaType: "WebSite",
  },
  "/business-website-solutions": {
    title: "Business Website Solutions | Oderinde Stephen",
    description:
      "Start with what your business needs the website to solve. Problem-focused digital strategies, conversion-focused architectures, and platform-flexible web systems.",
    canonical: "https://oderindestephen.com/business-website-solutions",
    openGraphType: "website",
    schemaType: "Service",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Business Website Solutions", path: "/business-website-solutions" },
    ],
  },
  "/business-website-development": {
    title: "Business Website Development | Custom Engineering & Headless CMS",
    description:
      "Modern web engineering with clean code, modular architecture, and headless CMS capabilities. Built for long-term maintainability and high speed.",
    canonical: "https://oderindestephen.com/business-website-development",
    openGraphType: "website",
    schemaType: "Service",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Business Website Development", path: "/business-website-development" },
    ],
  },
  "/e-commerce-development": {
    title: "E-Commerce Development | Scalable Online Stores & Workflows",
    description:
      "Custom WooCommerce and Shopify storefronts engineered for fast checkout, seamless inventory workflows, and reliable sales conversion.",
    canonical: "https://oderindestephen.com/e-commerce-development",
    openGraphType: "website",
    schemaType: "Service",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "E-Commerce Development", path: "/e-commerce-development" },
    ],
  },
  "/case-studies": {
    title: "Client Case Studies & Verified Engineering Outcomes | Oderinde Stephen",
    description:
      "Real-world digital systems, B2B redesigns, and headless architectures delivered for growth-focused businesses across the UK and internationally.",
    canonical: "https://oderindestephen.com/case-studies",
    openGraphType: "website",
    schemaType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Case Studies", path: "/case-studies" },
    ],
  },
  "/pricing": {
    title: "Pricing & Transparent Project Packages | Oderinde Stephen",
    description:
      "Clear, scope-driven development packages starting from £250 to £700. Transparent milestones, zero hidden surprises, and tailored quotes.",
    canonical: "https://oderindestephen.com/pricing",
    openGraphType: "website",
    schemaType: "PriceSpecification",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ],
  },
  "/contact": {
    title: "Contact & Project Consultation | Oderinde Stephen",
    description:
      "Discuss your website development, architecture redesign, or headless migration. Direct consultation with Stephen based in London.",
    canonical: "https://oderindestephen.com/contact",
    openGraphType: "website",
    schemaType: "ContactPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  },
  "/portfolio": {
    title: "Selected Client Work & Digital Portfolio | Oderinde Stephen",
    description:
      "Explore selected engineering systems, client web designs, and technical outcomes delivered by Oderinde Stephen.",
    canonical: "https://oderindestephen.com/portfolio",
    openGraphType: "website",
    schemaType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
    ],
  },
  "/insights": {
    title: "Technical Insights & Architectural Guides | Oderinde Stephen",
    description:
      "Practical engineering perspectives on WordPress, headless architectures, performance optimization, and digital strategy for modern businesses.",
    canonical: "https://oderindestephen.com/insights",
    openGraphType: "website",
    schemaType: "Blog",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy | Oderinde Stephen",
    description:
      "Clear, transparent details on how your personal data and project enquiries are managed in compliance with UK GDPR and Data Protection laws.",
    canonical: "https://oderindestephen.com/privacy-policy",
    openGraphType: "website",
    schemaType: "WebPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
  "/terms": {
    title: "Terms of Service | Oderinde Stephen",
    description:
      "Standard professional terms and operational guidelines governing engineering engagements, proposals, and digital services.",
    canonical: "https://oderindestephen.com/terms",
    openGraphType: "website",
    schemaType: "WebPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Terms of Service", path: "/terms" },
    ],
  },
};

/**
 * Generate fallback structured JSON-LD graph for a static or dynamic route.
 */
export function generateFallbackJsonLd(path: string, item: FallbackSeoItem): JsonLdNode[] {
  const origin = DEFAULT_SITE_METADATA.origin;
  const canonicalUrl = item.canonical;

  const organizationNode: JsonLdNode = {
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: "Oderinde Stephen",
    url: `${origin}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${origin}/#logo`,
      url: `${origin}/images/og-default.png`,
      caption: "Oderinde Stephen Logo",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "Contact@oderindestephen.com",
      telephone: "+44 7848 149224",
      contactType: "customer service",
    },
    sameAs: [
      "https://www.linkedin.com/in/pythonhero/",
      "https://clutch.co/profile/oderinde-stephen",
      "https://www.trustpilot.com/review/oderindestephen.com",
      "https://share.google/vDGgZ0FrAHvVTa31h",
    ],
  };

  const websiteNode: JsonLdNode = {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: `${origin}/`,
    name: "Oderinde Stephen",
    description: "High-performance headless WordPress and web development.",
    publisher: {
      "@id": `${origin}/#organization`,
    },
    inLanguage: "en-GB",
  };

  const webPageNode: JsonLdNode = {
    "@type": item.schemaType || "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: item.title,
    description: item.description,
    isPartOf: {
      "@id": `${origin}/#website`,
    },
    inLanguage: "en-GB",
  };

  const nodes: JsonLdNode[] = [organizationNode, websiteNode, webPageNode];

  if (item.breadcrumbs && item.breadcrumbs.length > 0) {
    const breadcrumbList: JsonLdNode = {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: item.breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.name,
        item: `${origin}${crumb.path === "/" ? "" : crumb.path}`,
      })),
    };
    nodes.push(breadcrumbList);
  }

  return nodes;
}

/**
 * Get fallback metadata when Rank Math is unreachable.
 */
export function getStaticFallbackSeo(path: string): ParsedSeoMetadata {
  const normalizedPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const item = STATIC_ROUTE_METADATA[normalizedPath] || {
    title: "Oderinde Stephen | Web Development & Digital Solutions",
    description: "High-performance headless WordPress and web engineering.",
    canonical: `https://oderindestephen.com${normalizedPath === "/" ? "" : normalizedPath}`,
    openGraphType: "website",
    schemaType: "WebPage",
  };

  return {
    title: item.title,
    description: item.description,
    canonical: item.canonical,
    robots: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
    openGraph: {
      title: item.title,
      description: item.description,
      url: item.canonical,
      siteName: DEFAULT_SITE_METADATA.siteName,
      locale: "en_GB",
      type: item.openGraphType || "website",
      images: [
        {
          url: DEFAULT_SITE_METADATA.defaultOgImage,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [DEFAULT_SITE_METADATA.defaultOgImage],
    },
    jsonLd: generateFallbackJsonLd(normalizedPath, item),
  };
}
