import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";
import getTagStyles from "./styles";

export type Props = {
  name: string;
  path?: string;
  variant?: "default" | "outline" | "subtle";
};

// Tag style variants based on tag names
const tagVariants = cva(
  "rounded group transition duration-200 w-max text-sm font-medium px-1.5 py-0.5 text-xs",
  {
    variants: {
      variant: {
        default: "border",
        outline: "border-1 bg-transparent",
        subtle: "border-0",
      },
      clickable: {
        true: "cursor-pointer hover:opacity-80",
        false: "cursor-default",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
);

function Tag({ name, path, variant = "default" }: Props) {
  const isClickable = path ? true : false;
  const tagStyles = getTagStyles(name, variant, isClickable);

  const TagComponent = isClickable ? "a" : "div";

  return (
    <TagComponent
      href={path}
      className={cn(
        tagVariants({ variant, clickable: isClickable }),
        tagStyles
      )}
    >
      # {name}
    </TagComponent>
  );
}

export default Tag;
