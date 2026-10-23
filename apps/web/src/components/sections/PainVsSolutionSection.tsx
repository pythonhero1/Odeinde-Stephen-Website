import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { XCircle, CheckCircle2 } from "lucide-react";

export function PainVsSolutionSection() {
  const challenges = [
    {
      title: "Visitors Don't Understand Your Services",
      description: "When potential clients land on your site, confusing jargon and poor page hierarchy make it hard to figure out what you do, who you serve, and why they should choose you.",
    },
    {
      title: "Low Enquiries Despite Steady Traffic",
      description: "People visit, browse briefly, and leave without getting in touch. Hidden contact options, buried pricing context, and weak calls-to-action cause visitors to bounce.",
    },
    {
      title: "Outdated Systems & Difficult Content Updates",
      description: "Simple changes require an expensive developer or break fragile page builder shortcodes, leaving your business looking neglected and misaligned with current standards.",
    },
  ];

  const solutions = [
    {
      title: "Clear, Business-First Messaging",
      description: "Positioning that passes the 5-second clarity test. Your value, deliverables, and service tiers are immediately obvious across desktop and mobile screens.",
    },
    {
      title: "Frictionless Conversion Journeys",
      description: "Strategic CTA placement, transparent starting prices, direct Cal.com booking, and a verified 7-field contact form designed to capture qualified buyer intent.",
    },
    {
      title: "Clean Headless & Structured CMS",
      description: "Tailored ACF flexible layouts and native WordPress blocks that empower your team to publish case studies and edit content safely without code breaks.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="CHALLENGES & SOLUTIONS"
          title="Is Your Website Helping You Attract and Convert Clients?"
          highlight="Attract and Convert"
          subtitle="Most business websites do not suffer from a lack of visual polish; they suffer from friction between what a visitor needs to know and how the site is structured."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Challenges Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h3 className="text-sm font-mono uppercase font-bold text-rose-400 tracking-wider">
                Common Website Roadblocks
              </h3>
            </div>

            {challenges.map((c, idx) => (
              <Card key={idx} className="p-6 border-rose-500/20 bg-slate-900/40">
                <div className="flex items-start gap-4">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">{c.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{c.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-mono uppercase font-bold text-emerald-400 tracking-wider">
                The Purpose-Built Solution
              </h3>
            </div>

            {solutions.map((s, idx) => (
              <Card key={idx} className="p-6 border-emerald-500/20 bg-slate-900/40">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
