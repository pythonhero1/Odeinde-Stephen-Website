import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPostBySlug, getPosts, getSiteSettings } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { BlogArticleHeader } from "@/components/blog/BlogArticleHeader";
import { RelatedServiceCta } from "@/components/blog/RelatedServiceCta";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Oderinde Stephen",
    };
  }

  const { isEnabled: isDraft } = await draftMode();
  const rawExcerpt = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim().slice(0, 160);

  return constructPageMetadata(`/insights/${slug}`, {
    fallbackTitle: post.title.rendered,
    fallbackDescription: rawExcerpt,
    isDraft,
  });
}

export default async function SingleInsightPage({ params }: PageProps) {
  const { slug } = await params;
  const draft = await draftMode();
  const [post, settings, seo] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
    getRankMathSeo(`/insights/${slug}`, { isDraft: draft.isEnabled }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 flex-1">
      <JsonLd nodes={seo.jsonLd} />
      {draft.isEnabled && (
        <div className="w-full bg-amber-500/20 border-b border-amber-500/40 text-amber-300 px-4 py-2 text-xs font-mono text-center flex items-center justify-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>PREVIEW DRAFT ACTIVE - Unpublished / Preview content displayed securely.</span>
        </div>
      )}

      <Container size="default">
        <article className="max-w-3xl mx-auto">
          <BlogArticleHeader post={post} />

          {/* Article Body with Custom Typography */}
          <div
            className="prose prose-invert prose-blue max-w-none 
              prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base prose-p:mb-5
              prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300
              prose-strong:text-white prose-strong:font-bold
              prose-ul:text-slate-300 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:text-slate-300 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:my-1.5 prose-li:text-slate-300
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-300 prose-blockquote:my-6
              prose-code:text-blue-300 prose-code:bg-slate-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs
              prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:p-4 prose-pre:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
          />

          {/* Contextual CTA for web engineering consultation */}
          <RelatedServiceCta
            title="Need Help Auditing or Modernising Your WordPress Site?"
            description="Broken links, slow database queries, and fragile plugins kill conversions and search rankings. Let’s review your website architecture and create a clean, modern roadmap."
            url="/business-website-development"
            bookingUrl={settings.bookingUrl}
          />
        </article>
      </Container>

      <ClosingCtaSection bookingUrl={settings.bookingUrl} />
    </div>
  );
}
