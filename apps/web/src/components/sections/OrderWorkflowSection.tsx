import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function OrderWorkflowSection() {
  const stages = [
    {
      number: "Stage 01",
      title: "Data Intake",
      summary: "Capture the Right Information",
      description: "Validation on shipping addresses, email formats, and customer instructions prevents costly shipping errors before payment occurs.",
    },
    {
      number: "Stage 02",
      title: "Payment Authorization",
      summary: "Instant Fraud & Fund Checks",
      description: "Bank-grade 3D Secure verification with instant status feedback for the customer and transparent charge logs for the merchant.",
    },
    {
      number: "Stage 03",
      title: "Order Routing",
      summary: "Dispatch to Operations",
      description: "Automated sync sends the order details to your warehouse, dropship supplier, or local packing team with zero manual copying.",
    },
    {
      number: "Stage 04",
      title: "Post-Purchase Loop",
      summary: "Keep Customers Informed",
      description: "Real-time dispatch tracking, review intake triggers, and personalized support links eliminate 'Where is my order?' emails.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="OPERATIONAL LIFECYCLE"
          title="Every Order Creates an Automated Operational Workflow"
          highlight="Operational Workflow"
          subtitle="How we structure the four operational phases behind every successful customer purchase."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stages.map((st, idx) => (
            <Card key={idx} className="p-6 border-slate-800 bg-slate-900/50">
              <span className="text-xs font-mono font-bold text-blue-400 block mb-2 uppercase">
                {st.number}
              </span>
              <h3 className="text-base font-bold text-white mb-1">{st.title}</h3>
              <span className="text-xs text-blue-300 font-medium block mb-3 font-mono">
                {st.summary}
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                {st.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
