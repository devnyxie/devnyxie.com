import Link from "next/link";
import React from "react";
import { PostInput } from "@/lib/types/blog";
import { Calendar } from "lucide-react";
import Tag from "./tag";

type PostProps = Omit<PostInput, "content" | "published">;

function RowPost(props: PostProps) {
  const { title, slug, description, date, image } = props;

  return (
    <div className="bg-accent/25 border border-border shadow-xs rounded-md h-full col-span-1">
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
            <Calendar className="w-4 h-4" />
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
          {/* 
            {tags && tags.length > 0 && (
                <div className="tags flex flex-wrap gap-1">
                    {tags.map((tag, idx) => (
                        <InlineTag
                            key={`${tag}-${idx}`}
                            tag={tag}
                            path={`/blog/tags/${tag}`}
                            variant="ghost"
                        />
                    ))}
                </div>
            )} 
            */}
          <Tag name="code" path="/" />
        </div>
      </div>
    </div>
  );
}

export default RowPost;
