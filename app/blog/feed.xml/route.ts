import { getAllArticles } from "@/lib/api/articles";
import { getAllDeepDives } from "@/lib/api/deep-dives";
import { APP_CONFIG } from "@/lib/app.config";

// This makes the route static at build time
export const dynamic = "force-static";

export async function GET() {
  const articles = await getAllArticles();
  const deepDives = await getAllDeepDives();

  // Add type to distinguish between articles and deep dives
  const articlesWithType = articles.map((post) => ({
    ...post,
    type: "article" as const,
  }));
  const deepDivesWithType = deepDives.map((post) => ({
    ...post,
    type: "deep-dive" as const,
  }));

  // Combine and sort all blog posts by date
  const allPosts = [...articlesWithType, ...deepDivesWithType]
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20); // Limit to most recent 20 posts

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devnyxie.com";
  const feedUrl = `${siteUrl}/blog/feed.xml`;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tim Afanasiev - Blog</title>
    <description>Passionate about crafting elegant solutions and building impactful software. Based in Warsaw, available for both Frontend and Backend projects worldwide.</description>
    <link>${siteUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>en</language>
    <managingEditor>${APP_CONFIG.email} (Tim Afanasiev)</managingEditor>
    <webMaster>${APP_CONFIG.email} (Tim Afanasiev)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ""}]]></description>
      <link>${siteUrl}/blog/${
          post.type === "deep-dive" ? "deep-dives" : "articles"
        }/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${
          post.type === "deep-dive" ? "deep-dives" : "articles"
        }/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${
        post.tags
          ? post.tags
              .map((tag) => `<category>${tag}</category>`)
              .join("\n      ")
          : ""
      }
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
