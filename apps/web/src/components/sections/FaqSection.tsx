"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  items?: FaqItem[];
}

export function FaqSection({
  title = "Business Website Development Frequently Asked Questions",
  items,
}: FaqSectionProps) {
  const defaultItems: FaqItem[] = [
    {
      question: "How much does a custom headless website cost?",
      answer:
        "Starting packages begin from £450 for focused business sites, £250 for lightweight service platforms, and £700 for full custom digital systems. Pricing is transparent, standardized in GBP (£), and quoted based on exact technical requirements with zero surprise fees.",
    },
    {
      question: "Why use Headless WordPress instead of standard WordPress?",
      answer:
        "Headless WordPress completely separates your editorial dashboard from public visitors. Your frontend is statically pre-rendered and served at the edge via Cloudflare and Next.js, eliminating PHP rendering latency, database query bottlenecks, and traditional plugin security attack vectors.",
    },
    {
      question: "How long does a typical build take from start to launch?",
      answer:
        "Focused business websites typically launch in 2 to 4 weeks. Larger custom systems, multi-language architectures, or complex migrations typically take 4 to 8 weeks with clearly defined milestones tracked in your private client portal.",
    },
    {
      question: "Can I still edit my content easily without writing code?",
      answer:
        "Yes. You manage all pages, blog posts, case studies, and settings through intuitive WordPress ACF fields. When you click Publish, an automated webhook instantly refreshes the public frontend without requiring manual redeployment.",
    },
    {
      question: "Do you handle domain configuration, hosting, and email setup?",
      answer:
        "Yes. We configure your DNS records through Cloudflare, maintaining complete integrity for existing business email (MX, SPF, DKIM) and external service integrations while pointing the web root to high-speed edge infrastructure.",
    },
    {
      question: "What happens if I need ongoing maintenance or updates?",
      answer:
        "All projects include post-launch support and automated backups. You can also engage ongoing monthly maintenance covering security updates, plugin monitoring, edge caching, and SLA response.",
    },
  ];

  const faqList = items && items.length > 0 ? items : defaultItems;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-brand-surface/20 border-t border-brand-border/60">
      <Container size="narrow">
        <SectionHeading
          eyebrow="COMMON QUESTIONS"
          badgeVariant="muted"
          title={title}
          subtitle="Everything you need to know about the architecture, timelines, costs, and ongoing management."
        />

        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-brand-card/80 border border-brand-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-heading font-semibold text-white hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <span className="text-base sm:text-lg pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-brand-muted transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-accent" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-muted leading-relaxed font-sans border-t border-brand-border/40"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
