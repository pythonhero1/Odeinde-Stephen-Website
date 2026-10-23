import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Zap, Workflow, Layers } from "lucide-react";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";

export function ServicesSlice() {
  const pillars = [
    {
      num: "01",
      title: "Attract",
      subtitle: "Search-Ready Engineering",
      description:
        "High-performance architecture with instant loading, verified Core Web Vitals, and semantic structures designed for discoverability.",
      icon: Compass,
      accentColor: "text-blue-400",
    },
    {
      num: "02",
      title: "Convert",
      subtitle: "Frictionless Journeys",
      description:
        "Engineered conversion pathways, clear calls to action, and direct booking flows that turn qualified visitors into paying clients.",
      icon: Zap,
      accentColor: "text-amber-400",
    },
    {
      num: "03",
      title: "Automate",
      subtitle: "Workflows & Integrations",
      description:
        "Secure server-to-server enquiry relays, automated notification pathways, CRM syncing, and private client workspace dashboards.",
      icon: Workflow,
      accentColor: "text-emerald-400",
    },
    {
      num: "04",
      title: "Scale",
      subtitle: "Decoupled Architecture",
      description:
        "Headless WordPress backends paired with Next.js edge frontends on Cloudflare, isolating content management from public traffic.",
      icon: Layers,
      accentColor: "text-purple-400",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container size="default">
        <SectionHeading
          eyebrow="SYSTEM PILLARS"
          badgeVariant="blue"
          title="One Connected System to Attract, Convert, Automate & Scale"
          highlight="Attract, Convert, Automate & Scale"
          subtitle="Your business needs more than a static brochure. We engineer comprehensive digital systems tailored to measurable growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.num} className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-brand-muted/40">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${pillar.accentColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-1">
                    {pillar.title}
                  </h3>
                  <h4 className="text-xs font-mono text-brand-accent uppercase tracking-wider mb-3">
                    {pillar.subtitle}
                  </h4>

                  <p className="text-sm text-brand-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/business-website-solutions"
            className="inline-flex items-center gap-2 text-sm font-heading font-medium text-brand-accent hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded p-1"
          >
            <span>Explore Complete Website Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
