import { getSiteSettings, getCaseStudies, getPageBySlug } from "@/lib/cms/api";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export default async function HomePage() {
  const [settings, caseStudies, pageData] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getPageBySlug("home"),
  ]);

  const sections = pageData?.acf?.sections || [];

  return (
    <div className="w-full">
      <SectionRenderer
        sections={sections}
        caseStudies={caseStudies}
        bookingUrl={settings.bookingUrl}
      />
    </div>
  );
}
