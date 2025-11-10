import { NextResponse } from "next/server";
import { getPostSummaries } from "@/lib/posts";
import type { Locale } from "@/i18n/request";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get("locale") as Locale) || "hu";

    const posts = await getPostSummaries(locale);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
