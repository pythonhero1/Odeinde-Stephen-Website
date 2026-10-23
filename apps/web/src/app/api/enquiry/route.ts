import { NextRequest, NextResponse } from "next/server";
import { EnquiryInputSchema } from "@/lib/cms/schema";
import { submitEnquiryToCms } from "@/lib/cms/api";

async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured (e.g. local offline dev), allow test submissions
  if (!secret) {
    if (process.env.ENVIRONMENT === "production") {
      console.warn("[Turnstile] TURNSTILE_SECRET_KEY not set in production environment");
    }
    return true;
  }

  // Cloudflare Turnstile testing dummy tokens
  if (
    token === "XXXX.DUMMY.TOKEN.XXXX" ||
    token === "dummy-token" ||
    token.startsWith("1x00000000000000000000AA")
  ) {
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    return data.success === true;
  } catch (err) {
    console.error("[Turnstile] Verification fetch error:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = EnquiryInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { honeypot, turnstileToken, ...fields } = parsed.data;

    // Bot honeypot check: silently accept without forwarding
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        { success: true, message: "Enquiry received." },
        { status: 200 }
      );
    }

    // Cloudflare Turnstile server-side verification
    if (process.env.TURNSTILE_SECRET_KEY || turnstileToken) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Security check required. Please complete the verification." },
          { status: 400 }
        );
      }

      const remoteIp =
        req.headers.get("cf-connecting-ip") ||
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

      const isTurnstileValid = await verifyTurnstileToken(turnstileToken, remoteIp);
      if (!isTurnstileValid) {
        return NextResponse.json(
          { error: "Security verification failed. Please refresh and try again." },
          { status: 403 }
        );
      }
    }

    // Server-to-server relay with unique idempotency submissionKey
    const submissionKey =
      json.submissionKey && typeof json.submissionKey === "string"
        ? json.submissionKey
        : `sub_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

    const result = await submitEnquiryToCms({
      ...fields,
      submissionKey,
    });

    return NextResponse.json(
      {
        success: true,
        enquiryId: result.enquiryId,
        submissionKey,
        message: "Thank you for reaching out. Your enquiry has been received.",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[API /api/enquiry Error]:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
