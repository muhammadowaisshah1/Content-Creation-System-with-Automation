import { z } from "zod";

export const contentGenerationSchema = z.object({
  prompt: z
    .string()
    .min(10, "Prompt must be at least 10 characters")
    .max(500, "Prompt must be less than 500 characters")
    .trim(),
  platform: z.enum(["YouTube", "Blog", "LinkedIn", "Sales Page"]),
  tone: z.enum(["Professional", "Persuasive", "Educational", "Viral"]),
});

export type ContentGenerationInput = z.infer<typeof contentGenerationSchema>;
