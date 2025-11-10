import { generateRSSFeed } from "@/lib/posts";
import { NextResponse } from "next/server";
import type { Locale } from "@/i18n/request";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") || "hu") as Locale;

  try {
    const rssFeed = await generateRSSFeed(locale);

    return new NextResponse(rssFeed, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}