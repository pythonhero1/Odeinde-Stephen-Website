import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";
import type { CaseStudy } from "@/lib/cms/schema";

interface CaseStudyNavigationProps {
  currentSlug: string;
  allCaseStudies: CaseStudy[];
}

export function CaseStudyNavigation({
  currentSlug,
  allCaseStudies,
}: CaseStudyNavigationProps) {
  if (!allCaseStudies || allCaseStudies.length === 0) return null;

  const currentIndex = allCaseStudies.findIndex(
    (cs) => cs.slug === currentSlug || (currentSlug.includes("pipe-patch-pro") && cs.slug.includes("pipe-patch-pro"))
  );

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : allCaseStudies.length - 1;
  const nextIndex = currentIndex < allCaseStudies.length - 1 ? currentIndex + 1 : 0;

  const prev = allCaseStudies[prevIndex];
  const next = allCaseStudies[nextIndex];

  return (
    <nav aria-label="Case Study Navigation" className="border-t border-brand-cardBorder bg-brand-bg py-8">
      <Container>
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/case-study/${prev.slug}`}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-left max-w-[40%]"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/40">
                <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Previous Case</span>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white line-clamp-1">
                  {prev.acf?.client_name || prev.title.rendered}
                </span>
              </div>
            </Link>
          ) : <div />}

          <Link
            href="/case-studies"
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors px-3 py-2 rounded-lg bg-slate-900 border border-slate-800"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Case Studies</span>
          </Link>

          {next ? (
            <Link
              href={`/case-study/${next.slug}`}
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-right max-w-[40%]"
            >
              <div className="hidden sm:block">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Next Case</span>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white line-clamp-1">
                  {next.acf?.client_name || next.title.rendered}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/40">
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </Container>
    </nav>
  );
}
