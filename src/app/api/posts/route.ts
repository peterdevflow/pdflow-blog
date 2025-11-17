import { NextResponse } from "next/server";
import { getPostSummaries, getPaginatedPostSummaries } from "@/lib/posts";
import type { Locale } from "@/i18n/request";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = (searchParams.get("locale") as Locale) || "hu";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const paginated = searchParams.get("paginated") === "true";

    // Validate parameters
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    if (paginated) {
      const result = await getPaginatedPostSummaries(locale, page, limit);
      return NextResponse.json(result);
    } else {
      // For backward compatibility, return all posts if paginated=false
      const posts = await getPostSummaries(locale);
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
