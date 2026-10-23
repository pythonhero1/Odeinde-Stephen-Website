import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DiagnosticRouterSection } from "@/components/sections/DiagnosticRouterSection";
import { PlatformPhilosophySection } from "@/components/sections/PlatformPhilosophySection";
import { CaseStudiesSlice } from "@/components/sections/CaseStudiesSlice";
import { ClientFeedbackSection } from "@/components/sections/ClientFeedbackSection";
import { ProcessStepsSection } from "@/components/sections/ProcessStepsSection";
import { PricingTeaserSection } from "@/components/sections/PricingTeaserSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings, getCaseStudies } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MessageCircleQuestion } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/business-website-solutions");
}

export default async function BusinessWebsiteSolutionsPage() {
  const [settings, caseStudies, seo] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getRankMathSeo("/business-website-solutions"),
  ]);

  const solutionFaqs = [
    {
      question: "How do I know which solution or platform fits my business best?",
      answer: "We start by analyzing your customer buying cycle and team capabilities. If you offer consulting or B2B services, a custom WordPress or Headless build gives you content flexibility and high speed. If you sell physical products, Shopify or WooCommerce provides the necessary inventory and payment infrastructure.",
    },
    {
      question: "Can I start with a standard website and add a store or portal later?",
      answer: "Yes. Every website I engineer uses modular architecture. Your content model and database can seamlessly expand to support e-commerce checkout, private member areas, or workflow automations without having to throw away your initial design.",
    },
    {
      question: "What is the typical timeline from strategy kickoff to live launch?",
      answer: "A focused business website or strategic redesign typically takes 3 to 5 weeks from approved kickoff. More complex e-commerce stores and portal integrations average 5 to 8 weeks depending on catalog size and third-party API requirements.",
    },
    {
      question: "Will my team be able to edit text, images, and blog posts easily?",
      answer: "Absolutely. I configure intuitive ACF flexible content blocks and native WordPress editors with zero fragile code blocks. You also receive recorded video training showing you how to update every area of your site.",
    },
    {
      question: "Do you handle domain migration and DNS setup without downtime?",
      answer: "Yes. Staging environments allow you to review and approve the complete website before cutover. When ready, DNS records are migrated with strict TTL management so your current site and email remain uninterrupted.",
    },
  ];

  return (
    <div className="w-full">
      <JsonLd nodes={seo.jsonLd} />
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-brand-bg relative overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-4">
              SOLUTIONS FOR BUSINESS PROBLEMS
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Start with What Your Business Needs the Website to Solve
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Whether you need a new website, a better online store, a strategic redesign, or a connected client system, start with the business problem. We define the right technology from there.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button asChild variant="primary" size="lg">
                <a href="#solution-paths">
                  Find the Right Solution <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#diagnostic">
                  Not Sure? Discuss Your Goal
                </a>
              </Button>
            </div>

            {/* 4 Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Business-First Strategy</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Platform-Flexible Builds</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Structured Handover</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Built for Long-Term Growth</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Problem Paths Diagnostic Router */}
      <DiagnosticRouterSection />

      {/* Diagnostic Consultation Banner */}
      <section id="diagnostic" className="py-16 bg-slate-950/70 border-t border-brand-cardBorder">
        <Container>
          <Card className="p-8 sm:p-10 border-blue-500/20 bg-gradient-to-r from-blue-950/20 via-slate-900 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-blue-400 font-mono text-xs uppercase font-bold tracking-wider block mb-2">
                NEED CLARITY ON YOUR DIRECTION?
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Not Sure Which Solution Fits Your Business Best?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A brief 20-minute strategy conversation helps evaluate your goals, current website status, and budget to recommend the most cost-effective path forward.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button asChild variant="primary" size="md">
                <Link href="/contact">
                  Discuss My Project <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a Call
                </a>
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Platform Selection Philosophy */}
      <PlatformPhilosophySection />

      {/* Selected Work Showcase */}
      <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="SELECTED WORK - REAL PROJECTS"
              title="See How Digital Solutions Become Real Business Outcomes"
              highlight="Real Business Outcomes"
              subtitle="Browse recent client implementations spanning service firms, product hubs, and custom redesigns."
              className="mb-0 text-left"
            />
            <Link
              href="/case-studies"
              className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 mt-4 md:mt-0 shrink-0"
            >
              View Full Portfolio <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <CaseStudiesSlice caseStudies={caseStudies} limit={3} />
        </Container>
      </section>

      {/* Client Feedback Trio */}
      <ClientFeedbackSection />

      {/* 4-Step Process */}
      <ProcessStepsSection
        eyebrow="HOW WE MOVE FORWARD"
        title="From Business Challenge to the Right Digital System"
        highlight="Right Digital System"
        subtitle="A proven, 4-stage execution model keeping your project organized, transparent, and on schedule."
      />

      {/* Pricing Teaser */}
      <PricingTeaserSection />

      {/* Decision FAQs */}
      <FaqSection
        title="Questions That Help You Choose the Right Direction"
        items={solutionFaqs}
      />

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
