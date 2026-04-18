import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date().transform((date) => date.toISOString()),
        emoji: z.string().default("⛅️"),
        tags: z.array(z.object({ tag: z.string() })).optional(),
        draft: z.boolean().default(false)
    })
})

const pagesCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/pages" }),
    schema: z.object({
        title: z.string(),
        description: z.string()
    })
})

export const collections = { blog: blogCollection, pages: pagesCollection }