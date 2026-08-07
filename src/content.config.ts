import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const guides = defineCollection({
  loader: glob({ base: "./src/content/guides", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    category: z.string(),
    apiName: z.string().optional(),
    apiMethod: z.string().optional(),
    apiEndpoint: z.string().optional(),
    detailUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false)
  })
});

export const collections = { guides };
