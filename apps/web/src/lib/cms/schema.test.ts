import test from "node:test";
import assert from "node:assert/strict";
import {
  SiteSettingsSchema,
  PathResolverSchema,
  CaseStudySchema,
  EnquiryInputSchema,
  RevalidatePayloadSchema,
} from "./schema.ts";

test("SiteSettingsSchema parses valid settings fixture and applies defaults", async () => {
  const rawFixture = {
    siteName: "Oderinde Stephen",
    bookingUrl: "https://cal.com/oderinde/free",
    contactEmail: "Contact@oderindestephen.com",
    currency: "GBP",
  };

  const parsed = SiteSettingsSchema.parse(rawFixture);
  assert.equal(parsed.siteName, "Oderinde Stephen");
  assert.equal(parsed.bookingUrl, "https://cal.com/oderinde/free");
  assert.equal(parsed.currency, "GBP");
  assert.equal(parsed.contactEmail, "Contact@oderindestephen.com");
  assert.equal(parsed.socialLinks.linkedin, "https://www.linkedin.com/in/pythonhero/");
  assert.ok(Array.isArray(parsed.navigation));
});

test("PathResolverSchema validates publish status and rejects drafts", async () => {
  const validPage = {
    id: 14,
    slug: "home",
    type: "page",
    template: "home",
    title: "Website Development",
    status: "publish",
  };
  const parsed = PathResolverSchema.parse(validPage);
  assert.equal(parsed.id, 14);
  assert.equal(parsed.status, "publish");

  const draftPage = {
    ...validPage,
    status: "draft",
  };
  assert.throws(() => PathResolverSchema.parse(draftPage));
});

test("CaseStudySchema parses case study with ACF fields and defaults color", async () => {
  const sampleCaseStudy = {
    id: 96087,
    slug: "born-accelerators-case-study-website",
    title: { rendered: "BORN Accelerators" },
    excerpt: { rendered: "Accelerator website" },
    acf: {
      technology_1: "WordPress",
      technology_2: "Elementor",
      color: "2563eb",
    },
  };

  const parsed = CaseStudySchema.parse(sampleCaseStudy);
  assert.equal(parsed.id, 96087);
  assert.equal(parsed.acf.color, "2563eb");
  assert.equal(parsed.acf.technology_1, "WordPress");
});

test("EnquiryInputSchema validates valid form inputs and blocks bot honeypots", async () => {
  const validForm = {
    name: "Alex Doe",
    email: "alex@example.com",
    service: "Web Development",
    message: "I need a high-performance headless website built.",
    honeypot: "",
  };

  const parsed = EnquiryInputSchema.parse(validForm);
  assert.equal(parsed.name, "Alex Doe");
  assert.equal(parsed.email, "alex@example.com");

  // Rejects invalid email
  assert.throws(() =>
    EnquiryInputSchema.parse({
      ...validForm,
      email: "not-an-email",
    })
  );

  // Rejects too-short message
  assert.throws(() =>
    EnquiryInputSchema.parse({
      ...validForm,
      message: "Short",
    })
  );

  // Blocks bot with honeypot populated
  assert.throws(() =>
    EnquiryInputSchema.parse({
      ...validForm,
      honeypot: "spam content",
    })
  );
});

test("RevalidatePayloadSchema parses tags and target paths", async () => {
  const payload = {
    tags: ["cms-case-studies", "cms-pages"],
    paths: ["/case-studies", "/case-study/pipe-patch-pro-amazon-listing-website"],
    postId: 96182,
  };

  const parsed = RevalidatePayloadSchema.parse(payload);
  assert.equal(parsed.tags.length, 2);
  assert.equal(parsed.paths.length, 2);
  assert.equal(parsed.postId, 96182);
});
