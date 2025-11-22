"use client";

import Link from "next/link";
import React from "react";
import { MentionItem } from "../../../lib/types/data/mentions";
import { ExternalLink, Play, Globe } from "lucide-react";

type MentionCardProps = {
  mention: MentionItem;
  layout?: "card" | "compact";
};

function MentionCard({ mention, layout = "compact" }: MentionCardProps) {
  const { title, url, description, type, source, date, tags } = mention;

  const getTypeIcon = () => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "article":
        return <ExternalLink className="h-4 w-4" />;
      case "website":
        return <Globe className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "video":
        return "text-red-500";
      case "article":
        return "text-blue-500";
      case "website":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const formatRelativeDate = (dateString: string) => {
    try {
      const parsedDate = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - parsedDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch {
      return dateString;
    }
  };

  if (layout === "compact") {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-card border border-border hover:border-foreground/20 rounded-lg h-full transition-all duration-200 flex flex-col justify-between p-4 hover:bg-muted/20"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`mt-0.5 ${getTypeColor()} opacity-60 group-hover:opacity-100 transition-opacity`}
          >
            {getTypeIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground group-hover:text-info transition-colors line-clamp-2 mb-1 text-sm leading-tight">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Footer - Simple */}
        <div className="flex items-center justify-between text-xs text-muted-foreground/80 mt-auto">
          <span className="font-medium truncate">{source}</span>
          <div className="flex items-center gap-2">
            <span className="capitalize text-xs">{type}</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground/60">
              {formatRelativeDate(date)}
            </span>
          </div>
        </div>

        {/* Tags - Only if available and minimal */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 opacity-60 group-hover:opacity-80 transition-opacity">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="text-xs text-muted-foreground/60">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  }

  // Card layout for larger displays
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-card border border-border hover:border-foreground/20 rounded-lg h-full transition-all duration-200 flex flex-col p-5 hover:bg-muted/20"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`mt-1 ${getTypeColor()} opacity-70 group-hover:opacity-100 transition-opacity`}
        >
          {getTypeIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground group-hover:text-info transition-colors mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground/80 mt-auto">
        <div className="flex items-center gap-2">
          <span className="font-medium">{source}</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground/60">
            {formatRelativeDate(date)}
          </span>
        </div>
        <div className="capitalize text-xs text-muted-foreground/80">
          {type}
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 opacity-60 group-hover:opacity-80 transition-opacity">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-muted-foreground/60">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export default MentionCard;
