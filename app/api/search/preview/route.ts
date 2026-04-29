import { NextRequest, NextResponse } from "next/server";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { articles as veliteArticles } from "@/.velite";
import { getAllPortfolioItems } from "@/lib/api/portfolio/portfolio";
import { getPageData } from "@/lib/api/pages";

export const dynamic = "force-dynamic";

const SLUG_REGEX = /^[a-zA-Z0-9_-]+$/;
const VALID_TYPES = ["article", "portfolio", "page"] as const;
type PreviewType = (typeof VALID_TYPES)[number];

async function compileSource(source: string): Promise<string> {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm, remarkBreaks],
  });
  return String(compiled);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const rawType = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!rawType || !(VALID_TYPES as readonly string[]).includes(rawType)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  const previewType = rawType as PreviewType;

  if (!slug || !SLUG_REGEX.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    if (previewType === "article") {
      type VeliteArticle = { slug: string; code: string; published: boolean };
      const article = (veliteArticles as unknown as VeliteArticle[]).find(
        (a) => a.slug === slug && a.published,
      );
      if (!article) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ code: article.code });
    }

    if (previewType === "portfolio") {
      const items = await getAllPortfolioItems();
      const item = items.find((i) => i.slug === slug && i.public);
      if (!item?.description) {
        return NextResponse.json({ code: "" });
      }
      const code = await compileSource(item.description);
      return NextResponse.json({ code });
    }

    if (previewType === "page") {
      const pageData = getPageData(slug);
      if (!pageData?.content) {
        return NextResponse.json({ code: "" });
      }
      const code = await compileSource(pageData.content as string);
      return NextResponse.json({ code });
    }

    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview" },
      { status: 500 },
    );
  }
}
