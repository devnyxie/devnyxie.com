import { getAllDeepDives } from "@/lib/api/blog/blog";
import { getAllArticles } from "@/lib/api/blog/articles";
import { getMentions } from "@/lib/api/mentions";
import BlogPost from "../components/blog/BlogPost";
import MentionCard from "../components/blog/MentionCard";
import Heading from "@/app/components/heading";
import { getPageData } from "@/lib/api/pages";
import { getConfig } from "@/lib/app.config";
import Gaps from "@/app/components/layout/gaps";
import { BlogPageType } from "@/lib/types/pages/blog";
import RowDeepDive from "@/app/components/blog/dive";
import PageBreadcrumb from "@/app/components/layout/breadcrumb";
import { DeepDiveInput, PostInput } from "@/lib/types/data/blog";
import { MentionsPageType } from "@/lib/types/data/mentions";
import Link from "next/link";
import { Button } from "@/app/components/button";
import { generateMetadata as createMetadata } from "@/lib/metadata";
import Container from "@/app/components/layout/container";
import List from "@/app/components/layout/list";

// todo: wire up metadata from the config files
export async function generateMetadata() {
  return createMetadata({
    title: "Blog",
    description:
      "Articles, deep dives, and technical insights on software development and engineering",
  });
}

export default async function Blog() {
  const page: BlogPageType = await getPageData("blog");
  const { features } = getConfig();
  const articles: PostInput[] = await getAllArticles();
  const deep_dives: DeepDiveInput[] = await getAllDeepDives();
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

        {/* Deep Dives */}
        <div id="section" className="gap-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Heading className="mb-2" size="big">
                {page.title_deep_dives}
              </Heading>
              <p className="text-muted-foreground">
                {page.description_deep_dives}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/blog/tags">Tags</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog/deep-dives">View All</Link>
              </Button>
            </div>
          </div>
          <List asGrid cols="1 sm:2" gap="4">
            {deep_dives ? (
              deep_dives
                .slice(0, 4)
                .map((post) => (
                  <RowDeepDive
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    icon={post.icon}
                    path={post.slug}
                    readTime={post.readTime}
                    tags={post.tags}
                    next={post.next}
                    previous={post.previous}
                  />
                ))
            ) : (
              <p className="text-muted-foreground">No deep dives found.</p>
            )}
          </List>
        </div>

        {/* Articles */}
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
                <Link href="/blog/articles">View All</Link>
              </Button>
            </div>
          </div>

          <List asGrid cols="1" gap="4">
            {articles ? (
              articles
                .slice(0, 8)
                .map((post) => (
                  <BlogPost key={post.slug} layout="row" {...post} />
                ))
            ) : (
              <p className="text-muted-foreground">No articles found.</p>
            )}
          </List>
        </div>
      </Gaps>
    </Container>
  );
}
