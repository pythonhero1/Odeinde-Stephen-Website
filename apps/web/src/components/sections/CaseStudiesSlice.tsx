import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SectionHeading } from "../ui/SectionHeading";
import type { CaseStudy } from "@/lib/cms/schema";

interface CaseStudiesSliceProps {
  caseStudies: CaseStudy[];
  limit?: number;
}

export function CaseStudiesSlice({ caseStudies, limit = 3 }: CaseStudiesSliceProps) {
  const displayItems = caseStudies.slice(0, limit);

  return (
    <section className="py-20 sm:py-28 bg-brand-surface/20 border-y border-brand-border/60">
      <Container size="default">
        <SectionHeading
          eyebrow="SELECTED WORK"
          badgeVariant="purple"
          title="Real Client Projects. Practical Business Outcomes."
          highlight="Practical Business Outcomes."
          subtitle="Every project is built around concrete business objectives. Here is evidence from recent client engagements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {displayItems.map((cs) => {
            const acf = cs.acf || {};
            const techBadges = [acf.technology_1, acf.technology_2, acf.technology_3].filter(
              Boolean
            );

            return (
              <Card
                key={cs.id}
                className="flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-brand-surface text-brand-muted border border-brand-border"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-brand-accent transition-colors mb-3 leading-snug">
                    <Link href={`/case-study/${cs.slug}`}>
                      {cs.title.rendered}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-brand-muted mb-6 leading-relaxed line-clamp-3">
                    {cs.excerpt.rendered.replace(/<[^>]+>/g, "")}
                  </p>

                  {/* Verified outcome highlight if present */}
                  {acf.verified_outcome && (
                    <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-900/40 mb-6">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-brand-accent mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>VERIFIED OUTCOME</span>
                      </div>
                      <p className="text-xs text-foreground/90 italic line-clamp-2 leading-relaxed">
                        &ldquo;{acf.verified_outcome}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-brand-border/60">
                  <Link
                    href={`/case-study/${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-brand-accent hover:text-blue-400 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-card hover:bg-brand-surface border border-brand-border text-white text-sm font-heading font-medium transition-colors"
          >
            <span>View All {caseStudies.length || 6} Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
