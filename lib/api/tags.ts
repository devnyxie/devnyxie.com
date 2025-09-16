import { getAllArticles } from "./articles";
import { getAllDeepDives } from "./deep-dives";
import { PostInput, DeepDiveInput } from "../types/data/blog";

export interface TagInfo {
  name: string;
  count: number;
  articlesCount: number;
  deepDivesCount: number;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const articles = await getAllArticles();
  const deepDives = await getAllDeepDives();

  const tagCounts = new Map<string, { articles: number; deepDives: number }>();

  // Count tags from articles
  articles.forEach((article) => {
    if (article.tags) {
      article.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || { articles: 0, deepDives: 0 };
        current.articles++;
        tagCounts.set(tag, current);
      });
    }
  });

  // Count tags from deep dives
  deepDives.forEach((deepDive) => {
    if (deepDive.tags) {
      deepDive.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || { articles: 0, deepDives: 0 };
        current.deepDives++;
        tagCounts.set(tag, current);
      });
    }
  });

  const tags: TagInfo[] = Array.from(tagCounts.entries()).map(
    ([name, counts]) => ({
      name,
      count: counts.articles + counts.deepDives,
      articlesCount: counts.articles,
      deepDivesCount: counts.deepDives,
    })
  );

  // Sort by total count (most popular first)
  tags.sort((a, b) => b.count - a.count);

  return tags;
}

export async function getTagByName(tagName: string): Promise<TagInfo | null> {
  const allTags = await getAllTags();
  return allTags.find((tag) => tag.name === tagName) || null;
}

export async function getAllPostsByTag(tagName: string): Promise<{
  articles: PostInput[];
  deepDives: DeepDiveInput[];
  tag: TagInfo | null;
}> {
  const articles = await getAllArticles();
  const deepDives = await getAllDeepDives();
  const tag = await getTagByName(tagName);

  const filteredArticles = articles.filter(
    (article) => article.tags && article.tags.includes(tagName)
  );

  const filteredDeepDives = deepDives.filter(
    (deepDive) => deepDive.tags && deepDive.tags.includes(tagName)
  );

  return {
    articles: filteredArticles,
    deepDives: filteredDeepDives,
    tag,
  };
}
