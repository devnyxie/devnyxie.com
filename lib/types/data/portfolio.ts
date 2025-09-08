import z from "zod";

export const portfolioItemSchema = z
  .object({
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Project description is required"),
    image: z.string().nullable().optional(),
    public: z.boolean().default(true),
    source: z.string().nullable().optional(),
    preview: z.string().nullable().optional(),
    state: z
      .enum(["published", "archived", "in-progress", "in_progress", "draft"])
      .default("draft"),
    tags: z.array(z.string().min(1)).max(10).default([]),
    date: z.string().or(z.date()), // YAML usually loads dates as strings
  })
  .transform((item) => ({
    ...item,
    // create date in case of string date
    date: item.date instanceof Date ? item.date : new Date(item.date),
  }));

export type PortfolioItem = z.infer<typeof portfolioItemSchema> & {
  slug: string;
  path: string;
};
