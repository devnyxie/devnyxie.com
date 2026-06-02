import { getAllArticles, getArticleBySlug } from "@/lib/api/blog/articles";
import { notFound } from "next/navigation";
import MDXContent from "@/app/components/mdx-content";
import "@/app/assets/md.css";
import Surround from "@/app/components/blog/shared/surround";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import { generateMetadata as createMetadata } from "@/metadata";
import IntroSection from "@/app/components/blog/shared/introSection";
import TableOfContents from "@/app/components/blog/shared/tableOfContents-v2";

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
    <div className="flex flex-col w-full md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,var(--breakpoint-md))_minmax(0,1fr)]">
      <div className="col-start-2">
        <PageBreadcrumb pageTitle={article.title} />
      </div>

      <div className="col-start-2 mt-6">
        <IntroSection {...article} />
      </div>

      <div className="col-start-2 mt-6 mb-6">
        <hr />
      </div>
      <div className="content-body prose col-start-2 relative mb-16">
        <MDXContent code={article.code} />
      </div>

      <TableOfContents toc={article.toc} />

      <div className="col-start-2 mb-12">
        <Surround post={article} />
      </div>
    </div>
  );
}
