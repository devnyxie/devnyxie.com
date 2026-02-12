import { NextRequest, NextResponse } from "next/server";
import { getAllArticles } from "@/lib/api/blog/articles";
import { getAllPortfolioItems } from "@/lib/api/portfolio/portfolio";
import { getPageData } from "@/lib/api/pages";

export const dynamic = "force-dynamic";

export interface SearchResult {
  type: "article" | "portfolio" | "page";
  title: string;
  slug: string;
  url: string;
  excerpt: string;
  matchedContent?: string;
  date?: string;
}

function extractExcerpt(content: string, query: string, maxLength = 150): string {
  if (!content) return "";
  
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) {
    // If no match, return the beginning
    return content.slice(0, maxLength).trim() + "...";
  }
  
  // Get context around the match
  const start = Math.max(0, index - 60);
  const end = Math.min(content.length, index + query.length + 90);
  
  let excerpt = content.slice(start, end).trim();
  if (start > 0) excerpt = "..." + excerpt;
  if (end < content.length) excerpt = excerpt + "...";
  
  return excerpt;
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '**$1**');
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search articles
    const articles = await getAllArticles();
    for (const article of articles) {
      const titleMatch = article.title.toLowerCase().includes(lowerQuery);
      const contentMatch = article.content?.toLowerCase().includes(lowerQuery);
      const descriptionMatch = article.description?.toLowerCase().includes(lowerQuery);

      if (titleMatch || contentMatch || descriptionMatch) {
        const excerpt = extractExcerpt(
          article.content || article.description || "",
          query
        );
        
        results.push({
          type: "article",
          title: article.title,
          slug: article.slug,
          url: `/blog/${article.slug}`,
          excerpt: highlightMatch(excerpt, query),
          matchedContent: contentMatch ? highlightMatch(excerpt, query) : undefined,
          date: new Date(article.date).toISOString(),
        });
      }
    }

    // Search portfolio items
    const portfolioItems = await getAllPortfolioItems();
    for (const item of portfolioItems) {
      if (!item.public || !item.slug) continue;
      
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descriptionMatch = item.description?.toLowerCase().includes(lowerQuery);

      if (titleMatch || descriptionMatch) {
        const excerpt = extractExcerpt(
          item.description || "",
          query
        );

        results.push({
          type: "portfolio",
          title: item.title,
          slug: item.slug,
          url: `/portfolio#${item.slug}`,
          excerpt: highlightMatch(excerpt, query),
          matchedContent: descriptionMatch ? highlightMatch(excerpt, query) : undefined,
          date: item.date.toISOString(),
        });
      }
    }

    // Search content pages
    const contentPages = ["about", "now", "self-hosting"];
    for (const pageName of contentPages) {
      try {
        const pageData = getPageData(pageName);
        const titleMatch = pageData.title?.toLowerCase().includes(lowerQuery);
        const contentMatch = pageData.content?.toLowerCase().includes(lowerQuery);

        if (titleMatch || contentMatch) {
          const excerpt = extractExcerpt(pageData.content || "", query);
          
          results.push({
            type: "page",
            title: pageData.title || pageName,
            slug: pageName,
            url: `/${pageName}`,
            excerpt: highlightMatch(excerpt, query),
            matchedContent: contentMatch ? highlightMatch(excerpt, query) : undefined,
          });
        }
      } catch (error) {
        // Skip if page doesn't exist or can't be parsed
        console.error(`Error parsing page ${pageName}:`, error);
      }
    }

    // Sort results: exact title matches first, then by date
    results.sort((a, b) => {
      const aExactTitle = a.title.toLowerCase() === lowerQuery;
      const bExactTitle = b.title.toLowerCase() === lowerQuery;
      
      if (aExactTitle && !bExactTitle) return -1;
      if (!aExactTitle && bExactTitle) return 1;
      
      // Sort by date if available
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      
      return 0;
    });

    return NextResponse.json({ results: results.slice(0, 50) }); // Limit to 50 results
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
