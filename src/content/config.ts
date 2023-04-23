import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    cover: image().optional(),
    cover_url: z.string().optional(),
    date: z.date(),
  }),
});

export const collections = {
  blog: blogCollection,
};
