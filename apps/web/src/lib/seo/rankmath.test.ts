import test from "node:test";
import assert from "node:assert/strict";
import {
  translateOrigins,
  resolveRobotsDirective,
  deduplicateJsonLdGraph,
  parseRankMathHead,
} from "./rankmath.ts";
import { getStaticFallbackSeo } from "./fallback-metadata.ts";

test("translateOrigins converts CMS origins to public domain while preserving external links", () => {
  const localCmsString = "http://localhost:10004/business-website-solutions/";
  const translated = translateOrigins(localCmsString);
  assert.equal(translated, "https://oderindestephen.com/business-website-solutions/");

  const productionCmsString = "https://cms.oderindestephen.com/pricing/";
  assert.equal(translateOrigins(productionCmsString), "https://oderindestephen.com/pricing/");

  // External URLs must NOT be modified
  const externalCal = "https://cal.com/oderinde/free";
  assert.equal(translateOrigins(externalCal), "https://cal.com/oderinde/free");

  const externalLinkedIn = "https://www.linkedin.com/in/pythonhero/";
  assert.equal(translateOrigins(externalLinkedIn), "https://www.linkedin.com/in/pythonhero/");

  const schemaContext = "https://schema.org";
  assert.equal(translateOrigins(schemaContext), "https://schema.org");
});

test("resolveRobotsDirective enforces draft mode and editorial noindex isolation", () => {
  // 1. Draft mode must ALWAYS be unindexed
  const draftRobots = resolveRobotsDirective("index, follow", true, false);
  assert.equal(draftRobots.index, false);
  assert.equal(draftRobots.follow, false);

  // 2. Editorial noindex must ALWAYS be unindexed
  const editorialRobots = resolveRobotsDirective("index, follow", false, true);
  assert.equal(editorialRobots.index, false);
  assert.equal(editorialRobots.follow, false);
});

test("resolveRobotsDirective overrides CMS global search discouragement on production domain", () => {
  // WordPress staging/local blog_public = 0 outputs 'noindex, nofollow'
  const rawCmsRobots = "noindex, nofollow";
  const productionRobots = resolveRobotsDirective(rawCmsRobots, false, false);

  // Must override to index: true, follow: true to protect production SEO
  assert.equal(productionRobots.index, true);
  assert.equal(productionRobots.follow, true);
});

test("deduplicateJsonLdGraph guarantees single-owner Organization and WebSite nodes", () => {
  const nodes = [
    {
      "@type": "Organization",
      "@id": "http://localhost:10004/#organization",
      name: "Oderinde Stephen",
    },
    {
      "@type": "Organization",
      "@id": "http://localhost:10004/#organization-dup",
      name: "Duplicate Org",
    },
    {
      "@type": "WebSite",
      "@id": "http://localhost:10004/#website",
      name: "Website One",
    },
    {
      "@type": "WebSite",
      "@id": "http://localhost:10004/#website",
      name: "Duplicate WebSite",
    },
    {
      "@type": "Service",
      "@id": "http://localhost:10004/#service",
      name: "Website Engineering",
    },
  ];

  const result = deduplicateJsonLdGraph(nodes);

  // Should keep only 1 Organization, 1 WebSite, and 1 Service
  const orgCount = result.filter((n) => n["@type"] === "Organization").length;
  const siteCount = result.filter((n) => n["@type"] === "WebSite").length;
  const serviceCount = result.filter((n) => n["@type"] === "Service").length;

  assert.equal(orgCount, 1);
  assert.equal(siteCount, 1);
  assert.equal(serviceCount, 1);

  // Verify origin translation inside schema @id
  const orgNode = result.find((n) => n["@type"] === "Organization");
  assert.equal(orgNode?.["@id"], "https://oderindestephen.com/#organization");
});

test("parseRankMathHead parses HTML head tokens and normalizes tags correctly", () => {
  const mockHead = `
    <title>Business Website Solutions | Oderinde Stephen</title>
    <meta name="description" content="Problem-focused web architecture and digital strategy." />
    <link rel="canonical" href="http://localhost:10004/business-website-solutions/" />
    <meta property="og:title" content="Business Website Solutions | Oderinde Stephen" />
    <meta property="og:description" content="Problem-focused web architecture." />
    <meta property="og:url" content="http://localhost:10004/business-website-solutions/" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json" class="rank-math-schema">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": "http://localhost:10004/#service",
            "name": "Business Solutions"
          }
        ]
      }
    </script>
  `;

  const parsed = parseRankMathHead(mockHead, "/business-website-solutions");

  assert.equal(parsed.title, "Business Website Solutions | Oderinde Stephen");
  assert.equal(parsed.description, "Problem-focused web architecture and digital strategy.");
  assert.equal(parsed.canonical, "https://oderindestephen.com/business-website-solutions/");
  assert.equal(parsed.openGraph.url, "https://oderindestephen.com/business-website-solutions/");
  assert.equal(parsed.twitter.card, "summary_large_image");
  assert.equal(parsed.jsonLd.length, 1);
  assert.equal(parsed.jsonLd[0]["@id"], "https://oderindestephen.com/#service");
});

test("getStaticFallbackSeo returns complete metadata and schema for core routes", () => {
  const homeFallback = getStaticFallbackSeo("/");
  assert.ok(homeFallback.title.includes("Oderinde Stephen"));
  assert.equal(homeFallback.canonical, "https://oderindestephen.com/");
  assert.equal(homeFallback.robots.index, true);
  assert.ok(homeFallback.jsonLd.length >= 2);

  const pricingFallback = getStaticFallbackSeo("/pricing");
  assert.ok(pricingFallback.title.includes("Pricing"));
  assert.equal(pricingFallback.canonical, "https://oderindestephen.com/pricing");
  assert.ok(pricingFallback.jsonLd.some((n) => n["@type"] === "PriceSpecification"));
});

test("deduplicateJsonLdGraph handles multi-type array @type correctly", () => {
  const nodes = [
    {
      "@type": ["Person", "Organization"],
      "@id": "http://localhost:10004/#person-org",
      name: "Oderinde Stephen",
    },
    {
      "@type": "Organization",
      "@id": "http://localhost:10004/#organization-dup",
      name: "Duplicate Org",
    },
    {
      "@type": ["WebPage", "ContactPage"],
      "@id": "http://localhost:10004/contact/#webpage",
      name: "Contact Page",
    },
  ];

  const result = deduplicateJsonLdGraph(nodes);

  // The first node has ["Person", "Organization"], claiming the Organization slot
  // The second node is pure "Organization" and must be dropped as duplicate
  // The third node has ["WebPage", "ContactPage"] and should be kept
  assert.equal(result.length, 2);
  assert.deepEqual(result[0]["@type"], ["Person", "Organization"]);
  assert.equal(result[0]["@id"], "https://oderindestephen.com/#person-org");
  assert.deepEqual(result[1]["@type"], ["WebPage", "ContactPage"]);
});
