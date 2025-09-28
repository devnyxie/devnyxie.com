import fs from "fs";
import { DeepDiveInput, deepDiveSchema } from "../../types/data/blog";
import matter from "gray-matter";
import { glob } from "glob";
import { getContentConfig } from "../../content.config";
import { getSlug } from "./utils";

function parsePostFile(filePath: string): DeepDiveInput | null {
  const contentRaw = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(contentRaw);
  const postData = {
    ...frontmatter,
    content,
    slug: getSlug(filePath),
    published: frontmatter.published ?? true,
    date: frontmatter.date,
  };

  const parsed = deepDiveSchema.safeParse(postData);

  if (!parsed.success) {
    if (!postData.published) {
      return null;
    }
    const errorMessage = `Error parsing deep dive "${filePath}": ${parsed.error}`;
    throw new Error(errorMessage);
  }

  return parsed.data;
}

export async function getAllDeepDives(): Promise<DeepDiveInput[]> {
  const { content } = getContentConfig();
  const deepDivesGlob = "./content/" + content.deep_dives.source;
  const filePaths = await glob(deepDivesGlob, { nodir: true });
  const deepDives: DeepDiveInput[] = filePaths
    .map((filePath) => {
      const post = parsePostFile(filePath);
      return post;
    })
    .filter((post): post is DeepDiveInput => post !== null);
  // logger
  // console.log(`Parsed ${deepDives.length} deep dives`);
  deepDives.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
    return null;
  }

  return deepDive;
}

export async function getDeepDivesByTag(tag: string): Promise<DeepDiveInput[]> {
  const allDeepDives = await getAllDeepDives();
  return allDeepDives.filter((deepDive) => deepDive.tags.includes(tag));
}
