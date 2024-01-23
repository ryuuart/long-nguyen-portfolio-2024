import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    link: z.object({
      displayText: z.string(),
      url: z.string().url(),
    }),
    startDate: z.coerce.date(),
    endDate: z.union([z.coerce.date(), z.literal("present")]),
    heroImage: z.string(),
  }),
});

export const collections = { portfolio };
