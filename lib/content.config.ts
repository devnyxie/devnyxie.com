import { ZodType } from "zod";
import { baseSchema } from "./types/base";
import { blogPostSchema } from "./types/blog";
import { indexPageSchema } from "./types/index";
import { portfolioItemSchema } from "./types/portfolio";

type t_item = {
  source: string;
  schema: ZodType;
};

type t_config = {
  pages: {
    [key: string]: t_item;
  };
  content: {
    [key: string]: t_item;
  };
};

export const Config: t_config = {
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
      schema: baseSchema,
    },
  },
  content: {
    blog: {
      source: "blog/**/*.md",
      schema: blogPostSchema,
    },
    portfolio: {
      source: "portfolio/**/*.yml",
      schema: portfolioItemSchema,
    },
  },
};
