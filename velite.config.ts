import { defineConfig, s } from "velite";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

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
      schema: s
        .object({
          title: s.string().min(3).max(120),
          description: s.string().min(10).max(250),
          slug: s.path().transform((p) => p.split("/").pop() ?? p),
          image: s.string().default(""),
          date: s.isodate().transform((d) => new Date(d)),
          published: s.boolean().default(true),
          pinned: s.boolean().default(false),
          tags: s.array(s.string()).max(10).default([]),
          series_name: s.string().optional().default(""),
          series_index: s.number().optional().default(0),
          code: s.mdx(),
          rawContent: s
            .raw()
            .transform((raw) => raw.replace(/^---[\s\S]*?---\s*\n/, "")),
        })
        .transform((data) => ({
          ...data,
          readTime: Math.ceil(data.rawContent.split(/\s+/).length / 180),
          path: `/blog/${data.slug}`,
        })),
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
