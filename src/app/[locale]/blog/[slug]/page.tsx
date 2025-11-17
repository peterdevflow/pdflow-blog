import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import type { Locale } from "@/i18n/request";
import { ReadingProgress } from "@/components/reading-progress";
import { SocialShare } from "@/components/social-share";
import { RelatedPosts } from "@/components/related-posts";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export async function generateStaticParams() {
  const locales = ["hu", "en"] as const;
  const allParams: { slug: string; locale: string }[] = [];

  for (const locale of locales) {
    const slugs = await getAllPostSlugs(locale);
    allParams.push(...slugs.map((slug) => ({ slug, locale })));
  }

  return allParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as Locale);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "My Blog",
      type: "article",
      publishedTime: post.date,
      authors: ["Your Name"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@yourusername",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, locale as Locale, 3);

  console.log("Post reading time:", post.readingTime); // Debug log

  return (
    <>
      <ReadingProgress />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          ← Back to posts
        </Link>
        <header className="mt-6">
          <div className="flex items-center gap-4 text-sm uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date))}
            </time>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime} perc olvasás</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-snug text-foreground">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <article className="mt-10 text-base leading-7 text-foreground">
          <div className="space-y-6 [&>h2]:mt-12 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:leading-tight [&>h3]:mt-10 [&>h3]:text-2xl [&>h3]:font-semibold [&>p]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:font-mono [&_strong]:text-foreground [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic">
            {post.content}
          </div>
        </article>

        <SocialShare
          title={post.title}
          url={`/blog/${post.slug}`}
          description={post.excerpt}
        />

        <RelatedPosts posts={relatedPosts} />
      </section>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: {
              "@type": "Person",
              name: "Your Name",
            },
            publisher: {
              "@type": "Person",
              name: "Your Name",
            },
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${
                process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"
              }/blog/${post.slug}`,
            },
            keywords: post.tags?.join(", "),
            articleSection: post.tags?.[0] || "Blog",
            timeRequired: `PT${post.readingTime}M`,
          }),
        }}
      />
    </>
  );
}
