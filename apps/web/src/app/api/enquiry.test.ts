import test from "node:test";
import assert from "node:assert/strict";
import {
  EnquiryInputSchema,
  CmsEnquiryPayloadSchema,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from "../../lib/cms/schema.ts";
import { computeHmacSha256 } from "../../lib/cms/api.ts";

test("EnquiryInputSchema strictly validates valid client input", () => {
  const validPayload = {
    name: "Alex Morgan",
    email: "alex@enterprise.co.uk",
    service: SERVICE_OPTIONS[0],
    company: "Morgan Retail Ltd",
    website: "https://morganretail.co.uk",
    budget: BUDGET_OPTIONS[1],
    timeline: TIMELINE_OPTIONS[1],
    message: "We need a headless WordPress architecture to replace an aging monolithic setup.",
    honeypot: "",
  };

  const parsed = EnquiryInputSchema.safeParse(validPayload);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.name, "Alex Morgan");
    assert.equal(parsed.data.email, "alex@enterprise.co.uk");
    assert.equal(parsed.data.budget, BUDGET_OPTIONS[1]);
  }
});

test("EnquiryInputSchema blocks bot submissions when honeypot field is populated", () => {
  const botPayload = {
    name: "Spam Bot",
    email: "spambot@example.com",
    service: SERVICE_OPTIONS[0],
    message: "Buy cheap backlinks now!",
    honeypot: "I am a spam bot filling hidden inputs",
  };

  const parsed = EnquiryInputSchema.safeParse(botPayload);
  assert.equal(parsed.success, false);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    assert.ok(fieldErrors.honeypot);
    assert.equal(fieldErrors.honeypot[0], "Bot detected");
  }
});

test("EnquiryInputSchema rejects missing required fields and invalid email format", () => {
  const invalidPayload = {
    name: "A", // too short, min is 2
    email: "not-an-email",
    service: "", // empty, min is 2
    message: "short", // min is 10
  };

  const parsed = EnquiryInputSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    assert.ok(fieldErrors.name);
    assert.ok(fieldErrors.email);
    assert.ok(fieldErrors.service);
    assert.ok(fieldErrors.message);
  }
});

test("CmsEnquiryPayload validates server-to-server relay with idempotency key", async () => {
  const secret = "local-bridge-dev-secret-key-32chars";
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const relayPayload = {
    name: "Sarah Jenkins",
    email: "sarah@techpartners.com",
    service: SERVICE_OPTIONS[1],
    company: "Tech Partners",
    website: "https://techpartners.com",
    budget: "£1,500–£3,500",
    timeline: "1–2 months",
    message: "Comprehensive website migration and speed optimization required.",
    submissionKey: `sub_${Date.now()}_abc12345`,
  };

  const parsed = CmsEnquiryPayloadSchema.safeParse(relayPayload);
  assert.equal(parsed.success, true);

  // Verify HMAC signature generation for relay
  const rawBody = JSON.stringify(relayPayload);
  const signature = await computeHmacSha256(`${timestamp}.${rawBody}`, secret);

  assert.equal(typeof signature, "string");
  assert.equal(signature.length, 64);
});
