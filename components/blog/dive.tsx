import { DeepDiveInput } from "@/lib/types/data/blog";
import Link from "next/link";
import React from "react";

type PostProps = Omit<DeepDiveInput, "content" | "published">;

function RowDeepDive({ title, icon, slug }: PostProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group bg-card border border-border hover:border-foreground/50 shadow-xs rounded-lg h-full transition-colors duration-200 flex flex-col justify-center"
    >
      <div className="flex justify-between items-center gap-x-4 p-4">
        <img
          src={icon}
          alt=""
          className="object-cover rounded-sm h-[35px]"
          loading="lazy"
        />
        <div className="gap-2 flex flex-col grow">
          <span className="font-medium group group-hover:text-info transition-colors">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RowDeepDive;
