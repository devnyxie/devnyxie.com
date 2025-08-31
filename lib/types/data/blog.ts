import z from "zod";
import { baseSchema, titleSchema } from "../base";

const slugSchema = z
  .string()
  .regex(/^[a-z0-9_-]+$/i, "Use letters, numbers, dashes and underscores only")
  .min(3, "Slug must be at least 3 characters")
  .max(80, "Slug must be at most 80 characters");

const surroundPost = z.object({
  title: titleSchema,
  slug: slugSchema.optional().default(""),
});

export const blogPostSchema = baseSchema
  .extend({
    slug: slugSchema,
    content: z.string().min(1, "Content is required"),
    image: z.string().default(""),
    date: z.date(), // YAML usually loads dates as strings
    published: z.boolean().default(true),
    tags: z.array(z.string().min(1)).max(10).default([]),
    // *** To Be Implemented ***
    series_name: z.string().optional().default(""),
    series_index: z.number().optional().default(0),
    // *** Linked Data ***
    next: surroundPost.optional().default(undefined),
    previous: surroundPost.optional().default(undefined),
  })
  .transform((post) => ({
    ...post,
    readTime: Math.ceil(post.content.split(/\s+/).length / 180),
    path: `/blog/${post.slug}`,
  }));

export type PostInput = z.infer<typeof blogPostSchema>;

export const deepDiveSchema = baseSchema
  .extend({
    slug: slugSchema,
    content: z.string().min(1, "Content is required"),
    icon: z.string().default(""),
    date: z.date(), // YAML usually loads dates as strings
    published: z.boolean().default(true),
    tags: z.array(z.string().min(1)).max(10).default([]),
    // *** To Be Implemented ***
    series_name: z.string().optional().default(""),
    series_index: z.number().optional().default(0),
    // *** Linked Data ***
    next: surroundPost.optional().default(undefined),
    previous: surroundPost.optional().default(undefined),
  })
  .transform((post) => ({
    ...post,
    readTime: Math.ceil(post.content.split(/\s+/).length / 180),
    path: `/blog/${post.slug}`,
  }));

export type DeepDiveInput = z.infer<typeof deepDiveSchema>;

// unseparate deep dives methods from blog methods

// getData(deep_dives) ???
