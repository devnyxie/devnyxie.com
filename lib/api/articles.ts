import fs from "fs";
import path from "path";
import { blogPostSchema, PostInput } from "../types/data/blog";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../content.config";

function parsePostFile(filePath: string): PostInput | null {
  const fileName = path.basename(filePath, ".md");
  const contentRaw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(contentRaw);
  const postData = {
    ...frontmatter,
    content,
    slug: fileName,
    published: frontmatter.published ?? true,
    date: frontmatter.date,
  };

  const parsed = blogPostSchema.safeParse(postData);
  if (!parsed.success) {
    const errorMessage = `Error parsing article "${fileName}": ${parsed.error}`;
    throw new Error(errorMessage);
  } else {
    console.log(`Article "${fileName}" parsed successfully ✅`);
  }
  return parsed.data;
}

export async function getAllArticles(): Promise<PostInput[]> {
  const { content } = getContentConfig();
  const articlesGlob = "./content/" + content.articles.source;
  console.log(`Searching for article files in: ${articlesGlob}`);
  const filePaths = await glob(articlesGlob, { nodir: true });
  console.log(`Found ${filePaths.length} article files.`);
  const articles: PostInput[] = filePaths
    .map((filePath) => {
      const post = parsePostFile(filePath);
      if (!post) {
        console.warn(
          `Article file ${filePath} is invalid or missing required fields.`
        );
        return null;
      } else if (!post?.published) {
        console.warn(
          `Skipping unpublished article: ${post.title} (${post.slug})`
        );
        return null;
      }
      return post;
    })
    .filter((post): post is PostInput => post !== null);
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
    console.warn(
      `Article with slug "${slug}" not found in published articles.`
    );
    return null;
  }

  return article;
}

export async function getArticlesByTag(tag: string): Promise<PostInput[]> {
  const allArticles = await getAllArticles();
  return allArticles.filter((article) => article.tags.includes(tag));
}
