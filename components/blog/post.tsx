import Link from "next/link";
import React from "react";
import { PostInput } from "@/lib/types/data/blog";
import { Calendar } from "lucide-react";
import Tag from "./tag";

type PostProps = Omit<PostInput, "content" | "published">;

function RowPost(props: PostProps) {
  const { title, slug, description, date, image, tags } = props;

  return (
    <div className="bg-card dark:bg-accent/25 border border-border shadow-xs rounded-md h-full col-span-1">
      <div className="flex justify-between gap-x-4 p-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="object-cover rounded h-[125px] aspect-[16/9] hidden sm:block"
            loading="lazy"
          />
        )}
        <div className="gap-2 flex flex-col h-full grow">
          <p className="text-sm text-muted-foreground flex gap-1 items-center">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link
            href={`/blog/${slug}`}
            className="text-lg font-medium hyphens-auto line-clamp-1 group hover:text-info transition-colors"
          >
            {title}
          </Link>
          <p className="text-muted-foreground text-sm break-words hyphens-auto">
            {description}
          </p>
          <div className="tags flex flex-wrap gap-1 mt-auto">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, idx) => (
                <Tag
                  key={`${tag}-${idx}`}
                  name={tag}
                  path={`/blog/tags/${tag}`}
                  size="sm"
                  variant="subtle"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowPost;
