import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  badge?: string;
  isPopular?: boolean;
  target: string;
  description: string;
  features: string[];
  contactParam: string;
}

const packages: PricingPackage[] = [
  {
    id: "business-websites",
    name: "Business Website Development",
    price: "£450",
    badge: "Core Service",
    isPopular: true,
    target: "Service businesses, agencies & consultants",
    description: "A professional, bespoke website engineered to position your authority, pass the 5-second clarity test, and capture qualified inbound enquiries.",
    features: [
      "Custom responsive design (360px to 1440px+)",
      "Essential page architecture (Home, About, Services, Contact)",
      "WordPress / Headless CMS content handover",
      "Direct Cal.com & 7-field enquiry form integration",
      "On-page SEO semantic structure & Google indexing setup",
      "Mobile speed optimization & cross-browser testing",
    ],
    contactParam: "business-website",
  },
  {
    id: "ecommerce",
    name: "E-commerce Development",
    price: "£250",
    badge: "Open Commerce",
    target: "Product brands & online stores",
    description: "Tailored Shopify or WooCommerce setup focused on the 5-stage customer buying journey, payment security, and frictionless checkout.",
    features: [
      "WooCommerce or Shopify catalog structure",
      "Optimized product detail pages with variant support",
      "Frictionless cart & multi-gateway checkout (Stripe/PayPal)",
      "Automated order confirmation & customer email setup",
      "Inventory tracking & shipping zone configuration",
      "Zero per-transaction platform percentage fee model (Woo)",
    ],
    contactParam: "e-commerce",
  },
  {
    id: "redesigns",
    name: "Strategic Website Redesign",
    price: "£400",
    badge: "Modernization",
    target: "Established sites needing modernization",
    description: "Transform an outdated or slow website into a high-converting digital system without losing established Google search rankings or domain equity.",
    features: [
      "Comprehensive UX & conversion friction audit",
      "Preservation of existing URL permalinks & SEO equity",
      "Modern dark/blue design overhaul with rem typography",
      "Performance rebuild for sub-second page loads",
      "Staging preview environment before live cutover",
      "Safe content & asset migration from old CMS",
    ],
    contactParam: "redesign",
  },
  {
    id: "digital-solutions",
    name: "Digital Solutions & Portals",
    price: "£700",
    badge: "Systems & Automation",
    target: "Growing teams wanting workflow efficiency",
    description: "Bespoke integrations, client workspace portals, appointment funnels, and CRM synchronizations that eliminate repetitive admin tasks.",
    features: [
      "Dedicated client project or member portal workspace",
      "Automated lead routing & CRM synchronization",
      "Role-based authentication & secure document sharing",
      "Custom web calculators & multi-step quotation funnels",
      "API webhook connections (Cloudflare, WordPress, Mailpit)",
      "Comprehensive training documentation & operational handover",
    ],
    contactParam: "digital-solutions",
  },
];

export function PricingPackagesGrid() {
  return (
    <section id="packages" className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="STARTING-PRICE PACKAGES"
          title="Clear Starting Prices. Solutions Built Around Your Goals"
          highlight="Your Goals"
          subtitle="All prices are stated in British Pounds (£). Starting prices are indicative and cover typical project foundations. Exact deliverables, schedules, and costs are confirmed in a formal written proposal."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              id={pkg.id}
              className={`p-6 sm:p-8 flex flex-col justify-between transition-all ${
                pkg.isPopular
                  ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-gradient-to-b from-blue-950/20 via-slate-900 to-slate-900"
                  : "border-slate-800 hover:border-blue-500/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={pkg.isPopular ? "blue" : "default"} className="text-[10px]">
                    {pkg.badge}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-500">Starting from</span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400">GBP</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                <span className="text-xs font-mono text-blue-400 block mb-3">{pkg.target}</span>

                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                    Scope Inclusions
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                asChild
                variant={pkg.isPopular ? "primary" : "outline"}
                size="md"
                className="w-full"
              >
                <Link href={`/contact?service=${pkg.contactParam}`}>
                  Discuss Your Project <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
