import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

export function ServiceMatchSelectorSection() {
  const matches = [
    {
      goal: "Launching a Business Website",
      fit: "Business Website Development (from £450)",
      description: "Best if you are launching a professional firm, local service, consultancy, or B2B business needing credibility and enquiries.",
      link: "/pricing#business-websites",
    },
    {
      goal: "Selling Products or Subscriptions",
      fit: "E-commerce Development (from £250)",
      description: "Best if you are selling physical goods, digital downloads, or recurring memberships requiring direct card payments.",
      link: "/pricing#ecommerce",
    },
    {
      goal: "Overhauling an Existing Website",
      fit: "Website Redesign (from £400)",
      description: "Best if your current site is outdated, slow, difficult to manage, or failing to convert existing search visitors.",
      link: "/pricing#redesigns",
    },
    {
      goal: "Connecting Tools, Portals & Automations",
      fit: "Digital Solutions & Systems (from £700)",
      description: "Best if you need to eliminate manual data entry, provide a client workspace, or connect your website to business CRM workflows.",
      link: "/pricing#digital-solutions",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="FIND YOUR FIT"
          title="Which Service Matches Your Business Objective?"
          highlight="Your Business Objective"
          subtitle="Not sure which package fits? Match your immediate priority to the corresponding service path."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {matches.map((m, idx) => (
            <Card key={idx} className="p-8 border-slate-800 bg-slate-900/40 hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2 uppercase">
                  Goal: {m.goal}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{m.fit}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {m.description}
                </p>
              </div>

              <Link
                href={m.link}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
              >
                View Package Details <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
