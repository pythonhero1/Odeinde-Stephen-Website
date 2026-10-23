import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PainVsSolutionSection } from "@/components/sections/PainVsSolutionSection";
import { CoreDeliverablesSection } from "@/components/sections/CoreDeliverablesSection";
import { ConversionJourneySection } from "@/components/sections/ConversionJourneySection";
import { SiteArchitectureSection } from "@/components/sections/SiteArchitectureSection";
import { PlatformPhilosophySection } from "@/components/sections/PlatformPhilosophySection";
import { ProcessStepsSection } from "@/components/sections/ProcessStepsSection";
import { CaseStudiesSlice } from "@/components/sections/CaseStudiesSlice";
import { ClientFeedbackSection } from "@/components/sections/ClientFeedbackSection";
import { PricingTeaserSection } from "@/components/sections/PricingTeaserSection";
import { InsightsTeaserSection } from "@/components/sections/InsightsTeaserSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings, getCaseStudies, getPosts } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/business-website-development");
}

export default async function BusinessWebsiteDevelopmentPage() {
  const [settings, caseStudies, posts, seo] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getPosts(),
    getRankMathSeo("/business-website-development"),
  ]);

  const devFaqs = [
    {
      question: "What makes your business websites different from standard templates?",
      answer: "I do not drop your text into pre-made theme builder templates. We engineer the layout around your specific value proposition, write accessible semantic code, configure structured CMS editing, and optimize for fast mobile load times.",
    },
    {
      question: "Do you write the website copy or do I provide it?",
      answer: "We collaborate. If you already have copy, I audit and refine it for clarity and conversion. If you are starting fresh, I provide structured wireframe prompts and messaging frameworks so your services pass the 5-second clarity test.",
    },
    {
      question: "Which CMS will you use for my website?",
      answer: "WordPress is our primary editorial engine, paired with custom ACF flexible layouts or deployed as a headless backend driving a Next.js App Router frontend. This gives your team an easy editing experience with enterprise-grade performance.",
    },
    {
      question: "How long does a typical business website project take?",
      answer: "Most custom business website builds take between 3 and 5 weeks from approved kickoff, structured across Discovery, Information Architecture, Component Development, and QA Handover.",
    },
    {
      question: "Are your websites optimized for mobile devices and search engines?",
      answer: "Yes. Every component is tested across 360px, 390px, 768px, 1024px, and 1440px viewports. We implement clean Schema.org structured data, semantic heading hierarchies, fast loading speeds, and verified OpenGraph tags.",
    },
    {
      question: "What happens after the website is launched?",
      answer: "You receive full admin credentials, a 1-hour recorded video walkthrough showing you how to update content, and 30 days of post-launch technical support to ensure everything operates smoothly.",
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
              BUSINESS WEBSITE DEVELOPMENT
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Professional Business Websites Built to Attract Clients
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              I design and develop professional, responsive business websites that communicate your services clearly, build customer trust, and turn visitor interest into qualified enquiries.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">
                  Start a Website Project <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">
                  View Selected Work
                </Link>
              </Button>
            </div>

            {/* 4 Value Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Strategy-Led Structure</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Responsive Development</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Easy CMS Management</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Built for Enquiries</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenges vs Solutions Comparison */}
      <PainVsSolutionSection />

      {/* Selected Client Projects */}
      <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Real Business Website Projects Built for Growth"
              highlight="Built for Growth"
              subtitle="Explore custom business website solutions delivering verified results for agencies, consultants, and service providers."
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

      {/* 4 Pillars of a High-Performing Website */}
      <CoreDeliverablesSection />

      {/* Verified Client Feedback */}
      <ClientFeedbackSection />

      {/* Visitor Conversion Journey */}
      <ConversionJourneySection />

      {/* 6-Page Site Architecture Breakdown (Repaired sequential 01-06 numbering) */}
      <SiteArchitectureSection />

      {/* Platform Fit Section */}
      <PlatformPhilosophySection />

      {/* Phased Development Process */}
      <ProcessStepsSection
        eyebrow="DEVELOPMENT PROCESS"
        title="My Business Website Development Process, From Planning to Launch"
        highlight="Planning to Launch"
        subtitle="A disciplined, transparent delivery framework keeping your project organized and predictable."
      />

      {/* Related Expert Guides / Insights */}
      <InsightsTeaserSection posts={posts} />

      {/* Pricing Teaser */}
      <PricingTeaserSection />

      {/* Development FAQs */}
      <FaqSection
        title="Frequently Asked Questions About Business Website Development"
        items={devFaqs}
      />

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
