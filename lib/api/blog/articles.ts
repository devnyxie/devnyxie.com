import fs from "fs";
import { blogPostSchema, PostInput } from "../../types/data/blog";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../../../content.config";
import { getSlug } from "./utils";

function parsePostFile(filePath: string): PostInput | null {
  const contentRaw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(contentRaw);
  const postData = {
    ...frontmatter,
    content,
    slug: getSlug(filePath),
    published: frontmatter.published ?? true,
    date: frontmatter.date,
  };
  const parsed = blogPostSchema.safeParse(postData);
  if (!parsed.success) {
    if (!postData.published) {
      return null;
    }
    const errorMessage = `Error parsing article "${filePath}": ${parsed.error}`;
    throw new Error(errorMessage);
  }
  return parsed.data;
}

export async function getAllArticles(): Promise<PostInput[]> {
  const { content } = getContentConfig();
  const articlesGlob = "./content/" + content.articles.source;
  const filePaths = await glob(articlesGlob, { nodir: true });
  const articles: PostInput[] = filePaths
    .map((filePath) => {
      const post = parsePostFile(filePath);
      return post;
    })
    .filter((post): post is PostInput => post !== null);
  // logger
  // console.log(`Parsed ${articles.length} articles`);
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Connect articles by next and previous (chronological order)
  for (let i = 0; i < articles.length; i++) {
    const currentPost = articles[i];
    if (i + 1 < articles.length) {
      currentPost.previous = {
        title: articles[i + 1].title,
        slug: articles[i + 1].slug,
      };
    }
    if (i - 1 >= 0) {
      currentPost.next = {
        title: articles[i - 1].title,
        slug: articles[i - 1].slug,
      };
    }
  }

  return articles;
}

export async function getArticleBySlug(
  slug: string
): Promise<PostInput | null> {
  const allArticles = await getAllArticles();
  const article = allArticles.find((p) => p.slug === slug);

  if (!article) {
    return null;
  }

  return article;
}

export async function getArticlesByTag(tag: string): Promise<PostInput[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) => article.tags.includes(tag));
}
