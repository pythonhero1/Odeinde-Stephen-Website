import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CaseStudiesFilterGrid } from "@/components/sections/CaseStudiesFilterGrid";
import { ClientFeedbackSection } from "@/components/sections/ClientFeedbackSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { getSiteSettings, getCaseStudies } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Code2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/case-studies");
}

export default async function CaseStudiesPage() {
  const [settings, caseStudies, seo] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getRankMathSeo("/case-studies"),
  ]);

  const caseStudyFaqs = [
    {
      question: "Are these case studies based on real client engagements?",
      answer: "Yes. Every case study represents a real client project delivered by Oderinde Stephen, verified by Fiverr Pro ratings, repeat client engagements, live website deployments, or verified customer reviews.",
    },
    {
      question: "What is the difference between this Case Studies page and the Portfolio page?",
      answer: "The Case Studies hub provides in-depth technical and strategic breakdowns: the problem statement, delivered architecture, technology stack, and verified business outcomes. The Portfolio page offers a quicker visual gallery of completed websites with links to live client URLs.",
    },
    {
      question: "Can I inspect the live websites featured in these case studies?",
      answer: "Yes. Where client NDA agreements allow, direct links to active client domains (e.g., bornaccelerators.com, pipepatchpro.net, agenturostwest.de) are provided for you to inspect live performance and responsiveness.",
    },
    {
      question: "What technology platforms were used in these projects?",
      answer: "Projects span WordPress, Headless Next.js, Elementor, WooCommerce, Hostinger infrastructure, and responsive modern CSS tokens tailored to each client's specific operational needs.",
    },
    {
      question: "How do you verify client outcomes and feedback?",
      answer: "Outcomes are verified through third-party platform ratings (Fiverr 5-star reviews, repeat hiring orders, Amazon verified purchase reviews, and direct client testimonials). We never fabricate ratings or sales claims.",
    },
    {
      question: "Can my project achieve similar results with my current budget?",
      answer: "Yes. We discuss your objectives during a 20-minute discovery call and propose a realistic scope that maximizes impact within your investment parameters.",
    },
    {
      question: "Do you sign Non-Disclosure Agreements (NDAs) for sensitive projects?",
      answer: "Yes. For proprietary systems, internal client portals, or pre-launch ventures, I routinely sign and uphold strict confidentiality and NDA agreements.",
    },
  ];

  const methodologySteps = [
    {
      step: "01",
      title: "Understand the Challenge",
      description: "Analyze the business problem, target audience friction points, and existing website technical bottlenecks.",
    },
    {
      step: "02",
      title: "Architect the Solution",
      description: "Define information architecture, technology stack (WordPress, Next.js, WooCommerce), and clean component schemas.",
    },
    {
      step: "03",
      title: "Test, Launch & Handover",
      description: "Rigorous cross-device QA, DNS migration with zero downtime, and recorded walkthrough training for ongoing management.",
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
              CASE STUDIES & PROVEN OUTCOMES
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Real Website Projects Built Around Business Goals
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Explore website development, e-commerce, redesign, and digital solution projects. Detailed breakdowns of client challenges, systems delivered, and verified outcomes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Button asChild variant="primary" size="lg">
                <a href="#case-study-grid">
                  Explore Case Studies <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">
                  View Visual Portfolio Gallery
                </Link>
              </Button>
            </div>

            {/* 4 Value Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Real Client Engagements</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Verified Outcomes</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero Fabricated Data</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Live Project Verification</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Filterable Case Studies Grid */}
      <section className="py-20 bg-brand-dark/30 border-t border-brand-cardBorder">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              THE CASE STUDY LIBRARY
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Filter Projects by Technology or Service
            </h2>
          </div>

          <CaseStudiesFilterGrid caseStudies={caseStudies} />
        </Container>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              FROM CHALLENGE TO OUTCOME
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              How Projects Move from Problem to Measurable Result
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every case study in this library followed a structured 3-phase methodology designed to protect brand equity and deliver reliable software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologySteps.map((m, idx) => (
              <Card key={idx} className="p-8 border-slate-800 bg-slate-900/50">
                <span className="text-3xl font-mono font-extrabold text-blue-500 block mb-4">
                  {m.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Client Feedback Proof */}
      <ClientFeedbackSection />

      {/* Case Studies FAQs */}
      <FaqSection
        title="Frequently Asked Questions About Website Projects"
        items={caseStudyFaqs}
      />

      {/* Closing CTA */}
      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
