import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EcommerceFrictionSection } from "@/components/sections/EcommerceFrictionSection";
import { BuyingJourneySection } from "@/components/sections/BuyingJourneySection";
import { PlatformComparisonMatrix } from "@/components/sections/PlatformComparisonMatrix";
import { StorefrontOperationsSection } from "@/components/sections/StorefrontOperationsSection";
import { OrderWorkflowSection } from "@/components/sections/OrderWorkflowSection";
import { CaseStudiesSlice } from "@/components/sections/CaseStudiesSlice";
import { ClientFeedbackSection } from "@/components/sections/ClientFeedbackSection";
import { ProcessStepsSection } from "@/components/sections/ProcessStepsSection";
import { PricingTeaserSection } from "@/components/sections/PricingTeaserSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings, getCaseStudies } from "@/lib/cms/api";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "E-commerce Development | Oderinde Stephen",
  description: "Professional Shopify and WooCommerce online stores engineered around customer buying journeys, streamlined checkout, and operational efficiency.",
};

export default async function EcommerceDevelopmentPage() {
  const [settings, caseStudies] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
  ]);

  const ecommerceFaqs = [
    {
      question: "Should I choose WooCommerce or Shopify for my store?",
      answer: "Choose WooCommerce if you want complete code ownership, customized checkout funnels, zero ongoing per-transaction platform percentage cuts, and tight integration with a WordPress content hub. Choose Shopify if you want turnkey hosted infrastructure, rapid catalog setup, and minimal server maintenance.",
    },
    {
      question: "Do you configure payment gateways like Stripe, PayPal, and Apple Pay?",
      answer: "Yes. I set up secure, bank-grade payment processing with Apple Pay, Google Pay, credit cards, and local currency routing, ensuring full 3D Secure compliance and instant order status dispatch.",
    },
    {
      question: "Can you migrate my existing products and customers from another platform?",
      answer: "Yes. I migrate products, categories, customer records, and order history from older stores (Wix, Magento, older WooCommerce) while ensuring clean 301 redirects protect existing search rankings.",
    },
    {
      question: "How do you help reduce abandoned carts and checkout drop-off?",
      answer: "We streamline checkout by eliminating mandatory registration hurdles, displaying clear delivery costs upfront, adding recognizable security badges, and configuring automated abandoned cart recovery sequences.",
    },
    {
      question: "Can my store support wholesale B2B pricing and retail pricing together?",
      answer: "Yes. With WooCommerce, we can configure role-based pricing so wholesale buyers see discounted tier pricing and tax-exempt options after logging in, while standard consumers see standard retail prices.",
    },
    {
      question: "Do you offer post-launch technical support for inventory and updates?",
      answer: "Yes. Every store build includes 30 days of post-launch warranty support, recorded video training for your fulfillment team, and ongoing maintenance options.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-brand-bg relative overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-4">
              E-COMMERCE DEVELOPMENT
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Professional E-commerce Stores Built Around How Customers Buy
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              I design and develop Shopify and WooCommerce stores that make products easy to discover, compare, and purchase, supported by reliable back-office operations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact?service=e-commerce">
                  Plan Your Store <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#platform-comparison">
                  Compare Platforms
                </a>
              </Button>
            </div>

            {/* 4 Value Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Customer-Journey Focused</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>WooCommerce & Shopify</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero-Friction Checkout</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Built for Operations</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Storefront Friction Analysis */}
      <EcommerceFrictionSection />

      {/* 5-Stage Customer Buying Journey */}
      <BuyingJourneySection />

      {/* Platform Comparison Matrix */}
      <PlatformComparisonMatrix />

      {/* Storefront & Operations Systems */}
      <StorefrontOperationsSection />

      {/* Order Workflow Lifecycle */}
      <OrderWorkflowSection />

      {/* E-commerce Case Proof */}
      <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="COMMERCE CASE STUDIES"
              title="Real Product Hubs & Storefront Results"
              highlight="Storefront Results"
              subtitle="See how independent product websites and e-commerce stores drive customer acquisition and order fulfillment."
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

      {/* Verified Feedback */}
      <ClientFeedbackSection />

      {/* 4-Step Process */}
      <ProcessStepsSection
        eyebrow="HOW WE BUILD"
        title="From Catalog Strategy to Live Store Launch"
        highlight="Live Store Launch"
        subtitle="A proven e-commerce deployment roadmap ensuring smooth inventory staging, checkout testing, and staff training."
      />

      {/* Pricing Teaser */}
      <PricingTeaserSection />

      {/* E-commerce FAQs */}
      <FaqSection
        title="Frequently Asked Questions About E-commerce Development"
        items={ecommerceFaqs}
      />

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
