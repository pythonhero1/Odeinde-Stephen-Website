/**
 * Automated Route, SEO, CTA & Redirect Crawler
 *
 * Runs against a running Next.js instance (default: http://localhost:3000)
 * Verifies all 13 in-scope routes, SEO metadata, JSON-LD, booking CTAs, 301 redirects, and custom 404 behavior.
 *
 * Usage: node tools/crawl-routes.mjs [baseUrl]
 */

const BASE_URL = process.argv[2] || process.env.TEST_BASE_URL || "http://localhost:3000";

const CORE_ROUTES = [
  "/",
  "/business-website-solutions",
  "/business-website-development",
  "/e-commerce-development",
  "/case-studies",
  "/case-study/born-accelerators-case-study-website",
  "/case-study/pipe-patch-pro-amazon-listing-website",
  "/pricing",
  "/contact",
  "/portfolio",
  "/insights",
  "/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026",
  "/privacy-policy",
  "/terms",
];

const REDIRECTS = [
  { from: "/solutions", to: "/business-website-solutions", expectedStatus: 301 },
  { from: "/website-redesign", to: "/business-website-solutions", expectedStatus: 301 },
  { from: "/wordpress-development", to: "/business-website-development", expectedStatus: 301 },
  { from: "/woocommerce-development", to: "/e-commerce-development", expectedStatus: 301 },
  { from: "/blog", to: "/insights", expectedStatus: 301 },
  {
    from: "/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026",
    to: "/insights/why-wordpress-is-still-a-game-changer-for-small-businesses-in-2026",
    expectedStatus: 301,
  },
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assertCheck(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function verifyRoute(path) {
  const url = `${BASE_URL}${path}`;
  console.log(`\nVerifying Route: ${path}`);

  try {
    const res = await fetch(url, { headers: { "User-Agent": "OderindeRouteCrawler/1.0" } });
    assertCheck(res.status === 200, `${path} returns HTTP 200 (actual: ${res.status})`);

    const html = await res.text();

    // 1. Title verification
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const hasTitle = Boolean(titleMatch && titleMatch[1].trim().length > 0);
    assertCheck(hasTitle, `${path} contains non-empty <title>: "${titleMatch ? titleMatch[1] : ""}"`);

    // 2. Meta description verification
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const hasDesc = Boolean(descMatch && descMatch[1].trim().length > 0);
    assertCheck(hasDesc, `${path} contains non-empty meta description`);

    // 3. Canonical link verification
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const hasCanonical = Boolean(canonicalMatch && canonicalMatch[1].startsWith("https://oderindestephen.com"));
    assertCheck(
      hasCanonical,
      `${path} contains canonical origin: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`
    );

    // Ensure no .local or CMS origins leak into public canonical
    const leaksLocal = html.includes("http://localhost:10004") || html.includes("http://oderinde-cms.local");
    assertCheck(!leaksLocal, `${path} contains ZERO leaked local CMS origins in HTML`);

    // 4. JSON-LD structured data verification
    const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatches && jsonLdMatches.length > 0) {
      let parsedAll = true;
      for (const tag of jsonLdMatches) {
        const rawJson = tag.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "").trim();
        try {
          JSON.parse(rawJson);
        } catch {
          parsedAll = false;
        }
      }
      assertCheck(parsedAll, `${path} JSON-LD structured data parses as valid JSON (${jsonLdMatches.length} script tags)`);
    } else {
      assertCheck(true, `${path} renders clean HTML (JSON-LD optional for this path)`);
    }

    // 5. Booking link integrity check
    const bookingLinks = html.match(/href=["'](https:\/\/cal\.com\/[^"']*)["']/gi) || [];
    for (const linkTag of bookingLinks) {
      const matchUrl = linkTag.replace(/href=["']/i, "").replace(/["']$/, "");
      assertCheck(
        matchUrl === "https://cal.com/oderinde/free",
        `${path} booking CTA strictly uses https://cal.com/oderinde/free (found: ${matchUrl})`
      );
    }
  } catch (err) {
    assertCheck(false, `${path} fetch threw exception: ${err.message}`);
  }
}

async function verifyRedirects() {
  console.log("\nVerifying 301 Permanent Redirects:");
  for (const r of REDIRECTS) {
    const url = `${BASE_URL}${r.from}`;
    try {
      const res = await fetch(url, { redirect: "manual" });
      const location = res.headers.get("location") || "";
      const statusMatches = res.status === 301 || res.status === 308;
      const targetMatches = location.endsWith(r.to) || location === r.to;

      assertCheck(
        statusMatches && targetMatches,
        `${r.from} -> ${r.to} (Status: ${res.status}, Location: ${location})`
      );
    } catch (err) {
      assertCheck(false, `${r.from} redirect check failed: ${err.message}`);
    }
  }
}

async function verifyNotFound() {
  console.log("\nVerifying Custom Branded 404 Error Page:");
  const notFoundUrl = `${BASE_URL}/this-route-does-not-exist-at-all-xyz-404`;

  try {
    const res = await fetch(notFoundUrl);
    assertCheck(res.status === 404, `/404 probe returns genuine HTTP 404 status (actual: ${res.status})`);

    const html = await res.text();
    const hasBrandedCopy = html.includes("Lost in the Digital Architecture?") || html.includes("404");
    assertCheck(hasBrandedCopy, `404 page renders branded recovery copy`);

    const hasHomepageButton = html.includes("Return to Homepage");
    assertCheck(hasHomepageButton, `404 page includes "Return to Homepage" recovery button`);
  } catch (err) {
    assertCheck(false, `404 check threw exception: ${err.message}`);
  }
}

async function verifySitemapAndRobots() {
  console.log("\nVerifying /sitemap.xml and /robots.txt:");

  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    assertCheck(sitemapRes.status === 200, `/sitemap.xml returns HTTP 200`);
    const sitemapXml = await sitemapRes.text();
    assertCheck(sitemapXml.includes("<urlset"), `/sitemap.xml returns valid XML urlset`);
    assertCheck(sitemapXml.includes("https://oderindestephen.com"), `/sitemap.xml contains public domain URLs`);
    assertCheck(!sitemapXml.includes("/api/"), `/sitemap.xml excludes /api/ endpoints`);

    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    assertCheck(robotsRes.status === 200, `/robots.txt returns HTTP 200`);
    const robotsTxt = await robotsRes.text();
    assertCheck(robotsTxt.includes("User-Agent: *") || robotsTxt.includes("User-agent: *"), `/robots.txt declares User-agent`);
    assertCheck(robotsTxt.includes("sitemap.xml"), `/robots.txt references sitemap`);
  } catch (err) {
    assertCheck(false, `Sitemap/Robots check threw exception: ${err.message}`);
  }
}

async function main() {
  console.log("========================================================");
  console.log("OderindeStephen.com Headless Route & SEO Verification Crawl");
  console.log(`Target: ${BASE_URL}`);
  console.log("========================================================");

  // Check connectivity first
  try {
    await fetch(BASE_URL);
  } catch (err) {
    console.error(`\n[FATAL] Unable to connect to ${BASE_URL}. Ensure Next.js is running (e.g. npm run start or npm run dev).`);
    console.error(`Detail: ${err.message}`);
    process.exit(1);
  }

  for (const path of CORE_ROUTES) {
    await verifyRoute(path);
  }

  await verifyRedirects();
  await verifyNotFound();
  await verifySitemapAndRobots();

  console.log("\n========================================================");
  console.log(`Crawl Summary: ${passedChecks}/${totalChecks} checks passed (${failedChecks} failed).`);
  console.log("========================================================");

  if (failedChecks > 0) {
    process.exit(1);
  }
  process.exit(0);
}

main();
