import React from "react";

// A unified wrapper for vertical stacks and responsive grids
// Example usage:
// <List asGrid cols="1 sm:2 lg:3" gap="6"> ...cards... </List>
// <List gap="6"> ...stacked items... </List>

type ListProps = {
  children: React.ReactNode;
  asGrid?: boolean;
  cols?: string; // e.g., "1 sm:2 lg:3"
  gap?: string; // e.g., "4", "6"
  className?: string;
};

function toGridCols(cols?: string) {
  if (!cols) return "grid-cols-1";
  // convert space-separated tokens like "1 sm:2 lg:3" into tailwind classes
  // supports tokens like "1", "sm:2", "md:2", "lg:3", etc.
  return cols
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const [bp, val] = token.includes(":") ? token.split(":") : ["", token];
      const cls = `grid-cols-${val}`;
      return bp ? `${bp}:${cls}` : cls;
    })
    .join(" ");
}

export default function List({
  children,
  asGrid,
  cols,
  gap = "6",
  className,
}: ListProps) {
  // Safelist to keep Tailwind from purging dynamic classes we use via props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const __tailwindSafelist =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-6 gap-8";
  const gapCls = `gap-${gap}`;
  const base = asGrid
    ? `grid ${toGridCols(cols)} ${gapCls}`
    : `flex flex-col ${gapCls}`;
  return <div className={`${base} ${className || ""}`}>{children}</div>;
}
