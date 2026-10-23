import React from "react";
import { Star } from "lucide-react";
import { Container } from "../ui/Container";

export function TrustBarSection() {
  const platforms = [
    { name: "WordPress", role: "Headless CMS" },
    { name: "Next.js", role: "App Router" },
    { name: "Cloudflare", role: "Edge Delivery" },
    { name: "Tailwind CSS", role: "Design Tokens" },
    { name: "WooCommerce", role: "Commerce" },
    { name: "Shopify", role: "E-commerce" },
  ];

  const reviewPlatforms = [
    { name: "Clutch", rating: "5.0", badge: "Verified Reviews" },
    { name: "Trustpilot", rating: "5.0", badge: "Excellent" },
    { name: "Google Business", rating: "5.0", badge: "Top Rated" },
    { name: "Fiverr Pro", rating: "5.0", badge: "100% Recommended" },
  ];

  return (
    <section className="py-12 border-y border-brand-border/60 bg-brand-surface/30">
      <Container size="default">
        <div className="flex flex-col gap-8">
          {/* Review Platforms */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-brand-border/40">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-muted shrink-0">
              Verified Client Trust &bull;
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full sm:w-auto">
              {reviewPlatforms.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold font-heading text-white block leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-brand-muted block leading-tight">
                      {item.rating} &bull; {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technology Stack */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">
              Built With &bull;
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {platforms.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 rounded-md bg-brand-surface border border-brand-border text-xs font-mono text-brand-muted"
                >
                  <strong className="text-white font-medium">{tech.name}</strong>{" "}
                  <span className="text-brand-accent/80 text-[10px]">({tech.role})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
