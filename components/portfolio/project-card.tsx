import Link from "next/link";
import React from "react";
import { PortfolioItem } from "@/lib/types/data/portfolio";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";

type ProjectProps = PortfolioItem;

const stateStyles = {
  published:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "in-progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  draft:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

const stateLabels = {
  published: "Published",
  archived: "Archived",
  "in-progress": "In Progress",
  in_progress: "In Progress",
  draft: "Draft",
};

function ProjectCard(props: ProjectProps) {
  const {
    title,
    slug,
    description,
    date,
    image,
    state,
    source,
    preview,
    tags,
  } = props;

  return (
    <div className="bg-card border border-border shadow-xs rounded-md h-full">
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
          <div className="flex items-start justify-between gap-2">
            <div className="flex gap-2">
              <p className="text-sm text-muted-foreground flex gap-1 items-center">
                <Calendar className="w-3.5 h-3.5" />
                {/* {date} */}
                {formatDate(date)}
              </p>
              <span
                className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${stateStyles[state]}`}
              >
                {stateLabels[state]}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-medium hyphens-auto line-clamp-1">
            {title}
          </h3>

          <p className="text-muted-foreground text-sm break-words hyphens-auto flex-1">
            {description}
          </p>

          <div className="flex flex-wrap gap-1 mt-2">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-accent text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="flex gap-2 mt-auto pt-2">
            {source && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 py-1"
                >
                  <IconBrandGithub className="w-4 h-4 mr-1" />
                  Source
                </Link>
              </Button>
            )}
            {preview && (
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 py-1"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Preview
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
