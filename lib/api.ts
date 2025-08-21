import fs from "fs";
import path, { join } from "path";
import { PostInput, PostSchema } from "./zod/post";
import z from "zod";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "content/blog/articles");

function parsePostFile(filePath: string): PostInput | null {
  const contentRaw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(contentRaw);
  const fileName = path.basename(filePath, ".md");
  const postData = {
    ...frontmatter,
    content,
    slug: fileName,
    // Ensure required fields have defaults
    published: frontmatter.published ?? true,
    tags: frontmatter.tags ?? [],
    description: frontmatter.description ?? "",
    image: frontmatter.image ?? "",
  };

  // Validate with Zod schema
  const parsed = PostSchema.safeParse(postData);

  if (!parsed.success) {
    z.treeifyError(parsed.error);
    const errorMessage = `Invalid post data in ${filePath}: ${parsed.error.message}`;
    throw new Error(errorMessage);
  }
  return parsed.data;
}

export function getAllPosts(): PostInput[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts: PostInput[] = fileNames
    .map((fileName) => {
      const filePath = join(postsDirectory, fileName);
      const post = parsePostFile(filePath);
      if (!post) {
        console.warn(
          `Post file ${fileName} is invalid or missing required fields.`
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
  return posts;
}

export function getPostBySlug(slug: string): PostInput | null {
  const filePath = join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Post with slug "${slug}" not found.`);
    return null;
  }
  return parsePostFile(filePath);
}

export function getPostsByTag(tag: string): PostInput[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

// export function getPostsBySeries(seriesName: string): PostInput[] {
//   const allPosts = getAllPosts();
//   return allPosts.filter(
//     (post) => post.series_name && post.series_name === seriesName
//   );
// }

// export function getSeriesPosts(seriesName: string): PostInput[] {
//   const allPosts = getAllPosts();
//   return allPosts
//     .filter((post) => post.series_name === seriesName)
//     .sort((a, b) => a.series_index - b.series_index);
// }
