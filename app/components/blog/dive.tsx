import { DeepDiveInput } from "@/lib/types/data/blog";
import Link from "next/link";
import React from "react";

type PostProps = Omit<DeepDiveInput, "content" | "published">;

function RowDeepDive({ title, icon, slug }: PostProps) {
  return (
    <Link
      href={`/blog/deep-dives/${slug}`}
      className="group bg-card border border-border hover:border-foreground/20 shadow-xs rounded-lg h-full transition-all duration-200 flex flex-col justify-center hover:shadow-sm"
    >
      <div className="flex items-center gap-4 p-4">
        <img
          src={icon}
          alt=""
          className="object-cover rounded-sm h-[32px] w-[32px] group-hover:scale-105 transition-transform"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <span className="font-medium text-foreground group-hover:text-info transition-colors text-sm leading-snug line-clamp-2">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RowDeepDive;
