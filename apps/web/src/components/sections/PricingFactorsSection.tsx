import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Layers, Puzzle, PenTool, History, ShieldCheck, Zap } from "lucide-react";

export function PricingFactorsSection() {
  const factors = [
    {
      icon: Layers,
      title: "Scale & Complexity",
      description: "A compact 4-page brochure site requires less scoping and development time than an 11-page multi-service architecture with custom post types.",
    },
    {
      icon: Puzzle,
      title: "Platform & Integrations",
      description: "Direct payment gateways, CRM integrations, client portals, and third-party API sync require dedicated security configuration and testing.",
    },
    {
      icon: PenTool,
      title: "Design & Copy Readiness",
      description: "Projects with pre-written copy and brand guidelines progress faster than those requiring foundational value proposition drafting and wireframing.",
    },
    {
      icon: History,
      title: "Existing Website Condition",
      description: "Migrating from an older CMS (Wix, Squarespace, Divi) while preserving URL permalinks, redirects, and Google rankings involves meticulous SEO mapping.",
    },
    {
      icon: ShieldCheck,
      title: "Functional Requirements",
      description: "Features like multi-currency pricing, recurring subscriptions, gated member access, or multilingual UX influence backend database models.",
    },
    {
      icon: Zap,
      title: "Delivery Timeline",
      description: "Standard projects run smoothly across defined milestones. Expedited or rush deadlines requiring prioritization impact scheduling.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="PRICING FACTORS"
          title="What Factors Influence Your Overall Project Quotation?"
          highlight="Influence Your Overall"
          subtitle="Understanding what drives project investment helps you plan your scope and make cost-effective decisions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {factors.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} className="p-6 border-slate-800 bg-slate-900/40 hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {f.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
