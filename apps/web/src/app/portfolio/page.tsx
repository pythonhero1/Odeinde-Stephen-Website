import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings, getCaseStudies } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/portfolio");
}

export default async function PortfolioPage() {
  const [settings, caseStudies, seo] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getRankMathSeo("/portfolio"),
  ]);

  return (
    <div className="w-full">
      <JsonLd nodes={seo.jsonLd} />
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-brand-bg relative overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-4">
              VISUAL PORTFOLIO SHOWCASE
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Selected Client Websites & Live Digital Systems
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              A visual gallery of completed client websites. Inspect live production performance or dive into the technical case studies behind each build.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/case-studies">
                  Read Case Study Breakdowns <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Visual Projects Gallery */}
      <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <Card
                key={cs.id}
                className="p-0 overflow-hidden border-slate-800 flex flex-col justify-between group hover:border-blue-500/40 transition-all bg-slate-900/60"
              >
                {/* Browser Device Header Frame */}
                <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                    {cs.acf?.live_url ? cs.acf.live_url.replace("https://", "") : cs.slug}
                  </span>
                </div>

                {/* Screenshot / Mockup Preview Area */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                  {cs.acf?.hero_screenshot ? (
                    <div className="relative w-full h-full rounded overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={cs.acf.hero_screenshot}
                        alt={cs.title.rendered}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full rounded bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between group-hover:border-blue-500/30 transition-all">
                      <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                        {cs.acf?.project_type || "Web Development"}
                      </span>
                      <h4 className="text-lg font-bold text-white line-clamp-2">
                        {cs.acf?.client_name || cs.title.rendered}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <span>Production Verified</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {cs.acf?.technology_1 && <Badge variant="blue" className="text-[10px]">{cs.acf.technology_1}</Badge>}
                      {cs.acf?.technology_2 && <Badge variant="default" className="text-[10px]">{cs.acf.technology_2}</Badge>}
                      {cs.acf?.technology_3 && <Badge variant="purple" className="text-[10px]">{cs.acf.technology_3}</Badge>}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {cs.title.rendered}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-6">
                      {cs.excerpt.rendered.replace(/<[^>]*>/g, "")}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/case-study/${cs.slug}`}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {cs.acf?.live_url && (
                      <a
                        href={cs.acf.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-white font-mono inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded"
                      >
                        Visit Live <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
