import { getPostBySlug, getAllPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import parseMarkdown from "@/lib/md_html";
import { formatDate } from "@/lib/utils";
import "../../assets/md.css";
import { Button } from "@/components/shadcn/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
      images: post.image ? [{ url: post.image }] : [],
    },
  };
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
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await parseMarkdown(post.content);

  return (
    <article className="flex flex-col">
      <div className="mb-4 gap-4 flex flex-col items-center">
        <img
          src={post.image}
          className="w-full rounded aspect-video object-cover"
        />
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-medium mb-2">{post.title}</h1>
          <div className="flex gap-2 text-sm">
            <p className="text-muted-foreground">{formatDate(post.date)}</p>
            <div className="flex-1 my-0.5 w-[1px] bg-muted" />
            <p className="text-muted-foreground">{post.readTime} min read</p>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <Button
            variant="outline"
            className="flex-1 justify-start h-max rounded p-0"
            disabled={post.previous ? false : true}
          >
            <Link
              href={post.previous ? `/blog/${post.previous.slug}` : ""}
              className="flex items-center gap-4 flex w-full px-4 py-2"
            >
              <ChevronLeft
                className={post.previous ? "" : "text-muted-foreground"}
              />
              <div className="flex flex-col items-start">
                <div className="text-muted-foreground">Previous Post</div>
                {post.previous ? (
                  <div className="">{post.previous.title}</div>
                ) : (
                  <div className="text-muted-foreground">
                    {`You're at the oldest post!`}
                  </div>
                )}
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex h-max rounded p-0"
            disabled={post.next ? false : true}
          >
            <Link
              href={post.next ? `/blog/${post.next.slug}` : ""}
              className="flex items-center gap-4 w-full justify-end px-4 py-2"
            >
              <div className="flex flex-col items-end">
                <div className="text-muted-foreground">Next Post</div>
                {post.next ? (
                  <div className="">{post.next.title}</div>
                ) : (
                  <div className="text-muted-foreground">
                    {`You're at the newest post!`}
                  </div>
                )}
              </div>
              <ChevronRight
                className={post.next ? "" : "text-muted-foreground"}
              />
            </Link>
          </Button>
        </div>

        {/* <PostTags tags={post.tags || []} /> */}
      </div>
      <div
        className="markdown content-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
