"use client";

import { TocEntry } from "@/velite.config";
import Link from "next/link";
import React from "react";

const SCROLL_OFFSET = 250;

function getAllItemIds(toc: TocEntry[]): string[] {
  const ids: string[] = [];
  function traverse(entries: TocEntry[]) {
    for (const entry of entries) {
      ids.push(entry.url.replace("#", ""));
      if (entry.items.length > 0) {
        traverse(entry.items);
      }
    }
  }
  traverse(toc);
  return ids;
}

function useActiveHeading(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const updateActive = () => {
      let active = itemIds[0] ?? "";

      for (const id of itemIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          active = id;
        }
      }

      setActiveId(active);
    };

    updateActive();

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemIds]);

  return activeId;
}

function renderEntryRecursively(
  tocEntry: TocEntry,
  activeHeading: string | null,
  depth = 1,
) {
  console.log("rendering children for:", tocEntry.title);
  return (
    <div key={tocEntry.url}>
      <Link
        href={tocEntry.url}
        // border styling is not available anymore due to nesting; we can flat the TOC structure before passsing it here on client side and attach the depth info to each entry
        // aka just an ordered array without nesting
        className={`block text-sm py-1 pr-2 border-l -ml-px transition-colors ${
          activeHeading === tocEntry.url.slice(1)
            ? "border-foreground text-foreground font-medium"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
        }`}
        style={{
          paddingLeft: `${depth * 12}px`,
        }}
        data-active={tocEntry.url === `#${activeHeading}`}
        data-depth={String(depth)}
      >
        {tocEntry.title}
      </Link>
      {tocEntry.items.map((child) =>
        renderEntryRecursively(child, activeHeading, depth + 1),
      )}
    </div>
  );
}

function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const itemIds = React.useMemo(
    () => getAllItemIds(toc),
    [toc],
  );
  const activeHeading = useActiveHeading(itemIds);

  if (!toc?.length) {
    return null;
  }

  if (toc.length < 2) return null;

  return (
    <nav className="sticky top-10 col-start-3 row-span-1 ml-10 mr-auto hidden h-[calc(100vh-5.5rem)] max-w-[14rem] xl:flex xl:flex-col overflow-y-auto pe-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <div>
        {toc.map((entry) => {
          return renderEntryRecursively(entry, activeHeading);
        })}
      </div>
    </nav>
  );
}

export default TableOfContents;
