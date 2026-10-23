import React from "react";
import { HeroSection } from "./HeroSection";
import { TrustBarSection } from "./TrustBarSection";
import { ServicesSlice } from "./ServicesSlice";
import { CaseStudiesSlice } from "./CaseStudiesSlice";
import { InteractivePortalSection } from "./InteractivePortalSection";
import { FaqSection } from "./FaqSection";
import { ClosingCtaSection } from "./ClosingCtaSection";
import type { CaseStudy } from "@/lib/cms/schema";

interface SectionRendererProps {
  sections?: Record<string, any>[];
  caseStudies?: CaseStudy[];
  bookingUrl?: string;
}

export function SectionRenderer({
  sections = [],
  caseStudies = [],
  bookingUrl = "https://cal.com/oderinde/free",
}: SectionRendererProps) {
  // If ACF sections are configured, dynamically map them
  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <div className="flex flex-col w-full">
        {sections.map((section, index) => {
          const layout = section.acf_fc_layout;

          switch (layout) {
            case "hero":
              return (
                <HeroSection
                  key={`hero-${index}`}
                  badge={section.badge}
                  headline={section.headline}
                  headlineHighlight={section.headline_highlight}
                  subheadline={section.subheadline}
                  ctaPrimaryLabel={section.cta_primary_label}
                  ctaPrimaryUrl={section.cta_primary_url || bookingUrl}
                  ctaSecondaryLabel={section.cta_secondary_label}
                  ctaSecondaryUrl={section.cta_secondary_url}
                />
              );
            case "trust_bar":
              return <TrustBarSection key={`trust-${index}`} />;
            case "system_pillars":
            case "services_grid":
              return <ServicesSlice key={`services-${index}`} />;
            case "case_studies_grid":
              return (
                <CaseStudiesSlice
                  key={`cs-${index}`}
                  caseStudies={caseStudies}
                  limit={section.limit || 6}
                />
              );
            case "interactive_portal":
              return <InteractivePortalSection key={`portal-${index}`} />;
            case "faq_section":
              return (
                <FaqSection
                  key={`faq-${index}`}
                  title={section.title}
                  items={section.items}
                />
              );
            case "closing_cta":
              return (
                <ClosingCtaSection
                  key={`ccta-${index}`}
                  title={section.title}
                  description={section.description}
                  bookingUrl={section.button_url || bookingUrl}
                />
              );
            default:
              console.warn(`[SectionRenderer] Unrecognized layout: ${layout}`);
              return null;
          }
        })}
      </div>
    );
  }

  // Resilient Canonical Fallback: Renders complete homepage sequence if acf.sections is not yet populated
  return (
    <div className="flex flex-col w-full">
      <HeroSection
        ctaPrimaryUrl={bookingUrl}
      />
      <TrustBarSection />
      <ServicesSlice />
      <CaseStudiesSlice caseStudies={caseStudies} limit={3} />
      <InteractivePortalSection />
      <FaqSection />
      <ClosingCtaSection bookingUrl={bookingUrl} />
    </div>
  );
}
