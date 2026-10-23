import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: NextRequest) {
  (await draftMode()).disable();

  const referrer = req.headers.get("referer");
  let redirectUrl = "/";

  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (refUrl.origin === req.nextUrl.origin) {
        redirectUrl = refUrl.pathname;
      }
    } catch {
      redirectUrl = "/";
    }
  }

  return NextResponse.redirect(new URL(redirectUrl, req.url));
}
