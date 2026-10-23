import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export function PlatformPhilosophySection() {
  const platforms = [
    {
      title: "WordPress / Headless",
      badge: "Core Specialism",
      description: "For service businesses, agencies, and content-rich platforms that demand full data ownership and lightning-fast edge performance.",
      icon: "/images/wordpress-cms-platform-icon.png",
      link: "/business-website-development",
    },
    {
      title: "WooCommerce",
      badge: "Open Commerce",
      description: "For independent e-commerce stores wanting tailored checkout experiences, direct merchant banking, and zero ongoing revenue fee cuts.",
      icon: "/images/woocommerce-ecommerce-platform-icon.png",
      link: "/e-commerce-development",
    },
    {
      title: "Shopify",
      badge: "Hosted Commerce",
      description: "For brands seeking streamlined inventory management, high-volume checkout infrastructure, and rapid catalog deployment.",
      icon: "/images/shopify-ecommerce-platform-icon.png",
      link: "/e-commerce-development",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="PLATFORMS I BUILD WITH"
          title="Technology Follows the Business Need"
          highlight="Business Need"
          subtitle="A website should solve an operational challenge, not introduce technical debt. We choose the platform that fits your maintenance model."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {platforms.map((p, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-center mb-6">
                  <Image
                    src={p.icon}
                    alt={p.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <Badge variant="blue" className="text-[10px] mb-3">
                  {p.badge}
                </Badge>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <Link
                href={p.link}
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
