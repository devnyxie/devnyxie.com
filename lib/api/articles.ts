import fs from "fs";
import path from "path";
import { blogPostSchema, PostInput } from "../types/data/blog";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../content.config";

function parsePostFile(filePath: string): PostInput | null {
  const contentRaw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(contentRaw);
  const fileName = path.basename(filePath, ".md");
  const postData = {
    ...frontmatter,
    content,
    slug: fileName,
    published: frontmatter.published ?? true,
    date: frontmatter.date,
  };

  // Validate with Zod schema
  const parsed = blogPostSchema.safeParse(postData);

  if (!parsed.success) {
    console.log(`Article "${fileName}" failed to parse ❌`);
    const errorDetails = parsed.error.issues
      .map((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join(".") : "root";
        const receivedValue = issue.path.reduce(
          (obj: any, key) => obj?.[key],
          postData
        );
        const receivedType = typeof receivedValue;
        return `  • Field "${fieldPath}": ${issue.message}`;
      })
      .join("\n");
    const errorMessage = `Invalid article data in "${filePath}":\n${errorDetails}`;
    throw new Error(errorMessage);
  } else {
    console.log(`Article "${fileName}" parsed successfully ✅`);
  }

  return parsed.data;
}

export async function getAllArticles(): Promise<PostInput[]> {
  const { content } = getContentConfig();
  const articlesGlob = path.resolve("./content/" + content.articles.source);
  const filePaths = await glob(articlesGlob, { nodir: true });
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
