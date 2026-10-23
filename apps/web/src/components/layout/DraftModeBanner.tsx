import { draftMode } from "next/headers";
import Link from "next/link";
import { Eye, X } from "lucide-react";

export async function DraftModeBanner() {
  const draft = await draftMode();

  if (!draft.isEnabled) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-medium text-xs shadow-2xl border border-amber-400"
    >
      <div className="flex items-center gap-1.5 font-bold font-mono">
        <Eye className="w-4 h-4 animate-pulse" />
        <span>DRAFT MODE</span>
      </div>
      <span className="hidden sm:inline text-slate-900">Unpublished CMS edits active</span>
      <Link
        href="/api/preview-exit"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 text-amber-300 hover:text-white font-mono text-[11px] transition-colors ml-1"
      >
        <span>Exit Preview</span>
        <X className="w-3 h-3" />
      </Link>
    </div>
  );
}
