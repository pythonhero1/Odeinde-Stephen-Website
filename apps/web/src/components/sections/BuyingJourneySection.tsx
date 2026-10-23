import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function BuyingJourneySection() {
  const stages = [
    {
      number: "01",
      stage: "Discovery",
      goal: "Can shoppers find the right products fast?",
      description: "Clean category hierarchy, instant faceted search, and prominent product filters ensure visitors locate their target item with minimal clicks.",
    },
    {
      number: "02",
      stage: "Product Page",
      goal: "Does the page answer every buying objection?",
      description: "High-resolution responsive imagery, clear specifications, stock indicators, and customer proof answer critical purchasing doubts.",
    },
    {
      number: "03",
      stage: "Cart & Intent",
      goal: "Does the cart increase buyer confidence?",
      description: "Transparent delivery calculators, order summaries, return assurances, and frictionless quantity toggles prevent hesitation.",
    },
    {
      number: "04",
      stage: "Checkout",
      goal: "Is the checkout fast, familiar and secure?",
      description: "Single-page or clean multi-step checkout with Apple Pay, Google Pay, credit cards, or Buy Now Pay Later options.",
    },
    {
      number: "05",
      stage: "Post-Purchase",
      goal: "What happens after the order is placed?",
      description: "Immediate branded order confirmations, automated tracking updates, and automated customer support links that build repeat buyers.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/50 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="THE 5-STAGE BUYING JOURNEY"
          title="Engineering E-commerce Around How Customers Actually Buy"
          highlight="How Customers Actually Buy"
          subtitle="A successful store optimizes every transition from the first product impression to post-purchase delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {stages.map((st, idx) => (
            <Card key={idx} className="p-5 flex flex-col justify-between border-slate-800 bg-slate-900/40 hover:border-blue-500/40 transition-all">
              <div>
                <span className="text-2xl font-mono font-extrabold text-blue-500 block mb-2">
                  {st.number}
                </span>
                <h3 className="text-base font-bold text-white mb-1">{st.stage}</h3>
                <span className="text-xs text-blue-400/90 font-medium block mb-3 leading-snug">
                  {st.goal}
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
