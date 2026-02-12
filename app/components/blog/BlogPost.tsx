"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PostInput } from "@/lib/types/data/blog";
import { Calendar } from "lucide-react";
import Tag from "./shared/tag/tag";
import ImageModal from "../ImageModal";
import Image from "next/image";

type PostProps = Omit<PostInput, "content" | "published"> & {
  layout?: "card" | "row";
};

function BlogPost({ layout = "row", ...props }: PostProps) {
  const [open, setOpen] = useState(false);
  const { title, slug, description, date, image, tags } = props;

  return (
    <>
      <Link
        href={`/blog/${slug}`}
        className="group bg-card border border-border hover:border-foreground/20 shadow-xs rounded-lg h-full flex flex-col p-4 gap-2 hover:shadow-sm transition-all duration-200"
      >
        {image && layout === "card" && (
          <div className="rounded overflow-hidden w-full aspect-video flex items-center justify-center">
            <Image
              width={1280}
              height={720}
              src={image}
              alt={title}
              className="object-cover h-full w-full cursor-pointer transition-transform duration-300 group-hover:scale-105 select-none"
              loading="lazy"
            />
          </div>
        )}

        {layout === "row" && (
          <>
            {image && (
              <div className="rounded overflow-hidden w-full aspect-video flex sm:hidden items-center justify-center">
                <Image
                  width={1280}
                  height={720}
                  src={image}
                  alt={title}
                  className="object-cover h-full w-full cursor-pointer transition-transform duration-300 group-hover:scale-105 select-none"
                />
              </div>
            )}
          </>
        )}

        <div className="flex justify-between gap-x-4">
          {layout === "row" && image && (
            <div className="rounded overflow-hidden max-h-[125px] aspect-video hidden sm:block shrink-0">
              <Image
                width={1280}
                height={720}
                src={image}
                alt={title}
                className="object-cover h-full w-full cursor-pointer transition-transform duration-300 group-hover:scale-105 select-none"
                loading="lazy"
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
            <h3 className="text-lg font-medium hyphens-auto line-clamp-1 group-hover:text-info transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm wrap-break-word hyphens-auto line-clamp-2">
              {description}
            </p>
            <div className="tags flex flex-wrap gap-1 mt-auto">
              {tags &&
                tags.length > 0 &&
                tags.map((tag, idx) => (
                  <Tag
                    key={`${tag}-${idx}`}
                    name={tag}
                    variant="subtle"
                  />
                ))}
            </div>
          </div>
        </div>
      </Link>
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
