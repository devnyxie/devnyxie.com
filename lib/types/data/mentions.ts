import { z } from "zod";
import { titleSchema, descriptionSchema } from "../base";

export const mentionItemSchema = z.object({
  title: titleSchema,
  url: z.string().url("Must be a valid URL"),
  description: descriptionSchema,
  type: z.enum(["article", "video", "website"]),
  source: z.string().min(1, "Source is required"),
  date: z.string(),
  tags: z.array(z.string()).optional(),
});

export const mentionsPageSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  items: z.array(mentionItemSchema),
});

export type MentionItem = z.infer<typeof mentionItemSchema>;
export type MentionsPageType = z.infer<typeof mentionsPageSchema>;
