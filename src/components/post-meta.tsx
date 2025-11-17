"use client";

import { useTranslations } from "next-intl";
import { usePostViews } from "@/hooks/use-post-views";

interface PostMetaProps {
  date: string;
  readingTime?: number;
  slug: string;
}

export function PostMeta({ date, readingTime, slug }: PostMetaProps) {
  const t = useTranslations("blog");
  const { views, isLoading } = usePostViews(slug);

  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  return (
    <div className="flex items-center gap-4 text-sm uppercase tracking-wide text-muted-foreground">
      <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      {readingTime && (
        <>
          <span>•</span>
          <span>
            {readingTime} {t("readingTime")}
          </span>
        </>
      )}
      {!isLoading && views > 0 && (
        <>
          <span>•</span>
          <span>{views} views</span>
        </>
      )}
    </div>
  );
}
