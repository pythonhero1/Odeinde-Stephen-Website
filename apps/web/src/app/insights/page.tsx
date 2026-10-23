import type { Metadata } from "next";
import { getPosts, getSiteSettings } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/insights");
}

export default async function InsightsPage() {
  const [posts, settings, seo] = await Promise.all([
    getPosts(),
    getSiteSettings(),
    getRankMathSeo("/insights"),
  ]);

  return (
    <div className="py-12 sm:py-20 flex-1">
      <JsonLd nodes={seo.jsonLd} />
      <Container size="default">
        <SectionHeading
          eyebrow="PRACTICAL GUIDES & ARCHITECTURE"
          badgeVariant="blue"
          title="Engineering Insights & Articles"
          highlight="Insights & Articles"
          subtitle="Direct technical analysis, WordPress maintenance workflows, and headless architecture breakdowns written from practical production experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl my-12">
            <p className="text-slate-400 text-sm">
              New engineering case studies and technical articles are being prepared.
            </p>
          </div>
        )}
      </Container>

      <LeadMagnetSection />

      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
