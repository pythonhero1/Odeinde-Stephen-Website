import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Globe, ShoppingCart, Calendar, Cpu, ArrowRight } from "lucide-react";

interface SolutionItem {
  icon: React.ElementType;
  title: string;
  description: string;
  deliverables: string[];
  link: string;
  linkText: string;
}

const solutions: SolutionItem[] = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Professional, fast websites designed to communicate your value clearly and generate qualified client enquiries.",
    deliverables: ["Custom design & messaging", "Structured service pages", "Fast Next.js & WordPress CMS"],
    link: "/business-website-development",
    linkText: "Explore Development",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Platforms",
    description: "Custom WooCommerce and Shopify storefronts optimized around how your customers discover, compare and purchase.",
    deliverables: ["Streamlined checkout flow", "Product catalog architecture", "Operational payment gateways"],
    link: "/e-commerce-development",
    linkText: "Explore E-commerce",
  },
  {
    icon: Calendar,
    title: "Website Redesigns",
    description: "Transform outdated websites into modern digital systems without losing established search traffic or customer trust.",
    deliverables: ["Preserved search rankings", "Modern responsive UI", "Conversion path overhaul"],
    link: "/business-website-solutions",
    linkText: "Explore Solutions",
  },
  {
    icon: Cpu,
    title: "Connected Client Systems",
    description: "Portals, CRM automations, and custom workflows that connect your marketing website directly to business operations.",
    deliverables: ["Client project workspace", "Lead intake automation", "Custom API integrations"],
    link: "/business-website-solutions",
    linkText: "Explore Systems",
  },
];

export function ConnectedSolutionsSection() {
  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="CONNECTED SOLUTIONS"
          title="Digital Systems Built Around Your Business Goals"
          highlight="Business Goals"
          subtitle="A website should not exist in isolation. I design and engineer connected digital solutions tailored to how you attract, convert, and serve your clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="flex flex-col justify-between p-8 group">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {item.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        {del}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={item.link}
                  className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200"
                >
                  {item.linkText} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
