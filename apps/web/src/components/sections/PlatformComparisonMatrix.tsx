import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";

export function PlatformComparisonMatrix() {
  const wooFeatures = [
    "100% data and customer record ownership",
    "Zero extra per-transaction platform percentage fees",
    "Direct merchant banking & WooPayments / Stripe setup",
    "Deep native WordPress content & blog marketing integration",
    "Custom checkout funnels, upsells, and B2B pricing tiers",
    "Ideal for independent brands and content-led businesses",
  ];

  const shopifyFeatures = [
    "Turnkey hosted infrastructure & automated scaling",
    "Battle-tested, standardized checkout engine",
    "Global app marketplace for third-party extensions",
    "Built-in inventory sync across retail POS locations",
    "Minimal server administration or plugin maintenance",
    "Ideal for fast-moving catalog launches and standard retail",
  ];

  return (
    <section id="platform-comparison" className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="PLATFORM SELECTION MATRIX"
          title="WooCommerce and Shopify Solve Different Operational Challenges"
          highlight="Operational Challenges"
          subtitle="Both are powerful platforms, but they align with different business models. Choose based on how you want to run operations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* WooCommerce Card */}
          <Card className="p-8 border-blue-500/30 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="blue">Full Ownership Model</Badge>
                <span className="text-xs font-mono text-slate-400">WordPress Foundation</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">WooCommerce</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Best when code ownership, custom checkout logic, content-driven organic search, and direct banking integrations take precedence.
              </p>

              <ul className="space-y-3 mb-8">
                {wooFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="primary" size="md">
              <Link href="/contact?service=woocommerce">
                Discuss a WooCommerce Store <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>

          {/* Shopify Card */}
          <Card className="p-8 border-slate-700 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="purple">Hosted Turnkey Model</Badge>
                <span className="text-xs font-mono text-slate-400">SaaS Ecosystem</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Shopify</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Best when rapid time-to-market, automated server scaling, out-of-the-box checkout reliability, and multi-channel retail sync are essential.
              </p>

              <ul className="space-y-3 mb-8">
                {shopifyFeatures.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild variant="outline" size="md">
              <Link href="/contact?service=shopify">
                Discuss a Shopify Store <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </Card>
        </div>
      </Container>
    </section>
  );
}
