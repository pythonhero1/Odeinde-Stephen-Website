import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computeHmacSha256 } from "./api.ts";
import {
  PageSchema,
  RevalidatePayloadSchema,
  EnquiryInputSchema,
  CmsEnquiryPayloadSchema,
} from "./schema.ts";

describe("CMS API & Web Crypto Tests", () => {
  it("computes deterministic HMAC-SHA256 digests matching Web Crypto standard", async () => {
    const data = "1234567890.test_message_payload";
    const secret = "local-bridge-dev-secret-key-32chars";

    const hash1 = await computeHmacSha256(data, secret);
    const hash2 = await computeHmacSha256(data, secret);

    assert.equal(typeof hash1, "string");
    assert.equal(hash1.length, 64); // 256 bits = 64 hex chars
    assert.equal(hash1, hash2);

    // Verify changing data changes digest
    const hash3 = await computeHmacSha256("different_payload", secret);
    assert.notEqual(hash1, hash3);
  });

  it("validates preview token signing payload format", async () => {
    const secret = "local-preview-dev-secret-key-32chars";
    const id = 14;
    const type = "page";
    const expires = 1729680000;

    const payload = `${id}:${type}:${expires}`;
    const token = await computeHmacSha256(payload, secret);

    assert.equal(typeof token, "string");
    assert.equal(token.length, 64);

    // Verify recomputing with same params matches
    const verifyToken = await computeHmacSha256(`${id}:${type}:${expires}`, secret);
    assert.equal(token, verifyToken);
  });

  it("validates revalidation webhook HMAC and payload schema", async () => {
    const secret = "local-reval-dev-secret-key-32chars";
    const timestamp = "1729680000";
    const payload = {
      tags: ["cms-pages", "cms-case-studies"],
      paths: ["/", "/case-studies", "/case-study/born-accelerators-case-study-website"],
    };

    const rawBody = JSON.stringify(payload);
    const signature = await computeHmacSha256(`${timestamp}.${rawBody}`, secret);

    assert.equal(typeof signature, "string");
    assert.equal(signature.length, 64);

    const parsed = RevalidatePayloadSchema.parse(payload);
    assert.equal(parsed.tags.length, 2);
    assert.equal(parsed.paths.length, 3);
  });

  it("PageSchema parses standard WordPress page structure with ACF sections", () => {
    const samplePage = {
      id: 14,
      slug: "home",
      title: { rendered: "Website Development & Digital Solutions" },
      status: "publish",
      acf: {
        sections: [
          {
            acf_fc_layout: "hero",
            headline: "Website Development & Digital Solutions",
            badge: "TEST BADGE",
          },
        ],
      },
    };

    const parsed = PageSchema.parse(samplePage);
    assert.equal(parsed.id, 14);
    assert.equal(parsed.slug, "home");
    assert.equal(parsed.acf.sections.length, 1);
    assert.equal(parsed.acf.sections[0].acf_fc_layout, "hero");
  });

  it("PageSchema gracefully handles null or missing acf payload", () => {
    const samplePageWithoutAcf = {
      id: 14,
      slug: "home",
      title: { rendered: "Website Development" },
      status: "publish",
    };

    const parsed = PageSchema.parse(samplePageWithoutAcf);
    assert.equal(parsed.id, 14);
    assert.deepEqual(parsed.acf.sections, []);
  });

  it("Enquiry schemas validate clean client input and server-to-server relay payload", () => {
    const clientInput = {
      name: "Stephen Client",
      email: "stephen@example.com",
      service: "Business Website Development",
      message: "Detailed project requirements for a headless website migration.",
      budget: "£1,500–£3,500",
    };

    const parsedClient = EnquiryInputSchema.parse(clientInput);
    assert.equal(parsedClient.name, "Stephen Client");
    assert.equal(parsedClient.budget, "£1,500–£3,500");

    const relayPayload = {
      ...parsedClient,
      submissionKey: "sub_1729680000_abcd1234",
    };

    const parsedRelay = CmsEnquiryPayloadSchema.parse(relayPayload);
    assert.equal(parsedRelay.submissionKey, "sub_1729680000_abcd1234");
  });
});
