import { getAllArticles } from "@/lib/api/articles";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Tag from "@/components/blog/tag/tag";
import PageBreadcrumb from "@/components/breadcrumb";

export const metadata = {
  title: "Articles",
  description: "Technical articles and tutorials",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <PageBreadcrumb />
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Articles</h1>
        <p className="text-muted-foreground text-lg">
          Technical articles and tutorials
        </p>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-4">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <div className="flex flex-col gap-2">
                <Link
                  href={`/articles/${article.slug}`}
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>

                <p className="text-muted-foreground line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(article.date)}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, idx) => (
                      <Tag
                        key={`${tag}-${idx}`}
                        name={tag}
                        path={`/blog/tags/${tag}`}
                        variant="subtle"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
