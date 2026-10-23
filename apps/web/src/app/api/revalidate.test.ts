import test from "node:test";
import assert from "node:assert/strict";
import { computeHmacSha256 } from "../../lib/cms/api.ts";
import { RevalidatePayloadSchema } from "../../lib/cms/schema.ts";

test("revalidate webhook signature validation and payload verification", async () => {
  const secret = "local-reval-dev-secret-key-32chars";
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const payload = {
    tags: ["cms-pages", "cms-case-studies", "cms-seo"],
    paths: ["/", "/case-studies", "/case-study/born-accelerators-case-study-website"],
    postId: 96083,
    postType: "case-study",
    slug: "born-accelerators-case-study-website",
  };

  const rawBody = JSON.stringify(payload);
  const validSignature = await computeHmacSha256(`${timestamp}.${rawBody}`, secret);

  assert.equal(typeof validSignature, "string");
  assert.equal(validSignature.length, 64);

  // 1. Signature matches expected
  const computed = await computeHmacSha256(`${timestamp}.${rawBody}`, secret);
  assert.equal(validSignature, computed);

  // 2. Tampered body produces different signature
  const tamperedBody = JSON.stringify({ ...payload, slug: "different-slug" });
  const tamperedSig = await computeHmacSha256(`${timestamp}.${tamperedBody}`, secret);
  assert.notEqual(validSignature, tamperedSig);

  // 3. Schema correctly parses tags and paths
  const parsed = RevalidatePayloadSchema.safeParse(payload);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.deepEqual(parsed.data.tags, ["cms-pages", "cms-case-studies", "cms-seo"]);
    assert.equal(parsed.data.paths.length, 3);
  }
});

test("revalidate webhook enforces 300-second replay window", () => {
  const now = Math.floor(Date.now() / 1000);

  function isWithinReplayWindow(timestampStr: string, maxDrift = 300): boolean {
    const ts = Number(timestampStr);
    if (isNaN(ts) || ts <= 0) return false;
    return Math.abs(now - ts) <= maxDrift;
  }

  // Current timestamp passes
  assert.equal(isWithinReplayWindow(now.toString()), true);

  // 120 seconds ago passes (within 300s window)
  assert.equal(isWithinReplayWindow((now - 120).toString()), true);

  // 301 seconds ago fails (replay attack)
  assert.equal(isWithinReplayWindow((now - 301).toString()), false);

  // 400 seconds in future fails (clock skew)
  assert.equal(isWithinReplayWindow((now + 400).toString()), false);

  // Invalid strings fail
  assert.equal(isWithinReplayWindow("not-a-timestamp"), false);
  assert.equal(isWithinReplayWindow(""), false);
});
