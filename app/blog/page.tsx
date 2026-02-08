import { getAllArticles } from "@/lib/api/blog/articles";
import { getMentions } from "@/lib/api/mentions";
import BlogPost from "../components/blog/BlogPost";
import MentionCard from "../components/blog/MentionCard";
import Heading from "@/app/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/app.config";
import Gaps from "@/app/components/layout/gaps";
import { BlogPageType } from "@/lib/types/pages/blog";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import { PostInput } from "@/lib/types/data/blog";
import { MentionsPageType } from "@/lib/types/data/mentions";
import Link from "next/link";
import { Button } from "@/app/components/button";
import { generateMetadata as createMetadata } from "@/metadata";
import Container from "@/app/components/layout/container";
import List from "@/app/components/layout/list";
import { IconPin } from "@tabler/icons-react";

// todo: wire up metadata from the config files
export async function generateMetadata() {
  return createMetadata({
    title: "Blog",
    description:
      "Articles and technical insights on software development and engineering",
  });
}

export default async function Blog() {
  const page: BlogPageType = await getPageData("blog");
  const { features } = getConfig();
  const allArticles: PostInput[] = await getAllArticles();
  const pinnedArticles = allArticles.filter(article => article.pinned);
  const regularArticles = allArticles.filter(article => !article.pinned);
  const displayedArticles = regularArticles.slice(0, 8);
  const remainingCount = regularArticles.length - displayedArticles.length;
  const mentions: MentionsPageType | null = features.mentions ? await getMentions() : null;
  return (
    <Container>
      <PageBreadcrumb />
      <Gaps>
        {/* Mentions */}
        {features.mentions && (
          <div id="section" className="gap-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <Heading className="mb-2" size="big">
                  {page.title_mentions}
                </Heading>
                <p className="text-muted-foreground">
                  {page.description_mentions}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/blog/tags">Tags</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#mentions">View All</Link>
                </Button>
              </div>
            </div>
            <List asGrid cols="1 sm:2 xl:3" gap="4">
              {mentions?.items ? (
                mentions.items
                  .slice(0, 6)
                  .map((mention, index) => (
                    <MentionCard
                      key={`${mention.url}-${index}`}
                      mention={mention}
                      layout="compact"
                    />
                  ))
              ) : (
                <p className="text-muted-foreground">No mentions found.</p>
              )}
            </List>
          </div>
        )}

        {/* Articles Section - Combined Pinned and Regular */}
        <div id="section" className="gap-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Heading className="mb-2" size="big">
                {page.title_articles}
              </Heading>
              <p className="text-muted-foreground">
                {page.description_articles}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog/tags">Tags</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog/all">View All</Link>
              </Button>
            </div>
          </div>

          <List asGrid cols="1" gap="4">
            {/* Pinned Articles */}
            {pinnedArticles.length > 0 && (
              <>
                <div className="col-span-full flex text-muted-foreground">
                  <p className="text-xs uppercase tracking-wider font-medium">
                    Pinned
                  </p>
                  <IconPin className="inline size-4 ml-1" />
                </div>
                {pinnedArticles.map((post) => (
                  <BlogPost key={post.slug} layout="row" {...post} />
                ))}
                <div className="col-span-full my-4">
                  <div className="border-t border-border"></div>
                </div>
              </>
            )}

            {/* Regular Articles */}
            {displayedArticles.length > 0 ? (
              displayedArticles.map((post) => (
                <BlogPost key={post.slug} layout="row" {...post} />
              ))
            ) : (
              <p className="text-muted-foreground">No articles found.</p>
            )}
          </List>

          {/* View All Link */}
          {remainingCount > 0 && (
            <div className="mt-8 relative">
              {/* <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border"></div>
              </div> */}
              <div className="relative flex justify-center">
                <Button
                  variant="ghost"
                  size="md"
                  asChild
                  className="bg-background px-4"
                >
                  <Link href="/blog/all" className="group">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {remainingCount} more article
                      {remainingCount !== 1 ? "s" : ""}
                    </span>
                    <svg
                      className="ml-1 size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Gaps>
    </Container>
  );
}
