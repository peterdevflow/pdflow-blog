"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { PostSummary } from "@/lib/posts";

interface HomeContentProps {
  featured: PostSummary[];
  actualPosts: PostSummary[];
  projectPosts: PostSummary[];
}

export function HomeContent({
  featured,
  actualPosts,
  projectPosts,
}: HomeContentProps) {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </header>

        {/* Actual Posts Section */}
        {actualPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {t("actualPosts")}
              </h2>
              <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
                {actualPosts.length}
              </span>
            </div>
            <div className="space-y-6">
              {actualPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative rounded-lg border border-border bg-background p-6 transition hover:border-foreground/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags
                      ?.filter((tag) => tag.toLowerCase() !== "actual")
                      .map((tag) => (
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
                    {new Intl.DateTimeFormat("hu-HU", {
                      dateStyle: "medium",
                    }).format(new Date(post.date))}
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
                    Olvass tovább →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Project Posts Section */}
        {projectPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {t("projectPosts")}
              </h2>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                {projectPosts.length}
              </span>
            </div>
            <div className="space-y-6">
              {projectPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative rounded-lg border border-border bg-background p-6 transition hover:border-foreground/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags
                      ?.filter(
                        (tag) =>
                          tag.toLowerCase() !== "projects" &&
                          tag.toLowerCase() !== "portfolio"
                      )
                      .map((tag) => (
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
                    {new Intl.DateTimeFormat("hu-HU", {
                      dateStyle: "medium",
                    }).format(new Date(post.date))}
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
                    Olvass tovább →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {featured.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              {t("allPosts")}
            </h2>
            <div className="space-y-6">
              {featured.map((post) => (
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
                    {new Intl.DateTimeFormat("hu-HU", {
                      dateStyle: "medium",
                    }).format(new Date(post.date))}
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
                    Olvass tovább →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
