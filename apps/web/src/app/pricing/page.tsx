import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PricingPackagesGrid } from "@/components/sections/PricingPackagesGrid";
import { UniversalInclusionsSection } from "@/components/sections/UniversalInclusionsSection";
import { ServiceMatchSelectorSection } from "@/components/sections/ServiceMatchSelectorSection";
import { ProposalRoadmapSection } from "@/components/sections/ProposalRoadmapSection";
import { PricingFactorsSection } from "@/components/sections/PricingFactorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings } from "@/lib/cms/api";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Pricing & Investment Packages | Oderinde Stephen",
  description: "Clear indicative starting prices for business website development, e-commerce stores, website redesigns, and digital portals. Tailored GBP quotations before you commit.",
};

export default async function PricingPage() {
  const settings = await getSiteSettings();

  const pricingFaqs = [
    {
      question: "Are your starting prices fixed or will the price increase?",
      answer: "Starting prices cover the core deliverables outlined in each tier. If your project fits within those parameters, that is your price. If you require custom API integrations, extra page templates, or extensive custom animations, I provide a detailed, itemized quotation before you pay any deposit.",
    },
    {
      question: "What is your standard payment milestone schedule?",
      answer: "Engagements are typically billed in milestones: 50% initial deposit upon contract agreement, and 50% upon final staging review before live production cutover. For larger projects over £2,000, we can structure payments into 3 or 4 milestones.",
    },
    {
      question: "Are website hosting, domain registration, and third-party app fees included?",
      answer: "Hosting infrastructure (Cloudflare, Spantrix, Hostinger) and domain registrations are billed directly to your own merchant accounts so you retain 100% legal ownership of your digital assets. I guide you through setup during discovery.",
    },
    {
      question: "What currency do you quote and bill in?",
      answer: "All prices and client invoices are standardized in British Pounds (GBP £). For international clients in the US, Europe, or Australia, invoices can be settled via credit card, Apple Pay, or international bank transfer in your local equivalent.",
    },
    {
      question: "How long is a project quotation valid for?",
      answer: "All written project proposals and milestone price quotes are guaranteed for 30 calendar days from issue, allowing you ample time to review with your team and schedule kickoff.",
    },
    {
      question: "Do you offer ongoing website maintenance and support plans?",
      answer: "Yes. Every launch includes 30 days of warranty and recorded walkthrough training. Afterwards, I offer monthly retainer support plans for security patches, content updates, and SEO monitoring.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-brand-bg relative overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-4">
              SERVICES & PRICING
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Clear Starting Prices. Solutions Built Around Your Goals
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Explore transparent starting investments for business website development, e-commerce stores, strategic redesigns, and custom digital systems.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button asChild variant="primary" size="lg">
                <a href="#packages">
                  Explore Packages <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Request a Custom Quote
                </Link>
              </Button>
            </div>

            {/* 4 Value Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Business-First Thinking</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fixed Milestone Quotes</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Standardized in GBP (£)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Starting Packages Table */}
      <PricingPackagesGrid />

      {/* Universal Inclusions */}
      <UniversalInclusionsSection />

      {/* Service Match Selector */}
      <ServiceMatchSelectorSection />

      {/* Proposal Roadmap */}
      <ProposalRoadmapSection />

      {/* 6 Pricing Cost Factors */}
      <PricingFactorsSection />

      {/* Pricing FAQs */}
      <FaqSection
        title="Frequently Asked Questions About Pricing & Payments"
        items={pricingFaqs}
      />

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
