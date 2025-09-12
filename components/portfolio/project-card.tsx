"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioItem } from "@/lib/types/data/portfolio";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";
import ProjectState from "./project-state";
import { AnimatePresence, motion } from "framer-motion";

type ProjectProps = PortfolioItem;

function ImageModal({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative flex items-center justify-center p-4 "
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[90%] max-h-full rounded-lg cursor-zoom-out"
              onClick={onClose}
            />
            {/* <button
              className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
              onClick={onClose}
            >
              &times;
            </button> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard(props: ProjectProps) {
  const { title, description, date, image, state, source, preview, tags } =
    props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative bg-card border border-border shadow-xs rounded-md h-full">
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
            {/* <div className="flex flex-wrap gap-1 mt-2">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-accent dark:bg-accent/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
          </div> */}

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
          {image && (
            <img
              src={image}
              alt={title}
              className="object-cover rounded h-[125px] aspect-[16/9] hidden sm:block cursor-zoom-in hover:opacity-80 transition-opacity"
              loading="lazy"
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
          {/* {image && (
            <img
              src={image}
              alt={title}
              className={`
                absolute right-0 bottom-0 object-cover rounded h-full w-[200px] hidden sm:block cursor-zoom-in 
                hover:opacity-80 transition-opacity duration-300 ease-out 
                hover:w-[220px] [transition-property:width,opacity] rounded-l-t-[100%]
              `}
              loading="lazy"
              onClick={() => {
                setOpen(true);
              }}
            />
          )} */}
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
