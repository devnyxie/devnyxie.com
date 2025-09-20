import { getAllArticles } from "@/lib/api/articles";
import PageBreadcrumb from "@/components/layout/breadcrumb";
import RowPost from "@/components/blog/post";
import Link from "next/link";

import { generateMetadata as createMetadata } from "@/lib/metadata";
import { Button } from "@/components/button";

export const metadata = createMetadata({
  title: "Articles",
  description: "Technical articles and tutorials on software development",
});

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
          <Link href="/blog/tags">
            <Button variant={"outline"} size={"md"}>
              <Link href="/blog/tags">Browse Tags</Link>
            </Button>
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
