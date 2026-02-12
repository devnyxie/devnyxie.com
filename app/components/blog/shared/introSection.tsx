import { formatDate } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import Tag from "./tag/tag";

interface Props {
  title: string;
  description: string;
  date: Date;
  readTime: number;
  image?: string;
  icon?: string;
  tags?: string[];
}

function IntroSection({
  title,
  description,
  date,
  readTime,
  image,
  icon,
  tags,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      {image && (
        <div className="w-full rounded-lg aspect-video flex justify-center items-center overflow-hidden mb-8 border border-border/50">
          <Image
            src={image}
            alt={title}
            width={1280}
            height={720}
            className="object-cover h-full w-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            priority
          />
        </div>
      )}
      
      <div className="flex flex-col space-y-4">
        {icon && (
          <div className="flex">
            <Image
              src={icon}
              width={56}
              height={56}
              alt={`${title} icon`}
              className="w-14 h-14 rounded-lg"
            />
          </div>
        )}
        
        <div className="flex flex-col space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
          <time dateTime={date.toISOString()}>{formatDate(date)}</time>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
          <span>{readTime} min read</span>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, idx) => (
              <Tag
                key={`${tag}-${idx}`}
                name={tag}
                path={`/blog/tags/${tag}`}
                variant="subtle"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default IntroSection;
