import { z } from "@nuxt/content";

const createBaseSchema = () =>
  z.object({
    title: z.string().min(3).max(60).nonempty(),
    description: z.string().min(10).max(160).nonempty(),
  });

const skillColorEnum = z.enum([
  "blue",
  "green",
  "purple",
  "orange",
  "pink",
  "teal",
]);

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

export {
  createBaseSchema,
  skillColorEnum,
  createButtonSchema,
  createImageSchema,
  createAuthorSchema,
};
