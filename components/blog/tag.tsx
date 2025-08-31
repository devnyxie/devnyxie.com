import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  path?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "subtle";
};

// Tag style variants based on tag names
const tagVariants = cva(
  "rounded group transition duration-200 w-max text-sm font-medium",
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
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
      size: "md",
      variant: "default",
      clickable: false,
    },
  }
);

// Dynamic styles based on tag names
const getTagStyles = (
  name: string,
  variant: Props["variant"] = "default",
  isClickable: boolean = false
) => {
  const tagName = name.toLowerCase();

  // Color mappings for different technologies/categories
  const colorMap: Record<
    string,
    { bg: string; border: string; text: string; hoverBg?: string }
  > = {
    // Programming Languages
    javascript: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-600 dark:text-yellow-400",
      hoverBg: "hover:bg-yellow-500/20",
    },
    typescript: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      hoverBg: "hover:bg-blue-500/20",
    },
    go: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-600 dark:text-cyan-400",
      hoverBg: "hover:bg-cyan-500/20",
    },
    python: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-600 dark:text-green-400",
      hoverBg: "hover:bg-green-500/20",
    },
    rust: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      text: "text-orange-600 dark:text-orange-400",
      hoverBg: "hover:bg-orange-500/20",
    },
    java: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-600 dark:text-red-400",
      hoverBg: "hover:bg-red-500/20",
    },

    // Frameworks & Libraries
    react: {
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      text: "text-blue-500 dark:text-blue-400",
      hoverBg: "hover:bg-blue-400/20",
    },
    nextjs: {
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-700 dark:text-gray-300",
      hoverBg: "hover:bg-gray-500/20",
    },
    vue: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-600 dark:text-emerald-400",
      hoverBg: "hover:bg-emerald-500/20",
    },
    svelte: {
      bg: "bg-orange-400/10",
      border: "border-orange-400/30",
      text: "text-orange-500 dark:text-orange-400",
      hoverBg: "hover:bg-orange-400/20",
    },

    // Backend & Databases
    nodejs: {
      bg: "bg-green-600/10",
      border: "border-green-600/30",
      text: "text-green-700 dark:text-green-400",
      hoverBg: "hover:bg-green-600/20",
    },
    express: {
      bg: "bg-gray-600/10",
      border: "border-gray-600/30",
      text: "text-gray-700 dark:text-gray-400",
      hoverBg: "hover:bg-gray-600/20",
    },
    postgresql: {
      bg: "bg-blue-600/10",
      border: "border-blue-600/30",
      text: "text-blue-700 dark:text-blue-400",
      hoverBg: "hover:bg-blue-600/20",
    },
    mongodb: {
      bg: "bg-green-700/10",
      border: "border-green-700/30",
      text: "text-green-800 dark:text-green-400",
      hoverBg: "hover:bg-green-700/20",
    },

    // DevOps & Tools
    docker: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-600 dark:text-blue-400",
      hoverBg: "hover:bg-blue-500/20",
    },
    kubernetes: {
      bg: "bg-blue-700/10",
      border: "border-blue-700/30",
      text: "text-blue-800 dark:text-blue-400",
      hoverBg: "hover:bg-blue-700/20",
    },
    aws: {
      bg: "bg-orange-600/10",
      border: "border-orange-600/30",
      text: "text-orange-700 dark:text-orange-400",
      hoverBg: "hover:bg-orange-600/20",
    },

    // Topics & Categories
    algorithm: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      text: "text-purple-600 dark:text-purple-400",
      hoverBg: "hover:bg-purple-500/20",
    },
    tutorial: {
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      text: "text-indigo-600 dark:text-indigo-400",
      hoverBg: "hover:bg-indigo-500/20",
    },
    guide: {
      bg: "bg-teal-500/10",
      border: "border-teal-500/30",
      text: "text-teal-600 dark:text-teal-400",
      hoverBg: "hover:bg-teal-500/20",
    },
    tips: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-600 dark:text-amber-400",
      hoverBg: "hover:bg-amber-500/20",
    },
  };

  // Get styles for the tag or fall back to default
  const styles = colorMap[tagName] || {
    bg: "bg-accent/50",
    border: "border-border",
    text: "text-accent-foreground/70",
    hoverBg: "hover:bg-accent/70",
  };

  // Include hover styles only if clickable
  const hoverStyles = isClickable ? styles.hoverBg : "";

  // Modify styles based on variant
  switch (variant) {
    case "outline":
      return `${styles.border} ${styles.text} ${hoverStyles}`;
    case "subtle":
      return `${styles.bg} ${styles.text} ${hoverStyles}`;
    default:
      return `${styles.bg} ${styles.border} ${styles.text} ${hoverStyles}`;
  }
};

function Tag({ name, path, size = "sm", variant = "default" }: Props) {
  const isClickable = path ? true : false;
  const tagStyles = getTagStyles(name, variant, isClickable);

  const TagComponent = isClickable ? "a" : "div";

  return (
    <TagComponent
      href={path}
      className={cn(
        tagVariants({ size, variant, clickable: isClickable }),
        tagStyles
      )}
    >
      # {name}
    </TagComponent>
  );
}

export default Tag;
