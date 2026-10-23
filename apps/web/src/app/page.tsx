import type { Metadata } from "next";
import { getSiteSettings, getCaseStudies, getPosts, getPageBySlug } from "@/lib/cms/api";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/");
}

export default async function HomePage() {
  const [settings, caseStudies, posts, pageData, seo] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getPosts(),
    getPageBySlug("home"),
    getRankMathSeo("/"),
  ]);

  const sections = pageData?.acf?.sections || [];

  return (
    <div className="w-full">
      <JsonLd nodes={seo.jsonLd} />
      <SectionRenderer
        sections={sections}
        caseStudies={caseStudies}
        posts={posts}
        bookingUrl={settings.bookingUrl}
      />
    </div>
  );
}
