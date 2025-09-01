import z from "zod";

export const titleSchema = z
  .string()
  .min(3, "Title must be at least 3 characters")
  .max(120, "Title must be at most 120 characters");

export const descriptionSchema = z
  .string()
  .min(10, "Description must be at least 20 characters")
  .max(250, "Description must be at most 250 characters");

export const baseSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

export const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    size: z.enum(["default", "sm", "lg", "icon"]).optional(),
    variant: z
      .enum(["default", "destructive", "outline", "secondary", "ghost", "link"])
      .optional(),
    target: z.enum(["_blank", "_self"]).optional(),
  });
