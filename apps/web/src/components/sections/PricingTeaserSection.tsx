import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Tag } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  link: string;
}

const tiers: PricingTier[] = [
  {
    name: "Business Websites",
    price: "£450",
    description: "Custom design, core pages, responsive layouts, and CMS handover.",
    link: "/pricing#business-websites",
  },
  {
    name: "E-commerce Stores",
    price: "£250",
    description: "Shopify or WooCommerce setup, catalog structure, checkout & payments.",
    link: "/pricing#ecommerce",
  },
  {
    name: "Website Redesigns",
    price: "£400",
    description: "Content audit, modern layout overhaul, SEO protection, conversion focus.",
    link: "/pricing#redesigns",
  },
  {
    name: "Digital Solutions",
    price: "£700",
    description: "Client portals, CRM sync, workflow automations, and custom integrations.",
    link: "/pricing#digital-solutions",
  },
];

export function PricingTeaserSection() {
  return (
    <section className="py-20 bg-brand-dark/50 border-t border-brand-cardBorder">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
            TRANSPARENT STARTING PRICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Clear Starting Prices. <span className="text-blue-400">Tailored Deliverables.</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every project has a transparent price baseline. Explore indicative starting investments across core services, backed by fixed quotations before you commit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {tiers.map((t, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all group">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">Starting from</span>
                <div className="text-3xl font-extrabold text-white font-mono mb-2 group-hover:text-blue-400 transition-colors">
                  {t.price}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{t.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {t.description}
                </p>
              </div>

              <Link
                href={t.link}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 pt-3 border-t border-slate-800"
              >
                View Scope <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-center">
          <Button asChild variant="primary" size="md">
            <Link href="/pricing">
              Explore Full Pricing & Inclusions <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/contact">
              Request Project Quotation
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
