import { getPostSummaries } from "@/lib/posts";
import { HomeContent } from "@/components/home-content";
import type { Locale } from "@/i18n/request";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  const posts = await getPostSummaries(locale);
  const featured = posts.slice(0, 3);
  const actualPosts = posts.filter((post) =>
    post.tags?.some((tag) => tag.toLowerCase() === "actual")
  );
  const projectPosts = posts.filter((post) =>
    post.tags?.some(
      (tag) =>
        tag.toLowerCase() === "projects" || tag.toLowerCase() === "portfolio"
    )
  );

  return (
    <HomeContent
      featured={featured}
      actualPosts={actualPosts}
      projectPosts={projectPosts}
    />
  );
}
