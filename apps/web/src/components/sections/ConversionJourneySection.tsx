import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function ConversionJourneySection() {
  const steps = [
    {
      number: "Step 01",
      title: "Immediate Clarity",
      question: "Can I quickly tell what this company does?",
      description: "Within seconds of landing, visitors should see an unambiguous headline, core service badge, and primary action without scrolling through vague jargon.",
    },
    {
      number: "Step 02",
      title: "Confidence & Evidence",
      question: "Are they capable and experienced?",
      description: "Concrete case studies, client outcome metrics, verified review badges, and technical qualifications eliminate scepticism and establish authority.",
    },
    {
      number: "Step 03",
      title: "Transparent Evaluation",
      question: "Does their solution fit my budget and timeline?",
      description: "Clear starting prices, scope explanations, and FAQ accordions answer purchasing questions upfront, filtering out mismatched leads.",
    },
    {
      number: "Step 04",
      title: "Effortless Contact",
      question: "How do I take the next step?",
      description: "Direct access to calendar scheduling or a brief, 7-field structured enquiry form makes reaching out straightforward on both mobile and desktop.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="THE VISITOR JOURNEY"
          title="How a Business Website Turns Visitors into Clients"
          highlight="Turns Visitors into Clients"
          subtitle="Every visitor follows an emotional and logical path from arrival to enquiry. We engineer each step to build momentum and eliminate friction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((st, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between border-slate-800 bg-slate-900/50">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2 uppercase">
                  {st.number}
                </span>
                <h3 className="text-base font-bold text-white mb-1">{st.title}</h3>
                <span className="text-xs italic text-slate-300 block mb-3 font-serif">
                  &ldquo;{st.question}&rdquo;
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {st.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
