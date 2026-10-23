import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CMS_CACHE_TAGS,
  DEFAULT_SITE_SETTINGS,
  getCmsFetchOptions,
} from "./cache.ts";

describe("CMS Cache & Site Settings Contract", () => {
  it("exports verified cache tags", () => {
    assert.equal(CMS_CACHE_TAGS.pages, "cms-pages");
    assert.equal(CMS_CACHE_TAGS.posts, "cms-posts");
    assert.equal(CMS_CACHE_TAGS.caseStudies, "cms-case-studies");
    assert.equal(CMS_CACHE_TAGS.settings, "cms-settings");
    assert.equal(CMS_CACHE_TAGS.seo, "cms-seo");
  });

  it("generates correct Next.js fetch options with tags and TTL", () => {
    const options = getCmsFetchOptions([CMS_CACHE_TAGS.pages], 1800);
    assert.deepEqual(options, {
      next: {
        tags: ["cms-pages"],
        revalidate: 1800,
      },
    });
  });

  it("provides verified shared Cal.com booking destination per D-6 and D-10", () => {
    assert.equal(DEFAULT_SITE_SETTINGS.bookingUrl, "https://cal.com/oderinde/free");
    assert.equal(DEFAULT_SITE_SETTINGS.contactEmail, "Contact@oderindestephen.com");
    assert.equal(DEFAULT_SITE_SETTINGS.currency, "GBP");
  });
});
