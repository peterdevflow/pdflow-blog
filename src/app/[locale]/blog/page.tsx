"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { BlogSkeleton } from "@/components/blog-skeleton";
import { Pagination } from "@/components/pagination";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: number;
  views?: number;
};

type PaginatedResponse = {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginatedResponse | null>(null);
  const locale = useLocale();
  const t = useTranslations("blog");
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postsPerPage = 6; // Show 6 posts per page for better UX

  // Create locale-aware date formatter
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "hu" ? "hu-HU" : "en-US", {
        dateStyle: "medium",
      }),
    [locale]
  );

  useEffect(() => {
    // Fetch posts from the API with pagination
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/posts?locale=${locale}&page=${currentPage}&limit=${postsPerPage}&paginated=true`
        );
        const data: PaginatedResponse = await response.json();
        setAllPosts(data.posts);
        setPagination(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [locale, currentPage, postsPerPage]);

  const allowedTags = useMemo(
    () => ["Actual", "Life", "Projects", "Tech", "Work", "Writing"],
    []
  );

  const allTags = useMemo(() => {
    if (!pagination) return [];
    const tagSet = new Set<string>();
    pagination.posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        // Normalize tag to match allowed tags (case-insensitive)
        const normalizedTag = allowedTags.find(
          (allowed) => allowed.toLowerCase() === tag.toLowerCase()
        );
        if (normalizedTag) {
          tagSet.add(normalizedTag);
        }
      });
    });
    return Array.from(tagSet).sort();
  }, [pagination, allowedTags]);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // First apply tag filter
    if (selectedTag !== "all") {
      posts = posts.filter((post) =>
        post.tags?.some(
          (tag) =>
            allowedTags.find(
              (allowed) => allowed.toLowerCase() === tag.toLowerCase()
            ) === selectedTag
        )
      );
    }

    // Then apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);
        const tagsMatch = post.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return titleMatch || excerptMatch || tagsMatch;
      });
    }

    return posts;
  }, [allPosts, selectedTag, searchQuery, allowedTags]);

  if (loading) {
    return <BlogSkeleton />;
  }

  if (allPosts.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{t("noPosts")}</p>
      </section>
    );
  }
  return (
    <section className="container mx-auto px-6 py-12 max-w-4xl">
      <header className="mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-muted-foreground hover:text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("allPosts")}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? t("noPostsForSearch", { query: searchQuery })
                : t("noPostsForTag")}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary hover:text-primary/80 underline"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>
        ) : (
          filteredPosts.map((post) => (
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
              {post.readingTime && (
                <span className="text-sm text-muted-foreground">
                  • {post.readingTime} {t("readingTime")}
                </span>
              )}
              {post.views !== undefined && post.views > 0 && (
                <span className="text-sm text-muted-foreground">
                  • {post.views} views
                </span>
              )}
              <h2 className="mt-3 text-2xl font-medium leading-tight text-foreground">
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt ? (
                <p className="mt-4 text-base text-muted-foreground">
                  {post.excerpt}
                </p>
              ) : null}
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-primary transition group-hover:text-primary/80"
              >
                {t("readMore")} →
              </Link>
            </article>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          baseUrl={`/${locale}/blog`}
        />
      )}
    </section>
  );
}
