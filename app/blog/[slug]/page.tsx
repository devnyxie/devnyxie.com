import { getPostBySlug, getAllPosts } from "@/lib/api/blog";
import { notFound } from "next/navigation";
import parseMarkdown from "@/lib/utils/markdown_parser";
import { formatDate } from "@/lib/utils";
import "../../assets/md.css";
import Surround from "@/components/blog/surround";
import Tag from "@/components/blog/tag";

export async function generateStaticParams() {
  const posts = await getAllPosts();
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
  const post = await getPostBySlug(slug);

  console.log(post);

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
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const content = await parseMarkdown(post.content);

  return (
    <article className="flex flex-col">
      <div className="mb-4 gap-4 flex flex-col items-center">
        {post.image && (
          <img
            src={post.image}
            className="w-full rounded aspect-video object-cover"
          />
        )}

        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-medium mb-2">{post.title}</h1>
          <div className="flex gap-2 text-sm">
            <p className="text-muted-foreground">{formatDate(post.date)}</p>
            <div className="flex-1 my-0.5 w-[1px] bg-muted" />
            <p className="text-muted-foreground">{post.readTime} min read</p>
          </div>
        </div>
        <div className="tags flex flex-wrap gap-1 mt-auto">
          {post.tags &&
            post.tags.length > 0 &&
            post.tags.map((tag, idx) => (
              <Tag
                key={`${tag}-${idx}`}
                name={tag}
                path={`/blog/tags/${tag}`}
                size="sm"
                variant="subtle"
              />
            ))}
        </div>
        <Surround post={post} />
        {/* <PostTags tags={post.tags || []} /> */}
      </div>
      <div
        className="markdown content-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
