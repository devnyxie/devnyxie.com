import { getAllPosts } from "@/lib/api";
import Image from "next/image";
import RowPost from "./post";

export default function Blog() {
  const posts = getAllPosts();
  // console.log(posts);
  return (
    <>
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
          />
        ))}
      </div>
    </>
  );
}
