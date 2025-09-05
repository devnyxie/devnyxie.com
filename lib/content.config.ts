import { baseSchema } from "./types/base";
import { blogPostSchema } from "./types/data/blog";
import { indexPageSchema } from "./types/pages/index";
import { portfolioItemSchema } from "./types/data/portfolio";
import t_content_config from "./types/content";
import { blogPageSchema } from "./types/pages/blog";

const contentConfig: t_content_config = {
  pages: {
    index: {
      source: "index.yml",
      schema: indexPageSchema,
    },
    about: {
      source: "about.yml",
      schema: baseSchema,
    },
    now: {
      source: "now.yml",
      schema: baseSchema,
    },
    portfolio: {
      source: "portfolio.yml",
      schema: baseSchema,
    },
    blog: {
      source: "blog.yml",
      schema: blogPageSchema,
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
    portfolio: {
      source: "portfolio/**/*.yml",
      schema: portfolioItemSchema,
    },
  },
};

export function getContentConfig() {
  return contentConfig;
}

export default contentConfig;
