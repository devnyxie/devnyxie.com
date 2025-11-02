'use client';

import Link from "next/link";
import React, { useState } from "react";
import { PostInput } from "@/lib/types/data/blog";
import { Calendar } from "lucide-react";
import Tag from "./shared/tag/tag";
import Image from "next/image";
import ImageModal from "../ImageModal";

type PostProps = Omit<PostInput, "content" | "published"> & {
  layout?: "card" | "row";
};

function BlogPost({ layout = "row", ...props }: PostProps) {
  const [open, setOpen] = useState(false);
  const { title, slug, description, date, image, tags } = props;

  return (
    <>
      <div className="bg-card border border-border shadow-xs rounded-md h-full flex flex-col p-4 gap-2">
      {/* Image - always on top for card layout */}
      {image && layout === "card" && (
        <div className="rounded overflow-hidden w-full aspect-video flex items-center justify-center">
          <img
            src={image}
            alt={title}
                className="object-cover h-full w-full cursor-zoom-in hover:opacity-80  transition-transform duration-300 group-hover:scale-105 select-none"
                loading="lazy"
                onClick={() => {
                  setOpen(true);
                }}
          />
        </div>
      )}

      {/* Row layout - image on top on mobile, left on larger screens */}
      {layout === "row" && (
        <>
          {/* Mobile: image on top */}
          {image && (
            <div className="rounded overflow-hidden w-full aspect-video flex sm:hidden items-center justify-center">
              <img
                src={image}
                alt={title}

              />
            </div>
          )}
        </>
      )}

      <div className="flex justify-between gap-x-4">
        {/* Row layout: image on left for larger screens */}
        {layout === "row" && image && (
          <div className="rounded overflow-hidden max-h-[125px] aspect-video hidden sm:block shrink-0">
            <img
              src={image}
              alt={title}
                 className="object-cover h-full w-full cursor-zoom-in hover:opacity-80  transition-transform duration-300 group-hover:scale-105 select-none"
              loading="lazy"
              onClick={() => {
                setOpen(true);
              }}
            />
           
          </div>
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
            href={`/blog/articles/${slug}`}
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
                  variant="subtle"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
    <ImageModal
        src={image!}
        alt={title}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      </>
    
  );
}

export default BlogPost;
