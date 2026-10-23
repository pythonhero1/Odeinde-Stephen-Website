import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/cms/schema";

interface InsightsTeaserSectionProps {
  posts?: BlogPost[];
}

export function InsightsTeaserSection({ posts = [] }: InsightsTeaserSectionProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="WEBSITE & CMS INSIGHTS"
            title="Practical Guides to Help Your Business Grow Online"
            highlight="Grow Online"
            subtitle="Real project insights, architecture advice, and platform analysis to help you make informed digital decisions."
            className="mb-0 text-left"
          />
          <Link
            href="/insights"
            className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 mt-4 md:mt-0 shrink-0"
          >
            Browse All Insights <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <Card key={post.id} className="p-6 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Badge variant="blue" className="text-[10px]">
                    {post.acf?.article_type || "Practical Guide"}
                  </Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.acf?.reading_time || "5 min read"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                  <Link href={`/insights/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                </h3>

                <div
                  className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {post.acf?.review_status || "Reviewed 2026"}
                </span>
                <Link
                  href={`/insights/${post.slug}`}
                  className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
