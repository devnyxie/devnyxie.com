import { getAllArticles } from "./articles";
import { getAllDeepDives } from "./deep-dives";
import { getMentions } from "../mentions";
import { getConfig } from "../../app.config";
import { PostInput, DeepDiveInput } from "../../types/data/blog";
import { MentionItem } from "../../types/data/mentions";

export interface TagInfo {
  name: string;
  count: number;
  articlesCount: number;
  deepDivesCount: number;
  mentionsCount: number;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const { features } = getConfig();
  const articles = await getAllArticles();
  const deepDives = await getAllDeepDives();
  const mentions = features.mentions ? await getMentions() : null;

  const tagCounts = new Map<
    string,
    { articles: number; deepDives: number; mentions: number }
  >();

  // Count tags from articles
  articles.forEach((article) => {
    if (article.tags) {
      article.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || {
          articles: 0,
          deepDives: 0,
          mentions: 0,
        };
        current.articles++;
        tagCounts.set(tag, current);
      });
    }
  });

  // Count tags from deep dives
  deepDives.forEach((deepDive) => {
    if (deepDive.tags) {
      deepDive.tags.forEach((tag) => {
        const current = tagCounts.get(tag) || {
          articles: 0,
          deepDives: 0,
          mentions: 0,
        };
        current.deepDives++;
        tagCounts.set(tag, current);
      });
    }
  });

  // Count tags from mentions (only if feature is enabled)
  if (features.mentions && mentions) {
    mentions.items.forEach((mention) => {
      if (mention.tags) {
        mention.tags.forEach((tag) => {
          const current = tagCounts.get(tag) || {
            articles: 0,
            deepDives: 0,
            mentions: 0,
          };
          current.mentions++;
          tagCounts.set(tag, current);
        });
      }
    });
  }

  const tags: TagInfo[] = Array.from(tagCounts.entries()).map(
    ([name, counts]) => ({
      name,
      count: counts.articles + counts.deepDives + counts.mentions,
      articlesCount: counts.articles,
      deepDivesCount: counts.deepDives,
      mentionsCount: counts.mentions,
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
  mentions: MentionItem[];
  tag: TagInfo | null;
}> {
  const { features } = getConfig();
  const articles = await getAllArticles();
  const deepDives = await getAllDeepDives();
  const mentionsData = features.mentions ? await getMentions() : null;
  const tag = await getTagByName(tagName);

  const filteredArticles = articles.filter(
    (article) => article.tags && article.tags.includes(tagName)
  );

  const filteredDeepDives = deepDives.filter(
    (deepDive) => deepDive.tags && deepDive.tags.includes(tagName)
  );

  const filteredMentions = features.mentions && mentionsData
    ? mentionsData.items.filter(
        (mention) => mention.tags && mention.tags.includes(tagName)
      )
    : [];

  return {
    articles: filteredArticles,
    deepDives: filteredDeepDives,
    mentions: filteredMentions,
    tag,
  };
}
