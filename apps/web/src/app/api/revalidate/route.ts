import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { RevalidatePayloadSchema } from "@/lib/cms/schema";
import { computeHmacSha256 } from "@/lib/cms/api";

const REVALIDATION_SECRET =
  process.env.REVALIDATION_SECRET || "local-reval-dev-secret-key-32chars";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-os-signature");
    const timestamp = req.headers.get("x-os-timestamp");

    if (!signature || !timestamp) {
      return NextResponse.json(
        { error: "Missing required signature headers" },
        { status: 401 }
      );
    }

    // Replay window check: 5 minutes
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - Number(timestamp)) > 300) {
      return NextResponse.json(
        { error: "Request timestamp outside replay window" },
        { status: 401 }
      );
    }

    const rawBody = await req.text();
    const expectedSignature = await computeHmacSha256(
      `${timestamp}.${rawBody}`,
      REVALIDATION_SECRET
    );

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid revalidation signature" },
        { status: 401 }
      );
    }

    const json = JSON.parse(rawBody);
    const parsed = RevalidatePayloadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload format", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { tags, paths } = parsed.data;

    // Trigger on-demand revalidation for cache tags
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Trigger on-demand revalidation for specific paths
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      tagsRevalidated: tags,
      pathsRevalidated: paths,
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    console.error("[API /api/revalidate Error]:", err);
    return NextResponse.json(
      { error: "Internal server error during revalidation" },
      { status: 500 }
    );
  }
}
