import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FileCheck, Milestone, Handshake } from "lucide-react";

export function UniversalInclusionsSection() {
  const inclusions = [
    {
      icon: FileCheck,
      number: "01",
      title: "Defined Project Scope",
      description: "No vague promises. Every proposal includes a line-item checklist of exact pages, components, integrations, and deliverables before you pay any deposit.",
    },
    {
      icon: Milestone,
      number: "02",
      title: "Clear Delivery Milestones",
      description: "Projects are divided into transparent stages (Strategy, Design, Development, Review) with realistic schedules and designated review points.",
    },
    {
      icon: Handshake,
      number: "03",
      title: "Rigorous QA & Handover",
      description: "Multi-viewport mobile testing, form delivery tests, accessibility checks, and recorded video walkthroughs showing your team how to edit content.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="SCOPE BEFORE COMMITMENT"
          title="Universal Standards Included in Every Engagement"
          highlight="Every Engagement"
          subtitle="Regardless of project scale or tier, every build benefits from the same engineering integrity, transparent communication, and quality controls."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {inclusions.map((inc, idx) => {
            const Icon = inc.icon;
            return (
              <Card key={idx} className="p-8 border-slate-800 bg-slate-900/60">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 block mb-1">
                  Inclusion {inc.number}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{inc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {inc.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
