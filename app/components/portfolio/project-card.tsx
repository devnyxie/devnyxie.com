"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioItem } from "@/lib/types/data/portfolio";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Button } from "@/app/components/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";
import ProjectState from "./project-state";
import ImageModal from "../ImageModal";

type ProjectProps = PortfolioItem;

function ProjectCard(props: ProjectProps) {
  const { title, description, date, image, state, source, preview, tags } =
    props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative bg-bg-elevated border border-border shadow-xs rounded-md h-full">
        <div
          className={`flex justify-between gap-x-4 p-4
          `}
        >
          <div className="gap-2 flex flex-col h-full grow">
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2">
                <p className="text-sm text-muted-foreground flex gap-1 items-center">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(date)}
                </p>
                <ProjectState title={state} />
              </div>
            </div>
            <h3 className="text-lg font-medium hyphens-auto line-clamp-1">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm break-words hyphens-auto flex-1">
              {description}
            </p>
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
          <div className="hidden sm:block rounded h-[125px] aspect-[16/9] shrink-0 overflow-hidden group">
            {image && (
              <img
                src={image}
                alt={title}
                className="object-cover h-full w-full cursor-zoom-in hover:opacity-80  transition-transform duration-300 group-hover:scale-105 select-none"
                loading="lazy"
                onClick={() => {
                  setOpen(true);
                }}
              />
            )}
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

export default ProjectCard;
