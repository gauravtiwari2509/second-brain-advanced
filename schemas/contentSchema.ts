import { z } from "zod";

export const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  notes: z.string().optional(),
  type: z.string(),
  tags: z.string().optional(),
  group: z.string(),
});

// Infer the type from the schema
export type ContentSchema = z.infer<typeof contentSchema>;
