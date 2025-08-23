import { z } from "zod";
import { createButtonSchema, baseSchema } from "../types/base";

export const indexPageSchema = baseSchema.extend({
  source: "index.yml",
  hero: z.object({
    links: z.array(createButtonSchema()),
  }),
  about: baseSchema,
  experience: baseSchema.extend({
    items: z.array(
      z.object({
        date: z.string().or(z.date()), // YAML usually loads dates as strings
        position: z.string(),
        company: z.object({
          name: z.string(),
          url: z.string(),
        }),
      })
    ),
  }),
  blog: baseSchema,
});
