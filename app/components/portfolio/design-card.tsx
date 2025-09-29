"use client";

import Image from "next/image";
import { useState } from "react";
import { PortfolioItem } from "@/lib/types/data/portfolio";
import { formatDate } from "@/lib/utils";
import ImageModal from "../ImageModal";

type DesignCardProps = PortfolioItem;

export default function DesignCard({
  title,
  image,
  date,
  slug,
}: DesignCardProps) {
  const [open, setOpen] = useState(false);

  const cleanTitle =
    title ||
    slug
      .replace(/\.[^/.]+$/, "") // Remove file extension if present
      .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
        <div className="aspect-video relative overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-zoom-in hover:opacity-80 select-none"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm text-foreground line-clamp-2">
            {cleanTitle}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(date)}
          </p>
        </div>
      </div>
      <ImageModal
        src={image!}
        alt={cleanTitle}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
