import { getAllPosts } from "@/lib/api/blog";
import RowPost from "../../components/blog/post";
import Heading from "@/components/heading";
import { getPageData } from "@/lib/api/pages";

export default async function Blog() {
  const page = await getPageData("blog");
  const posts = await getAllPosts();
  return (
    <div>
      <div className="mb-8">
        <Heading className="mb-2" size="big">
          {page.title}
        </Heading>
        <p className="text-muted-foreground">{page.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
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
        ))}
      </div>
    </div>
  );
}
