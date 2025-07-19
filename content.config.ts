import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const createBaseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string(),
  });

const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z
      .enum(["primary", "neutral", "success", "warning", "error", "info"])
      .optional(),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
    variant: z
      .enum(["solid", "outline", "subtle", "soft", "ghost", "link"])
      .optional(),
    target: z.enum(["_blank", "_self"]).optional(),
  });

const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: "media" }),
    alt: z.string(),
  });

const createAuthorSchema = () =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional(),
  });

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: "index.yml",
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
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
      source: "portfolio/*.yml",
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: "media" }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        // title and description are inherited from the base schema
        tags: z.array(z.string().nonempty()).optional(),
        readingTime: z.number(), // filled by the hook
        date: z.date(),
        image: z.string().nonempty().editor({ input: "media" }).optional(),
        icon: z.string().nonempty().editor({ input: "media" }).optional(),
      }),
    }),
    deepDives: defineCollection({
      type: "page",
      source: "deep-dives/**/*.md",
      schema: z.object({
        tags: z.array(z.string().nonempty()).optional(),
        readingTime: z.number(), // filled by the hook
        date: z.date(),
        image: z.string().nonempty().editor({ input: "media" }).optional(),
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
        { include: "tags.yml" },
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
        images: z.array(createImageSchema()),
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
    tagIcons: defineCollection({
      type: "data",
      source: "tag-icons/**.json",
      schema: z.object({
        name: z.string(),
        public_icon: z.string(),
        nuxt_icon: z.string(),
      }),
    }),
  },
});
