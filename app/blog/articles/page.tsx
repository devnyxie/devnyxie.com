import { getAllArticles } from "@/lib/api/articles";
import PageBreadcrumb from "@/components/breadcrumb";
import RowPost from "@/components/blog/post";
import Link from "next/link";

export const metadata = {
  title: "Articles",
  description: "Technical articles and tutorials",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <PageBreadcrumb />
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">Articles</h1>
          <p className="text-muted-foreground text-lg">
            Technical articles and tutorials
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/blog/tags"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Browse Tags
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <RowPost key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
