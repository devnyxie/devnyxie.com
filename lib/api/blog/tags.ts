import { getAllArticles } from "./articles";
import { PostInput } from "@/velite.config";

export interface TagInfo {
  name: string;
  count: number;
  articlesCount: number;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const articles = await getAllArticles();

  const tagCounts = new Map<
    string,
    { articles: number; }
  >();

  // Count tags from articles
  articles.forEach((article) => {
    if (article.tags) {
      article.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || {
          articles: 0,
        };
        current.articles++;
        tagCounts.set(tag, current);
      });
    }
  });

  const tags: TagInfo[] = Array.from(tagCounts.entries()).map(
    ([name, counts]) => ({
      name,
      count: counts.articles,
      articlesCount: counts.articles,
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
  tag: TagInfo | null;
}> {
  const articles = await getAllArticles();
  const tag = await getTagByName(tagName);

  const filteredArticles = articles.filter(
    (article) => article.tags && article.tags.includes(tagName)
  );

  return {
    articles: filteredArticles,
    tag,
  };
}
