import { getAllPostsByTag, getAllTags } from "@/lib/api/blog/tags";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import BlogPost from "@/app/components/blog/BlogPost";
import Tag from "@/app/components/blog/shared/tag/tag";
import Heading from "@/app/components/heading";
import Gaps from "@/app/components/layout/gaps";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as createMetadata } from "@/metadata";
import { getConfig } from "@/app.config";
import Container from "@/app/components/layout/container";
import List from "@/app/components/layout/list";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag: tagParam } = await params;
  const tagName = decodeURIComponent(tagParam);
  const { tag } = await getAllPostsByTag(tagName);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return createMetadata({
    title: `#${tagName}`,
    description: `Posts tagged with ${tagName} - ${tag.count} post${
      tag.count !== 1 ? "s" : ""
    } found`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagParam } = await params;
  const tagName = decodeURIComponent(tagParam);
  const { articles, tag } = await getAllPostsByTag(
    tagName
  );

  if (!tag) {
    notFound();
  }

  const totalPosts = articles.length;
  return (
    <Container>
      <PageBreadcrumb />
      <Gaps>
        <div id="section" className="gap-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Tag name={tagName} variant="default" />
                <span className="text-muted-foreground">
                  {totalPosts} post{totalPosts !== 1 ? "s" : ""}
                </span>
              </div>
              <Heading size="big" className="mb-2">
                Posts tagged with #{tagName}
              </Heading>
              <p className="text-muted-foreground">
                {[
                  tag.articlesCount > 0 &&
                    `${tag.articlesCount} article${
                      tag.articlesCount !== 1 ? "s" : ""
                    }`,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog/tags">All Tags</Link>
            </Button>
          </div>

          {totalPosts === 0 ? (
            <p className="text-muted-foreground">
              No posts found for this tag.
            </p>
          ) : (
            <div className="space-y-12">
              {/* Articles Section */}
              {articles.length > 0 && (
                <div>
                  <List asGrid cols="1" gap="4">
                    {articles.map((article) => (
                      <BlogPost
                        key={article.slug}
                        layout="row"
                        {...article}
                      />
                    ))}
                  </List>
                </div>
              )}
            </div>
          )}
        </div>
      </Gaps>
    </Container>
  );
}
