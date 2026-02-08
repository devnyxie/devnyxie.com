import { getAllArticles } from "@/lib/api/blog/articles";
import { APP_CONFIG } from "@/app.config";

// This makes the route static at build time
export const dynamic = "force-static";

export async function GET() {
  const articles = await getAllArticles();

  // Combine and sort all blog posts by date
  const allPosts = articles
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, APP_CONFIG.rss.maxItems);

  const siteUrl = APP_CONFIG.domain;
  const feedUrl = `${siteUrl}/blog/feed.xml`;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${APP_CONFIG.rss.title}</title>
    <description>${APP_CONFIG.rss.description}</description>
    <link>${siteUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>${APP_CONFIG.rss.language}</language>
    <managingEditor>${APP_CONFIG.email} (${
    APP_CONFIG.rss.authorName
  })</managingEditor>
    <webMaster>${APP_CONFIG.email} (${APP_CONFIG.rss.authorName})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description || ""}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
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
