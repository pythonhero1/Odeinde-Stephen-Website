import { NextRequest, NextResponse } from "next/server";
import { EnquiryInputSchema } from "@/lib/cms/schema";
import { submitEnquiryToCms } from "@/lib/cms/api";

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
