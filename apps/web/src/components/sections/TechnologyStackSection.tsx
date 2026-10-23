import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PlatformInfo {
  name: string;
  role: string;
  description: string;
  iconSrc: string;
  strengths: string[];
}

const platforms: PlatformInfo[] = [
  {
    name: "WordPress / Headless",
    role: "Flexible Editorial CMS & Decoupled Web",
    description: "The gold standard for content ownership. Used as a robust headless backend powering high-speed Next.js frontends or as a tailored custom theme.",
    iconSrc: "/images/wordpress-cms-platform-icon.png",
    strengths: ["100% data ownership", "Familiar editorial interface", "Zero vendor lock-in"],
  },
  {
    name: "WooCommerce",
    role: "Open Commerce & Direct Customer Ownership",
    description: "Full-control e-commerce infrastructure without per-transaction SaaS fees. Perfect for businesses selling products, digital downloads, or recurring subscriptions.",
    iconSrc: "/images/woocommerce-ecommerce-platform-icon.png",
    strengths: ["Custom checkout funnels", "Direct banking integration", "Flexible product schemas"],
  },
  {
    name: "Shopify",
    role: "Turnkey Hosted Commerce Ecosystem",
    description: "Ideal when rapid time-to-market and automated infrastructure take priority. Customized with clean Liquid sections or headless storefronts.",
    iconSrc: "/images/shopify-ecommerce-platform-icon.png",
    strengths: ["High-volume reliability", "Turnkey checkout engine", "Global app ecosystem"],
  },
  {
    name: "Next.js & Cloudflare",
    role: "Modern Modern Performance Architecture",
    description: "Lightning-fast static regeneration (ISR) and server-side edge rendering delivering sub-second load times and rock-solid security.",
    iconSrc: "/images/framer-website-platform-icon.png",
    strengths: ["Sub-second page loads", "Edge CDN global caching", "Bank-grade security"],
  },
];

export function TechnologyStackSection() {
  return (
    <section className="py-20 bg-brand-dark/50 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="FLEXIBLE TECHNOLOGY"
          title="Technology Selected Around Your Specific Requirements"
          highlight="Specific Requirements"
          subtitle="I do not force a single framework onto every project. Technology selection follows your operational workflow, internal team skills, and growth roadmap."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {platforms.map((plat, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 p-2.5 flex items-center justify-center mb-6">
                  <Image
                    src={plat.iconSrc}
                    alt={plat.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <Badge variant="blue" className="mb-3 text-[10px]">
                  {plat.role}
                </Badge>
                <h3 className="text-lg font-bold text-white mb-2">{plat.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {plat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Key Strengths</span>
                <ul className="space-y-1.5">
                  {plat.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      {str}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
