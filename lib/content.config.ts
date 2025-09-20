import { baseSchema, contentPageSchema } from "./types/base";
import { blogPostSchema } from "./types/data/blog";
import { indexPageSchema } from "./types/pages/index";
import { portfolioItemSchema } from "./types/data/portfolio";
import t_content_config from "./types/content";
import { blogPageSchema } from "./types/pages/blog";
import { portfolioPageSchema } from "./types/pages/portfolio";

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
  },
  content: {
    articles: {
      source: "blog/articles/**/*.md",
      schema: blogPostSchema,
    },
    deep_dives: {
      source: "blog/deep-dives/**/*.md",
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
