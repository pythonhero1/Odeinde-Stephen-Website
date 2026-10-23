"use client";

import React, { useState } from "react";
import { ExternalLink, CheckCircle, Clock, FileText, Receipt, LifeBuoy, Info } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

interface PortalTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  sampleStatus: string;
  sampleItems: string[];
}

export function InteractivePortalSection() {
  const tabs: PortalTab[] = [
    {
      id: "onboarding",
      label: "Onboarding",
      icon: CheckCircle,
      title: "Project Discovery & Technical Setup",
      description:
        "Streamlined questionnaire, domain credentials, brand token ingestion, and baseline requirements gathered in one secure workspace.",
      sampleStatus: "Completed (100%)",
      sampleItems: [
        "Architecture brief approved",
        "WordPress REST endpoint keys verified",
        "Cloudflare DNS records mapped",
        "Content assets cataloged",
      ],
    },
    {
      id: "milestones",
      label: "Milestones",
      icon: Clock,
      title: "Delivery Roadmap & Sprint Progress",
      description:
        "Every phase has clearly defined acceptance criteria. You see exact build statuses without chasing updates.",
      sampleStatus: "Sprint 2 in Progress (75%)",
      sampleItems: [
        "Design system & tokens locked",
        "Vertical slice live preview ready",
        "Content migration verification pending",
        "Core Web Vitals validation scheduled",
      ],
    },
    {
      id: "files",
      label: "Files & Feedback",
      icon: FileText,
      title: "Asset Repository & Revisions",
      description:
        "Centralized storage for design proofs, staging credentials, contract schemas, and revision requests.",
      sampleStatus: "4 Assets Updated",
      sampleItems: [
        "Figma design component specs v2",
        "Next.js App Router route matrix",
        "Staging preview access tokens",
        "Post-migration redirect map",
      ],
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: Receipt,
      title: "Milestone Billing & Invoices",
      description:
        "Transparent payment schedules tied strictly to verified milestone deliverables in GBP (£).",
      sampleStatus: "Up to Date",
      sampleItems: [
        "Deposit & Architecture: Paid",
        "Phase 03 Slice Demonstration: Pending",
        "Final Deployment & Cutover: Scheduled",
      ],
    },
    {
      id: "support",
      label: "Support",
      icon: LifeBuoy,
      title: "Ongoing Maintenance & SLA",
      description:
        "Direct ticket submission for updates, plugin monitoring, edge cache optimizations, and priority response.",
      sampleStatus: "Active SLA • 99.9% Uptime",
      sampleItems: [
        "Weekly WordPress security patches",
        "Edge cache hit-ratio monitoring",
        "Automated daily off-site backups",
        "Emergency rollback protocol active",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-20 sm:py-28">
      <Container size="default">
        <SectionHeading
          eyebrow="CLIENT PORTAL WORKSPACE"
          badgeVariant="green"
          title="Your Website Project, Organized in One Private Workspace"
          highlight="One Private Workspace"
          subtitle="No endless email threads or lost links. Every client receives a private project dashboard for real-time milestones, files, and updates."
        />

        {/* Interactive Workspace Mockup Card */}
        <div className="rounded-2xl bg-brand-card border border-brand-border overflow-hidden shadow-2xl">
          {/* Mockup Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-brand-surface/80 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-brand-muted">
                portal.oderindestephen.com / workspace / sample-project
              </span>
            </div>

            {/* Invariant: Sample Data Disclaimer Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-mono text-brand-accent">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Interactive illustration &bull; Sample client workspace data</span>
            </div>
          </div>

          {/* Workspace Tabs Navigation */}
          <div
            role="tablist"
            aria-label="Client Workspace Sections"
            className="flex overflow-x-auto border-b border-brand-border bg-brand-surface/30 px-4 py-2 gap-2 scrollbar-none"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                    isSelected
                      ? "bg-brand-accentHover text-white shadow-sm"
                      : "text-brand-muted hover:text-white hover:bg-brand-surface"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Workspace Tab Content */}
          <div
            role="tabpanel"
            id={`panel-${currentTab.id}`}
            aria-labelledby={`tab-${currentTab.id}`}
            className="p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="inline-block px-3 py-1 rounded text-xs font-mono bg-brand-surface border border-brand-border text-brand-green mb-4">
                  Status: {currentTab.sampleStatus}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                  {currentTab.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-6 font-sans">
                  {currentTab.description}
                </p>

                <div className="flex items-center gap-4">
                  <Button
                    href="https://portal.oderindestephen.com/"
                    isExternal
                    variant="primary"
                    size="sm"
                  >
                    <span>Client Sign In</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <span className="text-xs text-brand-muted font-mono">
                    Active client access portal
                  </span>
                </div>
              </div>

              {/* Sample Deliverables Checklist */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-brand-surface/60 border border-brand-border">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
                  Sample Workspace Activity
                </h4>
                <ul className="space-y-3">
                  {currentTab.sampleItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-foreground/90 font-mono"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
