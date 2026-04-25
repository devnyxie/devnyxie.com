"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface HeadingItem {
  level: number;
  text: string;
  slug: string;
}

const SCROLL_OFFSET = 120;

function TableOfContents() {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  // Extract headings from DOM once on mount (MDX content is static)
  useEffect(() => {
    const articleContent = document.querySelector(".content-body");
    if (!articleContent) return;

    const elements = articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const extracted: HeadingItem[] = [];

    elements.forEach((el) => {
      const text = el.textContent || "";
      const slug = el.id;
      if (text && slug) {
        extracted.push({ level: parseInt(el.tagName[1]), text, slug });
      }
    });

    setHeadings(extracted);
  }, []);

  // Track active heading: last heading whose top <= SCROLL_OFFSET
  useEffect(() => {
    if (headings.length === 0) return;

    const updateActive = () => {
      let active = headings[0].slug;

      for (const { slug } of headings) {
        const el = document.getElementById(slug);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          active = slug;
        }
      }

      setActiveHeading(active);
    };

    updateActive();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length < 2) return null;

  const minLevel = Math.min(...headings.map((h) => h.level));

  return (
    <nav className="sticky top-10 col-start-3 row-span-1 ml-10 mr-auto hidden h-[calc(100vh-5.5rem)] max-w-[14rem] xl:flex xl:flex-col overflow-y-auto pe-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="border-l border-border space-y-0.5">
        {headings.map((heading, index) => {
          const isActive = activeHeading === heading.slug;
          return (
            <li key={`${heading.slug}-${index}`}>
              <Link
                href={`#${heading.slug}`}
                className={`block text-sm py-1 pr-2 transition-colors duration-150 border-l -ml-px ${
                  isActive
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
                style={{
                  paddingLeft: `${(heading.level - minLevel) * 12 + 12}px`,
                }}
              >
                {heading.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
