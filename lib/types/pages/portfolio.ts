import { z } from "zod";
import { titleSchema, descriptionSchema } from "../base";

export const portfolioPageSchema = z.object({
  title: titleSchema,
  description: z
    .string()
    .max(600, "Description must be at most 600 characters"),
});

export type PortfolioPageType = z.infer<typeof portfolioPageSchema>;
