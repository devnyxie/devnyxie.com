import { z } from "zod";

export const PostSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(120, "Title must be at most 120 characters"),
    slug: z
      .string()
      .regex(/^[a-z0-9_-]+$/i, "Use letters, numbers, and dashes only")
      .min(3, "Slug must be at least 3 characters")
      .max(80, "Slug must be at most 80 characters"),
    content: z.string().min(1, "Content is required"),
    description: z
      .string()
      .max(250, "Description must be at most 250 characters")
      .optional()
      .default(""),
    image: z.string(),
    date: z.date(),
    published: z.boolean().default(true),
    tags: z.array(z.string().min(1)).max(10).default([]),
    // *** To Be Implemented ***
    series_name: z.string().optional().default(""),
    series_index: z.number().optional().default(0),
  })
  .transform((post) => ({
    ...post,
    readTime: Math.ceil(post.content.split(/\s+/).length / 180),
    path: `/blog/${post.slug}`,
  }));

export type PostInput = z.infer<typeof PostSchema>;
