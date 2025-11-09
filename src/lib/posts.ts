import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { cache } from "react";
import type { ReactNode } from "react";
import type { CompileOptions } from "@mdx-js/mdx";
import env from "./env";
import type { Locale } from "../i18n/request";

const POSTS_DIRECTORY = path.join(process.cwd(), "src/content/posts");

type PostFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
};

// Calculate reading time based on word count (average 200 words per minute)
const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingTime?: number; // in minutes
};

export type Post = PostSummary & {
  content: ReactNode;
  readingTime?: number; // in minutes
};

type MdOptions = Omit<CompileOptions, "outputFormat" | "providerImportSource">;

const mdxOptions: MdOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"],
          ariaLabel: "Link to section",
        },
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
      },
    ],
  ],
};

const ensureFrontmatter = (
  frontmatter: Record<string, unknown>
): PostFrontmatter => {
  const { title, date, excerpt, tags } = frontmatter;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Missing required `title` in post frontmatter.");
  }

  if (typeof date !== "string" || date.length === 0) {
    throw new Error(`Missing required \`date\` for post "${title}".`);
  }

  if (excerpt !== undefined && typeof excerpt !== "string") {
    throw new Error(`Invalid \`excerpt\` value for post "${title}".`);
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    throw new Error(`Invalid \`tags\` value for post "${title}".`);
  }

  return {
    title,
    date,
    excerpt,
    tags: Array.isArray(tags)
      ? (tags.filter((tag) => typeof tag === "string") as string[])
      : undefined,
  };
};

const readPostFile = async (slug: string, localeDirectory?: string) => {
  const directory = localeDirectory || POSTS_DIRECTORY;
  const filePath = path.join(directory, `${slug}.mdx`);
  const file = await fs.readFile(filePath, "utf8");
  return file;
};

export const getPostSummaries = cache(
  async (locale: Locale = "hu"): Promise<PostSummary[]> => {
    const localeDirectory = path.join(POSTS_DIRECTORY, locale);
    const entries = await fs.readdir(localeDirectory, { withFileTypes: true });
    const mdxFiles = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".mdx")
    );

    const posts = await Promise.all(
      mdxFiles.map(async (entry) => {
        const slug = entry.name.replace(/\.mdx$/, "");
        const file = await fs.readFile(
          path.join(localeDirectory, entry.name),
          "utf8"
        );
        const { data, content } = matter(file);
        const frontmatter = ensureFrontmatter(data);
        const readingTime = calculateReadingTime(content);

        return {
          slug,
          ...frontmatter,
          readingTime,
        };
      })
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
);

export const getPostBySlug = cache(
  async (slug: string, locale: Locale = "hu"): Promise<Post | null> => {
    try {
      const localeDirectory = path.join(POSTS_DIRECTORY, locale);
      const source = await readPostFile(slug, localeDirectory);
      const { content, frontmatter } = await compileMDX<PostFrontmatter>({
        source,
        options: {
          parseFrontmatter: true,
          mdxOptions,
        },
      });

      const validatedFrontmatter = ensureFrontmatter(frontmatter);
      const readingTime = calculateReadingTime(source);

      return {
        slug,
        ...validatedFrontmatter,
        content,
        readingTime,
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      throw error;
    }
  }
);

export const getAllPostSlugs = cache(
  async (locale: Locale = "hu"): Promise<string[]> => {
    const posts = await getPostSummaries(locale);
    return posts.map((post) => post.slug);
  }
);

export const getRelatedPosts = cache(
  async (
    currentPost: PostSummary,
    locale: Locale = "hu",
    limit: number = 3
  ): Promise<PostSummary[]> => {
    const allPosts = await getPostSummaries(locale);

    // Filter out the current post and calculate relevance score based on shared tags
    const relatedPosts = allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .map((post) => {
        const sharedTags =
          post.tags?.filter((tag) =>
            currentPost.tags?.some(
              (currentTag) => currentTag.toLowerCase() === tag.toLowerCase()
            )
          ) || [];

        return {
          ...post,
          relevanceScore: sharedTags.length,
        };
      })
      .filter((post) => post.relevanceScore > 0) // Only include posts with shared tags
      .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
      .slice(0, limit); // Limit the number of results

    return relatedPosts;
  }
);

export const generateRSSFeed = cache(
  async (locale: Locale = "hu"): Promise<string> => {
    const posts = await getPostSummaries(locale);
    const baseUrl = env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

    const languageMap = {
      hu: "hu-hu",
      en: "en-us",
    };

    const rssItems = posts
      .map((post) => {
        const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;
        const pubDate = new Date(post.date).toUTCString();
        const tags =
          post.tags?.map((tag) => `<category>${tag}</category>`).join("") || "";

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${
        post.excerpt
          ? `<description><![CDATA[${post.excerpt}]]></description>`
          : ""
      }
      ${tags}
      <author>hhpeter@your-domain.com (Your Name)</author>
    </item>`;
      })
      .join("");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Blog${locale === "hu" ? "" : " - English"}</title>
    <description>${
      locale === "hu"
        ? "Személyes blog technológiáról, életről és projektekről"
        : "Personal blog about technology, life, and projects"
    }</description>
    <link>${baseUrl}/${locale}</link>
    <atom:link href="${baseUrl}/${locale}/feed.xml" rel="self" type="application/rss+xml" />
    <language>${languageMap[locale]}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js Blog</generator>
    ${rssItems}
  </channel>
</rss>`;

    return rssFeed.trim();
  }
);
