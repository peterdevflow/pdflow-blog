import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json");

// Ensure views file exists
async function ensureViewsFile() {
  try {
    await fs.access(VIEWS_FILE);
  } catch {
    // Create data directory and views file if they don't exist
    await fs.mkdir(path.dirname(VIEWS_FILE), { recursive: true });
    await fs.writeFile(VIEWS_FILE, JSON.stringify({}, null, 2));
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter required" },
        { status: 400 }
      );
    }

    await ensureViewsFile();
    const viewsData = JSON.parse(await fs.readFile(VIEWS_FILE, "utf8"));
    const views = viewsData[slug] || 0;

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Error getting post views:", error);
    return NextResponse.json({ error: "Failed to get views" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter required" },
        { status: 400 }
      );
    }

    await ensureViewsFile();
    const viewsData = JSON.parse(await fs.readFile(VIEWS_FILE, "utf8"));

    // Increment views
    viewsData[slug] = (viewsData[slug] || 0) + 1;

    // Write back to file
    await fs.writeFile(VIEWS_FILE, JSON.stringify(viewsData, null, 2));

    return NextResponse.json({ views: viewsData[slug] });
  } catch (error) {
    console.error("Error incrementing post views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}
