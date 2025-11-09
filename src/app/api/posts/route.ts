import { NextResponse } from "next/server";
import { getPostSummaries } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getPostSummaries();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
