import React from "react";
import { Button } from "../../button";

import Link from "next/link";
import { PostInput } from "@/lib/types/data/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Surround({
  post,
}: {
  post: PostInput;
}) {
  const getHref = (slug: string) => {
    return `/blog/${slug}`;
  };

  return (
    <div className="w-full gap-4 flex flex-col md:flex-row pt-8 border-t border-border/50">
      <Button
        variant="outline"
        className="flex-1 justify-start h-auto rounded-lg p-0 group hover:border-border"
        disabled={post.previous ? false : true}
        asChild={true}
      >
        <Link
          href={post.previous ? getHref(post.previous.slug) : ""}
          className="flex items-center gap-4 w-full px-5 py-4"
        >
          <ChevronLeft
            className={`transition-transform duration-200 ease-in-out group-hover:-translate-x-1 shrink-0 ${
              post.previous ? "" : "text-muted-foreground"
            }`}
          />
          <div className="flex flex-col items-start min-w-0">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Previous</div>
            {post.previous ? (
              <div className="font-medium truncate w-full">{post.previous.title}</div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {`You're at the oldest post`}
              </div>
            )}
          </div>
        </Link>
      </Button>
      <Button
        variant="outline"
        className="flex-1 h-auto rounded-lg p-0 group hover:border-border"
        disabled={post.next ? false : true}
        asChild={true}
      >
        <Link
          href={post.next ? getHref(post.next.slug) : ""}
          className="flex items-center gap-4 w-full justify-end px-5 py-4"
        >
          <div className="flex flex-col items-end min-w-0">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next</div>
            {post.next ? (
              <div className="font-medium truncate w-full text-right">{post.next.title}</div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {`You're at the newest post`}
              </div>
            )}
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ease-in-out group-hover:translate-x-1 shrink-0 ${
              post.next ? "" : "text-muted-foreground"
            }`}
          />
        </Link>
      </Button>
    </div>
  );
}

export default Surround;
