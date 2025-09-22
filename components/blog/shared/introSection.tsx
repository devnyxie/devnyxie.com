import { formatDate } from "@/lib/utils";
import React from "react";
import Tag from "./tag/tag";

interface Props {
  title: string;
  description: string;
  date: Date;
  readTime: number;
  image?: string;
  icon?: string;
  tags?: string[];
  tagPath: "deep-dives" | "articles";
}

function IntroSection({
  title,
  description,
  date,
  readTime,
  image,
  icon,
  tags,
  tagPath,
}: Props) {
  return (
    <>
      {image && (
        <div className="w-full rounded aspect-video flex justify-center items-center overflow-hidden">
          <img src={image} className="object-cover h-full" alt={title} />
        </div>
      )}
      {icon && (
        <img
          src={icon}
          className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
        />
      )}
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-medium mb-2 text-center">{title}</h1>
        <p className="text-muted-foreground mb-4 text-center">{description}</p>
        <div className="flex gap-2 text-sm">
          <p className="text-muted-foreground">{formatDate(date)}</p>
          <div className="flex-1 my-0.5 w-[1px] bg-muted" />
          <p className="text-muted-foreground">{readTime} min read</p>
        </div>
      </div>
      <div className="tags flex flex-wrap gap-1 mt-auto">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, idx) => (
            <Tag
              key={`${tag}-${idx}`}
              name={tag}
              path={`/blog/${tagPath}/${tag}`}
              variant="subtle"
            />
          ))}
      </div>
    </>
  );
}

export default IntroSection;
