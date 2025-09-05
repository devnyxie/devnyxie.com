import { z } from "zod";
import { createButtonSchema, baseSchema, titleSchema } from "../base";

export const indexPageSchema = baseSchema.extend({
  hero: z.object({
    links: z.array(createButtonSchema()),
  }),
  about: baseSchema,
  experience: z.object({
    title: titleSchema,
    items: z.array(
      z.object({
        date: z.string().or(z.date()),
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

export type IndexPageType = z.infer<typeof indexPageSchema>;
