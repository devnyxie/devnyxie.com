import { z } from "zod";
import { createButtonSchema, baseSchema, titleSchema } from "../base";

export const blogPageSchema = z.object({
  title_mentions: titleSchema,
  description_mentions: z.string(),
  title_deep_dives: titleSchema,
  description_deep_dives: z.string(),
  title_articles: titleSchema,
  description_articles: z.string(),
});

export type BlogPageType = z.infer<typeof blogPageSchema>;
