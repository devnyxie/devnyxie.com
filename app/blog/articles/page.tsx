import { getAllArticles } from "@/lib/api/articles";
import PageBreadcrumb from "@/components/breadcrumb";
import RowPost from "@/components/blog/post";

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
          <RowPost key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
