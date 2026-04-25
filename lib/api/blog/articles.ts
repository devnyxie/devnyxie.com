import { PostInput } from "../../types/data/blog";
import { articles as veliteArticles } from "@/.velite";

// Velite serializes Date objects to ISO strings in JSON; re-hydrate them here.
type VeliteArticle = Omit<PostInput, "date"> & { date: string };

export async function getAllArticles(): Promise<PostInput[]> {
  const articles: PostInput[] = (veliteArticles as unknown as VeliteArticle[])
    .filter((a) => a.published)
    .map((a) => ({ ...a, date: new Date(a.date) }));

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
