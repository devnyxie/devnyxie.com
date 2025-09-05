import { getPostBySlug, getAllPosts } from "@/lib/api/blog";
import { getAllArticles, getArticleBySlug } from "@/lib/api/articles";
import { getAllDeepDives, getDeepDiveBySlug } from "@/lib/api/deep-dives";
import { notFound } from "next/navigation";
import parseMarkdown from "@/lib/utils/markdown_parser";
import { formatDate } from "@/lib/utils";
import "../../assets/md.css";
import Surround from "@/components/blog/surround";
import Tag from "@/components/blog/tag/tag";
import { PostInput, DeepDiveInput } from "@/lib/types/data/blog";
import { Button } from "@/components/button";

export async function generateStaticParams() {
  const [articles, deepDives] = await Promise.all([
    getAllArticles(),
    getAllDeepDives(),
  ]);

  return [
    ...articles.map((article) => ({
      slug: article.slug,
    })),
    ...deepDives.map((deepDive) => ({
      slug: deepDive.slug,
    })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try to find the content in both articles and deep dives
  const [article, deepDive] = await Promise.all([
    getArticleBySlug(slug),
    getDeepDiveBySlug(slug),
  ]);

  const post = article || deepDive;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.toISOString(),
      images: (post as PostInput).image
        ? [{ url: (post as PostInput).image }]
        : [],
    },
  };
}

// Article rendering component
function ArticleRenderer({
  article,
  content,
}: {
  article: PostInput;
  content: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="mb-4 gap-4 flex flex-col items-center">
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
        <Surround post={article} />
      </div>
      <div
        className="markdown content-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

// Deep dive rendering component
function DeepDiveRenderer({
  deepDive,
  content,
}: {
  deepDive: DeepDiveInput;
  content: string;
}) {
  return (
    <article className="flex flex-col">
      <div className="mb-4 gap-4 flex flex-col items-center">
        {/* {deepDive.icon && (
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-2xl">
            {deepDive.icon}
          </div>
        )} */}
        <img
          src={deepDive.icon}
          alt={deepDive.title}
          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
        />

        <div className="w-full flex flex-col items-center justify-center">
          {/* <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-accent/50 text-primary text-xs font-medium rounded">
              Deep Dive
            </span>
          </div> */}
          <h1 className="text-4xl font-medium mb-2">{deepDive.title}</h1>
          <div className="flex gap-2 text-sm">
            <p className="text-muted-foreground">{formatDate(deepDive.date)}</p>
            <div className="flex-1 my-0.5 w-[1px] bg-muted" />
            <p className="text-muted-foreground">
              {deepDive.readTime} min read
            </p>
          </div>
        </div>
        <div className="tags flex flex-wrap gap-1 mt-auto">
          {deepDive.tags &&
            deepDive.tags.length > 0 &&
            deepDive.tags.map((tag, idx) => (
              <Tag
                key={`${tag}-${idx}`}
                name={tag}
                path={`/blog/tags/${tag}`}
                variant="subtle"
              />
            ))}
        </div>
        <Surround post={deepDive as any} />
      </div>
      <div
        className="markdown content-body deep-dive"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  // Try to find the content in both articles and deep dives
  const [article, deepDive] = await Promise.all([
    getArticleBySlug(slug),
    getDeepDiveBySlug(slug),
  ]);

  const post = article || deepDive;
  if (!post) {
    notFound();
  }

  const content = await parseMarkdown(post.content);

  // Render based on content type
  if (article) {
    return <ArticleRenderer article={article} content={content} />;
  } else if (deepDive) {
    return <DeepDiveRenderer deepDive={deepDive} content={content} />;
  }

  return notFound();
}
