import { defineConfig, s, z } from "velite";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

const titleSchema = z
  .string()
  .min(3, "Title must be at least 3 characters")
  .max(120, "Title must be at most 120 characters");

const descriptionSchema = z
  .string()
  .min(10, "Description must be at least 20 characters")
  .max(250, "Description must be at most 250 characters");

const baseSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

const slugSchema = z
  .string()
  .regex(/^[a-z0-9_-]+$/i, "letters, numbers, dashes and underscores only")
  .min(3, "Slug must be at least 3 characters")
  .max(80, "Slug must be at most 80 characters");

const surroundPost = z.object({
  title: titleSchema,
  slug: slugSchema.optional().default(""),
});

const articleSchema = baseSchema
  .extend({
    slug: s.path().transform((p) => p.split("/").pop() ?? p), // not sure
    image: s.string().default(""),
    date: s.isodate().transform((d) => new Date(d)),
    published: s.boolean().default(true),
    pinned: s.boolean().default(false),
    tags: s.array(s.string()).max(10).default([]),
    toc: s.toc(),
    next: surroundPost.optional(),
    previous: surroundPost.optional(),
    code: s.mdx(),
    rawContent: s
      .raw()
      .transform((raw) => raw.replace(/^---[\s\S]*?---\s*\n/, "")),
  })
  .transform((data) => ({
    ...data,
    readTime: Math.ceil(data.rawContent.split(/\s+/).length / 180),
    path: `/blog/${data.slug}`,
  }));

export type PostInput = z.infer<typeof articleSchema>;

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:8].[ext]",
    clean: true,
  },
  collections: {
    articles: {
      name: "Article",
      pattern: "blog/articles/**/*.{md,mdx}",
      schema: articleSchema,
    },
  },
  mdx: {
    copyLinkedFiles: false,
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
          },
        },
      ],
      [
        rehypeShiki as never,
        {
          themes: {
            light: "github-light-default",
            dark: "dark-plus",
          },
          defaultColor: false,
        },
      ],
    ],
  },
});

// Other

export interface TocEntry {
  title: string;
  url: string;
  items: TocEntry[];
}