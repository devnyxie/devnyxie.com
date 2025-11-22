import { getAllPostsByTag, getAllTags } from "@/lib/api/blog/tags";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import BlogPost from "@/app/components/blog/BlogPost";
import MentionCard from "@/app/components/blog/MentionCard";
import RowDeepDive from "@/app/components/blog/dive";
import Tag from "@/app/components/blog/shared/tag/tag";
import Heading from "@/app/components/heading";
import Gaps from "@/app/components/layout/gaps";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as createMetadata } from "@/lib/metadata";
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
  const { articles, deepDives, mentions, tag } = await getAllPostsByTag(
    tagName
  );

  if (!tag) {
    notFound();
  }

  const totalPosts = articles.length + deepDives.length + mentions.length;

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
                  tag.deepDivesCount > 0 &&
                    `${tag.deepDivesCount} deep dive${
                      tag.deepDivesCount !== 1 ? "s" : ""
                    }`,
                  tag.mentionsCount > 0 &&
                    `${tag.mentionsCount} mention${
                      tag.mentionsCount !== 1 ? "s" : ""
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
              {/* Deep Dives Section */}
              {deepDives.length > 0 && (
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <Heading size="default" className="mb-2">
                        Deep Dives
                      </Heading>
                      <p className="text-muted-foreground">
                        In-depth explorations tagged with #{tagName}
                      </p>
                    </div>
                    {deepDives.length > 0 && (
                      <Button variant="ghost" asChild>
                        <Link href="/blog/deep-dives">View All Deep Dives</Link>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deepDives.map((deepDive) => (
                      <RowDeepDive
                        key={deepDive.slug}
                        slug={deepDive.slug}
                        title={deepDive.title}
                        description={deepDive.description}
                        date={deepDive.date}
                        icon={deepDive.icon}
                        path={deepDive.slug}
                        readTime={deepDive.readTime}
                        tags={deepDive.tags}
                        next={deepDive.next}
                        previous={deepDive.previous}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mentions Section */}
              {mentions.length > 0 && (
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <Heading size="default" className="mb-2">
                        Mentions
                      </Heading>
                      <p className="text-muted-foreground">
                        External resources and links tagged with #{tagName}
                      </p>
                    </div>
                  </div>
                  <List asGrid cols="1 sm:2 xl:3" gap="4">
                    {mentions.map((mention, index) => (
                      <MentionCard
                        key={`${mention.url}-${index}`}
                        mention={mention}
                        layout="compact"
                      />
                    ))}
                  </List>
                </div>
              )}

              {/* Articles Section */}
              {articles.length > 0 && (
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <Heading size="default" className="mb-2">
                        Articles
                      </Heading>
                      <p className="text-muted-foreground">
                        Technical articles tagged with #{tagName}
                      </p>
                    </div>
                    {articles.length > 0 && (
                      <Button variant="ghost" asChild>
                        <Link href="/blog/articles">View All Articles</Link>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {articles.map((article) => (
                      <BlogPost key={article.slug} layout="row" {...article} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Gaps>
    </Container>
  );
}
