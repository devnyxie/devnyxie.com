import z from "zod";
import { baseSchema } from "./base";

export const portfolioItemSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  url: z.string().optional(),
  repo: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string().min(1)).max(10).default([]),
});

export const portfolioPageSchema = baseSchema.extend({
  source: "portfolio.yml",
  schema: portfolioItemSchema,
});
