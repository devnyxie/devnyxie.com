import fs from "fs";
import path from "path";
import { DeepDiveInput, deepDiveSchema, PostInput } from "../types/data/blog";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../content.config";

function parsePostFile(filePath: string): DeepDiveInput | null {
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
  const parsed = deepDiveSchema.safeParse(postData);

  if (!parsed.success) {
    console.log(`Deep dive "${fileName}" failed to parse ❌`);
    const errorDetails = parsed.error.issues
      .map((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join(".") : "root";
        const receivedValue = issue.path.reduce((obj: unknown, key) => {
          if (obj && typeof obj === "object" && typeof key === "string") {
            return (obj as Record<string, unknown>)[key];
          }
          return undefined;
        }, postData);
        const receivedType = typeof receivedValue;
        return `  • Field "${fieldPath}": ${issue.message}`;
      })
      .join("\n");
    const errorMessage = `Invalid deep dive data in "${filePath}":\n${errorDetails}`;
    throw new Error(errorMessage);
  } else {
    console.log(`Deep dive "${fileName}" parsed successfully ✅`);
  }

  return parsed.data;
}

export async function getAllDeepDives(): Promise<DeepDiveInput[]> {
  const { content } = getContentConfig();
  const deepDivesGlob = path.resolve("./content/" + content.deep_dives.source);
  const filePaths = await glob(deepDivesGlob, { nodir: true });
  const deepDives: DeepDiveInput[] = filePaths
    .map((filePath) => {
      const post = parsePostFile(filePath);
      if (!post) {
        console.warn(
          `Deep dive file ${filePath} is invalid or missing required fields.`
        );
        return null;
      } else if (!post?.published) {
        console.warn(
          `Skipping unpublished deep dive: ${post.title} (${post.slug})`
        );
        return null;
      }
      return post;
    })
    .filter((post): post is DeepDiveInput => post !== null);
  deepDives.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Connect deep dives by next and previous (chronological order)
  for (let i = 0; i < deepDives.length; i++) {
    const currentPost = deepDives[i];
    if (i + 1 < deepDives.length) {
      currentPost.previous = {
        title: deepDives[i + 1].title,
        slug: deepDives[i + 1].slug,
      };
    }
    if (i - 1 >= 0) {
      currentPost.next = {
        title: deepDives[i - 1].title,
        slug: deepDives[i - 1].slug,
      };
    }
  }

  return deepDives;
}

export async function getDeepDiveBySlug(
  slug: string
): Promise<DeepDiveInput | null> {
  const allDeepDives = await getAllDeepDives();
  const deepDive = allDeepDives.find((p) => p.slug === slug);

  if (!deepDive) {
    console.warn(
      `Deep dive with slug "${slug}" not found in published deep dives.`
    );
    return null;
  }

  return deepDive;
}

export async function getDeepDivesByTag(tag: string): Promise<DeepDiveInput[]> {
  const allDeepDives = await getAllDeepDives();
  return allDeepDives.filter((deepDive) => deepDive.tags.includes(tag));
}
