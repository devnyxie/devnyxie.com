import React from "react";
import { Button } from "../button";

import Link from "next/link";
import { PostInput, DeepDiveInput } from "@/lib/types/data/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Surround({
  post,
  contentType = "blog",
}: {
  post: PostInput | DeepDiveInput;
  contentType?: "articles" | "deep-dives" | "blog";
}) {
  const getHref = (slug: string) => {
    switch (contentType) {
      case "articles":
        return `/blog/articles/${slug}`;
      case "deep-dives":
        return `/blog/deep-dives/${slug}`;
      default:
        return `/blog/${slug}`;
    }
  };

  return (
    <div className="w-full flex gap-4">
      <Button
        variant="outline"
        className="flex-1 justify-start h-max rounded p-0 group"
        disabled={post.previous ? false : true}
      >
        <Link
          href={post.previous ? getHref(post.previous.slug) : ""}
          className="flex items-center gap-4 w-full px-4 py-2"
        >
          <ChevronLeft
            className={`transition-transform duration-200 ease-in-out group-hover:-translate-x-1 ${
              post.previous ? "" : "text-muted-foreground"
            }`}
          />
          <div className="flex flex-col items-start">
            <div className="text-muted-foreground">Previous Post</div>
            {post.previous ? (
              <div className="">{post.previous.title}</div>
            ) : (
              <div className="text-muted-foreground">
                {`You're at the oldest post!`}
              </div>
            )}
          </div>
        </Link>
      </Button>
      <Button
        variant="outline"
        className="flex-1 flex h-max rounded p-0 group"
        disabled={post.next ? false : true}
      >
        <Link
          href={post.next ? getHref(post.next.slug) : ""}
          className="flex items-center gap-4 w-full justify-end px-4 py-2"
        >
          <div className="flex flex-col items-end">
            <div className="text-muted-foreground">Next Post</div>
            {post.next ? (
              <div className="">{post.next.title}</div>
            ) : (
              <div className="text-muted-foreground">
                {`You're at the newest post!`}
              </div>
            )}
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ease-in-out group-hover:translate-x-1 ${
              post.next ? "" : "text-muted-foreground"
            }`}
          />
        </Link>
      </Button>
    </div>
  );
}

export default Surround;
