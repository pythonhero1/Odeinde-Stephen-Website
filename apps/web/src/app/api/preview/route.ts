import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { computeHmacSha256 } from "@/lib/cms/api";

const PREVIEW_SIGNING_SECRET =
  process.env.PREVIEW_SIGNING_SECRET || "local-preview-dev-secret-key-32chars";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const slug = searchParams.get("slug") || "";
  const token = searchParams.get("token");
  const expires = searchParams.get("expires");

  if (!id || !type || !token || !expires) {
    return new NextResponse("Missing required preview parameters", { status: 400 });
  }

  // 1. Check expiration window
  const now = Math.floor(Date.now() / 1000);
  if (now > Number(expires)) {
    return new NextResponse("Preview token has expired", { status: 401 });
  }

  // 2. Verify HMAC token
  const payload = `${id}:${type}:${expires}`;
  const expectedToken = await computeHmacSha256(payload, PREVIEW_SIGNING_SECRET);

  if (token !== expectedToken) {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  // 3. Enable Draft Mode
  (await draftMode()).enable();

  // 4. Resolve destination safely (strictly internal relative path)
  let destination = "/";
  if (type === "case-study") {
    destination = `/case-study/${encodeURIComponent(slug)}`;
  } else if (type === "post") {
    destination = `/insights/${encodeURIComponent(slug)}`;
  } else if (type === "page" && slug && slug !== "home") {
    destination = `/${encodeURIComponent(slug)}`;
  }

  return NextResponse.redirect(new URL(destination, req.url));
}
