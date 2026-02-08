import { baseSchema, contentPageSchema } from "./lib/types/base";
import { blogPostSchema } from "./lib/types/data/blog";
import { indexPageSchema } from "./lib/types/pages/index";
import { portfolioItemSchema } from "./lib/types/data/portfolio";
import t_content_config from "./lib/types/content";
import { blogPageSchema } from "./lib/types/pages/blog";
import { portfolioPageSchema } from "./lib/types/pages/portfolio";
import { mentionsPageSchema } from "./lib/types/data/mentions";

const contentConfig: t_content_config = {
  pages: {
    index: {
      source: "index.yml",
      schema: indexPageSchema,
    },
    about: {
      source: "about.yml",
      schema: contentPageSchema,
    },
    now: {
      source: "now.yml",
      schema: contentPageSchema,
    },
    "self-hosting": {
      source: "self-hosting.yml",
      schema: contentPageSchema,
    },
    portfolio: {
      source: "portfolio.yml",
      schema: portfolioPageSchema,
    },
    blog: {
      source: "blog.yml",
      schema: blogPageSchema,
    },
    tags: {
      source: "tags.yml",
      schema: baseSchema,
    },
    mentions: {
      source: "mentions.yml",
      schema: mentionsPageSchema,
    },
  },
  content: {
    articles: {
      source: "blog/articles/**/*.{md,mdx}",
      schema: blogPostSchema,
    },
    software: {
      source: "portfolio/software/**/*.yml",
      schema: portfolioItemSchema,
    },
    designs: {
      source: "portfolio/designs/**/*.yml",
      schema: portfolioItemSchema,
    },
  },
};

export function getContentConfig() {
  return contentConfig;
}

export default contentConfig;
