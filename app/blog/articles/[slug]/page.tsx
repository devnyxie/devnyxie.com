import { getAllArticles, getArticleBySlug } from "@/lib/api/articles";
import { notFound } from "next/navigation";
import MDXContent from "@/components/mdx-content";
import { formatDate } from "@/lib/utils";
import "@/app/assets/md.css";
import Surround from "@/components/blog/surround";
import Tag from "@/components/blog/tag/tag";
import PageBreadcrumb from "@/components/layout/breadcrumb";
import { generateMetadata as createMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    type: "article",
    publishedTime: article.date.toISOString(),
    image: article.image || undefined,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="flex flex-col">
      <PageBreadcrumb pageTitle={article.title} />
      <div className="gap-4 flex flex-col items-center">
        {article.image && (
          <img
            src={article.image}
            className="w-full rounded aspect-video object-cover"
            alt={article.title}
          />
        )}

        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-medium mb-2">{article.title}</h1>
          <div className="flex gap-2 text-sm">
            <p className="text-muted-foreground">{formatDate(article.date)}</p>
            <div className="flex-1 my-0.5 w-[1px] bg-muted" />
            <p className="text-muted-foreground">{article.readTime} min read</p>
          </div>
        </div>
        <div className="tags flex flex-wrap gap-1 mt-auto">
          {article.tags &&
            article.tags.length > 0 &&
            article.tags.map((tag, idx) => (
              <Tag
                key={`${tag}-${idx}`}
                name={tag}
                path={`/blog/tags/${tag}`}
                variant="subtle"
              />
            ))}
        </div>
        <Surround post={article} contentType="articles" />
      </div>
      <div className="markdown content-body mt-4 mb-4">
        <MDXContent source={article.content} />
      </div>
      <Surround post={article} contentType="articles" />
    </article>
  );
}
