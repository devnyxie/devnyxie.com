import { getAllDeepDives, getAllPosts } from "@/lib/api/blog";
import RowPost from "../../components/blog/post";
import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";
import Gaps from "@/components/layout/gaps";
import { BlogPageType } from "@/lib/types/pages/blog";
import RowDeepDive from "@/components/blog/dive";

export default async function Blog() {
  const page: BlogPageType = await getPageData("blog");
  const posts = await getAllPosts();
  const deep_dives = await getAllDeepDives();
  return (
    <Gaps>
      <div id="section" className="gap-8">
        <div className="mb-8">
          <Heading className="mb-2" size="big">
            {page.title_deep_dives}
          </Heading>
          <p className="text-muted-foreground">{page.description_deep_dives}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deep_dives ? (
            deep_dives.map((post) => (
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
        <div className="mb-8">
          <Heading className="mb-2" size="big">
            {page.title_articles}
          </Heading>
          <p className="text-muted-foreground">{page.description_articles}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {posts ? (
            posts.map((post) => (
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
  );
}
