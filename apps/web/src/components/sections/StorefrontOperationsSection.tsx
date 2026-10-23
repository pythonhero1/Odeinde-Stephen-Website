import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Layers, CreditCard, RefreshCw, Truck, Users, BarChart3 } from "lucide-react";

export function StorefrontOperationsSection() {
  const systems = [
    {
      icon: Layers,
      title: "Product Catalog Architecture",
      description: "Structured attributes, variant management, and category hierarchies that make browsing large inventories effortless.",
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Integration",
      description: "Reliable setups for Stripe, PayPal, Apple Pay, Google Pay, and localized bank routing with zero checkout friction.",
    },
    {
      icon: RefreshCw,
      title: "Recurring Revenue & Subscriptions",
      description: "Automated recurring billing, membership access controls, and customer self-service subscription management portals.",
    },
    {
      icon: Truck,
      title: "Fulfillment & Inventory Workflows",
      description: "Connecting orders directly to shipping label printers, 3PL warehouses, and live stock tracking across channels.",
    },
    {
      icon: Users,
      title: "Customer Retention Systems",
      description: "Automated order review collection, abandoned cart recovery sequences, and branded customer account areas.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Buying Metrics",
      description: "Conversion funnels, average order value tracking, and clean Google Analytics 4 e-commerce event measurement.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="END-TO-END COMMERCE"
          title="The Storefront and Operational Engine Must Work Together"
          highlight="Operational Engine"
          subtitle="A high-performing store is more than pretty product mockups. It is an operating system that streamlines inventory, payments, and fulfillment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {systems.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} className="p-6 border-slate-800 hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {s.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
