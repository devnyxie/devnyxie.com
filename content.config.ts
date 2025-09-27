import { defineCollection, defineContentConfig, z } from "@nuxt/content";
import {
  createBaseSchema,
  skillColorEnum,
  createButtonSchema,
  createImageSchema,
  createAuthorSchema,
} from "./content.config.utils";

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: "index.yml",
      schema: z.object({
        hero: z.object({
          link: createButtonSchema(),
          images: z.array(createImageSchema()),
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(
            z.object({
              date: z.date(),
              position: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string(),
              }),
            })
          ),
        }),
        skills: createBaseSchema().extend({
          items: z.array(
            createBaseSchema().extend({
              icon: z.string().editor({ input: "media" }),
              color: skillColorEnum,
            })
          ),
        }),
        blog: createBaseSchema(),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty(),
                })
              ),
            })
          ),
        }),
      }),
    }),
    portfolio: defineCollection({
      type: "data",
      source: "portfolio/**/*.yml",
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: "media" }),
        state: z
          .enum(["draft", "published", "archived", "in_progress"])
          .default("draft"),
        public: z.boolean().default(true),
        source: z.string().nonempty().optional(),
        preview: z.string().nonempty().optional(),
        tags: z.array(z.string().nonempty()).optional(),
        date: z.date(),
      }),
    }),
    articles: defineCollection({
      type: "page",
      source: "blog/articles/**/*.md",
      schema: z.object({
        tags: z.array(z.string().nonempty()).optional(),
        readingTime: z.number(), // filled by the hook
        date: z.date(),
        image: z.string().nonempty().editor({ input: "media" }).optional(),
      }),
    }),
    deepDives: defineCollection({
      type: "page",
      source: "blog/deep-dives/**/*.md",
      schema: z.object({
        tags: z.array(z.string().nonempty()).optional(),
        readingTime: z.number(), // filled by the hook
        date: z.date(),
        icon: z.string().nonempty().editor({ input: "media" }).optional(),
      }),
    }),
    pages: defineCollection({
      type: "page",
      source: [
        { include: "portfolio.yml" },
        { include: "now.yml" },
        { include: "blog.yml" },
        { include: "about.yml" },
      ],
      schema: z.object({
        links: z.array(createButtonSchema()),
      }),
    }),
    about: defineCollection({
      type: "page",
      source: "about.yml",
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        content: z.object({}),
      }),
    }),
    now: defineCollection({
      type: "page",
      source: "now.yml",
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        content: z.string().nonempty(),
      }),
    }),
  },
});
