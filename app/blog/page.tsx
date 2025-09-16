import { getAllDeepDives } from "@/lib/api/blog";
import { getAllArticles } from "@/lib/api/articles";
import RowPost from "../../components/blog/post";
import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import Gaps from "@/components/layout/gaps";
import { BlogPageType } from "@/lib/types/pages/blog";
import RowDeepDive from "@/components/blog/dive";
import PageBreadcrumb from "@/components/layout/breadcrumb";
import { DeepDiveInput, PostInput } from "@/lib/types/data/blog";
import Link from "next/link";
import { Button } from "@/components/button";

export default async function Blog() {
  const page: BlogPageType = await getPageData("blog");
  const articles: PostInput[] = await getAllArticles();
  const deep_dives: DeepDiveInput[] = await getAllDeepDives();
  return (
    <>
      <PageBreadcrumb />
      <Gaps>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
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

          <div className="grid grid-cols-1 gap-4">
            {articles ? (
              articles
                .slice(0, 6)
                .map((post) => (
                  <RowPost
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    image={post.image}
                    path={post.slug}
                    readTime={post.readTime}
                    series_name={post.series_name}
                    series_index={post.series_index}
                    tags={post.tags}
                    next={post.next}
                    previous={post.previous}
                  />
                ))
            ) : (
              <p className="text-muted-foreground">No articles found.</p>
            )}
          </div>
        </div>
      </Gaps>
    </>
  );
}
