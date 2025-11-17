import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import type { PostSummary } from "@/lib/posts";

interface RelatedPostsProps {
  posts: PostSummary[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const t = useTranslations("blog");
  const locale = useLocale();

  // Create locale-aware date formatter
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "hu" ? "hu-HU" : "en-US", {
        dateStyle: "medium",
      }),
    [locale]
  );

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-semibold text-foreground mb-8">
        {t("relatedPosts")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative rounded-lg border border-border bg-background p-6 transition hover:border-foreground/40 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <time
              className="text-sm uppercase tracking-wide text-muted-foreground"
              dateTime={post.date}
            >
              {dateFormatter.format(new Date(post.date))}
            </time>
            <h3 className="mt-3 text-lg font-medium leading-tight text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                {post.title}
              </Link>
            </h3>
            {post.excerpt && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex items-center text-sm font-medium text-primary transition group-hover:text-primary/80"
            >
              {t("readMore")} →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
