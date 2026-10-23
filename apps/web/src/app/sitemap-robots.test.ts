import test from "node:test";
import assert from "node:assert/strict";
import sitemap from "./sitemap.ts";
import robots from "./robots.ts";

test("sitemap() returns complete index of public canonical routes without drafts or preview paths", async () => {
  const entries = await sitemap();

  assert.ok(Array.isArray(entries), "sitemap must return an array");
  assert.ok(entries.length >= 18, `expected >= 18 sitemap entries, received ${entries.length}`);

  const urls = entries.map((e) => e.url);

  // 1. Verify all 11 core static routes are present
  const requiredStaticPaths = [
    "https://oderindestephen.com",
    "https://oderindestephen.com/business-website-solutions",
    "https://oderindestephen.com/business-website-development",
    "https://oderindestephen.com/e-commerce-development",
    "https://oderindestephen.com/case-studies",
    "https://oderindestephen.com/pricing",
    "https://oderindestephen.com/contact",
    "https://oderindestephen.com/portfolio",
    "https://oderindestephen.com/insights",
    "https://oderindestephen.com/privacy-policy",
    "https://oderindestephen.com/terms",
  ];

  for (const path of requiredStaticPaths) {
    assert.ok(urls.includes(path), `Sitemap missing required static route: ${path}`);
  }

  // 2. Verify published case studies and blog posts are present
  assert.ok(
    urls.some((u) => u.startsWith("https://oderindestephen.com/case-study/")),
    "Sitemap must include case studies"
  );
  assert.ok(
    urls.some((u) => u.startsWith("https://oderindestephen.com/insights/")),
    "Sitemap must include insights blog posts"
  );

  // 3. Verify draft, preview, and API paths are strictly excluded
  for (const entry of entries) {
    assert.ok(!entry.url.includes("/api/"), `Sitemap must not contain /api/ routes: ${entry.url}`);
    assert.ok(!entry.url.includes("preview"), `Sitemap must not contain preview routes: ${entry.url}`);
    assert.ok(!entry.url.includes("draft"), `Sitemap must not contain draft routes: ${entry.url}`);
    assert.ok(entry.lastModified instanceof Date, `lastModified must be a Date for ${entry.url}`);
    assert.ok(!isNaN(entry.lastModified.getTime()), `lastModified must be valid Date for ${entry.url}`);
  }
});

test("robots() enforces public production indexing and staging isolation", () => {
  const originalEnv = process.env.ENVIRONMENT;

  try {
    // 1. Test Production Robots output
    delete process.env.ENVIRONMENT;
    const prodRobots = robots();

    assert.equal(prodRobots.sitemap, "https://oderindestephen.com/sitemap.xml");
    const rules = Array.isArray(prodRobots.rules) ? prodRobots.rules[0] : prodRobots.rules;
    assert.equal(rules.allow, "/");
    assert.ok(Array.isArray(rules.disallow));
    assert.ok(rules.disallow.includes("/api/"));
    assert.ok(rules.disallow.includes("/_next/"));

    // 2. Test Staging / Preview isolation
    process.env.ENVIRONMENT = "staging";
    const stagingRobots = robots();
    const stagingRules = Array.isArray(stagingRobots.rules)
      ? stagingRobots.rules[0]
      : stagingRobots.rules;
    assert.equal(stagingRules.disallow, "/");
  } finally {
    if (originalEnv) {
      process.env.ENVIRONMENT = originalEnv;
    } else {
      delete process.env.ENVIRONMENT;
    }
  }
});
