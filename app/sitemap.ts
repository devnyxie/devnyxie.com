import { MetadataRoute } from "next";
import {
  getAllArticles,
  getAllDeepDives,
  getAllTags,
} from "@/lib/api/blog/blog";
import { PostInput, DeepDiveInput } from "@/lib/types/data/blog";
import { TagInfo } from "@/lib/api/blog/tags";
import { APP_CONFIG } from "@/lib/app.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.domain;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/self-hosting`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/deep-dives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic routes - Articles
  const articles = await getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map(
    (article: PostInput) => ({
      url: `${baseUrl}/blog/articles/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Dynamic routes - Deep Dives
  const deepDives = await getAllDeepDives();
  const deepDiveRoutes: MetadataRoute.Sitemap = deepDives.map(
    (deepDive: DeepDiveInput) => ({
      url: `${baseUrl}/blog/deep-dives/${deepDive.slug}`,
      lastModified: deepDive.date ? new Date(deepDive.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Dynamic routes - Tags
  const tags = await getAllTags();
  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag: TagInfo) => ({
    url: `${baseUrl}/blog/tags/${tag.name}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...deepDiveRoutes, ...tagRoutes];
}
