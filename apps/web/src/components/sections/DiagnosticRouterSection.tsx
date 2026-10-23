import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

interface DiagnosticRoute {
  number: string;
  situation: string;
  description: string;
  recommendedService: string;
  deliverables: string[];
  link: string;
}

const routes: DiagnosticRoute[] = [
  {
    number: "Route 01",
    situation: "I need a professional website for my business.",
    description: "You do not have a website yet, or your current presence is just a landing page that fails to explain your services, build authority, or generate client enquiries.",
    recommendedService: "Business Website Development",
    deliverables: ["Strategy & positioning", "Custom responsive design", "Enquiry lead capture", "WordPress / Next.js CMS"],
    link: "/business-website-development",
  },
  {
    number: "Route 02",
    situation: "I want to sell products or services online.",
    description: "You need a modern, conversion-focused online store with streamlined checkout, inventory management, and zero unnecessary transaction fee overhead.",
    recommendedService: "E-commerce Development",
    deliverables: ["WooCommerce or Shopify", "Mobile-optimized checkout", "Product catalog filters", "Payment gateway setup"],
    link: "/e-commerce-development",
  },
  {
    number: "Route 03",
    situation: "I already have a website, but it is not working well.",
    description: "Your site looks dated, loads slowly, is difficult to edit, or gets traffic without generating phone calls or form enquiries. You need a modern overhaul without losing SEO.",
    recommendedService: "Strategic Website Redesign",
    deliverables: ["Preserved search rankings", "Modern visual identity", "Friction reduction audit", "Streamlined mobile UX"],
    link: "/business-website-solutions#diagnostic",
  },
  {
    number: "Route 04",
    situation: "I need clients, members, or students to do more online.",
    description: "Your business requires logged-in client portals, onboarding workflows, automated appointment scheduling, or document exchange to eliminate manual administration.",
    recommendedService: "Client Portals & Digital Systems",
    deliverables: ["Client portal workspace", "Automated intake funnels", "CRM data synchronization", "Role-based access"],
    link: "https://portal.oderindestephen.com/",
  },
];

export function DiagnosticRouterSection() {
  return (
    <section id="solution-paths" className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="FIND THE RIGHT ROUTE"
          title="Which Situation Sounds Most Like Yours?"
          highlight="Most Like Yours"
          subtitle="Start with the problem your business is facing today. We can map that challenge directly to the right architecture and delivery path."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {routes.map((rt, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                    {rt.number}
                  </span>
                  <Badge variant="blue" className="text-[10px]">
                    Recommended Fit
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  &ldquo;{rt.situation}&rdquo;
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {rt.description}
                </p>

                <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 mb-6">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                    Solution: <strong className="text-white">{rt.recommendedService}</strong>
                  </span>
                  <ul className="grid grid-cols-2 gap-2">
                    {rt.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                        {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={rt.link}
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
              >
                Explore This Route <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
