import { getSiteSettings, getCaseStudies, getPosts, getPageBySlug } from "@/lib/cms/api";
import { SectionRenderer } from "@/components/sections/SectionRenderer";

export default async function HomePage() {
  const [settings, caseStudies, posts, pageData] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getPosts(),
    getPageBySlug("home"),
  ]);

  const sections = pageData?.acf?.sections || [];

  return (
    <div className="w-full">
      <SectionRenderer
        sections={sections}
        caseStudies={caseStudies}
        posts={posts}
        bookingUrl={settings.bookingUrl}
      />
    </div>
  );
}
