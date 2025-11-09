import { getPostSummaries } from "@/lib/posts";
import { HomeContent } from "@/components/home-content";
import type { Locale } from "@/i18n/request";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await getPostSummaries(locale as Locale);
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
