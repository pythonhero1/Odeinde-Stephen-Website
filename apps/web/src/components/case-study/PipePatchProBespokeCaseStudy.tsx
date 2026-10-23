import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  Star,
  CheckCircle2,
  AlertCircle,
  Package,
  Wrench,
  Building,
} from "lucide-react";

interface PipePatchProBespokeProps {
  bookingUrl?: string;
}

export function PipePatchProBespokeCaseStudy({
  bookingUrl = "https://cal.com/oderinde/free",
}: PipePatchProBespokeProps) {
  const kitTiers = [
    {
      tier: "Tier 1: Homeowners",
      icon: Package,
      title: "Rapid Emergency Leak Repair Kit",
      description: "Designed for immediate DIY leak sealing on household plumbing before costly water damage occurs.",
      features: ["Single-application patch", "No special plumbing tools needed", "Fast 15-minute curing bond"],
    },
    {
      tier: "Tier 2: Contractors",
      icon: Wrench,
      title: "Heavy-Duty Commercial Repair Kit",
      description: "Engineered for professional plumbers, irrigation contractors, and HVAC repair teams needing high-pressure tolerances.",
      features: ["Reinforced fiberglass matrix", "High PSI & chemical resistance", "Multi-diameter compatibility"],
    },
    {
      tier: "Tier 3: Facilities",
      icon: Building,
      title: "Facilities Maintenance 20-Pack Supply",
      description: "Commercial bulk supply for industrial plants, municipal buildings, and ongoing property maintenance operations.",
      features: ["20-Pack commercial packaging", "Extended shelf life packaging", "Bulk distributor pricing options"],
    },
  ];

  const sectionsArchitecture = [
    { number: "01", name: "Product Hero", purpose: "Immediate clarity on emergency leak repair capability." },
    { number: "02", name: "How It Works", purpose: "Step-by-step visual demonstration of the 3-step application." },
    { number: "03", name: "3-Tier Kits", purpose: "Clear comparison between Homeowner, Contractor, and Facility kits." },
    { number: "04", name: "Build Standards", purpose: "Technical proof on pressure testing and chemical resistance." },
    { number: "05", name: "Verified Reviews", purpose: "Amazon verified buyer proof and real leak repair testimonials." },
    { number: "06", name: "Direct Support", purpose: "Customer support inbox (info@pipepatchpro.net) and commercial contact." },
  ];

  const amazonReviews = [
    {
      author: "MWrites",
      rating: "5.0 out of 5 stars",
      title: "Saved me from a major leak!",
      quote: "The instructions were simple and it bonded fast. Kept our main water line intact until the plumber arrived the next morning.",
    },
    {
      author: "John S.",
      rating: "5.0 out of 5 stars",
      title: "Excellent emergency kit for contractors",
      quote: "Always keep two of these in the work truck now. Solid adhesion even on slightly damp PVC pipe.",
    },
    {
      author: "Emily Lindbo",
      rating: "5.0 out of 5 stars",
      title: "Held up under pressure",
      quote: "Fixed a pinhole leak in our basement sprinkler line within 20 minutes. Worth every penny.",
    },
  ];

  return (
    <article className="w-full">
      {/* Bespoke Hero Section */}
      <section className="py-20 bg-brand-bg border-b border-brand-cardBorder relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <Badge variant="blue">WordPress Product Website</Badge>
              <Badge variant="purple">WooCommerce Foundation</Badge>
              <Badge variant="green">Hostinger Infrastructure</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Pipe Patch Pro WordPress Product Website Development
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8">
              An independent product website that complements Amazon instead of depending on it. Launched with a dedicated product story, 3-tier maintenance range, and direct customer support infrastructure.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <a href="https://www.pipepatchpro.net/" target="_blank" rel="noopener noreferrer">
                  Visit Live Website <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Start a Product Website
                </Link>
              </Button>
            </div>
          </div>

          {/* Restored Hero Screenshot Frame */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-3">https://www.pipepatchpro.net/</span>
              </div>
              <span className="text-xs font-mono text-blue-400 font-semibold">Live Product Platform</span>
            </div>

            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <Image
                src="/images/pipe-patch-pro-product-website-case-study-feature-image.avif"
                alt="Pipe Patch Pro WordPress product website showcasing emergency pipe repair kits"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 4-Metric Snapshot */}
      <section className="py-12 bg-slate-950/80 border-b border-brand-cardBorder">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase">Industry</span>
              <span className="text-base font-bold text-white">Emergency Plumbing</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase">Infrastructure</span>
              <span className="text-base font-bold text-white">Hostinger + Webmail</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase">Commerce Scope</span>
              <span className="text-base font-bold text-white">WooCommerce + Amazon</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase">Verified Rating</span>
              <span className="text-base font-bold text-emerald-400">5.0 / 5.0 (Amazon)</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Domain Migration & Technical Obstacle Story */}
      <section className="py-20 bg-brand-bg border-b border-brand-cardBorder">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Badge variant="purple" className="mb-4">
              TECHNICAL PROBLEM & RESOLUTION
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              The Domain Move from Wix Delayed the Build, but Not the Product Plan
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              The project began with a significant obstacle: the domain was registered at Wix and subject to ICANN&apos;s 60-day transfer lock. Rather than stalling execution, we decoupled domain management from development.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 border-rose-500/20 bg-slate-900/40">
                <span className="text-xs font-mono font-bold text-rose-400 block mb-2 uppercase">The Obstacle</span>
                <h3 className="text-base font-bold text-white mb-2">Locked at Wix</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Amazon sales were live, but there was no independent product hub. The domain was locked during the 60-day transfer window and support emails had no central destination.
                </p>
              </Card>

              <Card className="p-6 border-blue-500/20 bg-slate-900/40">
                <span className="text-xs font-mono font-bold text-blue-400 block mb-2 uppercase">The Action</span>
                <h3 className="text-base font-bold text-white mb-2">Hostinger & DNS Cutover</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Coordinated 2FA with the client, provisioned Hostinger infrastructure, developed the WordPress site on staging, and mapped DNS records directly once authorization unlocked.
                </p>
              </Card>

              <Card className="p-6 border-emerald-500/20 bg-slate-900/40">
                <span className="text-xs font-mono font-bold text-emerald-400 block mb-2 uppercase">The Result</span>
                <h3 className="text-base font-bold text-white mb-2">Independent Platform</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Standalone product hub launched at pipepatchpro.net with dedicated email (info@pipepatchpro.net), Amazon links, and a WooCommerce commerce baseline.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 6-Section Architecture */}
      <section className="py-20 bg-brand-dark/40 border-b border-brand-cardBorder">
        <Container>
          <div className="max-w-4xl mx-auto">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              INFORMATION ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              One Product Story, Six Conversion-Focused Sections
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Rather than an overwhelming multi-page structure, the website delivers a focused single-page narrative designed to answer consumer questions and direct purchase intent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sectionsArchitecture.map((sec, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-lg font-mono font-extrabold text-blue-500 block mb-1">
                    {sec.number}
                  </span>
                  <h3 className="text-base font-bold text-white mb-1">{sec.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{sec.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3-Tier Maintenance Range */}
      <section className="py-20 bg-brand-bg border-b border-brand-cardBorder">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              PRODUCT RANGE MAPPING
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Three Kits for Three Different Maintenance Needs
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Differentiating the product line for DIY homeowners, licensed commercial plumbers, and industrial facilities maintenance buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kitTiers.map((kt, idx) => {
              const Icon = kt.icon;
              return (
                <Card key={idx} className="p-8 flex flex-col justify-between border-slate-800 bg-slate-900/60">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-blue-400 font-bold block mb-1">{kt.tier}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{kt.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      {kt.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-slate-800">
                    {kt.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Amazon Verified Reviews */}
      <section className="py-20 bg-brand-dark/40 border-b border-brand-cardBorder">
        <Container>
          <div className="max-w-4xl mx-auto">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              REAL BUYER EVIDENCE
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Amazon Verified Customer Feedback
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Customer reviews recovered from live marketplace sales supporting the standalone website launch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {amazonReviews.map((rev, idx) => (
                <Card key={idx} className="p-6 border-slate-800 bg-slate-900/80">
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{rev.title}</h4>
                  <p className="text-slate-300 text-xs italic leading-relaxed mb-4">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    — {rev.author} (Amazon Verified)
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Qualified Outcome & WooCommerce Qualification Statement */}
      <section className="py-20 bg-brand-bg border-b border-brand-cardBorder">
        <Container>
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-blue-950/20 border border-blue-500/30">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Verified Outcome & Commerce Qualification
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <strong>pipepatchpro.net</strong> went live with dedicated product content, Amazon purchase links, and a WooCommerce foundation.
                </p>
                <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
                  <strong>Specification note:</strong> Direct WooCommerce payment gateway activation remained dependent on the client completing banking and WooPayments onboarding. As agreed during audit, direct sales figures are not fabricated.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-brand-dark/60 text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Need a Product Website That Sells Beyond a Marketplace?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Let&apos;s build an independent digital presence that establishes your brand, captures direct customer data, and supports commercial distribution.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a Strategy Call <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Start a Project
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
