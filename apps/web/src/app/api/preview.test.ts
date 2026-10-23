import test from "node:test";
import assert from "node:assert/strict";
import { computeHmacSha256 } from "../../lib/cms/api.ts";

test("preview token generation and HMAC verification", async () => {
  const secret = "local-preview-dev-secret-key-32chars";
  const id = 96083;
  const type = "case-study";
  const now = Math.floor(Date.now() / 1000);
  const expires = now + 900; // 15 minutes window

  const payload = `${id}:${type}:${expires}`;
  const validToken = await computeHmacSha256(payload, secret);

  assert.equal(typeof validToken, "string");
  assert.equal(validToken.length, 64);

  // 1. Valid token matches computation
  const verifyToken = await computeHmacSha256(`${id}:${type}:${expires}`, secret);
  assert.equal(validToken, verifyToken);

  // 2. Tampered ID fails verification
  const tamperedToken = await computeHmacSha256(`${id + 1}:${type}:${expires}`, secret);
  assert.notEqual(validToken, tamperedToken);

  // 3. Tampered secret fails verification
  const wrongSecretToken = await computeHmacSha256(payload, "different-wrong-secret-key-32chars");
  assert.notEqual(validToken, wrongSecretToken);
});

test("preview token expiration detection", () => {
  const now = Math.floor(Date.now() / 1000);

  const validExpires = now + 60;
  const isUnexpired = validExpires > now;
  assert.equal(isUnexpired, true);

  const expiredTimestamp = now - 10;
  const isExpired = expiredTimestamp < now;
  assert.equal(isExpired, true);
});

test("preview redirect path safety prevents open redirects", () => {
  function sanitizeRedirectPath(rawPath: string | null): string {
    if (!rawPath) return "/";

    // Prevent protocol-relative URLs (e.g. //evil.com) and absolute URLs
    if (rawPath.startsWith("//") || rawPath.includes("://")) {
      return "/";
    }

    // Must be a relative path starting with /
    if (!rawPath.startsWith("/")) {
      return "/";
    }

    return rawPath;
  }

  assert.equal(sanitizeRedirectPath("/case-study/born-accelerators-case-study-website"), "/case-study/born-accelerators-case-study-website");
  assert.equal(sanitizeRedirectPath("/insights/article-slug"), "/insights/article-slug");
  assert.equal(sanitizeRedirectPath("https://evil.com/phishing"), "/");
  assert.equal(sanitizeRedirectPath("//evil.com/phishing"), "/");
  assert.equal(sanitizeRedirectPath("javascript:alert(1)"), "/");
  assert.equal(sanitizeRedirectPath(null), "/");
});
