import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SearchX, HelpCircle, ShoppingBag, ShieldAlert } from "lucide-react";

export function EcommerceFrictionSection() {
  const frictionPoints = [
    {
      icon: SearchX,
      title: "Product Discovery Roadblocks",
      description: "Confusing navigation, missing category filters, and poor mobile search prevent shoppers from finding what they want to buy quickly.",
    },
    {
      icon: HelpCircle,
      title: "Unanswered Buying Questions",
      description: "Product descriptions that omit dimensions, materials, compatibility, or shipping terms create doubt right when the buyer is ready to add to cart.",
    },
    {
      icon: ShoppingBag,
      title: "Checkout Drop-Off & Fee Shock",
      description: "Unclear shipping fees revealed at the last moment, mandatory account creation, or limited payment options cause high cart abandonment.",
    },
    {
      icon: ShieldAlert,
      title: "Disjointed Back-Office Operations",
      description: "Manual stock tracking, disconnected fulfillment apps, and broken customer confirmation emails turn order spikes into operational chaos.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="WHERE SALES ARE LOST"
          title="Friction in the Buying Journey Limits Online Store Growth"
          highlight="Buying Journey"
          subtitle="Most online stores do not fail because of product quality; they fail because small friction points across discovery, cart, and checkout drive customers away."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {frictionPoints.map((fp, idx) => {
            const Icon = fp.icon;
            return (
              <Card key={idx} className="p-6 border-slate-800 bg-slate-900/50 hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{fp.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {fp.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
