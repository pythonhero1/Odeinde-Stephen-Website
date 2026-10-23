import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function ProposalRoadmapSection() {
  const roadmap = [
    {
      step: "01",
      title: "Share Your Goals",
      description: "Submit an enquiry or schedule a 20-minute strategy conversation. Tell me about your business, current website status, and required features.",
    },
    {
      step: "02",
      title: "Review the Requirements",
      description: "I review your scope, evaluate technical dependencies (CMS, commerce, integrations), and identify the most practical architecture.",
    },
    {
      step: "03",
      title: "Receive a Written Proposal",
      description: "You receive a transparent project quotation with fixed milestone pricing, concrete deliverables, timeline, and terms before committing.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="From Your Initial Enquiry to a Fixed Written Proposal"
          highlight="Fixed Written Proposal"
          subtitle="Three simple steps that ensure complete alignment on scope, timelines, and investment."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
          {roadmap.map((rm, idx) => (
            <Card key={idx} className="p-8 border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <span className="text-3xl font-mono font-extrabold text-blue-500 block mb-4">
                  {rm.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{rm.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {rm.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">
              Request Your Project Quotation <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
