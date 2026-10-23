import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Layers,
  Star,
  Target,
  Wrench,
} from "lucide-react";
import { getCaseStudyBySlug, getSiteSettings, getCaseStudies } from "@/lib/cms/api";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PipePatchProBespokeCaseStudy } from "@/components/case-study/PipePatchProBespokeCaseStudy";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Oderinde Stephen",
    };
  }

  const { isEnabled: isDraft } = await draftMode();

  return {
    title: `${caseStudy.title.rendered} | Case Study`,
    description: caseStudy.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
    robots: isDraft
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}

export default async function SingleCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const [caseStudy, settings, allCaseStudies, draft] = await Promise.all([
    getCaseStudyBySlug(slug),
    getSiteSettings(),
    getCaseStudies(),
    draftMode(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const isBespokePipePatch =
    slug === "pipe-patch-pro-amazon-listing-website" || slug === "pipe-patch-pro";

  if (isBespokePipePatch) {
    return (
      <div className="w-full">
        {draft.isEnabled && (
          <div className="w-full bg-amber-500/20 border-b border-amber-500/40 text-amber-300 px-4 py-2 text-xs font-mono text-center flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>DRAFT MODE ACTIVE • Unpublished preview rendering • Search indexing disabled</span>
            <a href="/api/preview-exit" className="underline ml-2 hover:text-white transition-colors">
              Exit Preview
            </a>
          </div>
        )}
        <PipePatchProBespokeCaseStudy bookingUrl={settings.bookingUrl} />
        <CaseStudyNavigation currentSlug={slug} allCaseStudies={allCaseStudies} />
      </div>
    );
  }

  const acf = caseStudy.acf || {};
  const isDraft = draft.isEnabled;

  const techBadges = [
    acf.technology_1,
    acf.technology_2,
    acf.technology_3,
  ].filter(Boolean);

  return (
    <article className="py-12 sm:py-20 flex-1 flex flex-col">
      {/* Draft Mode Notice Bar */}
      {isDraft && (
        <div className="w-full bg-amber-500/20 border-b border-amber-500/40 text-amber-300 px-4 py-2 text-xs font-mono text-center flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>DRAFT MODE ACTIVE • Unpublished preview rendering • Search indexing disabled</span>
          <a
            href="/api/preview-exit"
            className="underline ml-2 hover:text-white transition-colors"
          >
            Exit Preview
          </a>
        </div>
      )}

      <Container size="default">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all case studies</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="purple">CLIENT CASE STUDY</Badge>
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded text-xs font-mono bg-brand-surface text-brand-muted border border-brand-border"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white mb-6 leading-tight">
            {caseStudy.title.rendered}
          </h1>

          <p className="text-base sm:text-xl text-brand-muted leading-relaxed font-sans">
            {caseStudy.excerpt.rendered.replace(/<[^>]+>/g, "")}
          </p>
        </header>

        {/* Project Snapshot Bar (4-Card Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <Card className="p-5" hoverEffect={false}>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-1">
              <Target className="w-4 h-4 text-blue-400" />
              <span>DELIVERABLE</span>
            </div>
            <div className="text-sm font-semibold text-white font-heading">
              Custom Digital Platform
            </div>
          </Card>

          <Card className="p-5" hoverEffect={false}>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-1">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>PRIMARY STACK</span>
            </div>
            <div className="text-sm font-semibold text-white font-heading">
              {acf.technology_1 || "WordPress"} + {acf.technology_2 || "Next.js"}
            </div>
          </Card>

          <Card className="p-5" hoverEffect={false}>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-1">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>DELIVERY SCOPE</span>
            </div>
            <div className="text-sm font-semibold text-white font-heading">
              Architecture &bull; UX &bull; Launch
            </div>
          </Card>

          <Card className="p-5" hoverEffect={false}>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted mb-1">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>CLIENT SATISFACTION</span>
            </div>
            <div className="text-sm font-semibold text-white font-heading">
              5.0 / 5.0 Verified Review
            </div>
          </Card>
        </div>

        {/* Detail Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start mb-20">
          {/* Main Narrative (8 columns) */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Business Challenge */}
            {acf.business_focus && (
              <section className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-accent">
                  <span>01 &bull; THE CHALLENGE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  The Business Context &amp; Objective
                </h2>
                <div className="p-6 rounded-xl bg-brand-surface/60 border border-brand-border text-base text-brand-muted leading-relaxed font-sans">
                  {acf.business_focus}
                </div>
              </section>
            )}

            {/* The Delivered System */}
            {acf.system_delivered && (
              <section className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-green">
                  <span>02 &bull; THE ARCHITECTURE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  What Was Engineered &amp; Delivered
                </h2>
                <div className="p-6 rounded-xl bg-brand-surface/60 border border-brand-border text-base text-brand-muted leading-relaxed font-sans">
                  {acf.system_delivered}
                </div>
              </section>
            )}

            {/* Verified Outcomes */}
            {acf.verified_outcome && (
              <section className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                  <span>03 &bull; MEASURABLE IMPACT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Verified Outcome &amp; Client Feedback
                </h2>
                <div className="p-6 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-xs font-mono text-white ml-2">5.0 / 5.0</span>
                  </div>
                  <blockquote className="text-base text-white/95 italic leading-relaxed">
                    &ldquo;{acf.verified_outcome}&rdquo;
                  </blockquote>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar CTA & Context (4 columns) */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-6 sm:p-8 bg-brand-surface/80 border-brand-accent/30 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-accent block mb-2">
                WORK WITH STEPHEN
              </span>
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Need similar outcomes for your business?
              </h3>
              <p className="text-sm text-brand-muted mb-6 leading-relaxed font-sans">
                Book a direct strategy consultation to review your technical requirements and discuss scope.
              </p>

              <div className="space-y-3">
                <Button
                  href={settings.bookingUrl}
                  isExternal
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Strategy Call</span>
                </Button>

                <Button
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                >
                  <span>Request Custom Quote</span>
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </Container>

      <CaseStudyNavigation currentSlug={slug} allCaseStudies={allCaseStudies} />
    </article>
  );
}
