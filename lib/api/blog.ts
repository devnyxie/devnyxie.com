import fs from "fs";
import path, { join } from "path";
import { blogPostSchema, PostInput } from "../types/data/blog";
import z from "zod";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../content.config";

// const postsDirectory = join(process.cwd(), "content/blog/articles");

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
    console.log(`Post "${fileName}" failed to parse ❌`);
    const errorDetails = parsed.error.issues
      .map((issue) => `${issue.message}`)
      .join("\n");
    const errorMessage = `Invalid post data in "${filePath}":\n${errorDetails}`;
    throw new Error(errorMessage);
  } else {
    console.log(`Post "${fileName}" parsed successfully ✅`);
  }

  return parsed.data;
}

export async function getAllPosts(): Promise<PostInput[]> {
  const { content } = getContentConfig();
  const articlesGlob = path.resolve("./content/" + content.articles.source);
  const filePaths = await glob(articlesGlob, { nodir: true });
  const posts: PostInput[] = filePaths
    .map((filePath) => {
      const post = parsePostFile(filePath);
      if (!post) {
        console.warn(
          `Post file ${filePath} is invalid or missing required fields.`
        );
        return null;
      } else if (!post?.published) {
        console.warn(`Skipping unpublished post: ${post.title} (${post.slug})`);
        return null;
      }
      return post;
    })
    .filter((post): post is PostInput => post !== null);
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Connect posts by next and previous (chronological order)
  for (let i = 0; i < posts.length; i++) {
    const currentPost = posts[i];
    if (i + 1 < posts.length) {
      currentPost.previous = {
        title: posts[i + 1].title,
        slug: posts[i + 1].slug,
      };
    }
    if (i - 1 >= 0) {
      currentPost.next = {
        title: posts[i - 1].title,
        slug: posts[i - 1].slug,
      };
    }
  }

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostInput | null> {
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    console.warn(`Post with slug "${slug}" not found in published posts.`);
    return null;
  }

  if (!post) {
    console.warn(`Post with slug "${slug}" not found in published posts.`);
    return null;
  }

  return post;
}

export async function getPostsByTag(tag: string): Promise<PostInput[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}
